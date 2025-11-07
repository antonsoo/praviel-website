import { whyPravielCopy } from "@/lib/canonicalCopy";

export default function WhyPRAVIEL() {
  return (
    <section
      className="relative px-6 py-16 sm:py-24 md:py-32 overflow-hidden content-visibility-auto"
      aria-labelledby="why-praviel-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C55B]/8 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <h2
            id="why-praviel-title"
            className="text-4xl sm:text-5xl font-bold text-white bg-gradient-to-r from-[#E8C55B] via-[#D4AF37] to-[#E8C55B] bg-clip-text text-transparent"
          >
            {whyPravielCopy.problemHeading}
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            {whyPravielCopy.problemIntro}
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyPravielCopy.problemBullets.map((bullet) => (
            <article
              key={bullet}
              className="group rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/15"
            >
              <div className="flex gap-3">
                <div className="mt-1 text-[#E8C55B]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{bullet}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative rounded-2xl border border-[#D4AF37]/25 bg-zinc-900/70 p-10 shadow-2xl shadow-black/40">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#E8C55B]">
                Solution
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white">{whyPravielCopy.solutionHeading}</h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">{whyPravielCopy.solutionIntro}</p>

              <ul className="space-y-3">
                {whyPravielCopy.solutionBullets.slice(0, 3).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#E8C55B]" aria-hidden />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 rounded-xl border border-zinc-800/50 bg-zinc-900/70 p-6">
              <h4 className="text-lg font-semibold text-white">{whyPravielCopy.accuracyHeading}</h4>
              <p className="text-sm text-zinc-300 leading-relaxed">{whyPravielCopy.accuracyBody}</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                {whyPravielCopy.accuracySources.map((source) => (
                  <li key={source} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-[#3b82f6]" aria-hidden />
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
