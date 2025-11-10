"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import PapyrusScroll from "./PapyrusScroll";

export default function ImpactSection() {
  const impacts = [
    {
      title: "Linguistic Infrastructure",
      description:
        "Server costs, database hosting, and API infrastructure to deliver instant morphological analysis for 42 ancient languages.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M5 12h14M5 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2m-10 4h.01"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Expert Validation",
      description:
        "Contract PhD linguists to validate morphological data, curate authentic texts, and ensure research-grade accuracy.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Expanded Language Coverage",
      description:
        "Add support for more ancient languages and dialects. Sumerian, Hittite, Ugaritic, and beyond.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Mobile Development",
      description:
        "Accelerate iOS and Android app development to bring ancient languages to your pocket, not just your browser.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Educational Partnerships",
      description:
        "Work with universities and divinity schools to integrate PRAVIEL into academic curricula worldwide.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Open Source Forever",
      description:
        "Keep PRAVIEL free and open source. No paywalls, no data mining, no compromises on accessibility.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative px-6 pb-24 pt-12 sm:pb-32 sm:pt-16 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Enhanced header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold text-zinc-100 sm:text-4xl bg-gradient-to-r from-[#E8C55B] via-[#3b82f6] to-[#E8DCC4] bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Where Your Support Goes
          </motion.h2>
          <motion.p
            className="mt-4 text-sm text-zinc-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            100% transparent allocation toward building the future of ancient
            language education
          </motion.p>

          {/* Decorative line with ancient gold */}
          <motion.div
            className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#C5A572]"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Enhanced impact grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {impacts.map((impact, idx) => (
            <ImpactCard key={impact.title} impact={impact} index={idx} isInView={isInView} />
          ))}
        </div>

        {/* Enhanced quote section wrapped in PapyrusScroll */}
        <motion.div
          className="mx-auto mt-20 max-w-3xl space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <PapyrusScroll delay={0.9}>
            <div className="text-center">
              {/* Quote decoration with Egyptian gold */}
              <motion.div
                className="text-6xl text-[#E8C55B]/30 mb-4"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                "
              </motion.div>

              <blockquote className="relative text-base italic leading-relaxed text-zinc-200">
                "Every ancient text is a conversation across millennia. When we
                lose access to these languages, we lose entire conceptual
                frameworks, rhetorical traditions, and direct connections to our
                ancestors. Supporting PRAVIEL means preserving the full depth of
                human wisdom for future generations."
              </blockquote>
              <div className="mt-6 text-sm font-semibold text-[#E8C55B]">
                — The PRAVIEL Mission
              </div>
            </div>
          </PapyrusScroll>

          <motion.p
            className="text-xs text-zinc-600"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            Questions about funding or how your contribution is used?
            <br />
            Email{" "}
            <motion.a
              href="mailto:business@praviel.com"
              className="inline-flex items-center text-[#E8C55B] hover:text-[#D4AF37] transition-colors min-h-[44px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              business@praviel.com
            </motion.a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactCard({
  impact,
  index,
  isInView,
}: {
  impact: { title: string; description: string; icon: React.ReactNode };
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className="group relative flex flex-col rounded-2xl border border-[color:var(--color-card-border)] bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-900/90 p-7 ring-1 ring-white/5 backdrop-blur-xl transition-all hover:border-[#D4AF37]/50 hover:bg-gradient-to-br hover:from-[#1e40af]/10 hover:via-zinc-900/80 hover:to-[#D4AF37]/10 hover:ring-[#D4AF37]/60 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect on hover with Egyptian gold */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl opacity-0 -z-10"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.4), rgba(59,130,246,0.3), rgba(232,197,91,0.4))",
          filter: "blur(10px)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon with enhanced glow using ancient colors */}
      <motion.div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#3b82f6]/30 text-[#E8C55B] ring-2 ring-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/20"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
        transition={{ duration: 0.5 }}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
      >
        {impact.icon}

        {/* Icon glow on hover with Egyptian gold */}
        <motion.div
          className="absolute -inset-2 rounded-xl bg-[#E8C55B]/50 blur-xl opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Title with ancient gradient */}
      <h3 className="text-base font-bold text-zinc-100 mb-3">
        <motion.span
          className="bg-gradient-to-r from-[#E8C55B] to-[#3b82f6] bg-clip-text text-transparent opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {impact.title}
        </motion.span>
        <span className={isHovered ? "opacity-0" : "opacity-100"}>{impact.title}</span>
      </h3>

      {/* Description */}
      <motion.p
        className="text-sm leading-relaxed text-zinc-400"
        animate={{
          color: isHovered ? "rgb(212, 212, 216)" : "rgb(161, 161, 170)",
        }}
      >
        {impact.description}
      </motion.p>

      {/* Corner accents with Egyptian gold */}
      {["right-2 top-2", "left-2 bottom-2"].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-[#E8C55B] shadow-lg shadow-[#E8C55B]/50`}
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            scale: isHovered ? [1, 1.5, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
}
