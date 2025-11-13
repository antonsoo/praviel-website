import GreekKeyBorder from "@/components/GreekKeyBorder";
import PrimaryCTA from "@/components/PrimaryCTA";

const CIVILIZATION_CARDS = [
  {
    id: "egypt",
    label: "Egypt",
    glyph: "𓆓",
    headline: "Papyrus intelligence",
    body: "Glyph-level tutoring mirrors how scribes actually pulled the reed across papyrus. Torch-mode keeps contrast compliant in dark rooms without blowing out the gold.",
    highlights: [
      "Determinative spotlights you can toggle in-line",
      "Papyrus white balance locked to 3800K",
      "Hieratic + hieroglyph layers stay in sync",
    ],
  },
  {
    id: "greece",
    label: "Greece",
    glyph: "Ω",
    headline: "Marble acoustics",
    body: "Dactylic hexameter, doric choral odes, and philosophical prose all share the same reader. Meter guides pulse along the scroll and sync with voice prints.",
    highlights: [
      "Live meter visualizer for every line",
      "Nomina sacra + scholia overlays from Venetus A",
      "Alternate pronunciations (Erasmian, authentic classical)",
    ],
  },
  {
    id: "rome",
    label: "Rome",
    glyph: "Ↄ",
    headline: "Mosaic-grade export",
    body: "Annotate the Aeneid, push every line back to your advisor in XML/Docx, and keep provenance for each citation so committees can't question the pipeline.",
    highlights: [
      "Scriptio continua toggle with interpuncts",
      "Morphology heatmap driven by LSJ + Lewis & Short",
      "One-click export to CMS or Obsidian",
    ],
  },
] as const;

export default function CivilizationTriad() {
  return (
    <section
      id="civilization-triad"
      className="relative px-4 sm:px-6 py-16 sm:py-24 md:py-32"
      aria-labelledby="civilization-triad-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#8C6D3D]/10 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <GreekKeyBorder className="mx-auto max-w-2xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">
            Three crowns, one interface
          </p>
          <h2 id="civilization-triad-title" className="text-3xl sm:text-5xl font-semibold text-white">
            Egypt · Greece · Rome
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-zinc-300">
            Every surface references the material culture it came from—papyrus fiber, marble dust, travertine mosaics—without sacrificing contrast ratios or motion safety.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {CIVILIZATION_CARDS.map((card) => (
            <article
              key={card.id}
              className={`civilization-card civilization-card--${card.id} scroll-fade-in`}
              role="group"
              aria-labelledby={`civilization-${card.id}-title`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.5em] text-zinc-400">{card.label}</p>
                  <h3 id={`civilization-${card.id}-title`} className="mt-2 text-2xl font-semibold text-white">
                    {card.headline}
                  </h3>
                </div>
                <span className="text-4xl text-[#E8C55B]" aria-hidden>
                  {card.glyph}
                </span>
              </div>

              <p className="mt-4 text-sm text-zinc-200 leading-relaxed">{card.body}</p>

              <ul className="mt-6 space-y-3 text-sm text-zinc-100" aria-label={`${card.label} highlights`}>
                {card.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <PrimaryCTA className="w-full" ariaDescribedBy={`civilization-${card.id}-title`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
