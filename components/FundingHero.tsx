"use client";

export default function FundingHero() {
  return (
    <section className="relative isolate px-6 py-24 sm:py-32 md:py-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(212,175,55,0.15)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#E8C55B]/90 ring-1 ring-[#D4AF37]/40 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8C55B] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]"></span>
          </span>
          <span>Support Open Development</span>
        </div>

        <h1 className="mt-8 text-balance text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl md:text-6xl">
          Help preserve
          <br />
          <span className="bg-gradient-to-r from-[#E8C55B] via-[#3b82f6] to-[#E8DCC4] bg-clip-text text-transparent">
            5,000 years of human wisdom
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
          Every ancient text is a conversation across millennia. Your support
          helps us build the infrastructure to make these conversations
          accessible to everyone — from scholars to students to anyone curious
          about humanity's linguistic heritage.
        </p>

        <div className="mx-auto mt-8 max-w-xl space-y-3 text-sm text-zinc-500">
          <div className="flex items-center justify-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-[#E8C55B]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>46 ancient languages with AI lesson generation</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-[#E8C55B]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Research-grade accuracy with zero AI hallucinations</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-[#E8C55B]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>100% open source under Elastic License 2.0</span>
          </div>
        </div>
      </div>
    </section>
  );
}
