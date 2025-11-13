import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const PROXY_MATCHER = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};

export function handleNetworkBoundary(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    const url = new URL(req.url);
    url.host = host.replace(/^www\./, "");
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "media-src 'self' blob:",
    "connect-src 'self' https://app.praviel.com https://*.neon.tech https://cloudflareinsights.com",
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
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  if (req.url.startsWith("https://")) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
  }

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  return response;
}
