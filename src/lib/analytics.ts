/**
 * Biblioteca de Analytics - Rastreamento Completo
 *
 * Envia eventos para:
 * - Google Tag Manager (dataLayer) — exige consentimento de analytics
 * - Meta Pixel (client-side via fbq) — exige consentimento de marketing
 * - Meta Conversion API (server-side via /api/meta-conversion) — idem, só para
 *   os eventos de META_SERVER_EVENTS. Pixel e servidor recebem o mesmo
 *   event_id, e a Meta deduplica.
 */

import { getAttribution } from '@/lib/attribution';
import { hasAnalyticsConsent, hasMarketingConsent } from '@/lib/consent';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Eventos padrão da Meta vão por fbq('track'). Qualquer outro nome precisa de
// fbq('trackCustom'), senão o Gerenciador de Eventos acusa evento não reconhecido.
const META_STANDARD_EVENTS = new Set([
  'AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration',
  'Contact', 'CustomizeProduct', 'Donate', 'FindLocation', 'InitiateCheckout',
  'Lead', 'PageView', 'Purchase', 'Schedule', 'Search', 'StartTrial',
  'SubmitApplication', 'Subscribe', 'ViewContent',
]);

// Só o que serve à otimização de campanha vai server-side. Engajamento
// (scroll, tempo na página) fica no Pixel: o tempo na página dispara a cada
// 30 s e viraria uma chamada de API por visitante a cada 30 s.
// A rota /api/meta-conversion recusa qualquer evento fora desta lista.
export const META_SERVER_EVENTS = new Set(['PageView', 'Lead', 'Contact']);

// Gera um ID único para cada evento (para deduplicação)
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

function readCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];
}

// Envia evento para o dataLayer do GTM
function pushToDataLayer(eventName: string, eventParams: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && window.dataLayer && hasAnalyticsConsent()) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
}

// Inicializa o Pixel na primeira vez que um evento precisa dele — e eventos
// só chegam aqui depois do consentimento de marketing.
function ensureMetaPixel(): boolean {
  if (!META_PIXEL_ID) return false;
  // `typeof`: o tipo global declara fbq sempre definido, mas antes do init não está
  if (typeof window.fbq === 'function') return true;

  type FbqFn = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[];
    loaded: boolean;
    version: string;
    push: (...args: unknown[]) => void;
  };

  const fbqFn: FbqFn = function (...args: unknown[]) {
    if (fbqFn.callMethod) {
      fbqFn.callMethod(...args);
    } else {
      fbqFn.queue.push(args);
    }
  } as FbqFn;

  window._fbq = fbqFn;
  window.fbq = fbqFn;
  fbqFn.push = fbqFn;
  fbqFn.loaded = true;
  fbqFn.version = '2.0';
  fbqFn.queue = [];

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);

  fbqFn('init', META_PIXEL_ID);
  return true;
}

// Envia evento para Meta Pixel (client-side)
function pushToMetaPixel(
  eventName: string,
  eventParams: Record<string, unknown>,
  eventId: string
) {
  if (typeof window === 'undefined' || !hasMarketingConsent() || !ensureMetaPixel()) return;

  const method = META_STANDARD_EVENTS.has(eventName) ? 'track' : 'trackCustom';
  window.fbq(method, eventName, eventParams, { eventID: eventId });
}

// Envia evento para Meta Conversion API (server-side)
function pushToMetaConversionAPI(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown> = {}
) {
  if (
    typeof window === 'undefined' ||
    !META_PIXEL_ID ||
    !META_SERVER_EVENTS.has(eventName) ||
    !hasMarketingConsent()
  ) {
    return;
  }

  // Sem o cookie _fbc (o Pixel ainda não tinha carregado quando o visitante
  // chegou pelo anúncio), monta o valor a partir do fbclid guardado na landing.
  const { fbclid, fbclidAt } = getAttribution();
  const fbc =
    readCookie('_fbc') ?? (fbclid ? `fb.1.${fbclidAt ?? Date.now()}.${fbclid}` : undefined);

  fetch('/api/meta-conversion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // O evento sobrevive se a página fechar ou navegar logo em seguida
    keepalive: true,
    body: JSON.stringify({
      eventName,
      eventId,
      sourceUrl: window.location.href,
      userData: {
        fbp: readCookie('_fbp'),
        fbc,
      },
      customData,
    }),
  }).catch(() => {
    // Falha de rede não pode atrapalhar a navegação; o Pixel já cobriu o evento
  });
}

