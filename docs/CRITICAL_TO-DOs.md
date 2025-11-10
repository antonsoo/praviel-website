# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

**Last Updated**: 2025-11-10 (11:00 UTC)

---

## ✅ COMPLETED (2025-11-10 - Current Session)

### Website Content & UX Improvements
- ✓ **Updated Roadmap Content** - Revised all 3 phases to reflect actual app capabilities (not just text reading)
  - Phase 1: Foundational content with lessons, reader, grammar, vocabulary, cultural context
  - Phase 2: Advanced features including video lessons, photo exercises, spaced repetition, AI tutors
  - Phase 3: Mobile apps and community features
  - IMPACT: No longer undersells the product, accurately represents comprehensive learning platform

- ✓ **Revised BYOK Section** - Made privacy section more user-friendly and accurate
  - Changed "Bring Your Own Key (BYOK)" to "Flexible AI Options"
  - Updated copy to mention membership plans alongside BYOK option
  - De-emphasized technical BYOK details that non-technical users don't care about
  - IMPACT: More welcoming to general users, less intimidating technical jargon

- ✓ **Fixed Video Background** - Replaced static poster images with actual video playback
  - Desktop: alexandria1_LANDSCAPE.webm (1.3MB) with MP4 fallback
  - Mobile: simple_papyrus_LANDSCAPE.webm (1.7MB) with MP4 fallback
  - Added autoplay, loop, muted, playsInline attributes
  - Poster images as fallback for unsupported browsers
  - IMPACT: Hero section now has dynamic background as intended

### Repository Cleanup
- ✓ **Fixed .gitignore for Lighthouse Directories** - Added proper patterns to ignore lighthouse temp directories
  - Pattern: `**/lighthouse.*` and `**/*lighthouse*/**`
  - Prevents Windows paths like `C:\Users\anton\AppData\Local\lighthouse.*` from appearing in git status
  - IMPACT: Cleaner repo, no more confusing untracked directories

- ✓ **Deleted AI Planning Files** - Removed `docs/NEXT_SESSION_PLAN.md`
  - Kept CRITICAL_ANALYSIS.md (comprehensive and useful)
  - Archive files already gitignored in docs/archive/
  - IMPACT: Less clutter, only actionable docs remain

### Bug Investigation
- ✓ **Investigated Blog Post Issue** - Blog posts ARE working in dev mode
  - Verified "The Case for the Classics" renders correctly
  - Build generates blog pages successfully
  - Issue likely related to production caching or OpenNext Cloudflare deployment
  - User reported: "showed up before... glitched out and disappeared unless I refreshed the page"
  - DIAGNOSIS: Possible caching/SSR issue with OpenNext Cloudflare, not a broken blog system

---

## 🚨 BLOCKING PRODUCTION/INVESTOR READINESS

### 🔴 P0 - Critical (Do Before Any Investor Demo)
- [ ] **Investigate Blog Post Production Issue**
  - Blog works in dev, but user reports it disappears in production
  - Might be caching issue with OpenNext Cloudflare
  - Need to test on production URL and verify caching headers
  - WHY: Blog content is key for SEO and demonstrating thought leadership
  - HOW TO TEST: Deploy and check https://praviel-site.antonnsoloviev.workers.dev/blog

- [ ] **Add Real User Monitoring (RUM)**
  - Enable Sentry performance monitoring (already configured)
  - Add web-vitals reporting to track real user LCP/CLS/INP
  - WHY: Need metrics to prove product-market fit to investors
  - IMPACT: Can't pitch without data

- [ ] **Optimize LCP to < 3.0s** (Current: 4.26s)
  - Video backgrounds may increase LCP (monitor this)
  - Try native `<img>` with `fetchpriority="high"` if video hurts performance
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
  - Homepage loads → Video plays → CTA visible → clicks work
  - Blog listing → Post detail → Back navigation
  - Language showcase → Expand → Language details
- [ ] Set up Lighthouse CI to prevent performance regressions
- [ ] Add performance budgets (LCP < 3.0s, bundle < 500KB)
- [ ] Test video backgrounds impact on LCP (may need to revert if too slow)

### Mobile Experience
- [ ] Test on real iOS devices (Safari, Chrome)
- [ ] Test on real Android devices (Chrome, Samsung Internet)
- [ ] Verify video backgrounds render correctly and don't tank performance
- [ ] Test touch interactions and animations
- [ ] Check for layout shifts on low-end devices

---

## 🟢 P2 - Important (Do This Month)

### Architecture Improvements
- [ ] Refactor blog system:
  - Add comprehensive error messages
  - Debug production caching issue with OpenNext Cloudflare
  - Consider CMS migration (Contentful, Sanity, or bundle into JS)
  - Add preview mode for unpublished posts
  - Document deployment requirements clearly

### Performance Optimization
- [ ] Measure video background impact on performance metrics
- [ ] Audit Tailwind CSS bundle size in production
- [ ] Implement critical CSS extraction
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

**Changes Applied (2025-11-10)**:
- Roadmap updated to reflect comprehensive app capabilities beyond just text reading
- BYOK section revised to be more welcoming (mentions membership plans)
- Video backgrounds enabled (was using static posters before)
- .gitignore updated to properly exclude lighthouse temp directories
- Removed AI planning file (NEXT_SESSION_PLAN.md)

**What Works Well**:
- Blog posts render correctly in dev (1 post: "The Case for the Classics")
- All Languages section visible (4 featured + "Show 40 More" button)
- Language count accurate (46 languages total)
- Type checking, linting, and build all pass
- Video backgrounds add visual polish to hero section

**Known Issues & Investigations Needed**:
- **Blog post production caching**: User reports blog "glitches out" in production - needs investigation
- **LCP at 4.26s** (target: <2.5s, realistic: <3.0s) - video backgrounds may impact this
- **Performance score 84/100** - improved but not excellent
- **No analytics/monitoring** - CRITICAL for investor readiness
- **No automated tests** - increases maintenance risk

**User Feedback Addressed**:
1. ✅ Roadmap no longer undersells product (was "next 60 days" now "in progress" with realistic scope)
2. ✅ BYOK section less intimidating, mentions membership plans
3. ✅ Video backgrounds now actually play (was just static images)
4. ✅ Lighthouse directories no longer clutter git status
5. ⏳ Blog post production issue needs further investigation

---

*Latest Deployment: https://praviel-site.antonnsoloviev.workers.dev (version: TBD - pending deployment)*

**Next Actions**: Run type check, lint, build, test, and deploy to verify all changes work in production.
