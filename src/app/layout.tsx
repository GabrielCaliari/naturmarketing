import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import Script from 'next/script'

// Importar estilos CSS essenciais
import "@/styles/globals.css";

// Analytics e Rastreamento
import { GTMScript, GTMNoScript } from '@/components/Analytics/GTMScript';
import MetaPixel from '@/components/Analytics/MetaPixel';
import CookieConsent from '@/components/CookieConsent';
import AutoTrack from '@/components/Analytics/AutoTrack';
import MicrosoftClarity from '@/components/Analytics/MicrosoftClarity';

// SEO Components
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/SEO/JsonLd';

// Constants
import { COMPANY_NAP } from '@/constants/company';

// Optimize fonts with next/font
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RÉSERVE | Agência de Marketing Hoteleiro — Diagnóstico, Estratégia e Reservas Diretas',
    template: '%s | Réserve Marketing'
  },
  description: 'A RÉSERVE é especialista em marketing hoteleiro. Diagnóstico preciso, estratégia personalizada e sistema de reservas diretas para hotéis, resorts, pousadas e lodges. Menos OTA. Mais margem.',
  keywords: 'marketing hoteleiro, agência de marketing hoteleiro, agência de marketing para hotel, marketing digital hotel, marketing digital para hotéis, marketing para resort, marketing para resorts, especialista em marketing para hotéis, diagnóstico marketing hoteleiro, estratégia hoteleira, reservas diretas hotel, reduzir dependência OTA, marketing para pousadas, marketing para lodges, marketing para hotéis boutique, consultoria marketing hoteleiro, agência especializada em hotelaria, como aumentar reservas diretas hotel, como reduzir comissão OTA hotel, Google Hotel Ads, SEO para hotéis, tráfego pago para hotel, motor de reservas, agencia de marketing para hoteis, Google Hotel Ads para pousadas, estrategia de reservas diretas hotel, como reduzir dependencia de OTA, consultoria marketing hoteleiro brasil, hotel marketing agency, hospitality marketing agency, hotel digital marketing, hotel marketing consultant Brazil, increase direct bookings hotel, reduce OTA commissions hotel, boutique hotel digital marketing strategy, hotel SEO agency, direct booking strategy hotel',
  authors: [{ name: COMPANY_NAP.name, url: siteUrl }],
  creator: COMPANY_NAP.name,
  publisher: COMPANY_NAP.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: COMPANY_NAP.name,
    title: 'RÉSERVE — Agência de Marketing Hoteleiro Especializada',
    description: 'Não somos uma gestora de tráfego. Somos especialistas em marketing hoteleiro: diagnóstico, estratégia e reservas diretas para hotéis, pousadas e lodges de experiência.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Réserve - Hotel Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réserve | Hotel Marketing Agency',
    description: 'Hotel marketing specialists. Google Hotel Ads, SEO, and direct booking strategies for hotels, resorts and pousadas.',
    images: ['/og-image.jpg'],
  },
  // NOTE: never set `alternates.canonical` here. The App Router shallow-merges
  // layout metadata into every child page that lacks its own `alternates`,
  // which would emit the homepage canonical on every route (SEO Master §3/§18.5).
  // Canonicals are defined per-page in each leaf page.tsx.
  // verification: {
  //   google: 'ADD_REAL_CODE_HERE', // Cole aqui o código do Google Search Console
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={rubik.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Self-hosted brand font (PP Hatton) — @font-face in globals.css */}
        <link
          rel="preload"
          href="/fonts/pp-hatton-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        
        {/* Google Tag Manager - Lazy Loading */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
        
        {/* Meta Pixel is loaded client-side after LGPD consent — see MetaPixel.tsx */}
      </head>
      <body suppressHydrationWarning={true}>
        {/* GTM NoScript Fallback */}
        <GTMNoScript />
        
        {/* Meta Pixel */}
        <MetaPixel />

        {/* Conteúdo principal */}
        {children}
        
        {/* Banner de Consentimento LGPD */}
        <CookieConsent />
        
        {/* Rastreamento Automático */}
        <AutoTrack />

        {/* Microsoft Clarity — gravação de sessão e mapa de calor */}
        <MicrosoftClarity />
      </body>
    </html>
  )
}
