"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { excerpts } from "@/lib/excerpts";

const createSeed = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = Math.imul(31, hash) + input.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
};

const mulberry32 = (seed: number) => {
  let state = seed || 1;
  return () => {
    state |= 0;
    state = (state + 0x6D2B79F5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffleWithSeed = <T,>(items: T[], seed: string): T[] => {
  const random = mulberry32(createSeed(seed));
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export default function LessonsDemoCore() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  const [activeExcerptId, setActiveExcerptId] = useState(excerpts[0].id);
  const activeExcerpt = useMemo(() => excerpts.find((item) => item.id === activeExcerptId) ?? excerpts[0], [activeExcerptId]);

  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [matches, setMatches] = useState<Set<string>>(new Set());
  const [shuffledTargets, setShuffledTargets] = useState(() => shuffleWithSeed(activeExcerpt.tokens, activeExcerpt.id));
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [showScriptio, setShowScriptio] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setMatches(new Set());
    setSelectedSource(null);
    setSelectedTarget(null);
    setWrongAttempt(false);
    setShowScriptio(false);
    setShuffledTargets(shuffleWithSeed(activeExcerpt.tokens, activeExcerpt.id));
  }, [activeExcerpt, isClient]);

  const checkMatch = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) {
      setMatches((prev) => {
        const next = new Set(prev);
        next.add(sourceId);
        return next;
      });
      setSelectedSource(null);
      setSelectedTarget(null);
      setWrongAttempt(false);
    } else {
      setWrongAttempt(true);
      setTimeout(() => {
        setWrongAttempt(false);
        setSelectedSource(null);
        setSelectedTarget(null);
      }, 600);
    }
  };

  const handleSourceClick = (id: string) => {
    if (matches.has(id)) return;
    if (selectedSource === id) {
      setSelectedSource(null);
      return;
    }
    setSelectedSource(id);
    if (selectedTarget) {
      checkMatch(id, selectedTarget);
    }
  };

  const handleTargetClick = (id: string) => {
    if (matches.has(id)) return;
    if (selectedTarget === id) {
      setSelectedTarget(null);
      return;
    }
    setSelectedTarget(id);
    if (selectedSource) {
      checkMatch(selectedSource, id);
    }
  };

  const totalTokens = activeExcerpt.tokens.length;
  const progress = `${matches.size}/${totalTokens}`;

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden content-visibility-auto"
      aria-labelledby="lessons-demo-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C55B]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="lessons-demo-title"
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Lessons From <span className="bg-gradient-to-r from-[#E8C55B] to-[#D4AF37] bg-clip-text text-transparent">Primary Sources</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-4">
            Match vocabulary drawn from Homer, the Psalms, and the Bhagavad-Gītā. No phrasebook filler—only manuscript-accurate text.
          </p>
          <p className="text-sm text-zinc-500">
            Choose an excerpt below and pair the original tokens with their glosses.
          </p>
        </m.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist" aria-label="Lesson excerpts">
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
          className="mb-10 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-zinc-900/90 p-6 sm:p-8 backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">Excerpt</p>
                <p className="text-sm text-zinc-300">{activeExcerpt.source.title} · {activeExcerpt.source.context}</p>
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
            <div
              className={`text-2xl sm:text-3xl lg:text-4xl text-zinc-100 leading-relaxed ${activeExcerpt.fontClass ?? "font-serif"} break-words`}
              dir={activeExcerpt.direction}
            >
              {showScriptio && activeExcerpt.scriptioText ? activeExcerpt.scriptioText : activeExcerpt.displayText}
            </div>
            <p className="text-sm text-zinc-400 italic" data-testid="lessons-translation">
              “{activeExcerpt.translation}”
            </p>
            <p className="text-xs text-zinc-500">{activeExcerpt.synopsis}</p>
          </div>
        </m.div>

        <m.div
          className="relative rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-zinc-900/90 p-6 sm:p-8 md:p-12 backdrop-blur-xl shadow-2xl shadow-[#D4AF37]/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-sm text-[#E8C55B]">
              <span className="font-semibold">Progress: {progress}</span>
              <div className="flex gap-1">
                {activeExcerpt.tokens.map((token) => (
                  <span
                    key={token.id}
                    className={`w-2 h-2 rounded-full ${matches.has(token.id) ? "bg-green-500" : "bg-zinc-700"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6 sm:mb-8 text-center px-2">
            <p className="text-zinc-400 text-xs sm:text-sm">
              Select a word in the original language, then select its English gloss to create a match.
            </p>
          </div>

          {!isClient ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {[0, 1].map((col) => (
                <div key={col} className="space-y-3">
                  <div className="h-6 bg-zinc-800/50 rounded animate-pulse w-32 mx-auto mb-4" />
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-zinc-800/50 rounded-xl animate-pulse" />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              <div className="space-y-3">
                <h3 className="text-xs text-zinc-500 uppercase tracking-wider text-center">{activeExcerpt.language}</h3>
                {activeExcerpt.tokens.map((token) => {
                  const isMatched = matches.has(token.id);
                  const variant = isMatched
                    ? "border-green-500/70 bg-green-500/10 text-green-200"
                    : selectedSource === token.id
                    ? "border-[#E8C55B] bg-[#E8C55B]/10 text-white"
                    : "border-zinc-700 bg-zinc-900/40 text-zinc-200 hover:border-[#E8C55B]/40";
                  return (
                    <m.button
                      key={token.id}
                      onClick={() => handleSourceClick(token.id)}
                      disabled={isMatched}
                      className={`w-full p-4 rounded-xl border-2 transition-all min-h-[56px] ${variant}`}
                      whileHover={shouldReduceMotion ? {} : { scale: isMatched ? 1 : 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      dir={activeExcerpt.direction}
                      style={{ color: isMatched ? undefined : token.color }}
                    >
                      <div className={`${activeExcerpt.fontClass ?? "font-serif"} text-lg leading-tight`}>
                        {token.text}
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-1">{token.lemma}</div>
                    </m.button>
                  );
                })}
              </div>

              <m.div
                className="space-y-3"
                animate={wrongAttempt ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xs text-zinc-500 uppercase tracking-wider text-center">Gloss & context</h3>
                {shuffledTargets.map((token) => {
                  const isMatched = matches.has(token.id);
                  const variant = isMatched
                    ? "border-green-500/70 bg-green-500/10 text-green-200"
                    : selectedTarget === token.id
                    ? "border-[#3b82f6] bg-[#3b82f6]/10 text-white"
                    : "border-zinc-700 bg-zinc-900/40 text-zinc-200 hover:border-[#3b82f6]/40";
                  return (
                    <m.button
                      key={`target-${token.id}`}
                      onClick={() => handleTargetClick(token.id)}
                      disabled={isMatched}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left min-h-[56px] ${variant}`}
                      whileHover={shouldReduceMotion ? {} : { scale: isMatched ? 1 : 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="text-base font-semibold text-zinc-100">{token.definition}</div>
                      <div className="text-[11px] text-zinc-500 mt-1">{token.morphology}</div>
                      {token.notes ? (
                        <div className="text-[11px] text-zinc-500">{token.notes}</div>
                      ) : null}
                    </m.button>
                  );
                })}
              </m.div>
            </div>
          )}
        </m.div>
      </div>
    </section>
  );
}
