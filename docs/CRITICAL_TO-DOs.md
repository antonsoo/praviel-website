# Critical To-Dos - NEXT SESSION FOCUS

**Last Updated**: 2025-11-07 19:40 UTC
**Focus**: Flutter App UI/UX + Performance + Lessons Actually Working

---

## 🔴 ABSOLUTE TOP PRIORITY - Flutter App Usability

### **Context: Alpha Tester Complaints**
Users are reporting:
- ❌ "App not correctly sized for mobile"
- ❌ "Lagging like crazy"
- ❌ "Browser errors, API errors"
- ❌ "Lessons don't work"

**The next AI agent session MUST fix these issues by doing actual programming work and testing.**

---

## 1. 🎨 UI/UX - Desktop + Mobile Sizing (AGENT MUST FIX)

### Tasks for AI Agent:

**A. Mobile Sizing Audit & Fix**
- [ ] Run Flutter app at https://app.praviel.com on mobile emulator (375x667, 414x896)
- [ ] Document ALL elements that are oversized/incorrectly sized
- [ ] Fix CSS/Flutter layout code to make everything fit properly on mobile
- [ ] Test on both iOS and Android viewport sizes
- [ ] Verify no horizontal scrolling on mobile
- [ ] Ensure all touch targets are minimum 48x48px

**B. Desktop Sizing Audit & Fix**
- [ ] Run Flutter app on desktop viewport (1920x1080, 1366x768)
- [ ] Document ALL elements that are too large/small
- [ ] Fix layout code to ensure proper desktop scaling
- [ ] Test on both wide and narrow desktop viewports

**C. Responsive Design Testing**
- [ ] Write automated E2E tests that verify sizing at 5+ breakpoints:
  - 375px (mobile)
  - 768px (tablet)
  - 1024px (small laptop)
  - 1440px (desktop)
  - 1920px (large desktop)
- [ ] Tests must FAIL if any element overflows viewport
- [ ] Tests must FAIL if text is unreadable (too small)

---

## 2. ⚡ Performance - Fix Lag Issues (AGENT MUST FIX)

### Tasks for AI Agent:

**A. Identify Performance Bottlenecks**
- [ ] Run Chrome DevTools Performance profiler on https://app.praviel.com
- [ ] Document all functions taking >50ms
- [ ] Document all animations causing jank (framerate <30fps)
- [ ] Document all API calls taking >2s

**B. Fix Performance Issues**
- [ ] Optimize identified slow functions (memoization, lazy loading, etc.)
- [ ] Replace expensive animations with GPU-accelerated alternatives
- [ ] Add loading states for slow API calls
- [ ] Implement request caching where appropriate
- [ ] Profile again and verify improvements

