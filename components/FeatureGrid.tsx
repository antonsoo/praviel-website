import type { ReactNode } from "react";

import GreekKeyBorder from "@/components/GreekKeyBorder";

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    title: "Grounded in Scholarship",
    body:
      "Every definition comes from Perseus, LSJ, and university research—not AI guessing. Read with confidence.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Learn from the Classics",
    body:
      "Read actual passages from Homer, the Torah, and the Bhagavad-Gītā. No \"the apple is red\" filler.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "5,000 Years of Language",
    body:
      "From Sumerian cuneiform to medieval Latin. 46 ancient languages spanning 5,000 years of human history.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Your Privacy, Your Data",
    body:
      "No tracking. Use your own API keys or go offline. Open source and self-hostable.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="relative z-10 px-6 pb-24 content-visibility-auto sm:pb-32 md:pb-40"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-5xl mb-12 text-center space-y-4">
        <GreekKeyBorder className="mx-auto max-w-3xl" />
        <h2 id="features-title" className="text-3xl sm:text-4xl font-semibold text-white">
          Why PRAVIEL?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          Modern learning tools for ancient voices.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="group relative flex flex-col rounded-2xl border border-[#D4AF37]/15 bg-zinc-900/70 p-6 text-left shadow-lg shadow-black/30 transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-[#D4AF37]/25"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#3b82f6]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#3b82f6]/30 ring-2 ring-[#D4AF37]/40 shadow-lg shadow-[#D4AF37]/20 text-[#E8C55B]">
              {feature.icon}
            </div>
            <h3 className="relative text-base font-semibold text-white">
              {feature.title}
            </h3>
            <p className="relative mt-3 text-sm text-zinc-300 leading-relaxed">
              {feature.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center px-4">
        <p className="text-xs sm:text-sm text-zinc-500">
          Powered by: Perseus (Tufts) · LSJ Lexicon · TLA Berlin · ORACC · CDLI
        </p>
      </div>
    </section>
  );
}
