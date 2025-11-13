"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const VIEW_MODES = [
  { id: "script", label: "Script" },
  { id: "transliteration", label: "Transliteration" },
  { id: "translation", label: "Translation" },
] as const;

const MANUSCRIPTS = [
  {
    id: "egypt",
    label: "Egypt",
    period: "Tale of Sinuhe · 12th Dynasty",
    medium: "Papyrus, hieroglyphs",
    script: "𓇋𓈖𓂓𓅱𓈙𓅱𓏏𓈖𓇋",
    transliteration: "in ksw.tw n.i",
    translation: "I was summoned, I came. (Sinuhe, Berlin Papyrus 3022)",
    commentary: "Determinatives are highlighted in amber and can be traced with finger or stylus.",
    features: ["Glyph tracing", "Papyrus contrast", "Determinative helper"],
    fontClass: "font-serif",
  },
  {
    id: "greece",
    label: "Greece",
    period: "Iliad I.1 · Venetus A",
    medium: "Pergamenon, Greek capitals",
    script: "ΜΗΝΙΝΑΕΙΔΕΘΕΑΠΗΛΗΙΑΔΕΩΑΧΙΛΗΟΣ",
    transliteration: "MĒNIN AEIDE, THEA, PĒLĒIADĒŌ AKHILĒOS",
    translation: "Sing, goddess, the wrath of Achilles son of Peleus.",
    commentary: "Meter guide pulses gently to keep six feet aligned with your breathing cycle.",
    features: ["Meter pulse", "Nomina sacra", "Dialect coach"],
    fontClass: "font-greek",
  },
  {
    id: "rome",
    label: "Rome",
    period: "Aeneid I.1 · Palatine",
    medium: "Wax tablet, Roman capitals",
    script: "ARMA·VIRVMQVE·CANO·TROIAE",
    transliteration: "ARMA VIRUMQUE CANŌ TRŌIAE",
    translation: "I sing of arms and the man, who first from the shores of Troy.",
    commentary: "Scriptio continua toggle inserts interpuncts for easier onboarding without betraying the stone.",
    features: ["Epigraphic interpunct", "Morph heatmap", "Advisor export"],
    fontClass: "font-display",
  },
] as const;

type ViewMode = typeof VIEW_MODES[number]["id"];

