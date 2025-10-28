export default function FeatureGrid() {
  const features = [
    {
      title: "Adaptive drills",
      body: "The system tracks your morphology, vocab, and phonology weaknesses and hammers them until they stick.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-violet-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Primary texts",
      body: "You read tablets, manuscripts, inscriptions — line by line — with inline glossing and grammar help.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-violet-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M4 6h16M4 10h16M4 14h10M4 18h6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Pronunciation coach",
      body: "You speak into the mic. We align your audio to target phonemes and tell you exactly what slipped.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-violet-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M9 9a3 3 0 1 1 6 0v3a3 3 0 1 1-6 0V9Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 11v1a7 7 0 0 0 14 0v-1M12 22v-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Coach mode",
      body: "Ask anything — declension, etymology, paleography. Your AI coach answers using the actual corpus, not generic trivia.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-violet-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 3 3 9l9 6 9-6-9-6Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 15l9 6 9-6M12 9v12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="features"
      className="relative z-10 px-6 pb-24 sm:pb-32 md:pb-40"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative flex flex-col rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] p-5 ring-1 ring-white/5 backdrop-blur transition-colors hover:border-violet-400/30 hover:bg-violet-500/5 hover:ring-violet-500/40"
          >
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--color-accent-soft)] ring-1 ring-[color:var(--color-accent)]/40">
              {f.icon}
            </div>
            <h3 className="text-sm font-semibold text-zinc-100">
              {f.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              {f.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-xl text-center text-xs text-zinc-600">
        PRAVIEL will launch first on web and desktop, then iOS/Android.
        If you teach ancient languages and you want early classroom
        access, contact anton@praviel.com.
      </div>
    </section>
  );
}
