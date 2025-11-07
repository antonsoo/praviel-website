import { z } from "zod";

// Server-side environment variables schema (secrets, never exposed to browser)
const serverSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1).optional(),

  // Authentication
  STACK_SECRET_SERVER_KEY: z.string().min(1).optional(),

  // Redis
  REDIS_URL: z.string().optional(),
  REDIS_INTERNAL_URL: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM_ADDRESS: z.string().email().optional(),
  EMAIL_FROM_NAME: z.string().optional(),
  EMAIL_PROVIDER: z.enum(["resend", "sendgrid", "smtp"]).optional(),

  // AI Model API Keys
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),

  // Observability
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ENVIRONMENT: z.string().optional(),
  SENTRY_TRACES_SAMPLE_RATE: z.string().optional(),
  SENTRY_REPLAYS_SESSION_SAMPLE_RATE: z.string().optional(),
  SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE: z.string().optional(),

  // Test utilities
  ENABLE_TEST_ROUTES: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
});

// Client-side environment variables schema (exposed to browser, safe to be public)
const clientSchema = z.object({
  // Authentication
  NEXT_PUBLIC_STACK_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z.string().min(1).optional(),

  // API endpoints
  NEXT_PUBLIC_API_BASE: z.string().url().optional(),
  NEXT_PUBLIC_APP_ORIGIN: z.string().url().optional(),

  // Observability
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_CF_ANALYTICS_TOKEN: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_PROVIDER: z.enum(["cloudflare", "vercel"]).optional(),
  NEXT_PUBLIC_ANALYTICS_SAMPLE_RATE: z
    .string()
    .optional()
    .transform((value) => {
      if (typeof value === "undefined") return 1;
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) return 1;
      return Math.min(Math.max(parsed, 0), 1);
    }),
});

// Parse and export server environment
export const serverEnv = serverSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_INTERNAL_URL: process.env.REDIS_INTERNAL_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
  SENTRY_TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE,
  SENTRY_REPLAYS_SESSION_SAMPLE_RATE: process.env.SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
  SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE: process.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE,
  ENABLE_TEST_ROUTES: process.env.ENABLE_TEST_ROUTES,
});

// Parse and export public environment
export const publicEnv = clientSchema.parse({
  NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
  NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_CF_ANALYTICS_TOKEN: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN,
  NEXT_PUBLIC_ANALYTICS_PROVIDER: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
  NEXT_PUBLIC_ANALYTICS_SAMPLE_RATE: process.env.NEXT_PUBLIC_ANALYTICS_SAMPLE_RATE,
});
