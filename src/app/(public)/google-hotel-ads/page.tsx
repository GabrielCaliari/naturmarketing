import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import GoogleHotelAdsContent from "./_components/GoogleHotelAdsContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Google Hotel Ads para Hotéis: Gestão Especializada",
  description: "Seu hotel lado a lado com Booking e Expedia no Google, na hora da decisão. Gestão de lances, integração com o motor e foco em reserva direta.",
  keywords: "Google Hotel Ads, hotel ads, google ads para hotel, google ads para hotéis, hotel google ads, google adwords hotel, dicas para google hotel ads, Google Hotel Ads para hotéis, Google Hotel Ads agência, como aparecer no Google Hotel Ads, gestão Google Hotel Ads hotel, reservas diretas Google, Google Hotel Center, motor de reservas Google",
  alternates: { canonical: `${siteUrl}/google-hotel-ads` },
  openGraph: {
    title: "Google Hotel Ads para Hotéis | Réserve",
    description: "Apareça ao lado do Booking e Expedia no Google, mas com reserva direta. Gerenciamos Google Hotel Ads para hotéis, resorts e pousadas em todo o Brasil.",
    type: "website",
    url: `${siteUrl}/google-hotel-ads`,
  },
};

// FAQ schema (kept server-side, in the site's canonical language).
const faqs = [
  { q: "Qual a diferença entre Google Hotel Ads e Google Ads para hotel?", a: "São canais complementares. O Google Hotel Ads (antigo Hotel Center) exibe tarifa e disponibilidade no módulo de hotéis da busca e do Maps, ao lado das OTAs. O Google Ads para hotéis (a rede de pesquisa, antigo Google AdWords) captura buscas como 'hotel em [destino]' e leva o viajante ao seu site. A estratégia ideal usa os dois juntos." },
  { q: "Preciso de motor de reservas para usar Google Hotel Ads?", a: "Sim. O Google Hotel Ads exige integração com um sistema de reservas homologado que sincronize tarifas e disponibilidade em tempo real. Ajudamos na escolha e implementação do motor de reservas certo." },
  { q: "Quanto custa aparecer no Google Hotel Ads?", a: "O modelo é CPC (custo por clique) ou CPA (custo por aquisição). Hotéis bem gerenciados pagam entre 5% e 8% do valor da reserva, bem abaixo dos 15% a 25% das OTAs." },
  { q: "Quanto tempo leva para ver resultados?", a: "As primeiras reservas diretas podem aparecer em 3 a 7 dias após a ativação técnica correta. A otimização para o máximo ROI leva de 30 a 60 dias." },
  { q: "Preciso sair do Booking para usar Google Hotel Ads?", a: "Não. O Hotel Ads compete com as OTAs no mesmo resultado de busca, seu hotel aparece ao lado delas com o seu preço direto. As OTAs continuam como vitrine; o Hotel Ads captura a reserva no canal direto." },
  { q: "Google Hotel Ads funciona para pousada e resort?", a: "Sim. Pousadas, resorts e hotéis boutique se beneficiam tanto quanto grandes redes, desde que tenham motor de reservas integrado e paridade tarifária. Para resorts, o Hotel Ads costuma ter ROI ainda maior pelo ticket médio mais alto." },
  { q: "Qual a diferença entre Hotel Ads e o Google AdWords tradicional?", a: "'Google AdWords' é o nome antigo do Google Ads. Para hotéis, o Hotel Ads mostra preço e datas direto no resultado; o Google Ads de pesquisa mostra um anúncio de texto. Usamos os dois de forma integrada para cobrir toda a jornada de busca do hóspede." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gestão de Google Hotel Ads para Hotéis",
  description: "Serviço especializado de configuração, integração e gestão de Google Hotel Ads para hotéis, resorts e pousadas no Brasil.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Google Hotel Ads Management",
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

export default function GoogleHotelAdsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Google Hotel Ads", url: "/google-hotel-ads" },
      ]} />
      <GoogleHotelAdsContent />
    </>
  );
}
