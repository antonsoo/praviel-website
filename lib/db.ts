import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not defined. Actions that hit the DB will no-op in dev."
  );
}

// Neon HTTP driver + drizzle-orm/neon-http works in serverless / Workers
// because it talks over fetch, not TCP sockets.
neonConfig.fetchConnectionCache = true;
neonConfig.poolQueryViaFetch = true;

const sql = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : undefined;

// Export a singleton Drizzle client. Safe with HTTP fetch connections.
export const db = sql ? drizzle({ client: sql, schema }) : undefined;

export * from "./schema";
