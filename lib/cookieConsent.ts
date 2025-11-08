import { useSyncExternalStore, useEffect } from "react";

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

// Cache for snapshot stability - CRITICAL for useSyncExternalStore
// Without caching, every call returns a new object, causing infinite loops
let cachedSnapshot: CookiePreferences = DEFAULT_COOKIE_PREFERENCES;
let lastRawValue: string | null = null;

export function readCookiePreferences(): CookiePreferences {
  const storage = getStorage();
  if (!storage) {
    return DEFAULT_COOKIE_PREFERENCES;
  }

  const raw = storage.getItem(COOKIE_STORAGE_KEY);

  // CRITICAL: Only create new object if raw value actually changed
  // This maintains referential stability required by useSyncExternalStore
  if (raw === lastRawValue) {
    return cachedSnapshot;
  }

  lastRawValue = raw;

  if (!raw) {
    cachedSnapshot = DEFAULT_COOKIE_PREFERENCES;
    return cachedSnapshot;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    cachedSnapshot = {
      ...DEFAULT_COOKIE_PREFERENCES,
      ...parsed,
    } satisfies CookiePreferences;
    return cachedSnapshot;
  } catch {
    cachedSnapshot = DEFAULT_COOKIE_PREFERENCES;
    return cachedSnapshot;
  }
}

export function persistCookiePreferences(prefs: CookiePreferences) {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    storage.setItem(COOKIE_DATE_KEY, new Date().toISOString());
  } catch (error) {
    // Storage might be full (QuotaExceededError) or disabled
    if (typeof console !== "undefined" && console.warn) {
      console.warn("[cookieConsent] Failed to persist preferences:", error);
    }
    return; // Don't invalidate cache or dispatch event if write failed
  }

  // Invalidate cache to ensure fresh read on next getSnapshot call
  lastRawValue = null;

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

// Module-level hydration tracking (shared across all hook instances)
let isClientHydrated = false;

// Server snapshot - always returns default preferences for SSR
const getServerSnapshot = () => DEFAULT_COOKIE_PREFERENCES;

// Client snapshot - stable function reference that checks hydration state internally
// This function reference never changes, preventing infinite loops from changing functions
const getClientSnapshot = () => {
  if (!isClientHydrated) {
    return DEFAULT_COOKIE_PREFERENCES;
  }
  return readCookiePreferences();
};

/**
 * React hook for accessing cookie preferences with proper SSR/hydration support.
 *
 * CRITICAL: This implementation prevents hydration mismatches AND infinite update loops.
 *
 * The Problem:
 * - Layout uses 'use cache' directive, pre-rendering with default preferences
 * - Client-side hydration must match this cached HTML exactly
 * - Reading localStorage during hydration causes mismatch if user has saved preferences
 * - Changing snapshot function reference after mount can cause infinite update loops (React error #185)
 *
 * The Solution:
 * - Use STABLE snapshot function that internally checks hydration state
 * - Module-level flag tracks hydration (doesn't trigger re-renders)
 * - Dispatch event when hydration completes to notify subscribers
 * - This ensures cached HTML matches initial client render
 * - After hydration, subscribers get notified and re-evaluate
 *
 * Trade-offs:
 * - Extra re-render after mount (acceptable for correctness)
 * - Brief flash of default preferences for returning users (imperceptible)
 * - Module-level state (acceptable - hydration is global concept)
 */
export function useCookiePreferences() {
  useEffect(() => {
    if (!isClientHydrated && typeof window !== "undefined") {
      // Mark as hydrated and notify all subscribers
      isClientHydrated = true;
      window.dispatchEvent(new CustomEvent(COOKIE_EVENT));
    }
  }, []);

  // Use the stable module-level snapshot function
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
