import type { Metadata } from 'next'
import { LEGAL_CONFIG } from '@/constants/legal-pages'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Réserve Marketing',
  description: 'Política de Privacidade da Réserve. Transparência e proteção dos seus dados pessoais em conformidade com a LGPD.',
  alternates: {
    canonical: '/privacy-policy',
  },
  keywords: LEGAL_CONFIG.COMMON_KEYWORDS,
  openGraph: {
    title: 'Política de Privacidade | Réserve Marketing',
    description: 'Política de Privacidade da Réserve. Transparência e proteção dos seus dados pessoais em conformidade com a LGPD.',
    url: `${LEGAL_CONFIG.BASE_URL}/privacy-policy`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Privacidade | Réserve Marketing',
    description: 'Política de Privacidade da Réserve. Transparência e proteção dos seus dados pessoais em conformidade com a LGPD.',
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}