/**
 * 1. Evento genérico
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, unknown> = {}
) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer(eventName, {
    ...eventParams,
    event_id: eventId,
  });

  // Meta Pixel (client)
  pushToMetaPixel(eventName, eventParams, eventId);

  // Meta Conversion API (server)
  pushToMetaConversionAPI(eventName, eventId, eventParams);
}

/**
 * 2. Visualização de página
 *
 * `gtm: false` pula o dataLayer — usado no aceite dos cookies, quando o GTM
 * carrega em seguida e o próprio gtm.js já conta a página atual.
 */
export function trackPageView(pageUrl: string, { gtm = true }: { gtm?: boolean } = {}) {
  const eventId = generateEventId();

  // GTM
  if (gtm) {
    pushToDataLayer('page_view', {
      page_url: pageUrl,
      event_id: eventId,
    });
  }

  // Único PageView do Pixel; mesmo event_id da Conversion API
  pushToMetaPixel('PageView', {}, eventId);

  // Meta Conversion API
  pushToMetaConversionAPI('PageView', eventId, {
    page_url: pageUrl,
  });
}

/**
 * 3. Profundidade de scroll (25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(scrollPercentage: number) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer('scroll_depth', {
    scroll_percentage: scrollPercentage,
    event_id: eventId,
  });

  // Meta Pixel (custom)
  pushToMetaPixel('ScrollDepth', {
    scroll_percentage: scrollPercentage,
  }, eventId);
}

/**
 * 4. Clique em botão
 */
export function trackButtonClick(buttonName: string, location?: string) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer('button_click', {
    button_name: buttonName,
    location: location || window.location.pathname,
    event_id: eventId,
  });

  // Meta Pixel (custom)
  pushToMetaPixel('ButtonClick', {
    button_name: buttonName,
    location: location || window.location.pathname,
  }, eventId);
}

/**
 * 5. Início de formulário
 */
export function trackFormStart(formName: string) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer('form_start', {
    form_name: formName,
    event_id: eventId,
  });

  // Meta Pixel (custom)
  pushToMetaPixel('FormStart', {
    form_name: formName,
  }, eventId);
}

/**
 * 6. Envio de formulário
 */
export function trackFormSubmit(formName: string, success: boolean = true) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer('form_submit', {
    form_name: formName,
    success,
    event_id: eventId,
  });

  // Meta Pixel + Conversion API - evento padrão "Lead" para conversões
  if (success) {
    pushToMetaPixel('Lead', {
      form_name: formName,
      content_name: formName,
    }, eventId);

    pushToMetaConversionAPI('Lead', eventId, {
      form_name: formName,
      content_name: formName,
    });
  }
}

/**
 * 7. Erro em formulário
 */
export function trackFormError(formName: string, errorMessage?: string) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer('form_error', {
    form_name: formName,
    error_message: errorMessage || 'Unknown error',
    event_id: eventId,
  });

  // Meta Pixel (custom)
  pushToMetaPixel('FormError', {
    form_name: formName,
    error_message: errorMessage,
  }, eventId);
}

/**
 * 8. Tempo na página
 */
export function trackTimeOnPage(durationSeconds: number) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer('time_on_page', {
    duration_seconds: durationSeconds,
    page_url: window.location.href,
    event_id: eventId,
  });

  // Meta Pixel (custom)
  pushToMetaPixel('TimeOnPage', {
    duration_seconds: durationSeconds,
  }, eventId);
}

/**
 * 9. Clique em link externo
 */
export function trackLinkClick(linkUrl: string, linkText?: string) {
  const eventId = generateEventId();

  const isExternal =
    typeof window !== 'undefined' &&
    !linkUrl.includes(window.location.hostname);

  // GTM
  pushToDataLayer('link_click', {
    link_url: linkUrl,
    link_text: linkText || 'Unknown',
    is_external: isExternal,
    event_id: eventId,
  });

  // Meta Pixel (custom)
  pushToMetaPixel('LinkClick', {
    link_url: linkUrl,
    is_external: isExternal,
  }, eventId);
}

/**
 * 10. Abertura do WhatsApp — evento padrão "Contact" da Meta
 */
export function trackWhatsAppClick(source: string) {
  const eventId = generateEventId();
  const location = window.location.pathname;

  // GTM
  pushToDataLayer('whatsapp_click', {
    source,
    location,
    event_id: eventId,
  });

  // Meta Pixel
  pushToMetaPixel('Contact', {
    content_name: source,
    location,
  }, eventId);

  // Meta Conversion API
  pushToMetaConversionAPI('Contact', eventId, {
    content_name: source,
    location,
  });
}

// Declarações de tipos globais
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    fbq: (...args: unknown[]) => void;
    _fbq?: unknown;
    klaro?: {
      setup: (config: unknown) => void;
      show: (config?: unknown, modal?: boolean) => void;
      hide: () => void;
      version: () => string;
      getManager: (config: unknown) => unknown;
    };
  }
}
