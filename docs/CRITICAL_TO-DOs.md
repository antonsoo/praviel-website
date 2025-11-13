# CRITICAL TO-DOs

**Last updated:** Nov 13, 2025 23:15 UTC — Honest handoff to next agent
**Production URL:** https://praviel-site.antonnsoloviev.workers.dev
**Current Version ID:** 4d0eae6a-6bad-4d85-a200-1b4f543c5814
**Production Status:** ⚠️ **NEEDS VERIFICATION** (Dependencies updated, but interactive features NOT tested)

---

## 🚨 HONEST STATUS: What Was ACTUALLY Tested

### ✅ What WORKS (Actually verified):
1. ✅ **HTTP responses:** All pages return 200 OK (/, /blog, /fund, /privacy, /blog/2025-11-08-case-for-classics)
2. ✅ **API health endpoint:** /api/health returns `{ok: true}`
3. ✅ **Dependencies updated:** Next.js 16.0.3, React 19.2.4, all latest packages
4. ✅ **Build succeeds:** 23 pages generated, no errors
5. ✅ **Type checks pass:** `pnpm typecheck` passes
6. ✅ **Linting passes:** `pnpm lint` passes (0 warnings)
7. ✅ **Deployed:** Version 4d0eae6a deployed to Cloudflare Workers

### ❌ What Was NOT Tested (Assumed to work, but NOT verified):
1. ❌ **Waitlist form submission** - Form exists, but submission NOT tested
2. ❌ **Mobile menu toggle** - Component exists, but JavaScript NOT tested
3. ❌ **Living Manuscript modal** - Code exists, but open/close NOT verified
4. ❌ **Plausible analytics** - Endpoint returns 200, but tracking NOT verified
5. ❌ **Cookie consent banner** - Code exists, but NOT tested
6. ❌ **View transitions** - React 19 peer warning exists, transitions NOT tested
7. ❌ **Animations** - DeferRender, hero animations, etc. NOT verified
8. ❌ **Mobile responsiveness** - No actual mobile device testing
9. ❌ **Images load** - HTTP 200 doesn't mean images actually display
10. ❌ **All links work** - Only checked top-level pages, not all internal links
11. ❌ **Color contrast** - Claimed WCAG compliance, but NOT actually checked
12. ❌ **Keyboard navigation** - Focus management code exists, but NOT tested
13. ❌ **Screen reader** - ARIA attributes exist, but NOT tested with VoiceOver/TalkBack
14. ❌ **Performance on real devices** - Lighthouse is simulated, not real device
15. ❌ **Dark mode** - If it exists, NOT tested
16. ❌ **Music toggle** - /api/music returns data, but toggle NOT tested
17. ❌ **Comfort controls** - Component exists, but functionality NOT verified
18. ❌ **Immersive mode** - Component exists, but NOT tested
19. ❌ **All 72 components** - Most NOT individually tested

---

## 🔥 URGENT: Build Warnings That Need Investigation

### 1. Plausible Analytics Prerender Error

**Error during build:**
```
[Plausible] Error fetching script: Error: During prerendering, fetch() rejects when the prerender is complete
```

**What this means:**
- The Plausible proxy (/api/proxy/js/script.js) is trying to fetch during prerendering
- Next.js 16 rejects pending fetches when prerender completes
- This is likely a build-time warning, not a runtime error
- **BUT: Analytics might not be working correctly**

**What needs to be done:**
- Test if Plausible actually tracks page views on production
- Check browser console for JavaScript errors
- Verify /api/proxy/js/script.js loads in browser (not just returns 200)
- Fix the prerender fetch issue or move analytics to client-only

### 2. React 19 Peer Dependency Warning

**Warning:**
```
next-view-transitions 0.3.4
├── ✕ unmet peer react@^18.2.0: found 19.2.0
└── ✕ unmet peer react-dom@^18.2.0: found 19.2.0
```

**What this means:**
- next-view-transitions expects React 18, but we're using React 19
- **Claimed "safe" but NOT actually tested**
- View transitions might break or behave unexpectedly

**What needs to be done:**
- Actually test view transitions work (navigate between pages, check for errors)
- Check browser console for warnings
- Test on Safari (view transitions have limited browser support)
- Either update next-view-transitions or downgrade React (not recommended)

### 3. OpenTelemetry/Sentry Warnings

**Multiple warnings:**
```
Critical dependency: the request of a dependency is an expression
```

**What this means:**
- Sentry instrumentation has dynamic imports webpack can't analyze
- These are expected, but could indicate larger issues
- **Sentry error tracking NOT verified to work**

**What needs to be done:**
- Test if Sentry actually captures errors (throw a test error)
- Verify Sentry dashboard shows events
- Consider if Sentry is even needed (adds build complexity)

---

## 🎯 CRITICAL WORK FOR NEXT AGENT (Do NOT skip)

### 🔴 PRIORITY 1: Verify Interactive Components Actually Work

