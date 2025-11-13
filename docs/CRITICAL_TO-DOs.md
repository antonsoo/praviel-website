# CRITICAL TO-DOs

**Last updated:** Nov 13, 2025 22:20 UTC — CLS optimizations deployed and verified
**Production URL:** https://praviel-site.antonnsoloviev.workers.dev
**Current Version ID:** 5cec0dd7-f90f-43ca-af3a-c3255169b3ec
**Production Status:** ✅ **CLS OPTIMIZATIONS DEPLOYED & VERIFIED**

---

## ✅ COMPLETED: CLS Optimization Deployed (Nov 13, 2025 22:00-22:20 UTC)

**Root Cause Identified:**
DeferRender component and related components used `translate-y` transforms that caused 24-60px vertical layout shifts during progressive reveal animations.

**Changes Implemented:**
1. **DeferRender.tsx** - Removed `translate-y-6` (24px shift) → opacity-only transitions
2. **HeroCtaSubcopyVisual.tsx** - Removed `translate-y-1` (4px shift)
3. **StickyCTA.tsx** - Removed `translate-y-8` (32px shift)
4. **GPU Optimization** - Changed `willChange: "opacity, transform"` → `willChange: "opacity"` (before reveal) → `"auto"` (after reveal)

**Measured Impact (Production Lighthouse Mobile):**
- ✅ **CLS: 0.256 → 0.110** (57% improvement, -0.146 points)
- ✅ **LCP: 3.40s → 2.91s** (14% improvement, -490ms)
- ✅ **Performance Score: 74 → 90** (22% improvement, +16 points)
- ✅ Visual effects preserved (smooth opacity fades)
- ✅ No user-visible regressions

**Verification:**
- ✅ Type check: PASS
- ✅ Lint: PASS (0 warnings)
- ✅ Commit: 78b1cdf
- ✅ Deploy: Version 5cec0dd7-f90f-43ca-af3a-c3255169b3ec
- ✅ Lighthouse Mobile: CLS 0.110 ✅ (baseline restored)

---

## ✅ RESOLVED: CLS Degradation Issue (Nov 13, 2025 Earlier Session)

**Previous Production Performance (Lighthouse Mobile, Nov 13 21:21 UTC):**
- **LCP: 3.40s** (13% above 3s threshold, TTFB-bottlenecked)
- **CLS: 0.256** ❌ **DEGRADED** (133% worse than 0.110 baseline)
- **Performance Score: 74/100**

### What Went Wrong (Earlier Session)

**Failed CLS "Optimization" Attempt:**
1. Attempted fix: Removed `content-visibility` from CivilizationPortals
2. Result: CLS worsened to 0.262 (made it worse!)
3. Attempted revert: CLS still 0.256 (no improvement)
4. Root cause was not `content-visibility` — it was translate transforms

**Actual Root Cause (Identified by Later Session):**
- DeferRender, HeroCtaSubcopyVisual, and StickyCTA used `translate-y` transforms
- Cumulative 60px vertical shifts during component reveal animations
- Removing transforms (opacity-only) restored CLS to 0.110 baseline

**LESSON LEARNED:** Always identify actual source of layout shifts before attempting fixes. Browser DevTools → Performance → Layout Shifts panel is essential.

---

## What Actually Works (Verified Nov 13, 2025)

✅ **No Layout Overflow** - Playwright tests: 12/12 passed
  - Mobile (375x667): No horizontal scroll
  - Tablet (768x1024): No horizontal scroll
  - Desktop (1280x720): No horizontal scroll

✅ **No Broken Links** - All key pages return HTTP 200:
  - `/` (homepage)
  - `/blog` (listing)
  - `/blog/2025-11-08-case-for-classics` (post detail)
  - `/fund` (funding page)
  - `/privacy` (privacy policy)

✅ **Forms Have State Management**
  - Waitlist form: loading, error, success states implemented
  - Proper aria-invalid and aria-describedby attributes

✅ **Accessibility Basics**
  - All tap targets ≥44px (WCAG 2.2 compliant)
  - Mobile menu has proper `aria-expanded` state
  - Skip-to-content link present

✅ **Previous Optimizations Still Active**
  - Hero gradient animation removed (mobile)
  - DeferRender delays reduced 87-98%
  - Build time optimized (6.4s → 3.9s, 39% faster)

---

## Critical Tasks for Next Agent (PRIORITIZED)

### 🔴 PRIORITY 1: LCP Optimization (2.91s → ≤2.5s target)

**53% of users abandon sites >3s load time. We're at 2.91s (close to threshold).**

Current LCP 2.91s is below the 3s psychological threshold but still above Google's "good" threshold (2.5s). Infrastructure options:

1. **Quick Win: Static Asset Headers** (1 hour, low complexity)
   - Already exists: `public/_headers` with `Cache-Control` for `/_next/static/*`
   - Verify it's working in production (check response headers)
   - Expected impact: −0.1 to −0.2s on repeat visits
   - Could get us to ~2.7-2.8s LCP

2. **Moderate: Multi-Worker Deployment** (4-6 hours, medium-high complexity)
   - Separate middleware and server Workers
   - Cache hits bypass primary server
   - Expected impact: −0.4 to −0.6s TTFB
   - Could get us to ~2.3-2.5s LCP ✅

3. **Complex: Workers Static Assets** (8-12 hours, high complexity)
   - Migrate from KV to Workers Static Assets for SSG pages
   - Fastest option for fully static pages
   - Expected impact: −0.5 to −0.8s TTFB
   - Could get us to ~2.1-2.4s LCP ✅

**Recommendation:** Verify static headers work first (quick win), then evaluate if 2.7-2.8s LCP is acceptable. If not, consider multi-worker deployment.

