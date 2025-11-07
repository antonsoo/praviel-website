import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import kvNextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/kv-next-tag-cache";

export default defineCloudflareConfig({
  // Use R2 for incremental static regeneration cache (fast, persistent)
  // R2 is strongly consistent, preventing stale data issues (KV is eventually consistent)
  incrementalCache: r2IncrementalCache,

  // Use KV for tag-based cache invalidation (low-latency reads across global network)
  tagCache: kvNextTagCache,
});
