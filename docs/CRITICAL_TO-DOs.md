# CRITICAL TO-DOs

**Last updated:** Nov 12, 2025 — post-hero accessibility + Field Reports refresh  
**Production URL:** https://praviel-site.antonnsoloviev.workers.dev  
**Last successful deploy:** fc75c11 (pnpm run deploy — Nov 12, 2025 20:55 UTC)  
**Latest commit on main:** 1b0cc65 (docs refresh)

---

## Current status

- Marketing site now includes the Material Study section, Field Reports (blog spotlight), blog view transitions powered by `next-view-transitions`, and the new comfort + immersive controls wired via dataset bootstrap.
- `pnpm lint`, `pnpm typecheck`, local OpenNext build/preview, and the hero/blog accessibility suites were re-run on Nov 12; production is still serving the pre-refresh hero until the next deploy.
- Mobile Lighthouse remains over target (latest prod run: **2.57 s** LCP, perf 95) even after the hero tweaks, so we need another perf pass before we can check the box.
- Comfort controls, immersive toggles, and transitions are only verified on Chromium desktop — Safari/Android still pending.

---

## Critical tasks (ordered)

1. **Mobile LCP ≤ 2.5 s (blocking)**
   - Latest `pnpm perf:audit` (Nov 12 22:27 UTC) vs prod = **4.09 s** LCP / perf 85. Earlier baseline (21:47 UTC) was **2.57 s**. We clearly regressed under throttled mobile, so the hero/CTA still needs major simplification.
   - `pnpm lcp:debug` (Nov 12, local dev) now reports the top nav wordmark (`<a>` at 1.16 s) followed by the mobile CTA subheading (1.36 s). The CTA card has been removed on mobile, but the typography + gradients are still heavy.
   - Keep archiving JSON/HTML reports in `test-results/` once we hit budget.

2. **Responsive polish for hero + new sections**
   - Audit 360×640, 414×896, 768×1024, and 1280×720 using Chrome DevTools or Playwright screenshot tests.
   - Fix any clipping/overflow in Hero, Material Study, Field Reports, Civilization Triad, and Language Showcase. Pay attention to token-based typography (`data-type-scale`, `data-body-font`) and ensure the new sections honor the comfort settings.

3. **Accessibility + motion testing**
   - Run Playwright axe suites (`tests/e2e/accessibility-hero-mobile.spec.ts`, `tests/e2e/accessibility-roadmap.spec.ts`) and add scenarios for Material Study + Field Reports.
   - Manual VoiceOver/TalkBack passes to ensure announcements (Comfort controls, Voice Tour) behave, especially after View Transitions.

4. **Cross-browser View Transitions + immersive prefs**
   - Test Safari iOS 18 beta, Firefox Nightly, and Chromium Android. Verify transitions degrade gracefully where unsupported, immersive “off” disables ticker/columns/Material Study animations, and the blog Link component never throws.
   - If Safari lacks the API, gate `ViewTransitions` via feature detection.

5. **Blog regression & content tooling**
   - ✅ Added two Field Reports (`2025-11-05` comfort controls + `2025-11-10` view transitions) and regenerated `lib/generated/blog-data.json` on build.
   - ✅ `BASE_URL=http://127.0.0.1:3000 pnpm playwright test tests/e2e/blog-navigation.spec.ts --project=chromium-desktop` (Nov 12).
   - ✅ New `pnpm smoke:blog` script fetches `/blog` + the latest slug; wired into nightly workflow with `BLOG_SMOKE_BASE=${BASE_URL}` (Nov 12).

6. **Monitoring + nightly automation**
   - Wire `pnpm monitor:plausible`, `pnpm perf:audit`, and the accessibility suites into CI/nightly workflow (`.github/workflows/nightly-monitor.yml` exists but is not checked in).
   - Ensure Slack/Resend env vars are configured so failures alert us immediately.

---

## Testing checklist for next agent

- [x] `pnpm lint` (Nov 12 — clean)
- [x] `pnpm typecheck` (Nov 12 — clean)
- [x] `pnpm perf:audit` (Nov 12 — prod LCP 2.57 s, preview 3.49 s; fails target)
- [x] `pnpm lcp:debug` (Nov 12 — CTA span and hero h2 are current candidates)
- [x] `BASE_URL=http://127.0.0.1:3000 pnpm playwright test tests/e2e/blog-navigation.spec.ts --project=chromium-desktop`
- [x] `pnpm playwright test tests/e2e/accessibility-hero-mobile.spec.ts --project=chromium-mobile`
- [x] `pnpm playwright test tests/e2e/accessibility-roadmap.spec.ts --project=chromium-desktop`
- [ ] Manual Safari iOS + Android Chrome checks for comfort controls, immersive toggles, Voice Tour, Material Study

---

## Notes for the incoming agent

- Always run `pnpm blog:generate` after editing markdown; Cloudflare Workers cannot read the filesystem.
- Prefer `pnpm run dev`/`pnpm preview` for local QA so our edge-specific behavior (proxy, analytics) matches production.
- Keep focus on meaningful progress: prioritize the mobile performance/a11y fixes before adding new sections.
