/**
 * Origem da visita (página + campanha) para atribuir a conversa do WhatsApp.
 *
 * Os parâmetros de campanha da landing ficam no sessionStorage porque o
 * visitante costuma navegar antes de clicar no WhatsApp. Nada sai do navegador
 * por aqui: o ref só vai na mensagem que o próprio visitante envia, e o fbclid
 * só é lido pela Conversion API, que já exige consentimento de marketing.
 */

const STORAGE_KEY = "reserve-attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  /** Momento da captura do fbclid, exigido no formato do cookie _fbc. */
  fbclidAt?: number;
};

/** Guarda os parâmetros de campanha da URL atual, se houver (último toque). */
export function captureAttribution(search: string) {
  try {
    const params = new URLSearchParams(search);
    const found: Attribution = {};
    for (const key of PARAMS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 200);
    }
    if (Object.keys(found).length === 0) return;
    if (found.fbclid) found.fbclidAt = Date.now();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // sessionStorage indisponível: segue sem atribuição de campanha
  }
}

export function getAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}

/** Reduz a [a-z0-9_-] para o token caber num `ref:` lido por regex. */
function toToken(value: string, max: number): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/_{2,}/g, "_")
    .replace(/^[-_]+|[-_]+$/g, "")
    .slice(0, max);
}

/**
 * Código de origem que vai no fim da mensagem do WhatsApp, lido pelo bot.
 * Ex.: `site_meta-ads` ou `site_home__inverno_2026` (página __ utm_campaign).
 */
export function buildWhatsAppRef(pathname: string, campaign?: string): string {
  const page = toToken(pathname.replace(/\//g, "-"), 60) || "home";
  const camp = campaign ? toToken(campaign, 40) : "";
  return camp ? `site_${page}__${camp}` : `site_${page}`;
}
