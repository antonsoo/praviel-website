"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type CivilizationId = "egypt" | "greece" | "rome";

const CIVILIZATION_MATERIALS: Array<{
  id: CivilizationId;
  label: string;
  medium: string;
  temperature: string;
  uiHook: string;
  description: string;
  highlights: string[];
}> = [
  {
    id: "egypt",
    label: "Egypt",
    medium: "Papyrus & gold leaf",
    temperature: "3800K torchlight",
    uiHook: "Papyrus scrolls and torchlit glow",
    description:
      "We lean into reed-fiber papyrus with amber gradients, dual-layer scrolls, and glyph spotlights that stay AA compliant even in torch mode.",
    highlights: [
      "PapyrusScroll component for CTAs",
      "Torch cursor volumetrics",
      "Determinative overlays in Living Manuscript",
    ],
  },
  {
    id: "greece",
    label: "Greece",
    medium: "Parian marble",
    temperature: "5200K skylight",
    uiHook: "Marble acoustics + doric columns",
    description:
      "Greco-Roman layouts borrow marble dust gradients, Greek key borders, and measured meter pulses synced with scroll-driven animations.",
    highlights: [
      "GreekKeyBorder separators",
      "Meter visualizer copy",
      "View-timeline reveals for stanza pacing",
    ],
  },
  {
    id: "rome",
    label: "Rome",
    medium: "Travertine & mosaic",
    temperature: "Warm sunlight",
    uiHook: "Roman mosaic borders + export grid",
    description:
      "Roman surfaces emphasize travertine depth, mosaic tesserae, and export-oriented grids so research artifacts feel archival and reliable.",
    highlights: [
      "RomanMosaicBorder canvas",
      "Journey timeline badges",
      "Scriptio continua typography toggles",
    ],
  },
];

export default function MaterialStudy() {
  const [activeId, setActiveId] = useState<CivilizationId>("egypt");
  const shouldReduceMotion = useReducedMotion();
  const active = CIVILIZATION_MATERIALS.find((item) => item.id === activeId) ?? CIVILIZATION_MATERIALS[0];

  return (
    <section
      aria-labelledby="material-study-title"
      className="relative px-4 sm:px-6 py-16 sm:py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1d1a12]/35 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl space-y-10">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">Material study</p>
          <h2 id="material-study-title" className="text-3xl sm:text-4xl font-semibold text-white">
            How each civilization informs the UI
          </h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-zinc-400">
            Toggle the medium to see how papyrus, marble, and mosaics translate into modern, accessible design systems.
          </p>
        </header>

        <div className="material-pill-strip" role="tablist" aria-label="Civilization materials">
          {CIVILIZATION_MATERIALS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="material-panel"
                className={["material-pill", isActive ? "material-pill--active" : ""].filter(Boolean).join(" ")}
                onClick={() => setActiveId(item.id)}
              >
                <span className="material-pill__label">{item.label}</span>
                <span className="material-pill__medium">{item.medium}</span>
              </button>
            );
          })}
        </div>

        <div className="material-panel scroll-scale" role="tabpanel" id="material-panel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, ease: "easeOut" }}
              className={`material-panel__layer material-panel__layer--${active.id}`}
            >
              <div className="material-panel__metadata">
                <div>
                  <p className="material-panel__eyebrow">Medium</p>
                  <p className="material-panel__value">{active.medium}</p>
                </div>
                <div>
                  <p className="material-panel__eyebrow">Color temp</p>
                  <p className="material-panel__value">{active.temperature}</p>
                </div>
                <div>
                  <p className="material-panel__eyebrow">UI hook</p>
                  <p className="material-panel__value">{active.uiHook}</p>
                </div>
              </div>

              <p className="material-panel__description">{active.description}</p>

              <ul className="material-panel__highlights" aria-label={`${active.label} implementations`}>
                {active.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="material-panel__dot" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
