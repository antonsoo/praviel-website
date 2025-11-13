import type { NextRequest } from "next/server";

import { handleNetworkBoundary } from "@/lib/server/proxyHandler";

// Force Edge runtime so Next.js builds this for the Edge bundle, not Node.
// This is critical for Cloudflare Workers deployment with Next.js 16.
// Note: Next.js 16 with webpack requires 'experimental-edge' instead of 'edge'
//
// Why middleware.ts instead of proxy.ts:
// - Next.js 16 deprecates middleware.ts in favor of proxy.ts
// - HOWEVER: proxy.ts only supports Node.js runtime, NOT edge runtime
// - This project deploys to Cloudflare Workers which REQUIRES edge runtime
// - OpenNext Cloudflare adapter doesn't support proxy.ts yet (as of Oct 2025)
// - Therefore: We keep middleware.ts despite the deprecation warning
// - See: https://github.com/opennextjs/opennextjs-cloudflare/issues/962
export const runtime = 'experimental-edge';

export function middleware(req: NextRequest) {
  return handleNetworkBoundary(req);
}

// Matcher: exclude static assets to reduce Worker load
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};
