"use client";

import type { ImmersivePreference } from "@/lib/hooks/useImmersivePreference";
import { useImmersivePreference } from "@/lib/hooks/useImmersivePreference";

type ImmersiveModeToggleProps = {
  className?: string;
};

const OPTIONS: Array<{
  value: ImmersivePreference;
  title: string;
  description: string;
}> = [
  {
    value: "auto",
    title: "Auto",
    description: "Follows your device motion settings, power mode, and connection quality.",
  },
  {
    value: "on",
    title: "Immersive",
    description: "Force full torchlight, volumetric fog, and constellation layers even on limited hardware.",
  },
  {
    value: "off",
    title: "Minimal",
    description: "Disable cinematic lighting and stay on static textures for sensitive viewers.",
  },
];

export default function ImmersiveModeToggle({ className = "" }: ImmersiveModeToggleProps) {
  const [preference, setPreference] = useImmersivePreference();

  return (
    <section
      aria-labelledby="immersive-toggle-title"
      className={[
        "comfort-panel rounded-[28px] border border-white/10 bg-white/5/80 p-4 sm:p-5 text-left shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        className,
      ].filter(Boolean).join(" ")}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p id="immersive-toggle-title" className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E8C55B]">
            Immersive visuals
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Choose how much motion and glow you want. Auto follows your accessibility preferences.
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-500">Torch / fog / glow</span>
      </div>

      <div className="mt-4 flex flex-col gap-3" role="radiogroup" aria-label="Immersive mode">
        {OPTIONS.map((option) => {
          const isActive = preference === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setPreference(option.value)}
              className={[
                "rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/50",
                isActive
                  ? "border-[#E8C55B]/40 bg-[#E8C55B]/15 text-white"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25",
              ].join(" ")}
            >
              <span className="text-sm font-semibold">{option.title}</span>
              <p className="mt-1 text-xs text-zinc-400">{option.description}</p>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
        These controls back up the native “prefers-reduced-motion” signal so anyone can throttle effects on any device.
      </p>
    </section>
  );
}
