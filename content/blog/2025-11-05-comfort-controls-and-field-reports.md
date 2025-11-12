---
title: "Comfort Controls, Field Reports, and the Blog Pipeline"
author: "Anton Soloviev"
date: "2025-11-04"
publishDate: "2025-11-05"
excerpt: "We rebuilt the marketing blog pipeline so Field Reports mirror production content, added comfort controls that sync across tabs, and hardened the Plausible proxy."
tags:
  - product updates
  - accessibility
  - analytics
---

## The problem we were solving

The homepage spotlight pulled placeholder essays, the blog list only had a single article, and the comfort toggles were vaporware. Investors kept asking how accessibility modes behaved on mobile, and we didn’t have a credible demo. Time to fix that.

## Making the blog trustworthy again

- Markdown lives under `content/blog/` with canonical filenames (`YYYY-MM-DD-slug.md`).
- `pnpm blog:generate` runs before every dev, build, preview, and deploy command. It parses the Markdown with `remark`, computes reading time, and drops JSON into `lib/generated/blog-data.json` so Cloudflare Workers never need filesystem access.
- `lib/blog.ts` now sorts everything by `publishDate`, so the homepage Field Reports always show the three latest essays.
- We added `tests/e2e/blog-navigation.spec.ts` to make sure `/blog` and `/blog/[slug]` never regress once View Transitions are enabled.

## Comfort controls that actually do something

The new comfort panel lets readers toggle **type scale**, **contrast**, and **body font**. Preferences sync across tabs via a `window` event, persist in `localStorage`, and drive data attributes (`data-type-scale`, `data-contrast`, `data-body-font`) on the `<html>` element. The layout code now bootstraps those attributes before hydration, so there’s no flash of unstyled text.

## Analytics that respect users

We proxy Plausible through `/api/proxy` routes, add cache headers to the script, and even run a nightly synthetic monitor (`pnpm monitor:plausible`). The marketing site never loads third-party trackers directly, and the proxy honors `prefers-reduced-motion` just like the rest of the UI.

## What this unlocks

- Field Reports on the homepage are now canonical marketing essays.
- Comfort settings persist when readers hop between `/` and `/blog`.
- Nightly automation catches blog regressions, Plausible outages, and Lighthouse drifts before prospective partners do.

If you want something covered in a future Field Report—deployment stories, pedagogy deep dives, or database design—reply to the waitlist email. We’re listening.
