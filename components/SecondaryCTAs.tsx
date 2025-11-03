"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import WaitlistForm from "./WaitlistForm";

export default function SecondaryCTAs() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {/* Secondary CTA Buttons */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <motion.button
          onClick={() => setShowWaitlist(!showWaitlist)}
          className="group relative flex items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-6 py-3 text-sm font-medium text-[#E8DCC4] ring-1 ring-[#D4AF37]/40 backdrop-blur transition-all hover:border-[#E8C55B]/50 hover:bg-[#D4AF37]/20 hover:ring-[#E8C55B]/60 min-h-[44px]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-[#E8C55B]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Get Mobile Updates</span>
          <motion.svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            animate={{ rotate: showWaitlist ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>

        <motion.a
          href="mailto:contact@praviel.com?subject=Early Classroom Access Request"
          className="group relative flex items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-6 py-3 text-sm font-medium text-[#E8DCC4] ring-1 ring-[#D4AF37]/40 backdrop-blur transition-all hover:border-[#E8C55B]/50 hover:bg-[#D4AF37]/20 hover:ring-[#E8C55B]/60 min-h-[44px]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-[#E8C55B]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
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
            <path
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Teacher Access</span>
        </motion.a>
      </div>

      {/* Expandable Waitlist Form */}
      <AnimatePresence>
        {showWaitlist && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6 backdrop-blur stone-texture"
            >
              <p className="mb-4 text-center text-sm text-zinc-300">
                Sign up to get notified when iOS & Android apps launch
              </p>
              <div className="flex justify-center">
                <WaitlistForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle hint text */}
      <motion.p
        className="text-[11px] text-zinc-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Web & desktop available now • Mobile coming soon
      </motion.p>
    </div>
  );
}
