import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | PRAVIEL",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* 404 with glow effect */}
        <h1 className="text-9xl font-bold bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-6">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          The page you're looking for has wandered off into the ancient texts.
          Let's get you back on track.
        </p>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative px-6 py-3 rounded-xl bg-violet-600 text-white font-medium shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:bg-violet-500 transition-all duration-300"
          >
            <span className="relative z-10">Back to Home</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/fund"
            className="px-6 py-3 rounded-xl border border-violet-500/30 text-violet-300 font-medium hover:bg-violet-500/10 transition-all duration-300"
          >
            Support the Project
          </Link>
        </div>

        {/* Decorative ancient symbol */}
        <div className="mt-12 text-6xl text-violet-500/20 animate-pulse">
          𓀀
        </div>
      </div>
    </div>
  );
}
