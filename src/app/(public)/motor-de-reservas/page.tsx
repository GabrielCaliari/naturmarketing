import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import MotorDeReservasContent from "./_components/MotorDeReservasContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Motor de Reservas para Hotéis e Pousadas | Reserva Direta",
  description:
    "Motor de reservas integrado ao seu PMS: o hóspede reserva direto no site do hotel, com Pix e parcelamento, e você deixa de pagar comissão de OTA.",
  keywords:
    "motor de reservas para hotel, motor de reservas para hotéis, motor de reservas online, site para hotel com motor de reservas, melhor motor de reservas, software de reservas diretas, sistema de reservas online para hotéis, motor de reserva",
  alternates: { canonical: `${siteUrl}/motor-de-reservas` },
  openGraph: {
    title: "Motor de Reservas para Hotéis | Réserve",
    description:
      "Reserva direta no site do seu hotel, sem comissão de OTA, motor de reservas integrado ao PMS e otimizado para converter visitantes em hóspedes.",
    type: "website",
    url: `${siteUrl}/motor-de-reservas`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Réserve | Motor de Reservas para Hotéis" }],
  },
};

// FAQ schema (kept server-side, in the site's canonical language).
const faqs = [
  { q: "O que é um motor de reservas para hotel?", a: "É o sistema que permite que o hóspede consulte disponibilidade, escolha a diária e finalize a reserva diretamente no site do hotel, com pagamento online, sem passar por uma OTA como Booking ou Expedia. É o que transforma o site em um canal de vendas próprio." },
  { q: "Qual é o melhor motor de reservas?", a: "Não existe um único 'melhor', depende do porte do hotel, do PMS que você usa e do volume de reservas. Para pousadas e hotéis independentes, o ideal é um motor leve, em português, com Pix e parcelamento. Fazemos o diagnóstico e indicamos a opção que mais converte para o seu caso." },
  { q: "O motor de reservas substitui as OTAs?", a: "Não substitui, equilibra. As OTAs trazem visibilidade; o motor de reservas garante que parte dessa demanda venha pelo canal direto, sem comissão. A estratégia é usar as OTAs como vitrine e converter o máximo de reservas no seu próprio site." },
  { q: "Preciso trocar o meu site para ter um motor de reservas?", a: "Nem sempre. Em muitos casos integramos o motor ao site existente. Quando o site atual prejudica a conversão (lento, sem mobile, sem confiança), recomendamos um site hoteleiro novo já com o motor integrado." },
  { q: "Quanto custa implantar um motor de reservas?", a: "Há motores com mensalidade fixa e outros que cobram um percentual por reserva (bem menor que a comissão de OTA). No diagnóstico mostramos o custo real e o quanto você economiza em comissões ao migrar reservas para o canal direto." },
  { q: "Como funciona um motor de reservas na prática?", a: "O hóspede entra no site do hotel, escolhe as datas e vê a disponibilidade e as tarifas em tempo real (sincronizadas com o seu PMS). Ele seleciona o quarto, preenche os dados e paga online (Pix, cartão ou parcelamento). A reserva cai automaticamente no sistema de gestão do hotel, sem intervenção manual e sem risco de overbooking." },
  { q: "Existe motor de reservas para pousadas pequenas?", a: "Sim. Há motores leves e acessíveis pensados para pousadas e hotéis independentes, com mensalidade baixa e sem complexidade. Para empreendimentos pequenos, o motor de reservas é justamente o que reduz o peso da comissão de OTA na margem." },
  { q: "Motor de reservas serve para resort?", a: "Serve e é altamente recomendado. Resorts têm ticket médio mais alto e pacotes complexos (diárias, all-inclusive, experiências), e um bom motor de reservas suporta tarifas, pacotes e upsell, aumentando a receita por reserva direta." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Motor de Reservas para Hotéis",
  description:
    "Implantação e otimização de motor de reservas para hotéis e pousadas: reserva direta no site, integração com PMS e foco em conversão e redução de comissões de OTA.",
  provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: COMPANY_NAP.name, url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Motor de Reservas / Sistema de Reserva Direta Hoteleira",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function MotorDeReservasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Motor de Reservas", url: "/motor-de-reservas" },
      ]} />
      <MotorDeReservasContent />
    </>
  );
}
