"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

interface Metric {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const metrics: Metric[] = [
  {
    value: "46",
    label: "Ancient Languages",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    value: "5,000+",
    label: "Years Covered",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    value: "116K+",
    label: "LSJ Dictionary Entries",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    value: "100%",
    label: "Research-Grade Accuracy",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

export default function TractionBar() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative px-6 py-16 overflow-hidden"
      aria-label="Platform metrics"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-[#3b82f6]/5 to-[#D4AF37]/5" />

      <div className="mx-auto max-w-7xl relative z-10">
        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {metrics.map((metric, idx) => (
            <m.div
              key={metric.label}
              className="relative flex flex-col items-center text-center p-5 sm:p-6 rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm min-h-[140px] justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.05,
                      borderColor: "rgba(212, 175, 55, 0.5)",
                      transition: { duration: 0.2 },
                    }
              }
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <m.div
                className="mb-3 text-[#E8C55B]"
                animate={
                  shouldReduceMotion || !isInView
                    ? {}
                    : {
                        y: [0, -5, 0],
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.2,
                        },
                      }
                }
              >
                {metric.icon}
              </m.div>

              {/* Value */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#E8C55B] via-white to-[#E8C55B] bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm text-zinc-400 font-medium leading-tight">
                {metric.label}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#D4AF37]/30 rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#D4AF37]/30 rounded-bl-sm" />
            </m.div>
          ))}
        </m.div>

        {/* Trust badge */}
        <m.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-900/60 border border-zinc-800/50 rounded-full backdrop-blur-sm">
            <svg className="w-5 h-5 text-[#E8C55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-sm text-zinc-300">
              Built on authoritative sources: Perseus, LSJ, TLA Berlin, ORACC, CDLI
            </span>
          </div>
        </m.div>
      </div>
    </section>
  );
}
