#!/usr/bin/env tsx
/**
 * Aggressive OG image optimization to get under 300KB
 */

import sharp from 'sharp';
import { resolve } from 'path';
import { statSync } from 'fs';

const publicDir = resolve(process.cwd(), 'public');
const inputPath = resolve(publicDir, 'og.png');
const pngPath = resolve(publicDir, 'og-final.png');
const webpPath = resolve(publicDir, 'og-final.webp');

async function optimizeAggressively() {
  console.log('🔥 Aggressive optimization to get under 300KB...\n');

  // PNG with more aggressive palette quantization
  await sharp(inputPath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .png({
      quality: 75, // Lower quality
      compressionLevel: 9,
      palette: true,
      colors: 128, // Limit color palette more aggressively
    })
    .toFile(pngPath);

  const pngStats = statSync(pngPath);
  const pngKB = (pngStats.size / 1024).toFixed(1);
  console.log(`PNG: ${pngKB}KB`);

  // WebP with more compression
  await sharp(inputPath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .webp({
      quality: 80, // Lower quality but still good
      effort: 6,
      smartSubsample: true,
    })
    .toFile(webpPath);

  const webpStats = statSync(webpPath);
  const webpKB = (webpStats.size / 1024).toFixed(1);
  console.log(`WebP: ${webpKB}KB`);

  const pngUnder300 = pngStats.size < 300 * 1024;
  const webpUnder300 = webpStats.size < 300 * 1024;

  console.log(`\n${pngUnder300 ? '✅' : '❌'} PNG < 300KB: ${pngKB}KB`);
  console.log(`${webpUnder300 ? '✅' : '❌'} WebP < 300KB: ${webpKB}KB`);
}

optimizeAggressively().catch(console.error);
