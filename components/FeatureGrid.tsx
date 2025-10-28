"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

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

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  useEffect(() => {
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
  }, [isHovered, x, y]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] p-6 ring-1 ring-white/5 backdrop-blur transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:ring-violet-500/50 cursor-pointer"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(139,92,246,0.3), rgba(192,132,252,0.3))",
          filter: "blur(10px)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"
          animate={{
            x: isHovered ? ["-100%", "200%"] : "0%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Icon with 3D transform */}
      <motion.div
        className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 ring-1 ring-violet-500/40 backdrop-blur"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
        whileHover={{
          rotate: [0, -5, 5, -5, 0],
          scale: 1.15,
        }}
        transition={{ duration: 0.5 }}
      >
        {feature.icon}

        {/* Icon glow */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-violet-500/40 blur-md opacity-0"
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Title with gradient on hover */}
      <motion.h3
        className="relative text-base font-semibold text-zinc-100 mb-2"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(10px)",
        }}
      >
        <span className="relative z-10">{feature.title}</span>
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {feature.title}
        </motion.span>
      </motion.h3>

      {/* Body text */}
      <p
        className="relative text-sm leading-relaxed text-zinc-400"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(5px)",
        }}
      >
        {feature.body}
      </p>

      {/* Floating particles around card */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-violet-400"
              style={{
                left: `${20 + i * 30}%`,
                top: "-5px",
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-10, -30],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}

      {/* Corner accent pulse */}
      <motion.div
        className="absolute right-3 top-3 h-2 w-2 rounded-full bg-violet-400"
        animate={{
          opacity: isHovered ? [0, 1, 0] : 0,
          scale: isHovered ? [1, 1.5, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
      />
    </motion.div>
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
          className="h-6 w-6 text-violet-300"
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
          className="h-6 w-6 text-violet-300"
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
          className="h-6 w-6 text-violet-300"
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
          className="h-6 w-6 text-violet-300"
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
    <section
      id="features"
      ref={ref}
      className="relative z-10 px-6 pb-24 sm:pb-32 md:pb-40"
    >
      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        style={{ perspective: "1000px" }}
      >
        {features.map((f, idx) => (
          <FeatureCard key={f.title} feature={f} index={idx} isInView={isInView} />
        ))}
      </motion.div>

      <motion.div
        className="mx-auto mt-16 max-w-xl text-center text-xs text-zinc-600"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        PRAVIEL will launch first on web and desktop, then iOS/Android.
        If you teach ancient languages and you want early classroom
        access, contact contact@praviel.com.
      </motion.div>
    </section>
  );
}
