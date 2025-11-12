"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const CIVILIZATIONS = [
  {
    id: "egypt",
    label: "Middle Kingdom Egypt",
    badge: "Papyrus · c. 1900 BCE",
    script: "𓇋𓈖𓂓𓅱𓈙𓅱𓏏𓈖𓇋",
    translation: "“I was Sinuhe.” Tale of Sinuhe, Berlin 10499.",
    features: [
      "Glyph-level tracing with stylus pressure feedback",
      "Determinatives explained inline with cultural notes",
      "Papyrus white-point calibrated to avoid glare at night",
    ],
    metrics: [
      { label: "Glyphs", value: "750" },
      { label: "Audio drills", value: "18 h" },
      { label: "Dialect", value: "Middle Egyptian" },
    ],
    accentGradient: "linear-gradient(135deg, rgba(205,163,73,0.25), rgba(232,197,91,0.08))",
    fontClass: "font-serif",
  },
  {
    id: "greece",
    label: "Classical Athens",
    badge: "Parian marble · 430 BCE",
    script: "ΜΗΝΙΝΑΕΙΔΕΘΕΑΠΗΛΗΙΑΔΕΩΑΧΙΛΗΟΣ",
    translation: "“Sing, goddess, of the wrath of Achilles.” Iliad I.1.",
    features: [
      "Meter visualizer keeps dactylic hexameter honest",
      "Nomina sacra + scholia overlays from Venetus A",
      "Pronunciation coach tunes to Erasmian or reconstructed Attic",
    ],
    metrics: [
      { label: "Meters", value: "6" },
      { label: "Commentaries", value: "12" },
      { label: "Dialect", value: "Attic / Ionic" },
    ],
    accentGradient: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(147,197,253,0.08))",
    fontClass: "font-greek",
  },
  {
    id: "rome",
    label: "Augustan Rome",
    badge: "Palatine tablet · 19 BCE",
    script: "ARMA·VIRVMQVE·CANO·TROIAE",
    translation: "“I sing of arms and the man.” Aeneid I.1.",
    features: [
      "Scriptio continua switch with epigraphic interpuncts",
      "Morphology heatmap flags lines to review",
      "Export annotations straight to your advisor's CMS",
    ],
    metrics: [
      { label: "Lines", value: "9,896" },
      { label: "Voices", value: "4" },
      { label: "Dialect", value: "Classical Latin" },
    ],
    accentGradient: "linear-gradient(135deg, rgba(200,90,58,0.25), rgba(140,47,19,0.08))",
    fontClass: "font-display",
  },
] as const;

export default function HeroCivilizationCarousel() {
  const [activeId, setActiveId] = useState<typeof CIVILIZATIONS[number]["id"]>(CIVILIZATIONS[0].id);
  const activePanel = CIVILIZATIONS.find((civ) => civ.id === activeId) ?? CIVILIZATIONS[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-4xl rounded-[32px] border border-white/10 bg-black/40 p-4 sm:p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div
        role="tablist"
        aria-label="Civilization presets"
        className="grid gap-2 sm:grid-cols-3"
      >
        {CIVILIZATIONS.map((civ) => {
          const isActive = civ.id === activeId;
          return (
            <button
              key={civ.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              className={`rounded-2xl border px-3 py-3 text-left text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60 ${
                isActive
                  ? "border-[#E8C55B]/40 bg-[#E8C55B]/10 text-white"
                  : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/20"
              }`}
              onClick={() => setActiveId(civ.id)}
            >
              <span className="block text-[11px] uppercase tracking-[0.35em] text-zinc-300">
                {civ.badge}
              </span>
              <span className="mt-1 block text-base">{civ.label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-6 min-h-[220px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={activePanel.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -24 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, ease: "easeOut" }}
            className="rounded-[28px] border border-white/5 bg-gradient-to-br from-black/60 to-black/20 p-5 sm:p-8"
            aria-live="polite"
          >
            <div
              className={`rounded-2xl border border-white/5 p-4 ${activePanel.fontClass}`}
              style={{ backgroundImage: activePanel.accentGradient }}
            >
              <p className="text-2xl sm:text-3xl text-white tracking-wide" lang="zxx">
                {activePanel.script}
              </p>
              <p className="mt-3 text-sm text-zinc-300">
                {activePanel.translation}
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-zinc-200" aria-label="Feature highlights">
              {activePanel.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-zinc-400">
              {activePanel.metrics.map((metric) => (
                <div
                  key={`${activePanel.id}-${metric.label}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span className="text-zinc-500 mr-2">{metric.label}</span>
                  <span className="text-white tracking-normal">{metric.value}</span>
                </div>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
