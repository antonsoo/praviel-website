import { spawn } from "node:child_process";
import process from "node:process";

import waitOn from "wait-on";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const HOSTNAME = process.env.PLAYWRIGHT_HOST ?? "127.0.0.1";
const PORT = process.env.PLAYWRIGHT_PORT ?? "3000";

function spawnCommand(command: string, args: string[], options: Parameters<typeof spawn>[2] = {}) {
  return spawn(command, args, {
    stdio: "inherit",
    env: process.env,
    ...options,
  });
}

async function run() {
  const server = spawnCommand("pnpm", ["start", "--hostname", HOSTNAME, "--port", PORT], {
    stdio: "inherit",
  });

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
    await waitOn({ resources: [BASE_URL], timeout: 120_000, interval: 500 });
  } catch (error) {
    teardown();
    console.error("[playwright] Dev server did not start in time:", error);
    process.exit(1);
  }

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
