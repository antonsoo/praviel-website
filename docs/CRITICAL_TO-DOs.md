# Critical To-Dos

**STATUS**: Core implementation complete, but needs browser verification and testing.

**Last Updated**: 2025-11-11 (00:45 UTC)
**Latest Deployment**: https://praviel-site.antonnsoloviev.workers.dev (version: 0acbc374-c09d-45eb-a67a-a3093e526572)

---

## ✅ COMPLETED (2025-11-10 Evening Session)

### 1. Language Count Fixed - VERIFIED ✅

**What**: Changed "46 languages" → "42 languages" across 13 files
**Verified**: Manually confirmed in all files
**Status**: COMPLETE

Files updated:
- `app/layout.tsx` (2 instances)
- `lib/canonicalCopy.ts`
- `components/ImpactSection.tsx`
- `components/HeroCrest.tsx`
- `components/FundingHero.tsx`
- `components/HeroSection.tsx`
- `components/ComparisonTable.tsx`
- `components/FeatureGrid.tsx`
- `app/api/page.tsx` (2 instances)
- `README.md` (3 instances)

### 2. Error Boundaries Added - NEEDS TESTING ⚠️

**What**: Created error boundary components for major pages
**Verified**: Files created, code looks correct
**NOT Verified**: Haven't actually triggered errors to test them

Files created:
- `app/error.tsx` - Root error boundary
- `app/privacy/error.tsx` - Privacy page errors
- `app/fund/error.tsx` - Funding page errors

**TODO FOR NEXT SESSION**:
1. Test error boundaries by intentionally throwing errors
2. Verify retry button works
3. Check navigation to home works
4. Test error display in both dev and production

### 3. Plausible Analytics - IMPLEMENTED BUT NOT VERIFIED ⚠️

**Implementation Status**: COMPLETE
**Verification Status**: PARTIAL (needs browser testing)

#### What Was Done ✅

1. **API Proxies Created** (`app/api/proxy/`):
   - `/api/proxy/js/script.js` - Proxies Plausible script
   - `/api/proxy/api/event` - Forwards analytics events
   - Both return correct status codes (200/202)
   - Both serve correct content

2. **PlausibleAnalytics Component** (`components/PlausibleAnalytics.tsx`):
   - Client component using useEffect for script injection
   - Injects script after React hydration
   - Works around Next.js 16 "use cache" limitation
   - Code present in production bundle (verified)

3. **Plausible Account Setup**:
   - Free trial activated (Nov 11, 2025, 30 days)
   - Domain `praviel.com` configured
   - API key saved to `.env.local` (Stats API only)
   - API key tested and working

#### What Was NOT Verified ❌

**CRITICAL**: The following need verification in next session:

1. ✗ **Browser DevTools Check**:
   - Open https://praviel-site.antonnsoloviev.workers.dev in browser
   - Open DevTools Console
   - Check for Plausible script loading
   - Look for any JavaScript errors
   - Verify script element exists in DOM

2. ✗ **Event Tracking**:
   - Visit site and navigate between pages
   - Check Plausible dashboard for pageviews
   - Verify events are being sent to `/api/proxy/api/event`
   - Check Network tab for event requests

3. ✗ **Timing Issues**:
   - Script loads after React hydration (by design)
   - But: Haven't verified timing is correct
   - Risk: Script might load too late and miss initial pageview

4. ✗ **Ad Blocker Testing**:
   - Proxying should bypass ad blockers
   - But: Haven't tested with uBlock Origin, AdBlock, etc.
   - Risk: Ad blockers might still detect and block

#### Technical Implementation Details

**Why This Approach**:
- Next.js 16 `"use cache"` directive prevents Script component from rendering
- useEffect runs after hydration, bypassing this limitation
- Script injected client-side via DOM manipulation

