import type { Metadata } from 'next'
import { COMPANY_NAP } from '@/constants/company'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url

export const metadata: Metadata = {
  title: 'Réserve | Agência de Marketing para Hotéis — Gestão de Tráfego para Resorts',
  description: 'A Réserve é a agência de Marketing Hoteleiro especializada em gestão de tráfego para resorts, hotéis e pousadas. Aumente reservas diretas, elimine dependência de OTAs e maximize sua receita.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Réserve | Agência de Marketing para Hotéis — Gestão de Tráfego para Resorts',
    description: 'A Réserve é a agência de Marketing Hoteleiro especializada em gestão de tráfego para resorts, hotéis e pousadas. Aumente reservas diretas, elimine dependência de OTAs e maximize sua receita.',
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Réserve - Agência de Marketing para Hotéis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réserve | Agência de Marketing para Hotéis — Gestão de Tráfego para Resorts',
    description: 'A Réserve é a agência de Marketing Hoteleiro especializada em gestão de tráfego para resorts, hotéis e pousadas. Aumente reservas diretas, elimine dependência de OTAs e maximize sua receita.',
    images: ['/og-image.jpg'],
  },
}

export { default } from "./public/home/page";
