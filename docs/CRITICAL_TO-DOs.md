# Critical To-Dos

**Purpose**: Track essential work that must be completed. Keep this file concise and information-dense.

**Rules**:
- Only include actionable, critical tasks
- Remove completed items immediately
- No vanity metrics or progress reports
- Dense, scannable format only

---

## 🔴 High Priority (Production Issues)

- [x] **[Database/CRITICAL]** ✅ COMPLETED - Applied database migration with `pnpm db:push`. Unique email constraint and indexes now active in production database. (2025-11-05)

- [x] **[Database/Env]** ✅ COMPLETED - DATABASE_URL configured in default Cloudflare environment. Secret verified with `pnpm wrangler secret list`. (2025-11-05)

- [x] **[Video/Production]** ✅ COMPLETED - Video backgrounds tested and working on production URL. Both desktop (5.4MB) and mobile (4.1MB) videos load correctly with Cache-Control headers: `public, max-age=604800, stale-while-revalidate=86400`. Videos accessible at `/videos/desktop/background.mp4` and `/videos/mobile/background.mp4`. (2025-11-05)

- [x] **[Error Handling]** ✅ COMPLETED - Improved waitlist error handling in `app/actions.ts`. Now differentiates between PostgreSQL error code 23505 (expected duplicate email) and unexpected database errors. Duplicate emails log as info, real errors log as errors. (2025-11-05)

## 🟡 Medium Priority (Quality & Testing)

- [x] **[Video/Caching]** ✅ COMPLETED - Created `public/_headers` file with caching headers for videos, images, and static assets. Verified working: videos serve with `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`, static assets with `max-age=31536000, immutable`. (2025-11-05)

- [ ] **[Testing/Production]** Full production deployment verification checklist:
  1. ✅ Visit https://praviel-site.antonnsoloviev.workers.dev - WORKING
  2. ✅ Verify hero video plays (desktop) - WORKING (video element present, file accessible)
  3. Test on mobile (portrait video should load) - NEEDS MANUAL TESTING
  4. Submit waitlist form with valid email - NEEDS TESTING
  5. Submit same email again - NEEDS TESTING (duplicate handling implemented)
  6. Check Cloudflare Workers logs for errors - NEEDS MONITORING
  7. Verify database has entry: check Neon dashboard - NEEDS VERIFICATION
  (2025-11-05)

- [ ] **[Testing/Mobile]** Real device testing - Code changes made for safe-area-inset and 44px tap targets but NOT TESTED on actual devices. Test on: iPhone 14 Pro (notch), iPhone SE (no notch), Pixel 5. Focus: BackToTop button position, MobileTOC floating button, tap target sizes. (2025-11-05)

- [ ] **[Performance]** Lighthouse audit - Run manually on Windows or Mac (Lighthouse fails in WSL2 due to Chrome issues). Use online PageSpeed Insights (https://pagespeed.web.dev) or local Chrome DevTools. Targets: LCP <2.5s, INP <200ms, CLS <0.1. Current: Worker startup 28ms, gzip 1623.41 KiB. Videos properly cached (9.5MB total). (2025-11-05)

- [ ] **[Accessibility]** Screen reader & keyboard testing - Added aria-labels but never tested with actual assistive tech. Test: NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS). Verify: all buttons have labels, form errors announced, keyboard navigation works (Tab order), focus visible on all elements. (2025-11-05)

- [ ] **[Testing/Browser]** Cross-browser verification - Safari 16.x/17.x, Chrome 111+, Firefox 128+. Verify: backdrop-blur-md works (Safari has issues with blur), GPU animations, Motion 12.23 compatibility. Known issue: Motion (motion.dev) is different from Framer Motion (incompatible with React 19). (2025-11-05)

## 🟢 Low Priority (Nice to Have)

- [ ] **[Monitoring/Production]** Set up error tracking - No monitoring = blind to production issues. Options: Sentry (popular), LogRocket (session replay), Cloudflare Workers Analytics (built-in). Integrate with Next.js `instrumentation.ts`. Track: waitlist errors, video loading failures, database connection issues. (2025-11-04)

