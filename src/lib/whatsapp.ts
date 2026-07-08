import { WHATSAPP_LINK } from "@/constants/company";

/** Monta a URL de Click-to-Chat do WhatsApp com a mensagem já codificada. */
export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}
