# Critical To-Dos

**Purpose**: Track essential work that must be completed. Keep this file concise and information-dense.

**Rules**:
- Only include actionable, critical tasks
- Remove completed items immediately
- No vanity metrics or progress reports
- Dense, scannable format only

---

## 🔴 High Priority (Production Issues)

*All high priority items completed as of 2025-11-04*

## 🟡 Medium Priority (Quality & Testing)

- [ ] **[Testing/Mobile]** Verify mobile UI/UX on actual devices - Primary components optimized (15+ components). Unaudited components: BackToTop, MobileTOC, FundingOptions, FundingHero, ImpactSection, SecondaryCTAs. Test: iPhone SE/12-14, Pixel 5, various Android. Focus: scrolling performance, tap targets (44px min), safe area insets on notched devices, bottom component spacing. (2025-11-04)
- [ ] **[Testing/Browser]** Cross-browser verification - Safari 16.x/17.x, Chrome 111+, Firefox 128+. Verify: GPU-accelerated animations, responsive layouts, glassmorphism effects, Motion 12 compatibility. (2025-11-04)
- [ ] **[Performance]** Lighthouse audit - Targets: LCP <2.5s, INP <200ms, CLS <0.1. Current deployment: Worker startup 21ms (✅), gzip 1614.69 KiB. Run on actual deployment URL. (2025-11-04)
- [ ] **[Accessibility]** Full accessibility audit - Screen reader testing (NVDA/JAWS/VoiceOver), keyboard navigation (tab order, focus indicators), color contrast verification (WCAG AA minimum), focus visible states on all interactive elements. (2025-11-04)

## 🟢 Low Priority (Nice to Have)

- [ ] **[Monitoring/Production]** Set up error tracking - Sentry or LogRocket for production error monitoring. Integrate with Next.js instrumentation.ts. Add session replay for debugging user issues. (2025-11-04)
- [ ] **[Analytics/Growth]** Implement privacy-friendly analytics - Track Core Web Vitals, conversion funnels (waitlist signups), page views. Consider: Vercel Analytics, Cloudflare Web Analytics, or self-hosted Plausible. (2025-11-04)
- [ ] **[Modernization/React19]** Migrate to React 19 hooks - Replace useTransition in WaitlistForm with useActionState. Consider useOptimistic for optimistic UI updates. Current pattern works but new hooks provide better DX. (2025-11-04)
- [ ] **[Migration/Next16]** Migrate middleware.ts → proxy.ts - Next.js 16 deprecation warning (not blocking). OpenNext Cloudflare doesn't support proxy.ts yet (tracked: opennextjs/cloudflare#962). Wait for upstream support. (2025-11-04)
- [ ] **[Database]** Verify Drizzle migrations - Current: waitlist_signups table. Verify migration status with `pnpm db:push`. Consider adding indexes for email lookups. (2025-11-04)

---

## 📋 Deployment Info (Reference)

**Latest Updates**: 2025-11-04
- SEO: ✅ Added sitemap.ts and robots.ts
- Security: ✅ Implemented CSP and security headers in middleware
- Mobile: ✅ Fixed bottom component spacing conflicts
- Status: Ready for testing and deployment

**Tech Stack (Late 2025)**:
- Next.js 16.0.1 + React 19.2.0 + Motion 12.23.24
- Node.js 25+, pnpm 10.20.0
- Cloudflare Workers (experimental-edge runtime)
- Drizzle ORM + Neon PostgreSQL

---

## Notes

- This file is monitored by AI agents and should not exceed 150 lines
- For completed work history, see git commit messages
- For tech stack details and operating principles, see CLAUDE.md and AGENTS.md
- Priority levels: 🔴 Fix ASAP (production impact), 🟡 Important (quality), 🟢 Nice to have (enhancement)
