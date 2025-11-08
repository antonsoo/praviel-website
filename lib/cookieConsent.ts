import { useSyncExternalStore, useEffect, useState } from "react";

export type CookiePreferences = {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
};

export const COOKIE_STORAGE_KEY = "cookie_consent";
export const COOKIE_DATE_KEY = "cookie_consent_date";
export const COOKIE_EVENT = "cookieConsentUpdated";

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
};

type Listener = () => void;

type WindowWithStorage = Window & {
  localStorage?: Storage;
};

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return (window as WindowWithStorage).localStorage ?? null;
  } catch {
    return null;
  }
}

export function readCookiePreferences(): CookiePreferences {
  const storage = getStorage();
  if (!storage) {
    return DEFAULT_COOKIE_PREFERENCES;
  }
  const raw = storage.getItem(COOKIE_STORAGE_KEY);
  if (!raw) {
    return DEFAULT_COOKIE_PREFERENCES;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return {
      ...DEFAULT_COOKIE_PREFERENCES,
      ...parsed,
    } satisfies CookiePreferences;
  } catch {
    return DEFAULT_COOKIE_PREFERENCES;
  }
}

export function persistCookiePreferences(prefs: CookiePreferences) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
  storage.setItem(COOKIE_DATE_KEY, new Date().toISOString());
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(COOKIE_EVENT, { detail: prefs }));
  }
}

export function hasStoredCookiePreferences(): boolean {
  const storage = getStorage();
  if (!storage) {
    return false;
  }
  return Boolean(storage.getItem(COOKIE_STORAGE_KEY) ?? storage.getItem(COOKIE_DATE_KEY));
}

function subscribe(listener: Listener) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleEvent = () => listener();
  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === COOKIE_STORAGE_KEY ||
      event.key === COOKIE_DATE_KEY
    ) {
      listener();
    }
  };

  window.addEventListener(COOKIE_EVENT, handleEvent as EventListener);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(COOKIE_EVENT, handleEvent as EventListener);
    window.removeEventListener("storage", handleStorage);
  };
}

const getSnapshot = () => readCookiePreferences();
const getServerSnapshot = () => DEFAULT_COOKIE_PREFERENCES;

/**
 * React hook for accessing cookie preferences with proper SSR/hydration support.
 *
 * CRITICAL: This implementation prevents hydration mismatches in Next.js 16 Cache Components.
 *
 * The Problem:
 * - Layout uses 'use cache' directive, pre-rendering with default preferences
 * - Client-side hydration must match this cached HTML exactly
 * - Reading localStorage during hydration causes mismatch if user has saved preferences
 *
 * The Solution:
 * - Return server snapshot (defaults) during initial client render
 * - Only read from localStorage AFTER hydration completes
 * - This ensures cached HTML matches initial client render
 * - After hydration, a second render updates to actual localStorage values
 *
 * Trade-offs:
 * - Extra re-render after mount (acceptable for correctness)
 * - Brief flash of default preferences for returning users (imperceptible)
 */
export function useCookiePreferences() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Use server snapshot during hydration, switch to client snapshot after
  const clientSnapshot = hydrated ? getSnapshot : getServerSnapshot;

  return useSyncExternalStore(subscribe, clientSnapshot, getServerSnapshot);
}
