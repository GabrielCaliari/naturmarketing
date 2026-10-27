/**
 * Consentimento LGPD — fonte única para quem carrega ou dispara rastreamento.
 *
 * O banner (CookieConsent) grava as preferências no localStorage e avisa via
 * evento `reserve:consent`. Categorias:
 * - analytics: GTM (GA4 dentro dele) e Microsoft Clarity
 * - marketing: Meta Pixel e Meta Conversion API
 */

export const CONSENT_KEY = "reserve-cookie-consent";
export const CONSENT_EVENT = "reserve:consent";

export type ConsentPrefs = {
  analytics: boolean;
  marketing: boolean;
  savedAt?: string;
};

export function getConsent(): ConsentPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentPrefs) : null;
  } catch {
    // Navegação privada ou JSON corrompido: trata como sem consentimento
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return getConsent()?.marketing === true;
}

/** Chama `cb` quando o consentimento muda nesta aba ou em outra. Retorna o unsubscribe. */
export function onConsentChange(cb: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) cb();
  };
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}
