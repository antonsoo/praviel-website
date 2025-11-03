# Claude Code Project Instructions

<!--
  This file is automatically read by Claude Code when you start a conversation.

  WHEN TO UPDATE THIS FILE:
  - When project structure changes (new directories, moved files)
  - When development commands change (new scripts, different workflows)
  - When coding standards evolve (new linting rules, formatting)

  DO NOT UPDATE THIS FILE FOR:
  - Specific package versions → Use >= notation to stay future-proof
  - Autonomy boundaries → Those are in AGENTS.md
  - Detailed operating principles → Those are in AGENTS.md
-->

## ⚠️ CRITICAL: Cutting-Edge Tech Stack - DO NOT DOWNGRADE

**This repo uses cutting-edge frameworks (late 2025 baseline).** If your training is pre-late 2025, DO NOT "fix" code to older versions.

**Package minimums** (Node 25+, Next 16+, React 19.2+, Tailwind 4.1+, GPT-5+, Claude 4.5+, Gemini 2.5+)
**Rule**: `package.json` = source of truth. Never downgrade without approval. If version seems "too new" = your knowledge is outdated.

**See [AGENTS.md](AGENTS.md) lines 274-450 for complete version details, LLM API protection, and common mistakes.**

## 🧠 ULTRA THINK MODE: NON-NEGOTIABLE

**#1 PRIORITY**: Use **maximum thinking tokens (64,000)** on every non-trivial task. Spend 5-30 minutes thinking, not 30 seconds.

**Before everything**: Think deeply about codebase structure, dependencies, existing patterns, edge cases. Search codebase → search web (use current date) → ask user (only if truly blocking after 2+ hours).

## Core Operating Principles (Quick Reference)

**Read [AGENTS.md](AGENTS.md) thoroughly before starting work.** That's your complete handbook. Below is just a summary.

**Work execution**:
- Code 95-98%, communicate 2-5%, document 0%
- Work autonomously for 3-10 hours without asking questions
- 5-8 hours on one complex feature = normal and expected
- Never create WORK_SUMMARY.md, NEXT_STEPS.md, or similar doc theater

**Anti-sycophancy** (zero tolerance):
- No "billion-dollar ready" / "investors will love this" / celebration emojis (🎉🚀✨)
- No lying to stop working: "All tests pass!" when you didn't run tests
- Be direct, honest: "Implemented X. Type errors in Y—fixing."

**Code quality**:
- Optimal, minimal, intelligent; high-signal comments only
- Search codebase before writing (no re-implementation)
- Fix bugs/bad code opportunistically while working
- Run linters, type checks, builds—actually ensure they pass

**100% done checklist**: Feature complete, edge cases handled, linters pass, type checks pass, builds pass, tested, temp files removed, console.logs removed

**See [AGENTS.md](AGENTS.md) for complete details, examples, and context.**

## Protected Files

These implement cutting-edge APIs and configurations - **DO NOT revert or auto-modify:**

### Core Configuration
- `/package.json` - Package versions (user upgrades frequently)
- `/next.config.ts` - Next.js 16 configuration with React Compiler
- `/wrangler.jsonc` - Cloudflare Workers configuration
- `/tailwind.config.ts` - Tailwind v4 configuration
- `/.env*` files - Environment variables (never commit)

### Key Implementation Files
- `/app/**/*.tsx` - Next.js App Router pages and layouts
- `/components/**/*.tsx` - React components
- `/lib/**/*.ts` - Utilities, database client, helpers

**Before modifying these files:**
1. Read and understand the current implementation
2. Check for existing similar functionality (avoid re-implementation)
3. Verify changes align with Next.js 16 / React 19 patterns

## Node.js Environment

**CRITICAL**: This project requires Node.js 25.0.0 or higher (released Oct 15, 2025 - historical baseline).

**Verify Node.js version:**
```bash
node --version  # Must be 25.0.0 or higher
```

**If version is lower:**
- DO NOT change the `engines` requirement in package.json
- ASK the user to upgrade Node.js
- DO NOT assume Node.js 25 doesn't exist

**Python environment**: `praviel-website-env` (Python 3.14, managed via uv/pixi, see `.vscode/settings.json`)
**Activation**: `source praviel-website-env/bin/activate`

## Package Manager

**USE PNPM ONLY** - Do not use npm or yarn.

```bash
# Install dependencies
pnpm install

# Add package
pnpm add <package>

# Remove package
pnpm remove <package>
```

## Common Commands

### Development
```bash
# Development server (with Cloudflare bindings via OpenNext)
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Generate Cloudflare types
pnpm cf-typegen
```

