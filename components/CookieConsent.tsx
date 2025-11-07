"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
  COOKIE_DATE_KEY,
  COOKIE_EVENT,
  COOKIE_STORAGE_KEY,
  type CookiePreferences,
  hasStoredCookiePreferences,
  persistCookiePreferences,
  useCookiePreferences,
} from "@/lib/cookieConsent";
import { useUserIntentGate } from "@/lib/hooks/useUserIntentGate";

type PreferenceKey = keyof CookiePreferences;

type PreferenceConfig = {
  key: PreferenceKey;
  title: string;
  description: string;
  readOnly?: boolean;
};

const preferenceConfig: PreferenceConfig[] = [
  {
    key: "essential",
    title: "Essential infrastructure",
    description: "Security, auth, and waitlist API calls (always on).",
    readOnly: true,
  },
  {
    key: "functional",
    title: "Functional enhancements",
    description: "Sticky CTA, ambient audio, saved demo settings.",
  },
  {
    key: "analytics",
    title: "Privacy-safe analytics",
    description: "Aggregated Core Web Vitals + conversion telemetry.",
  },
];

export default function CookieConsent() {
  const cardRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isTestHarness = pathname?.startsWith("/test");
  const storedPreferences = useCookiePreferences();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(storedPreferences);
  const [mode, setMode] = useState<"summary" | "advanced">("summary");
  const [panelOpen, setPanelOpen] = useState(false);
  const [hasChoice, setHasChoice] = useState(() => hasStoredCookiePreferences());
  const intentReady = useUserIntentGate({ scrollDistance: 80, fallbackDelay: 120_000 });

  useEffect(() => {
    setLocalPreferences(storedPreferences);
  }, [storedPreferences]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const syncChoice = () => setHasChoice(hasStoredCookiePreferences());
    syncChoice();
    const handleCookieEvent = () => syncChoice();
    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === null ||
        event.key === COOKIE_STORAGE_KEY ||
        event.key === COOKIE_DATE_KEY
      ) {
        syncChoice();
      }
    };
    window.addEventListener(COOKIE_EVENT, handleCookieEvent as EventListener);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(COOKIE_EVENT, handleCookieEvent as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const shouldPrompt = intentReady && !hasChoice;
  const showCompactCard = shouldPrompt && !panelOpen;
  const showAdvancedPanel = panelOpen;
  const activeMode = mode;

  useEffect(() => {
    if (shouldPrompt) {
      setMode("summary");
    }
  }, [shouldPrompt]);

  useEffect(() => {
    if ((showCompactCard || showAdvancedPanel) && cardRef.current) {
      cardRef.current.focus({ preventScroll: true });
    }
  }, [showAdvancedPanel, showCompactCard]);

  const summaryStats = useMemo(
    () => ({
      functional: storedPreferences.functional ? "Enabled" : "Off",
      analytics: storedPreferences.analytics ? "Enabled" : "Off",
    }),
    [storedPreferences.analytics, storedPreferences.functional],
  );

  const handlePersist = (next: CookiePreferences) => {
    persistCookiePreferences(next);
    setPanelOpen(false);
    setMode("summary");
  };

  const handleAcceptAll = () => handlePersist({ essential: true, functional: true, analytics: true });
  const handleEssentialOnly = () => handlePersist({ essential: true, functional: false, analytics: false });
  const handleSave = () => handlePersist(localPreferences);

  const updatePreference = (key: PreferenceKey, value: boolean) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [key]: key === "essential" ? true : value,
    }));
  };

  if (isTestHarness) {
    return null;
  }

  if (!showCompactCard && !showAdvancedPanel) {
    if (hasChoice) {
      return (
        <button
          type="button"
          aria-label="Open privacy controls"
          onClick={() => {
            setPanelOpen(true);
            setMode("advanced");
          }}
          className="fixed bottom-[calc(1rem+var(--safe-area-bottom))] right-[calc(1rem+var(--safe-area-right))] z-40 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 shadow-lg shadow-black/30 transition hover:bg-white/20"
        >
          Privacy controls
        </button>
      );
    }

    return null;
  }

  if (showCompactCard) {
    return (
      <section
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-live="polite"
        aria-label="Cookie preferences"
        className="fixed bottom-[calc(1rem+var(--safe-area-bottom))] right-[calc(1rem+var(--safe-area-right))] z-40 w-[min(18rem,90vw)] rounded-2xl border border-white/12 bg-zinc-950/90 p-4 text-xs text-white shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">Privacy-first telemetry</p>
        <p className="mt-2 text-[13px] text-white/80">
          Essentials keep auth + waitlist online. Enable optional features when you want sticky CTAs or anonymized analytics.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="w-full rounded-xl border border-white/25 bg-white/95 px-4 py-2 text-[13px] font-semibold text-[#020202] shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="w-full rounded-xl border border-[#E8C55B]/40 bg-gradient-to-r from-[#D4AF37] to-[#E8C55B] px-4 py-2 text-[13px] font-semibold text-black shadow-[0_8px_28px_rgba(212,175,55,0.35)]"
          >
            Enable optional
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setPanelOpen(true);
            setMode("advanced");
          }}
          className="mt-3 w-full rounded-xl border border-white/20 bg-transparent px-4 py-2 text-[12px] font-semibold text-white/80 transition hover:bg-white/5"
        >
          Advanced controls
        </button>
      </section>
    );
  }

  return (
    <section
      ref={cardRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-[calc(1rem+var(--safe-area-bottom))] z-40 rounded-3xl border border-white/10 bg-zinc-950/95 p-5 text-white shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur sm:left-auto sm:right-[calc(1rem+var(--safe-area-right))] sm:w-full sm:max-w-md"
    >
      <header className="flex items-start gap-3">
        <div className="flex-1 space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">Privacy-first telemetry</p>
          <h2 className="text-lg font-semibold">Control optional cookies</h2>
          <p className="text-sm text-zinc-300">
            Essentials keep auth + waitlist online. Enable optional features if you want sticky CTAs, ambient audio, or anonymized analytics.
          </p>
        </div>
        {hasChoice && !shouldPrompt ? (
          <button
            type="button"
            aria-label="Close privacy controls"
            onClick={() => setPanelOpen(false)}
            className="rounded-full border border-white/15 p-2 text-zinc-400 transition hover:text-white"
          >
            &times;
          </button>
        ) : null}
      </header>

      {activeMode === "summary" ? (
        <div className="mt-5 space-y-4">
          <dl className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-300">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.3em] text-white/50">Functional</dt>
              <dd className="text-base font-semibold text-white">{summaryStats.functional}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.3em] text-white/50">Analytics</dt>
              <dd className="text-base font-semibold text-white">{summaryStats.analytics}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="w-full rounded-2xl border border-white/30 bg-white/90 px-5 py-3 text-sm font-semibold text-[#020202] shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition hover:bg-white"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="w-full rounded-2xl border border-[#E8C55B]/40 bg-gradient-to-r from-[#D4AF37] to-[#E8C55B] px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_45px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5"
            >
              Accept all
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMode("advanced");
              setPanelOpen(true);
            }}
            className="w-full rounded-2xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Customize settings
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {preferenceConfig.map((item) => (
            <PreferenceToggle
              key={item.key}
              title={item.title}
              description={item.description}
              enabled={localPreferences[item.key]}
              readOnly={item.readOnly}
              onToggle={(value) => updatePreference(item.key, value)}
            />
          ))}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setMode("summary")}
              className="flex-1 rounded-2xl border border-white/30 bg-white/90 px-5 py-3 text-sm font-semibold text-[#020202] shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition hover:bg-white"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-2xl border border-[#E8C55B]/40 bg-gradient-to-r from-[#D4AF37] to-[#E8C55B] px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_45px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5"
            >
              Save choices
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-[11px] text-zinc-400">
        Read the full policy →{" "}
        <a href="/privacy" className="text-[#E8C55B] underline-offset-2 hover:underline">
          praviel.com/privacy
        </a>
      </p>
    </section>
  );
}

function PreferenceToggle({
  title,
  description,
  enabled,
  onToggle,
  readOnly,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (_value: boolean) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-zinc-400">{description}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          disabled={readOnly}
          onClick={() => !readOnly && onToggle(!enabled)}
          className={`relative h-8 w-14 rounded-full border transition ${
            enabled ? "border-emerald-300/70 bg-emerald-400/30" : "border-zinc-700 bg-black/60"
          } ${readOnly ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <span
            className={`absolute top-0.5 h-7 w-7 rounded-full bg-white shadow transition ${
              enabled ? "right-0.5" : "left-0.5"
            }`}
          />
          <span className="sr-only">{enabled ? "Enabled" : "Disabled"}</span>
        </button>
      </div>
    </div>
  );
}
