"use client";

import { useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// Fallback para usuários (e bots) que nunca interagem com a página.
// Longo o suficiente para cair fora da janela FCP→TTI medida pelo Lighthouse.
const FALLBACK_DELAY_MS = 8000;

const INTERACTION_EVENTS: (keyof WindowEventMap)[] = [
  "pointerdown",
  "keydown",
  "touchstart",
  "wheel",
  "scroll",
];

function loadGTM(id: string) {
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
 * Carrega GTM e Microsoft Clarity fora do caminho crítico: só na primeira
 * interação do usuário (ou após FALLBACK_DELAY_MS). Com `afterInteractive`
 * esses scripts executavam dentro da janela FCP→TTI e respondiam pela maior
 * parte do TBT medido pelo Lighthouse (~1s de "Other" + reflow forçado do
 * Clarity). O dataLayer é criado imediatamente, então eventos disparados
 * antes do gtm.js carregar ficam enfileirados e são processados depois.
 */
export default function DeferredAnalytics() {
  useEffect(() => {
    if (!GTM_ID && !CLARITY_ID) return;

    window.dataLayer = window.dataLayer || [];

    let loaded = false;

    function load() {
      if (loaded) return;
      loaded = true;
      cleanup();
      if (GTM_ID) loadGTM(GTM_ID);
      if (CLARITY_ID) loadClarity(CLARITY_ID);
    }

    function cleanup() {
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    }

    INTERACTION_EVENTS.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true })
    );
    const timer = setTimeout(load, FALLBACK_DELAY_MS);

    return cleanup;
  }, []);

  return null;
}
