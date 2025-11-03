"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Error icon */}
        <div className="text-6xl mb-6 text-red-500/80">⚠️</div>

        {/* Message */}
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-zinc-400 mb-2 max-w-md mx-auto">
          An unexpected error occurred. Don't worry, we've logged it and will
          look into it.
        </p>

        {/* Error details in dev mode */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 max-w-lg mx-auto">
            <summary className="cursor-pointer text-zinc-300 font-medium mb-2">
              Error Details (Dev Only)
            </summary>
            <pre className="text-xs text-red-400 overflow-x-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={reset}
            className="group relative px-6 py-3 rounded-xl bg-violet-600 text-white font-medium shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:bg-violet-500 transition-all duration-300"
          >
            <span className="relative z-10">Try Again</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <a
            href="/"
            className="px-6 py-3 rounded-xl border border-violet-500/30 text-violet-300 font-medium hover:bg-violet-500/10 transition-all duration-300"
          >
            Back to Home
          </a>
        </div>

        {/* Decorative symbol */}
        <div className="mt-12 text-4xl text-red-500/20 animate-pulse">𓀀</div>
      </div>
    </div>
  );
}
