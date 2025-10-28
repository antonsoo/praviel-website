"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-white/5 bg-black/40 px-6 py-4 text-sm text-zinc-300 ring-1 ring-white/10 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-zinc-100 hover:text-white"
        >
          PRAVIEL
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="https://app.praviel.com"
            className="hover:text-white"
          >
            Launch app
          </Link>
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link
            href="https://api.praviel.com/docs"
            className="hover:text-white"
          >
            API
          </Link>
          <Link
            href="#waitlist"
            className="rounded-lg bg-violet-600 px-3 py-1.5 font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:bg-violet-500"
          >
            Get early access
          </Link>
        </nav>

        <button
          className="text-zinc-400 hover:text-white sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="sm:hidden">
          <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-zinc-300">
            <Link
              href="https://app.praviel.com"
              className="block px-2 py-1 hover:text-white"
            >
              Launch app
            </Link>
            <Link
              href="#features"
              className="block px-2 py-1 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="https://api.praviel.com/docs"
              className="block px-2 py-1 hover:text-white"
            >
              API
            </Link>
            <Link
              href="#waitlist"
              className="block px-2 py-1 font-medium text-violet-400 hover:text-violet-300"
            >
              Get early access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
