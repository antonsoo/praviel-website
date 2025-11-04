#!/usr/bin/env tsx
/**
 * Optimize OG (Open Graph) image for social media sharing
 *
 * Requirements:
 * - Dimensions: 1200x630px (standard OG size)
 * - File size: < 300KB (ideally < 200KB)
 * - Format: PNG (for transparency support) or WebP
 * - Quality: High enough for social sharing
 */

import sharp from 'sharp';
import { resolve } from 'path';
import { statSync } from 'fs';

const publicDir = resolve(process.cwd(), 'public');
const inputPath = resolve(publicDir, 'og.png');
const outputPath = resolve(publicDir, 'og-optimized.png');
const webpPath = resolve(publicDir, 'og.webp');

async function optimizeOGImage() {
  console.log('🖼️  Optimizing OG image...\n');

  // Get original file stats
  const originalStats = statSync(inputPath);
  const originalSizeMB = (originalStats.size / 1024 / 1024).toFixed(2);
  console.log(`Original: ${originalSizeMB}MB`);

  // Read original image metadata
  const metadata = await sharp(inputPath).metadata();
  console.log(`Dimensions: ${metadata.width}x${metadata.height}`);

  // Optimize PNG version
  // Correct dimensions: 1200x630 (standard OG)
  // Crop from center if aspect ratio doesn't match
  await sharp(inputPath)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center',
    })
    .png({
      quality: 85,
      compressionLevel: 9, // Maximum compression
      palette: true, // Use palette-based PNG for smaller size
    })
    .toFile(outputPath);

  const pngStats = statSync(outputPath);
  const pngSizeKB = (pngStats.size / 1024).toFixed(1);
  console.log(`✅ PNG optimized: ${pngSizeKB}KB (1200x630)`);

  // Create WebP version (better compression, modern format)
  await sharp(inputPath)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center',
    })
    .webp({
      quality: 90,
      effort: 6, // Higher effort = better compression
    })
    .toFile(webpPath);

  const webpStats = statSync(webpPath);
  const webpSizeKB = (webpStats.size / 1024).toFixed(1);
  console.log(`✅ WebP created: ${webpSizeKB}KB (1200x630)`);

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Original: ${originalSizeMB}MB (${metadata.width}x${metadata.height})`);
  console.log(`   PNG:      ${pngSizeKB}KB (1200x630) - ${((pngStats.size / originalStats.size) * 100).toFixed(1)}% of original`);
  console.log(`   WebP:     ${webpSizeKB}KB (1200x630) - ${((webpStats.size / originalStats.size) * 100).toFixed(1)}% of original`);

  if (pngStats.size > 300 * 1024) {
    console.log('\n⚠️  PNG still > 300KB. Consider using WebP as primary format.');
  } else {
    console.log('\n✨ PNG is under 300KB target!');
  }

  console.log('\n📝 Next steps:');
  console.log('   1. Review og-optimized.png and og.webp visually');
  console.log('   2. If satisfied, rename og-optimized.png → og.png');
  console.log('   3. Consider using og.webp as primary format in metadata');
}

optimizeOGImage().catch((err) => {
  console.error('❌ Error optimizing image:', err);
  process.exit(1);
});
