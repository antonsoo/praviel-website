"use client";

import { lazy, Suspense, useCallback, useState } from "react";

import { useIntersectionGate } from "@/lib/hooks/useIntersectionGate";

const LazySecondaryCTAs = lazy(() => import("./SecondaryCTAs"));

export default function HeroWaitlistClient() {
  const { ref, shouldRender } = useIntersectionGate({
    rootMargin: "0px",
    idleTimeout: 1200,
  });
  const [manualReveal, setManualReveal] = useState(false);
  const effectiveShouldRender = shouldRender || manualReveal;

  const renderPreview = useCallback(
    () => <HeroWaitlistPreview onReveal={() => setManualReveal(true)} />,
    []
  );

  return (
    <div ref={ref}>
      <Suspense fallback={renderPreview()}>
        {effectiveShouldRender ? <LazySecondaryCTAs /> : renderPreview()}
      </Suspense>
    </div>
  );
}

function HeroWaitlistPreview({ onReveal }: { onReveal: () => void }) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4" aria-live="polite">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={onReveal}
        className="group flex min-h-[44px] items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 px-5 py-3 text-sm font-medium text-[#E8DCC4] ring-1 ring-[#D4AF37]/40 lg:backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#E8C55B]/50 hover:from-[#D4AF37]/20 hover:to-[#D4AF37]/15 hover:ring-[#E8C55B]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#E8C55B]" fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Join Scholar Waitlist</span>
        </button>
        <a
          href="mailto:contact@praviel.com?subject=Early Classroom Access Request"
        className="group flex min-h-[44px] items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 px-5 py-3 text-sm font-medium text-[#E8DCC4] ring-1 ring-[#D4AF37]/40 lg:backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#E8C55B]/50 hover:from-[#D4AF37]/20 hover:to-[#D4AF37]/15 hover:ring-[#E8C55B]/60"
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
            <path
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Bring PRAVIEL to Class</span>
        </a>
      </div>
      <p className="text-[11px] text-zinc-500">Full interactive waitlist panel loads after the page settles.</p>
    </div>
  );
}
