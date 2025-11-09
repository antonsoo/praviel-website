const metrics = [
  {
    value: "21",
    label: "Languages (Latin → Sumerian)",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    value: "5,000+",
    label: "Years of literature",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "116,502",
    label: "LSJ entries fueling morphology",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    value: "0",
    label: "Hallucinations tolerated (guardrails)",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function TractionBar() {
  return (
    <section className="relative px-6 py-16 overflow-hidden content-visibility-auto" aria-label="Platform metrics">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-[#3b82f6]/5 to-[#D4AF37]/5" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 md:gap-8">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="relative flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-6 text-center shadow-lg shadow-black/20 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-[#D4AF37]/20"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#D4AF37]/30 to-[#3b82f6]/30 text-[#E8C55B] ring-1 ring-[#D4AF37]/50">
                {metric.icon}
              </div>
              <p className="text-2xl font-semibold text-white">{metric.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">{metric.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
