"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import PrimaryCTA from "./PrimaryCTA";
import SecondaryCTAs from "./SecondaryCTAs";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.2)_0%,rgba(0,0,0,0)_70%)]" />
  ),
});

// Enhanced animated text with morphing gradient background
function AnimatedTitle({ children, delay = 0 }: { children: string; delay?: number }) {
  const letters = children.split("");
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Skip animation if user prefers reduced motion

    // GSAP gradient animation
    gsap.to(titleRef.current, {
      backgroundPosition: "200% center",
      duration: 4,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.025, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 250,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -90,
      filter: "blur(4px)",
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 250,
      },
    },
  };

  return (
    <motion.span
      ref={titleRef}
      style={{
        display: "inline-block",
        background: "linear-gradient(90deg, #e9d5ff, #c084fc, #a855f7, #8b5cf6, #c084fc, #e9d5ff)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{
            display: "inline-block",
            transformOrigin: "50% 100%",
          }}
          variants={child}
          whileHover={{
            y: -5,
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Enhanced ancient script with scroll interaction (optimized)
function AncientScriptOverlay() {
  // Reduced from 17 to 9 symbols - cleaner, less overwhelming
  const symbols = ["𒀀", "𒀂", "𓀀", "𓀂", "Α", "Ω", "ש", "א", "ב"];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.05, 0.01]); // Reduced opacity for subtlety

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {symbols.map((symbol, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;

        // Simpler animation for reduced motion
        const animation = prefersReducedMotion
          ? { opacity: [0.02, 0.05, 0.02] }
          : {
              opacity: [0.02, 0.08, 0.02],
              y: [0, -20, 0],
              rotate: [0, 4, -4, 0],
              scale: [0.95, 1, 0.95],
            };

        return (
          <motion.div
            key={i}
            className="absolute text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{
              left: `${col * 30 + 15}%`,
              top: `${row * 30 + 15}%`,
              color: "#c084fc",
              textShadow: "0 0 20px rgba(168,85,247,0.4)",
              opacity,
            }}
            initial={{ opacity: 0 }}
            animate={animation}
            transition={{
              duration: prefersReducedMotion ? 4 : 10 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
            whileHover={
              prefersReducedMotion
                ? {}
                : {
                    scale: 1.3,
                    opacity: 0.2,
                    rotate: 180,
                    transition: { duration: 0.4 },
                  }
            }
          >
            {symbol}
          </motion.div>
        );
      })}

      {/* Subtle gradient overlay */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-violet-500/3 via-transparent to-purple-500/3"
          animate={{
            backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 0.9, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(4px)"]);

  useEffect(() => {
    if (!contentRef.current) return;

    // GSAP entrance animation
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate px-6 py-24 sm:py-32 md:py-40 lg:py-48 min-h-screen flex items-center overflow-hidden">
      <HeroScene />
      <AncientScriptOverlay />

      {/* Glassmorphism floating card */}
      <motion.div
        ref={contentRef}
        className="mx-auto max-w-3xl text-center relative z-10"
        style={{ y, opacity, scale, filter: blur }}
      >
        {/* Glass container with border glow */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-black/40 via-black/20 to-black/40 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl shadow-violet-500/20">
          {/* Animated border glow */}
          <motion.div
            className="absolute -inset-[1px] rounded-3xl opacity-50"
            style={{
              background: "linear-gradient(90deg, #a855f7, #8b5cf6, #c084fc, #a855f7)",
              backgroundSize: "300% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative z-10">
            {/* Enhanced Alpha badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-100 ring-2 ring-violet-400/30 backdrop-blur-xl shadow-lg shadow-violet-500/30"
              initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />

              <motion.span
                className="relative z-10 flex items-center gap-1.5"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                Alpha
              </motion.span>
              <span className="text-zinc-300 relative z-10">live now</span>
            </motion.div>

            {/* Title with ultra-premium gradient animation */}
            <h1 className="mt-8 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
              <AnimatedTitle delay={0.4}>Learn ancient languages</AnimatedTitle>
              <br />
              <AnimatedTitle delay={0.7}>with a relentless AI tutor</AnimatedTitle>
            </h1>

            {/* Description with glassmorphic background */}
            <motion.div
              className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <p className="text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="font-bold bg-gradient-to-r from-violet-200 via-purple-200 to-fuchsia-200 bg-clip-text text-transparent"
                >
                  Akkadian. Biblical Hebrew. Koine Greek. Latin. Old Church Slavonic.
                </motion.span>
                {" "}You get instant pronunciation feedback, adaptive drills, and guided reading of real primary texts — not baby phrases.
              </p>
            </motion.div>

            <PrimaryCTA />
            <SecondaryCTAs />
          </div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
      >
        <motion.div
          className="relative flex flex-col items-center gap-2"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-7 h-12 border-2 border-violet-300/50 rounded-full p-1.5 bg-violet-500/10 backdrop-blur-xl shadow-lg shadow-violet-500/30"
            animate={{
              boxShadow: [
                "0 0 20px rgba(168,85,247,0.3)",
                "0 0 40px rgba(168,85,247,0.6)",
                "0 0 20px rgba(168,85,247,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-3 bg-gradient-to-b from-violet-400 to-purple-500 rounded-full mx-auto"
              animate={{ y: [0, 20, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <motion.span
            className="text-xs text-violet-300/70 font-medium uppercase tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
