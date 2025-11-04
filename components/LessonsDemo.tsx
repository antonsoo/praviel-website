"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

interface VocabWord {
  id: number;
  greek: string;
  english: string;
  context: string;
}

export default function LessonsDemo() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  // Vocabulary from Iliad 1.1-2 (Classical Greek: capitals, no polytonic marks)
  const words: VocabWord[] = [
    { id: 1, greek: "ΜΗΝΙΣ", english: "wrath, anger", context: "especially of the gods" },
    { id: 2, greek: "ΑΕΙΔΩ", english: "to sing, celebrate", context: "in song or poetry" },
    { id: 3, greek: "ΘΕΑ", english: "goddess", context: "divine female being" },
    { id: 4, greek: "ΑΧΙΛΛΕΥΣ", english: "Achilles", context: "hero of the Iliad" },
  ];

  const [selectedGreek, setSelectedGreek] = useState<number | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
  const [matches, setMatches] = useState<Set<number>>(new Set());
  const [wrongAttempt, setWrongAttempt] = useState(false);

  // Shuffle English words using Fisher-Yates algorithm (client-side only)
  const [shuffledEnglish, setShuffledEnglish] = useState<VocabWord[]>([]);
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    // Fisher-Yates shuffle algorithm - deterministic and more efficient
    const shuffleArray = <T,>(array: T[]): T[] => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    setShuffledEnglish(shuffleArray(words));
    setIsClient(true);
  }, []);

  const handleGreekClick = (id: number) => {
    if (matches.has(id)) return; // Already matched

    if (selectedGreek === id) {
      setSelectedGreek(null); // Deselect
    } else {
      setSelectedGreek(id);

      // If English word already selected, check for match
      if (selectedEnglish !== null) {
        checkMatch(id, selectedEnglish);
      }
    }
  };

  const handleEnglishClick = (id: number) => {
    if (matches.has(id)) return; // Already matched

    if (selectedEnglish === id) {
      setSelectedEnglish(null); // Deselect
    } else {
      setSelectedEnglish(id);

      // If Greek word already selected, check for match
      if (selectedGreek !== null) {
        checkMatch(selectedGreek, id);
      }
    }
  };

  const checkMatch = (greekId: number, englishId: number) => {
    if (greekId === englishId) {
      // Correct match!
      setMatches(new Set([...matches, greekId]));
      setSelectedGreek(null);
      setSelectedEnglish(null);
      setWrongAttempt(false);
    } else {
      // Wrong match - shake animation
      setWrongAttempt(true);
      setTimeout(() => {
        setWrongAttempt(false);
        setSelectedGreek(null);
        setSelectedEnglish(null);
      }, 600);
    }
  };

  const allMatched = matches.size === words.length;
  const progress = `${matches.size}/${words.length}`;

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden"
      aria-labelledby="lessons-demo-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C55B]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Header */}
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
            AI-Generated <span className="bg-gradient-to-r from-[#E8C55B] to-[#D4AF37] bg-clip-text text-transparent">Lessons</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-4">
            Learn vocabulary from authentic ancient texts—not "The apple is red"
          </p>
          <p className="text-sm text-zinc-500">
            Try matching these words from Homer's Iliad (Book 1, Lines 1-2)
          </p>
        </m.div>

        {/* Lesson Demo Card */}
        <m.div
          className="relative rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-zinc-900/90 p-8 sm:p-12 backdrop-blur-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-lg" />

          {/* Progress indicator */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-sm text-[#E8C55B]">
              <span className="font-semibold">Progress: {progress}</span>
              <div className="flex gap-1">
                {Array.from({ length: words.length }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      matches.has(words[i].id) ? "bg-green-500" : "bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Instruction */}
          <div className="mb-6 sm:mb-8 text-center px-2">
            <p className="text-zinc-400 text-xs sm:text-sm">
              Click on a Greek word, then click on its English meaning to match
            </p>
          </div>

          {/* Matching Game */}
          {!isClient ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* Skeleton loader */}
              <div className="space-y-3">
                <div className="h-6 bg-zinc-800/50 rounded animate-pulse w-32 mx-auto mb-4" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-zinc-800/50 rounded-xl animate-pulse" />
                ))}
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-zinc-800/50 rounded animate-pulse w-32 mx-auto mb-4" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-zinc-800/50 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Greek words column */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-3 sm:mb-4 text-center">
                Classical Greek
              </h3>
              {words.map((word) => (
                <m.button
                  key={`greek-${word.id}`}
                  onClick={() => handleGreekClick(word.id)}
                  disabled={matches.has(word.id)}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all min-h-[56px] ${
                    matches.has(word.id)
                      ? "bg-green-500/20 border-green-500/50 text-green-300 cursor-default"
                      : selectedGreek === word.id
                      ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg"
                      : "bg-zinc-800/50 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600"
                  }`}
                  animate={
                    wrongAttempt && selectedGreek === word.id
                      ? { x: [-10, 10, -10, 10, 0] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                  whileHover={
                    !matches.has(word.id) && !shouldReduceMotion ? { scale: 1.02, y: -2 } : {}
                  }
                  whileTap={!matches.has(word.id) ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-serif">{word.greek}</span>
                    {matches.has(word.id) && (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </m.button>
              ))}
            </div>

            {/* English meanings column */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-3 sm:mb-4 text-center">
                English Meaning
              </h3>
              {shuffledEnglish.map((word) => (
                <m.button
                  key={`english-${word.id}`}
                  onClick={() => handleEnglishClick(word.id)}
                  disabled={matches.has(word.id)}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all min-h-[56px] ${
                    matches.has(word.id)
                      ? "bg-green-500/20 border-green-500/50 text-green-300 cursor-default"
                      : selectedEnglish === word.id
                      ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg"
                      : "bg-zinc-800/50 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600"
                  }`}
                  animate={
                    wrongAttempt && selectedEnglish === word.id
                      ? { x: [-10, 10, -10, 10, 0] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                  whileHover={
                    !matches.has(word.id) && !shouldReduceMotion ? { scale: 1.02, y: -2 } : {}
                  }
                  whileTap={!matches.has(word.id) ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-sm sm:text-base font-medium">{word.english}</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">{word.context}</div>
                    </div>
                    {matches.has(word.id) && (
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </m.button>
              ))}
            </div>
          </div>
          )}

          {/* Completion message */}
          {allMatched && (
            <m.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">🎉</div>
                <div>
                  <div className="text-xl font-bold text-green-300 mb-1">Perfect!</div>
                  <div className="text-sm text-zinc-300">
                    You've learned 4 words from Homer's <em>Iliad</em>. In the app, you'll have access to thousands more from authentic ancient texts.
                  </div>
                </div>
              </div>
            </m.div>
          )}

          {/* Educational note */}
          <div className="mt-6 pt-6 border-t border-zinc-800">
            <div className="flex items-start gap-2 text-xs text-zinc-400">
              <svg className="w-4 h-4 text-[#E8C55B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="leading-relaxed">
                <strong className="text-[#E8C55B]">AI-Powered Lesson Generation:</strong> This vocabulary lesson was generated from the first two lines of Homer's Iliad. In PRAVIEL, you can generate lessons from ANY ancient text—grammar drills, word order exercises, translation practice, and much more.
              </p>
            </div>
          </div>
        </m.div>

        {/* Features */}
        <m.div
          className="mt-12 grid sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-sm font-semibold text-white mb-2">From Real Texts</h3>
            <p className="text-xs text-zinc-500">
              Every lesson uses authentic ancient literature, not artificial examples
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-sm font-semibold text-white mb-2">Adaptive Difficulty</h3>
            <p className="text-xs text-zinc-500">
              AI adjusts to your level—beginner to advanced
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
            <div className="text-3xl mb-3">♾️</div>
            <h3 className="text-sm font-semibold text-white mb-2">Unlimited Lessons</h3>
            <p className="text-xs text-zinc-500">
              Generate lessons from any passage you're studying
            </p>
          </div>
        </m.div>

        {/* CTA */}
        <m.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <m.a
            href="https://app.praviel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A572] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/40 transition-all"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Learning Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </m.a>
          <p className="text-xs text-zinc-600 mt-4">
            No signup • Lessons + Reader + Coach + more in 10 seconds
          </p>
        </m.div>
      </div>
    </section>
  );
}
