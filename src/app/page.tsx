import type { Metadata } from 'next'
import { COMPANY_NAP } from '@/constants/company'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url

export const metadata: Metadata = {
  title: 'RÉSERVE | Agência de Marketing Hoteleiro | Diagnóstico, Estratégia e Reservas Diretas',
  description: 'A RÉSERVE é especialista em marketing hoteleiro. Diagnóstico preciso, estratégia personalizada e sistema de reservas diretas para hotéis, pousadas e lodges. Menos OTA. Mais margem.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RÉSERVE | Agência de Marketing Hoteleiro Especializada',
    description: 'Não somos uma gestora de tráfego. Somos especialistas em marketing hoteleiro: diagnóstico, estratégia e reservas diretas para hotéis, pousadas e lodges de experiência.',
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Réserve - Agência de Marketing Hoteleiro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RÉSERVE | Agência de Marketing Hoteleiro Especializada',
    description: 'Diagnóstico preciso, estratégia personalizada e reservas diretas para hotéis, pousadas e lodges. Menos OTA. Mais margem.',
    images: ['/og-image.jpg'],
  },
}

export { default } from "./(public)/home/page";
