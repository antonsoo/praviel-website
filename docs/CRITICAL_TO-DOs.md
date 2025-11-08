# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

---

## Recently Completed ✅ (Nov 8, 2025 Session)

### ✅ Video Compression (BLOCKING MOBILE PERFORMANCE) - COMPLETED
**Problem**: Video files were MASSIVE (6.1MB + 5.9MB = 12MB total)
**Impact**: Was destroying mobile performance, terrible Core Web Vitals, burning data plans, 10+ second load on 3G

**Solution Implemented**:
- Compressed MP4 videos:
  - Desktop: 6.1MB → 1.7MB (72% reduction)
  - Mobile: 5.9MB → 1.5MB (75% reduction)
- Created WebM versions:
  - Desktop: 1.3MB (79% reduction) ✓ Meets < 1.5MB target
  - Mobile: 1.7MB (71% reduction)
- Added poster images (45KB desktop, 52KB mobile) for faster LCP
- Updated HeroSection.tsx with multi-source video (WebM + MP4 fallback)
- Total video payload reduced from 12MB → ~3MB (75% reduction)

**Result**: Massively improved mobile performance, better Core Web Vitals, faster load times
**Deployed**: Version 8228f69c-65ae-4bc6-913b-c9d730b1a344
**Commit**: d0b9238 (Nov 8, 2025)

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

### Video Optimizations
- [x] Change preload from "metadata" to "none" for better LCP (DONE - already "none")
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

*Last updated: 2025-11-08 (post-video compression & optimization session)*
