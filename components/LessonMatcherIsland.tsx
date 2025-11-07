"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { DemoSkeleton } from "@/components/Skeleton";

const LessonsDemoCore = dynamic(() => import("./LessonsDemoCore"), {
  loading: () => <DemoSkeleton />,
  ssr: false,
});

export default function LessonMatcherIsland() {
  const [shouldRender, setShouldRender] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 text-sm text-zinc-300 leading-relaxed shadow-lg shadow-black/30">
        <p>
          The live matcher pairs original tokens with glosses from LSJ, TLA Berlin, and ORACC. It
          demonstrates how our curriculum enforces manuscript fidelity and scholar-grade citations.
        </p>
        <button
          type="button"
          onClick={() => setShouldRender(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E8C55B] to-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#D4AF37]/40 transition hover:shadow-[#D4AF37]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
        >
          Launch lesson matcher
        </button>
        <p className="text-xs uppercase tracking-[0.25em] text-[#E8C55B]">
          Loads interactive bundle (~64 KB gzipped) after click
        </p>
      </div>

      {shouldRender ? (
        <div className="mt-14">
          <LessonsDemoCore />
        </div>
      ) : null}
    </>
  );
}

