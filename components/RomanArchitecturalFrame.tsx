"use client";

import { type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

interface RomanArchitecturalFrameProps {
  children: ReactNode;
  className?: string;
  showColumns?: boolean;
}

/**
 * Roman Architectural Frame Component
 * Wraps content in a Roman-inspired architectural frame with columns and arches
 * GPU-accelerated animations with accessibility support
 */
export default function RomanArchitecturalFrame({
  children,
  className = "",
  showColumns = true,
}: RomanArchitecturalFrameProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={`roman-frame relative ${className}`}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.8,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {/* Roman arch top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" aria-hidden="true">
        <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
          <defs>
            <linearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CD5C5C" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B3A3A" stopOpacity="0.8" />
            </linearGradient>
            <filter id="archShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.4" />
            </filter>
          </defs>
          <path
            d="M10 90 L10 50 Q10 10, 50 10 L130 10 Q170 10, 170 50 L170 90"
            stroke="url(#archGradient)"
            strokeWidth="3"
            fill="rgba(205, 92, 92, 0.1)"
            filter="url(#archShadow)"
          />
          <path
            d="M20 90 L20 50 Q20 20, 50 20 L130 20 Q160 20, 160 50 L160 90"
            stroke="#FFE1B4"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          {/* Keystone */}
          <rect x="85" y="8" width="10" height="15" fill="#CD5C5C" opacity="0.8" />
          <rect x="84" y="7" width="12" height="2" fill="#FFE1B4" opacity="0.5" />
        </svg>
      </div>

      {/* Left column */}
      {showColumns && (
        <m.div
          className="absolute left-0 top-0 bottom-0 w-16 hidden md:flex flex-col items-center"
          aria-hidden="true"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Capital */}
          <div className="w-full h-16 bg-gradient-to-b from-[#CD5C5C]/60 to-[#8B3A3A]/80 rounded-t-lg relative">
            <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-transparent via-[#FFE1B4]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#FFE1B4]/20" />
          </div>

          {/* Shaft */}
          <div className="flex-1 w-10 bg-gradient-to-r from-[#8B3A3A]/50 to-[#CD5C5C]/50 relative">
            {/* Fluting lines */}
            <div className="absolute inset-y-0 left-1/4 w-px bg-[#FFE1B4]/10" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-[#FFE1B4]/15" />
            <div className="absolute inset-y-0 left-3/4 w-px bg-[#FFE1B4]/10" />
          </div>

          {/* Base */}
          <div className="w-full h-12 bg-gradient-to-t from-[#CD5C5C]/70 to-[#8B3A3A]/80 rounded-b-lg relative">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#FFE1B4]/25" />
          </div>
        </m.div>
      )}

      {/* Right column */}
      {showColumns && (
        <m.div
          className="absolute right-0 top-0 bottom-0 w-16 hidden md:flex flex-col items-center"
          aria-hidden="true"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Capital */}
          <div className="w-full h-16 bg-gradient-to-b from-[#CD5C5C]/60 to-[#8B3A3A]/80 rounded-t-lg relative">
            <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-transparent via-[#FFE1B4]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#FFE1B4]/20" />
          </div>

          {/* Shaft */}
          <div className="flex-1 w-10 bg-gradient-to-l from-[#8B3A3A]/50 to-[#CD5C5C]/50 relative">
            {/* Fluting lines */}
            <div className="absolute inset-y-0 left-1/4 w-px bg-[#FFE1B4]/10" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-[#FFE1B4]/15" />
            <div className="absolute inset-y-0 left-3/4 w-px bg-[#FFE1B4]/10" />
          </div>

          {/* Base */}
          <div className="w-full h-12 bg-gradient-to-t from-[#CD5C5C]/70 to-[#8B3A3A]/80 rounded-b-lg relative">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#FFE1B4]/25" />
          </div>
        </m.div>
      )}

      {/* Main content area with Roman border */}
      <div className={`relative ${showColumns ? "md:mx-20" : ""} border-2 border-[#CD5C5C]/30 rounded-lg p-8 bg-gradient-to-br from-[#1a0a0a]/80 to-[#0a0a0a]/95 backdrop-blur-sm`}>
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#FFE1B4]/40" aria-hidden="true" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#FFE1B4]/40" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#FFE1B4]/40" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#FFE1B4]/40" aria-hidden="true" />

        {children}
      </div>

      {/* Bottom foundation */}
      <div className="mt-2 h-4 bg-gradient-to-b from-[#8B3A3A]/30 to-transparent rounded-b-lg" aria-hidden="true" />
    </m.div>
  );
}
