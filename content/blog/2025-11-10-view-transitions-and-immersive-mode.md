---
title: "Torchlight Transitions: Shipping Immersive Motion Without Breaking LCP"
author: "Anton Soloviev"
date: "2025-11-09"
publishDate: "2025-11-10"
excerpt: "View Transitions, immersive cursor effects, and comfort controls now ship on praviel.com without exceeding our 2.5 s mobile LCP budget. Here’s how we balanced spectacle with rigor."
tags:
  - performance
  - accessibility
  - design systems
  - view transitions
---

## Why we touched motion at all

Readers spend most of their time in text-heavy layouts, but the hero and Field Reports sections need to feel like curated exhibits. Native [View Transitions](https://nextjs.org/docs/app/building-your-application/optimizing/view-transitions) finally stabilized in Next.js 16, so we leaned on them for the blog list/detail flow and for the hero CTA states. The goals were simple:

1. Keep largest-contentful-paint (LCP) under 2.5 s on a throttled Pixel 5.
2. Respect `prefers-reduced-motion`, `Save-Data`, and our new Immersive Mode toggle.
3. Never require a Canvas layer or custom shader just to impress investors.

## Layering immersive effects responsibly

We now lazy-load a bundle that contains the torch cursor, volumetric fog, film grain, and cursor glow. That bundle only hydrates if **all** of these are true:

- The visitor scrolls at least 120 px or interacts with the page.
- Functional cookies are allowed (we store the preference locally and mirror across tabs).
- Hardware isn’t flagged as low-power (`hardwareConcurrency <= 4`, `prefers-reduced-motion`, or `Save-Data`).

If any check fails, we stop at static gradients. The new Immersive Mode toggle simply overrides those heuristics, and the setting is synced via `localStorage` so your choice persists across visits.

## View Transitions on the blog

The blog list now wraps each card in a `viewTransitionName`. When you click a Field Report, the title, date stamp, and card shell morph into their detail counterparts. Because the content is prerendered via `cacheComponents`, the state swap stays instant even on edge deployments. We also added a Playwright regression (`tests/e2e/blog-navigation.spec.ts`) that ensures `/blog` never flashes a 404 while transitions are in flight.

## LCP guardrails we put in place

- The hero’s heading is visible on mobile again, which keeps the candidate lightweight text rather than a decorative poster.
- Mobile hero CTAs sit below the copy, trim 20% of their height, and ship with `data-lcp-target` markers so our `pnpm lcp:debug` script can surface them quickly.
- Background columns, constellations, and ticker animations all disable automatically on small viewports or when Immersive Mode is set to “Minimal.”

Early throttled runs show mobile LCP hovering around **2.2 s** with INP at **118 ms**. We still need to re-run the five-pass Lighthouse suite before publishing the numbers, but the hero is no longer the bottleneck.

## What’s next

The next round is all about **consistency**: ensuring Safari’s partial View Transitions support degrades cleanly, validating the tactile cursor on Android 15 Beta, and wiring the nightly workflow so Plausible proxy, blog navigation, and Lighthouse audits happen automatically at 06:30 UTC. If you spot a regression, ping `anton@praviel.com`—we ship fast, but we ship with receipts.
