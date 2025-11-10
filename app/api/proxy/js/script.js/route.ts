// Plausible Analytics script proxy
// This proxies the Plausible script through our domain to avoid ad blockers

// Prevent Next.js 16 from trying to prerender this API route during build
// The route needs to fetch fresh data at runtime, not during static generation
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch('https://plausible.io/js/script.js', {
      // Cache the script for 24 hours using Headers (cross-runtime compatible)
      headers: {
        'Cache-Control': 'public, max-age=86400',
      },
    });

    const script = await response.text();

    return new Response(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        // Allow the script to be loaded from anywhere
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('[Plausible] Error fetching script:', error);
    return new Response('// Plausible script unavailable', {
      status: 503,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
      },
    });
  }
}
