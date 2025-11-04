"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

export default function WhyPRAVIEL() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  const problems = [
    {
      original: "Greek: ΕΡΩΣ, ΦΙΛΙΑ, ΑΓΑΠΗ, ΣΤΟΡΓΗ",
      originalNote: "(ἔρως, φιλία, ἀγάπη, στοργή in standard editions)",
      translation: "English: love, love, love, love",
      lost: "Four distinct concepts collapsed to one word"
    },
    {
      original: "Homer's dactylic hexameter",
      originalNote: null,
      translation: "Prose paragraphs",
      lost: "Rhythm and musicality completely gone"
    },
    {
      original: "Hebrew wordplay in Genesis",
      originalNote: null,
      translation: "Footnotes explaining the pun",
      lost: "Instant understanding becomes academic exercise"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden"
      aria-labelledby="why-praviel-title"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CD5C5C]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="why-praviel-title"
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Every Translation is an <span className="bg-gradient-to-r from-[#CD5C5C] via-[#E8C55B] to-[#CD5C5C] bg-clip-text text-transparent">Interpretation</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            When you read ancient texts in translation, you're not reading the author—
            <span className="text-white font-medium"> you're reading the translator's choices</span>.
            Critical nuances disappear. Context gets flattened. Meaning shifts.
          </p>
        </m.div>

        {/* Problem examples */}
        <m.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {problems.map((problem, idx) => (
            <m.div
              key={idx}
              className="relative p-4 sm:p-6 rounded-xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.03,
                      borderColor: "rgba(205, 92, 92, 0.5)",
                      transition: { duration: 0.2 },
                    }
              }
              whileTap={{ scale: 0.98 }}
            >
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Original:</div>
                  <div className="text-xs sm:text-sm font-medium text-zinc-200 break-words">{problem.original}</div>
                  {problem.originalNote && (
                    <div className="text-[10px] sm:text-xs text-zinc-600 mt-1 italic break-words">{problem.originalNote}</div>
                  )}
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Translation:</div>
                  <div className="text-xs sm:text-sm text-zinc-400 break-words">{problem.translation}</div>
                </div>
                <div className="pt-2 border-t border-zinc-800">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#CD5C5C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div className="text-[10px] sm:text-xs text-zinc-500 italic">{problem.lost}</div>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* The Solution */}
        <m.div
          className="relative p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 via-zinc-900/50 to-[#3b82f6]/10 border border-[#D4AF37]/30 backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/40" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/40" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/40" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/40" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: The Solution */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full text-sm text-[#E8C55B] mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-semibold">The Solution</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Learn the Original Language
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                PRAVIEL teaches you ancient languages through <span className="text-white font-medium">AI-generated lessons from real texts</span>,
                interactive reading with scholarly analysis, and conversational practice—so you can read Latin, Greek, Hebrew, Sanskrit, and Egyptian
                <span className="text-white font-medium"> exactly as the authors wrote them</span>.
              </p>

              <div className="space-y-3">
                {[
                  "Read texts as authors wrote them",
                  "Grasp jokes, wordplay, and cultural references",
                  "Access primary sources for research",
                  "Understand nuances lost in translation"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#E8C55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Differentiator */}
            <div className="lg:pl-8">
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#D4AF37]/30 to-[#3b82f6]/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#E8C55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Zero AI Hallucinations
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Every definition and grammar rule comes from authoritative academic sources:
                      Perseus Digital Library, LSJ Lexicon, TLA Berlin. We use AI to explain
                      scholarly data—never to invent it.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/50">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#E8C55B] mb-1">116,502</div>
                      <div className="text-xs text-zinc-500">LSJ Greek entries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#E8C55B] mb-1">460+</div>
                      <div className="text-xs text-zinc-500">Authentic texts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
