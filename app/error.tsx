"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Log error to console in development
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black px-6 py-24">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <m.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Error icon with animation */}
        <m.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/30 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </m.div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Something Went Wrong
        </h1>
        <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
          An unexpected error occurred. Don't worry, we've logged it and will look into it.
        </p>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && (
          <m.div
            className="mb-8 p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-left overflow-auto max-w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs text-red-400 font-mono break-all">
              {error.message}
            </div>
            {error.digest && (
              <div className="text-xs text-zinc-600 mt-2">
                Error ID: {error.digest}
              </div>
            )}
          </m.div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <m.button
            onClick={reset}
            className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A572] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </m.button>

          <m.a
            href="/"
            className="px-8 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded-full hover:border-[#D4AF37] hover:text-white transition-all"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Return Home
          </m.a>
        </div>

        {/* Support link */}
        <m.p
          className="mt-12 text-sm text-zinc-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Need help?{" "}
          <a
            href="mailto:contact@praviel.com"
            className="text-[#E8C55B] hover:text-[#D4AF37] transition-colors underline"
          >
            Contact Support
          </a>
        </m.p>
      </m.div>
    </div>
  );
}
