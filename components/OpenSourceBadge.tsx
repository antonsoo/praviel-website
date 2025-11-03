"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

/**
 * Open Source Badge
 * Real, verifiable badge linking to actual GitHub repository
 * NO FAKE DATA - only shows if legitimate open source
 */
export default function OpenSourceBadge() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.a
      href="https://github.com/antonsoo/praviel-website"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-700 hover:border-[#D4AF37] text-sm text-zinc-400 hover:text-zinc-200 transition-all backdrop-blur-sm group"
      whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="View source code on GitHub"
    >
      {/* GitHub icon */}
      <svg
        className="w-4 h-4 text-zinc-400 group-hover:text-[#E8C55B] transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>

      <span className="font-medium">Open Source</span>

      {/* External link icon */}
      <svg
        className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </m.a>
  );
}
