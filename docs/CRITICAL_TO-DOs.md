# Critical To-Dos

**Purpose**: Track essential work that must be completed. Keep this file concise and information-dense.

**Rules**:
- Only include actionable, critical tasks
- Remove completed items immediately
- No vanity metrics or progress reports
- Dense, scannable format only

---

## 🔴 High Priority (Production Issues)

_No critical production issues at this time._

## 🟡 Medium Priority (Quality & Testing)

- [ ] **[Testing/Browser]** Cross-browser verification - Safari 16.x/17.x, Chrome 111+, Firefox 128+. Verify: GPU-accelerated animations, responsive layouts, glassmorphism effects, Motion 12 compatibility. (2025-11-04)
- [ ] **[Performance]** Lighthouse audit - Targets: LCP <2.5s, INP <200ms, CLS <0.1. Current deployment: Worker startup 23ms (✅), gzip 1629.64 KiB. Run on actual deployment URL. (2025-11-05)

## 🟢 Low Priority (Nice to Have)

- [ ] **[Monitoring/Production]** Set up error tracking - Sentry or LogRocket for production error monitoring. Integrate with Next.js instrumentation.ts. Add session replay for debugging user issues. (2025-11-04)
- [ ] **[Analytics/Growth]** Implement privacy-friendly analytics - Track Core Web Vitals, conversion funnels (waitlist signups), page views. Consider: Vercel Analytics, Cloudflare Web Analytics, or self-hosted Plausible. (2025-11-04)
- [ ] **[Migration/Next16]** Migrate middleware.ts → proxy.ts - Next.js 16 deprecation warning (not blocking). OpenNext Cloudflare doesn't support proxy.ts yet (tracked: opennextjs/cloudflare#962). Wait for upstream support. (2025-11-04)

---

## 📋 Deployment Info (Reference)

**Latest Updates**: 2025-11-05
- Video: ✅ Deployed video backgrounds with increased blur (backdrop-blur-md)
- Mobile: ✅ Optimized all mobile UI components (safe-area-inset, 44px tap targets)
- Accessibility: ✅ Added aria-labels and aria-pressed states to interactive elements
- Database: ✅ Optimized schema with unique email constraint and indexes
- React 19: ✅ Already using useActionState (modern pattern)
- Status: Production deployment live at praviel-site.antonnsoloviev.workers.dev

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
