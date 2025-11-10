# NEXT SESSION - CRITICAL BUGS TO FIX

**Created**: 2025-11-10 00:18 UTC
**Last Deployment**: Version 75ced59f-5e80-44dd-8821-060745028530
**Status**: TWO P0 REGRESSIONS + ONE UNRESOLVED BUG

---

## P0 REGRESSION: Blog Posts Disappeared

**Symptom**: Blog listing shows "No blog posts yet. Check back soon!" instead of actual posts.

**Root Cause**:
- `lib/blog.ts` uses `fs.readFileSync()` which doesn't work in Cloudflare Workers runtime
- `app/blog/page.tsx` line 20 calls `getAllPosts()` synchronously
- Static HTML was correctly generated during build (confirmed: `.next/server/app/blog.html` contains "The Case for")
- OpenNext Cloudflare is running the server function at runtime instead of serving the static HTML

**Evidence**:
```bash
$ grep "The Case for" .next/server/app/blog.html
The Case for  # Found - static generation worked
```

**Files Involved**:
- `app/blog/page.tsx` (needs to be truly static, not runtime)
- `lib/blog.ts` (`getAllPosts()` and `getPostBySlug()` use filesystem)
- OpenNext Cloudflare configuration

**Possible Fixes**:
1. Force static generation for `/blog` page (add metadata export or force-static config)
2. Bundle blog posts into JavaScript at build time instead of reading from fs
3. Check OpenNext Cloudflare route configuration for static vs dynamic handling

---

## P0 BUG (STILL EXISTS): All Languages Section Hidden

**Symptom**: User can see "Click any language to see its top 10 canonical works" but nothing below it is visible.

**What Was Tried (AND FAILED)**:
- Added `z-0` to gradient overlay in `components/LanguageShowcase.tsx:52`
- This did NOT fix the issue

**Actual Problem**: UNKNOWN - needs proper investigation

**Files to Investigate**:
- `components/AllLanguagesList.tsx` (lines 65-100 - the container and languages list)
- `components/LanguageShowcase.tsx` (where AllLanguagesList is placed - line 76)
- Check if parent container has `overflow: hidden` or `max-height` cutting off content
- Check if there's a stacking context issue preventing visibility
- Look for CSS that might be hiding `<details>` elements

**User's Description**:
"the bottom part of the 'all languages section' being hidden 'behind' the website"
"I literally cannot see anything below the 'click any language to see its top 10 canonical works'"

**Next Steps**:
1. Inspect the actual DOM/CSS in browser dev tools on production site
2. Check if `overflow: hidden` is set on any parent container
3. Check if the `<details>` elements are rendering but invisible
4. Check if there's a height constraint on the LanguageShowcase section

---

## ✅ ACTUALLY FIXED: Blog Text Centering

**Change**: `app/globals.css:1090` - Changed `.prose` max-width from 65ch to 75ch
**Status**: This fix is correct and deployed

---

## NOTES FOR NEXT AGENT

### What I Did Wrong:
1. **Assumed fixes worked without testing** - Added z-index fix without verifying it solved the problem
2. **Created a regression** - Blog posts disappeared after deployment
3. **Didn't investigate properly** - Guessed at z-index fix instead of actually finding what was hiding content

### How to Fix This Properly:
1. **For blog posts**: Check OpenNext Cloudflare configuration for static route handling
2. **For hidden languages**: Use browser dev tools on https://praviel.com to inspect actual DOM and CSS
3. **Test before deploying**: Actually verify fixes work on production site

### OpenNext Cloudflare Context:
- Filesystem access (`fs.readFileSync()`) does NOT work in Workers runtime
- Static pages must be served from pre-generated HTML, not re-rendered at runtime
- Check `.open-next/` directory structure to see how routes are configured

---

## DEPLOYMENT INFO

**Current Version**: 75ced59f-5e80-44dd-8821-060745028530
**Deployment URL**: https://praviel.com
**Workers URL**: https://praviel-site.antonnsoloviev.workers.dev

**Blog Post File**: `content/blog/2025-11-08-case-for-classics.md` (21KB, exists)
**Static HTML**: `.next/server/app/blog.html` (63KB, contains correct content)
**Problem**: Runtime execution in Workers instead of serving static HTML
