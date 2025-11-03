#!/bin/bash

# Purge Cloudflare cache for praviel.com
# This script purges ALL cache for the zone
# Run this after deployments if you see stale content

# Check if CLOUDFLARE_API_TOKEN is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "❌ Error: CLOUDFLARE_API_TOKEN environment variable is not set"
  echo "Set it with: export CLOUDFLARE_API_TOKEN=your_token_here"
  exit 1
fi

# Check if CLOUDFLARE_ZONE_ID is set
if [ -z "$CLOUDFLARE_ZONE_ID" ]; then
  echo "❌ Error: CLOUDFLARE_ZONE_ID environment variable is not set"
  echo "Get your zone ID from the Cloudflare dashboard (Overview page)"
  echo "Set it with: export CLOUDFLARE_ZONE_ID=your_zone_id_here"
  exit 1
fi

echo "🔄 Purging Cloudflare cache for zone: $CLOUDFLARE_ZONE_ID"

# Purge all cache
response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}')

# Check if successful
if echo "$response" | grep -q '"success":true'; then
  echo "✅ Cache purged successfully!"
  echo "Response: $response"
else
  echo "❌ Failed to purge cache"
  echo "Response: $response"
  exit 1
fi
