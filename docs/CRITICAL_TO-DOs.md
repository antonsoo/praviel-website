# CRITICAL TO-DOs

**Last updated:** Nov 13, 2025 — mobile perf audits + background/UX refinements  
**Production URL:** https://praviel-site.antonnsoloviev.workers.dev  
**Last successful deploy:** fc75c11 (pnpm run deploy — Nov 12, 2025 20:55 UTC)  
**Latest commit on main:** 1b0cc65 (docs refresh)

---

## Current status

- Marketing site now includes the Material Study section, Field Reports (blog spotlight), blog view transitions powered by `next-view-transitions`, and the new comfort + immersive controls wired via dataset bootstrap.
- `pnpm lint`, `pnpm typecheck`, `pnpm lcp:debug`, and the two axe/Playwright suites were re-run locally on Nov 13 after clearing stale `next start` processes; OpenNext preview/build was left untouched in that round.
- Mobile Lighthouse **still fails thresholds**: original `pnpm perf:audit` at Nov 13 03:00 UTC showed **4.74 s LCP / perf 67**, and a later audit on Nov 13 ~15:18 UTC (against the same production URL) reports **~3.90 s LCP / perf 87** with CLS 0 but occasionally ~1 s server TTFB. LCP remains the hero headline span; the remaining budget is now dominated by Worker TTFB variance + main-thread style/layout/script work, not images.
- Comfort controls, immersive toggles, and transitions are only verified on Chromium desktop — Safari/Android still pending.
- `pnpm smoke:blog` now exists (listing + latest slug) and is wired into `.github/workflows/nightly-monitor.yml`, but Slack/Resend secrets are still unset so failures are silent until those env vars land.

---

## Critical tasks (ordered)

1. **Mobile LCP ≤ 2.5 s (blocking)**
   - Current reality (Nov 13, multiple runs):
     - `pnpm perf:audit` (03:00 UTC) — **4.74 s** LCP / perf 67.
     - `pnpm perf:audit` (15:18 UTC) — **3.90 s** LCP / perf 87, CLS 0, server TTFB ~1016 ms in that sample. Main-thread breakdown roughly: ~1.3 s “other”, ~0.66 s style/layout, ~0.54 s script evaluation, ~0.25 s paint/composite.
   - `pnpm lcp:debug` (Nov 13 03:01 UTC and again later) consistently pegs the hero headline `<span class="block">Read the originals.</span>` as the LCP element at ~0.9–1.2 s and ~15.6 KB. That means the content choice for LCP is correct; the gap to ≤ 2.5 s is infra + main-thread cost, not a stray image.
   - High-ROI improvements **already landed** (frontend-only):
     - `contentVisibility: "auto"` + `containIntrinsicSize` now used on: Civilization Portals, Feature Grid, Language Showcase, **JourneyTimeline**, and **WhyPRAVIEL**. This defers layout/paint for heavier below-the-fold content until closer to the viewport.
     - Global “micro-interactions” that previously applied transforms and `position: relative; overflow: hidden` to **all** `button`/`a` have been scoped to `.btn-interactive` / `.haptic-feedback` classes only. No component currently opts in, so the default is lower overhead. Key CTAs can add `.btn-interactive` explicitly later.
   - **Still unmet**: Lighthouse mobile LCP ≤ 2.5 s. At this point, further gains likely require:
     - Trimming complexity in the hero on mobile (fewer overlapping decorative layers / gradients / client components in the initial render tree).
     - Verifying Plausible + other client-side scripts are really loading post-LCP.
     - Infra-side work: Cloudflare/OpenNext cache + cold-start mitigation. TTFB spikes (~1 s in latest run) must be addressed at the edge; code changes alone won’t fix those.
   - Keep archiving JSON/HTML reports in `test-results/` once you hit meaningful improvements; avoid re-running `pnpm perf:audit` after tiny CSS tweaks (see “Execution guardrails” below).

2. **Responsive polish for hero + new sections**
   - Audit 360×640, 414×896, 768×1024, and 1280×720 using Chrome DevTools or Playwright screenshot tests.
   - Fix any clipping/overflow in Hero, Material Study, Field Reports, Civilization Triad, and Language Showcase. Pay attention to token-based typography (`data-type-scale`, `data-body-font`) and ensure the new sections honor the comfort settings. Civilization Portals now uses `content-visibility` but still needs manual QA on small phones (cards compress aggressively).
   - New: Journey Timeline and Why PRAVIEL now also use `content-visibility: auto`. On small devices, confirm there is no “pop-in” or unexpected jank when scrolling them into view (especially with scroll-driven animations enabled).

