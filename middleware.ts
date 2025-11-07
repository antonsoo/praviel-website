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

  // Create response with security headers
  const response = NextResponse.next();

  // Content Security Policy (CSP)
  // Note: Using 'unsafe-inline' for styles is necessary for Next.js + Tailwind
  // Consider moving to nonce-based CSP in production for enhanced security
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "media-src 'self' blob:",
    "connect-src 'self' https://app.praviel.com https://*.neon.tech",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://app.praviel.com",
  ];

  const forwardedProto = req.headers.get("x-forwarded-proto");
  const isSecureRequest =
    req.nextUrl.protocol === "https:" || forwardedProto?.toLowerCase() === "https";
  if (isSecureRequest) {
    cspDirectives.push("upgrade-insecure-requests");
  }

  const csp = cspDirectives.join("; ");

  response.headers.set('Content-Security-Policy', csp);

  // Additional security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // HSTS (only on production HTTPS)
  if (req.url.startsWith('https://')) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Permissions Policy (disable unnecessary features)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  return response;
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
