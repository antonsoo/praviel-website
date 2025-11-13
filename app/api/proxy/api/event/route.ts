// Plausible Analytics event proxy
// This proxies analytics events through our domain to avoid ad blockers

export async function POST(request: Request) {
  try {
    // Clone the request to forward to Plausible
    const body = await request.text();

    // Forward the request to Plausible's API
    const response = await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
        'X-Forwarded-For': request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '',
        'X-Forwarded-Host': request.headers.get('host') || '',
        'X-Forwarded-Proto': request.headers.get('x-forwarded-proto') || 'https',
      },
      body,
    });

    // Return Plausible's response
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('[Plausible] Error forwarding event:', error);
    return new Response(JSON.stringify({ error: 'Failed to forward event' }), {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
