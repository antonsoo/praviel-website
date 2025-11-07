import { languageShowcaseCopy } from "@/lib/canonicalCopy";
import { languages, type Language } from "@/lib/languageData";
import { languageRoadmapPhases, languageEmoji } from "@/lib/languageRoadmap";

function LanguageCard({ language }: { language: Language }) {
  const topWorks = language.topTenWorks.slice(0, 3);

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5/80 p-6 shadow-xl shadow-black/30">
      <div className="flex flex-wrap items-start gap-3">
        <span className="text-3xl" aria-hidden>
          {language.emoji}
        </span>
        <div>
          <p className="text-lg font-semibold text-white">{language.name}</p>
          <p
            className={`text-sm text-zinc-400 ${language.fontClass ?? "font-serif"}`}
            dir={language.isRTL ? "rtl" : "ltr"}
          >
            {language.nativeName}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-200">{language.description}</p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">Writing system</p>
        <p className="mt-2 text-sm text-zinc-200">{language.writingInfo}</p>
      </div>

      <div className="mt-5">
        <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">Signature works</p>
        <ul className="mt-2 space-y-1 text-sm text-zinc-200">
          {topWorks.map((work) => (
            <li key={work} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
              <span>{work}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function LanguageShowcase() {
  const topTier = languages.filter((lang) => lang.tier === "top");
  const languageIndex = new Map(languages.map((lang) => [lang.name, lang]));

  return (
    <section
      aria-labelledby="language-showcase-title"
      className="relative overflow-hidden px-6 py-24 sm:py-32 content-visibility-auto"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C55B]/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">
            {languageShowcaseCopy.topTierLabel}
          </p>
          <h2
            id="language-showcase-title"
            className="text-4xl font-semibold text-white sm:text-5xl"
          >
            {languageShowcaseCopy.title}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-300">
            {languageShowcaseCopy.description}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {topTier.map((language) => (
            <LanguageCard key={language.name} language={language} />
          ))}
        </div>

        <div className="space-y-6 rounded-[32px] border border-white/10 bg-black/30 p-8 shadow-2xl shadow-black/30">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Roadmap
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Directly lifted from the investment brief: keep the scholarship intact, sequence the cohorts, and ship.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {languageRoadmapPhases.map((phase) => {
              return (
                <article
                  key={phase.id}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-950/60 p-6"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                      {phase.timeframe}
                    </p>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-white/60">
                      {phase.title}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-200">{phase.summary}</p>
                  {phase.note ? (
                    <p className="mt-2 text-xs text-zinc-500">{phase.note}</p>
                  ) : null}

                  <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/80 sm:grid-cols-2">
                    {phase.languages.map((name) => {
                      const language = languageIndex.get(name);
                      const emoji = language?.emoji ?? languageEmoji[name] ?? "•";
                      return (
                        <li
                          key={`${phase.id}-${name}`}
                          className={`flex items-center gap-3 rounded-2xl border border-white/5 bg-gradient-to-r ${phase.accent} px-3 py-2`}
                        >
                          <span className="text-xl" aria-hidden>
                            {emoji}
                          </span>
                          <span className="text-sm font-medium leading-tight">
                            {name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
