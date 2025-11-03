"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { db, waitlist_signups } from "@/lib/db";

const WaitlistSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

export async function joinWaitlist(formData: FormData) {
  const parsed = WaitlistSchema.safeParse({
    email: formData.get("email"),
    source: (formData.get("source") as string | null) ?? "landing",
  });

  if (!parsed.success) {
    return { ok: false, error: "invalid_email" } as const;
  }

  // Check if database is configured
  if (!db) {
    // In production, we must have a database configured
    if (process.env.NODE_ENV === "production") {
      console.error("DATABASE_URL not configured in production environment");
      return { ok: false, error: "service_unavailable" } as const;
    }
    // In development without DB, allow testing but log warning
    console.warn(
      "[DEV] Waitlist signup attempted without DATABASE_URL - returning mock success"
    );
    return { ok: true } as const;
  }

  const { email, source } = parsed.data;

  try {
    await db.insert(waitlist_signups).values({
      email,
      source,
    });

    // In Next 16, revalidateTag can take a "profile" like "max" to
    // expire cached components tagged with that key immediately.
    revalidateTag("waitlist", "max");

    return { ok: true } as const;
  } catch (err) {
    // Handle duplicate email or other DB errors gracefully
    // Don't expose internal errors to client
    console.error("Waitlist signup error:", err);

    // Still return success for duplicate signups (user already registered)
    // This prevents enumeration attacks and provides better UX
    return { ok: true } as const;
  }
}
