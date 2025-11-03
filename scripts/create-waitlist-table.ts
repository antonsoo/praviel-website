import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const sql = neon(process.env.DATABASE_URL!);

async function createWaitlistTable() {
  try {
    console.log("Connecting to Neon database...");

    // Check if table already exists
    const checkTable = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'waitlist_signups'
      );
    `;

    if (checkTable[0].exists) {
      console.log("✅ Table 'waitlist_signups' already exists!");
      return;
    }

    // Create the table
    await sql`
      CREATE TABLE "waitlist_signups" (
        "id" serial PRIMARY KEY NOT NULL,
        "email" text NOT NULL,
        "source" text DEFAULT 'landing',
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    console.log("✅ Successfully created 'waitlist_signups' table!");

    // Verify it was created
    const verify = await sql`
      SELECT column_name, data_type, column_default
      FROM information_schema.columns
      WHERE table_name = 'waitlist_signups'
      ORDER BY ordinal_position;
    `;

    console.log("\nTable structure:");
    console.table(verify);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createWaitlistTable();
