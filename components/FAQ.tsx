"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  const faqs: FAQItem[] = [
    {
      question: "Is PRAVIEL really 100% free?",
      answer: "Yes! You can start learning immediately with FREE access using our provided API key. No signup required, no credit card needed. Just click and start reading ancient texts. PRAVIEL is donation-supported—if you find it valuable, please consider supporting us to keep it free for everyone."
    },
    {
      question: "What is 'Bring Your Own Key' (BYOK)?",
      answer: "BYOK is optional for power users. If you want unlimited AI lessons or prefer to use your own API keys (OpenAI, Anthropic, Google), you can. But most users just use our free shared access. You can also use the Echo provider completely offline—no API key needed at all."
    },
    {
      question: "What devices does PRAVIEL support?",
      answer: "Currently: Web (all modern browsers) and Desktop (Windows, macOS, Linux). Mobile apps for iOS and Android are in development. Sign up for the waitlist to get notified when they launch."
    },
    {
      question: "Do I need to know programming to use PRAVIEL?",
      answer: "No! While BYOK requires getting an API key (which we guide you through step-by-step), you don't need any programming knowledge. The app is designed for language learners—scholars, students, and enthusiasts—not developers."
    },
    {
      question: "How accurate is the linguistic data?",
      answer: "Extremely accurate. Every definition and grammar rule comes from authoritative academic sources: Perseus Digital Library (Tufts), LSJ Lexicon (Oxford), Smyth's Greek Grammar, TLA Berlin for Egyptian, ORACC for Mesopotamian languages. We use AI to explain this data, never to invent it. Zero hallucinations on grammar."
    },
    {
      question: "Can I really learn ancient languages without a teacher?",
      answer: "PRAVIEL is a powerful tool, but works best alongside structured study. Think of it as a supercharged textbook with instant feedback, morphological analysis, and conversational practice. Many users pair it with university courses, online classes, or traditional grammar books."
    },
    {
      question: "Which language should I start with?",
      answer: "Most popular: Classical Latin (foundation for Romance languages and English grammar), Koine Greek (New Testament), Classical Greek (Homer, Plato), and Biblical Hebrew (Torah). Choose based on your interests—whether that's theology, classics, philosophy, or linguistics."
    },
    {
      question: "How is this different from popular language apps?",
      answer: "Popular language apps focus on modern travel languages with gamified baby phrases. PRAVIEL focuses on ancient languages with authentic primary texts (Iliad, Aeneid, Dead Sea Scrolls) and research-grade accuracy. We're built for scholars, theologians, and serious language enthusiasts—not tourists."
    },
    {
      question: "Can I contribute to PRAVIEL?",
      answer: "Yes! PRAVIEL is open-source. We welcome contributions: code improvements, linguistic data validation, documentation, translations, and bug reports. Check our GitHub repo and join our Discord community."
    },
    {
      question: "Will my progress sync across devices?",
      answer: "Not yet, but it's coming. Currently, progress is stored locally on your device. Cloud sync with encrypted backups is planned for a future release."
    }
  ];

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden"
      aria-labelledby="faq-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CD5C5C]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="faq-title"
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Frequently Asked <span className="bg-gradient-to-r from-[#E8C55B] to-[#CD5C5C] bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-zinc-300">
            Everything you need to know about learning ancient languages with PRAVIEL
          </p>
        </m.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <m.div
                key={idx}
                className="relative rounded-xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/90 to-zinc-900/60 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={shouldReduceMotion ? {} : { borderColor: "rgba(212, 175, 55, 0.3)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="text-lg font-semibold text-white pr-8">
                    {faq.question}
                  </span>
                  <m.div
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-4 h-4 text-[#E8C55B]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </m.div>
                </button>

                <m.div
                  id={`faq-answer-${idx}`}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </m.div>
              </m.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <m.div
          className="mt-16 text-center p-8 rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/5 to-[#3b82f6]/5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-zinc-400 mb-6">
            Join our Discord community, reach out directly, or support our mission
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <m.a
              href="https://discord.gg/fMkF4Yza6B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white font-semibold rounded-full hover:bg-[#4752C4] transition-all"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord
            </m.a>
            <m.a
              href="/fund"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A572] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/40 transition-all"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Support Us
            </m.a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
