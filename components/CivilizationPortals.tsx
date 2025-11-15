import PortalCard3D from "@/components/PortalCard3D";

type Portal = {
  id: "egypt" | "greece" | "rome";
  epoch: string;
  headline: string;
  body: string;
  highlights: Array<{ label: string; detail: string }>;
  ctaHref: string;
  ctaLabel: string;
};

const PORTALS: Portal[] = [
  {
    id: "egypt",
    epoch: "Middle Kingdom · 12th Dynasty",
    headline: "Papyrus intelligence",
    body:
      "Torch-safe palettes, determinative overlays, and papyrus textures keep hieroglyphic study immersive without blowing accessibility budgets.",
    highlights: [
      { label: "Lighting", detail: "3800K torchlight calibrated gradients" },
      { label: "Guides", detail: "Glyph tracing + determinative spotlights" },
      { label: "Flow", detail: "Papyrus scroll CTAs match Living Manuscript" },
    ],
    ctaHref: "#material-study",
    ctaLabel: "View papyrus systems",
  },
  {
    id: "greece",
    epoch: "Classical Athens · 5th c. BCE",
    headline: "Marble acoustics",
    body:
      "Meter pulses, doric borders, and marble dust gradients train the ear for dactylic hexameter while staying readable on any display.",
    highlights: [
      { label: "Rhythm", detail: "Meter visualizer synced with scroll" },
      { label: "Columns", detail: "Greek key + doric column dividers" },
      { label: "Scholia", detail: "Nomina sacra overlays sourced from Venetus A" },
    ],
    ctaHref: "#civilization-triad",
    ctaLabel: "Walk the stoa",
  },
  {
    id: "rome",
    epoch: "Augustan Rome · 19 BCE",
    headline: "Forum-grade trust",
    body:
      "Travertine mosaics, export grids, and timeline badges turn research output into advisor-ready briefs with provenance intact.",
    highlights: [
      { label: "Exports", detail: "Scriptio continua toggle + morphology heatmaps" },
      { label: "Timeline", detail: "Campaign timeline mirrors Roman numerals" },
      { label: "Infrastructure", detail: "BYOK privacy + Cloudflare edge" },
    ],
    ctaHref: "#journey-timeline",
    ctaLabel: "Inspect the campaign",
  },
];

export default function CivilizationPortals() {
  return (
    <section
      id="civilization-portals"
      className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-24 md:py-32"
      aria-labelledby="civilization-portals-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#120f08]/60 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">Gateways</p>
          <h2 id="civilization-portals-title" className="text-3xl sm:text-5xl font-semibold text-white text-balance">
            Choose your ancient chamber
          </h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-zinc-300">
            Each portal borrows from its civilization’s materials without sacrificing WCAG contrast, motion safety, or responsive performance.
          </p>
        </header>

        <div className="portal-grid">
          {PORTALS.map((portal) => (
            <PortalCard3D key={portal.id}>
              <article
                className={`portal-card portal-card--${portal.id}`}
                role="group"
                aria-labelledby={`portal-${portal.id}-title`}
              >
                <div className="portal-card__halo" aria-hidden />
                <p className="portal-card__epoch">{portal.epoch}</p>
                <h3 id={`portal-${portal.id}-title`} className="portal-card__title">
                  {portal.headline}
                </h3>
                <p className="portal-card__body">{portal.body}</p>

                <ul className="portal-card__highlights" aria-label={`${portal.headline} highlights`}>
                  {portal.highlights.map((highlight) => (
                    <li key={`${portal.id}-${highlight.label}`}>
                      <span className="portal-card__dot" aria-hidden />
                      <div>
                        <p className="portal-card__highlight-label">{highlight.label}</p>
                        <p className="portal-card__highlight-detail">{highlight.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="portal-card__cta">
                  <a
                    className="portal-card__cta-link"
                    href={portal.ctaHref}
                    aria-describedby={`portal-${portal.id}-title`}
                  >
                    <span>{portal.ctaLabel}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="portal-card__cta-icon">
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </article>
            </PortalCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
