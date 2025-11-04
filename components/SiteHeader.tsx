"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { href: "https://app.praviel.com", label: "Launch app" },
    { href: "#features", label: "Features" },
    { href: "/fund", label: "Support us" },
    { href: "https://api.praviel.com/docs", label: "API" },
  ];

  return (
    <m.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 px-6 py-4 text-sm text-zinc-300 ring-1 ring-white/10 backdrop-blur-2xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated gradient border with ancient colors */}
      <m.div
        className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
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
        {/* Logo with enhanced animation (ancient theme) */}
        <Link href="/" className="relative group">
          <m.span
            className="font-bold text-lg bg-gradient-to-r from-[#E8C55B] via-[#3b82f6] to-[#E8DCC4] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            PRAVIEL
          </m.span>

          {/* Underline animation with Egyptian gold */}
          <m.div
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#3b82f6]"
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

              {/* Hover effect with ancient colors */}
              {hoveredLink === link.label && (
                <m.div
                  className="absolute inset-0 -z-10 rounded-md bg-[#D4AF37]/10"
                  layoutId="headerHover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}

          {/* CTA button with enhanced effects (ancient theme) */}
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://app.praviel.com"
              className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#3b82f6] px-4 py-2 font-medium text-white shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.8)]"
            >
              <span className="relative z-10">Try free now</span>

              {/* Shimmer effect */}
              <m.div
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
          </m.div>
        </nav>

        {/* Mobile menu button */}
        <m.button
          className="text-zinc-400 hover:text-white sm:hidden relative flex items-center justify-center min-w-[44px] min-h-[44px] text-2xl"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          whileTap={{ scale: 0.9 }}
        >
          <m.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? "✕" : "☰"}
          </m.div>
        </m.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <m.div
            className="sm:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <m.div
              className="mt-4 space-y-2 border-t border-white/10 pt-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
            >
              {navLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 hover:text-white transition-colors min-h-[44px] flex items-center"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="#waitlist"
                  className="block px-4 py-3 font-medium text-[#E8C55B] hover:text-[#D4AF37] transition-colors min-h-[44px] flex items-center"
                  onClick={() => setOpen(false)}
                >
                  Get early access
                </Link>
              </m.div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
