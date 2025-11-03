import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Force Edge runtime so Next.js builds this for the Edge bundle, not Node.
// This is critical for Cloudflare Workers deployment with Next.js 16.
// Note: Next.js 16 with webpack requires 'experimental-edge' instead of 'edge'
export const runtime = 'experimental-edge';

export function middleware(req: NextRequest) {
  // Force www → apex in production
  const host = req.headers.get("host") || "";
  if (host.startsWith("www.")) {
    const url = new URL(req.url);
    url.host = host.replace(/^www\./, "");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Matcher: exclude static assets to reduce Worker load
export const config = {
  matcher: [
    // Match all paths except:
    // - _next (Next.js internals)
    // - api routes (handled separately)
    // - static files with extensions
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};
