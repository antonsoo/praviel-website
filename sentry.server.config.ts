import * as Sentry from "@sentry/nextjs";
import sentryConfig from "./sentry.config";

Sentry.init({
  ...sentryConfig,
});
