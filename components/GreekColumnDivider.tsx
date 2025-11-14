"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

interface GreekColumnDividerProps {
  className?: string;
}

/**
 * Greek Column Divider Component
 * Displays animated Doric columns as section dividers
 * Inspired by classical Greek architecture
 */
export default function GreekColumnDivider({ className = "" }: GreekColumnDividerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={`relative w-full overflow-hidden py-8 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
      aria-hidden="true"
    >
      {/* Marble base */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900/30 to-transparent" />

      {/* Greek key pattern border */}
      <div className="relative mx-auto max-w-6xl px-4">
        <svg
          className="w-full"
          height="80"
          viewBox="0 0 1200 80"
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: "translateZ(0)" }}
        >
          <defs>
            {/* Greek key pattern for border */}
            <pattern id="greek-key-pattern-divider" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M0 2 L18 2 L18 18 L42 18 L42 6 L28 6 L28 12 L22 12 L22 22 L60 22"
                fill="none"
                stroke="rgba(147, 197, 253, 0.4)"
                strokeWidth="1.6"
                strokeLinecap="square"
              />
            </pattern>

            {/* Column capital gradient */}
            <linearGradient id="column-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(245, 245, 240, 0.3)" />
              <stop offset="50%" stopColor="rgba(147, 197, 253, 0.25)" />
              <stop offset="100%" stopColor="rgba(30, 58, 138, 0.2)" />
            </linearGradient>

            {/* Marble texture */}
            <filter id="marble-texture">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.008 0.012"
                numOctaves="4"
                seed="2"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 0.08 0"
                result="opacity"
              />
              <feBlend in="SourceGraphic" in2="opacity" mode="overlay" />
            </filter>
          </defs>

          {/* Doric column on left */}
          <g transform="translate(80, 15)">
            {/* Capital (top) */}
            <rect x="-15" y="0" width="30" height="8" fill="url(#column-gradient)" filter="url(#marble-texture)" />
            <rect x="-12" y="8" width="24" height="4" fill="rgba(147, 197, 253, 0.2)" />

            {/* Shaft with fluting */}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={`left-flute-${i}`}
                x={-10 + i * 5}
                y="12"
                width="4"
                height="50"
                fill="rgba(147, 197, 253, 0.18)"
                opacity={0.5 + i * 0.1}
              />
            ))}

            {/* Base */}
            <rect x="-12" y="62" width="24" height="6" fill="rgba(147, 197, 253, 0.25)" />
            <rect x="-15" y="68" width="30" height="4" fill="url(#column-gradient)" filter="url(#marble-texture)" />
          </g>

          {/* Greek key pattern in center */}
          <rect x="200" y="30" width="800" height="20" fill="url(#greek-key-pattern-divider)" opacity="0.6" />

          {/* Doric column on right */}
          <g transform="translate(1120, 15)">
            {/* Capital (top) */}
            <rect x="-15" y="0" width="30" height="8" fill="url(#column-gradient)" filter="url(#marble-texture)" />
            <rect x="-12" y="8" width="24" height="4" fill="rgba(147, 197, 253, 0.2)" />

            {/* Shaft with fluting */}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={`right-flute-${i}`}
                x={-10 + i * 5}
                y="12"
                width="4"
                height="50"
                fill="rgba(147, 197, 253, 0.18)"
                opacity={0.5 + i * 0.1}
              />
            ))}

            {/* Base */}
            <rect x="-12" y="62" width="24" height="6" fill="rgba(147, 197, 253, 0.25)" />
            <rect x="-15" y="68" width="30" height="4" fill="url(#column-gradient)" filter="url(#marble-texture)" />
          </g>
        </svg>
      </div>

      {/* Subtle marble shimmer overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%,
              rgba(147, 197, 253, 0.1) 0%,
              transparent 60%)
          `,
          animation: shouldReduceMotion ? "none" : "marble-pulse 4s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes marble-pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </m.div>
  );
}
