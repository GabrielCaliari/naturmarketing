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
  tagline: "Agência de Marketing para Hotéis — Gestão de Tráfego para Resorts",
  
  // Contact Information
  email: "contato@reservemarketing.com.br",
  phone: {
    display: "(11) 99999-9999", // Update with real phone
    href: "tel:+5511999999999", // Update with real phone
    raw: "11999999999", // Update with real phone
    schema: "+55-11-99999-9999" // Update with real phone
  },
  
  // Address Information
  address: {
    street: "Rua das Flores, 123", // Update with real address
    city: "São Paulo",
    state: "SP",
    zip: "01234-567", // Update with real ZIP
    country: "Brasil",
    full: "Rua das Flores, 123, São Paulo, SP, 01234-567, Brasil" // Update with real address
  },
  
  // Geographic Coordinates (for LocalBusiness schema)
  geo: {
    latitude: -23.5505, // Update with real coordinates
    longitude: -46.6333 // Update with real coordinates
  },
  
  // Business Hours
  hours: {
    display: "Segunda a Sexta: 9h às 18h",
    displayUpper: "SEGUNDA A SEXTA: 9H ÀS 18H",
    schema: "Mo-Fr 09:00-18:00" // Schema.org format
  },
  
  // Business Details
  foundingYear: 2024, // Update with real founding year
  
  // URLs and Digital Presence
  url: "https://www.reservemarketing.com.br", // Update with real domain
  
  // Social Media Profiles
  social: {
    instagram: "https://instagram.com/reservemarketing", // Update with real profile
    facebook: "https://facebook.com/reservemarketing", // Update with real profile
    linkedin: "https://linkedin.com/company/reservemarketing", // Update with real profile
    googleMaps: "https://maps.google.com/place/reservemarketing", // Update with real Google Maps URL
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12...", // Update with real embed URL
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
    "gestão de tráfego para resorts",
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