"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import PrimaryCTA from "./PrimaryCTA";
import SecondaryCTAs from "./SecondaryCTAs";
import DecorativeColumns from "./DecorativeColumns";
import GreekKeyBorder from "./GreekKeyBorder";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants with accessibility
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      };

  return (
    <section className="relative isolate px-6 py-24 sm:py-32 md:py-40 lg:py-48 min-h-screen flex items-center overflow-hidden">
      {/* Decorative Columns */}
      <DecorativeColumns />

      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 -z-10">
        {/* Multi-layered gradient background with ancient colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af]/5 via-transparent to-[#D4AF37]/5" />

        {/* Papyrus texture overlay */}
        <div className="absolute inset-0 papyrus-texture opacity-30" />

        {/* Subtle grid pattern with Egyptian gold */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(212 175 55 / 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(212 175 55 / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Multi-color radial glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#3b82f6]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#CD5C5C]/5 rounded-full blur-[90px]" />
      </div>

      {/* Content */}
      <m.div
        className="mx-auto max-w-4xl text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Badge */}
        <m.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/10 via-[#3b82f6]/10 to-[#D4AF37]/10 border border-[#D4AF37]/20 text-sm font-medium text-[#E8C55B]/90 mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"
              style={shouldReduceMotion ? {} : { animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
            ></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8C55B]"></span>
          </span>
          Alpha — Live Now
        </m.div>

        {/* Main Headline with enhanced kinetic typography */}
        <m.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1] px-4"
        >
          <m.span
            className="inline-block"
            style={{
              willChange: shouldReduceMotion ? "auto" : "transform",
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    y: -5,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }
            }
          >
            Master ancient languages
          </m.span>{" "}
          <m.span
            className="bg-gradient-to-r from-[#E8C55B] via-[#3b82f6] to-[#E8C55B] bg-clip-text text-transparent inline-block animate-gradient bg-[length:200%_auto]"
            style={{
              willChange: shouldReduceMotion ? "auto" : "transform",
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1.05,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }
            }
          >
            with AI that never quits
          </m.span>
        </m.h1>

        {/* Subheadline with ancient script accents and enhanced animations */}
        <m.div variants={itemVariants} className="mx-auto max-w-2xl mb-12 px-4">
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed">
            <m.span
              className="text-white font-semibold bg-gradient-to-r from-[#E8DCC4] to-[#F5F5F0] bg-clip-text text-transparent inline-block"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }
              }
            >
              Akkadian. Biblical Hebrew. Koine Greek. Latin. Old Church Slavonic.
            </m.span>
            {" "}
            Learn with instant pronunciation feedback, adaptive drills, and real primary texts — not baby phrases.
          </p>
        </m.div>

        {/* CTAs */}
        <m.div variants={itemVariants}>
          <PrimaryCTA />
          <SecondaryCTAs />
        </m.div>

        {/* Greek Key Border */}
        <m.div variants={itemVariants} className="mt-12">
          <GreekKeyBorder className="max-w-md mx-auto" />
        </m.div>

        {/* Trust indicator */}
        <m.div variants={itemVariants} className="mt-8 pt-8">
          <div className="flex items-center justify-center gap-2 text-zinc-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm">Instant AI-powered feedback</span>
          </div>
        </m.div>
      </m.div>

      {/* Scroll indicator with accessibility */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <m.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-zinc-600 hover:text-[#D4AF37] transition-colors cursor-pointer"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </m.div>
      </m.div>
    </section>
  );
}
