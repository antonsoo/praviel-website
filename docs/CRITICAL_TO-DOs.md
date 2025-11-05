# Critical To-Dos

**Purpose**: Track essential work that must be completed. Keep this file concise and information-dense.

**Rules**:
- Only include actionable, critical tasks
- Remove completed items immediately
- No vanity metrics or progress reports
- Dense, scannable format only

---

## 🔴 High Priority (Production Issues)

- [ ] **[Database/CRITICAL]** Apply database migration - Migration `drizzle/0001_sturdy_christian_walker.sql` was generated but NEVER APPLIED. Run `pnpm db:push` to apply unique email constraint and indexes to production database. Without this, duplicate email signups can occur and queries are not optimized. **BLOCKING: Waitlist functionality may break.** (2025-11-05)

- [ ] **[Database/Env]** Verify DATABASE_URL in default Cloudflare environment - Code deploys to `praviel-site` (default) but wrangler.jsonc only documents secrets for `praviel-site-production` environment. Verify secret is set for default environment: `pnpm wrangler secret list`. If not set, run `pnpm wrangler secret put DATABASE_URL` and paste the Neon connection string. (2025-11-05)

- [ ] **[Video/Production]** Test video backgrounds on production URL - Videos deployed (5.4MB desktop + 4.1MB mobile) but NOT TESTED. Verify: https://praviel-site.antonnsoloviev.workers.dev loads both videos, videos play/pause correctly, lazy loading works, no 404s. Videos use symbolic links which might not work on Cloudflare despite `nodejs_compat` flag. (2025-11-05)

- [ ] **[Error Handling]** Improve waitlist duplicate email handling - `app/actions.ts:49-56` catches all errors and returns success. Should check for PostgreSQL error code 23505 (unique constraint) vs real errors. Current code: `console.error("Waitlist signup error:", err)` - add: `if (err.code === '23505') console.log('Duplicate email (expected)')`. See: https://orm.drizzle.team/ for DrizzleQueryError. (2025-11-05)

## 🟡 Medium Priority (Quality & Testing)

- [ ] **[Testing/Production]** Full production deployment verification checklist:
  1. Visit https://praviel-site.antonnsoloviev.workers.dev
  2. Verify hero video plays (desktop)
  3. Test on mobile (portrait video should load)
  4. Submit waitlist form with valid email - should succeed
  5. Submit same email again - should succeed (duplicate handling)
  6. Check Cloudflare Workers logs for errors
  7. Verify database has entry: check Neon dashboard
  (2025-11-05)

- [ ] **[Testing/Mobile]** Real device testing - Code changes made for safe-area-inset and 44px tap targets but NOT TESTED on actual devices. Test on: iPhone 14 Pro (notch), iPhone SE (no notch), Pixel 5. Focus: BackToTop button position, MobileTOC floating button, tap target sizes. (2025-11-05)

- [ ] **[Performance]** Lighthouse audit - Run `npx lighthouse https://praviel-site.antonnsoloviev.workers.dev --view` locally. Targets: LCP <2.5s, INP <200ms, CLS <0.1. Current: Worker startup 33ms (last deployment), gzip 1618.41 KiB. Check if large videos (9.5MB total) impact LCP. (2025-11-05)

- [ ] **[Accessibility]** Screen reader & keyboard testing - Added aria-labels but never tested with actual assistive tech. Test: NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS). Verify: all buttons have labels, form errors announced, keyboard navigation works (Tab order), focus visible on all elements. (2025-11-05)

- [ ] **[Testing/Browser]** Cross-browser verification - Safari 16.x/17.x, Chrome 111+, Firefox 128+. Verify: backdrop-blur-md works (Safari has issues with blur), GPU animations, Motion 12.23 compatibility. Known issue: Motion (motion.dev) is different from Framer Motion (incompatible with React 19). (2025-11-05)

- [ ] **[Video/Caching]** Configure video file caching headers - Create `public/_headers` file with: `/_next/static/* Cache-Control: public,max-age=31536000,immutable` and `/videos/* Cache-Control: public,max-age=604800`. Static assets served via Workers Static Assets (25MB per-file limit, videos are 5.4MB + 4.1MB = under limit). (2025-11-05)

## 🟢 Low Priority (Nice to Have)

- [ ] **[Monitoring/Production]** Set up error tracking - No monitoring = blind to production issues. Options: Sentry (popular), LogRocket (session replay), Cloudflare Workers Analytics (built-in). Integrate with Next.js `instrumentation.ts`. Track: waitlist errors, video loading failures, database connection issues. (2025-11-04)

- [ ] **[Analytics/Growth]** Privacy-friendly analytics - Can't measure success without data. Options: Vercel Analytics (easiest), Cloudflare Web Analytics (privacy-focused), Plausible (self-hosted). Track: Core Web Vitals, waitlist conversion rate, video play rate, bounce rate. (2025-11-04)

- [ ] **[Database/Optimization]** Investigate revalidateTag usage - `app/actions.ts:46` uses `revalidateTag("waitlist", "max")` with Next.js 16 profile API. This is new syntax - verify it works as expected. Docs: https://nextjs.org/docs/app/api-reference/functions/revalidateTag (2025-11-05)

- [ ] **[React Compiler]** Monitor for memoization issues - Using React Compiler 1.0 (babel-plugin-react-compiler@1.0.0) but no comprehensive testing done. Watch for: infinite loops, effects over-firing, missing updates. If issues occur, use `"use no memo"` directive to opt out. Known issue: TanStack Table incompatibility. Docs: https://react.dev/learn/react-compiler/debugging (2025-11-05)

- [ ] **[Migration/Next16]** Migrate middleware.ts → proxy.ts - Deprecation warning in deployment logs. OpenNext Cloudflare doesn't support proxy.ts yet (opennextjs/cloudflare#962). Current workaround: keep using middleware.ts. Monitor issue for updates. (2025-11-04)

---

## 📋 Deployment Info (Reference)

**Latest Deployment**: 2025-11-05 02:31 UTC
- **URL**: https://praviel-site.antonnsoloviev.workers.dev
- **Version**: 9ab47321-853b-40f1-8de5-4edc359d320a
- **Worker Startup**: 33ms
- **Bundle Size**: 8027.71 KiB (1618.41 KiB gzipped)
- **Commit**: 8ac2745 (feat: comprehensive mobile optimization...)

**What Was Actually Deployed**:
- Video backgrounds: backdrop-blur-md (increased from -sm)
- Mobile optimizations: safe-area-inset, 44px tap targets (code only, not tested)
- Accessibility: aria-labels on MusicToggle, MobileTOC (code only, not tested)
- Database schema: migration generated but NOT APPLIED ⚠️
- Video files: 5.4MB + 4.1MB via symbolic links (not verified to work)

**What Still Needs Work** (see sections above):
- ⚠️ Database migration not applied (CRITICAL)
- ⚠️ DATABASE_URL env var not verified for default environment
- ⚠️ Video backgrounds not tested on production URL
- ⚠️ No production testing done (waitlist, videos, mobile, accessibility)
- ⚠️ No error monitoring or analytics
- ⚠️ Error handling needs improvement (23505 code check)

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
