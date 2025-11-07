import PrimaryCTA from "@/components/PrimaryCTA";
import { heroCopy } from "@/lib/canonicalCopy";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[85svh] overflow-hidden px-6 py-32 sm:py-40 md:min-h-[75svh]">
      {/* Animated gradient background - engaging but performant */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,197,91,0.15),transparent_50%)] animate-gradient-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)] animate-gradient-slower" />
        {/* Subtle grid pattern for academic feel */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(232,197,91,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,197,91,0.5) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} aria-hidden />
      </div>

      <div className="relative mx-auto max-w-4xl text-center space-y-10">
        {/* Eyebrow with credibility */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E8C55B]/20 bg-[#E8C55B]/5 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-[#E8C55B]">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          {heroCopy.eyebrow}
        </div>

        {/* Headline with visual hierarchy */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white">
          Read the Originals
          <span className="mt-3 block bg-gradient-to-r from-[#E8C55B] via-[#D4AF37] to-[#E8C55B] bg-clip-text text-transparent animate-gradient-x">
            Not the Translations
          </span>
        </h1>

        {/* Clear, jargon-free subtitle */}
        <p className="mx-auto max-w-2xl text-xl sm:text-2xl text-zinc-300 leading-relaxed">
          Master ancient languages with AI tutors trained on <strong className="text-white">primary sources</strong>—no hallucinations, just scholarship.
        </p>

        {/* Social proof - addressing trust deficit */}
        <div className="flex flex-col items-center gap-4 text-sm">
          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
              46 Languages
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
              116,502 LSJ Entries
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
              Research-Grade
            </span>
          </div>
          {/* Mini testimonial for credibility */}
          <div className="mt-4 flex items-center gap-3 text-zinc-400">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#E8C55B] to-[#D4AF37] border-2 border-zinc-900" />
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-zinc-900" />
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 border-2 border-zinc-900" />
            </div>
            <p className="text-sm">
              <span className="font-semibold text-white">Used by scholars</span> at seminaries, universities, and research institutions
            </p>
          </div>
        </div>

        {/* CTA with urgency */}
        <div className="pt-6 space-y-4">
          <PrimaryCTA />
          <p className="text-sm text-zinc-500">
            Free tier available • No credit card required • Open source (Elastic License 2.0)
          </p>
        </div>

        {/* Credibility footer - more specific */}
        <div className="pt-6 border-t border-zinc-800/50">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Powered by <span className="text-zinc-400">GPT-5, Claude 4.5, Gemini 2.5</span> • Grounded in <span className="text-zinc-400">Perseus, LSJ, TLA</span>
          </p>
        </div>
      </div>
    </section>
  );
}
