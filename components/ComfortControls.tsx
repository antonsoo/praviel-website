"use client";

import { useState } from "react";

import type { ComfortPreferences } from "@/lib/hooks/useComfortPreferences";
import { useComfortPreferences } from "@/lib/hooks/useComfortPreferences";

const typeScaleOptions = [
  { value: "base" as const, label: "Classic size", description: "Default typography tuned for 16px root." },
  { value: "plus" as const, label: "Scholar size", description: "+10% scale for longform reading." },
];

const contrastOptions = [
  { value: "default" as const, label: "Gallery contrast" },
  { value: "high" as const, label: "High contrast" },
];

const fontOptions = [
  { value: "sans" as const, label: "Sans" },
  { value: "serif" as const, label: "Serif" },
];

const OPTION_LABELS: Record<keyof ComfortPreferences, string> = {
  typeScale: "Type scale",
  contrast: "Contrast",
  bodyFont: "Body font",
};

export default function ComfortControls() {
  const [preferences, updatePreferences] = useComfortPreferences();
  const [liveMessage, setLiveMessage] = useState<string>("");

  const handleUpdate = (partial: Partial<ComfortPreferences>) => {
    updatePreferences(partial);
    const [entry] = Object.entries(partial);
    if (entry) {
      const [key, value] = entry as [keyof ComfortPreferences, string];
      setLiveMessage(`${OPTION_LABELS[key]} set to ${value}.`);
    }
  };

  return (
    <section className="comfort-panel rounded-[28px] border border-white/10 bg-black/40 p-4 sm:p-5 shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl" aria-labelledby="comfort-controls-title">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p id="comfort-controls-title" className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E8C55B]">
            Comfort controls
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Tune readability without leaving the page. Stored locally, synced across tabs.
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-500">Contrast · Type · Font</span>
      </div>

      <div className="mt-4 grid gap-4">
        <fieldset>
          <legend className="text-xs uppercase tracking-[0.3em] text-zinc-500">Type scale</legend>
          <div className="mt-2 flex flex-col gap-2" role="radiogroup" aria-label="Type scale">
            {typeScaleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={preferences.typeScale === option.value}
                className={`rounded-2xl border px-4 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60 ${
                  preferences.typeScale === option.value ? "border-[#E8C55B]/40 bg-[#E8C55B]/10 text-white" : "border-white/10 text-zinc-300 hover:border-white/30"
                }`}
                onClick={() => handleUpdate({ typeScale: option.value })}
              >
                <span className="font-semibold">{option.label}</span>
                <p className="text-xs text-zinc-400">{option.description}</p>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs uppercase tracking-[0.3em] text-zinc-500">Contrast</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {contrastOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={preferences.contrast === option.value}
                className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60 ${
                  preferences.contrast === option.value ? "border-[#E8C55B]/40 bg-[#E8C55B]/15 text-white" : "border-white/10 text-zinc-300"
                }`}
                onClick={() => handleUpdate({ contrast: option.value })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs uppercase tracking-[0.3em] text-zinc-500">Body font</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {fontOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={preferences.bodyFont === option.value}
                className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60 ${
                  preferences.bodyFont === option.value ? "border-[#E8C55B]/40 bg-[#E8C55B]/15 text-white" : "border-white/10 text-zinc-300"
                }`}
                onClick={() => handleUpdate({ bodyFont: option.value })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="sr-only" aria-live="polite">
        {liveMessage}
      </p>
    </section>
  );
}
