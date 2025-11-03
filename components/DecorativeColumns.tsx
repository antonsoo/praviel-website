"use client";

import * as m from "motion/react-m";

export default function DecorativeColumns() {
  return (
    <>
      {/* Left Column - Increased opacity to 20% for actual visibility */}
      <m.div
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        aria-hidden="true"
      >
        <svg
          width="80"
          height="600"
          viewBox="0 0 80 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ionic capital */}
          <path
            d="M0 30 Q20 20, 40 30 Q60 20, 80 30 L80 50 Q60 40, 40 50 Q20 40, 0 50 Z"
            fill="url(#columnGradient)"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          {/* Column shaft with fluting */}
          <rect x="15" y="50" width="50" height="500" fill="url(#columnShaft)" />
          <path d="M20 50 L20 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <path d="M30 50 L30 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <path d="M40 50 L40 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <path d="M50 50 L50 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <path d="M60 50 L60 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          {/* Base */}
          <rect x="10" y="550" width="60" height="30" fill="url(#columnGradient)" stroke="#D4AF37" strokeWidth="1" />
          <rect x="5" y="580" width="70" height="20" fill="url(#columnGradient)" stroke="#D4AF37" strokeWidth="1" />

          <defs>
            <linearGradient id="columnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A572" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C5A572" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="columnShaft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A68A5A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#C5A572" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A68A5A" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </m.div>

      {/* Right Column - Increased opacity to 20% for actual visibility */}
      <m.div
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        aria-hidden="true"
      >
        <svg
          width="80"
          height="600"
          viewBox="0 0 80 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ionic capital */}
          <path
            d="M0 30 Q20 20, 40 30 Q60 20, 80 30 L80 50 Q60 40, 40 50 Q20 40, 0 50 Z"
            fill="url(#columnGradient2)"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          {/* Column shaft with fluting */}
          <rect x="15" y="50" width="50" height="500" fill="url(#columnShaft2)" />
          <path d="M20 50 L20 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <path d="M30 50 L30 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <path d="M40 50 L40 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <path d="M50 50 L50 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <path d="M60 50 L60 550" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          {/* Base */}
          <rect x="10" y="550" width="60" height="30" fill="url(#columnGradient2)" stroke="#D4AF37" strokeWidth="1" />
          <rect x="5" y="580" width="70" height="20" fill="url(#columnGradient2)" stroke="#D4AF37" strokeWidth="1" />

          <defs>
            <linearGradient id="columnGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A572" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C5A572" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="columnShaft2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A68A5A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#C5A572" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A68A5A" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </m.div>
    </>
  );
}
