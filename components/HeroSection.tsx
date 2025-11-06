import Link from "next/link";

import DecorativeColumns from "@/components/DecorativeColumns";
import GreekKeyBorder from "@/components/GreekKeyBorder";
import HeroHighlights from "@/components/HeroHighlights";
import HeroMetrics from "@/components/HeroMetrics";
import PrimaryCTA from "@/components/PrimaryCTA";
import HeroWaitlistDesktopGate from "@/components/HeroWaitlistDesktopGate";
import { heroCopy } from "@/lib/canonicalCopy";

const heroMetrics = [
  { value: "46", label: "ancient languages", detail: "full corpora" },
  { value: "5,000", label: "years of sources", detail: "canon + commentaries" },
  { value: "0", label: "hallucinations", detail: "scholar citations" },
];

const heroHighlights = [
  "Every translation is an interpretation. We teach you to read the originals—no filters.",
  "Infrastructure for preserving linguistic heritage from Sumerian cuneiform to medieval manuscripts.",
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-20 pt-28 sm:pb-24 sm:pt-32 md:pt-40 lg:pb-28 lg:pt-44">
      <div className="hero-backdrop" aria-hidden />
      <DecorativeColumns />
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-black via-transparent to-transparent" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
        <div className="space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-white/70">
            {heroCopy.eyebrow}
          </div>
          <div className="space-y-4 text-balance">
            <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl lg:text-7xl">
              {heroCopy.title}
            </h1>
            <p className="text-lg text-white/75 sm:text-xl">{heroCopy.subtitle}</p>
            <p className="mx-auto max-w-[60ch] text-sm text-white/70 sm:text-base lg:mx-0">
              {heroCopy.mission}
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 lg:items-start lg:gap-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:items-center">
              <PrimaryCTA />
              <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                Built by philologists · Powered by GPT-5, Claude 4.5, Gemini 2.5
              </div>
            </div>
            <HeroMetrics metrics={heroMetrics} />
            <HeroHighlights highlights={heroHighlights} />
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5/80 px-5 py-6 text-left shadow-lg shadow-black/30 lg:hidden">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Get early access</h2>
              <p className="mt-2 text-sm text-white/70">
                Join the scholar waitlist or reach out for classroom deployments. The full waitlist panel unlocks once the page settles.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="#waitlist"
                className="group flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 px-5 py-3 text-sm font-medium text-[#E8DCC4] ring-1 ring-[#D4AF37]/40 lg:backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#E8C55B]/50 hover:from-[#D4AF37]/20 hover:to-[#D4AF37]/15 hover:ring-[#E8C55B]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/70"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Join Scholar Waitlist</span>
                </Link>
                <a
                  href="mailto:contact@praviel.com?subject=Early Classroom Access Request"
                className="group flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 px-5 py-3 text-sm font-medium text-[#E8DCC4] ring-1 ring-[#D4AF37]/40 lg:backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#E8C55B]/50 hover:from-[#D4AF37]/20 hover:to-[#D4AF37]/15 hover:ring-[#E8C55B]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/70"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Bring PRAVIEL to Class</span>
                </a>
              </div>
              <p className="mt-3 text-[11px] text-white/50">
                Full waitlist panel loads after the page settles.
              </p>
            </div>
          </div>
        </div>
        <aside className="relative hidden lg:block">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Authentic-text workflow</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Select a canonical witness, ground it in Perseus, LSJ, TLA, ORACC, and CDLI data, then rehearse with historically accurate mentors. Citations and morphology are embedded at every step.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                Latin, Koine, Classical Greek, Biblical Hebrew prioritized for full reader + coach stack.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                Sanskrit, Classical Chinese, Pali, Old Church Slavonic, Ancient Aramaic, and Classical Arabic unlock next.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                Privacy-first BYOK architecture with offline Echo provider for schools.
              </li>
            </ul>
            <GreekKeyBorder className="mt-6" />
            <HeroWaitlistDesktopGate />
          </div>
        </aside>
      </div>
    </section>
  );
}
