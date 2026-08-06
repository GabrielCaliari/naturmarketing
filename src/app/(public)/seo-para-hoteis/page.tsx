import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import SeoParaHoteisContent from "./_components/SeoParaHoteisContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "SEO para Hotéis: Apareça no Google Antes do Booking",
  description: "Seu hotel aparecendo no Google antes das OTAs. Otimizamos site e Google Business Profile para atrair hóspede que já está pronto para reservar.",
  keywords: "SEO para hotéis, SEO para pousadas, como aparecer no Google hotel, SEO hoteleiro, otimização site hotel, SEO para resorts, Google Business Profile hotel, SEO local hotel, marketing orgânico hotel",
  alternates: { canonical: `${siteUrl}/seo-para-hoteis` },
  openGraph: {
    title: "SEO para Hotéis e Pousadas | Réserve",
    description: "Apareça no Google antes das OTAs com SEO especializado em hotelaria. Google Business Profile, conteúdo de destino e otimização técnica para hotéis.",
    type: "website",
    url: `${siteUrl}/seo-para-hoteis`,
  },
};

// FAQ schema (kept server-side, in the site's canonical language).
const faqs = [
  { q: "SEO para hotel é diferente de SEO normal?", a: "Sim. Hotelaria tem sazonalidade, buscas por destino, Google Hotel Ads integrado, Google Business Profile relevante e competição direta com OTAs bilionárias. Uma estratégia genérica de SEO não considera nenhuma dessas nuances." },
  { q: "Quanto tempo leva para aparecer no Google?", a: "Otimizações técnicas e de Google Business Profile geram resultados em 30 a 90 dias. Para ranquear termos competitivos do destino, 6 a 12 meses com estratégia consistente." },
  { q: "Vale a pena investir em SEO sendo um hotel pequeno?", a: "Sim, especialmente para pousadas e boutique hotels. Termos long-tail do destino têm baixa concorrência e alta intenção. Um hotel pequeno pode dominar buscas específicas que grandes redes ignoram." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO para Hotéis e Pousadas",
  description: "Otimização de mecanismos de busca especializada para hotéis, resorts e pousadas no Brasil.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "SEO Hoteleiro",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SEOHoteisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "SEO para Hotéis", url: "/seo-para-hoteis" },
      ]} />
      <SeoParaHoteisContent />
    </>
  );
}
