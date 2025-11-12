# CRITICAL TO-DOs

**Last updated:** Nov 12, 2025 — post-hero accessibility + Field Reports refresh  
**Production URL:** https://praviel-site.antonnsoloviev.workers.dev  
**Last successful deploy:** fc75c11 (pnpm run deploy — Nov 12, 2025 20:55 UTC)  
**Latest commit on main:** 1b0cc65 (docs refresh)

---

## Current status

- Marketing site now includes the Material Study section, Field Reports (blog spotlight), blog view transitions powered by `next-view-transitions`, and the new comfort + immersive controls wired via dataset bootstrap.
- `pnpm lint`, `pnpm typecheck`, local OpenNext build/preview, and the hero/blog accessibility suites were re-run on Nov 12; the latest Worker (b39baddb) carries the slimmer mobile CTA but still needs perf polish.
- Mobile Lighthouse remains over target (latest prod run: **4.09 s** LCP, perf 85) even after the hero tweaks; we regressed after removing the CTA card, so another perf pass is blocking launch.
- Comfort controls, immersive toggles, and transitions are only verified on Chromium desktop — Safari/Android still pending.
- `pnpm smoke:blog` now exists (listing + latest slug) and is wired into `.github/workflows/nightly-monitor.yml`, but Slack/Resend secrets are still unset so failures are silent until those env vars land.

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
   - ✅ `.github/workflows/nightly-monitor.yml` is now committed: Plausible monitor, blog smoke, Playwright suites, Lighthouse, and LCP debug all run nightly.
   - TODO: populate `SLACK_ALERT_WEBHOOK`, `RESEND_API_KEY`, and `ALERT_EMAIL_TO` so alerting steps actually fire; without them the workflow only uploads artifacts.

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

## Execution guardrails for the next session

- **No low-signal work.** Only run Lighthouse/Playwright after meaningful code changes; otherwise keep iterating on the hero/mobile bottlenecks. Blog smoke + Plausible monitor already run nightly.
- **Hit the blockers in order:** (1) drop mobile LCP ≤ 2.5 s, (2) run the pending Safari/Android manual passes, (3) configure Slack/Resend secrets so the nightly workflow can alert us.
- **Cross-browser shakedown:** View Transitions + immersive toggles must be validated on Safari iOS 18 beta, Firefox Nightly, and Android Chrome, then summarize any deltas here.
- **Document unfinished threads.** If you stop mid-investigation (e.g., hero perf experiment, cross-browser bug), list the exact steps + URLs here before ending the session so the next agent can pick up instantly.