**DO NOT ASSUME CODE = WORKING. Test everything manually.**

1. **Waitlist Form (CRITICAL - main conversion point)**
   - [ ] Open production site in browser
   - [ ] Find waitlist form (scroll to #waitlist)
   - [ ] Enter email address
   - [ ] Click submit button
   - [ ] Verify loading state shows
   - [ ] Check network tab for POST request
   - [ ] Verify success/error message displays
   - [ ] Check if email actually gets saved (database query or logs)
   - **If form doesn't work, users can't sign up - this is BROKEN**

2. **Mobile Menu (CRITICAL - mobile navigation)**
   - [ ] Open production site on mobile device or resize browser <640px
   - [ ] Click hamburger menu icon (☰)
   - [ ] Verify menu opens (slides down)
   - [ ] Click menu link
   - [ ] Verify menu closes automatically
   - [ ] Click X icon to close menu manually
   - **If menu doesn't work, mobile users can't navigate**

3. **Living Manuscript Modal**
   - [ ] Find "Focus view" button on homepage
   - [ ] Click button
   - [ ] Verify modal opens with manuscript content
   - [ ] Test Escape key closes modal
   - [ ] Test Tab key traps focus inside modal
   - [ ] Verify clicking outside closes modal (if expected)
   - [ ] Test focus returns to "Focus view" button after close

4. **Plausible Analytics**
   - [ ] Open browser developer console
   - [ ] Navigate to production site
   - [ ] Check Network tab for /api/proxy/js/script.js loading
   - [ ] Check for /api/proxy/api/event POST requests on page view
   - [ ] Go to Plausible dashboard and verify events are being tracked
   - **If analytics doesn't work, we have no visitor data**

5. **View Transitions**
   - [ ] Click internal links (e.g., /blog, /fund)
   - [ ] Observe if page transitions are smooth or jarring
   - [ ] Check browser console for errors related to view transitions
   - [ ] Test on Safari (view transitions might not be supported)

### 🔴 PRIORITY 2: Test Visual/UX Issues

1. **Images Load**
   - [ ] Open production site
   - [ ] Check if logo.svg loads in header
   - [ ] Check if og.png loads (view source, find og:image)
   - [ ] Scroll through entire homepage checking for broken images
   - [ ] Check /blog page for blog post images

2. **Mobile Responsiveness (ACTUAL devices)**
   - [ ] Test on iPhone (Safari iOS)
   - [ ] Test on Android (Chrome)
   - [ ] Check for horizontal scroll
   - [ ] Verify text is readable (not too small)
   - [ ] Check tap targets are large enough (44px minimum)
   - [ ] Test form inputs work on mobile keyboard

3. **Animations Work**
   - [ ] Scroll homepage and check DeferRender components fade in
   - [ ] Verify hero animations play (if any)
   - [ ] Check hover states work on buttons/links
   - [ ] Verify no janky/broken animations

4. **Color Contrast (WCAG AA)**
   - [ ] Use browser extension or online tool to check contrast ratios
   - [ ] Gold (#E8C55B) on black background - verify >= 4.5:1 ratio
   - [ ] All text colors on backgrounds - verify compliance
   - **Accessibility lawsuits are real - this matters**

### 🔴 PRIORITY 3: Fix Known Issues

1. **Fix Plausible Prerender Error**
   - Move Plausible script loading to client-side only
   - Remove fetch() during prerendering or handle properly
   - Verify build completes without errors

2. **Verify All API Routes Work**
   - [ ] /api/health - already tested ✅
   - [ ] /api/music - test returns music state
   - [ ] /api/observability/events - test accepts events
   - [ ] /api/observability/vitals - test accepts vitals
   - [ ] /api/proxy/api/event - test proxies to Plausible
   - [ ] /api/proxy/js/script.js - test returns script

3. **Test All Internal Links**
   - [ ] Click every link in header nav
   - [ ] Click every link in footer
   - [ ] Click #waitlist anchor links
   - [ ] Click #features anchor links
   - [ ] Verify no 404 errors

---

## 📋 FUNCTIONAL TESTING CHECKLIST (Be honest, mark what's actually done)

### Forms
- [ ] Waitlist form submits successfully
- [ ] Loading state displays during submission
- [ ] Success message displays on success
- [ ] Error message displays on failure
- [ ] Form validates email format
- [ ] Form handles network errors gracefully

### Navigation
- [ ] Mobile menu opens/closes
- [ ] Desktop nav links work
- [ ] Footer links work
- [ ] Anchor links scroll to correct sections
- [ ] Back button works (no broken history)

### Interactive Components
- [ ] Living Manuscript modal opens/closes
- [ ] Cookie consent banner shows (if enabled)
- [ ] Music toggle works (if exists)
- [ ] Dark mode toggle works (if exists)
- [ ] Comfort controls work (if exist)
- [ ] Immersive mode toggle works (if exists)

### Analytics & Monitoring
- [ ] Plausible tracks page views
- [ ] Plausible tracks custom events
- [ ] Sentry captures errors
- [ ] /api/health returns correct uptime

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader announces content correctly
- [ ] Focus indicators visible
- [ ] Skip-to-content link works
- [ ] All images have alt text

### Performance
- [ ] Site loads <3s on 3G connection
- [ ] No layout shifts on page load
- [ ] Animations don't cause jank
- [ ] Images are optimized (WebP, proper sizes)

### Browser Compatibility
- [ ] Chrome desktop works
- [ ] Safari desktop works
- [ ] Firefox desktop works
- [ ] Safari iOS works
- [ ] Chrome Android works

---

## 🎭 INVESTOR/CONTENT GAPS (Needs user input)

**These require actual content from the user - can't be invented:**

### Missing for Investors
1. **Team/Founder Info** - No team page, bios, credentials
2. **Financial Data** - No burn rate, runway, or funding raised
3. **Business Model** - "100% open source" doesn't explain monetization
4. **Investment Terms** - No equity structures or revenue-sharing
5. **Social Proof** - No testimonials, adoption metrics, or partnerships
6. **Detailed Roadmap** - No timeline with specific dates/milestones

### Missing for Users
1. **Product Demo** - No screenshot/video of actual reader interface above fold
2. **Blog Content** - Only 1 blog post (content gap)

**DO NOT invent this content. Mark as "needs user input" and move on.**

---

## ⚙️ TECHNICAL DEBT (Low priority but track it)

1. **OpenTelemetry warnings** - 13 "critical dependency" warnings in build
2. **React 19 peer dependency** - next-view-transitions expects React 18
3. **Middleware deprecation** - Warning: "Use proxy instead of middleware"
4. **fetchConnectionCache deprecation** - Warning in build logs

---

## 📊 Current Production Metrics (Last measured: Nov 13, 2025 22:00 UTC)

**Lighthouse Mobile:**
- Performance: 90/100 ✅
- CLS: 0.110 ✅ (good)
- LCP: 2.91s ⚠️ (acceptable, target is ≤2.5s)
- FID/INP: Not measured

**Build:**
- 23 pages generated ✅
- Build time: ~26.5s
- Deploy time: ~20s (Cloudflare Workers)

**Dependencies:**
- Node.js: 25.1.0
- Next.js: 16.0.3 (latest)
- React: 19.2.0 (latest)
- Tailwind CSS: 4.1.17 (latest)

---

## 🎯 INSTRUCTIONS FOR NEXT AGENT

### Your Mission (in priority order):

1. **VERIFY everything works** - Don't trust previous claims. Test manually.
2. **Fix broken things** - Plausible error, broken components, etc.
3. **Test on real devices** - Mobile responsiveness claims are unverified
4. **Update this doc** - Mark items as done/not done honestly

### How to Work Efficiently:

1. **Start with quick wins:** Fix Plausible error (30 min)
2. **Test interactivity:** Waitlist form, mobile menu, modals (1 hour)
3. **Mobile testing:** Real devices or BrowserStack (1 hour)
4. **Fix what's broken:** Don't move on until it works (varies)

### What NOT to Do:

- ❌ Don't waste time on micro-optimizations (LCP is fine at 2.91s)
- ❌ Don't create new documentation files
- ❌ Don't run automated tests that don't catch real issues
- ❌ Don't claim something works without actually testing it
- ❌ Don't add features the user didn't ask for

### Red Flags to Watch For:

- If components don't work, this is CRITICAL (not nice-to-have)
- If forms don't submit, users can't sign up (revenue impact)
- If mobile menu doesn't work, mobile is broken (50%+ of traffic)
- If analytics doesn't work, we're blind to user behavior
- If build errors exist, deployment could break

### Success Criteria:

- ✅ All interactive components work when manually tested
- ✅ No errors in browser console on production
- ✅ Forms submit successfully
- ✅ Mobile menu works on real devices
- ✅ Analytics tracks events
- ✅ This doc updated with honest results

---

## 🔄 Session History (Archive)

<details>
<summary>Nov 13, 2025 Sessions (click to expand)</summary>

### Session 3: Dependency Updates (22:30-23:00 UTC)
- Updated 9 packages to latest versions
- Next.js 16.0.1 → 16.0.3
- Deployed version 4d0eae6a
- **CLAIMED everything works, but did NOT test interactivity**

### Session 2: Documentation Verification (22:20-22:30 UTC)
- Synced with remote repository
- Fixed documentation errors
- Verified static asset caching
- Checked code quality

### Session 1: CLS Optimization (22:00-22:20 UTC)
- Removed translate-y transforms from DeferRender components
- CLS improved 0.256 → 0.110 (57% improvement)
- LCP improved 3.40s → 2.91s (14% improvement)
- Performance score improved 74 → 90
</details>

---

**END OF CRITICAL TO-DOs**

**Next agent: Start with PRIORITY 1 items. Test everything. Be honest about what works and what doesn't. Update this doc as you go.**
