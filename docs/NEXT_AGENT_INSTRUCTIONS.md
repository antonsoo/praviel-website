# URGENT: Instructions for Next Agent - React Hydration Error #418

**Status**: CRITICAL PRODUCTION BUG - Site is broken for all users
**Last Updated**: November 14, 2025 04:00 UTC
**Reporter**: User confirmed error still occurring despite fix attempt

---

## 🔴 THE PROBLEM

Production site (https://praviel.com) has TWO critical issues:

### Issue 1: React Error #418 (Hydration Mismatch)
```
Uncaught Error: Minified React error #418
```

**What this means**: Server HTML doesn't match client-side React expectations, causing hydration to fail and fall back to client-side rendering.

**Symptoms**:
- Homepage shows loading skeletons (gray pulsing boxes)
- Content never appears
- Users cannot interact with waitlist form
- Console shows error #418

### Issue 2: Preload Warnings
```
The resource <URL> was preloaded using link preload but not used within a few seconds
```

**Count**: 5 warnings
**Likely culprits**: Font preloads or other assets

---

## ❌ WHAT DIDN'T WORK

**Previous Fix Attempt (FAILED)**:
- Commit `6784dea`: Removed data attributes from server-rendered `<html>` tag
- Moved bootstrap script to `<head>`
- **Result**: Error #418 STILL occurs

**Why it failed**: Unknown - needs investigation with actual browser DevTools

---

## 🎯 WHAT YOU MUST DO

### Step 1: Start Dev Server and Test Locally

```bash
# Start dev server
pnpm dev

# Open browser to http://localhost:3003
# Open DevTools Console
# Look for:
# 1. React error #418
# 2. Any hydration warnings
# 3. What the actual mismatch is
```

**Expected behavior**: Dev server should show the SAME error as production if it's a code issue.

### Step 2: Identify the Exact Hydration Mismatch

React error #418 full message: https://react.dev/errors/418

**Common causes**:
1. ✅ Data attributes mismatch (already tried to fix, didn't work)
2. ⚠️ **Suspense boundaries not resolving**
3. ⚠️ **Client-side only components rendering on server**
4. ⚠️ **Date/time rendering (SSR vs client timezone)**
5. ⚠️ **Random IDs or Math.random() in SSR**
6. ⚠️ **Browser extension injecting HTML**
7. ⚠️ **ConditionalViewTransitions wrapper issue**

**How to find it**:
```javascript
// In browser console, enable React DevTools
// React will show which component has the mismatch
// Look for "Warning: Text content did not match" or similar
```

### Step 3: Check Suspense Boundaries

File: `app/page.tsx`

**Question**: Does the page use `<Suspense>` with fallback components?

**If YES**:
- The loading skeletons are Suspense fallbacks
- Content components are never resolving
- Check why async components aren't loading

**Action**:
```bash
# Search for Suspense usage
grep -r "Suspense" app/
grep -r "aria-busy" components/
```

### Step 4: Investigate ConditionalViewTransitions

File: `app/layout.tsx` line 178

```tsx
<ConditionalViewTransitions>
  <html ...>
```

**Hypothesis**: This wrapper might be causing hydration issues with React 19.

**Test**:
1. Temporarily remove `<ConditionalViewTransitions>` wrapper
2. Just use `<html>` directly
3. See if error #418 goes away

**File to check**: `components/ConditionalViewTransitions.tsx`

### Step 5: Check for Client-Only Components

**Search for components that should NOT render on server**:

```bash
# Find all "use client" components
grep -r "use client" components/

# Check if any are imported in server components
grep -r "import.*from.*components" app/page.tsx
```

**Rule**: If a component uses browser APIs (window, localStorage, etc.), it MUST have `"use client"` directive.

### Step 6: Fix Preload Warnings

**Likely in**: `app/layout.tsx` or font loading

**Check**:
```bash
# Find font preloads
grep -r "preload" app/
grep -r "woff" app/
```

**Common fix**: Remove unused font preloads or ensure fonts are actually used.

---

## 🔧 SPECIFIC FILES TO INVESTIGATE

### Priority 1: Layout & Page Structure

1. **`app/layout.tsx`**
   - Lines 177-232 (main render)
   - Check `ConditionalViewTransitions` wrapper
   - Check bootstrap script
   - Verify no server/client mismatches

2. **`app/page.tsx`**
   - Check for Suspense boundaries
   - Check for async components
   - Verify all client components have `"use client"`

3. **`components/ConditionalViewTransitions.tsx`**
   - May be incompatible with React 19
   - Check if it modifies HTML structure

### Priority 2: Client Components

4. **`components/WaitlistForm.tsx`**
   - Has `"use client"` ✅
   - But check if parent wraps it correctly

5. **`components/ClientEnhancements.tsx`**
   - Check what it does
   - May be modifying DOM and causing mismatch

6. **`components/SiteHeader.tsx`**
   - Mobile menu state management
   - Check if it has client-side only logic

---

## 🧪 TESTING CHECKLIST

### Local Testing (MUST DO FIRST)
- [ ] Start `pnpm dev`
- [ ] Open http://localhost:3003 in browser
- [ ] Open DevTools Console
- [ ] Reproduce error #418 locally
- [ ] Identify exact component causing mismatch
- [ ] Fix the mismatch
- [ ] Verify fix works locally
- [ ] Verify no loading skeletons remain visible

### After Local Fix
- [ ] Run `pnpm typecheck` (must pass)
- [ ] Run `pnpm lint` (must pass)
- [ ] Run `pnpm build` (must pass)
- [ ] Test built version: `pnpm preview`
- [ ] Verify preview works without errors
- [ ] Deploy to production
- [ ] Test production in browser
- [ ] Verify error #418 is gone
- [ ] Verify content is visible
- [ ] Test waitlist form submission

---

## 💡 ALTERNATIVE APPROACHES IF STUCK

### Option 1: Disable Suspense Temporarily
If Suspense is the issue, temporarily remove it to get site working:

```tsx
// In app/page.tsx
// Change:
<Suspense fallback={<LoadingSkeleton />}>
  <Content />
</Suspense>

// To:
<Content />
```

### Option 2: Disable View Transitions
Remove `ConditionalViewTransitions` wrapper entirely:

```tsx
// In app/layout.tsx
// Change:
<ConditionalViewTransitions>
  <html>...</html>
</ConditionalViewTransitions>

// To:
<html>...</html>
```

### Option 3: Force Client-Side Rendering
If all else fails, force client-side rendering:

```tsx
// Add to problem components:
"use client";

import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(() => import('./Component'), {
  ssr: false
});
```

### Option 4: Use suppressHydrationWarning
**Last resort only** - this hides the error but doesn't fix it:

```tsx
<html suppressHydrationWarning>
```

---

## 📊 EXPECTED OUTCOME

After fixing, you should see:
- ✅ No error #418 in console
- ✅ Homepage content visible (not loading skeletons)
- ✅ Waitlist form visible and functional
- ✅ Mobile menu works
- ✅ No hydration warnings

---

## 🚨 IF YOU CAN'T FIX IT IN 2 HOURS

**Rollback plan**:
1. Find last working commit (before my changes)
2. Git revert to that commit
3. Document what you tried
4. Ask user for help/clarification

**Commits to potentially revert**:
- `6784dea` - My failed hydration fix
- `28065ac` - Ancient theme enhancements (these work, don't revert)

---

## 📝 DOCUMENTATION REQUIREMENTS

When you fix this, document:
1. **What was the actual cause?** (exact component/line)
2. **Why did my fix not work?** (so we learn)
3. **What was the correct fix?** (for future reference)
4. **How did you verify it works?** (screenshots/test results)

Update this file with your findings.

---

**Critical Success Factors**:
1. ⚠️ Test locally FIRST - don't guess and deploy
2. ⚠️ Use browser DevTools - don't rely on logs alone
3. ⚠️ Verify fix works before deploying to production
4. ⚠️ Test actual user flows (signup, navigation, mobile menu)

**Good luck. The site is completely broken right now - this is urgent.**
