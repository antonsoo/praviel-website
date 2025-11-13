"use client";

import { useReducedMotion } from "motion/react";

interface GreekMeanderBorderProps {
  className?: string;
  animate?: boolean;
  height?: number;
}

/**
 * Greek Meander (Key) Border Component
 * Enhanced version with scroll-driven animations and modern CSS features
 * GPU-accelerated and accessible
 */
export default function GreekMeanderBorder({
  className = "",
  animate = true,
  height = 24,
}: GreekMeanderBorderProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = animate && !shouldReduceMotion;

  return (
    <div
      className={`greek-meander-border relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height={height}
        viewBox="0 0 1600 24"
        preserveAspectRatio="xMidYMid slice"
        className={shouldAnimate ? "greek-meander-animate" : ""}
      >
        <defs>
          <linearGradient id="meanderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2">
              {shouldAnimate && (
                <animate
                  attributeName="stopOpacity"
                  values="0.2;0.6;0.2"
                  dur="4s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6">
              {shouldAnimate && (
                <animate
                  attributeName="stopOpacity"
                  values="0.6;1;0.6"
                  dur="4s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2">
              {shouldAnimate && (
                <animate
                  attributeName="stopOpacity"
                  values="0.2;0.6;0.2"
                  dur="4s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </linearGradient>

          {/* Greek Key/Meander Pattern */}
          <pattern
            id="meanderPattern"
            x="0"
            y="0"
            width="64"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 2 L16 2 L16 18 L40 18 L40 6 L26 6 L26 12 L20 12 L20 22 L64 22"
              fill="none"
              stroke="url(#meanderGradient)"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M8 2 L24 2 L24 16 L46 16 L46 8 L32 8 L32 12"
              fill="none"
              stroke="url(#meanderGradient)"
              strokeWidth="1"
              strokeLinecap="square"
              opacity="0.3"
            />
          </pattern>

          {/* Glowing effect overlay */}
          <filter id="meanderGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          width="1600"
          height="24"
          fill="url(#meanderPattern)"
          filter={shouldAnimate ? "url(#meanderGlow)" : ""}
        >
          {shouldAnimate && (
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-64 0"
              dur="8s"
              repeatCount="indefinite"
            />
          )}
        </rect>

        {/* Additional decorative elements */}
        <circle cx="0" cy="12" r="4" fill="#60a5fa" opacity="0.4">
          {shouldAnimate && (
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="200" cy="12" r="4" fill="#60a5fa" opacity="0.4">
          {shouldAnimate && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="3s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle cx="400" cy="12" r="4" fill="#60a5fa" opacity="0.4">
          {shouldAnimate && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </svg>

      {/* CSS-based animated overlay for additional depth */}
      {shouldAnimate && (
        <div className="absolute inset-0 pointer-events-none greek-meander-shimmer" />
      )}
    </div>
  );
}
