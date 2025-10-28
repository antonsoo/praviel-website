"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useRef, useEffect } from "react";

export default function PrimaryCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic effect: cursor attraction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-7, 7]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovered) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);

      x.set(distanceX);
      y.set(distanceY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, x, y]);

  return (
    <motion.div
      ref={ref}
      className="relative mt-10 inline-block"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.3, type: "spring", stiffness: 100 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Multi-layer animated glow effect */}
      <motion.div
        className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-40 blur-3xl"
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
          scale: isHovered ? 1.2 : 1,
          rotate: [0, 180, 360],
        }}
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Pulsing outer ring */}
      <motion.div
        className="absolute -inset-8 rounded-3xl border-2 border-violet-400/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating gradient border effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 opacity-0"
        animate={{
          opacity: isHovered ? 0.4 : 0,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          opacity: { duration: 0.3 },
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
        }}
      />

      <motion.a
        href="https://app.praviel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-10 py-5 text-lg font-bold text-white shadow-[0_0_50px_rgba(139,92,246,0.9),0_0_100px_rgba(168,85,247,0.5)] transition-shadow hover:shadow-[0_0_70px_rgba(139,92,246,1),0_0_120px_rgba(168,85,247,0.7)] ring-2 ring-violet-400/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <motion.span
          animate={isHovered ? { x: [-1, 1, -1] } : {}}
          transition={{
            duration: 0.3,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          Launch Alpha App
        </motion.span>
        <motion.svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            d="M13 7l5 5m0 0l-5 5m5-5H6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={
            isHovered
              ? {
                  x: ["-100%", "100%"],
                  opacity: [0, 0.3, 0],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ripple effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </motion.a>

      {/* Enhanced floating particles system */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-2 w-2 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50"
          style={{
            left: `${(i % 4) * 25}%`,
            top: i < 4 ? "-12px" : "calc(100% + 12px)",
          }}
          animate={{
            y: i < 4 ? [-10, -30, -10] : [10, 30, 10],
            x: [(i % 2) * 10 - 5, (i % 2) * -10 + 5, (i % 2) * 10 - 5],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}

      {/* Orbiting particles */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={angle}
            className="absolute h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-lg shadow-fuchsia-400/50"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${angle}deg) translateX(60px)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
