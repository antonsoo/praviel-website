# Critical To-Dos

**Purpose**: Track essential work that must be completed. Keep this file concise and information-dense.

**Rules**:
- Only include actionable, critical tasks
- Remove completed items immediately
- No vanity metrics or progress reports
- Dense, scannable format only

---

## Active Tasks

- [ ] **[Testing/Mobile]** Verify mobile UI/UX improvements on actual devices (iPhone SE/12-14, Pixel 5, various Android devices). All components optimized for 320px-414px+ widths with WCAG AAA touch targets (44px min), responsive typography, and mobile-first layouts. New: ScrollProgress indicator, StickyCTA (appears at 100vh). Test: scrolling performance, tap targets, safe area insets on notched devices. (2025-11-04)
- [ ] **[Testing/Browser]** Cross-browser verification on Safari 16.x/17.x, Chrome 111+, Firefox 128+ - Verify GPU-accelerated animations, responsive layouts, and glassmorphism effects. (2025-11-04)
- [ ] **[Performance]** Run Lighthouse audit post-deployment. Targets: LCP <2.5s, INP <200ms, CLS <0.1. Current deployment: Worker startup 21ms (excellent), gzip 1614.69 KiB. (2025-11-04)
- [ ] **[Migration]** Migrate middleware.ts → proxy.ts - Next.js 16 deprecation warning. Not blocking but should migrate before Next.js 17. OpenNext Cloudflare doesn't support proxy.ts yet (tracked in opennextjs/cloudflare#962). Wait for upstream support. (2025-11-04)

---

## Notes

- This file is monitored by AI agents and should not exceed 100 lines to avoid context bloat
- For archived/completed work history, see git commit messages—not this file