**C. Mobile Performance Testing**
- [ ] Run Lighthouse audit on mobile (https://app.praviel.com)
- [ ] Document current performance score
- [ ] Fix issues until performance score is >90
- [ ] Test on throttled CPU (4x slowdown) and verify no lag
- [ ] Test on slow 3G network and verify acceptable load times

---

## 3. 📚 Lessons - Make Them ACTUALLY WORK (AGENT MUST FIX)

### Tasks for AI Agent:

**A. Test Top 10 Languages - End-to-End**

For EACH of these languages, the AI agent must:
1. **Ancient Greek**
2. **Biblical Hebrew**
3. **Latin**
4. **Sanskrit**
5. **Classical Arabic**
6. **Old Church Slavonic**
7. **Ge'ez**
8. **Classical Syriac**
9. **Coptic**
10. **Akkadian**

**Per-Language Test Protocol:**
- [ ] Navigate to https://app.praviel.com
- [ ] Select language
- [ ] Start a lesson
- [ ] Verify lesson loads without errors
- [ ] Complete at least 3 exercises
- [ ] Verify morphology data displays correctly
- [ ] Verify translations are accurate
- [ ] Verify pronunciation audio works (if applicable)
- [ ] Document ANY errors encountered
- [ ] FIX all errors found

**B. API Error Debugging**
- [ ] Monitor browser console during lesson loading
- [ ] Document ALL API errors (status codes, error messages)
- [ ] Check API response times (<2s for lesson generation)
- [ ] Fix API authentication issues (CSRF tokens, CORS)
- [ ] Fix any 4xx/5xx errors from backend
- [ ] Verify fixes with repeat testing

**C. Lesson Quality Assurance**
- [ ] For each of top 10 languages, verify:
  - [ ] Lesson generates successfully
  - [ ] Vocabulary is appropriate for beginner level
  - [ ] Grammar explanations are clear
  - [ ] Examples are relevant
  - [ ] No broken lexicon lookups
  - [ ] No missing morphology data
- [ ] Document any quality issues
- [ ] Fix data pipeline issues causing bad lessons

---

## 4. 🐛 Error Fixing - Browser & API Errors (AGENT MUST FIX)

### Tasks for AI Agent:

**A. Browser Console Error Audit**
- [ ] Open https://app.praviel.com with DevTools console open
- [ ] Use the app for 10 minutes (navigate, start lessons, etc.)
- [ ] Document EVERY error in console (no matter how small)
- [ ] Categorize errors: JS errors, network errors, warnings
- [ ] Fix ALL errors one by one
- [ ] Re-test and verify console is clean

**B. Network Error Debugging**
- [ ] Open Network tab in DevTools
- [ ] Use app for 10 minutes
- [ ] Document ALL failed requests (4xx, 5xx status codes)
- [ ] Document ALL slow requests (>2s)
- [ ] Fix backend issues causing failures
- [ ] Optimize slow endpoints
- [ ] Re-test and verify all requests succeed

**C. Flutter-Specific Errors**
- [ ] Check for Flutter canvas rendering issues
- [ ] Check for ServiceWorker errors
- [ ] Check for Google Fonts loading errors (CORS)
- [ ] Fix any Flutter framework errors
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

---

## 5. 🧪 E2E Testing - Verify Everything Works (AGENT MUST DO)

### Tasks for AI Agent:

**A. Write Comprehensive E2E Tests**
- [ ] Test: User can sign up and log in
- [ ] Test: User can select a language
- [ ] Test: User can start a lesson
- [ ] Test: User can complete a lesson
- [ ] Test: Morphology tooltips work
- [ ] Test: Audio pronunciation works
- [ ] Test: Progress is saved
- [ ] Test: All of above works on mobile viewport

**B. Run E2E Tests and Fix Failures**
- [ ] Run all E2E tests
- [ ] Document ALL failures
- [ ] Fix code to make tests pass
- [ ] Re-run tests until 100% pass rate

**C. Regression Testing**
- [ ] After each fix, re-run ALL E2E tests
- [ ] Ensure no regressions introduced
- [ ] Document any new issues found

---

## 6. 📦 Deployment & Verification (AGENT MUST DO)

### Tasks for AI Agent:

**A. Deploy Fixes**
- [ ] Build production Flutter app
- [ ] Deploy to https://app.praviel.com
- [ ] Verify deployment succeeded
- [ ] Clear all caches

**B. Production Smoke Tests**
- [ ] Test app on production URL
- [ ] Verify no console errors
- [ ] Verify lessons work for top 3 languages
- [ ] Verify mobile sizing is correct
- [ ] Verify performance is acceptable

**C. Monitoring**
- [ ] Set up error tracking (Sentry or similar)
- [ ] Monitor for 24 hours after deployment
- [ ] Document any new errors
- [ ] Fix critical issues immediately

---

## 🚫 WHAT NOT TO DO

**DO NOT:**
- Write "user must test X" in TODOs
- Write "needs manual testing" in TODOs
- Leave any tasks unfinished with "will do later"
- Assume anything works without actually testing it
- Skip testing on mobile
- Skip testing on slow networks
- Leave console errors unfixed

**DO:**
- Actually run the Flutter app and test it yourself
- Actually fix the code
- Actually write and run tests
- Actually verify everything works
- Actually deploy the fixes
- Actually check that users can use the app

---

## 📊 Success Criteria

The next session is COMPLETE when:
- ✅ Flutter app loads without errors on desktop AND mobile
- ✅ All top 10 languages have working lessons
- ✅ No console errors during normal usage
- ✅ All API calls succeed (<2s response time)
- ✅ App is correctly sized on all viewports (no overflow)
- ✅ Performance score >90 on mobile
- ✅ No lag during normal usage
- ✅ E2E tests pass 100%
- ✅ Changes deployed to production
- ✅ Production verified working

**DO NOT mark session complete until ALL of the above are TRUE.**

---

## 🎯 Priority Order

1. **Fix sizing issues** (most visible, easiest to fix)
2. **Fix console/API errors** (blocking users)
3. **Fix lesson generation** (core functionality)
4. **Fix performance/lag** (user experience)
5. **Write E2E tests** (prevent regressions)
6. **Deploy and verify** (ship it!)

---

## 📝 Notes for Next AI Agent

**Current State (as of 2025-11-07 19:40 UTC):**

**Marketing Website (praviel-website repo):**
- ✅ Working well, deployed at https://praviel.com
- ✅ Recent improvements: GPU acceleration, visual enhancements, removed 9.5MB dead code
- ⚠️ LCP is 3.43s (target <2.5s) due to OpenNext Cloudflare TTFB issue
- ✅ Mobile responsive, no major issues
- **NOT the focus of next session**

**Flutter App (main praviel repo):**
- ❌ Alpha testers complaining about multiple issues
- ❌ Sizing problems on mobile
- ❌ Performance/lag issues
- ❌ Browser/API errors
- ❌ Lessons not working reliably
- **THIS IS THE FOCUS - FIX IT**

**Tools Available:**
- Playwright for E2E testing
- Chrome DevTools for debugging
- Lighthouse for performance audits
- Flutter web app at https://app.praviel.com

**Honest Assessment:**
The marketing website is in decent shape, but the actual Flutter app that users interact with has serious issues that are preventing user adoption. The next session MUST focus on making the Flutter app actually usable by:
1. Fixing the UI/UX issues
2. Making lessons work reliably
3. Fixing all errors
4. Improving performance

**DO NOT get distracted by the marketing website - focus on the Flutter app.**
