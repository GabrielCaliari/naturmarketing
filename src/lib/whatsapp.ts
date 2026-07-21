import { WHATSAPP_LINK } from "@/constants/company";

/** Monta a URL de Click-to-Chat do WhatsApp com a mensagem já codificada. */
export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}

/** Dados coletados pelo modal de diagnóstico. */
export type LeadData = {
  name: string;
  propertyName: string;
  propertyType?: string;
  hasSite: boolean;
  siteUrl?: string;
  hasInstagram: boolean;
  instagramHandle?: string;
  /** Rótulos dos combos de serviço já resolvidos no idioma corrente. */
  serviceLabels: string[];
  challenge?: string;
};

/** Monta a mensagem de WhatsApp do diagnóstico com todos os dados do lead. */
export function buildDiagnosticoMessage(
  data: LeadData,
  locale: "pt" | "en"
): string {
  const isEn = locale === "en";
  const typeSuffix = data.propertyType ? ` (${data.propertyType})` : "";

  const greeting = isEn
    ? `Hi! My name is *${data.name}*, from *${data.propertyName}*${typeSuffix}.`
    : `Olá! Me chamo *${data.name}*, da *${data.propertyName}*${typeSuffix}.`;

  const servicesTitle = isEn ? "Services I'm interested in:" : "Serviços de interesse:";
  const servicesBlock = [servicesTitle, ...data.serviceLabels.map((s) => `• ${s}`)].join("\n");

  const details: string[] = [];
  if (data.hasSite && data.siteUrl) {
    details.push(`${isEn ? "Website" : "Site"}: ${data.siteUrl}`);
  }
  if (data.hasInstagram && data.instagramHandle) {
    details.push(`Instagram: ${data.instagramHandle}`);
  }
  if (data.challenge) {
    details.push(`${isEn ? "Biggest challenge" : "Maior desafio"}: ${data.challenge}`);
  }

  const closing = isEn
    ? "I came from the free assessment on your website."
    : "Vim pelo diagnóstico gratuito do site.";

  const blocks = [greeting, "", servicesBlock];
  if (details.length > 0) {
    blocks.push("", details.join("\n"));
  }
  blocks.push("", closing);

  return blocks.join("\n");
}
