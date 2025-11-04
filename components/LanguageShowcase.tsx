"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { languages } from "@/lib/languageData";

export default function LanguageShowcase() {
  const [selectedLang, setSelectedLang] = useState(0);
  const [showWorks, setShowWorks] = useState(false);
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

      <div className="mx-auto max-w-7xl relative z-10">
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
            46 Ancient Languages to Master
          </h2>
          <p className="text-zinc-300 text-lg max-w-3xl mx-auto mb-4">
            From Sumerian cuneiform (3100 BCE) to medieval manuscripts—comprehensive coverage of humanity's linguistic heritage.
          </p>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto">
            Learn these languages through AI-powered lessons, interactive reading, and conversational practice
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
              onClick={() => {
                setSelectedLang(idx);
                setShowWorks(false);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 min-h-[44px] ${
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
              <span className="text-xl">{lang.emoji}</span>
              <span className="text-sm sm:text-base">{lang.name}</span>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left side - Language info */}
            <div className="space-y-4 sm:space-y-6">
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-xs sm:text-sm text-[#E8C55B] font-semibold mb-2 uppercase tracking-wider">
                  {languages[selectedLang].script}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 flex items-center gap-2 sm:gap-3">
                  <span className="text-3xl sm:text-4xl md:text-5xl">{languages[selectedLang].emoji}</span>
                  {languages[selectedLang].name}
                </h3>
                <div className={`text-xl sm:text-2xl md:text-3xl text-zinc-400 mb-3 sm:mb-4 ${languages[selectedLang].fontClass || 'font-serif'} break-words`}>
                  {languages[selectedLang].nativeName}
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {languages[selectedLang].description}
                </p>
              </m.div>

              <m.div
                className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              <m.div
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div>
                  <div className="text-xs sm:text-sm text-zinc-500 mb-2">Sample Text:</div>
                  <div
                    className={`text-lg sm:text-xl md:text-2xl text-zinc-200 leading-relaxed mb-2 ${languages[selectedLang].fontClass || 'font-serif'} break-words`}
                    dir={languages[selectedLang].isRTL ? "rtl" : "ltr"}
                  >
                    {languages[selectedLang].sample}
                  </div>
                  <div className="text-sm sm:text-base text-zinc-400 italic break-words">
                    "{languages[selectedLang].translation}"
                  </div>
                </div>

                <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-lg p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider mb-1">Writing System:</div>
                  <div className="text-xs sm:text-sm text-zinc-300">
                    {languages[selectedLang].writingInfo}
                  </div>
                </div>
              </m.div>
            </div>

            {/* Right side - Available Texts */}
            <m.div
              className="relative rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 p-6 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Animated gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${languages[selectedLang].color} opacity-5 blur-3xl`}
              />

              <div className="relative z-10">
                <div className="mb-6 text-center">
                  <h4 className="text-xl font-semibold text-white mb-3">Available Texts in PRAVIEL</h4>
                  <m.button
                    onClick={() => setShowWorks(!showWorks)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A572] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/40 transition-all border-2 border-[#E8C55B]/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-base">{showWorks ? "Hide" : "View"} Top 10 Works</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${showWorks ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </m.button>
                  <p className="text-xs text-zinc-500 mt-2">
                    {showWorks ? "Authentic ancient literature available in the app" : "Discover the primary texts you'll read"}
                  </p>
                </div>

                {showWorks ? (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    {languages[selectedLang].topTenWorks.map((work, idx) => (
                      <m.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/60 transition-colors border border-zinc-700/30"
                      >
                        <span className="text-[#E8C55B] font-semibold text-sm mt-0.5">{idx + 1}.</span>
                        <span className="text-zinc-300 text-sm leading-relaxed">{work}</span>
                      </m.div>
                    ))}
                    <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg">
                      <p className="text-xs text-zinc-400 text-center">
                        These texts are fully loaded in the PRAVIEL app for reading and learning
                      </p>
                    </div>
                  </m.div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 opacity-50">{languages[selectedLang].emoji}</div>
                    <p className="text-zinc-400 text-sm mb-4">
                      Click "View Top 10" to see the primary texts available in PRAVIEL
                    </p>
                    <p className="text-zinc-500 text-xs">
                      Learn from authentic ancient literature, not baby phrases
                    </p>
                  </div>
                )}
              </div>
            </m.div>
          </div>

          {/* Bottom info */}
          <m.div
            className="mt-8 pt-8 border-t border-zinc-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <svg className="w-5 h-5 text-[#E8C55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Research-grade morphological analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <svg className="w-5 h-5 text-[#E8C55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Authentic primary texts</span>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <m.a
                  href="https://app.praviel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A572] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </m.a>
              </div>
            </div>
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
              className={`rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${
                selectedLang === idx ? "bg-transparent" : "bg-transparent"
              }`}
              aria-label={`View ${languages[idx].name}`}
            >
              <span className={`block rounded-full transition-all ${
                selectedLang === idx ? "bg-[#D4AF37] w-8 h-2" : "bg-zinc-700 hover:bg-zinc-600 w-2 h-2"
              }`} />
            </button>
          ))}
        </m.div>
      </div>
    </section>
  );
}
