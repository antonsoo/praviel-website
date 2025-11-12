"use client";

import { useReducedMotion } from "motion/react";

type GlyphTickerProps = {
  className?: string;
};

const GLYPH_ITEMS = [
  { id: "egypt", glyph: "𓂀", name: "Middle Egyptian", detail: "Papyrus, 12th Dynasty" },
  { id: "greece", glyph: "Ω", name: "Classical Greek", detail: "Iliad · Venetus A" },
  { id: "rome", glyph: "Ↄ", name: "Classical Latin", detail: "Aeneid · Palatine" },
  { id: "hebrew", glyph: "א", name: "Biblical Hebrew", detail: "Dead Sea Scrolls" },
  { id: "sanskrit", glyph: "श", name: "Classical Sanskrit", detail: "Mahābhārata" },
  { id: "akkadian", glyph: "𒀭", name: "Akkadian", detail: "Epic of Gilgamesh" },
] as const;

export default function GlyphTicker({ className = "" }: GlyphTickerProps) {
  const shouldReduceMotion = useReducedMotion();
  const repeatedItems = shouldReduceMotion ? GLYPH_ITEMS : [...GLYPH_ITEMS, ...GLYPH_ITEMS];

  return (
    <section
      className={["glyph-ticker", className].filter(Boolean).join(" ")}
      aria-label="Ancient writing systems represented on PRAVIEL"
    >
      <div className="glyph-ticker__mask">
        <div
          className={["glyph-ticker__track", shouldReduceMotion ? "glyph-ticker__track--static" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {repeatedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="glyph-ticker__item">
              <span className="glyph-ticker__glyph" aria-hidden>
                {item.glyph}
              </span>
              <span className="glyph-ticker__meta">
                <span className="glyph-ticker__name">{item.name}</span>
                <span className="glyph-ticker__detail">{item.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Scripts shown: {GLYPH_ITEMS.map((item) => `${item.name} (${item.detail})`).join(", ")}
      </p>
    </section>
  );
}
