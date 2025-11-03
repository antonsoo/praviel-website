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

      {/* Enhanced floating particles around card (Egyptian gold) */}
      {isHovered && !shouldReduceMotion && (
        <>
          {[...Array(6)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
              style={{
                left: `${15 + i * 15}%`,
                top: i % 2 === 0 ? "-8px" : "calc(100% + 8px)",
              }}
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: i % 2 === 0 ? [-10, -40] : [10, 40],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Multiple corner accent pulses (Egyptian gold) */}
      {["right-3 top-3", "left-3 bottom-3", "right-3 bottom-3", "left-3 top-3"].map((pos, i) => (
        <m.div
          key={i}
          className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50`}
          animate={
            shouldReduceMotion
              ? { opacity: isHovered ? 0.8 : 0 }
              : {
                  opacity: isHovered ? [0, 1, 0] : 0,
                  scale: isHovered ? [1, 2, 1] : 1,
                }
          }
          transition={{
            duration: 1.2,
            repeat: isHovered && !shouldReduceMotion ? Infinity : 0,
            delay: i * 0.3,
          }}
        />
      ))}
    </m.div>
  );
}

export default function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      title: "Adaptive drills",
      body: "The system tracks your morphology, vocab, and phonology weaknesses and hammers them until they stick.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#E8C55B]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Primary texts",
      body: "You read tablets, manuscripts, inscriptions — line by line — with inline glossing and grammar help.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#E8C55B]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M4 6h16M4 10h16M4 14h10M4 18h6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Pronunciation coach",
      body: "You speak into the mic. We align your audio to target phonemes and tell you exactly what slipped.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#E8C55B]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M9 9a3 3 0 1 1 6 0v3a3 3 0 1 1-6 0V9Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 11v1a7 7 0 0 0 14 0v-1M12 22v-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Coach mode",
      body: "Ask anything — declension, etymology, paleography. Your AI coach answers using the actual corpus, not generic trivia.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[#E8C55B]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 3 3 9l9 6 9-6-9-6Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 15l9 6 9-6M12 9v12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" ref={ref} className="relative z-10 px-6 pb-24 sm:pb-32 md:pb-40">
      {/* Section header with Greek Key border */}
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
        className="mx-auto mt-16 max-w-xl text-center text-xs text-zinc-600"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        PRAVIEL will launch first on web and desktop, then iOS/Android. If you teach ancient languages and you want early
        classroom access, contact contact@praviel.com.
      </m.div>

      {/* Closing Greek Key border */}
      <div className="mx-auto max-w-5xl mt-12">
        <GreekKeyBorder />
      </div>
    </section>
  );
}
