"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

export default function ComparisonTable() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  const features = [
    { name: "Ancient language support", traditional: "✓ (limited)", apps: "✗", praviel: "✓ 46 languages" },
    { name: "Authentic primary texts", traditional: "✓", apps: "✗", praviel: "✓ 460+ texts" },
    { name: "Research-grade accuracy", traditional: "✓", apps: "✗", praviel: "✓ Zero hallucinations" },
    { name: "Interactive learning", traditional: "✗", apps: "✓", praviel: "✓" },
    { name: "Instant morphological analysis", traditional: "✗", apps: "✗", praviel: "✓" },
    { name: "AI-powered lessons", traditional: "✗", apps: "Partial", praviel: "✓ GPT-5, Claude 4.5" },
    { name: "Works offline", traditional: "✓", apps: "Partial", praviel: "✓ Full offline mode" },
    { name: "Privacy-first (BYOK)", traditional: "N/A", apps: "✗", praviel: "✓" },
    { name: "Open source", traditional: "✗", apps: "✗", praviel: "✓ ELv2" },
    { name: "Cost", traditional: "$50-200/book", apps: "$10-30/month", praviel: "Free + optional AI costs" },
  ];

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden"
      aria-labelledby="comparison-title"
    >
      {/* Background gradient */}
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
            id="comparison-title"
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Why <span className="bg-gradient-to-r from-[#E8C55B] to-[#3b82f6] bg-clip-text text-transparent">PRAVIEL</span>?
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto">
            The first platform to combine scholarly rigor with modern AI for ancient languages
          </p>
        </m.div>

        {/* Comparison Table */}
        <m.div
          className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/90 to-zinc-900/60 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-3 sm:p-4 md:p-6 text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Feature
                </th>
                <th className="text-center p-3 sm:p-4 md:p-6 text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Traditional<br/><span className="text-[10px] sm:text-xs font-normal normal-case">(Textbooks)</span>
                </th>
                <th className="text-center p-3 sm:p-4 md:p-6 text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Language Apps<br/><span className="text-[10px] sm:text-xs font-normal normal-case">(Popular Apps)</span>
                </th>
                <th className="text-center p-3 sm:p-4 md:p-6 text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#D4AF37]/10 to-[#3b82f6]/10 border-l-2 border-[#D4AF37]">
                  <span className="text-[#E8C55B] text-sm sm:text-base">PRAVIEL</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <m.tr
                  key={feature.name}
                  className="border-b border-zinc-800/50 hover:bg-white/[0.02] transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + (idx * 0.05) }}
                >
                  <td className="p-3 sm:p-4 md:p-6 text-xs sm:text-sm font-medium text-zinc-300">
                    {feature.name}
                  </td>
                  <td className="text-center p-3 sm:p-4 md:p-6 text-xs sm:text-sm text-zinc-400">
                    {feature.traditional}
                  </td>
                  <td className="text-center p-3 sm:p-4 md:p-6 text-xs sm:text-sm text-zinc-400">
                    {feature.apps}
                  </td>
                  <td className="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-r from-[#D4AF37]/5 to-[#3b82f6]/5 border-l-2 border-[#D4AF37]">
                    <span className="text-xs sm:text-sm font-semibold text-[#E8C55B]">
                      {feature.praviel}
                    </span>
                  </td>
                </m.tr>
              ))}
            </tbody>
          </table>
        </m.div>

        {/* Bottom insight */}
        <m.div
          className="mt-12 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 text-center backdrop-blur-sm">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-sm font-semibold text-white mb-2">Traditional Methods</h3>
            <p className="text-xs text-zinc-500">
              Scholarly but slow. Physical dictionaries, no instant feedback.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 text-center backdrop-blur-sm">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="text-sm font-semibold text-white mb-2">Language Apps</h3>
            <p className="text-xs text-zinc-500">
              Fun but superficial. Baby phrases, not authentic texts.
            </p>
          </div>
          <div className="rounded-xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-[#3b82f6]/10 p-6 text-center backdrop-blur-sm ring-1 ring-[#D4AF37]/20">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-sm font-semibold text-[#E8C55B] mb-2">PRAVIEL</h3>
            <p className="text-xs text-zinc-400">
              Scholarly accuracy meets modern UX. Best of both worlds.
            </p>
          </div>
        </m.div>

        {/* CTA */}
        <m.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
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
            Start reading ancient texts in 10 seconds • No barriers
          </p>
        </m.div>
      </div>
    </section>
  );
}
