import { spawn } from "node:child_process";
import { execSync } from "node:child_process";

function resolveRelease() {
  const envCandidates = [
    process.env.SENTRY_RELEASE,
    process.env.CF_PAGES_COMMIT_SHA,
    process.env.VERCEL_GIT_COMMIT_SHA,
    process.env.GITHUB_SHA,
    process.env.COMMIT_SHA,
  ].filter(Boolean) as string[];

  if (envCandidates.length > 0) {
    return envCandidates[0]!;
  }

  const pkgVersion = process.env.npm_package_version ?? "0.0.0";
  try {
    const gitSha = execSync("git rev-parse --short=12 HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (gitSha) {
      return `praviel-site@${pkgVersion}+${gitSha}`;
    }
  } catch (_error) {
    // Ignore—fall back to timestamp-based release below.
  }

  return `praviel-site@${pkgVersion}+${Date.now().toString(36)}`;
}

function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command) {
    console.error("Usage: pnpm with-release <command> [...args]");
    process.exit(1);
  }

  const release = resolveRelease();
  const env = {
    ...process.env,
    SENTRY_RELEASE: process.env.SENTRY_RELEASE ?? release,
    NEXT_PUBLIC_RELEASE_VERSION:
      process.env.NEXT_PUBLIC_RELEASE_VERSION ?? release,
  };

  console.log(`\n[with-release] Using Sentry release: ${env.SENTRY_RELEASE}`);

  const child = spawn(command, args, {
    stdio: "inherit",
    env,
    shell: false,
  });

  child.on("exit", (code, signal) => {
    if (typeof code === "number") {
      process.exit(code);
    }
    if (signal) {
      console.error(`with-release: process exited with signal ${signal}`);
      process.exit(1);
    }
    process.exit(0);
  });
}

main();
