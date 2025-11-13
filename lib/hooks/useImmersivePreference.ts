"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const IMMERSIVE_STORAGE_KEY = "praviel:immersivePref";
const PREF_EVENT = "praviel:immersive-pref";

export type ImmersivePreference = "auto" | "on" | "off";
type SetImmersivePreference = (_value: ImmersivePreference) => void;

const isBrowser = () => typeof window !== "undefined";

function readStoredPreference(): ImmersivePreference | null {
  if (!isBrowser()) return null;
  try {
    const stored = window.localStorage.getItem(IMMERSIVE_STORAGE_KEY);
    if (stored === "auto" || stored === "on" || stored === "off") {
      return stored;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function writeStoredPreference(value: ImmersivePreference) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(IMMERSIVE_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

function updateDocumentDataset(value: ImmersivePreference) {
  if (!isBrowser()) return;
  document.documentElement.dataset.immersivePref = value;
}

export function useImmersivePreference(): [ImmersivePreference, SetImmersivePreference] {
  const [preference, setPreferenceState] = useState<ImmersivePreference>("auto");

  useEffect(() => {
    const stored = readStoredPreference();
    if (stored) {
      setPreferenceState(stored);
      updateDocumentDataset(stored);
    } else {
      updateDocumentDataset("auto");
    }
  }, []);

  useEffect(() => {
    if (!isBrowser()) return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === IMMERSIVE_STORAGE_KEY && event.newValue) {
        const next = event.newValue as ImmersivePreference;
        setPreferenceState(next);
        updateDocumentDataset(next);
      }
    };
    const handleCustom = (event: Event) => {
      const custom = event as CustomEvent<ImmersivePreference>;
      if (custom.detail) {
        setPreferenceState(custom.detail);
        updateDocumentDataset(custom.detail);
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(PREF_EVENT, handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(PREF_EVENT, handleCustom);
    };
  }, []);

  const setPreference = useCallback((value: ImmersivePreference) => {
    setPreferenceState(value);
    writeStoredPreference(value);
    updateDocumentDataset(value);
    if (isBrowser()) {
      window.dispatchEvent(new CustomEvent<ImmersivePreference>(PREF_EVENT, { detail: value }));
    }
  }, []);

  return useMemo(() => [preference, setPreference], [preference, setPreference]);
}
