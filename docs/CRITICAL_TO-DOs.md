# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

---

## Background Video Integration

**Status**: ✅ Videos in place, ready for implementation

**Videos added**:
- Desktop: `public/videos/desktop/alexandria1_LANDSCAPE.mp4` (6.1MB)
- Mobile: `public/videos/mobile/simple_papyrus_LANDSCAPE.mp4` (5.9MB)

**Implementation checklist for next AI agent**:

1. **Integrate videos into HeroSection** (components/HeroSection.tsx)
   - Add `<video>` elements with proper attributes (autoplay, loop, muted, playsinline)
   - Use responsive display (show desktop video on desktop, mobile video on mobile)
   - Ensure video is behind content (z-index, absolute positioning)
   - Add fallback gradient background if video fails to load

2. **Performance optimization**
   - Add `preload="metadata"` for faster initial page load
   - Implement lazy loading (load video after critical content)
   - Consider using `poster` attribute for placeholder image
   - Test Core Web Vitals impact (LCP, CLS)

3. **Accessibility & UX**
   - Respect `prefers-reduced-motion` media query (disable autoplay if user prefers)
   - Ensure video doesn't interfere with text readability (overlay, opacity, filters)
   - Add ARIA labels for screen readers
   - Test on low-end devices and slow connections

4. **Testing**
   - Verify on mobile devices (iOS Safari, Android Chrome)
   - Verify on desktop browsers (Chrome, Firefox, Safari, Edge)
   - Check file size impact on page load
   - Ensure videos loop smoothly without visible seams

5. **Cleanup**
   - Remove `.mp4:Zone.Identifier` files (Windows metadata, not needed)
   - Consider converting to WebM format for better compression (optional)

**Example implementation pattern**:
```tsx
<div className="video-background">
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    className="hidden md:block"
    aria-label="Ancient library background"
  >
    <source src="/videos/desktop/alexandria1_LANDSCAPE.mp4" type="video/mp4" />
  </video>
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    className="md:hidden"
    aria-label="Papyrus background"
  >
    <source src="/videos/mobile/simple_papyrus_LANDSCAPE.mp4" type="video/mp4" />
  </video>
</div>
```

---

## Future Considerations

- [ ] Add automated tests for cookie consent functionality
- [ ] Consider adding error boundary around CookieConsent component
- [ ] Monitor Sentry for any cookie-related errors in production
- [ ] Consider compressing videos further (target: < 3MB each)
- [ ] Add loading states and error handling for video playback

---

*Last updated: 2025-11-08*
