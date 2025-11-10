# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

**Last Updated**: 2025-11-10 (04:15 UTC)

---

## ✅ COMPLETED (2025-11-10 - Current Session)

### P0 Bug Fixes (DEPLOYED: ac73b7bd-6faa-4fb0-b204-f303762c30e5)
- ✓ **Fixed Blog Posts Missing** - Removed incompatible `dynamic` exports that conflicted with `cacheComponents` in Next.js 16
- ✓ **Fixed All Languages Section Hidden** - Removed `content-visibility-auto`, `overflow-hidden`, and `contain: layout` CSS that prevented rendering
- ✓ **Deployed to Production** - Both fixes verified working on https://praviel-site.antonnsoloviev.workers.dev
- ✓ **Performance Audit** - Lighthouse score: 81/100 (LCP: 4.25s, CLS: 0.000)

### P0 Improvements (DEPLOYED: 58711e84-c950-4a75-8e61-d208bee3b227)
- ✓ **Preloaded Hero Fonts** - Changed `notoSerifDisplay` to `preload: true` for LCP optimization
- ✓ **Added Loading States** - Created `app/loading.tsx` with skeleton screens for better perceived performance
- ✓ **Added Error Boundary** - Created `app/blog/error.tsx` with proper error handling and user-friendly messaging
- ✓ **Improved Blog Robustness** - Added try-catch blocks, validation, and logging to `lib/blog.ts`
- ✓ **Performance Improvement** - Lighthouse score: 84/100 (+3 points from 81/100)
- ✓ **LCP Status** - 4.26s (unchanged - bottleneck is OpenNext Cloudflare TTFB ~1.5s)

### Major Accomplishments (Previous Session)
- ✓ **Added all 26 remaining languages to languageData.ts** (now 46 total)
  - Phase 2: 16 languages (Classical Armenian, Hittite, Old Egyptian, Avestan, Classical Nahuatl, Classical Tibetan, Old Japanese, Classical Quechua, Middle Persian, Old Irish, Gothic, Geʽez, Sogdian, Ugaritic, Tocharian A & B)
  - Phase 3: 10 languages (Old Turkic, Etruscan, Proto-Norse, Runic Old Norse, Old Persian, Elamite, Classic Maya, Phoenician, Moabite, Punic)
  - All entries include: native names in original scripts, authentic samples, accurate translations, top 10 works, detailed writing instructions, proper RTL flags
  - Updated Language interface to support "partial" tier for Phase 3 languages

- ✓ **Implemented video backgrounds in HeroSection**
  - Desktop: alexandria1_LANDSCAPE.webm (1.3MB) with MP4 fallback
  - Mobile: simple_papyrus_LANDSCAPE.webm (1.7MB) with MP4 fallback
  - Respects `prefers-reduced-motion` preference
  - Poster images for fallback and LCP optimization

- ✓ Type checking passed
- ✓ Linting passed
- ✓ Production build successful (21 pages generated)
- ✓ Deployed to Cloudflare (version: **6e5f19f6-8ced-4178-97e3-82116ec41970**)

---

## 🚨 BLOCKING PRODUCTION/INVESTOR READINESS

### 🔴 P0 - Critical (Do Before Any Investor Demo)
- [ ] **Add Real User Monitoring (RUM)**
  - Enable Sentry performance monitoring (already configured)
  - Add web-vitals reporting to track real user LCP/CLS/INP
  - WHY: Need metrics to prove product-market fit to investors
  - IMPACT: Can't pitch without data

