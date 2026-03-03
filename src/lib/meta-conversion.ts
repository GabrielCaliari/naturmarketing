/**
 * Meta Conversion API - Helpers
 * 
 * Funções auxiliares para enviar eventos server-side para Meta/Facebook
 * usando a Conversion API (CAPI)
 */

import crypto from 'crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CONVERSION_API_TOKEN;
const API_VERSION = 'v21.0';

/**
 * Hasheia dados sensíveis usando SHA-256
 */
export function hashUserData(data: string | undefined): string | undefined {
  if (!data) return undefined;
  
  // Remove espaços e converte para lowercase
  const normalized = data.trim().toLowerCase();
  
  return crypto
    .createHash('sha256')
    .update(normalized)
    .digest('hex');
}

/**
 * Gera um ID único para evento (para deduplicação)
 */
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Envia evento para Meta Conversion API
 */
export async function sendConversionEvent(
  eventName: string,
  eventId: string,
  sourceUrl: string,
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbp?: string; // Facebook Browser ID
    fbc?: string; // Facebook Click ID
  } = {},
  customData: Record<string, unknown> = {}
): Promise<{ success: boolean; error?: string }> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Meta Pixel ID ou Access Token não configurados');
    return { success: false, error: 'Configuração incompleta' };
  }

  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

    // Prepara dados do usuário com hash (para privacidade)
    const hashedUserData: Record<string, string | undefined> = {
      client_ip_address: userData.clientIpAddress,
      client_user_agent: userData.clientUserAgent,
      fbp: userData.fbp,
      fbc: userData.fbc,
    };

    // Hasheia dados sensíveis (se fornecidos)
    if (userData.email) hashedUserData.em = hashUserData(userData.email);
    if (userData.phone) hashedUserData.ph = hashUserData(userData.phone);
    if (userData.firstName) hashedUserData.fn = hashUserData(userData.firstName);
    if (userData.lastName) hashedUserData.ln = hashUserData(userData.lastName);
    if (userData.city) hashedUserData.ct = hashUserData(userData.city);
    if (userData.state) hashedUserData.st = hashUserData(userData.state);
    if (userData.country) hashedUserData.country = hashUserData(userData.country);
    if (userData.zipCode) hashedUserData.zp = hashUserData(userData.zipCode);

    // Remove campos undefined
    Object.keys(hashedUserData).forEach(key => {
      if (hashedUserData[key] === undefined) {
        delete hashedUserData[key];
      }
    });

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: sourceUrl,
          action_source: 'website',
          user_data: hashedUserData,
          custom_data: customData,
        },
      ],
      access_token: ACCESS_TOKEN,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Erro na Meta Conversion API:', result);
      return { success: false, error: result.error?.message || 'Erro desconhecido' };
    }

    // Verifica se houve erros nos eventos individuais
    if (result.events_received === 0) {
      console.error('Nenhum evento recebido pela Meta');
      return { success: false, error: 'Eventos não recebidos' };
    }

    return { success: true };
  } catch (error) {
    console.error('Exceção ao enviar para Meta Conversion API:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    };
  }
}

/**
 * Valida se as credenciais Meta estão configuradas
 */
export function isMetaConfigured(): boolean {
  return !!(PIXEL_ID && ACCESS_TOKEN);
}


