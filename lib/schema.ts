import {
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const waitlist_signups = pgTable("waitlist_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  source: text("source").default("landing"),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type WaitlistSignup = typeof waitlist_signups.$inferSelect;
export type NewWaitlistSignup = typeof waitlist_signups.$inferInsert;
