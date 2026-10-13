import { useSyncExternalStore } from "react";

// Bump when the list of third-party services changes, so visitors are asked again.
const CONSENT_VERSION = 1;
const STORAGE_KEY = "misad-cookie-consent";
const CHANGE_EVENT = "misad-cookie-consent-change";
const OPEN_PREFERENCES_EVENT = "misad-cookie-preferences-open";

export interface CookieConsent {
  version: number;
  /** Google Maps embed (third-party cookies set by Google). */
  maps: boolean;
  /** ISO date of the visitor's choice. */
  date: string;
}

// In-memory copy so the choice still applies for this page view when storage is blocked.
let memoryRaw: string | null = null;
let cachedRaw: string | null | undefined;
let cachedConsent: CookieConsent | null = null;

const readRaw = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? memoryRaw;
  } catch {
    return memoryRaw;
  }
};

const readConsent = (): CookieConsent | null => {
  const raw = readRaw();
  if (raw === cachedRaw) return cachedConsent;
  cachedRaw = raw;

  try {
    const parsed = raw ? (JSON.parse(raw) as CookieConsent) : null;
    cachedConsent = parsed?.version === CONSENT_VERSION ? parsed : null;
  } catch {
    cachedConsent = null;
  }
  return cachedConsent;
};

export const saveConsent = (choices: Pick<CookieConsent, "maps">) => {
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    maps: choices.maps,
    date: new Date().toISOString(),
  };
  memoryRaw = JSON.stringify(consent);
  try {
    localStorage.setItem(STORAGE_KEY, memoryRaw);
  } catch {
    // Storage blocked (private mode, strict settings): memoryRaw keeps it for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

const subscribe = (callback: () => void) => {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

/** Current consent, or null when the visitor has not chosen yet. */
export const useCookieConsent = () =>
  useSyncExternalStore(subscribe, readConsent, () => null);

export const openCookiePreferences = () => {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
};

export const onOpenCookiePreferences = (callback: () => void) => {
  window.addEventListener(OPEN_PREFERENCES_EVENT, callback);
  return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, callback);
};
