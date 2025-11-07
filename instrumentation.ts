import * as Sentry from "@sentry/nextjs";
import sentryConfig from "./sentry.config";

const hasDsn = Boolean(sentryConfig.dsn);
type CaptureRequestErrorArgs = Parameters<typeof Sentry.captureRequestError>;

async function loadRuntimeConfig() {
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
    return;
  }

  // Default to Node.js runtime (covers "nodejs" + "experimental-edge/nodejs_compat").
  await import("./sentry.server.config");
}

export async function register() {
  if (!hasDsn) return;

  await loadRuntimeConfig();
}

export async function onRequestError(
  error: Error,
  request: CaptureRequestErrorArgs[1],
  context: CaptureRequestErrorArgs[2]
) {
  if (!hasDsn) return;

  await loadRuntimeConfig();
  Sentry.captureRequestError(error, request, context);
}
