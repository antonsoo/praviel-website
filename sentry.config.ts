const dsn =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "";

const release =
  process.env.SENTRY_RELEASE ||
  process.env.NEXT_PUBLIC_RELEASE_VERSION ||
  process.env.CF_PAGES_COMMIT_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  "";

const sentryConfig = {
  dsn: dsn || undefined,
  enabled: Boolean(dsn),
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.2"),
  profilesSampleRate: Number(process.env.SENTRY_PROFILES_SAMPLE_RATE ?? "0.2"),
  replaysSessionSampleRate: Number(
    process.env.SENTRY_REPLAYS_SESSION_SAMPLE_RATE ?? "0"
  ),
  replaysOnErrorSampleRate: Number(
    process.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? "1"
  ),
  release: release || undefined,
  debug: process.env.NODE_ENV !== "production",
  sendDefaultPii: true,
};

export default sentryConfig;
