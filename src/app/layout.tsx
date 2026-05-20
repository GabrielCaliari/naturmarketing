import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import Script from 'next/script'

// Importar estilos CSS essenciais
import "@/styles/globals.css";

// Analytics e Rastreamento
// import { GTMScript, GTMNoScript } from '@/components/Analytics/GTMScript';
// import MetaPixel from '@/components/Analytics/MetaPixel';
import CookieConsent from '@/components/CookieConsent';
import AutoTrack from '@/components/Analytics/AutoTrack';

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
    default: 'Réserve | Agência de Marketing para Hotéis — Gestão de Tráfego para Resorts',
    template: '%s | Réserve Marketing'
  },
  description: 'Agência especializada em Marketing Hoteleiro. Google Hotel Ads, gestão de tráfego, SEO e motor de reservas para hotéis, resorts e pousadas aumentarem reservas diretas e reduzirem OTAs.',
  keywords: 'marketing hoteleiro, agência de marketing para hotéis, agência marketing hoteleiro, marketing digital para hotéis, marketing digital para pousadas, gestão de tráfego para resorts, Google Hotel Ads, SEO para hotéis, motor de reservas, reservas diretas, reduzir OTAs, marketing para pousadas, aumentar ocupação hoteleira, como reduzir comissão OTA hotel, tráfego pago para hotel, consultoria marketing hoteleiro, agência especializada em hotelaria, como aumentar reservas diretas hotel',
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
    url: siteUrl,
    siteName: COMPANY_NAP.name,
    title: 'Réserve | Agência de Marketing para Hotéis',
    description: 'Especialistas em Marketing Hoteleiro e Gestão de Tráfego para Resorts. Mais reservas diretas, mais autonomia, mais receita.',
    images: [
      {
        url: '/og-image.jpg', // Add this image to public folder
        width: 1200,
        height: 630,
        alt: 'Réserve - Agência de Marketing para Hotéis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réserve | Agência de Marketing para Hotéis',
    description: 'Especialistas em Marketing Hoteleiro e Gestão de Tráfego para Resorts. Mais reservas diretas, mais autonomia, mais receita.',
    images: ['/og-image.jpg'], // Add this image to public folder
    creator: '@reservemarketing', // Update with real Twitter handle
  },
  // verification: {
  //   google: 'ADD_REAL_CODE_HERE',
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
        
        <link
          href="https://db.onlinewebfonts.com/c/9e65328448e32690935f5e0dec7e40be?family=PP+Hatton+Medium"
          rel="stylesheet"
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
        {/* GTM NoScript Fallback - Descomente quando configurar NEXT_PUBLIC_GTM_ID */}
        {/* <GTMNoScript /> */}
        
        {/* Conteúdo principal */}
        {children}
        
        {/* Banner de Consentimento LGPD */}
        <CookieConsent />
        
        {/* Rastreamento Automático */}
        <AutoTrack />
      </body>
    </html>
  )
}
