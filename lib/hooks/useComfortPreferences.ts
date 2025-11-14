"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type TypeScalePreference = "base" | "plus";
export type ContrastPreference = "default" | "high";
export type BodyFontPreference = "sans" | "serif";

export type ComfortPreferences = {
  typeScale: TypeScalePreference;
  contrast: ContrastPreference;
  bodyFont: BodyFontPreference;
};

type UpdateComfortPreferences = (_value: Partial<ComfortPreferences>) => void;

const COMFORT_STORAGE_KEY = "praviel:comfortPrefs";
const COMFORT_EVENT = "praviel:comfort-pref";
const DEFAULT_PREFERENCES: ComfortPreferences = {
  typeScale: "base",
  contrast: "default",
  bodyFont: "sans",
};

const isBrowser = () => typeof window !== "undefined";

const clampPreferences = (value: unknown): ComfortPreferences => {
  if (!value || typeof value !== "object") return DEFAULT_PREFERENCES;
  const record = value as Partial<ComfortPreferences>;
  return {
    typeScale: record.typeScale === "plus" ? "plus" : "base",
    contrast: record.contrast === "high" ? "high" : "default",
    bodyFont: record.bodyFont === "serif" ? "serif" : "sans",
  };
};

function readStoredPreferences(): ComfortPreferences | null {
  if (!isBrowser()) return null;
  try {
    const stored = window.localStorage.getItem(COMFORT_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return clampPreferences(parsed);
  } catch {
    return null;
  }
}

function writeStoredPreferences(value: ComfortPreferences) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(COMFORT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function applyDataset(value: ComfortPreferences) {
  if (!isBrowser()) return;
  const root = document.documentElement;
  root.dataset.typeScale = value.typeScale;
  root.dataset.contrast = value.contrast;
  root.dataset.bodyFont = value.bodyFont;
}

export function useComfortPreferences(): [ComfortPreferences, UpdateComfortPreferences] {
  // CRITICAL FIX: Initialize state from data attributes set by bootstrap script
  // This prevents hydration mismatch by ensuring server and client render the same initial state
  const [preferences, setPreferences] = useState<ComfortPreferences>(() => {
    if (!isBrowser()) return DEFAULT_PREFERENCES;

    // Read from data attributes that were set by the bootstrap script in layout.tsx
    // This ensures the initial React state matches what's already in the DOM
    const root = document.documentElement;
    return {
      typeScale: root.dataset.typeScale === "plus" ? "plus" : "base",
      contrast: root.dataset.contrast === "high" ? "high" : "default",
      bodyFont: root.dataset.bodyFont === "serif" ? "serif" : "sans",
    };
  });

  useEffect(() => {
    // Verify stored preferences match current state, update if needed
    const stored = readStoredPreferences();
    if (stored) {
      const current = preferences;
      if (stored.typeScale !== current.typeScale ||
          stored.contrast !== current.contrast ||
          stored.bodyFont !== current.bodyFont) {
        setPreferences(stored);
        applyDataset(stored);
      }
    }
  }, []);

  useEffect(() => {
    if (!isBrowser()) return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === COMFORT_STORAGE_KEY && event.newValue) {
        try {
          const next = clampPreferences(JSON.parse(event.newValue));
          setPreferences(next);
          applyDataset(next);
        } catch {
          /* ignore */
        }
      }
    };
    const handleCustom = (event: Event) => {
      const custom = event as CustomEvent<ComfortPreferences>;
      if (custom.detail) {
        setPreferences(custom.detail);
        applyDataset(custom.detail);
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(COMFORT_EVENT, handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(COMFORT_EVENT, handleCustom);
    };
  }, []);

  const updatePreferences = useCallback((value: Partial<ComfortPreferences>) => {
    setPreferences((prev) => {
      const next = clampPreferences({ ...prev, ...value });
      writeStoredPreferences(next);
      applyDataset(next);
      if (isBrowser()) {
        window.dispatchEvent(new CustomEvent<ComfortPreferences>(COMFORT_EVENT, { detail: next }));
      }
      return next;
    });
  }, []);

  return useMemo(() => [preferences, updatePreferences], [preferences, updatePreferences]);
}

