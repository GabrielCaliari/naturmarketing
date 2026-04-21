import type { Metadata } from 'next'
import { COMPANY_NAP } from '@/constants/company'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url

export const metadata: Metadata = {
  title: 'Nossa Empresa | Réserve Marketing',
  description: 'Conheça a Réserve, agência especializada em marketing digital hoteleiro. Nossa equipe transforma a presença online de hotéis, pousadas e resorts em resultados concretos.',
  alternates: {
    canonical: '/empresa',
  },
  openGraph: {
    title: 'Nossa Empresa | Réserve Marketing',
    description: 'Conheça a Réserve, agência especializada em marketing digital hoteleiro. Nossa equipe transforma a presença online de hotéis, pousadas e resorts em resultados concretos.',
    url: `${siteUrl}/empresa`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nossa Empresa | Réserve Marketing',
    description: 'Conheça a Réserve, agência especializada em marketing digital hoteleiro. Nossa equipe transforma a presença online de hotéis, pousadas e resorts em resultados concretos.',
  },
}

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}