const features = [
  { name: "Ancient languages", traditional: "Latin + Greek", apps: "None", praviel: "46 languages" },
  { name: "Accuracy", traditional: "Depends on instructor", apps: "Hallucinates", praviel: "Grounded in LSJ, Perseus, TLA" },
  { name: "Interactive reader", traditional: "Paper dictionary", apps: "Word hints", praviel: "Tap any word for morphology" },
  { name: "Privacy", traditional: "Offline books", apps: "Ads + tracking", praviel: "BYOK, zero tracking" },
];

const comparisonSummaries = [
  {
    label: "Traditional Methods",
    icon: "📚",
    body: "Scholarly but slow. Physical dictionaries, no instant feedback.",
  },
  {
    label: "Language Apps",
    icon: "📱",
    body: "Fun but superficial. Baby phrases, not authentic texts.",
  },
  {
    label: "PRAVIEL",
    icon: "⚡",
    body: "Scholarly accuracy meets modern UX. Best of both worlds.",
  },
];

export default function ComparisonTable() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 content-visibility-auto sm:py-32"
      aria-labelledby="comparison-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1e40af]/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-14">
        <header className="space-y-4 text-center px-4">
          <h2
            id="comparison-title"
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Why <span className="bg-gradient-to-r from-[#E8C55B] to-[#3b82f6] bg-clip-text text-transparent">PRAVIEL</span>?
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-300 sm:text-lg md:text-xl">
            The first platform to combine scholarly rigor with modern AI for ancient languages.
          </p>
        </header>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-black/30 shadow-2xl shadow-black/40">
          <table className="w-full border-collapse text-sm text-zinc-200">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.3em] text-zinc-500">
                <th className="px-6 py-4 font-semibold text-zinc-400">Feature</th>
                <th className="px-6 py-4 font-semibold text-zinc-400">Traditional</th>
                <th className="px-6 py-4 font-semibold text-zinc-400">Apps</th>
                <th className="px-6 py-4 font-semibold text-[#E8C55B]">PRAVIEL</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.name} className="border-t border-white/5">
                  <th scope="row" className="px-6 py-5 text-base font-semibold text-white">
                    {feature.name}
                  </th>
                  <td className="px-6 py-5 text-zinc-400">{feature.traditional}</td>
                  <td className="px-6 py-5 text-zinc-400">{feature.apps}</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-[#D4AF37]/15 px-3 py-1.5 text-sm font-semibold text-[#E8C55B]">
                      {feature.praviel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {comparisonSummaries.map((item, index) => (
            <div
              key={item.label}
              className={`rounded-xl border p-6 text-center backdrop-blur-sm transition-all hover:scale-105 ${
                index === 2
                  ? "border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-[#3b82f6]/10 ring-1 ring-[#D4AF37]/20"
                  : "border-zinc-800/50 bg-zinc-900/50"
              }`}
            >
              <div className="text-4xl mb-3" aria-hidden>
                {item.icon}
              </div>
              <p className={`text-base font-semibold ${index === 2 ? "text-[#E8C55B]" : "text-white"}`}>
                {item.label}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://app.praviel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A572] px-8 py-4 text-sm font-semibold text-black shadow-lg shadow-[#D4AF37]/40 transition hover:shadow-[#D4AF37]/60 hover:scale-105"
          >
            Try PRAVIEL Free
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="mt-3 text-xs text-zinc-500">
            Start reading ancient texts in 10 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
