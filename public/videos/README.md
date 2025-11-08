# Video Assets

This directory contains background videos for the website.

## Structure

- **`mobile/`** - Vertical/portrait orientation videos for mobile devices
- **`desktop/`** - Horizontal/landscape orientation videos for desktop/tablet

## Usage

Place your video files in the appropriate folders:
- Mobile videos: `public/videos/mobile/`
- Desktop videos: `public/videos/desktop/`

Videos will be served from `/videos/mobile/...` and `/videos/desktop/...` URLs.

## Recommended Formats

- **Format**: WebM (best compression) or MP4 (wider compatibility)
- **Codecs**: VP9/AV1 for WebM, H.264 for MP4
- **Mobile**: 9:16 aspect ratio (portrait)
- **Desktop**: 16:9 aspect ratio (landscape)

## File Size Optimization

Keep videos small for performance:
- Target: < 2MB for mobile, < 5MB for desktop
- Use compression tools: HandBrake, FFmpeg
- Consider serving different qualities based on connection speed
