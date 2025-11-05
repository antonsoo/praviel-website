# Mobile Video (Portrait Orientation)

Place your portrait-oriented background video here.

## File Requirements

**Filename:** `background.mp4` (or update the path in `components/HeroSection.tsx`)

**Specifications:**
- **Orientation:** Portrait (9:16 or similar)
- **Resolution:** 1080x1920 (1080p) or 720x1280 (720p)
- **File Size:** 5-16MB (optimize with FFmpeg or compression tool)
- **Format:** MP4 with H.264 codec
- **Duration:** 15-30 seconds (seamless loop)
- **Audio:** None (remove audio to reduce file size)
- **Frame Rate:** 24-30 fps

## Example Compression Command

```bash
ffmpeg -i your-original-video.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -vf scale=1080:1920 \
  -an \
  -movflags +faststart \
  background.mp4
```

## Content Suggestions

For best results, your video should:
- Feature slow, subtle motion (not distracting)
- Use dark/muted colors (enhances text readability)
- Match your brand aesthetic (ancient civilizations, scrolls, papyrus, etc.)
- Loop seamlessly (first and last frames should match)
- Work well in vertical orientation (consider how users hold phones)

See `/public/videos/README.md` for complete documentation.
