import {
  pgTable,
  serial,
  text,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const waitlist_signups = pgTable(
  "waitlist_signups",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    source: text("source").default("landing"),
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
    createdAtIdx: index("created_at_idx").on(table.created_at),
  })
);

export type WaitlistSignup = typeof waitlist_signups.$inferSelect;
export type NewWaitlistSignup = typeof waitlist_signups.$inferInsert;
