import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Next.js 16 compatibility:
  // Using middleware.ts (Edge runtime) instead of proxy.ts (Node runtime)
  // The prerelease adapter from main should automatically detect and handle this correctly

  // We'll add R2 incremental cache here later.
});
