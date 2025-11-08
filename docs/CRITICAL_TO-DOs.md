# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

---

## Recently Completed ✅

- ✅ Background video integration (commit: 564756d)
- ✅ Interactive demos restored (InteractiveDemo, LessonsDemo)
- ✅ Deployed to Cloudflare (version: a43e3270-59f8-408b-b767-5b2563b29872)

---

## Future Enhancements

### Mobile Performance
- [ ] Test Core Web Vitals on actual mobile devices (iOS Safari, Android Chrome)
- [ ] Measure LCP impact of background videos on mobile
- [ ] Consider loading videos after initial paint for faster LCP
- [ ] Test on low-end devices (< 4GB RAM) and slow connections (3G)

### Video Optimization
- [ ] Consider compressing videos further (target: < 3MB each)
- [ ] Explore WebM format for better compression
- [ ] Add `poster` attribute for placeholder images
- [ ] Implement prefers-reduced-motion support (pause videos if user prefers)
- [ ] Add error handling for video load failures

### Interactive Demos
- [ ] Add E2E tests for InteractiveDemo and LessonsDemo
- [ ] Consider adding more language examples (Egyptian, Latin, etc.)
- [ ] Add completion celebration animation when all matches found
- [ ] Track demo engagement in analytics

### General
- [ ] Add automated tests for cookie consent functionality
- [ ] Consider adding error boundary around CookieConsent component
- [ ] Monitor Sentry for any errors in production

---

*Last updated: 2025-11-08*