export default function LivingManuscript() {
  const [activeId, setActiveId] = useState<typeof MANUSCRIPTS[number]["id"]>(MANUSCRIPTS[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>("script");
   const [focusOpen, setFocusOpen] = useState(false);
   const focusCloseRef = useRef<HTMLButtonElement | null>(null);
   const focusOpenButtonRef = useRef<HTMLButtonElement | null>(null);
   const previousOverflowRef = useRef<string | null>(null);
   const dialogRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeManuscript = MANUSCRIPTS.find((item) => item.id === activeId) ?? MANUSCRIPTS[0];

  const textForMode =
    viewMode === "transliteration"
      ? activeManuscript.transliteration
      : viewMode === "translation"
        ? activeManuscript.translation
        : activeManuscript.script;

  useEffect(() => {
    if (!focusOpen) {
      if (typeof document !== "undefined" && previousOverflowRef.current !== null) {
        document.documentElement.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      }
      // Return focus to the "Focus view" button when closing
      if (focusOpenButtonRef.current) {
        focusOpenButtonRef.current.focus();
      }
      return;
    }

    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const docEl = document.documentElement;
    if (previousOverflowRef.current === null) {
      previousOverflowRef.current = docEl.style.overflow || "";
    }
    docEl.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFocusOpen(false);
        return;
      }

      // Focus trap: keep Tab navigation within dialog
      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.from(focusableElements);
        const firstElement = focusableArray[0];
        const lastElement = focusableArray[focusableArray.length - 1];

        if (!event.shiftKey && document.activeElement === lastElement) {
          // Tab on last element: go to first
          event.preventDefault();
          firstElement?.focus();
        } else if (event.shiftKey && document.activeElement === firstElement) {
          // Shift+Tab on first element: go to last
          event.preventDefault();
          lastElement?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (focusCloseRef.current) {
      focusCloseRef.current.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      docEl.style.overflow = previousOverflowRef.current ?? "";
      previousOverflowRef.current = null;
    };
  }, [focusOpen]);

  return (
    <section
      id="living-manuscript"
      className="relative px-4 sm:px-6 py-16 sm:py-24 md:py-32"
      aria-labelledby="living-manuscript-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1f1b12]/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl space-y-10">
        <header className="text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">Living manuscript lab</p>
          <h2 id="living-manuscript-title" className="text-3xl sm:text-4xl font-semibold text-white">
            Toggle the original, transliteration, and translation
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-300">
            A single component powers every civilization. The UI stays identical while the script, meter helpers, and export tools adapt in real time.
          </p>
        </header>

        <div className="rounded-[32px] border border-white/10 bg-black/50 p-4 sm:p-6 shadow-[0_45px_120px_rgba(0,0,0,0.45)] scroll-scale">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Manuscripts">
            {MANUSCRIPTS.map((manuscript) => {
              const isActive = manuscript.id === activeId;
              return (
                <button
                  key={manuscript.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="living-manuscript-panel"
                  onClick={() => setActiveId(manuscript.id)}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60 ${
                    isActive ? "border-[#E8C55B]/50 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"
                  }`}
                >
                  {manuscript.label}
                </button>
              );
            })}
            </div>
            <button
              type="button"
              ref={focusOpenButtonRef}
              onClick={() => setFocusOpen(true)}
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60"
            >
              <span>Focus view</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
            <span>{activeManuscript.period}</span>
            <span className="h-px w-8 bg-white/10" aria-hidden />
            <span>{activeManuscript.medium}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="View mode">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={mode.id === viewMode}
                aria-controls="living-manuscript-panel"
                onClick={() => setViewMode(mode.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/50 ${
                  viewMode === mode.id ? "bg-[#E8C55B]/20 text-white" : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[180px]" role="tabpanel" id="living-manuscript-panel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeManuscript.id}-${viewMode}`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, ease: "easeOut" }}
                className={`living-manuscript-panel ${activeManuscript.fontClass}`}
                aria-live="polite"
              >
                <p className="text-2xl sm:text-3xl text-white">
                  {textForMode}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-4 text-sm text-zinc-300">{activeManuscript.commentary}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-zinc-500">
            {activeManuscript.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {focusOpen ? (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="living-manuscript-focus-title"
              className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.3, ease: "easeOut" }}
            >
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                aria-hidden
                onClick={() => setFocusOpen(false)}
              />
              <div
                ref={dialogRef}
                className="relative z-10 w-full max-w-5xl rounded-[32px] border border-white/10 bg-black/90 p-4 sm:p-8 shadow-[0_50px_160px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">
                      Focused manuscript lab
                    </p>
                    <h3
                      id="living-manuscript-focus-title"
                      className="mt-2 text-2xl sm:text-3xl font-semibold text-white"
                    >
                      {activeManuscript.label} — {activeManuscript.period}
                    </h3>
                  </div>
                  <button
                    type="button"
                    ref={focusCloseRef}
                    onClick={() => setFocusOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-zinc-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60"
                    aria-label="Close focus view"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.75rem] uppercase tracking-[0.35em] text-zinc-500">
                  <span>{activeManuscript.medium}</span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="View mode (focus)">
                  {VIEW_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      aria-selected={mode.id === viewMode}
                      aria-controls="living-manuscript-focus-panel"
                      onClick={() => setViewMode(mode.id)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/50 ${
                        viewMode === mode.id ? "bg-[#E8C55B]/25 text-white" : "bg-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 min-h-[220px]" role="tabpanel" id="living-manuscript-focus-panel">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${activeManuscript.id}-${viewMode}-focus`}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                      transition={{ duration: shouldReduceMotion ? 0.2 : 0.4, ease: "easeOut" }}
                      className={`living-manuscript-panel ${activeManuscript.fontClass}`}
                      aria-live="polite"
                    >
                      <p className="text-3xl sm:text-4xl text-white">
                        {textForMode}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="mt-4 text-sm text-zinc-300">{activeManuscript.commentary}</p>

                <div className="mt-6 flex flex-wrap gap-3 text-xs text-zinc-500">
                  {activeManuscript.features.map((feature) => (
                    <span
                      key={`${feature}-focus`}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-2"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
