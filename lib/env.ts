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
});

// Client-side environment variables schema (exposed to browser, safe to be public)
const clientSchema = z.object({
  // Authentication
  NEXT_PUBLIC_STACK_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z.string().min(1).optional(),

  // API endpoints
  NEXT_PUBLIC_API_BASE: z.string().url().optional(),
  NEXT_PUBLIC_APP_ORIGIN: z.string().url().optional(),
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
});

// Parse and export public environment
export const publicEnv = clientSchema.parse({
  NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY:
    process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
  NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN,
});
