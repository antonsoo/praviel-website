import * as Sentry from "@sentry/node";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
if (!dsn) {
  console.error("[observability] Missing SENTRY_DSN. Export it before running the smoke test.");
  process.exit(1);
}

Sentry.init({
  dsn,
  release:
    process.env.SENTRY_RELEASE ||
    process.env.NEXT_PUBLIC_RELEASE_VERSION ||
    "local-smoke",
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || "local",
  tracesSampleRate: 0,
});

async function main() {
  const eventId = Sentry.captureMessage("observability smoke test", "info");
  await Sentry.flush(3000);
  console.log(`[observability] Sent smoke-test event ${eventId}`);
}

main().catch((error) => {
  console.error("[observability] Smoke test failed", error);
  process.exitCode = 1;
});
