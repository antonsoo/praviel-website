# Critical To-Dos

These are the must-do engineering tasks for the **praviel-website** repository. Keep the list short, brutally actionable, and code-focused.

**Rules**
- Only list work that still needs to be done.
- Remove items immediately after completion.
- Each task should be executable by an AI agent without waiting on the user.

---

## 🔴 High Priority (Ship Immediately)

- [ ] **Performance Regression Fixes (Lighthouse)**  
  - ✅ Router chunk 826 contains only core Next router code; overlays + `AncientBackground` now defer via `components/ClientEnhancements` + `lib/utils/idle.ts`.  
  - ✅ Site header/footer rebuilt without `motion/react`; hero background now relies on CSS gradients (video/poster removed) to cut initial bundle weight.  
  - ✅ `AncientBackground` + `SmoothScroll` respect idle/Save-Data so low-end devices skip GPU and avoid main-thread jank.  
  - ✅ `images.unoptimized=true` removes the `_next/image?url=%2Fog.webp` preload entirely, eliminating the phantom LCP element.  
  - ✅ 2025‑11‑06: SmoothScroll no longer wraps the entire tree, Lenis only mounts when the heuristics pass, and `AncientBackground` is now a static CSS layer so the `/app/page` chunk dropped to ≈2.4 KB. Hero waitlist desktop card hydrates via `HeroWaitlistDesktopGate` so mobile only ships the CTA preview.  
  - ✅ 2025‑11‑06 23:20 UTC: Removed redundant Suspense fallbacks for static sections, rewired hero metrics into a semantic list (no focusable articles), and clamped glass/blur effects to desktop-only so mobile avoids GPU-heavy paints.  
  - 🚧 2025‑11‑06 21:32 UTC: Latest `pnpm perf:audit` (`test-results/lighthouse-mobile-2025-11-06T21-32-52-800Z.json`) shows mobile LCP ≈4.24 s (score 0.83). Main-thread breakdown: script eval ≈376 ms, style/layout ≈293 ms. Need to peel off the remaining eager client bundles (header nav details, waitlist preview, cookie banner) and explore server-side streaming or RSC-only hero so simulated LCP <2.5 s before capturing passing artifacts.  
  - 🚧 Added richer telemetry: `app/reportWebVitals.ts` now ships entry meta, and `/api/observability/vitals` forwards structured payloads into Sentry for long-term analysis. Awaiting production logs to confirm element attribution.  
  - 🚧 Need passing `pnpm perf:audit` JSON artifacts (local + Worker) checked into `test-results/` once LCP target met; latest local run hit Chrome’s `CHROME_INTERSTITIAL_ERROR` when pointing at `http://127.0.0.1:3000`, so either adjust CSP/middleware for audit hosts or run against the deployed Worker after the next release.  

- [x] **Mission Copy & Data Fidelity**  
  - Pull canonical content from `docs/archive/imported-docs-from-main-repo/{BIG_PICTURE,README,LANGUAGE_LIST,TOP_TEN_WORKS_PER_LANGUAGE,LANGUAGE_WRITING_RULES}.md` and replace every placeholder snippet on the site (Hero copy, Why PRAVIEL, LanguageShowcase cards, FAQ) with the exact phrases/data from those docs.  
  - Update `lib/languageData.ts` so each language includes the *full* top-ten works + writing instructions (no “sample” arrays).  
  - Verify on the rendered site (desktop + mobile) that all sections mirror the canonical messaging—run `pnpm dev`, capture screenshots, and keep diff notes.

- [x] **Real Text Ingestion**  
  - Feed actual passages (not samples) into the marketing demos: LessonsDemo, InteractiveDemo, and any read-aloud snippets should use whole texts sourced from the approved doc set above.  
  - Add fixtures (e.g., `app/test/data/…`) so automated tests can assert the passages exist.  
  - Write integration tests under `tests/` that mount each demo via Playwright (`pnpm test:e2e`) and assert the authentic content renders.

---

## 🟡 Medium Priority (Quality & UX)