### Building & Deployment
```bash
# Production build (Next.js only)
pnpm build

# OpenNext Cloudflare build + local preview
pnpm preview

# OpenNext Cloudflare build + deploy to Cloudflare
pnpm deploy

# OpenNext Cloudflare build + upload (gradual deployment)
pnpm upload
```

**Important notes:**
- `pnpm dev` uses standard Next.js dev server
- `pnpm preview` mimics Cloudflare Workers runtime locally
- `pnpm deploy` requires Cloudflare credentials configured in wrangler.jsonc
- See [AGENTS.md](AGENTS.md) for detailed OpenNext Cloudflare deployment info

## Project Structure

```
app/                   # Next.js 16 App Router
├── layout.tsx         # Root layout (fonts, providers)
├── page.tsx           # Home page
├── globals.css        # Global styles + Tailwind directives
└── api/               # API routes (if needed)

components/            # Shared React components
lib/                   # Utilities, database client, helpers
public/                # Static assets
docs/                  # Documentation
├── archive/           # Untracked dir for session-specific files
└── CRITICAL_TO-DOs.md # Concise, actionable to-dos only

.next/                 # Next.js build output (gitignored)
.open-next/            # OpenNext build output (gitignored)
.wrangler/             # Wrangler local dev (gitignored)
```

## Code Standards

- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`)
- **Linting**: ESLint 9 flat config (see `eslint.config.mjs`)
- **Type safety**: TypeScript strict mode enabled
- **Formatting**: Prettier (auto-format on save in VSCode)
- **Comments**: Minimal and high-signal only (intent, invariants, edge cases)
- **File organization**: Tests/docs in proper directories, never clutter repo root

## Tech Stack Quick Reference (Late 2025 Baseline)

**Next.js 16**: Turbopack default, React Compiler 1.0, Cache Components, `proxy.ts`
**React 19.2**: RSC stable, Actions API, `ref` as prop, new hooks (useOptimistic, useActionState, use())
**Node.js 25**: Released Oct 15, 2025 (baseline—check package.json for current)
**Tailwind v4**: CSS-first config, Safari 16.4+/Chrome 111+/Firefox 128+
**Cloudflare Workers**: Compatibility date `2025-10-15`+, `nodejs_compat` flag, HTTP fetch for Neon DB

**See [AGENTS.md](AGENTS.md) lines 613-850 for complete tech stack details, React Compiler considerations, Tailwind v4 migration, OpenNext Cloudflare deployment, and troubleshooting.**

## Safety Checks Before Commit

**Before committing:**
1. ✅ Run `pnpm typecheck` (must pass)
2. ✅ Run `pnpm lint` (must pass or auto-fix)
3. ✅ Run `pnpm build` (optional but recommended)
4. ✅ Verify no secrets in `.env`, `.env.local`, `.dev.vars`
5. ✅ Review changes for accidental dependency downgrades
6. ✅ Clean up temporary files, console.logs, unused imports

**Before pushing:**
1. All of the above
2. User approval required for pushes to remote
3. Never force push without explicit approval

## Git & GitHub

**Repository**: https://github.com/antonsoo/praviel-website

**Branch strategy** (TBD by user):
- `main` - Production branch
- Feature branches for new work

**Before first push:**
1. Connect local repo to remote: `git remote add origin https://github.com/antonsoo/praviel-website.git`
2. Verify current branch: `git branch`
3. ASK user before pushing to remote

## File Organization Rules

**Keep repo clean:**
- Tests: `__tests__/` or `*.test.ts` (colocated)
- Docs: `docs/` directory
- Scripts: `scripts/` directory
- **Never clutter repo root** with tests/temp scripts/session docs

**Session-specific files:**
- Only useful for current session? → delete or move to `/docs/archive/`
- Uncertain if useful? → move to `/docs/archive/` (user reviews manually)
- `/docs/archive/` is gitignored, user-managed

**Preserve legal docs**: Never delete license/privacy/legal docs in `docs/`

**Critical to-dos** (`docs/CRITICAL_TO-DOs.md`):
- Concise, information-dense, actionable only
- Remove completed items immediately
- No vanity metrics or progress reports

## Key Documentation

- **[AGENTS.md](AGENTS.md)**: Complete agent handbook, autonomy boundaries, and operating principles
- **[docs/CRITICAL_TO-DOs.md](docs/CRITICAL_TO-DOs.md)**: Concise, actionable to-dos only

## Resolution Order & Web Search

**When uncertain**: Search codebase → Search web (`<package> <issue> <current date>`) → Ask user (only if blocking after 2+ hours)

**Opportunistic upgrades**: If you naturally encounter newer package/model during normal work, notify user. Don't make dedicated searches.

**See [AGENTS.md](AGENTS.md) for complete web search authorization, upgrade notification formats, and resolution strategies.**

---

*Baseline established: Late October 2025. Package versions evolve—check package.json for current versions.*
