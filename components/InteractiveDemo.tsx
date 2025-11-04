"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

interface GreekWord {
  text: string;
  lemma: string;
  standardEdition: string;
  pos: string;
  morph: string;
  definition: string;
  color: string;
}

export default function InteractiveDemo() {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [showScriptioContinua, setShowScriptioContinua] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  // Demo text: First line of the Iliad (Classical Greek: capitals, no polytonic marks per LANGUAGE_WRITING_RULES.md)
  const words: GreekWord[] = [
    { text: "ΜΗΝΙΝ", lemma: "ΜΗΝΙΣ", standardEdition: "Μῆνιν / μῆνις", pos: "Noun", morph: "Accusative Singular Feminine", definition: "wrath, anger, especially of the gods", color: "#E8C55B" },
    { text: "ΑΕΙΔΕ", lemma: "ΑΕΙΔΩ", standardEdition: "ἄειδε / ἀείδω", pos: "Verb", morph: "Present Active Imperative 2nd Singular", definition: "to sing, celebrate in song", color: "#3b82f6" },
    { text: "ΘΕΑ", lemma: "ΘΕΑ", standardEdition: "θεὰ / θεά", pos: "Noun", morph: "Vocative Singular Feminine", definition: "goddess", color: "#E8C55B" },
    { text: "ΠΗΛΗΙΑΔΕΩ", lemma: "ΠΗΛΗΙΑΔΗΣ", standardEdition: "Πηληϊάδεω / Πηληϊάδης", pos: "Adjective", morph: "Genitive Singular Masculine", definition: "son of Peleus (referring to Achilles)", color: "#CD5C5C" },
    { text: "ΑΧΙΛΗΟΣ", lemma: "ΑΧΙΛΛΕΥΣ", standardEdition: "Ἀχιλῆος / Ἀχιλλεύς", pos: "Proper Noun", morph: "Genitive Singular Masculine", definition: "Achilles", color: "#CD5C5C" },
  ];

  const scriptioContinuaText = words.map(w => w.text).join("");

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden"
      aria-labelledby="demo-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Header */}
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
            The Interactive <span className="bg-gradient-to-r from-[#E8C55B] to-[#D4AF37] bg-clip-text text-transparent">Reader</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-4">
            Tap any word below to see instant morphological analysis
          </p>
          <p className="text-sm text-zinc-500">
            One of many learning tools in the PRAVIEL platform (Lessons, Coach, Text Analysis, and more)
          </p>
        </m.div>

        {/* Interactive Demo */}
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

          {/* Text label */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Homer, Iliad 1.1
            </div>
            <button
              onClick={() => setShowScriptioContinua(!showScriptioContinua)}
              className="text-xs px-3 py-1 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-full text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {showScriptioContinua ? "Show Word Dividers" : "Show Scriptio Continua"}
            </button>
          </div>

          {/* Educational note about Classical Greek */}
          <div className="mb-6 px-4 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#E8C55B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs text-zinc-300 leading-relaxed">
                <strong className="text-[#E8C55B]">Classical Greek Authenticity:</strong> Ancient texts used capitals (Α–Ω) without accents, breathings, or spaces (<em>scriptio continua</em>). We display word dividers here for interactive learning, matching how ancient readers would mentally parse continuous text.
              </div>
            </div>
          </div>

          {/* Interactive text */}
          <div className="mb-8 text-center">
            {showScriptioContinua ? (
              /* Scriptio continua display */
              <div className="mb-6">
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#E8DCC4] leading-relaxed tracking-wider">
                  {scriptioContinuaText}
                </div>
                <div className="mt-3 text-xs text-zinc-500 italic">
                  (Authentic ancient format: continuous text, no spaces)
                </div>
              </div>
            ) : (
              /* Interactive word-by-word display */
              <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl font-serif">
                {words.map((word, idx) => (
                  <m.button
                    key={idx}
                    onClick={() => setSelectedWord(idx === selectedWord ? null : idx)}
                    className={`relative px-2 py-1 rounded-lg transition-all cursor-pointer ${
                      selectedWord === idx
                        ? "bg-white/10 shadow-lg"
                        : "hover:bg-white/5"
                    }`}
                    style={{ color: selectedWord === idx ? word.color : "#E8DCC4" }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {word.text}
                    {selectedWord === idx && (
                      <m.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </m.button>
                ))}
              </div>
            )}

            {/* Translation */}
            <m.div
              className="mt-6 text-sm text-zinc-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              "Sing, goddess, the wrath of Peleus' son Achilles"
            </m.div>
          </div>

          {/* Analysis panel */}
          <m.div
            className="min-h-[200px]"
            animate={{ height: selectedWord !== null ? "auto" : "200px" }}
            transition={{ duration: 0.3 }}
          >
            {selectedWord !== null ? (
              <m.div
                key={selectedWord}
                className="rounded-xl border border-zinc-800/50 bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Left side */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        Selected Word
                      </div>
                      <div className="text-3xl font-serif" style={{ color: words[selectedWord].color }}>
                        {words[selectedWord].text}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        Lemma (Dictionary Form)
                      </div>
                      <div className="text-xl text-zinc-200 font-serif">
                        {words[selectedWord].lemma}
                      </div>
                      <div className="text-xs text-zinc-600 mt-1">
                        Standard edition: {words[selectedWord].standardEdition}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        Part of Speech
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full text-sm text-[#E8C55B]">
                        {words[selectedWord].pos}
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        Morphology
                      </div>
                      <div className="text-sm text-zinc-300">
                        {words[selectedWord].morph}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        Definition (LSJ)
                      </div>
                      <div className="text-sm text-zinc-300 leading-relaxed">
                        {words[selectedWord].definition}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-700/50">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <svg className="w-4 h-4 text-[#E8C55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Data from Perseus Digital Library</span>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            ) : (
              <m.div
                className="h-[200px] flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-5xl mb-4 opacity-30">👆</div>
                <p className="text-zinc-400 text-sm mb-2">
                  Tap any Greek word above to see its analysis
                </p>
                <p className="text-zinc-600 text-xs">
                  This is how the interactive reader works in PRAVIEL
                </p>
              </m.div>
            )}
          </m.div>
        </m.div>

        {/* Features */}
        <m.div
          className="mt-12 grid sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-sm font-semibold text-white mb-2">Instant Analysis</h3>
            <p className="text-xs text-zinc-500">
              Tap any word for morphology, definitions, and grammar references
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-sm font-semibold text-white mb-2">Scholarly Sources</h3>
            <p className="text-xs text-zinc-500">
              All data from Perseus, LSJ, Smyth—zero AI hallucinations
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="text-sm font-semibold text-white mb-2">Works Offline</h3>
            <p className="text-xs text-zinc-500">
              All linguistic data embedded—use on a plane, no internet needed
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
            Try PRAVIEL Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </m.a>
          <p className="text-xs text-zinc-600 mt-4">
            No signup • No credit card • Access Reader, Lessons, and more in 10 seconds
          </p>
        </m.div>
      </div>
    </section>
  );
}
