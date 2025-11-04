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

- 🏛️ **Ancient civilization theme** with Egyptian Gold (#D4AF37), Lapis Lazuli Blue, and papyrus textures
- 🌍 **Interactive language showcase** featuring Latin, Classical Greek, Biblical Hebrew, Sanskrit, and Middle Egyptian
- 🎨 **Three.js hero scene** with shader animations and GPU-accelerated canvas backgrounds
- 📚 **Interactive demo** showing morphological analysis on authentic Greek text (Iliad 1.1)
- 🗺️ **How It Works** 4-step learning journey visualization
- 📊 **Comparison table** showing PRAVIEL vs traditional methods and language apps
- ❓ **Comprehensive FAQ** with 10 Q&As addressing common questions
- ⚡ **Buttery smooth scrolling** (Lenis) with 60fps on all devices
- 🎭 **Motion animations** following 2025 best practices (GPU-only transforms, Intersection Observer)
- ♿ **WCAG 2.1 AA accessible** with 44x44px touch targets, skip links, ARIA labels, and reduced motion support
- 🔤 **Optimized font loading** with next/font/google (self-hosted, subsetting for Latin, Greek, Devanagari, Hebrew)
- 🔍 **SEO optimized** with JSON-LD structured data for educational content
- 📱 **Actually responsive** with mobile-first design (tested on real devices, not just DevTools)
- 🌐 **Edge-deployed** on Cloudflare Workers for global low-latency
- 💝 **Free-first messaging** emphasizing donor-supported business model and zero barriers

---

## Tech Stack

Built with cutting-edge 2025 tech (yes, this stuff exists now):

**Frontend:** Next.js 16.0.1 • React 19.2.0 • TypeScript 5.9.3 • Tailwind v4.1.16
**Animation:** Motion 12.23.24 (React 19 compatible) • Three.js 0.181.0 • React Three Fiber
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
```

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
components/     # React components (41+ components)
├── Informational sections (HowItWorks, FAQ, ComparisonTable, InteractiveDemo)
├── Ancient theme components (LanguageShowcase, TractionBar, WhyPRAVIEL, etc.)
├── Three.js scenes (HeroScene, AncientBackground)
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

## Environment Variables

**Public vars** (prefixed `NEXT_PUBLIC_`) are safe to commit. **Secrets** go in `.dev.vars` locally and Cloudflare Wrangler for production (`pnpm wrangler secret put`).

See `wrangler.jsonc` for the full list. Don't commit secrets. Rotate them if you do.

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
[![Patreon](https://img.shields.io/badge/Patreon-Support-orange?logo=patreon&logoColor=white)](https://patreon.com/AntonSoloviev)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Buy_a_Coffee-blue?logo=ko-fi&logoColor=white)](https://ko-fi.com/antonsoloviev)

[**One-time via Stripe**](https://buy.stripe.com/6oU8wOfCe7ccbhefx0ew800) • [**PayPal**](https://paypal.me/AntonS0)

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