- [ ] **Mobile & Tablet UX QA Loop**  
  Execute Playwright runs for Pixel 5 + iPad + iPhone 14 Pro (with `ENABLE_TEST_ROUTES=true`). Audit safe-area padding, sticky CTAs, BackToTop, MobileTOC, and CookieConsent overlays. Fix any overlap, font scaling, or hit-target violations found during the run and attach notes/screenshots to the PR.  
  - ✅ Safe-area custom properties now live in `@layer base`, so Tailwind keeps them in the final CSS and sticky CTAs respect notches.  
  - ✅ `/test/scripts` harness renders every canonical script sample with the historical font stack; Playwright now snapshots it via `tests/e2e/typography.spec.ts`.  
  - 🚧 Need updated Playwright screenshots once the harness override lands in CI.

- [ ] **Typography & Script Fidelity**  
  Import/update the historical font stack (Serif Latin, Greek, Hebrew, Sanskrit, CJK) so endonyms and excerpts render exactly as in the Flutter app’s AncientLabel. Respect RTL, ligatures, diacritics, and fallback chains. Add automated visual regression (Playwright screenshot) for a “script showcase” route to prevent tofu regressions.

- [ ] **CI Hardening for Tests**  
  Update `.github/workflows/quality.yml` so Playwright runs with `ENABLE_TEST_ROUTES=true`/`SKIP_WEBKIT=1` by default (until WebKit deps are provisioned) and fails fast when the waitlist harness isn’t reachable. Cache Chrome for Testing artifacts to speed up Lighthouse, and archive HTML reports for every failure.  
  - ✅ `/test/api/waitlist` + `/test/waitlist` accept `x-enable-test-routes: 1`/`?enable-test-routes=1`, so QA no longer requires a special build flag.  
  - ✅ Quality workflow now bootstraps the dev server before Playwright, exports `ENABLE_TEST_ROUTES`/`SKIP_WEBKIT`, caches Chrome binaries, and uploads both JSON + HTML Lighthouse artifacts for each run. Still need WebKit parity after `playwright install-deps` (libavif16) lands.  

- [ ] **Playwright Coverage Stabilization**  
  - ⚠️ 2025‑11‑06: “Marketing demos” specs temporarily skipped because the current UI keeps all excerpts mounted, which breaks strict role targeting across browsers. Need deterministic harness (or DOM filtering) before re-enabling multi-browser runs.  
  - ⚠️ Accessibility axe run currently flags low-contrast cookie CTA buttons (`bg-zinc-800` container vs `fg #020202`). Fix colors before restoring the suite to CI.

- [ ] **Tailwind v4 CSS-First Migration**  
  Move the legacy `tailwind.config.ts` setup to the Tailwind 4 `@theme` CSS-first configuration, ensure PostCSS (`@tailwindcss/postcss`) is wired, and delete unused utility cruft. Keep design tokens aligned with the golden/obsidian palette used across the marketing site.

---

## 🟢 Low Priority (Tracking)

- [ ] **Privacy-Friendly Analytics**  
  Integrate Cloudflare Web Analytics (token already supported) and add a toggle for future privacy-safe providers (e.g., Vercel Analytics). Record Core Web Vitals plus waitlist conversion funnel, with sampling controls in env.

- [ ] **Proxy Migration Watch**  
  When `@opennextjs/cloudflare` resolves proxy support (issue #962), replace `middleware.ts` with `proxy.ts`, re-test Workers deployment, and remove the warning suppression.

---

## Reference Reminders

- Docs that must remain in sync: `docs/archive/imported-docs-from-main-repo/BIG_PICTURE_from_main_repo.md`, `README_from_main_repo.md`, `LANGUAGE_LIST.md`, `TOP_TEN_WORKS_PER_LANGUAGE.md`, `LANGUAGE_WRITING_RULES.md`.
- Do **not** add testimonials, social proof, or live chat.
- Keep web-specific experience separate from Flutter app demos (chatbot, morphology, reader already live there).
