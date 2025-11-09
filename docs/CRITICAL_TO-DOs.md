# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

**Last Updated**: 2025-11-09

---

## ✅ COMPLETED (2025-11-09)

### Session Summary
- ✓ Fixed P0 language count bug (46 → 21 across all 11 files)
- ✓ Simplified UX (removed technical jargon from "How It Works")
- ✓ Built, tested, and deployed to Cloudflare (version: 75ced59f-5e80-44dd-8821-060745028530)
- ✓ Resolved visual ordering bug (was browser cache issue)

---

## ⚠️ PENDING WORK

### Testing & Verification Needed
- [ ] Test AllLanguagesList component (show more button, animations)
- [ ] Verify CSS animations work smoothly on mobile
- [ ] Test keyboard navigation and screen reader compatibility
- [ ] Verify no layout shifts or visual jank on low-end devices
- [ ] Test the new deployment on different browsers/devices

### Data Quality
- [ ] Audit languageData.ts for accuracy (topTenWorks, descriptions, native names)
- [ ] Add remaining 25 languages from roadmap (Phase 2 & 3) if desired
- [ ] Verify all RTL flags and font classes are correct

### Performance
- [ ] Run Lighthouse audit on deployed site
- [ ] Check Core Web Vitals (LCP, FID, CLS)
- [ ] Test mobile performance (should have no lag)
- [ ] Verify proper spacing on all screen sizes

### UX Improvements
- [ ] Consider adding search/filter to language list
- [ ] Consider grouping languages by family/region
- [ ] Ensure mobile experience is smooth and engaging

---

## 📝 NOTES FOR NEXT SESSION

**What Works Well**:
- Language count is now accurate (21 languages)
- Code structure is correct (verified component ordering)
- UX is more accessible and less overwhelming
- Type checking, linting, and build all pass

**What Still Needs Attention**:
- The "Show More" button displays "Show 15 More Languages" (21 total - 6 initial = 15)
- AllLanguagesList shows 6 initially (reduced from 8 for better mobile performance)
- Could add more languages to reach the 46 target over time

**Future Enhancements**:
- Consider interactive language demos
- Add filtering by script type, language family, or time period
- Improve mobile touch interactions
- Add more visual interest to language cards

---

*Deployment Info: https://praviel-site.antonnsoloviev.workers.dev (version: 75ced59f-5e80-44dd-8821-060745028530)*
