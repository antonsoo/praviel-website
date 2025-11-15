"use client";

import { useState, useId } from "react";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  const [showWaitlist, setShowWaitlist] = useState(true);
  const waitlistPanelId = useId();

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      aria-labelledby="waitlist-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C55B]/8 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <header className="text-center space-y-4 mb-12">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8C55B]/30 bg-[#E8C55B]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#E8C55B]">
            Early Access
          </span>
          <h2 id="waitlist-title" className="text-4xl font-bold text-white sm:text-5xl">
            Join the{" "}
            <span className="bg-gradient-to-r from-[#E8C55B] to-[#D4AF37] bg-clip-text text-transparent">
              Scholar Waitlist
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-300 sm:text-xl">
            Get notified when mobile apps launch. The web app is already available—no waiting required!
          </p>
        </header>

        <div className="flex flex-col items-center gap-6">
          <div
            id={waitlistPanelId}
            aria-hidden={!showWaitlist}
            className="w-full max-w-xl rounded-2xl border border-[#E8C55B]/20 bg-[#E8C55B]/5 p-8 backdrop-blur"
          >
            <div className="flex justify-center">
              <WaitlistForm source="waitlist-section" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://app.praviel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[44px] items-center gap-2 rounded-xl border border-[#E8C55B]/30 bg-gradient-to-r from-[#E8C55B]/10 to-[#D4AF37]/5 px-5 py-3 text-sm font-medium text-[#E8DCC4] ring-1 ring-[#E8C55B]/40 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#E8C55B]/50 hover:from-[#E8C55B]/20 hover:to-[#D4AF37]/15 hover:ring-[#E8C55B]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/70"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={2}>
                <path
                  d="M12 14l9-5-9-5-9 5 9 5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Start Reading Now (Web App)</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="mailto:contact@praviel.com?subject=Early Classroom Access Request"
              className="group relative flex min-h-[44px] items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 px-5 py-3 text-sm font-medium text-[#E8DCC4] ring-1 ring-[#D4AF37]/40 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#E8C55B]/50 hover:from-[#D4AF37]/20 hover:to-[#D4AF37]/15 hover:ring-[#E8C55B]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/70"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Bring PRAVIEL to Class</span>
            </a>
          </div>

          <p className="text-[11px] text-zinc-600">100% free • No signup required • Donations appreciated</p>
        </div>
      </div>
    </section>
  );
}
