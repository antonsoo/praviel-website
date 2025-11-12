<div align="center">

# PRAVIEL Website

### The marketing site for humanity's conversation across millennia

**Learn 46 ancient languages with modern AI and scholarly rigor**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-orange?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Node.js](https://img.shields.io/badge/Node.js-25+-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Website](https://praviel.com) • [Discord](https://discord.gg/fMkF4Yza6B) • [Main Repo](https://github.com/antonsoo/praviel) • [Support the Project](#-support-the-project)

</div>

---

## What's This?

Reading translations is like watching a movie described over the phone—you get the plot, but miss the soul.

**PRAVIEL** teaches you to read Homer, Plato, and the *Bhagavad-Gītā* as they were written. From Sumerian cuneiform (3100 BCE) to medieval manuscripts (1200 CE), we're making 46 ancient languages accessible through modern AI while maintaining research-grade accuracy.

This repo is the **marketing website**. For the main platform (Python/FastAPI + Flutter), see [antonsoo/praviel](https://github.com/antonsoo/praviel).

---

## What's Inside

- 🏛️ **Ancient civilization theme** anchored in Egyptian gold + lapis gradients with pure-CSS noise (no client canvas).
- 🧠 **Server-rendered hero + Suspense gating** so the critical copy streams instantly while heavy demos hydrate only on user intent.
- 🌍 **Interactive language showcase** featuring the 46-language roadmap with authentic samples and writing-system notes.
- 🪨 **Material study lab** that lets visitors flip between papyrus, marble, and mosaic palettes to see how the design language adapts per civilization.
- 📚 **Lessons + Reader demos** powered by canonical excerpts (Iliad 1.1, Torah, etc.) and deterministic fixtures for testing.
- 🗺️ **How It Works** 4-step journey plus comparison table that explain the neuro-symbolic stack to prospective funders.
- ❓ **Comprehensive FAQ** covering licensing, pedagogy, BYOK deployments, and school partnerships.
- ⚡ **Adaptive enhancements** (Lenis, overlays, scroll progress) that respect Save-Data, coarse pointers, and idle time.
- ♿ **WCAG 2.1 AA** with skip links, 44px targets, RTL fonts, reduced-motion fallbacks, and semantic nav.
- 🔤 **Self-hosted Noto stack** (Latin, Greek, Devanagari, Hebrew, CJK) managed via `next/font/local` for deterministic LCP.
- 🎚️ **Comfort controls + Immersive mode** that sync via `localStorage`, set `data-*` attributes before hydration, and respect `prefers-reduced-motion` / Save-Data across tabs.
- 🔍 **SEO + Analytics ready**: JSON-LD structured data, Sentry + `/api/observability/vitals` pipeline, Cloudflare Analytics hook.
- 📰 **Field Reports pipeline** powered by Markdown in `/content/blog`, `pnpm blog:generate`, and a server-side JSON cache so Cloudflare Workers never touch the filesystem.
- 🌐 **Edge-deployed** on Cloudflare Workers through OpenNext with automated cache purges.
- 📰 **Field reports spotlight** pulls the three latest blog essays directly into the homepage with papyrus-styled cards and announces new dispatches without leaving hero context.
- 🌀 **Native View Transitions** (via `next-view-transitions`) keep blog list/detail navigation seamless while respecting reduced-motion and immersive-preference settings.

---

## Tech Stack

Built with cutting-edge 2025 tech (yes, this stuff exists now):

**Frontend:** Next.js 16.0.1 • React 19.2.0 • TypeScript 5.9.3 • Tailwind v4.1.16
**Animation:** Motion 12.23.24 (React 19 compatible) • Canvas API • Lenis smooth scroll
**Deploy:** Cloudflare Workers • OpenNext • Node.js 25+
**Tooling:** Turbopack • React Compiler 1.0 • ESLint 9.39.1 flat config • pnpm 10.20.0

> **Note:** This isn't "let's use the latest alpha versions." These are stable releases from late 2025. If your Node version is lower than 25, you need to upgrade—it's not a typo.

---

## Quick Start

**Requirements:** Node.js 25+ and pnpm

```bash
# Clone and install
git clone https://github.com/antonsoo/praviel-website.git
cd praviel-website
pnpm install

# Start dev server
pnpm dev  # → http://localhost:3000
```

**Common commands:**
```bash
pnpm dev         # Standard Next.js dev server
pnpm preview     # Local Cloudflare Workers preview
pnpm build       # Production build
pnpm typecheck   # TypeScript validation
pnpm lint        # ESLint check
pnpm blog:generate  # Rebuilds lib/generated/blog-data.json after editing markdown
pnpm with-release <cmd>  # Inject release metadata + env for build tooling
pnpm sentry:smoke        # Sends a test event using the env vars in .dev.vars
```

## Quality & Observability

- `pnpm test:e2e` exercises the marketing demos, typography harness, waitlist form, and mobile safeguards with `ENABLE_TEST_ROUTES=true`.
- `pnpm perf:audit` wraps Lighthouse (`scripts/lighthouse.ts`) to ensure LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 across mobile/desktop. It writes both JSON + HTML reports to `test-results/`, and you can point it at a preview with `AUDIT_URL=https://your-preview-url`. Running against the deployed Worker is recommended so Chrome doesn’t block localhost with interstitials.
- `.github/workflows/quality.yml` runs lint → typecheck → Playwright → Lighthouse on every push/PR, caches Chrome for Testing, and uploads the HTML/JSON reports.
- `/app/reportWebVitals.ts` posts browser-side metrics into `/api/observability/vitals`, which logs the payload (path, element descriptor, snippet, nav type) to Sentry for cohort analysis.
- `docs/CRITICAL_TO-DOs.md` tracks the live Core Web Vitals status plus any gating work before we can publish an external perf report.

---

## Deployment

We use **[OpenNext](https://opennext.js.org/)** to deploy Next.js on Cloudflare Workers.

```bash
pnpm preview  # Local Cloudflare Workers preview
pnpm deploy   # Deploy to production
pnpm upload   # Gradual rollout
```

You'll need Cloudflare credentials configured in `wrangler.jsonc`. Secrets go via `pnpm wrangler secret put <KEY_NAME>`.

### Cache Invalidation

**Important:** After deployment, Cloudflare may serve cached content. If you see old content after a successful deployment:

**Option 1 - Cloudflare Dashboard:**
1. Go to Cloudflare Dashboard → Caching
2. Click "Purge Everything"

**Option 2 - API (Automated):**
```bash
# Set environment variables (get Zone ID from Cloudflare dashboard)
export CLOUDFLARE_API_TOKEN="your_token"
export CLOUDFLARE_ZONE_ID="your_zone_id"

# Run purge script
./scripts/purge-cloudflare-cache.sh
```

Cache typically updates within 1-2 minutes globally after purging.

---

## Project Structure

```
app/            # Next.js App Router pages & layouts
├── api/        # API routes (health checks, music playlist)
components/     # React components (38 components)
├── Informational sections (HowItWorks, FAQ, ComparisonTable, InteractiveDemo)
├── Ancient theme components (LanguageShowcase, TractionBar, WhyPRAVIEL, etc.)
├── Three.js scene (AncientBackground)
├── UI components (SiteHeader, Footer, PrimaryCTA, SecondaryCTAs)
lib/            # Utilities & database client (Drizzle ORM + Neon)
├── fonts.ts    # next/font/google configuration (optimized loading)
├── languageData.ts  # TypeScript language data structures
├── hooks/      # Custom React hooks (useScrollReveal, etc.)
public/         # Static assets (images, music)
docs/           # Documentation
├── archive/    # Archived/outdated files (gitignored)
.github/        # GitHub Actions workflows (auto-deploy to Cloudflare)
```

Standard Next.js 16 App Router structure with Cloudflare Workers optimizations.

---

---
## Environment Variables

**Public vars** (prefixed `NEXT_PUBLIC_`) are safe to commit. **Secrets** go in `.env.local` locally and Cloudflare Wrangler for production (`pnpm wrangler secret put <KEY_NAME>`). Key observability variables:

| Variable | Purpose |
| --- | --- |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | Client + server crash/error reporting |
| `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` | Required for CI releases + guardrails |
| `SENTRY_ENVIRONMENT` | Defaults to `production`, override for preview/dev |
| `SENTRY_TRACES_SAMPLE_RATE`, `SENTRY_REPLAYS_SESSION_SAMPLE_RATE` | Control tracing + replay sampling |
| `SKIP_OBSERVABILITY_CHECK` | Set to `"true"` in CI to skip Sentry validation (when secrets unavailable) |

**Note:** `pnpm build`, `pnpm deploy`, and `pnpm upload` now run `scripts/check-observability.ts` and `scripts/with-release.ts` so production builds fail fast when Sentry secrets are missing and every deploy is tied to a deterministic release identifier.

See `lib/env.ts` for the full list. Don't commit secrets. Rotate them if you do.

---

## Contributing

Pull requests welcome! Fork, create a feature branch, make sure `pnpm typecheck` and `pnpm lint` pass, then PR.

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`

Don't commit secrets. Clean up your console.logs. Read [CLAUDE.md](CLAUDE.md) for the full developer guide.

---

## 💝 Support the Project

Building infrastructure to preserve 5,000 years of linguistic heritage isn't cheap. Your support helps us:

- Keep the platform free and open source
- Add more ancient languages (46 and counting)
- Maintain research-grade accuracy with scholarly sources
- Host and serve content to learners worldwide

**Support via:**

<div align="center">

[![GitHub Sponsors](https://img.shields.io/badge/GitHub-Sponsors-pink?logo=github&logoColor=white)](https://github.com/sponsors/antonsoo)
[![Patreon](https://img.shields.io/badge/Patreon-Support-orange?logo=patreon&logoColor=white)](https://patreon.com/PRAVIEL)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Buy_a_Coffee-blue?logo=ko-fi&logoColor=white)](https://ko-fi.com/PRAVIEL)

[**One-time via Stripe**](https://buy.stripe.com/6oU8wOfCe7ccbhefx0ew800) • [**PayPal**](https://www.paypal.com/ncp/payment/PY77DTBNL5D88)

</div>

Every contribution—no matter the size—helps preserve humanity's conversation across millennia. You'll also get early access to new features and a warm fuzzy feeling.

---

## License & Links

**License:** MIT (see [LICENSE](LICENSE))
**Website:** [praviel.com](https://praviel.com)
**Main Repo:** [github.com/antonsoo/praviel](https://github.com/antonsoo/praviel)
**Discord:** [discord.gg/fMkF4Yza6B](https://discord.gg/fMkF4Yza6B)

**Docs:** [CLAUDE.md](CLAUDE.md) • [AGENTS.md](AGENTS.md)

---

<div align="center">

*"History is the witness of time, the light of truth, the life of memory."*
— Cicero

Made with ❤️ for everyone who believes the past matters

[⬆ Back to Top](#praviel-website)

</div>
