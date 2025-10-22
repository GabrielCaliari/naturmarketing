/**
 * Biblioteca de Analytics - Rastreamento Completo
 * 
 * Envia eventos para:
 * - Google Tag Manager (dataLayer)
 * - Meta Pixel (client-side via fbq)
 * - Meta Conversion API (server-side via /api/meta-conversion)
 */

// Gera um ID único para cada evento (para deduplicação)
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

// Envia evento para o dataLayer do GTM
function pushToDataLayer(eventName: string, eventParams: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
}

// Envia evento para Meta Pixel (client-side)
function pushToMetaPixel(eventName: string, eventParams: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventParams);
  }
}

// Envia evento para Meta Conversion API (server-side)
async function pushToMetaConversionAPI(
  eventName: string,
  eventId: string,
  customData: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;

  try {
    await fetch('/api/meta-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventId,
        sourceUrl: window.location.href,
        userData: {
          // Facebook Browser ID (FBP cookie)
          fbp: document.cookie
            .split('; ')
            .find(row => row.startsWith('_fbp='))
            ?.split('=')[1],
          // Facebook Click ID (FBC cookie)
          fbc: document.cookie
            .split('; ')
            .find(row => row.startsWith('_fbc='))
            ?.split('=')[1],
        },
        customData,
      }),
    });
  } catch (error) {
    console.error('Erro ao enviar para Meta Conversion API:', error);
  }
}

/**
 * 1. Evento genérico
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer(eventName, {
    ...eventParams,
    event_id: eventId,
  });

  // Meta Pixel (client)
  pushToMetaPixel(eventName, eventParams);

  // Meta Conversion API (server)
  pushToMetaConversionAPI(eventName, eventId, eventParams);
}

/**
 * 2. Visualização de página
 */
export function trackPageView(pageUrl: string) {
  const eventId = generateEventId();

  // GTM
  pushToDataLayer('page_view', {
    page_url: pageUrl,
    event_id: eventId,
  });

  // Meta Pixel já envia PageView automaticamente no MetaPixel.tsx
  // Mas enviamos também para a Conversion API
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

  // Meta Pixel
  pushToMetaPixel('ScrollDepth', {
    scroll_percentage: scrollPercentage,
  });

  // Meta Conversion API
  pushToMetaConversionAPI('ScrollDepth', eventId, {
    scroll_percentage: scrollPercentage,
  });
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

  // Meta Pixel
  pushToMetaPixel('ButtonClick', {
    button_name: buttonName,
    location: location || window.location.pathname,
  });

  // Meta Conversion API
  pushToMetaConversionAPI('ButtonClick', eventId, {
    button_name: buttonName,
    location: location || window.location.pathname,
  });
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

  // Meta Pixel
  pushToMetaPixel('FormStart', {
    form_name: formName,
  });

  // Meta Conversion API
  pushToMetaConversionAPI('FormStart', eventId, {
    form_name: formName,
  });
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

  // Meta Pixel - usa evento padrão "Lead" para conversões
  if (success) {
    pushToMetaPixel('Lead', {
      form_name: formName,
      content_name: formName,
    });
  }

  // Meta Conversion API
  pushToMetaConversionAPI(success ? 'Lead' : 'FormSubmit', eventId, {
    form_name: formName,
    success,
  });
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

  // Meta Pixel
  pushToMetaPixel('FormError', {
    form_name: formName,
    error_message: errorMessage,
  });

  // Meta Conversion API
  pushToMetaConversionAPI('FormError', eventId, {
    form_name: formName,
    error_message: errorMessage,
  });
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

  // Meta Pixel
  pushToMetaPixel('TimeOnPage', {
    duration_seconds: durationSeconds,
  });

  // Meta Conversion API
  pushToMetaConversionAPI('TimeOnPage', eventId, {
    duration_seconds: durationSeconds,
  });
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

  // Meta Pixel
  pushToMetaPixel('LinkClick', {
    link_url: linkUrl,
    is_external: isExternal,
  });

  // Meta Conversion API
  pushToMetaConversionAPI('LinkClick', eventId, {
    link_url: linkUrl,
    link_text: linkText,
    is_external: isExternal,
  });
}

// Declarações de tipos globais
declare global {
  interface Window {
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}

