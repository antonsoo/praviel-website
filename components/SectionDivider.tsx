"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-32 flex items-center justify-center overflow-hidden">
      {/* Morphing wave divider */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#E8C55B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C5A572" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="dividerGradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Animated wave paths */}
        <motion.path
          d="M0,60 C300,20 600,100 900,60 C1050,40 1150,60 1200,60 L1200,120 L0,120 Z"
          fill="url(#dividerGradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.4,
            d: [
              "M0,60 C300,20 600,100 900,60 C1050,40 1150,60 1200,60 L1200,120 L0,120 Z",
              "M0,80 C300,60 600,40 900,80 C1050,90 1150,80 1200,80 L1200,120 L0,120 Z",
              "M0,60 C300,20 600,100 900,60 C1050,40 1150,60 1200,60 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            d: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.path
          d="M0,80 C300,100 600,40 900,80 C1050,90 1150,80 1200,80 L1200,120 L0,120 Z"
          fill="url(#dividerGradient)"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: [
              "M0,80 C300,100 600,40 900,80 C1050,90 1150,80 1200,80 L1200,120 L0,120 Z",
              "M0,60 C300,40 600,80 900,60 C1050,50 1150,60 1200,60 L1200,120 L0,120 Z",
              "M0,80 C300,100 600,40 900,80 C1050,90 1150,80 1200,80 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeInOut", delay: 0.3 },
            d: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
        />
      </svg>

      {/* Floating ancient symbols along the divider */}
      <div className="absolute inset-0 pointer-events-none">
        {["Α", "Ω", "Ψ", "Δ", "Λ", "Σ", "Φ", "Π"].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-[#E8C55B]/50 font-serif text-lg"
            style={{
              left: `${(i / 8) * 100}%`,
              top: "50%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Center glow line with ancient gold */}
      <motion.div
        className="absolute h-[2px] bg-gradient-to-r from-transparent via-[#E8C55B] to-transparent"
        style={{
          scaleX,
          opacity,
          width: "80%",
          filter: "blur(1px)",
        }}
      />
    </div>
  );
}
