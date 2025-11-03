"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { href: "https://app.praviel.com", label: "Launch app" },
    { href: "#features", label: "Features" },
    { href: "https://api.praviel.com/docs", label: "API" },
    { href: "/fund", label: "Fund" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 px-6 py-4 text-sm text-zinc-300 ring-1 ring-white/10 backdrop-blur-2xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo with enhanced animation */}
        <Link href="/" className="relative group">
          <motion.span
            className="font-bold text-lg bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            PRAVIEL
          </motion.span>

          {/* Underline animation */}
          <motion.div
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-violet-400 to-purple-400"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-white"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="relative z-10">{link.label}</span>

              {/* Hover effect */}
              {hoveredLink === link.label && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-md bg-violet-500/10"
                  layoutId="headerHover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}

          {/* CTA button with enhanced effects */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#waitlist"
              className="relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]"
            >
              <span className="relative z-10">Get early access</span>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </Link>
          </motion.div>
        </nav>

        {/* Mobile menu button */}
        <motion.button
          className="text-zinc-400 hover:text-white sm:hidden relative"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? "✕" : "☰"}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="sm:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mt-4 space-y-2 border-t border-white/10 pt-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-lg hover:bg-violet-500/10 hover:text-white transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="#waitlist"
                  className="block px-3 py-2 font-medium text-violet-400 hover:text-violet-300 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Get early access
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
