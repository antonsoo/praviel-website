# Desktop Video (Landscape Orientation)

Place your landscape-oriented background video here.

## File Requirements

**Filename:** `background.mp4` (or update the path in `components/HeroSection.tsx`)

**Specifications:**
- **Orientation:** Landscape (16:9, 21:9, or similar)
- **Resolution:** 1920x1080 (1080p) or 1280x720 (720p)
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
  -vf scale=1920:1080 \
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

See `/public/videos/README.md` for complete documentation.
