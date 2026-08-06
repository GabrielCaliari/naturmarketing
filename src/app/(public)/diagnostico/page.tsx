import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import DiagnosticoContent from "./_components/DiagnosticoContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Diagnóstico Gratuito para Hotéis: Onde Você Perde Reservas",
  description:
    "Descubra onde o seu hotel ou pousada perde reserva: dependência de OTA, site, anúncios e atendimento. Diagnóstico gratuito e sem compromisso.",
  keywords:
    "diagnóstico marketing hoteleiro, diagnóstico gratuito hotel, consultoria marketing hoteleiro, análise marketing hotel, auditoria marketing digital hotel, agencia de marketing para hotel",
  alternates: { canonical: `${siteUrl}/diagnostico` },
  openGraph: {
    title: "Diagnóstico Gratuito de Marketing Hoteleiro | Réserve",
    description:
      "Descubra onde o seu hotel perde reservas, análise gratuita de presença digital, dependência de OTA e funil de reservas diretas.",
    type: "website",
    url: `${siteUrl}/diagnostico`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Réserve | Diagnóstico Gratuito de Marketing Hoteleiro" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Diagnóstico Gratuito de Marketing Hoteleiro",
  description:
    "Análise gratuita da operação digital de hotéis e pousadas: presença digital, dependência de OTAs, site, motor de reservas, anúncios e atendimento, com plano de ação apresentado em reunião.",
  provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: COMPANY_NAP.name, url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Diagnóstico de Marketing Hoteleiro",
  offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
};

export default function DiagnosticoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Diagnóstico Gratuito", url: "/diagnostico" },
      ]} />
      <DiagnosticoContent />
    </>
  );
}
