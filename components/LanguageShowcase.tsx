"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

interface Language {
  name: string;
  nativeName: string;
  sample: string;
  translation: string;
  script: string;
  color: string;
}

const languages: Language[] = [
  {
    name: "Akkadian",
    nativeName: "𒀝𒅗𒁺𒌑",
    sample: "ana-ku šar-ru-um",
    translation: "I am the king",
    script: "Cuneiform",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Biblical Hebrew",
    nativeName: "עִבְרִית מִקְרָאִית",
    sample: "בְּרֵאשִׁית בָּרָא אֱלֹהִים",
    translation: "In the beginning God created",
    script: "Hebrew",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Koine Greek",
    nativeName: "Ἑλληνιστική Κοινή",
    sample: "Ἐν ἀρχῇ ἦν ὁ λόγος",
    translation: "In the beginning was the Word",
    script: "Greek",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Latin",
    nativeName: "Lingua Latīna",
    sample: "Veni, vidi, vici",
    translation: "I came, I saw, I conquered",
    script: "Latin",
    color: "from-red-500 to-rose-600",
  },
  {
    name: "Old Church Slavonic",
    nativeName: "Словѣньскъ",
    sample: "Искони бѣ Слово",
    translation: "In the beginning was the Word",
    script: "Cyrillic",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function LanguageShowcase() {
  const [selectedLang, setSelectedLang] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden"
      aria-labelledby="language-showcase-title"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1e40af]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="language-showcase-title"
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#E8C55B] via-[#3b82f6] to-[#E8DCC4] bg-clip-text text-transparent mb-4"
          >
            Experience Ancient Languages
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Interactive preview of the languages you'll master with PRAVIEL's AI-powered platform
          </p>
        </m.div>

        {/* Language selector tabs */}
        <m.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="tablist"
          aria-label="Ancient languages"
        >
          {languages.map((lang, idx) => (
            <m.button
              key={lang.name}
              onClick={() => setSelectedLang(idx)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedLang === idx
                  ? "bg-gradient-to-r text-white shadow-lg shadow-[#D4AF37]/30 " + lang.color
                  : "bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
              }`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: shouldReduceMotion ? "auto" : "transform" }}
              role="tab"
              aria-selected={selectedLang === idx}
              aria-controls={`language-panel-${idx}`}
            >
              {lang.name}
            </m.button>
          ))}
        </m.div>

        {/* Language display panel */}
        <m.div
          key={selectedLang}
          className="relative rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-900/90 p-8 sm:p-12 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          role="tabpanel"
          id={`language-panel-${selectedLang}`}
          aria-labelledby={`language-tab-${selectedLang}`}
        >
          {/* Decorative corner elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-lg" />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Language info */}
            <div className="space-y-6">
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-sm text-[#E8C55B] font-semibold mb-2 uppercase tracking-wider">
                  {languages[selectedLang].script} Script
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {languages[selectedLang].name}
                </h3>
                <div className="text-2xl text-zinc-400 font-serif">
                  {languages[selectedLang].nativeName}
                </div>
              </m.div>

              <m.div
                className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              <m.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Sample Text:</div>
                  <div className="text-2xl font-serif text-zinc-200 leading-relaxed">
                    {languages[selectedLang].sample}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-zinc-500 mb-1">Translation:</div>
                  <div className="text-lg text-zinc-300 italic">
                    "{languages[selectedLang].translation}"
                  </div>
                </div>
              </m.div>

              <m.div
                className="flex items-center gap-2 text-sm text-[#3b82f6]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>AI-powered pronunciation feedback available</span>
              </m.div>
            </div>

            {/* Right side - Visual representation */}
            <m.div
              className="relative aspect-square rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Animated gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${languages[selectedLang].color} opacity-10 blur-3xl`}
              />

              {/* Large script display */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <m.div
                  className="text-6xl sm:text-7xl lg:text-8xl font-serif text-zinc-300/80 text-center leading-relaxed"
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {languages[selectedLang].nativeName.charAt(0)}
                </m.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            </m.div>
          </div>

          {/* Bottom CTA */}
          <m.div
            className="mt-8 pt-8 border-t border-zinc-800 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-zinc-500 text-sm mb-4">
              Ready to start learning {languages[selectedLang].name}?
            </p>
            <m.a
              href="https://praviel.com/fund"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A572] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Waitlist
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </m.a>
          </m.div>
        </m.div>

        {/* Progress indicator */}
        <m.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          role="presentation"
        >
          {languages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLang(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                selectedLang === idx ? "bg-[#D4AF37] w-8" : "bg-zinc-700 hover:bg-zinc-600"
              }`}
              aria-label={`View ${languages[idx].name}`}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
}