3. **Accessibility + motion testing**
   - `tests/e2e/accessibility-hero-mobile.spec.ts` passes when we kill stray `next start` processes and manually launch `pnpm start --hostname 127.0.0.1 --port 3300` (see checklist below for the exact command). `scripts/run-playwright.ts` still hangs forever if port 3000 is occupied, so fixing that script or ensuring clean ports is mandatory.
   - `tests/e2e/accessibility-roadmap.spec.ts` re-ran clean on Chromium desktop off the same manual server.
   - Still need coverage for Material Study + Field Reports plus the manual VoiceOver/TalkBack passes.
   - New: Living Manuscript now has a “Focus view” full-screen dialog (`role="dialog"`, `aria-modal="true"`) that locks `<html>` scrolling while open and closes on `Escape`. It **does not yet have** a full focus trap or “return focus to launcher” behavior. Next agent should:
     - Add a minimal focus-trap implementation (keep Tab focus inside the dialog while open).
     - On close, move focus back to the “Focus view” button.
     - Optionally add a small Playwright a11y test that opens/closes the dialog and asserts behavior.

4. **Cross-browser View Transitions + immersive prefs**
   - Added `ConditionalViewTransitions` so Safari/Firefox gracefully skip the wrapper and we set `data-view-transitions` on `<html>`. Still need real-device verification (Safari iOS 18 beta, Firefox Nightly, Android Chrome) to confirm the data attribute + immersive prefs behave.

5. **Blog regression & content tooling**
   - ✅ Added two Field Reports (`2025-11-05` comfort controls + `2025-11-10` view transitions) and regenerated `lib/generated/blog-data.json` on build.
   - ✅ `BASE_URL=http://127.0.0.1:3000 pnpm playwright test tests/e2e/blog-navigation.spec.ts --project=chromium-desktop` (Nov 12).
   - ✅ New `pnpm smoke:blog` script fetches `/blog` + the latest slug; wired into nightly workflow with `BLOG_SMOKE_BASE=${BASE_URL}` (Nov 12).

6. **Monitoring + nightly automation**
   - ✅ `.github/workflows/nightly-monitor.yml` is now committed: Plausible monitor, blog smoke, Playwright suites, Lighthouse, and LCP debug all run nightly.
   - TODO: populate `SLACK_ALERT_WEBHOOK`, `RESEND_API_KEY`, and `ALERT_EMAIL_TO` so alerting steps actually fire; without them the workflow only uploads artifacts.
   - NOTE: Secrets still missing as of Nov 13; do not assume alerts are wired even if the workflow appears “green” in CI.

---

## Testing checklist for next agent

- [x] `pnpm lint` (Nov 13 00:30 UTC + again after latest CSS/section changes — clean)
- [x] `pnpm typecheck` (Nov 13 00:31 UTC + again after latest changes — clean)
- [x] `pnpm perf:audit` (Nov 13 03:00 UTC — FAIL: LCP 4.74 s / perf 67; reports path originally inconsistent but subsequent runs now save into `test-results/`)
- [x] `pnpm perf:audit` (Nov 13 15:18 UTC — FAIL: LCP 3.90 s / perf 87; reports in `test-results/lighthouse-mobile-2025-11-13T15-18-20-877Z.{json,html}`; confirms infra variance + main-thread costs remain the bottleneck)
- [x] `pnpm lcp:debug` (Nov 13 03:01 UTC — hero headline `<span>` at 1.22 s / 15.6 KB is still the candidate)
- [x] `BASE_URL=http://127.0.0.1:3000 pnpm playwright test tests/e2e/blog-navigation.spec.ts --project=chromium-desktop`
- [x] `BASE_URL=http://127.0.0.1:3300 ENABLE_TEST_ROUTES=true SKIP_WEBKIT=1 pnpm playwright test tests/e2e/accessibility-hero-mobile.spec.ts --project=chromium-mobile` (Nov 13 00:32 UTC — PASS after manually launching `pnpm start --hostname 127.0.0.1 --port 3300` and killing stale `next start` PIDs 4714/4715)
- [x] `BASE_URL=http://127.0.0.1:3300 ENABLE_TEST_ROUTES=true pnpm playwright test tests/e2e/accessibility-roadmap.spec.ts --project=chromium-desktop` (Nov 13 00:33 UTC — PASS off the same manual server)
- [ ] Manual Safari iOS + Android Chrome checks for comfort controls, immersive toggles, Voice Tour, Material Study
 - [ ] (Optional, but recommended) Add and run a small Playwright spec targeting the Living Manuscript “Focus view” dialog once focus-trap behavior is implemented.