**Trade-off**:
- Script loads ~500ms after initial page load
- First pageview might be delayed or missed
- Acceptable for analytics (doesn't affect UX)

**Code Location**:
```typescript
// components/PlausibleAnalytics.tsx
'use client';
export default function PlausibleAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.querySelector('script[data-domain="praviel.com"]')) return;

    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', 'praviel.com');
    script.setAttribute('data-api', '/api/proxy/api/event');
    script.src = '/api/proxy/js/script.js';
    document.head.appendChild(script);
  }, []);
  return null;
}
```

---

## 🚨 CRITICAL VERIFICATION NEEDED (Next Session)

### Priority 1: Verify Plausible Analytics Actually Works

**Step-by-step verification**:

1. **Open site in browser with DevTools**:
   ```
   Visit: https://praviel-site.antonnsoloviev.workers.dev
   Open: Chrome DevTools (F12)
   ```

2. **Check Console tab**:
   - Look for any JavaScript errors
   - Plausible should load without errors
   - Note any warnings about script loading

3. **Check Elements/Inspector tab**:
   - Search for: `data-domain="praviel.com"`
   - Script should be in `<head>`
   - Verify all attributes are correct:
     - `defer="true"`
     - `data-domain="praviel.com"`
     - `data-api="/api/proxy/api/event"`
     - `src="/api/proxy/js/script.js"`

4. **Check Network tab**:
   - Filter by "script.js"
   - Verify `/api/proxy/js/script.js` loads (200 OK)
   - Check response body contains Plausible code
   - Navigate to another page
   - Look for POST to `/api/proxy/api/event`
   - Should send pageview event (202 OK response)

5. **Check Plausible Dashboard**:
   - Login: https://plausible.io
   - Go to: praviel.com dashboard
   - Wait 2-3 minutes (data updates every ~1 minute)
   - Should see: 1+ visitors, 1+ pageviews
   - If no data: Script isn't tracking properly

6. **Test with Ad Blocker**:
   - Install uBlock Origin
   - Visit site again
   - Verify script still loads (proxy should bypass)
   - Check Plausible dashboard for new pageview

### Priority 2: Test Error Boundaries

1. **Test root error boundary**:
   - Temporarily add to `app/page.tsx`: `throw new Error("Test error")`
   - Visit homepage
   - Should see error boundary UI (not crash)
   - Click "Try again" button (should work)
   - Click "Go to homepage" (should navigate)
   - Remove test error

2. **Test in production**:
   - Error boundaries behave differently in dev vs. prod
   - Build and deploy test version
   - Trigger error in production
   - Verify error UI appears

### Priority 3: Performance Checks

1. **Run Lighthouse**:
   ```bash
   pnpm lighthouse
   ```
   - Check Performance score
   - Verify LCP < 3.0s (accounting for OpenNext TTFB)
   - Check for any console errors
   - Review opportunities for improvement

2. **Check bundle sizes**:
   - Verify Plausible component doesn't bloat bundle
   - Check for any duplicate dependencies
   - Review code splitting

---

## ⚠️ POTENTIAL ISSUES TO INVESTIGATE

### 1. Plausible Script Timing

**Concern**: Script loads after React hydration via useEffect
**Risk**: Might miss first pageview if user navigates quickly
**Verification needed**:
- Test navigation timing
- Check if pageviews are captured correctly
- Monitor Plausible dashboard for data accuracy

**Possible Fix** (if needed):
- Add `window.plausible` check in useEffect
- Manually trigger pageview event after script loads
- Consider moving to `useLayoutEffect` for earlier execution

### 2. Ad Blocker Detection

**Concern**: Proxying should bypass ad blockers, but not tested
**Risk**: Users with ad blockers might not be tracked
**Verification needed**:
- Test with multiple ad blockers (uBlock Origin, AdBlock Plus, etc.)
- Check if `/api/proxy/` path is obvious enough to be blocked
- Consider renaming to less obvious path if needed

**Alternative Paths** (if current path is blocked):
- `/api/events` instead of `/api/proxy/api/event`
- `/static/s.js` instead of `/api/proxy/js/script.js`
- More creative obfuscation if needed

### 3. CORS and CSP Issues

**Concern**: Content Security Policy might block script injection
**Risk**: Script might not execute in production
**Verification needed**:
- Check browser console for CSP violations
- Verify script executes correctly
- Review response headers

**Fix** (if needed):
- Update CSP headers in `next.config.ts`
- Add `script-src` directive for Plausible

### 4. Hydration Mismatch Warnings

**Concern**: useEffect might cause hydration warnings
**Risk**: Console spam, potential React issues
**Verification needed**:
- Check console for hydration warnings
- Verify component renders consistently

**Fix** (if needed):
- Use `suppressHydrationWarning` prop
- Adjust component lifecycle

---

## 📋 PLAUSIBLE ANALYTICS INFO

**Account Details**:
- URL: https://plausible.io
- Site: praviel.com
- Trial: 30 days (started Nov 11, 2025)
- After trial: $9/month for up to 10k pageviews

**API Access**:
```bash
# Stats API (read-only)
curl "https://plausible.io/api/v1/stats/aggregate?site_id=praviel.com&period=day&metrics=visitors,pageviews" \
  -H "Authorization: Bearer TWLEG9lrs641ynoOkT22m2qQ9IZ-LQb7eSb_y_Jy3y3wVwuNhMvabMTDHy4g7Dyf"

# Realtime visitors
curl "https://plausible.io/api/v1/stats/realtime/visitors?site_id=praviel.com" \
  -H "Authorization: Bearer TWLEG9lrs641ynoOkT22m2qQ9IZ-LQb7eSb_y_Jy3y3wVwuNhMvabMTDHy4g7Dyf"
```

**Key stored in**: `.env.local` (gitignored)

---

## 🔧 OTHER IMPROVEMENTS NEEDED

### 1. Sentry Error Monitoring (Optional)

**Status**: Configuration exists but no DSN
**Time**: ~15 minutes
**Steps**:
1. Sign up at https://sentry.io
2. Create new project for Next.js
3. Get DSN from project settings
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://YOUR_KEY@sentry.io/YOUR_PROJECT
   SENTRY_AUTH_TOKEN=your_auth_token
   ```
5. Add to Cloudflare Workers environment variables
6. Deploy and test

**Why**: Know when errors happen in production (currently flying blind)

### 2. Performance Optimization

**Current Metrics**:
- Lighthouse: 81/100 (was 84/100, slight regression)
- LCP: 4.25s (target: <2.5s, realistically <3.0s with OpenNext)
- TTFB: 1.38s (OpenNext bottleneck)

**Known Issue**: OpenNext on Cloudflare Workers has performance problems
- Already on bleeding-edge `@opennextjs/cloudflare@main`
- Cloudflare working on fixes (October 2025)
- Should improve automatically with platform updates

**Possible Improvements**:
1. Enable `doQueue` and `enableCacheInterception` in `open-next.config.ts`
2. Optimize image loading (already using Next.js Image)
3. Consider hybrid: Static pages on Cloudflare Pages, dynamic on Workers

### 3. Mobile Testing

**Status**: NOT TESTED on real devices
**Needed**:
- Test on iOS Safari (iPhone)
- Test on Android Chrome
- Verify touch interactions
- Check safe area insets
- Test viewport behavior

### 4. Accessibility Audit

**Status**: Basic accessibility implemented
**Needed**:
- Run axe DevTools
- Test with screen reader
- Verify keyboard navigation
- Check color contrast
- Test focus management

---

## 📊 DEPLOYMENT INFO

**Current Version**: 0acbc374-c09d-45eb-a67a-a3093e526572
**URL**: https://praviel-site.antonnsoloviev.workers.dev
**Branch**: main

**Recent Commits**:
- f2698d5: docs: Update CRITICAL_TO-DOs - Plausible configured
- 05cb4b0: fix: Plausible Analytics with useEffect injection
- 11d80a9: wip: Documented Script component failure
- 3881ae2: docs: Updated CRITICAL_TO-DOs with findings
- 2110f88: fix: Attempted Plausible with API proxies
- 4110aab: feat: Language count fixes, error boundaries

**Build Status**:
- TypeScript: ✅ No errors
- ESLint: ✅ No warnings
- Build: ✅ All 23 pages generated
- Deploy: ✅ Cloudflare Workers

---

## 🎯 RECOMMENDED NEXT STEPS (Priority Order)

### Immediate (Next 30 minutes):

1. **Verify Plausible in Browser** (10 mins):
   - Open DevTools
   - Check script loads
   - Verify events send
   - Check Plausible dashboard

2. **Test Error Boundaries** (10 mins):
   - Trigger test errors
   - Verify UI appears
   - Test buttons work

3. **Run Lighthouse** (5 mins):
   - Check for console errors
   - Verify performance metrics
   - Review opportunities

4. **Test Ad Blockers** (5 mins):
   - Install uBlock Origin
   - Verify script still loads
   - Check dashboard for events

### Soon (This Week):

1. **Mobile Device Testing**:
   - Test on real iPhone
   - Test on real Android device
   - Verify touch interactions
   - Check safe areas

2. **Monitor Plausible Data**:
   - Check dashboard daily
   - Verify data looks reasonable
   - Look for anomalies

3. **Performance Optimization**:
   - Investigate high LCP
   - Review OpenNext config
   - Monitor for platform improvements

### Optional (As Needed):

1. **Enable Sentry** (if error monitoring desired)
2. **Accessibility audit** (axe DevTools, screen reader)
3. **Load testing** (simulate traffic)

---

## ✅ WHAT'S ACTUALLY VERIFIED

**Definitely Working**:
- ✅ Language count corrected (46→42) in all files
- ✅ Error boundary files created and deployed
- ✅ Plausible API proxies return correct status codes
- ✅ Plausible script injection code in production bundle
- ✅ Plausible API key works (tested with curl)
- ✅ TypeScript/ESLint checks pass
- ✅ Build succeeds and deploys

**Probably Working** (but not verified):
- ⚠️ Plausible script loads in browser (code is correct, but not tested)
- ⚠️ Plausible events are sent (proxy works, but not tested end-to-end)
- ⚠️ Error boundaries catch errors (code looks correct, but not tested)

**Unknown** (needs verification):
- ❓ Ad blockers bypass the proxy (designed to work, but not tested)
- ❓ Script loads at right time (useEffect timing not verified)
- ❓ Hydration warnings or errors (not checked in browser)
- ❓ CSP allows script injection (not verified)

---

## 🤔 HONEST ASSESSMENT

**What I Did Well**:
- Correctly identified Next.js 16 "use cache" incompatibility
- Implemented proper workaround with useEffect
- Created working API proxy endpoints
- Fixed language count everywhere
- Documented technical challenges thoroughly

**What I Didn't Do**:
- Test in actual browser with DevTools
- Verify events are sent to Plausible
- Check for console errors
- Test error boundaries with real errors
- Test on mobile devices
- Verify ad blocker bypass works
- Run Lighthouse performance audit

**Risk Assessment**:
- **High confidence**: Language count fix, API proxies work, code compiles
- **Medium confidence**: Plausible script will load and track (code looks right)
- **Low confidence**: No issues with timing, CSP, hydration (need testing)

**Recommendation for Next Session**:
START by opening the site in a browser and checking DevTools. This is the most critical verification step. If the script isn't loading or there are errors, everything else doesn't matter.

---

## 📝 NOTES FOR NEXT AI AGENT

**Context**: Previous agent implemented Plausible Analytics with a custom useEffect-based approach to work around Next.js 16 `"use cache"` limitation. Code is deployed but NOT verified to work in actual browsers.

**First Task**: Open https://praviel-site.antonnsoloviev.workers.dev in Chrome with DevTools and verify:
1. Script loads without errors
2. Script element exists in DOM
3. Events are sent on pageview
4. Plausible dashboard shows data

**If Plausible Doesn't Work**:
- Check console for errors
- Verify script element attributes
- Test API endpoints manually
- Check timing issues (script might load too late)
- Consider alternative approaches (useLayoutEffect, different script source)

**If Everything Works**:
- Update this doc to reflect verification
- Test error boundaries
- Run Lighthouse
- Test with ad blockers
- Move to mobile testing

**Be Skeptical**: Previous agent was confident but didn't actually test in browser. Don't trust claims without verification. Actually open DevTools and look.

---

*Last updated by AI agent on 2025-11-11 at 00:45 UTC. Attempted to be honest about what was verified vs. what still needs testing. Next agent should start with browser verification.*
