# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

**Last Updated**: 2025-11-10 (03:30 UTC)

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

## ⚠️ PENDING WORK

### Performance Optimization (Current: 81/100)
- [ ] Improve LCP from 4.25s to <2.5s (partially blocked by OpenNext Cloudflare TTFB issues)
- [ ] Optimize video background loading/preloading
- [ ] Review font loading strategy (preload critical fonts)
- [ ] Consider lazy loading for below-fold content

### Testing & QA
- [ ] Test AllLanguagesList component with all 46 languages (show more button, animations)
- [ ] Verify video backgrounds work properly on mobile and desktop
- [ ] Verify CSS animations work smoothly on mobile
- [ ] Test keyboard navigation and screen reader compatibility

### UX Improvements
- [ ] Consider adding search/filter to language list
- [ ] Consider grouping languages by family/region
- [ ] Ensure mobile experience is smooth and engaging

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
- LCP at 4.25s (target: <2.5s) - partially due to OpenNext Cloudflare TTFB issues (1.5s+)
- Performance score 81/100 - room for improvement but acceptable

---

*Latest Deployment: https://praviel-site.antonnsoloviev.workers.dev (version: 58711e84-c950-4a75-8e61-d208bee3b227)*

**Critical Analysis Document**: See [CRITICAL_ANALYSIS.md](CRITICAL_ANALYSIS.md) for comprehensive multi-perspective evaluation.
