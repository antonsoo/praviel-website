import type { CSSProperties } from "react";

import WaitlistForm from "@/components/WaitlistForm";
import RomanMosaicBorder from "@/components/RomanMosaicBorder";

const TIMELINE_STEPS = [
  {
    id: "archive",
    title: "Ingest the archives",
    body: "Digitize papyri, tablets, and codices with spectral color calibration and provenance metadata. Every asset gets pinned to an auditable checksum.",
    accent: "journey-node journey-node--gold",
    badge: "Phase I",
  },
  {
    id: "train",
    title: "Train scholars + models",
    body: "AI tutors are chained to academic sources. Humans correct the edge cases, the stack relearns overnight, and citations are stapled to every explanation.",
    accent: "journey-node journey-node--lapis",
    badge: "Phase II",
  },
  {
    id: "deploy",
    title: "Ship to classrooms, labs, monasteries",
    body: "Offline-first deployments for monasteries, BYOK clusters for universities, and a privacy-safe public tier for autodidacts.",
    accent: "journey-node journey-node--terracotta",
    badge: "Phase III",
  },
];

const deferredSectionStyle: CSSProperties = {
  contentVisibility: "auto",
  containIntrinsicSize: "900px",
};

export default function JourneyTimeline() {
  return (
    <section
      id="journey-timeline"
      className="relative px-4 sm:px-6 py-16 sm:py-24 md:py-32"
      aria-labelledby="journey-timeline-title"
      style={deferredSectionStyle}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0f16]/50 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">Operational timeline</p>
          <h2 id="journey-timeline-title" className="text-3xl sm:text-4xl font-semibold text-white">
            From artifact to fluent reader
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-300">
            Each release marches across the same three checkpoints. Investors, universities, and independent scholars can see what’s shipped and what still needs patronage.
          </p>
        </header>

        <div className="journey-timeline" role="list">
          {TIMELINE_STEPS.map((step, index) => {
            const motionClass = index % 2 === 0 ? "scroll-slide-left" : "scroll-slide-right";
            return (
              <article key={step.id} role="listitem" className={`journey-card ${motionClass}`}>
                <div className="journey-card__rail" aria-hidden>
                  <div className={step.accent}>
                    <span className="journey-node__badge">{step.badge}</span>
                  </div>
                  {index < TIMELINE_STEPS.length - 1 ? <div className="journey-line" aria-hidden /> : null}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{step.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="journey-cta scroll-scale">
          <div className="journey-cta__content">
            <h3 className="text-2xl font-semibold text-white">Fund the long tail of ancient languages</h3>
            <p className="text-sm text-zinc-300">
              Waitlist signups and patrons unlock endangered language rollouts faster. Institutions can request bespoke deployments, while individuals keep lifetime access.
            </p>
            <WaitlistForm source="journey" />
          </div>
          <div className="journey-cta__border">
            <RomanMosaicBorder height={80} animate />
          </div>
        </div>
      </div>
    </section>
  );
}
