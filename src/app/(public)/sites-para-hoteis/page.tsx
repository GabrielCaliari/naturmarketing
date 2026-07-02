import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Sites para Hotéis e Pousadas | Réserve — Com Motor de Reservas",
  description: "Criação de sites para hotéis, resorts e pousadas com motor de reservas integrado. Design premium, carregamento rápido, otimizado para conversão e SEO hoteleiro.",
  keywords: "site para hotel, site para pousada, criação site hotel, site hoteleiro motor de reservas, website hotel com reservas online, landing page hotel, site resort, site boutique hotel",
  alternates: { canonical: `${siteUrl}/sites-para-hoteis` },
  openGraph: {
    title: "Sites para Hotéis e Pousadas | Réserve",
    description: "Sites premium para hotéis com motor de reservas integrado. Design que vende experiência, velocidade que converte.",
    type: "website",
    url: `${siteUrl}/sites-para-hoteis`,
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#6e5e52";

const features = [
  { title: "Motor de Reservas Integrado", desc: "Checkout direto sem sair do site — o hóspede reserva em menos de 3 cliques, sem comissão.", icon: "🏨" },
  { title: "Design Premium", desc: "Visual que transmite o posicionamento do hotel e converte visitantes em hóspedes.", icon: "✨" },
  { title: "Carregamento Rápido", desc: "Core Web Vitals otimizados — menos de 2s de carregamento. Velocidade converte.", icon: "⚡" },
  { title: "SEO desde o início", desc: "Estrutura técnica otimizada, meta tags, schema markup e URLs amigáveis configurados.", icon: "🔍" },
  { title: "100% Responsivo", desc: "Experiência perfeita no celular — onde mais de 60% das reservas são iniciadas.", icon: "📱" },
  { title: "Integração com Analytics", desc: "Google Analytics, Google Tag Manager e Meta Pixel configurados para medir tudo.", icon: "📊" },
];

const faqs = [
  { q: "Preciso de site próprio se já estou no Booking?", a: "Sim. Mais de 50% dos viajantes que encontram um hotel em OTA visita o site próprio antes de reservar. Sem site próprio você perde esse hóspede de volta para o Booking." },
  { q: "Qual motor de reservas vocês indicam?", a: "Integramos com os principais sistemas homologados pelo Google — a escolha depende do porte do hotel, volume de quartos e necessidades operacionais. Avaliamos juntos." },
  { q: "Quanto tempo leva para o site ficar pronto?", a: "Entre 4 e 8 semanas dependendo da complexidade. Sites simples de pousada ficam prontos em 3 a 4 semanas. Resorts com múltiplas categorias e idiomas levam 6 a 8 semanas." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Criação de Sites para Hotéis e Pousadas",
  description: "Sites premium para hotéis com motor de reservas integrado, SEO hoteleiro e design focado em conversão.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Hotel Website Development",
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

export default function SitesHoteisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Sites para Hotéis", url: "/sites-para-hoteis" },
      ]} />
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#141a24", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 30% 60%, #4a7c9e 0%, transparent 55%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Sites para Hotéis</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Serviço Especializado
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Sites para hotéis que<br />
              <span style={{ color: BRAND_GREEN }}>realmente vendem</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Design premium com{" "}
              <Link href="/motor-de-reservas" style={{ color: BRAND_GREEN, textDecoration: "underline" }}>motor de reservas integrado</Link>. Rápido, otimizado para SEO e construído para converter visitante em hóspede — sem comissão para ninguém.
            </p>
            <a
              href="https://wa.me/5535997742984?text=Olá! Tenho interesse em criar um site para o meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              Quero um site para meu hotel
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>O que entregamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Tudo que um site hoteleiro precisa
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{f.title}</h3>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Perguntas sobre Sites para Hotéis
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((f, i) => (
                <div key={i} className="p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD, fontSize: "15px" }}>{f.q}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#141a24" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Seu site atual converte?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Avaliamos gratuitamente seu site atual e identificamos onde você perde hóspedes para as OTAs.
            </p>
            <a
              href="https://wa.me/5535997742984?text=Olá! Quero avaliar o site do meu hotel e criar um novo."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90"
              style={{ background: BRAND_BROWN }}
            >
              Avaliação Gratuita
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
