const steps = [
  {
    number: "1",
    title: "Select the source, not a paraphrase",
    description:
      "Open the Iliad, Mishnah, Mahābhārata, or Pyramid Texts and work line-for-line. No graded readers or phrasebook filler.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    number: "2",
    title: "Let the stack pre-compute the hard parts",
    description:
      "Morphology, lemmatisation, and syntax trees are tied directly to Perseus, LSJ, ORACC, and TLA Berlin. Tutors quote those sources verbatim.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Interact line by line",
    description:
      "Tap any word to see stems, cultural notes, and manuscript context. Exercises adapt to whatever slowed you down in that passage.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    number: "4",
    title: "Own the pipeline",
    description:
      "Export annotations, self-host with BYOK, or share progress with advisors. No telemetry—your corpus and drills remain yours.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      aria-labelledby="workflow-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1e40af]/8 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#E8C55B]">
            Workflow
          </span>
          <h2 id="workflow-title" className="text-4xl font-bold text-white sm:text-5xl">
            How PRAVIEL takes you from{" "}
            <span className="bg-gradient-to-r from-[#E8C55B] to-[#3b82f6] bg-clip-text text-transparent">script to mastery</span>
          </h2>
          <p className="text-lg text-zinc-300 sm:text-xl">
            We combine manuscript-grade data with frontier AI tutors so nothing gets lost between the tablets and your notebook.
          </p>
        </header>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="how-step group rounded-2xl border border-zinc-800/60 bg-zinc-900/65 p-6 backdrop-blur-sm">
              <div className="how-step-number">
                <span>{step.number}</span>
              </div>
              <div className="mt-4 flex items-center gap-3 text-[#E8C55B]">{step.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-[#D4AF37]/20 bg-black/50 p-8 text-center shadow-[0_24px_60px_rgba(12,12,12,0.65)]">
          <h3 className="text-2xl font-semibold text-white">Scholars + AI = fluent in primary texts</h3>
          <p className="mt-3 text-sm text-zinc-400">
            Every stage is auditable. Tutors cite primary sources, and you retain full control over your corpus and annotations.
          </p>
        </div>
      </div>
    </section>
  );
}