### 🟡 PRIORITY 2: Functional UI/UX Work (High ROI)

**These improve actual user experience, not just metrics:**

1. **Living Manuscript Focus Trap** ✅ (already implemented)
   - Full Tab trap implementation (lines 100-118)
   - Escape handler (lines 95-97)
   - Focus restoration to "Focus view" button (lines 77-80)
   - Body scroll lock (lines 88-92)
   - Implementation: components/LivingManuscript.tsx:94-132

2. **Responsive Polish**
   - Test 360×640, 414×896, 768×1024 viewports
   - Currently: No horizontal scroll (verified)
   - Check: Touch targets, readability, spacing

3. **Cross-Browser Testing**
   - Safari iOS + Android Chrome manual testing
   - Not done yet - needs actual device testing

4. **Blog Content**
   - Only 1 blog post exists
   - Consider adding more content or removing "Coming soon" vibes

### 🔵 PRIORITY 3: Monitoring & Alerts

**Still Not Configured:**
- Slack/Resend secrets for monitoring alerts
- Plausible analytics verification
- Sentry error tracking setup

**Note:** Low priority unless production issues arise. Current site is stable.

---

## Performance Context (Current as of Nov 13, 2025 22:20 UTC)

### Current Production Performance (Lighthouse Mobile)

**Metrics:**
- **Performance Score: 90/100** ✅ (excellent, up from 74)
- **LCP: 2.91s** ⚠️ (acceptable, down from 3.40s)
- **CLS: 0.110** ✅ (good, down from 0.256)
- **INP: n/a** (not measured)

### LCP 2.91s - Still TTFB Bottleneck (Infrastructure-Limited)

**Breakdown:**
- **TTFB: ~1.2-1.3s** (~41% of LCP) ← Infrastructure bottleneck
- **Element render: ~0.25-0.30s** (~9% of LCP)
- **LCP Element:** Hero headline text

**Why Client Code Can't Fix This Further:**
- Homepage uses `"use cache"` with `cacheLife("days")`
- Route is static (`○ /` in build output)
- R2 incremental cache + KV namespace configured correctly
- 23 pages pre-rendered successfully

**Known Issue:** OpenNext Cloudflare GitHub #653 documents 1.2-3s TTFB for static pages (we're at ~1.2s, on the better end).

**To improve further:** Would require infrastructure changes (multi-worker deployment, Workers Static Assets, or edge caching optimization).

### CLS 0.110 - FIXED ✅

**Resolution:**
- Root cause: `translate-y` transforms in DeferRender, HeroCtaSubcopyVisual, StickyCTA
- Fix: Opacity-only transitions (no layout-shifting transforms)
- Result: CLS 0.256 → 0.110 (57% improvement)
- Status: ✅ Baseline restored

---

## Build & Deploy Status

**Current Production Deployment:**
- ✅ `pnpm typecheck` - PASS
- ✅ `pnpm lint` - PASS (0 warnings)
- ✅ `pnpm build` - SUCCESS (23 pages generated)
- ✅ **Deployed:** Version 5cec0dd7-f90f-43ca-af3a-c3255169b3ec (Nov 13, 2025 22:17 UTC)
- ✅ **Lighthouse Mobile:** Performance 90/100, LCP 2.91s, CLS 0.110

**Environment:**
- Node.js: 25.1.0
- Next.js: 16.0.1
- React: 19.2.0
- Deployment: Cloudflare Workers (OpenNext adapter)

---

## Instructions for Next Agent

### DO:
- ✅ Verify static asset headers are working in production (quick LCP win)
- ✅ Focus on functional UI/UX improvements (high user impact)
- ✅ Test on real devices (Safari iOS, Android Chrome)
- ✅ Update docs when you find incorrect claims
- ✅ Make quick progress on things that matter
- ✅ Use Chrome DevTools for performance investigation before attempting fixes

### DON'T:
- ❌ Waste hours chasing tiny performance improvements (current metrics are acceptable)
- ❌ Run superficial "audits" that find non-issues
- ❌ Claim tasks are done when they're not
- ❌ Add more documentation files (use this file only)
- ❌ Create session summaries (clutters docs/)

### Key Context:
- **Performance is now good:** 90/100, LCP 2.91s, CLS 0.110
- **Users care about speed:** 2.91s LCP is acceptable (below 3s threshold)
- **Investors care about polish:** Functional flows, no bugs, professional feel
- **Developers care about honesty:** Accurate docs, real fixes, no BS

Current site is **functionally solid** and **performance is acceptable**. Focus on high-impact work: fixing actual bugs > adding features > micro-optimizing metrics.

---

## Responsive Testing Checklist

- [x] No horizontal overflow on mobile (375x667) - 12/12 tests passed
- [x] No horizontal overflow on tablet (768x1024) - 12/12 tests passed
- [x] No horizontal overflow on desktop (1280x720) - 12/12 tests passed
- [x] All links return HTTP 200 (no 404s)
- [x] Forms have proper state management
- [x] Tap targets ≥44px (WCAG compliant)
- [ ] Manual testing on Safari iOS (not done)
- [ ] Manual testing on Android Chrome (not done)
- [ ] Test with slow 3G throttling (not done)

---

## Accessibility Checklist

- [x] Skip-to-content link present
- [x] Mobile menu has aria-expanded
- [x] Form inputs have aria-invalid and aria-describedby
- [x] Tap targets ≥44px minimum
- [ ] Screen reader testing (VoiceOver/TalkBack not done)
- [ ] Keyboard navigation full audit (not done)
- [ ] Color contrast verification (not done)
- [ ] Focus indicators visible (not done)

---

**End of CRITICAL_TO-DOs.md**
