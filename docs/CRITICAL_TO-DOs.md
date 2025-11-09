# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

**Last Updated**: 2025-11-09 (21:40 UTC)

---

## ✅ COMPLETED (2025-11-09 - Latest Session)

### Session Summary
- ✓ Fixed P0 language count bug (**21 → 46** across all 12 files)
  - Updated app/layout.tsx (2 locations)
  - Updated components: HeroCrest, HeroSection, FundingHero, FeatureGrid, ComparisonTable, TractionBar, ImpactSection
  - Updated app/api/page.tsx (3 locations)
- ✓ Type checking passed
- ✓ Linting passed
- ✓ Production build successful (21 pages generated)
- ✓ Deployed to Cloudflare (version: **fb62e843-cd31-42a5-a2c8-f49f38d92aed**)

---

## ⚠️ PENDING WORK

### Critical Issues to Address
- [ ] Background videos exist but aren't being used (static images instead)
  - Files in `/public/videos/desktop/` and `/public/videos/mobile/`
  - Hero components use AVIF images instead of video backgrounds
- [ ] No demo lesson components found in codebase
- [ ] Test AllLanguagesList component (show more button, animations)
- [ ] Verify CSS animations work smoothly on mobile
- [ ] Test mobile performance (should have no lag)
- [ ] Verify proper spacing on all screen sizes

### Data Quality
- [ ] Audit languageData.ts for accuracy (topTenWorks, descriptions, native names)
- [ ] Add remaining 26 languages from roadmap (Phase 2 & 3) to reach 46 total
  - Currently have 20 languages in languageData.ts
  - LANGUAGE_LIST.md shows full 46 language roadmap (36 full + 10 partial)
- [ ] Verify all RTL flags and font classes are correct

### Performance
- [ ] Run Lighthouse audit on deployed site
- [ ] Check Core Web Vitals (LCP, FID, CLS)
- [ ] Test keyboard navigation and screen reader compatibility
- [ ] Verify no layout shifts or visual jank on low-end devices

### UX Improvements
- [ ] Consider adding search/filter to language list
- [ ] Consider grouping languages by family/region
- [ ] Ensure mobile experience is smooth and engaging
- [ ] Reduce information overload for new visitors

---

## 📝 NOTES FOR NEXT SESSION

**What Works Well**:
- Language count now accurate (46 languages across full offering)
- 20 languages fully implemented in languageData.ts
- 26 more languages in roadmap (lib/languageRoadmap.ts)
- Code structure is correct (verified component ordering)
- Type checking, linting, and build all pass
- UX is more accessible and less overwhelming

**What Still Needs Attention**:
- Background videos not being used (could improve visual appeal)
- Demo lessons mentioned by user but not found in codebase
- Mobile performance optimization needed
- AllLanguagesList shows 6 initially - verify "Show More" button text is correct

**Future Enhancements**:
- Implement background video for hero section
- Create interactive language demos/lessons
- Add filtering by script type, language family, or time period
- Improve mobile touch interactions
- Add more visual interest to language cards

---

*Deployment Info: https://praviel-site.antonnsoloviev.workers.dev (version: fb62e843-cd31-42a5-a2c8-f49f38d92aed)*