- [ ] **Optimize LCP to < 3.0s** (Current: 4.26s)
  - Try native `<img>` with `fetchpriority="high"` instead of Next/Image for hero poster
  - Inline critical CSS (above-the-fold styles)
  - Remove unused CSS from bundle
  - WHY: 4.26s vs 2.5s target = ~17% conversion loss (~$170K/year at $1M ARR target)
  - REALISTIC TARGET: 3.0s (accounting for 1.5s TTFB we can't control)

- [ ] **Add Analytics & Conversion Tracking**
  - Set up Google Analytics 4 or Plausible
  - Track: Homepage → Blog, Homepage → Language List, CTA clicks
  - WHY: Need conversion funnel data for investor pitch
  - IMPACT: Can't prove traction without metrics

---

## ⚠️ P1 - High Priority (Do This Week)

### Error Handling & Monitoring
- [ ] Enable Sentry error tracking in production (already configured)
- [ ] Add error boundaries to remaining pages (homepage, privacy, fund)
- [ ] Test error boundary UX on real devices

### Testing & Quality
- [ ] Add Playwright tests for critical paths:
  - Homepage loads → CTA visible → clicks work
  - Blog listing → Post detail → Back navigation
  - Language showcase → Expand → Language details
- [ ] Set up Lighthouse CI to prevent performance regressions
- [ ] Add performance budgets (LCP < 3.0s, bundle < 500KB)

### Mobile Experience
- [ ] Test on real iOS devices (Safari, Chrome)
- [ ] Test on real Android devices (Chrome, Samsung Internet)
- [ ] Verify video poster images render correctly
- [ ] Test touch interactions and animations
- [ ] Check for layout shifts on low-end devices

---

## 🟢 P2 - Important (Do This Month)

### Architecture Improvements
- [ ] Refactor blog system:
  - Add comprehensive error messages
  - Consider CMS migration (Contentful, Sanity, or bundle into JS)
  - Add preview mode for unpublished posts
  - Document deployment requirements clearly

### Performance Optimization
- [ ] Audit Tailwind CSS bundle size in production
- [ ] Implement critical CSS extraction
- [ ] Revisit `content-visibility` with proper `contain-intrinsic-size`
- [ ] Optimize font subsetting (only include glyphs actually used)
- [ ] Add resource hints (`preconnect`, `dns-prefetch`) for external domains

### UX Polish
- [ ] Add search/filter to language list (46 languages = overwhelming)
- [ ] Group languages by family/region/time period
- [ ] Add "Recently Viewed" or "Popular" language badges
- [ ] Improve mobile touch targets (ensure 44x44px minimum)

---

## 📋 NICE-TO-HAVE (Backlog)

- [ ] Add keyboard shortcuts for power users (e.g., `/` for search, `esc` to close modals)
- [ ] Add print stylesheet for blog posts (clean, readable print version)
- [ ] Create interactive language demos/lessons
- [ ] Add filtering by script type (alphabetic, logographic, abjad, etc.)
- [ ] Improve accessibility (WCAG 2.1 AA compliance - keyboard nav, screen readers)
- [ ] Add structured data for better SEO (already have blog article markup)
- [ ] Create video tutorials for language learning
- [ ] Add language comparison tool (show multiple languages side-by-side)
- [ ] Implement saved favorites/bookmarks for languages

---

## 📝 TECHNICAL NOTES

**Key Fixes Applied**:
- Removed `export const dynamic = 'force-static'` from blog pages (incompatible with Next.js 16 `cacheComponents`)
- Removed `content-visibility-auto` from LanguageShowcase and globals.css (caused rendering issues)
- Removed `overflow-hidden` from LanguageShowcase (prevented content visibility)
- Removed `contain: layout` from `.language-details` CSS (caused stacking context issues)
- Fixed TypeScript errors in test files (unused error variables, type assertions)

**What Works Well**:
- Blog posts now display correctly (1 post: "The Case for the Classics")
- All Languages section visible (4 featured + "Show 40 More" button)
- Language count accurate (46 languages total)
- Type checking, linting, and build all pass
- Zero CLS (0.000) - excellent layout stability

**Known Issues**:
- **LCP at 4.26s** (target: <2.5s, realistic: <3.0s) - partially due to OpenNext Cloudflare TTFB issues (1.5s+)
- **Performance score 84/100** - improved but not excellent
- **No analytics/monitoring** - CRITICAL for investor readiness
- **No automated tests** - increases maintenance risk
- **Blog system fragile** - better error handling added, but architecture needs rework

---

*Latest Deployment: https://praviel-site.antonnsoloviev.workers.dev (version: 58711e84-c950-4a75-8e61-d208bee3b227)*

**Critical Analysis Document**: See [CRITICAL_ANALYSIS.md](CRITICAL_ANALYSIS.md) for comprehensive multi-perspective evaluation.
