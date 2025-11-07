# Critical To-Dos

**Last Updated**: 2025-11-07 17:55 UTC
**Focus**: Fix marketing website issues; Flutter app issues are in separate repo

---

## ⚠️ CRITICAL SCOPE CLARIFICATION

**THIS REPOSITORY** (praviel-website):
- Marketing website only (Next.js + React)
- Static demos with fixture data
- No actual lesson generation
- Deployed at https://praviel.com

**MAIN PRAVIEL REPOSITORY** (separate codebase):
- Python/FastAPI backend
- Flutter web/mobile app
- Actual lesson generation for 46 languages
- Real user-facing application
- **This is what alpha testers are complaining about**

---

## 🔴 URGENT - Marketing Website (THIS REPO)

### 1. **✅ FIXED - InteractiveDemo Missing from Homepage**
**Status**: ✅ RESOLVED
**Issue**: InteractiveDemo component existed but wasn't rendered on homepage
**Root Cause**: `<ClientSectionGate section="interactive" />` was missing from app/page.tsx
**Fix Applied**: Added InteractiveDemo back to homepage between LessonsDemo and HowItWorks
**Commit**: Pending
**Test**: E2E test "interactive reader exposes morphological tokens" should now pass

---

### 2. **CI/CD Pipeline Status**
**Status**: ⚠️ PARTIALLY VERIFIED

**GitHub Actions**:
- ✅ Deploy workflows: Passing (last successful deploy: 2025-11-07 17:23)
- ⚠️ Quality Checks: Running 8-22+ minutes (possibly hung on E2E tests or Lighthouse)

**Local Testing**:
- ✅ `pnpm typecheck`: Passes
- ✅ `pnpm lint`: Passes
- ✅ `pnpm build`: Passes (4s compile time)
- ⚠️ `pnpm test:e2e`: Hangs on Flutter deployment tests (expected - Flutter app is separate repo)

**Tasks**:
- [ ] Update E2E tests to skip/mark Flutter tests as external dependency
- [ ] Verify GitHub Actions Quality Checks complete successfully
- [ ] Consider adding timeout to Flutter deployment tests or marking them as optional

---

### 3. **Mobile UI/UX Issues**
**Status**: ❌ NOT FULLY TESTED - Requires real device testing

**What CAN be tested** (via Playwright mobile emulation):
- Safe-area CSS variables
- Touch target sizes (WCAG 2.2 - 48x48px minimum)
- Horizontal overflow detection
- Layout consistency across viewports

**What CANNOT be tested** (requires real devices):
- Actual performance on low-end Android devices
- iOS-specific rendering issues
- Network performance on cellular
- Touch gesture accuracy

**E2E Test Results** (from partial run):
- ✅ Safe-area CSS variables defined correctly
- ✅ Touch targets meet 48x48px minimum
- ✅ No horizontal overflow on mobile viewports
- ⚠️ Some animation performance tests failed on Firefox (tap response 157ms vs 150ms target)

**Remaining Tasks**:
- [ ] Manual testing on actual iPhone/Android devices
- [ ] Test on slow 3G connection
- [ ] Verify animations are smooth on low-end devices
- [ ] Check for layout shift during lazy loading

---

### 4. **Performance Optimization**
**Status**: ⚠️ NEEDS IMPROVEMENT

**Current Metrics** (from previous audit):
- Mobile score: 91/100
- LCP: 3.40s (target: <2.5s)
- Desktop performance: Good

**Performance Improvements to Implement**:
- [ ] Inline critical CSS for above-fold content
- [ ] Preload hero fonts with `fetchpriority="high"`
- [ ] Optimize ClientSectionGate lazy-loading (reduce layout shift)
- [ ] Consider removing animated gradients on mobile (GPU overhead)
- [ ] Add `content-visibility: auto` to off-screen sections
- [ ] Run fresh `pnpm perf:audit` and document actual current metrics

---

## 🔴 CRITICAL - Main PRAVIEL Platform (SEPARATE REPO)

### 5. **Flutter App Not Working**
**Status**: ❌ CANNOT FIX IN THIS REPO

**User Complaints**:
- "Flutter app not usable on mobile web"
- "Lessons don't work"
- "Browser errors, API errors"
- "App is lagging like crazy"
- "Incorrect mobile sizing"

