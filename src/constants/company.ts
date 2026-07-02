/**
 * COMPANY_NAP — Single Source of Truth
 * 
 * GITKEEP: DO NOT duplicate business data elsewhere in the codebase.
 * All company information must reference this file as the authoritative source.
 * 
 * Update this file when business information changes, and it will propagate
 * automatically to all components, schemas, and metadata.
 */

export const COMPANY_NAP = {
  // Core Business Identity
  name: "Réserve",
  legalName: "Réserve Marketing Digital LTDA",
  tagline: "Agência de Marketing Hoteleiro — Diagnóstico, Estratégia e Reservas Diretas",
  
  // Contact Information
  email: "contato@reservemkt.com.br",
  phone: {
    display: "(35) 99774-2984",
    href: "tel:+5535997742984",
    raw: "5535997742984",
    schema: "+55-35-99774-2984"
  },

  // Address Information
  address: {
    street: "Rua Barbosa Lima, 200",
    city: "Lavras",
    state: "MG",
    zip: "37177-200",
    country: "Brasil",
    full: "Rua Barbosa Lima, 200, Lavras, MG, 37177-200, Brasil"
  },

  // Geographic Coordinates (for LocalBusiness schema)
  geo: {
    latitude: -21.2440,
    longitude: -45.0002
  },

  // Business Hours (fonte: Google Meu Negócio)
  hours: {
    display: "Segunda a Sexta: 9h às 17h",
    displayUpper: "SEGUNDA A SEXTA: 9H ÀS 17H",
    schema: "Mo-Fr 09:00-17:00"
  },

  // Business Details (data de abertura no Google Meu Negócio: 24/11/2025)
  foundingYear: 2025,

  // URLs and Digital Presence
  url: "https://www.reservemkt.com.br",

  // Social Media Profiles
  social: {
    instagram: "https://www.instagram.com/reserve.marketinghoteleiro/",
    facebook: "",
    linkedin: "",
    googleMaps: "https://www.google.com/maps?cid=17744566139406589035",
    googleMapsEmbed: "",
  },
  
  // Service Areas
  areasServed: [
    "São Paulo",
    "Rio de Janeiro", 
    "Belo Horizonte",
    "Brasília",
    "Salvador",
    "Fortaleza",
    "Recife",
    "Porto Alegre",
    "Curitiba",
    "Florianópolis"
  ],
  
  // Business Categories (for schema)
  businessType: "ProfessionalService", // LocalBusiness @type
  industry: "Marketing Digital Hoteleiro",
  
  // SEO Keywords
  primaryKeywords: [
    "marketing hoteleiro",
    "agência de marketing para hotéis",
    "agência marketing hoteleiro",
    "marketing digital para hotéis",
    "marketing digital para pousadas",
    "diagnóstico de marketing hoteleiro",
    "Google Hotel Ads",
    "SEO para hotéis",
    "reservas diretas",
    "reduzir OTAs",
    "como aumentar reservas diretas hotel",
    "consultoria marketing hoteleiro",
    "tráfego pago para hotel"
  ]
} as const;

// Re-export for convenience
export const COMPANY_NAME = COMPANY_NAP.name;
export const COMPANY_URL = COMPANY_NAP.url;
export const COMPANY_EMAIL = COMPANY_NAP.email;
export const COMPANY_PHONE = COMPANY_NAP.phone;
export const COMPANY_ADDRESS = COMPANY_NAP.address;
export const AREAS_SERVED = COMPANY_NAP.areasServed;

// WhatsApp deep link derived from the SSOT phone number (no hardcoded numbers elsewhere)
export const WHATSAPP_LINK = `https://wa.me/${COMPANY_NAP.phone.raw}`;