---

## Notes for the incoming agent

- Always run `pnpm blog:generate` after editing markdown; Cloudflare Workers cannot read the filesystem. Note that even `pnpm start` triggers `verify:language-data` + `blog:generate`, so expect `lib/generated/blog-data.json` timestamps to churn.
- Prefer `pnpm run dev`/`pnpm preview` for local QA so our edge-specific behavior (proxy, analytics) matches production.
- Keep focus on meaningful progress: prioritize the mobile performance/a11y fixes before adding new sections.
- Before running `pnpm test:e2e` or any Playwright helpers, kill stray `next start` processes (`ps -ef | grep 'next start'`)—the helper script still hangs when port 3000 is occupied. Temporary workflow: `ENABLE_TEST_ROUTES=true pnpm start --hostname 127.0.0.1 --port 3300` in the background, then run Playwright with `BASE_URL=http://127.0.0.1:3300 …`, and kill the server (e.g., `kill -9 $(cat /tmp/next_server.pid)`) when finished.
 - Do **not** run the entire `pnpm test:e2e` suite from your dev shell unless you have a very specific reason; it is slow and not needed for minor CSS/layout tweaks. Prefer:
   - Targeted Lighthouse runs (`pnpm perf:audit`) only after meaningful perf-related changes (hero structure, heavy scripts, caching behavior).
   - Targeted Playwright runs for the specific area you just changed (e.g., hero mobile, language roadmap, blog navigation, Living Manuscript dialog once it exists).
 - Remember that global micro-interactions are now opt-in (`.btn-interactive`, `.haptic-feedback`). If you need the “lift” effect on a CTA, add the class explicitly instead of re-introducing global selectors.

## Execution guardrails for the next session

- **No low-signal work.** Only run Lighthouse/Playwright after meaningful code changes; otherwise keep iterating on the hero/mobile bottlenecks. Blog smoke + Plausible monitor already run nightly.
- **Hit the blockers in order:** (1) drop mobile LCP ≤ 2.5 s, (2) run the pending Safari/Android manual passes, (3) configure Slack/Resend secrets so the nightly workflow can alert us.
- **Cross-browser shakedown:** View Transitions + immersive toggles must be validated on Safari iOS 18 beta, Firefox Nightly, and Android Chrome, then summarize any deltas here.
- **Document unfinished threads.** If you stop mid-investigation (e.g., hero perf experiment, cross-browser bug), list the exact steps + URLs here before ending the session so the next agent can pick up instantly.

### Unfinished threads / ideas from the last session

- Mobile LCP is **still** above budget (~3.9 s on Lighthouse mobile). Frontend-only tweaks (content-visibility, CSS scoping) helped structurally but did not move the needle enough. Next agent should assume infra (Cloudflare/OpenNext cold starts, cache config) plus hero complexity both need attention; don’t treat perf as “basically done.”
- The Living Manuscript “Focus view” dialog is implemented and stable but lacks:
  - A proper focus trap.
  - Returning focus to the “Focus view” launcher on close.
  - Any automated a11y e2e coverage. This is a good, **small** next feature to finish.
- Background “scene” system:
  - `TempleNav` + `HeroCivilizationCarousel` now drive `data-scene` on `<html>` to re-weight Egypt/Greece/Rome background layers via CSS.
  - This is visually strong and light on CPU, but keep in mind it’s another global state knob on `<html>`. If you change sections/IDs, also update `NAV_SECTIONS` in `TempleNav` or you’ll desync the scene mapping.
- Global button/link micro-interactions:
  - Previously global; now opt-in. CTAs currently rely on their own component-level classes; nothing breaks. If you want the old “lift on hover” for specific CTAs, add `btn-interactive` class where appropriate instead of reverting the global selector.
- Test strategy:
  - Full `pnpm test:e2e` is expensive and was attempted but aborted due to time. Don’t assume the whole suite passes right now; rely on the explicit checkboxes above and add new targeted specs as you introduce new behaviors (e.g., manuscript focus dialog).