**E2E Test Findings** (from this repo's tests of Flutter app):
- ❌ All Flutter deployment tests timeout waiting for canvas element
- ❌ Google Fonts failing to load (CORS + ServiceWorker errors)
- ❌ CSRF token rejection (SameSite: Lax/Strict policy)
- ❌ API calls to https://api.praviel.com failing
- ❌ Flutter canvas elements (flt-glass-pane, flutter-view) never render

**Root Cause**: These are issues in the main praviel repository (Python backend + Flutter app)

**Action Required**: Open separate issue/session for main praviel repository to address:
1. Flutter canvas rendering failure
2. Google Fonts CORS configuration
3. API authentication (CSRF tokens)
4. Mobile performance optimization
5. Lesson generation for top 10 languages

---

### 6. **Actual Lesson Generation (Top 10 Languages)**
**Status**: ❌ NOT APPLICABLE TO THIS REPO

**THIS REPO** only has:
- Static marketing demos (LessonsDemo.tsx, InteractiveDemoCore.tsx)
- Fixture data from `/app/test/data/marketing-excerpts`
- No real lesson generation

**MAIN REPO** has:
- Python/FastAPI lesson generation backend
- Integration with LSJ, TLA Berlin, ORACC lexicons
- Support for 46 ancient languages
- **This is what needs to be fixed for actual users**

**Priority Languages to Test** (in main repo):
1. Ancient Greek
2. Biblical Hebrew
3. Latin
4. Sanskrit
5. Classical Arabic
6. Old Church Slavonic
7. Ge'ez
8. Classical Syriac
9. Coptic
10. Akkadian

---

## 🟢 MEDIUM PRIORITY - Polish (THIS REPO)

### 7. **Image Optimization**
**Status**: ❌ NOT CONFIGURED

Current: `images.unoptimized: true`

**Options**:
- Configure Cloudflare Images
- Pre-optimize at build time (sharp, AVIF/WebP)
- Custom Next.js image loader

**Tasks**:
- [ ] Choose optimization approach
- [ ] Implement and test
- [ ] Set `images.unoptimized: false`

---

### 8. **Re-enable Sentry (Conditional)**
**Status**: ✅ WORKING AS DESIGNED

Current state:
- Sentry imports present but commented out
- `SKIP_OBSERVABILITY_CHECK` environment variable working correctly
- CI builds pass

**No action needed** - Sentry is intentionally disabled for performance

---

## 📋 Reference

### Latest Commits (This Session)
1. Added InteractiveDemo back to homepage (app/page.tsx) - **PENDING COMMIT**

### Latest Deployment
- **Production**: https://praviel.com
- **Version**: ab353df0-1e0d-4766-8ef1-ec499b7c48ff
- **Deployed**: 2025-11-07 16:52 UTC

### Commands
```bash
# Development
pnpm dev                  # Start dev server
pnpm typecheck            # TypeScript check
pnpm lint                 # ESLint
pnpm build                # Production build

# Testing
pnpm test:e2e             # Run all E2E tests (WARNING: hangs on Flutter tests)
pnpm test:e2e -- --project=chromium-mobile  # Mobile tests only
pnpm perf:audit           # Lighthouse audit

# Deployment
pnpm deploy               # Deploy to Cloudflare Workers
```

---

## ⚠️ HONEST ASSESSMENT

**What's Working** (Marketing Website - THIS REPO):
- ✅ Website deployed and accessible
- ✅ Type checking and linting pass
- ✅ Build process works
- ✅ Deploy workflows succeed
- ✅ Static demos work (once InteractiveDemo fix is deployed)
- ✅ Mobile-responsive design (mostly)

**What's NOT Working** (Marketing Website):
- ⚠️ InteractiveDemo was missing (now fixed, pending deployment)
- ⚠️ Performance could be better (LCP 3.40s vs 2.5s target)
- ⚠️ Some E2E tests hang on Flutter app checks

**What's NOT Working** (Main PRAVIEL Platform - SEPARATE REPO):
- ❌ Flutter app canvas not rendering
- ❌ Lesson generation for users
- ❌ Google Fonts loading issues
- ❌ API authentication errors
- ❌ Mobile performance/lag

**Next Steps**:
1. **THIS SESSION**: Deploy InteractiveDemo fix, verify it works
2. **SEPARATE SESSION**: Address main praviel platform issues (Flutter app, lessons, API)
3. **LATER**: Mobile performance optimization, image optimization

---

## 🎯 SESSION PRIORITIES

**For THIS Session** (marketing website):
1. ✅ Add InteractiveDemo back to homepage
2. ⏳ Commit and deploy fix
3. ⏳ Verify fix works in production
4. ⏳ Update this TODO file

**For NEXT Session** (main praviel platform):
1. Fix Flutter canvas rendering
2. Debug API authentication (CSRF tokens)
3. Fix Google Fonts CORS issues
4. Test lesson generation for top 10 languages
5. Optimize mobile performance

**DON'T LIE**:
- Marketing website demos are STATIC fixtures, not real lesson generation
- Flutter app issues are in SEPARATE REPO, can't be fixed here
- Performance is "decent" (91/100) but not "perfect"
- Most user complaints are about the main platform, not marketing site
