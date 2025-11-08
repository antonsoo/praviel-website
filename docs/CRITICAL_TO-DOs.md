# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

---

## Video Assets (Background Videos)

**Status**: Folders created, awaiting video files

**Structure created**:
- `public/videos/mobile/` - For vertical/portrait orientation videos (mobile devices)
- `public/videos/desktop/` - For horizontal/landscape orientation videos (desktop/tablet)

**Action Required**:
1. Place mobile-oriented videos in `public/videos/mobile/`
2. Place desktop-oriented videos in `public/videos/desktop/`
3. Recommended formats: WebM (VP9/AV1) or MP4 (H.264)
4. Keep file sizes small: < 2MB mobile, < 5MB desktop

**Next Steps After Adding Videos**:
- Update HeroSection component to use background videos
- Add lazy loading and prefers-reduced-motion support
- Test on mobile and desktop devices
- Verify performance impact (Core Web Vitals)

---

## Future Considerations

- [ ] Add automated tests for cookie consent functionality
- [ ] Consider adding error boundary around CookieConsent component
- [ ] Monitor Sentry for any cookie-related errors in production

---

*Last updated: 2025-11-08*
