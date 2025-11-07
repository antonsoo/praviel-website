import { useSyncExternalStore } from "react";

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

export function useCookiePreferences() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
