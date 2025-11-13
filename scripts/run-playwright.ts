import { spawn } from "node:child_process";
import net from "node:net";
import process from "node:process";

import waitOn from "wait-on";

const HOSTNAME = process.env.PLAYWRIGHT_HOST ?? "127.0.0.1";
const DEFAULT_PORT = Number(process.env.PLAYWRIGHT_PORT ?? "3000");

function spawnCommand(command: string, args: string[], options: Parameters<typeof spawn>[2] = {}) {
  return spawn(command, args, {
    stdio: "inherit",
    env: process.env,
    ...options,
  });
}

async function findAvailablePort(startPort: number, host: string) {
  let port = startPort;
  const maxAttempts = 25;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const available = await new Promise<boolean>((resolve) => {
      const tester = net.createServer();
      tester.once("error", (error: NodeJS.ErrnoException) => {
        tester.close();
        if (error.code === "EADDRINUSE") {
          resolve(false);
        } else {
          resolve(false);
        }
      });
      tester.once("listening", () => {
        tester.close();
        resolve(true);
      });
      tester.listen(port, host);
    });

    if (available) {
      return port;
    }
    port += 1;
  }
  throw new Error(`Unable to find free port starting at ${startPort}`);
}

async function waitForServerReady(url: string, timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;
  const httpUrl = url.startsWith("http") ? url : `http://${url}`;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(httpUrl, { method: "HEAD", cache: "no-store" });
      if (response.ok) {
        return;
      }
    } catch {
      // ignore network errors until timeout
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Dev server never became reachable at ${httpUrl} (waited ${timeoutMs}ms)`);
}

async function run() {
  const resolvedPort = await findAvailablePort(DEFAULT_PORT, HOSTNAME);
  const baseURL = process.env.BASE_URL ?? `http://${HOSTNAME}:${resolvedPort}`;

  process.env.PLAYWRIGHT_PORT = String(resolvedPort);
  process.env.BASE_URL = baseURL;

  const server = spawnCommand("pnpm", ["start", "--hostname", HOSTNAME, "--port", String(resolvedPort)], {
    stdio: "inherit",
  });
  let serverReady = false;

  const teardown = () => {
    if (!server.killed) {
      server.kill("SIGINT");
    }
  };

  process.on("SIGINT", () => {
    teardown();
    process.exit(1);
  });
  process.on("SIGTERM", () => {
    teardown();
    process.exit(1);
  });

  try {
    await Promise.race([
      waitOn({ resources: [baseURL], timeout: 120_000, interval: 500 }),
      waitForServerReady(baseURL, 120_000),
    ]);
    serverReady = true;
  } catch (error) {
    teardown();
    console.error("[playwright] Dev server did not start in time:", error);
    process.exit(1);
  }

  server.on("exit", (code, signal) => {
    if (serverReady) {
      return;
    }
    const reason = signal ? `signal ${signal}` : `code ${code ?? "unknown"}`;
    console.error(`[playwright] Dev server exited before it became ready (${reason}). Check for port conflicts or build errors.`);
    process.exit(1);
  });

  if (!process.env.ENABLE_TEST_ROUTES) {
    process.env.ENABLE_TEST_ROUTES = "true";
  }
  if (!process.env.SKIP_WEBKIT) {
    process.env.SKIP_WEBKIT = "1";
  }

  const cliArgs = process.argv.slice(2).filter((arg) => arg !== "--");
  const tests = spawnCommand("pnpm", ["playwright", "test", ...cliArgs]);

  tests.on("exit", (code, signal) => {
    teardown();
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 0);
  });
}

run().catch((error) => {
  console.error("[playwright] Unexpected error:", error);
  process.exit(1);
});
