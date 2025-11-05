CREATE UNIQUE INDEX "email_idx" ON "waitlist_signups" USING btree ("email");--> statement-breakpoint
CREATE INDEX "created_at_idx" ON "waitlist_signups" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "waitlist_signups" ADD CONSTRAINT "waitlist_signups_email_unique" UNIQUE("email");