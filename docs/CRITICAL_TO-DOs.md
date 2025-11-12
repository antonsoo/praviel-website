# CRITICAL TO-DOs

**Last updated:** Nov 12, 2025 — handoff after view transition + Material Study release  
**Production URL:** https://praviel-site.antonnsoloviev.workers.dev  
**Last successful deploy:** fc75c11 (pnpm run deploy — Nov 12, 2025 20:55 UTC)  
**Latest commit on main:** 1b0cc65 (docs refresh)

---

## Current status

- Marketing site now includes the Material Study section, Field Reports (blog spotlight), and blog view transitions powered by `next-view-transitions`.
- `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm run deploy` have been run this session; production is serving the new UI.
- Performance (mobile LCP) is still over target, and we have not re-run Lighthouse/Playwright after today’s changes.
- Comfort controls, immersive toggles, and the new transitions have only been smoke-tested on Chromium desktop.

---

## Critical tasks (ordered)

1. **Mobile LCP ≤ 2.5 s (blocking)**
   - Re-run `pnpm perf:audit` (≥5 throttled runs) and `pnpm lcp:debug` after today’s hero/material changes.
   - Experiment with: collapsing footer copy at first paint, simplifying hero gradients on mobile, inlining CTA styles, and ensuring the Field Reports cards do not appear above the fold on 360×640 viewports.
   - Capture metrics (JSON + HTML reports) and keep the best + median runs in `test-results/`.

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
   - Re-run `tests/e2e/blog-navigation.spec.ts` against a local build (`BASE_URL=http://127.0.0.1:4410`).
   - Add a prod smoke test that fetches `/blog` and `/blog/<slug>` via Playwright or curl to catch future JSON mismatches.

6. **Monitoring + nightly automation**
   - Wire `pnpm monitor:plausible`, `pnpm perf:audit`, and the accessibility suites into CI/nightly workflow (`.github/workflows/nightly-monitor.yml` exists but is not checked in).
   - Ensure Slack/Resend env vars are configured so failures alert us immediately.

---

## Testing checklist for next agent

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm perf:audit` (≥5 mobile runs, archive reports)
- [ ] `pnpm lcp:debug` (record current hero candidate + paint size)
- [ ] `BASE_URL=http://127.0.0.1:4410 pnpm playwright test tests/e2e/blog-navigation.spec.ts --project=chromium-desktop`
- [ ] `pnpm playwright test tests/e2e/accessibility-hero-mobile.spec.ts --project=chromium-mobile`
- [ ] `pnpm playwright test tests/e2e/accessibility-roadmap.spec.ts --project=chromium-desktop`
- [ ] Manual Safari iOS + Android Chrome checks for comfort controls, immersive toggles, Voice Tour, Material Study

---

## Notes for the incoming agent

- Always run `pnpm blog:generate` after editing markdown; Cloudflare Workers cannot read the filesystem.
- Prefer `pnpm run dev`/`pnpm preview` for local QA so our edge-specific behavior (proxy, analytics) matches production.
- Keep focus on meaningful progress: prioritize the mobile performance/a11y fixes before adding new sections.
