// Static manifest for Cloudflare Workers compatibility
// Update this list when adding/removing music files
const STATIC_PLAYLIST = [
  '/music/Coastal_Polis_Stroll.mp3',
  '/music/Confessio_Noctis_2025-10-28T075015.mp3',
  '/music/Memory_of_a_Fallen_Garden.mp3',
  '/music/Sunrise_Over_Aegean.mp3',
];

export async function GET() {
  // Use static manifest (works in all environments including Cloudflare Workers)
  return Response.json({ playlist: STATIC_PLAYLIST });
}
