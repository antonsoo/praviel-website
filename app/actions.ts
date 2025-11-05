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
    // Check if this is a duplicate email error (PostgreSQL unique constraint violation)
    const isDuplicateEmail =
      err && typeof err === "object" && "code" in err && err.code === "23505";

    if (isDuplicateEmail) {
      // Expected: user already on waitlist
      console.log("Duplicate email signup (expected):", email);
    } else {
      // Unexpected database error - log for investigation
      console.error("Waitlist signup error:", err);
    }

    // Still return success for both cases:
    // - Duplicate: user already registered (prevents enumeration)
    // - Other errors: avoid exposing internal errors to client
    return { ok: true } as const;
  }
}
