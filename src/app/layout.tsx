import type { Metadata } from 'next'
// import { Suspense } from 'react'

// Importar estilos CSS essenciais
import "@/styles/globals.css";

// Analytics e Rastreamento
// import { GTMScript, GTMNoScript } from '@/components/Analytics/GTMScript';
// import MetaPixel from '@/components/Analytics/MetaPixel';
import CookieConsent from '@/components/CookieConsent';
import AutoTrack from '@/components/Analytics/AutoTrack';

export const metadata: Metadata = {
  title: 'Réserve - Marketing Agency para Hotelaria',
  description: 'Agência especializada em marketing digital para hotéis, pousadas e resorts. Mais reservas diretas, menos dependência de OTAs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/9e65328448e32690935f5e0dec7e40be?family=PP+Hatton+Medium"
          rel="stylesheet"
        />
        {/* Google Tag Manager - Descomente quando configurar NEXT_PUBLIC_GTM_ID */}
        {/* <GTMScript /> */}
        {/* Meta Pixel - Descomente quando configurar NEXT_PUBLIC_META_PIXEL_ID */}
        {/* <Suspense fallback={null}>
          <MetaPixel />
        </Suspense> */}
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
