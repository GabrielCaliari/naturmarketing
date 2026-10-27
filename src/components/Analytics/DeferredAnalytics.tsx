"use client";

import { useEffect } from "react";
import { getConsent, hasAnalyticsConsent, onConsentChange } from "@/lib/consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const INTERACTION_EVENTS: (keyof WindowEventMap)[] = [
  "pointerdown",
  "keydown",
  "touchstart",
  "wheel",
  "scroll",
];

// Comandos do Consent Mode precisam entrar no dataLayer como o objeto
// `arguments`, igual ao snippet oficial do gtag — um array não é reconhecido.
function gtag(..._args: unknown[]): void;
function gtag() {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments as unknown as Record<string, unknown>);
}

// Sinais do Consent Mode v2 para as tags dentro do GTM: o GTM só carrega com
// consentimento de analytics, mas tags de anúncio lá dentro ainda dependem
// do consentimento de marketing.
function consentState() {
  const prefs = getConsent();
  const ads = prefs?.marketing ? "granted" : "denied";
  return {
    analytics_storage: prefs?.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

function loadGTM(id: string) {
  gtag("consent", "default", consentState());
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(s);
}

function loadClarity(id: string) {
  type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
  const w = window as Window & { clarity?: ClarityFn };
  if (w.clarity) return;
  const stub: ClarityFn = (...args: unknown[]) => {
    (stub.q = stub.q || []).push(args);
  };
  w.clarity = stub;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${id}`;
  document.head.appendChild(s);
}

/**
 * Carrega GTM e Microsoft Clarity fora do caminho crítico e só com
 * consentimento de analytics (LGPD): espera a primeira interação real do
 * usuário E o consentimento, na ordem que vier. Quem aceita pelo banner já
 * interagiu (o pointerdown do clique), então carrega no próprio aceite.
 *
 * Sem fallback por tempo — page views de quem nunca interage têm valor
 * analítico quase nulo, e um timer fixo dispararia dentro da janela de medição
 * do Lighthouse, inflando o TBT. O dataLayer é criado imediatamente, então
 * eventos disparados antes do gtm.js carregar ficam enfileirados e são
 * processados depois.
 */
export default function DeferredAnalytics() {
  useEffect(() => {
    if (!GTM_ID && !CLARITY_ID) return;

    window.dataLayer = window.dataLayer || [];

    let interacted = false;
    let loaded = false;

    function maybeLoad() {
      if (loaded || !interacted || !hasAnalyticsConsent()) return;
      loaded = true;
      if (GTM_ID) loadGTM(GTM_ID);
      if (CLARITY_ID) loadClarity(CLARITY_ID);
    }

    function onInteraction() {
      interacted = true;
      removeInteractionListeners();
      maybeLoad();
    }

    function removeInteractionListeners() {
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, onInteraction));
    }

    INTERACTION_EVENTS.forEach((e) =>
      window.addEventListener(e, onInteraction, { once: true, passive: true })
    );

    const unsubscribe = onConsentChange(() => {
      if (loaded && GTM_ID) gtag("consent", "update", consentState());
      else maybeLoad();
    });

    return () => {
      removeInteractionListeners();
      unsubscribe();
    };
  }, []);

  return null;
}
