import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // React Compiler + Cache Components are now first-class config keys in Next.js 16
  reactCompiler: true,
  cacheComponents: true,

  experimental: {
    // still experimental in Next.js 16
    turbopackFileSystemCacheForDev: true,
    viewTransition: true,
  },

  // Explicit Turbopack root to avoid the "Next.js package not found" / bad root inference crash
  // in non-monorepo setups.
  turbopack: {
    root: process.cwd(), // absolute path at runtime
  },

  // Remote images allowed on the marketing site (adjust as needed)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.praviel.com" },
      { protocol: "https", hostname: "assets.praviel.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },

  // Helpful in dev/debug: log full request URLs for fetch() in Server Components / Actions
  logging: {
    fetches: { fullUrl: true },
  },

  // Hook for future aliases/loader tweaks
  webpack(config) {
    return config;
  },
};

// Cloudflare local dev bootstrap.
// This wires @opennextjs/cloudflare into `next dev` so you get Worker-like
// bindings (.dev.vars, KV/D1/etc.) locally.
initOpenNextCloudflareForDev();

export default nextConfig;
