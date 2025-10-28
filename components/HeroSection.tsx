"use client";

import dynamic from "next/dynamic";
import WaitlistForm from "./WaitlistForm";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.2)_0%,rgba(0,0,0,0)_70%)]" />
  ),
});

export default function HeroSection() {
  return (
    <section className="relative isolate px-6 py-24 sm:py-32 md:py-40 lg:py-48">
      <HeroScene />
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-violet-200/90 ring-1 ring-violet-500/40 backdrop-blur">
          <span>Alpha</span>
          <span className="text-zinc-400">invites open</span>
        </div>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl md:text-6xl">
          Learn ancient languages
          <br />
          with a relentless AI tutor
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
          Akkadian. Biblical Hebrew. Koine Greek. Latin. Old Church
          Slavonic. You get instant pronunciation feedback, adaptive
          drills, and guided reading of real primary texts — not baby
          phrases.
        </p>

        <WaitlistForm />

        <p className="mt-4 text-[11px] text-zinc-600">
          No spam. We’ll only email onboarding + early access.
        </p>
      </div>
    </section>
  );
}
