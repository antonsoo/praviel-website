import PrimaryCTA from "@/components/PrimaryCTA";
import { heroCopy } from "@/lib/canonicalCopy";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[85svh] overflow-hidden px-6 py-32 sm:py-40 md:min-h-[75svh]">
      {/* Lightweight CSS gradient background - no video, no images */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,197,91,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]" />
        {/* Ancient script watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] text-[20rem] font-serif text-[#E8C55B] select-none pointer-events-none" aria-hidden>
          Α Ω
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl text-center space-y-12">
        {/* Simple eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E8C55B]/20 bg-[#E8C55B]/5 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-[#E8C55B]">
          {heroCopy.eyebrow}
        </div>

        {/* Simplified headline - this becomes LCP element */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight text-white">
          Read the Originals
          <span className="mt-3 block bg-gradient-to-r from-[#E8C55B] via-[#D4AF37] to-[#E8C55B] bg-clip-text text-transparent">
            Not the Translations
          </span>
        </h1>

        {/* Single clear subtitle */}
        <p className="mx-auto max-w-2xl text-xl sm:text-2xl text-zinc-300 leading-relaxed">
          Learn Latin, Greek, Hebrew, and Sanskrit through AI-powered lessons grounded in authentic manuscripts.
        </p>

        {/* Trust indicators - simple */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
            46 Languages
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
            Zero Hallucinations
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
            Research-Grade
          </span>
        </div>

        {/* Single prominent CTA */}
        <div className="pt-4">
          <PrimaryCTA />
        </div>

        {/* Subtle credibility footer */}
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Built by Philologists · Powered by GPT-5, Claude 4.5, Gemini 2.5
        </p>
      </div>
    </section>
  );
}
