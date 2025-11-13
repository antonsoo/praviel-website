import GreekKeyBorder from "@/components/GreekKeyBorder";
import { heroCopy, missionPillars } from "@/lib/canonicalCopy";

const missionListId = "mission-pillars";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function MissionSection() {
  return (
    <section
      className="relative px-6 py-20 sm:py-28"
      aria-labelledby="mission-title"
      aria-describedby="mission-description"
      role="region"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6 text-zinc-100">
          <GreekKeyBorder className="max-w-md" />
          <p className="text-xs uppercase tracking-[0.4em] text-[#E8C55B]">Mission</p>
          <h2 id="mission-title" className="text-3xl sm:text-4xl font-semibold text-white">
            {heroCopy.eyebrow}
          </h2>
          <p id="mission-description" className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            {heroCopy.mission}
          </p>
        </div>
        <ul
          id={missionListId}
          className="grid gap-4"
          role="list"
          aria-label="Mission pillars"
        >
          {missionPillars.map((pillar) => {
            const slug = slugify(pillar.label);
            const labelId = `mission-pillar-${slug}-label`;
            const bodyId = `mission-pillar-${slug}-body`;
            return (
              <li
                key={pillar.label}
                role="listitem"
                tabIndex={0}
                aria-labelledby={labelId}
                aria-describedby={bodyId}
                className="rounded-2xl border border-zinc-800/70 bg-zinc-900/60 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/40 scroll-fade-in"
              >
                <p id={labelId} className="text-sm font-semibold uppercase tracking-[0.35em] text-[#E8C55B]">
                  {pillar.label}
                </p>
                <p id={bodyId} className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {pillar.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
