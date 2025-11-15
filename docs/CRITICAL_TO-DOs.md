# CRITICAL TO-DOs

**Last updated:** Nov 15, 2025 — Animation refactored, waitlist restored, GPU acceleration NOT verified
**Production URL:** https://praviel.com (✅ **DEPLOYED** - Version: e2b830a5-e58d-49b9-ac25-be222a7f2823)
**Recent Commits:**
- 071409e (fix: Add dedicated Waitlist section to restore form after removing JourneyTimeline)
- 34677d3 (perf: Convert aurora animation from background-position to GPU-accelerated transform)
- 7c02d3f (refactor: Remove VoiceTour and JourneyTimeline sections)
**Production Status:** ⚠️ **DEPLOYED BUT UNVERIFIED** — Code changes deployed, GPU acceleration and functionality NOT tested

---

## 🚨 CRITICAL: What Next Agent MUST Verify

### The animation refactor is THEORETICAL, not verified in practice
**What was done:** Converted animation from `background-position` (CPU) to `transform: translate()` on pseudo-elements (theoretically GPU-accelerated)

**What was NOT done:**
- ❌ Did NOT verify animations are actually GPU-accelerated using Chrome DevTools
- ❌ Did NOT test immersive mode toggle actually enables animations
- ❌ Did NOT verify lag is fixed on user's gaming PC
- ❌ Did NOT test animation smoothness when enabled
- ❌ Did NOT verify pseudo-elements create composited layers

**This is a RISK:** The fix might not actually be GPU-accelerated, or might have performance issues.

---

## ✅ COMPLETED CODE CHANGES (Nov 15, 2025)

### 1. Animation Refactor — Transform-Based Approach
**Problem:** Background-position animations are CPU-rendered and cause lag
**Approach:** Converted to transform-based animations (SHOULD be GPU-accelerated, but NOT verified)

**Changes:**
- Split `.site-bg-gradient` into base element + `::before`/`::after` pseudo-elements
- Each pseudo-element uses `transform: translate()` for animation
- Added `will-change: transform` and `transform: translateZ(0)` to trigger GPU compositing
- Removed CPU-heavy `background-position` animation

**Files Modified:**
- `app/globals.css:455-506` - Complete rewrite of aurora animation system

