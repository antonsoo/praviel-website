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
    return { ok: false, error: "invalid" } as const;
  }

  // If DB isn't configured locally, just pretend success so dev flow works.
  if (!db) {
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
  } catch (_err) {
    // swallow duplicate etc.
    return { ok: true } as const;
  }
}