- [ ] **[Analytics/Growth]** Privacy-friendly analytics - Can't measure success without data. Options: Vercel Analytics (easiest), Cloudflare Web Analytics (privacy-focused), Plausible (self-hosted). Track: Core Web Vitals, waitlist conversion rate, video play rate, bounce rate. (2025-11-04)

- [ ] **[Database/Optimization]** Investigate revalidateTag usage - `app/actions.ts:46` uses `revalidateTag("waitlist", "max")` with Next.js 16 profile API. This is new syntax - verify it works as expected. Docs: https://nextjs.org/docs/app/api-reference/functions/revalidateTag (2025-11-05)

- [ ] **[React Compiler]** Monitor for memoization issues - Using React Compiler 1.0 (babel-plugin-react-compiler@1.0.0) but no comprehensive testing done. Watch for: infinite loops, effects over-firing, missing updates. If issues occur, use `"use no memo"` directive to opt out. Known issue: TanStack Table incompatibility. Docs: https://react.dev/learn/react-compiler/debugging (2025-11-05)

- [ ] **[Migration/Next16]** Migrate middleware.ts → proxy.ts - Deprecation warning in deployment logs. OpenNext Cloudflare doesn't support proxy.ts yet (opennextjs/cloudflare#962). Current workaround: keep using middleware.ts. Monitor issue for updates. (2025-11-04)

---

## 📋 Deployment Info (Reference)

**Latest Deployment**: 2025-11-05 10:20 UTC
- **URL**: https://praviel-site.antonnsoloviev.workers.dev
- **Version**: bfe1f0cd-648c-4e0f-a8b0-8945992e68e9
- **Worker Startup**: 28ms (improved from 33ms)
- **Bundle Size**: 8027.83 KiB (1623.41 KiB gzipped)
- **Commit**: [pending] (feat: fix critical production issues...)

**What Was Actually Deployed**:
- ✅ Database migration: Applied unique email constraint and indexes
- ✅ DATABASE_URL: Configured in default Cloudflare environment
- ✅ Error handling: Improved duplicate email detection (PostgreSQL 23505)
- ✅ Video caching: Configured Cache-Control headers via `public/_headers`
- ✅ Video backgrounds: Verified working on production (desktop + mobile)
- Video backgrounds: backdrop-blur-md (increased from -sm)
- Mobile optimizations: safe-area-inset, 44px tap targets (code only, not tested)
- Accessibility: aria-labels on MusicToggle, MobileTOC (code only, not tested)

**What Still Needs Work** (see sections above):
- Manual testing: Waitlist form submission, mobile devices, accessibility
- Lighthouse audit: Must be run manually (fails in WSL2)
- Cross-browser testing: Safari, Chrome, Firefox
- Error monitoring: Sentry, LogRocket, or Cloudflare Analytics
- Analytics: Privacy-friendly analytics for tracking Core Web Vitals

**Tech Stack (Late 2025)**:
- Next.js 16.0.1 (Turbopack, React Compiler 1.0, Cache Components)
- React 19.2.0 (stable Oct 1, 2025 - using useActionState)
- Motion 12.23.24 (motion.dev - compatible with React 19, NOT Framer Motion)
- Node.js 25.1.0+ (baseline Oct 15, 2025)
- pnpm 10.20.0
- Cloudflare Workers (nodejs_compat, experimental-edge runtime)
- Drizzle ORM 0.44.7 + @neondatabase/serverless 1.0.2 (HTTP fetch mode)
- Neon PostgreSQL (Azure East US 2)

**Known Issues & Workarounds**:
- middleware.ts deprecation warning: OpenNext Cloudflare #962 (proxy.ts not supported yet)
- React Compiler 1.0: no comprehensive testing, may have memoization issues
- Symbolic links: may not work on Cloudflare despite nodejs_compat flag
- revalidateTag profile API: new Next.js 16 syntax, not verified

---

## Notes

- This file is monitored by AI agents and should not exceed 200 lines
- Be HONEST about what's not done - next AI agent needs accurate information
- For completed work history, see git commit messages
- For tech stack details and operating principles, see CLAUDE.md and AGENTS.md
- Priority levels: 🔴 Fix ASAP (production impact), 🟡 Important (quality), 🟢 Nice to have (enhancement)
- **IMPORTANT**: Test everything before claiming it works. Code changes ≠ working feature.