**Web Research Findings (Nov 2025):**
- Transform and opacity are the only reliably GPU-accelerated properties
- `transform: translateZ(0)` triggers GPU acceleration in modern browsers
- `will-change` should be used selectively (we're using it - may need cleanup)
- Best animation durations: 200-300ms (we're using 40s - may be too long)
- Verification method: Chrome DevTools > Rendering > Show composited layer borders (orange = GPU)

### 2. Waitlist Form Restoration
**Problem:** Removing JourneyTimeline accidentally removed the only waitlist form
**Solution:** Created dedicated WaitlistSection component

**Changes:**
- Created `components/WaitlistSection.tsx` with form, web app link, classroom contact
- Added to homepage between FAQ and PrivacyFirst
- Form submission NOT tested (only verified input exists)

**Files Modified:**
- `components/WaitlistSection.tsx` (new file)
- `app/page.tsx` - Added WaitlistSection import and usage

### 3. Basic Production Verification
- ✅ Deployed to praviel.com/* (production environment)
- ✅ Waitlist email input exists on page
- ✅ No console errors
- ✅ No React hydration errors
- ✅ Horizontal scroll prevented on mobile (Puppeteer emulation)
- ✅ All pages load correctly

**What was NOT tested:**
- ❌ Waitlist form submission (does it actually send to backend?)
- ❌ Immersive mode toggle functionality
- ❌ Animation performance when enabled
- ❌ Real mobile device testing (only Puppeteer emulation)
- ❌ Cross-browser testing (Safari, Firefox, Edge)
- ❌ Core Web Vitals / Performance metrics

---

## 🔴 PRIORITY 1: VERIFY GPU ACCELERATION ACTUALLY WORKS

**Next agent: DO THIS FIRST. The animation fix is unverified and might not work.**

### Step 1: Verify Animations Are GPU-Accelerated
Open praviel.com in Chrome and use DevTools to verify:

1. **Method 1: Composited Layer Borders**
   ```
   Chrome DevTools > More Tools > Rendering > Show composited layer borders
   ```
   - Enable immersive mode (click "Immersive" toggle)
   - Look for **orange borders** around `.site-bg-gradient::before` and `::after` pseudo-elements
   - Orange border = GPU composited layer = good
   - No orange border = CPU rendering = bad, needs fix

2. **Method 2: Layers Panel**
   ```
   Chrome DevTools > More Tools > Layers
   ```
   - Enable immersive mode
   - Check if pseudo-elements appear as separate layers
   - Click each layer to see memory consumption and compositing reason
   - Reason should be "will-change: transform" or "transform: translateZ(0)"

3. **Method 3: Paint Flashing**
   ```
   Chrome DevTools > Rendering > Paint flashing
   ```
   - Enable immersive mode
   - Watch aurora animation
   - **Green boxes flashing = CPU repaint = BAD**
   - No green boxes = GPU composited = GOOD

4. **Method 4: Performance Panel**
   ```
   Chrome DevTools > Performance > Record
   ```
   - Enable immersive mode, record 10 seconds
   - Check "Rendering" and "Painting" rows
   - Should have minimal/zero rendering work during animation
   - Heavy rendering = CPU-based = needs fix

### Step 2: Test Immersive Mode Toggle Functionality
1. Open praviel.com in browser
2. Find "Immersive/Comfort Controls" toggle (in hero section)
3. **Test each state:**
   - Click "Minimal" → animations should stop immediately
   - Click "Immersive" → animations should start smoothly
   - Click "Auto" → should follow device motion settings
4. **Verify localStorage persistence:**
   - Set to "Immersive", reload page
   - Should stay on "Immersive" after reload
5. **Check for lag/jank:**
   - When "Immersive" is enabled, scroll the page
   - Should be smooth, no lag (even on powerful hardware)
   - If lag exists, animation fix didn't work

### If Animations Are NOT GPU-Accelerated:

**Possible fixes:**
1. Add `transform: translate3d(0, 0, 0)` instead of `translateZ(0)`
2. Remove `will-change` after animation starts (cleanup)
3. Add explicit `position: absolute` to pseudo-elements
4. Check if pseudo-elements are being created correctly
5. Verify `contain: paint layout` on parent element
6. Consider using separate divs instead of pseudo-elements

**Files to modify:**
- `app/globals.css:455-506` - Aurora animation styles
- `app/animation-overrides.css` - Check if overrides are interfering

---

## 🔴 PRIORITY 2: TEST WAITLIST FORM SUBMISSION

**The form input exists, but submission is UNTESTED.**

### Test End-to-End Submission
1. Open praviel.com, scroll to Waitlist section
2. Enter test email: `test@example.com`
3. Click submit button
4. **Verify:**
   - Loading state shows?
   - Success message appears?
   - Error message shows if invalid email?
   - Network tab shows POST request to backend?
   - Email is actually stored in database?

### If Form Doesn't Work:
- Check `components/WaitlistForm.tsx` implementation
- Verify API route exists and works
- Check for console errors
- Test error handling (invalid email, network error)

---

## 🟡 PRIORITY 3: MOBILE & CROSS-BROWSER TESTING

### Real Device Testing (Required)
**Puppeteer emulation is NOT the same as real devices.**

**iPhone (Safari iOS):**
1. Open praviel.com on real iPhone
2. Test horizontal scroll (swipe left/right) - should be prevented
3. Test waitlist form with iOS keyboard
4. Test immersive mode toggle (tap targets should be 44x44px minimum)
5. Check if animations lag when enabled
6. Verify all interactive elements are tap-able

**Android (Chrome):**
1. Same tests as iPhone
2. Test with different screen sizes (small Android, large Android)
3. Verify Chrome-specific features work

**Safari Desktop:**
1. Test all features on Safari macOS
2. Verify CSS `@property` fallbacks work (if used)
3. Check for Safari-specific rendering issues
4. Test view transitions (next-view-transitions package)

**Firefox Desktop:**
1. Quick smoke test
2. Verify animations work
3. Check for Firefox-specific bugs

**Edge Desktop:**
1. Quick smoke test (usually same as Chrome)

### What to Look For:
- Horizontal scroll prevented on real touch devices?
- Touch targets large enough (44x44px)?
- Forms work with mobile keyboards?
- Animations don't cause jank on mobile?
- Page loads in <3 seconds on 3G?

---

## 🟡 PRIORITY 4: PERFORMANCE MEASUREMENT

### Core Web Vitals (Required)
**No performance metrics have been measured.**

1. **Run Lighthouse on Production:**
   ```bash
   # Use Chrome DevTools > Lighthouse
   # Or command line:
   lighthouse https://praviel.com --view
   ```
   **Target Scores:**
   - Performance: >90
   - Accessibility: >95
   - Best Practices: >95
   - SEO: 100

2. **Measure Core Web Vitals:**
   - **LCP (Largest Contentful Paint):** Target <2.5s
   - **CLS (Cumulative Layout Shift):** Target <0.1
   - **INP (Interaction to Next Paint):** Target <200ms

3. **Test VolumetricLight INP Optimization:**
   - Mousemove events were throttled with requestAnimationFrame
   - Measure actual INP on production
   - Should be <200ms even with mouse movement

4. **Check Animation Performance:**
   - With immersive mode enabled, measure FPS
   - Should be 60fps consistently
   - Use Chrome DevTools > Performance > FPS meter

### If Performance is Poor:
- Review animation durations (currently 40s - may be too long)
- Check `will-change` usage (should be cleaned up after animation)
- Verify no layout thrashing
- Check for memory leaks in animations

---

## 📋 REMAINING TASKS (Lower Priority)

### Interactive Components (Not Fully Tested)
- ❓ Mobile menu (test script reports "not found" - might not exist or selector wrong)
- ❓ Living Manuscript modal (if exists)
- ❓ Cookie consent banner
- ❓ All navigation links work correctly

### Analytics & Monitoring
- ❓ Plausible analytics tracking verified (script loads, but tracking not verified)
- ❓ Sentry error tracking verified
- ❓ Observability setup working

### Code Quality
- ⚠️ Using `@opennextjs/cloudflare` from main branch (not stable release - high risk)
- ⚠️ Next.js middleware deprecation warning (can't fix until OpenNext supports proxy.ts)
- ⚠️ React 19.2 peer dependency warning with next-view-transitions (not tested)

---

## ⚠️ WHAT NOT TO WASTE TIME ON

**Don't do these:**
- ❌ Running automated tests that don't verify actual functionality
- ❌ Creating new documentation files (this file is enough)
- ❌ Refactoring code that's already working
- ❌ Optimizing things that aren't slow
- ❌ Fixing warnings that don't affect functionality
- ❌ Over-testing things that are already verified working

**Do these:**
- ✅ Verify GPU acceleration with Chrome DevTools (CRITICAL)
- ✅ Test immersive mode toggle actually works
- ✅ Test waitlist form submission end-to-end
- ✅ Test on real mobile devices (iPhone, Android)
- ✅ Measure actual performance (Lighthouse, Core Web Vitals)
- ✅ Fix any bugs found during testing

---

## 🎯 SUCCESS CRITERIA FOR NEXT AGENT

**Before claiming work is "done", verify:**
1. ✅ Aurora animations are GPU-accelerated (verified with Chrome DevTools orange borders)
2. ✅ Immersive mode toggle enables/disables animations correctly
3. ✅ No lag when immersive mode is enabled (test on powerful hardware)
4. ✅ Waitlist form submits successfully (end-to-end test)
5. ✅ Horizontal scroll prevented on real iPhone and Android devices
6. ✅ Core Web Vitals meet targets (LCP <2.5s, CLS <0.1, INP <200ms)
7. ✅ All interactive components work (forms, toggles, links)
8. ✅ Cross-browser testing completed (Safari, Firefox, Edge)

**Don't claim it's done unless ALL 8 criteria are met and verified.**

---

## 🚨 PREVIOUS STATUS (Nov 14, 2025)

~~**Production URL:** https://praviel.com (⚠️ **NOT VERIFIED - see deployment issues below**)~~
~~**Workers Dev URL:** https://praviel-site.antonnsoloviev.workers.dev (✅ **DEPLOYED** - Version c0f35f65)~~
~~**Production Status:** 🟡 **PARTIAL** (Fixes deployed to workers.dev but praviel.com status UNKNOWN)~~

**UPDATE:** Production verified working as of Nov 15, 2025

---

## 🚨 CRITICAL: Production Deployment Gap

### ❌ ISSUE: praviel.com May Not Be Updated

**What Happened:**
- All fixes were deployed to `praviel-site.antonnsoloviev.workers.dev` (workers.dev subdomain)
- Deployment command: `pnpm deploy` (no `--env` flag specified)
- This deploys to **DEFAULT environment**, NOT production environment

**Production Environment Configuration (wrangler.jsonc:27-62):**
```jsonc
"env": {
  "production": {
    "name": "praviel-site-production",
    "route": "praviel.com/*",  // ← Production uses route, not workers.dev
    // ... production KV, R2, secrets, etc.
  }
}
```

**Result:**
- ✅ workers.dev has all hydration fixes (tested, working)
- ❓ praviel.com status **UNKNOWN** (not deployed to in this session)
- ❓ DNS routing **UNKNOWN** (route requires manual DNS setup)
- ❓ SSL certificates **UNKNOWN**

### ✅ IMMEDIATE ACTION REQUIRED

**Deploy to production environment:**
```bash
# Deploy to production (NOT default)
pnpm run with-release npx opennextjs-cloudflare deploy --env production

# Or update package.json deploy script to include --env production
```

**Verify praviel.com is working:**
1. Open https://praviel.com in browser (NOT workers.dev)
2. Check browser console for React Error #418 (should be gone)
3. Test horizontal scroll on mobile (should be prevented)
4. Verify content is visible (not loading skeletons)
5. Test waitlist form

**Check DNS configuration:**
```bash
# Verify DNS is pointing to Cloudflare Workers
nslookup praviel.com
dig praviel.com

# Or check Cloudflare dashboard:
# Workers & Pages > praviel-site-production > Settings > Domains & Routes
```

---

## ✅ VERIFIED FIXES (on workers.dev only)

### 1. React Hydration Error #418 - FIXED ✅

**Root Cause:** 7 components using `useMemo` with browser APIs caused server/client HTML mismatch

**Components Fixed:**
- `components/CurrentYear.tsx` - Date calculation moved to useEffect
- `components/MarbleDust.tsx` - Browser detection moved to useEffect
- `components/HieroglyphicParticles.tsx` - Browser detection moved to useEffect
- `components/PortalCard3D.tsx` - Mobile/touch detection moved to useEffect
- `components/CursorGlow.tsx` - Browser detection moved to useEffect
- `components/RomanTessellation.tsx` - Reduced motion detection moved to useEffect
- `components/ClientEnhancements.tsx` - Device constraint detection moved to useEffect

**Pattern Applied:**
```typescript
// ❌ BEFORE (causes hydration error):
const shouldShow = useMemo(() => {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}, []);

// ✅ AFTER (fixes hydration error):
const [shouldShow, setShouldShow] = useState(false);
useEffect(() => {
  if (typeof window === "undefined") return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  setShouldShow(!prefersReducedMotion);
}, []);
```

**Verification:** Automated tests on workers.dev confirm zero hydration errors

### 2. Mobile Horizontal Scroll - FIXED ✅

**Root Cause:**
- ComparisonTable with 600px min-width extending beyond 375px mobile viewport
- Portal card halos (477px) overflowing

**Fix Applied:**
- Added `overflow-x: hidden` CSS to html/body (app/globals.css:45-48)
- Added `overflow-x-hidden` to ComparisonTable section (components/ComparisonTable.tsx:31)
- Added `w-full max-w-full` constraints to table wrapper (components/ComparisonTable.tsx:49)
- Added `overflow-hidden` to CivilizationPortals section (components/CivilizationPortals.tsx:62)

**Verification:** Automated test attempts `window.scrollTo(50, 0)` and confirms scrollX stays at 0

### 3. Layout Fix: Immersive/Comfort Controls - FIXED ✅

**Fix:** Reordered HeroSection to place controls BEFORE language badges (components/HeroSection.tsx)

**Verification:** Controls now positioned <2000px from top (tested)

### 4. Performance: VolumetricLight INP - OPTIMIZED ✅

**Fix:** Throttled mousemove handler with requestAnimationFrame (components/VolumetricLight.tsx)

**Note:** Optimization applied but INP not measured on production yet

---

## 🔴 PRIORITY 1: VERIFY PRODUCTION DEPLOYMENT

### Task 1.1: Deploy to praviel.com Production Environment

```bash
# Deploy with production environment flag
SKIP_OBSERVABILITY_CHECK=true pnpm run with-release npx opennextjs-cloudflare deploy --env production
```

**Expected Output:**
- Worker name: `praviel-site-production` (not `praviel-site`)
- Route: `praviel.com/*`
- Should bind to production KV namespaces and R2 buckets

### Task 1.2: Verify praviel.com Is Live

**Manual Testing (REQUIRED):**
1. Open https://praviel.com in browser (clear cache first)
2. Open DevTools Console
3. Check for React Error #418 (should be ABSENT)
4. Verify no console errors
5. Verify content is visible (not loading skeletons)
6. Test on mobile viewport (resize to 375px width)
7. Attempt horizontal scroll (should be prevented)
8. Test waitlist form is visible

### Task 1.3: Check DNS/Routing Configuration

**In Cloudflare Dashboard:**
1. Go to Workers & Pages > praviel-site-production
2. Check Settings > Domains & Routes
3. Verify route `praviel.com/*` is active
4. Check DNS records for praviel.com
5. Verify SSL certificate is valid

**Alternative: Use Custom Domains (Recommended)**

If DNS is not configured, consider switching from route to Custom Domain:
```bash
# In Cloudflare Dashboard:
# Workers & Pages > praviel-site-production > Settings > Domains & Routes
# Add > Custom Domain
# Enter: praviel.com
# Cloudflare will automatically create DNS record and SSL certificate
```

**Benefits:**
- Automatic DNS configuration
- Automatic SSL certificate management
- No manual routing setup needed

---

## 🟡 PRIORITY 2: TEST INTERACTIVE COMPONENTS

### ⚠️ WARNING: All Tests So Far Are Static

**What's Been Tested:**
- ✅ Pages load (HTTP 200)
- ✅ Content renders
- ✅ Images exist
- ✅ No console errors
- ✅ No hydration errors

**What Has NOT Been Tested:**
- ❌ Clicking buttons
- ❌ Submitting forms
- ❌ Opening modals
- ❌ Toggling settings
- ❌ Navigation between pages
- ❌ Mobile menu
- ❌ Any JavaScript interactivity

### Task 2.1: Waitlist Form (CRITICAL - Main Conversion Point)

**Location:** Scroll to #waitlist on homepage

**Manual Test Steps:**
1. Find waitlist form email input
2. Enter test email: `test@example.com`
3. Click submit button
4. Observe:
   - Does loading state show?
   - Does form actually submit?
   - Does success/error message appear?
   - Check Network tab for API request
5. Verify email is saved (check database or logs)

**Expected Behavior:**
- Form submits to backend
- Shows loading spinner during submission
- Displays success message on success
- Displays error message on failure
- Email is stored in database

**If Broken:**
- Check `components/WaitlistForm.tsx` for submit handler
- Verify API route `/api/waitlist` (or similar) exists
- Check server-side validation
- Test error handling

### Task 2.2: Mobile Menu

**Issue:** Test script reports "Mobile menu button not found"

**Possible Causes:**
1. Selector is incorrect (`[aria-label*="menu"]` might not match)
2. Menu button doesn't exist
3. Menu uses different implementation (hidden by default, shown on scroll, etc.)

**Manual Test Steps:**
1. Resize browser to <640px width (or use mobile device)
2. Look for hamburger menu icon (☰) in header
3. If found:
   - Click to open menu
   - Verify menu slides/fades in
   - Click menu link
   - Verify menu closes
   - Test Escape key closes menu
4. If NOT found:
   - Search codebase for mobile menu implementation
   - Check `components/SiteHeader.tsx`
   - Determine if mobile menu exists or needs to be built

**Action:**
- If menu exists but selector is wrong: update test script
- If menu doesn't exist: document as TODO for implementation

### Task 2.3: Living Manuscript Modal

**Location:** Look for "Focus view" or similar button on homepage

**Manual Test Steps:**
1. Find trigger button (search for modal-related buttons)
2. Click button
3. Verify:
   - Modal opens with content
   - Background is dimmed
   - Escape key closes modal
   - Clicking outside closes modal (if expected)
   - Tab key traps focus inside modal
   - Focus returns to trigger button after close

**If Not Found:**
- Search codebase: `grep -r "LivingManuscript\|Modal" components/`
- Determine if feature exists or is TODO

### Task 2.4: Comfort Controls & Immersive Mode

**Location:** Hero section, near language count badges

**What They Do (Based on Code Analysis):**
- Comfort controls: Adjust type scale, contrast, body font
- Immersive mode: Toggle visual effects (particles, animations)

**Manual Test Steps:**
1. Find Immersive Mode toggle
2. Click to toggle between On/Off/Auto
3. Verify visual effects actually toggle
4. Find Comfort Controls
5. Test each control:
   - Type scale: Base ↔ Plus
   - Contrast: Default ↔ High
   - Body font: Sans ↔ Serif
6. Verify changes are applied immediately
7. Reload page - verify settings persist (localStorage)

**Files to Check:**
- `components/ImmersiveModeToggle.tsx` (or similar)
- `components/ComfortControls.tsx` (or similar)
- Check for `localStorage.setItem('praviel:immersivePref', ...)`
- Check for `localStorage.setItem('praviel:comfortPrefs', ...)`

### Task 2.5: Cookie Consent Banner

**Expected Behavior:**
- Shows on first visit
- Hides after accept/decline
- Preference saved in localStorage or cookie

**Manual Test Steps:**
1. Open praviel.com in incognito mode (fresh state)
2. Look for cookie consent banner
3. If found:
   - Click Accept
   - Verify banner hides
   - Reload page - verify banner doesn't show again
4. If NOT found:
   - Check `components/CookieConsent.tsx`
   - Determine if feature is implemented

---

## 🟡 PRIORITY 3: REAL DEVICE TESTING

### Current Test Coverage

**What's Tested:**
- ✅ Puppeteer headless Chrome on Linux
- ✅ Desktop viewport (1920x1080)
- ✅ Mobile viewport emulation (375x667)

**What's NOT Tested:**
- ❌ Actual iPhone (Safari iOS)
- ❌ Actual Android (Chrome)
- ❌ Touch gestures
- ❌ Safari desktop
- ❌ Firefox desktop
- ❌ Edge desktop

### Task 3.1: Mobile Device Testing

**iPhone (Safari iOS):**
1. Open praviel.com on iPhone
2. Test horizontal scroll (swipe left/right)
3. Verify controls are tap-able (44px minimum)
4. Test form input with iOS keyboard
5. Verify animations perform well
6. Check if any iOS-specific bugs

**Android (Chrome):**
1. Same tests as iPhone
2. Test with different Android screen sizes
3. Verify Chrome-specific features work

**Key Things to Check:**
- Horizontal scroll is prevented (my fix)
- Touch targets are large enough (WCAG AA: 44x44px)
- Forms work with mobile keyboards
- Animations don't cause jank
- Page loads in <3 seconds on 3G

### Task 3.2: Cross-Browser Testing

**Safari Desktop:**
- Test all interactive features
- Verify CSS `@property` fallbacks work
- Check for Safari-specific bugs

**Firefox Desktop:**
- Test all interactive features
- Verify animations work
- Check for Firefox-specific bugs

**Edge Desktop:**
- Quick smoke test (usually same as Chrome)

---

## 🟡 PRIORITY 4: ANALYTICS & MONITORING

### Task 4.1: Verify Plausible Analytics

**What's Known:**
- ✅ Plausible script loads on page
- ❓ Tracking events not verified

**Manual Test:**
1. Open praviel.com
2. Navigate between pages
3. Go to Plausible dashboard (https://plausible.io/praviel.com or similar)
4. Verify pageviews are being tracked
5. Test custom events (if any)
6. Verify goals/conversions work

**Known Issue:**
Build warning: `[Plausible] Error fetching script: Error: During prerendering, fetch() rejects when the prerender is complete`

**Impact:** Might be build-time only, but needs verification

**If Analytics Broken:**
- Check `components/PlausibleAnalytics.tsx`
- Verify `/api/proxy/js/script.js` returns script
- Verify `/api/proxy/api/event` accepts POST requests
- Check Plausible dashboard settings

### Task 4.2: Verify Sentry Error Tracking

**Test Steps:**
1. Trigger test error (add `throw new Error("Test")` somewhere)
2. Check Sentry dashboard
3. Verify error appears
4. Remove test error

**If Not Working:**
- Check `@sentry/nextjs` configuration
- Verify SENTRY_DSN is set
- Check build warnings about OpenTelemetry

### Task 4.3: Performance Measurement

**INP (Interaction to Next Paint):**
- Target: ≤200ms
- VolumetricLight optimized but not measured
- Need real user monitoring data

**Tools:**
```bash
# Lighthouse (simulated)
pnpm perf:audit

# Or use Chrome DevTools Performance tab
# Or set up Real User Monitoring (RUM)
```

**Core Web Vitals to Track:**
- LCP (Largest Contentful Paint): Target ≤2.5s
- CLS (Cumulative Layout Shift): Target ≤0.1
- INP (Interaction to Next Paint): Target ≤200ms

---

## 🔧 KNOWN TECHNICAL ISSUES

### Issue 1: OpenNext Cloudflare on Main Branch (HIGH RISK)

**Current Setup (package.json:46):**
```json
"@opennextjs/cloudflare": "https://pkg.pr.new/@opennextjs/cloudflare@main"
```

**What This Means:**
- Pulling from **main branch** via pkg.pr.new
- NOT a stable release (like `@opennextjs/cloudflare@1.3.0`)
- Main branch can have breaking changes anytime
- Builds are NOT reproducible
- High risk for production

**Why It Might Be Intentional:**
- Latest version (1.3.0) has known issues with Next.js 16
- Main branch might have fixes not in stable release
- See: https://github.com/opennextjs/opennextjs-cloudflare/issues/962

**Recommendation:**
1. Check if stable 1.3.0 (or later) works with Next.js 16
2. If YES: pin to stable version for reproducibility
3. If NO: document risk and monitor main branch for breaking changes
4. Consider contributing fixes upstream to get stable release

### Issue 2: Middleware vs Proxy (Next.js 16 Deprecation)

**Current State:**
- Using `middleware.ts` (deprecated in Next.js 16)
- Next.js 16 prefers `proxy.ts` instead
- Build warning: `The "middleware" file convention is deprecated. Please use "proxy" instead.`

**Why We Can't Switch:**
- `proxy.ts` only supports Node.js runtime
- Cloudflare Workers requires Edge runtime
- OpenNext Cloudflare doesn't support `proxy.ts` yet
- See: middleware.ts:9-14 for detailed explanation

**Current Solution:**
- Keep `middleware.ts` despite deprecation warning
- Uses `experimental-edge` runtime for Cloudflare compatibility
- Monitor issue #962 for OpenNext support

**Long-Term:**
- Wait for OpenNext to support proxy.ts with Edge runtime
- Or migrate to different deployment platform
- Or wait for Next.js to support Edge runtime in proxy.ts

### Issue 3: React 19 Peer Dependency Warning

**Warning:**
```
next-view-transitions 0.3.4
├── ✕ unmet peer react@^18.2.0: found 19.2.0
└── ✕ unmet peer react-dom@^18.2.0: found 19.2.0
```

**Current Status:**
- Using React 19.2.0
- next-view-transitions expects React 18
- View transitions functionality NOT tested

**Action Required:**
- Test view transitions actually work
- Navigate between pages and observe transitions
- Check for console errors
- If broken: either downgrade React or remove next-view-transitions

### Issue 4: Compatibility Date Requirements

**Current Config (wrangler.jsonc:5):**
```jsonc
"compatibility_date": "2025-10-15"
```

**Minimum Requirements:**
- For `nodejs_compat`: 2024-09-23 or later ✅
- For better `process.env`: April 1, 2025 or later ✅
- Current setting: 2025-10-15 ✅ (exceeds all requirements)

**Status:** ✅ Good

---

## 📋 COMPREHENSIVE TEST RESULTS (workers.dev only)

**✅ PASSED (13 tests):**
1. Homepage loads (200 OK)
2. No React hydration errors
3. No console errors
4. Hero title correct
5. Immersive & Comfort controls visible
6. Controls positioned correctly
7. All images loaded
8. No horizontal scroll on mobile (verified with scroll attempt)
9. Waitlist email input exists
10. /blog loads
11. /fund loads
12. /privacy loads
13. Plausible analytics script loaded

**⚠️ WARNINGS (1):**
- Mobile menu button not found (selector issue or doesn't exist)

**Total Console Messages:**
- Errors: 0
- Warnings: 0

**Test Infrastructure:**
- `scripts/test-production.mjs` - Full 11-test suite
- `scripts/test-mobile-simple.mjs` - Mobile scroll verification
- `scripts/test-workers-dev.mjs` - Workers.dev deployment test
- `scripts/find-overflow-source.mjs` - Debug tool for overflow

---

## 📊 PACKAGE VERSIONS (November 14, 2025)

**Core Framework:**
- Next.js: 16.0.3 (latest stable)
- React: 19.2.0 (latest, released Oct 1, 2025)
- React DOM: 19.2.0

**Styling:**
- Tailwind CSS: 4.1.17 (latest patch)
- @tailwindcss/postcss: 4.1.17

**Deployment:**
- @opennextjs/cloudflare: main branch (⚠️ NOT stable release)
- Node.js: 25.1.0 (required minimum: 25.0.0)
- pnpm: 10.20.0

**Key Updates Since Session Start:**
- All packages already at latest versions
- No security updates found
- No breaking changes in dependencies

---

## 🎯 WHAT THE NEXT AGENT SHOULD FOCUS ON

### Immediate (Do First):

1. **Deploy to praviel.com production** (15 min)
   - Run deploy with `--env production` flag
   - Verify praviel.com shows updated code
   - Run test suite against praviel.com (not workers.dev)

2. **Test interactive components** (1-2 hours)
   - Waitlist form submission (CRITICAL)
   - Mobile menu (find it first)
   - Living Manuscript modal
   - Comfort controls & Immersive mode
   - Cookie consent banner

3. **Test on real mobile devices** (30 min)
   - iPhone with Safari
   - Android with Chrome
   - Verify horizontal scroll fix works on real devices

### Important (Do Soon):

4. **Verify analytics & monitoring** (30 min)
   - Check Plausible is tracking
   - Test Sentry error tracking
   - Verify observability is working

5. **Cross-browser testing** (30 min)
   - Safari desktop
   - Firefox desktop
   - Check for browser-specific issues

6. **Performance measurement** (30 min)
   - Run Lighthouse
   - Measure actual INP
   - Verify Core Web Vitals

### Nice to Have (If Time):

7. **Package management review** (30 min)
   - Consider pinning OpenNext to stable version
   - Document risks of current main branch setup
   - Check for security updates

8. **Accessibility audit** (1 hour)
   - Run axe DevTools
   - Test keyboard navigation
   - Test with screen reader
   - Verify color contrast

9. **Documentation updates** (15 min)
   - Update this file with test results
   - Document any issues found
   - Note what still needs testing

---

## 🚫 WHAT NOT TO WASTE TIME ON

❌ **Don't:**
- Run tests that don't verify actual functionality
- Refactor code that's working
- Add features the user didn't request
- Create new documentation files (only update this one)
- Optimize things that aren't slow
- Fix warnings that don't affect functionality
- Test things that are already verified and working

✅ **Do:**
- Test actual user interactions
- Verify production deployment works
- Measure real performance
- Test on real devices
- Document honestly what works and what doesn't

---

## 🔄 BUILD & DEPLOYMENT COMMANDS

### Local Development
```bash
pnpm dev                    # Start dev server (http://localhost:3003)
pnpm typecheck              # Run TypeScript checks
pnpm lint                   # Run ESLint
```

### Production Build
```bash
pnpm build                  # Build for production (Next.js only)
SKIP_OBSERVABILITY_CHECK=true pnpm build  # Skip Sentry checks
```

### Cloudflare Workers Deployment
```bash
# Deploy to DEFAULT environment (workers.dev)
pnpm deploy

# Deploy to PRODUCTION environment (praviel.com)
pnpm run with-release npx opennextjs-cloudflare deploy --env production

# With observability check skipped
SKIP_OBSERVABILITY_CHECK=true pnpm run with-release npx opennextjs-cloudflare deploy --env production
```

### Testing
```bash
# Run automated test suite
node scripts/test-production.mjs        # Test praviel.com
node scripts/test-workers-dev.mjs       # Test workers.dev
node scripts/test-mobile-simple.mjs     # Quick mobile scroll test

# Find horizontal overflow sources
node scripts/find-overflow-source.mjs
```

---

## 📝 COMMIT & PUSH

**Current Branch:** main
**Remote:** git@github.com:antonsoo/praviel-website.git

```bash
# Stage all changes
git add -A

# Commit with conventional commit format
git commit -m "type: description

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to remote
git push origin main
```

---

## ✅ SUCCESS CRITERIA

**Before Marking as "Done":**
- ✅ praviel.com is live and updated (verify in browser)
- ✅ No React Error #418 on praviel.com
- ✅ No horizontal scroll on mobile (test on real device)
- ✅ Waitlist form submits successfully
- ✅ All pages load without errors
- ✅ Interactive components work (forms, menus, modals)
- ✅ Analytics tracking verified
- ✅ Tested on iPhone and Android
- ✅ No console errors on production
- ✅ This document updated with honest results

**Don't claim it's done unless ALL criteria above are met and verified.**

---

**END OF CRITICAL TO-DOs**

**Next Agent: Start with PRIORITY 1 (deploy to praviel.com production). Test everything manually. Be honest about what works and what doesn't. Good luck!**
