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

- 🎨 **Three.js hero scene** with shader animations
- ⚡ **Buttery smooth scrolling** (Lenis)
- 🎭 **Motion animations** that don't suck
- 📱 **Actually responsive** (we tested on real devices)
- 🌍 **Edge-deployed** on Cloudflare Workers

---

## Tech Stack

Built with cutting-edge 2025 tech (yes, this stuff exists now):

**Frontend:** Next.js 16 • React 19.2 • TypeScript 5.9 • Tailwind v4
**Animation:** Motion (Framer successor) • Three.js • React Three Fiber
**Deploy:** Cloudflare Workers • OpenNext • Node.js 25+
**Tooling:** Turbopack • React Compiler • ESLint 9 flat config

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

---

## Project Structure

```
app/            # Next.js App Router pages
components/     # React components
lib/            # Utilities
public/         # Static assets
docs/           # Documentation
.github/        # GitHub config (funding, etc.)
```

Standard Next.js 16 structure. If you've used Next before, you know where everything is.

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