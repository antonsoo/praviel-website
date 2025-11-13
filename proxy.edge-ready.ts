import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { PROXY_MATCHER, handleNetworkBoundary } from "@/lib/server/proxyHandler";

// Next.js proxy.ts executes in the Node.js runtime. We keep it disabled by default so
// Cloudflare Workers continue to rely on middleware.ts until OpenNext adds support.
const ENABLE_NODE_PROXY = process.env.PRAVIEL_ENABLE_NODE_PROXY === "true";

export const runtime = "nodejs";
export const config = PROXY_MATCHER;

export default function proxy(request: NextRequest) {
  if (!ENABLE_NODE_PROXY) {
    return NextResponse.next();
  }
  return handleNetworkBoundary(request);
}
