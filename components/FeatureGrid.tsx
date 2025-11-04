"use client";

import { useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useRef, useState, useEffect } from "react";
import GreekKeyBorder from "./GreekKeyBorder";

// Individual feature card with advanced interactions
function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: {
    title: string;
    body: string;
    icon: React.ReactNode;
  };
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], shouldReduceMotion ? ["0deg", "0deg"] : ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], shouldReduceMotion ? ["0deg", "0deg"] : ["-7deg", "7deg"]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return;

      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = (mouseX / width - 0.5) * 2;
      const yPct = (mouseY / height - 0.5) * 2;

      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, x, y, shouldReduceMotion]);

  return (
    <m.div
      ref={cardRef}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
      animate={
        isInView
          ? shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          : {}
      }
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: shouldReduceMotion ? 0 : index * 0.15,
        ease: [0.23, 1, 0.32, 1],
        type: "spring",
        stiffness: 100,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.05,
              y: -8,
              transition: { duration: 0.3, type: "spring", stiffness: 300 },
            }
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-900/90 stone-texture p-6 ring-1 ring-[#D4AF37]/10 backdrop-blur-xl transition-colors hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-[#1e40af]/10 hover:via-zinc-900/80 hover:to-[#D4AF37]/10 hover:ring-[#D4AF37]/30 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/20"
    >
      {/* Enhanced animated gradient background with Egyptian gold */}
      <m.div
        className="absolute -inset-[2px] rounded-2xl opacity-0 -z-10"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.4), rgba(59,130,246,0.3), rgba(232,197,91,0.4))",
          filter: "blur(12px)",
        }}
        animate={
          shouldReduceMotion
            ? { opacity: isHovered ? 0.7 : 0 }
            : {
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1.05 : 1,
              }
        }
        transition={{ duration: 0.4 }}
      />

      {/* Pulsing outer glow with ancient colors */}
      <m.div
        className="absolute -inset-8 rounded-2xl opacity-0 -z-20"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={
          shouldReduceMotion
            ? { opacity: isHovered ? 0.5 : 0 }
            : {
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? [1, 1.1, 1] : 1,
              }
        }
        transition={{ duration: 1.5, repeat: isHovered && !shouldReduceMotion ? Infinity : 0 }}
      />

      {/* Shimmer effect on hover with Egyptian gold */}
      <m.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !shouldReduceMotion ? 1 : 0 }}
      >
        <m.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"
          animate={{
            x: isHovered && !shouldReduceMotion ? ["-100%", "200%"] : "0%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered && !shouldReduceMotion ? Infinity : 0,
            ease: "linear",
          }}
        />
      </m.div>

      {/* Enhanced icon with 3D transform and glow (ancient theme) */}
      <m.div
        className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#3b82f6]/30 ring-2 ring-[#D4AF37]/50 backdrop-blur shadow-lg shadow-[#D4AF37]/20"
        style={{
          transformStyle: "preserve-3d",
          transform: shouldReduceMotion ? "none" : "translateZ(20px)",
        }}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, -10, 10, -5, 0],
                scale: 1.2,
              }
        }
        transition={{ duration: 0.6, type: "spring" }}
      >
        {feature.icon}

        {/* Enhanced icon glow with Egyptian gold */}
        <m.div
          className="absolute -inset-2 rounded-xl bg-[#D4AF37]/50 blur-xl opacity-0"
          animate={
            shouldReduceMotion
              ? { opacity: isHovered ? 0.7 : 0 }
              : {
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.5 : 1,
                }
          }
          transition={{ duration: 0.4 }}
        />

        {/* Inner shine effect */}
        <m.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </m.div>

      {/* Title with gradient on hover (ancient theme) */}
      <m.h3
        className="relative text-base font-semibold text-zinc-100 mb-2"
        style={{
          transformStyle: "preserve-3d",
          transform: shouldReduceMotion ? "none" : "translateZ(10px)",
        }}
      >
        <span className="relative z-10">{feature.title}</span>
        <m.span
          className="absolute inset-0 bg-gradient-to-r from-[#E8C55B] via-[#3b82f6] to-[#E8DCC4] bg-clip-text text-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {feature.title}
        </m.span>
      </m.h3>

      {/* Body text */}
      <p
        className="relative text-sm leading-relaxed text-zinc-400"
        style={{
          transformStyle: "preserve-3d",
          transform: shouldReduceMotion ? "none" : "translateZ(5px)",
        }}
      >
        {feature.body}
      </p>

      {/* Single corner accent (top-right) */}
      <m.div
        className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
        animate={
          shouldReduceMotion
            ? { opacity: isHovered ? 0.8 : 0 }
            : {
                opacity: isHovered ? [0, 1, 0] : 0,
                scale: isHovered ? [1, 1.5, 1] : 1,
              }
        }
        transition={{
          duration: 1.5,
          repeat: isHovered && !shouldReduceMotion ? Infinity : 0,
        }}
      />
    </m.div>
  );
}

export default function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      title: "Research-grade accuracy",
      body: "Every definition and grammar explanation is grounded in authoritative sources: Perseus Digital Library, LSJ Lexicon, TLA Berlin. Zero AI hallucinations on linguistic data.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#E8C55B]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Authentic primary texts",
      body: "Read the Iliad, the Aeneid, the Book of the Dead, the Bhagavad-Gītā—authentic ancient literature, not \"The apple is red.\" Learn from tablets, manuscripts, and inscriptions.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#E8C55B]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "46 ancient languages",
      body: "From Sumerian cuneiform (3100 BCE) to medieval manuscripts. Classical Latin, Greek, Hebrew, Sanskrit, Egyptian hieroglyphics, and 41 more. Comprehensive coverage of humanity's linguistic heritage.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#E8C55B]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Privacy-first design",
      body: "BYOK (Bring Your Own Key) architecture. Your API keys, your data. Works offline with Echo provider. Zero telemetry, zero tracking. Self-hostable with full Docker deployment.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#E8C55B]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" ref={ref} className="relative z-10 px-6 pb-24 sm:pb-32 md:pb-40">
      {/* Section header with single decorative element */}
      <div className="mx-auto max-w-5xl mb-12">
        <GreekKeyBorder className="mb-4" />
      </div>

      <m.div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        style={{ perspective: "1000px" }}
      >
        {features.map((f, idx) => (
          <FeatureCard key={f.title} feature={f} index={idx} isInView={isInView} />
        ))}
      </m.div>

      <m.div
        className="mx-auto mt-16 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-sm text-zinc-400 mb-3">
          Built on authoritative sources: Perseus Digital Library (Tufts), LSJ Lexicon (Oxford), TLA Berlin, ORACC UPenn, CDLI UCLA
        </p>
        <p className="text-xs text-zinc-600">
          For educators seeking institutional access or partnership opportunities: <a href="mailto:contact@praviel.com" className="text-[#E8C55B] hover:text-[#D4AF37] transition-colors">contact@praviel.com</a>
        </p>
      </m.div>

    </section>
  );
}
