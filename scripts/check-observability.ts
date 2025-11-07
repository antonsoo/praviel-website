const STRICT_ENV = Boolean(
  process.env.CI === "true" ||
  process.env.VERCEL === "1" ||
  process.env.CF_PAGES === "1" ||
  process.env.FORCE_SENTRY_GUARD === "true"
);

if (!STRICT_ENV) {
  console.log("[observability] Skipping Sentry env validation (non-strict build)");
  process.exit(0);
}

const requiredKeys = ["SENTRY_DSN", "SENTRY_AUTH_TOKEN", "SENTRY_ORG", "SENTRY_PROJECT"];
const missing = requiredKeys.filter((key) => !process.env[key] || process.env[key]?.trim() === "");

if (missing.length) {
  console.error(`\n[observability] Missing required env vars: ${missing.join(", ")}`);
  console.error("Set these secrets in CI/Cloudflare before running build/deploy.");
  process.exit(1);
}

console.log("[observability] All required Sentry env vars present.");
