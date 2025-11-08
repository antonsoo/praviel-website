# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

---

## 🔴 CRITICAL - Must Do Immediately

### Video Compression (BLOCKING MOBILE PERFORMANCE)
**Problem**: Video files are MASSIVE (6.1MB + 5.9MB = 12MB total)
**Impact**: Destroys mobile performance, terrible Core Web Vitals, burns data plans, 10+ second load on 3G

**Target Sizes**:
- Desktop: < 1.5MB (75% reduction needed)
- Mobile: < 1MB (83% reduction needed)

**Solution** (requires FFmpeg):
```bash
# Install FFmpeg if needed
sudo apt install ffmpeg

# Compress desktop video
ffmpeg -i public/videos/desktop/alexandria1_LANDSCAPE.mp4 \
  -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an \
  public/videos/desktop/alexandria1_LANDSCAPE_compressed.mp4

# Compress mobile video
ffmpeg -i public/videos/mobile/simple_papyrus_LANDSCAPE.mp4 \
  -vf "scale=1080:-2" -c:v libx264 -crf 30 -preset slow -an \
  public/videos/mobile/simple_papyrus_LANDSCAPE_compressed.mp4

# Create WebM versions (even better compression)
ffmpeg -i public/videos/desktop/alexandria1_LANDSCAPE_compressed.mp4 \
  -c:v libvpx-vp9 -crf 35 -b:v 0 -an \
  public/videos/desktop/alexandria1_LANDSCAPE.webm

ffmpeg -i public/videos/mobile/simple_papyrus_LANDSCAPE_compressed.mp4 \
  -c:v libvpx-vp9 -crf 37 -b:v 0 -an \
  public/videos/mobile/simple_papyrus_LANDSCAPE.webm

# Extract poster images
ffmpeg -i public/videos/desktop/alexandria1_LANDSCAPE.mp4 -vframes 1 -f image2 public/videos/desktop/poster.jpg
ffmpeg -i public/videos/mobile/simple_papyrus_LANDSCAPE.mp4 -vframes 1 -f image2 public/videos/mobile/poster.jpg
```

**Then update** `components/HeroSection.tsx`:
```tsx
<video poster="/videos/desktop/poster.jpg" ...>
  <source src="/videos/desktop/alexandria1_LANDSCAPE.webm" type="video/webm" />
  <source src="/videos/desktop/alexandria1_LANDSCAPE_compressed.mp4" type="video/mp4" />
</video>
```

---

## Recently Completed ✅ (Nov 8, 2025 Session)

- ✅ Background video integration with responsive desktop/mobile videos
- ✅ **CRITICAL**: Accessibility fix - prefers-reduced-motion support (WCAG 2.1 compliant)
- ✅ **CRITICAL**: Page restructure to reduce info overload (10 sections → 7 clean marketing sections)
- ✅ **CRITICAL**: Removed redundant app feature demos (InteractiveDemo, LessonsDemo) - website is now pure marketing, not app demo
- ✅ Removed FeatureGrid (redundant with ComparisonTable)
- ✅ Video preload optimization (metadata → none) for faster initial load
- ✅ All messaging aligned with core docs from main repo
- ✅ Deployed to Cloudflare production multiple times

---

## High Priority

### Mobile Performance Testing
- [ ] Test Core Web Vitals on actual mobile devices (iOS Safari, Android Chrome)
- [ ] Measure LCP impact of background videos on mobile
- [ ] Test on low-end devices (< 4GB RAM) and slow connections (3G)
- [ ] Verify no layout shift from videos

### Video Optimizations (After Compression)
- [ ] Change preload from "metadata" to "none" for better LCP
- [ ] Add error handling for video load failures
- [ ] Consider lazy-loading videos with Intersection Observer

---

## Future Enhancements

### Interactive Demos
- [ ] Add Intersection Observer for lazy-loading (only load when scrolled into view)
- [ ] Add E2E tests for InteractiveDemo and LessonsDemo
- [ ] Consider adding more language examples (Egyptian, Latin, etc.)
- [ ] Add completion celebration animation when all matches found
- [ ] Track demo engagement in analytics

### General
- [ ] Add automated tests for cookie consent functionality
- [ ] Consider adding error boundary around CookieConsent component
- [ ] Monitor Sentry for any errors in production

---

*Last updated: 2025-11-08 (post-comprehensive review session)*
