"use client";

import { Suspense } from "react";
import { motion } from "motion/react";
import CurrentYear from "./CurrentYear";
import OpenSourceBadge from "./OpenSourceBadge";

export default function Footer() {
  const links = [
    { href: "mailto:contact@praviel.com", label: "contact@praviel.com" },
    { href: "https://app.praviel.com", label: "App" },
    { href: "https://api.praviel.com/docs", label: "API" },
    { href: "/fund", label: "Fund" },
    { href: "/privacy", label: "Privacy" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-black/60 px-6 py-12 text-xs text-zinc-600 ring-1 ring-white/10 backdrop-blur-xl overflow-hidden">
      {/* Animated top border */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/10 to-transparent pointer-events-none" />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between relative z-10">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-lg font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            PRAVIEL
          </motion.div>
          <div className="max-w-xs text-zinc-500 leading-relaxed">
            Through ancient tongues, wisdom echoes across millennia.
          </div>

          {/* Ancient script decoration */}
          <motion.div
            className="flex gap-2 text-violet-500/30 text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {["𒀀", "𓀀", "Α", "א"].map((symbol, i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {symbol}
              </motion.span>
            ))}
          </motion.div>

          {/* Open Source Badge - Real, verifiable */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <OpenSourceBadge />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-zinc-500 hover:text-violet-300 transition-colors group w-fit"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ x: 5 }}
            >
              <span className="relative z-10">{link.label}</span>

              {/* Hover underline */}
              <motion.div
                className="absolute -bottom-0.5 left-0 h-[1px] bg-violet-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />

              {/* Arrow on hover */}
              <motion.span
                className="absolute -right-3 top-0 text-violet-400 opacity-0 group-hover:opacity-100"
                initial={{ x: -5 }}
                whileHover={{ x: 0 }}
              >
                →
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-12 max-w-6xl text-zinc-700 relative z-10 text-center sm:text-left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <motion.span
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          ©{" "}
          <Suspense fallback={null}>
            <CurrentYear />
          </Suspense>{" "}
          PRAVIEL. All rights reserved.
        </motion.span>
      </motion.div>
    </footer>
  );
}
