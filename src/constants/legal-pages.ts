import { COMPANY_NAP } from './company'

export const LEGAL_CONFIG = {
  BASE_URL: COMPANY_NAP.url,
  COMPANY_NAME: COMPANY_NAP.name,
  COMPANY_EMAIL: COMPANY_NAP.email,
  COMPANY_PHONE: COMPANY_NAP.phone,
  COMPANY_ADDRESS: COMPANY_NAP.address,
  
  // Common keywords for legal pages
  COMMON_KEYWORDS: [
    'política de privacidade',
    'termos de uso',
    'proteção de dados',
    'LGPD',
    'marketing hoteleiro',
    COMPANY_NAP.name.toLowerCase()
  ].join(', ')
} as const