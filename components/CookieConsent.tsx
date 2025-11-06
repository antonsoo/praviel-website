"use client";

import { useEffect, useState } from "react";

type CookiePreferences = {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
};

const STORAGE_KEY = "cookie_consent";
const STORAGE_DATE_KEY = "cookie_consent_date";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = window.setTimeout(() => setShowBanner(true), 1000);
      return () => window.clearTimeout(timer);
    }

    try {
      const parsed = JSON.parse(stored) as CookiePreferences;
      setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
    } catch {
      setPreferences(DEFAULT_PREFERENCES);
    }
  }, []);

  const persistPreferences = (prefs: CookiePreferences) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    window.localStorage.setItem(STORAGE_DATE_KEY, new Date().toISOString());
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: prefs }));
  };

  const handleAcceptAll = () => {
    const updated = { essential: true, functional: true, analytics: true };
    setPreferences(updated);
    persistPreferences(updated);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    setPreferences(DEFAULT_PREFERENCES);
    persistPreferences(DEFAULT_PREFERENCES);
    setShowBanner(false);
  };

  const handleSave = () => {
    persistPreferences(preferences);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        role="presentation"
        onClick={() => !showDetails && setShowBanner(false)}
      />

      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/95 via-zinc-950/95 to-black p-6 text-sm text-zinc-200 shadow-2xl shadow-black/40">
        <header className="space-y-2 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8C55B]">Privacy-first telemetry</p>
          <h2 className="text-2xl font-semibold text-white">Cookies for scholars, not advertisers</h2>
          <p className="text-zinc-400">
            We only use essential cookies unless you opt into functional or anonymized analytics. Toggle the extra data streams at any time.
          </p>
        </header>

        {showDetails ? (
          <div className="mt-6 space-y-4" aria-live="polite">
            <PreferenceToggle
              title="Functional"
              description="Remember theme, language, and waitlist state."
              enabled={preferences.functional}
              onToggle={(value) => setPreferences((prev) => ({ ...prev, functional: value }))}
            />
            <PreferenceToggle
              title="Analytics"
              description="Measure site performance without storing personal data."
              enabled={preferences.analytics}
              onToggle={(value) => setPreferences((prev) => ({ ...prev, analytics: value }))}
            />
          </div>
        ) : (
          <ul className="mt-6 space-y-4 text-zinc-300">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#E8C55B]" aria-hidden />
              Essential cookies keep the session secure. Enabled by default.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#3b82f6]" aria-hidden />
              Functional cookies remember UI preferences for returning scholars.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              Analytics cookies help us monitor Core Web Vitals—no ads, no trackers.
            </li>
          </ul>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {showDetails ? (
            <>
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="flex-1 rounded-xl border border-white/15 bg-black/40 px-5 py-3 font-medium text-white transition hover:bg-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-xl border border-[#E8C55B]/40 bg-gradient-to-r from-[#D4AF37] to-[#E8C55B] px-5 py-3 font-semibold text-black shadow-[0_12px_40px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5"
              >
                Save preferences
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleRejectAll}
                className="flex-1 rounded-xl border border-white/15 bg-black/50 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 rounded-xl border border-[#E8C55B]/40 bg-gradient-to-r from-[#D4AF37] to-[#E8C55B] px-5 py-3 font-semibold text-black shadow-[0_12px_40px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5"
              >
                Accept all
              </button>
            </>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setShowDetails((value) => !value)}
            className="text-violet-300 underline-offset-4 transition hover:text-violet-200"
          >
            {showDetails ? "Hide advanced controls" : "Customize settings"}
          </button>
          <a href="/privacy" className="text-zinc-400 underline-offset-4 hover:text-zinc-200">
            Read the privacy policy →
          </a>
        </div>
      </div>
    </div>
  );
}

function PreferenceToggle({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (_value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="pr-4">
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>
      <button
        type="button"
        aria-pressed={enabled}
        onClick={() => onToggle(!enabled)}
        className={`h-7 w-12 rounded-full border transition ${
          enabled ? "border-emerald-400 bg-emerald-400/30" : "border-zinc-700 bg-zinc-800"
        }`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow transition ${
            enabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
