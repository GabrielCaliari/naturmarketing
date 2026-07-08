import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import ReservasDiretasContent from "./_components/ReservasDiretasContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Reservas Diretas para Hotéis | Réserve | Menos OTAs, Mais Margem",
  description: "Estratégia completa para hotéis aumentarem reservas diretas e reduzirem dependência de OTAs. Canal direto com zero comissão, motor de reservas e campanhas integradas.",
  keywords: "reservas diretas hotel, como aumentar reservas diretas hotel, reduzir OTAs hotel, canal direto hotel, motor de reservas hotel, reservas sem comissão hotel, independência OTA hotel",
  alternates: { canonical: `${siteUrl}/reservas-diretas` },
  openGraph: {
    title: "Reservas Diretas para Hotéis | Réserve",
    description: "Pare de pagar 20% de comissão em cada reserva. Construímos seu canal direto de aquisição de hóspedes.",
    type: "website",
    url: `${siteUrl}/reservas-diretas`,
  },
};

// FAQ schema (kept server-side, in the site's canonical language).
const faqs = [
  { q: "O que são reservas diretas?", a: "Reservas diretas são as hospedagens que o hóspede fecha pelos canais próprios do hotel (site com motor de reservas, WhatsApp, telefone ou recepção), sem passar por uma OTA como Booking, Expedia ou Decolar. Por isso, não há comissão: o valor integral fica com o hotel." },
  { q: "Como aumentar as reservas diretas do meu hotel?", a: "O caminho combina quatro frentes: um site rápido com motor de reservas integrado, Google Hotel Ads e Google Ads para capturar quem já busca o destino, uma garantia de melhor tarifa no canal direto e uma base de e-mail/WhatsApp para remarketing. É exatamente o sistema que montamos na Réserve." },
  { q: "Em quanto tempo posso reduzir a dependência das OTAs?", a: "Uma meta conservadora e alcançável é migrar de 20% para 40% de canal direto em 12 meses. Alguns hotéis chegam a 60% com estratégia bem executada." },
  { q: "Preciso sair do Booking.com para ter reservas diretas?", a: "Não. A estratégia é usar as OTAs como vitrine (distribuição) e capturar a demanda gerada por elas no canal direto. Os dois canais trabalham juntos." },
  { q: "Qual benefício devo oferecer para o hóspede reservar direto?", a: "As táticas mais eficazes: melhor tarifa garantida no site, early check-in, café da manhã incluso, upgrade sujeito a disponibilidade. A garantia de melhor preço é a mais simples e mais poderosa." },
  { q: "Reservas diretas valem a pena para pousadas e resorts pequenos?", a: "Sim, e muitas vezes ainda mais. Empreendimentos menores sentem o peso da comissão de OTA com mais força na margem. Um canal direto bem estruturado é o que torna a operação sustentável, vale tanto para pousadas quanto para resorts." },
  { q: "Reserva direta é mais barata que pelo Booking?", a: "Para o hotel, sim: não há comissão de 15% a 25%. Para o hóspede, costuma ser igual ou mais vantajosa, porque o hotel pode repassar parte da economia da comissão como melhor preço ou benefícios exclusivos no canal direto." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Estratégia de Reservas Diretas para Hotéis",
  description: "Canal direto de aquisição de hóspedes para hotéis, resorts e pousadas, com zero comissão por reserva.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Hotel Direct Booking Strategy",
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

export default function ReservasDiretasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Reservas Diretas", url: "/reservas-diretas" },
      ]} />
      <ReservasDiretasContent />
    </>
  );
}
