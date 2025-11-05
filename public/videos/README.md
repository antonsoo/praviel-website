# Video Background Assets

This folder contains video backgrounds for the website's hero section.

## Folder Structure

```
videos/
├── desktop/
│   └── background.mp4          # Landscape orientation video (16:9 or similar)
├── mobile/
│   └── background.mp4          # Portrait orientation video (9:16 or similar)
└── README.md                   # This file
```

## Video Specifications

### Desktop Video (Landscape)
- **Orientation**: Landscape (16:9, 21:9, or similar)
- **Recommended Resolution**: 1920x1080 (1080p) or 1280x720 (720p)
- **File Size Target**: 5-16MB (optimized for web)
- **Format**: MP4 (H.264 codec)
- **Duration**: 15-30 seconds (seamless loop)
- **Audio**: None (remove audio track to reduce size)
- **Frame Rate**: 24-30 fps

### Mobile Video (Portrait)
- **Orientation**: Portrait (9:16 or similar)
- **Recommended Resolution**: 1080x1920 (1080p) or 720x1280 (720p)
- **File Size Target**: 5-16MB (optimized for web)
- **Format**: MP4 (H.264 codec)
- **Duration**: 15-30 seconds (seamless loop)
- **Audio**: None (remove audio track to reduce size)
- **Frame Rate**: 24-30 fps

## Video Optimization Tips

### Compression
Use tools like HandBrake, FFmpeg, or online tools to compress videos:

```bash
# Example: FFmpeg compression for web
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a copy output.mp4
```

### Recommendations
1. **Remove audio**: Background videos don't need audio
2. **Optimize for loop**: Ensure first and last frames match for seamless looping
3. **Keep it subtle**: Avoid rapid motion that could distract from content
4. **Test file size**: Aim for <10MB for best performance
5. **Use dark/muted colors**: Enhances text readability with overlay

## Serving Videos

### Option 1: Local Hosting (Current Setup)
- **Pros**: Simple, immediate, works out of the box
- **Cons**: Uses server bandwidth, slower for global users
- **Setup**: Just place videos in the folders above

Videos are served from: `/videos/desktop/background.mp4` and `/videos/mobile/background.mp4`

### Option 2: Cloudflare R2 (Recommended for Production)
- **Pros**: FREE egress bandwidth, global CDN, fast delivery
- **Cons**: Requires initial setup (5-10 minutes)
- **Cost**: ~$0.001/month for storage, $0 for delivery

See [docs/VIDEO_DEPLOYMENT.md](../../docs/VIDEO_DEPLOYMENT.md) for R2 setup instructions.

## Current Implementation

The VideoBackground component automatically:
- ✅ Detects device type (mobile vs desktop)
- ✅ Serves appropriate video orientation
- ✅ Lazy loads videos (only when visible)
- ✅ Respects reduced motion preferences
- ✅ Pauses when off-screen (battery saving)
- ✅ Provides fallback static image
- ✅ GPU-accelerated rendering

## Naming Conventions

**Important**: Keep filenames as `background.mp4` in each folder, or update the component props in `components/HeroSection.tsx` if using different names.

Example custom names:
```tsx
<VideoBackground
  desktopVideoSrc="/videos/desktop/my-custom-landscape.mp4"
  mobileVideoSrc="/videos/mobile/my-custom-portrait.mp4"
  posterSrc="/images/video-poster.jpg"
/>
```

## Testing

After adding videos:
1. Test on desktop (should show landscape video)
2. Test on mobile (should show portrait video)
3. Test with browser dev tools (toggle device emulation)
4. Verify file sizes are optimized (<16MB each)
5. Check that videos loop seamlessly

## Support

For issues or questions, check the component implementation at:
- `/components/VideoBackground.tsx`
- `/components/HeroSection.tsx`
