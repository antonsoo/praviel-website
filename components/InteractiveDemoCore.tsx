"use client";

import { useMemo, useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { excerpts } from "@/lib/excerpts";

export default function InteractiveDemoCore() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  const [activeExcerptId, setActiveExcerptId] = useState(excerpts[0].id);
  const activeExcerpt = useMemo(() => excerpts.find((item) => item.id === activeExcerptId) ?? excerpts[0], [activeExcerptId]);
  const [selectedWordId, setSelectedWordId] = useState(activeExcerpt.tokens[0].id);
  const [showScriptio, setShowScriptio] = useState(false);

  useEffect(() => {
    setSelectedWordId(activeExcerpt.tokens[0].id);
    setShowScriptio(false);
  }, [activeExcerpt]);

  const selectedToken = useMemo(
    () => activeExcerpt.tokens.find((token) => token.id === selectedWordId) ?? activeExcerpt.tokens[0],
    [activeExcerpt, selectedWordId]
  );

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden content-visibility-auto"
      aria-labelledby="demo-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="demo-title"
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Interactive <span className="bg-gradient-to-r from-[#E8C55B] to-[#D4AF37] bg-clip-text text-transparent">Reader</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-4">
            Tap any word to reveal lemma, morphology, and commentary. The reader enforces historical scripts, not modernized spellings.
          </p>
          <p className="text-sm text-zinc-500">
            Preview Homer, Psalm 23, and Bhagavad-Gītā passages exactly as the manuscripts encode them.
          </p>
        </m.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist" aria-label="Reader excerpts">
          {excerpts.map((excerpt) => (
            <button
              key={excerpt.id}
              type="button"
              onClick={() => setActiveExcerptId(excerpt.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all min-h-[40px] ${
                activeExcerpt.id === excerpt.id
                  ? "border-[#E8C55B] text-white bg-[#E8C55B]/10"
                  : "border-zinc-700 text-zinc-400 hover:text-white"
              }`}
              role="tab"
              aria-selected={activeExcerpt.id === excerpt.id}
            >
              {excerpt.language}
            </button>
          ))}
        </div>

        <m.div
          className="relative rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-zinc-900/90 p-6 sm:p-8 md:p-12 backdrop-blur-xl shadow-2xl shadow-[#D4AF37]/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Excerpt</p>
                  <p className="text-sm text-zinc-300">
                    {activeExcerpt.source.title} · {activeExcerpt.source.context}
                  </p>
                </div>
                {activeExcerpt.scriptioText ? (
                  <button
                    type="button"
                    onClick={() => setShowScriptio(!showScriptio)}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400 hover:text-white hover:border-zinc-500"
                  >
                    {showScriptio ? "Show spaced text" : "Show scriptio continua"}
                  </button>
                ) : null}
              </div>

              {activeExcerpt.scriptioText && showScriptio ? (
                <p
                  className={`text-sm text-zinc-500 mb-3 ${activeExcerpt.fontClass ?? "font-serif"}`}
                  dir={activeExcerpt.direction}
                >
                  {activeExcerpt.scriptioText}
                </p>
              ) : null}

              <div
                className={`flex flex-wrap justify-center gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 ${
                  activeExcerpt.direction === "rtl" ? "flex-row-reverse" : ""
                }`}
                dir={activeExcerpt.direction}
              >
                {activeExcerpt.tokens.map((token) => (
                  <m.button
                    key={token.id}
                    onClick={() => setSelectedWordId(token.id)}
                    className={`px-3 py-2 rounded-lg border text-base sm:text-lg transition-all ${
                      selectedWordId === token.id
                        ? "border-[#E8C55B] bg-[#E8C55B]/10 text-white"
                        : "border-transparent bg-zinc-800/40 text-zinc-200 hover:border-[#E8C55B]/30"
                    } ${activeExcerpt.fontClass ?? "font-serif"}`}
                    style={{ color: selectedWordId === token.id ? undefined : token.color }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {token.text}
                  </m.button>
                ))}
              </div>

              <p className="text-sm text-zinc-400 italic mt-4" data-testid="demo-translation">
                “{activeExcerpt.translation}”
              </p>
              <p className="text-xs text-zinc-500">{activeExcerpt.synopsis}</p>
            </div>

            <m.div
              data-testid="demo-morphology"
              className="rounded-2xl border border-zinc-800/60 bg-zinc-900/60 p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#E8C55B] mb-3">Scholarly analysis</p>
              <div className="space-y-4">
                <div>
                  <p className={`text-3xl font-semibold text-white ${activeExcerpt.fontClass ?? "font-serif"}`} dir={activeExcerpt.direction}>
                    {selectedToken.text}
                  </p>
                  <p className="text-sm text-zinc-500">Lemma: {selectedToken.lemma}</p>
                </div>
                <div className="space-y-2 text-sm text-zinc-300">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Definition</p>
                    <p>{selectedToken.definition}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Morphology</p>
                    <p>{selectedToken.morphology}</p>
                  </div>
                  {selectedToken.notes ? (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500">Notes</p>
                      <p>{selectedToken.notes}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
