# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

**Last Updated**: 2025-11-09 (23:15 UTC)

---

## ✅ COMPLETED (2025-11-09 - Current Session)

### Major Accomplishments
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

### Testing & QA
- [ ] Test AllLanguagesList component with all 46 languages (show more button, animations)
- [ ] Verify video backgrounds work properly on mobile and desktop
- [ ] Verify CSS animations work smoothly on mobile
- [ ] Test mobile performance (should have no lag)
- [ ] Verify proper spacing on all screen sizes

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
