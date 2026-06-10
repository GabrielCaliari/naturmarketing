import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "SEO para Hotéis e Pousadas | Réserve — Apareça no Google Antes das OTAs",
  description: "Especialistas em SEO para hotéis, resorts e pousadas. Otimizamos seu site e Google Business Profile para você aparecer organicamente antes do Booking.com e Expedia.",
  keywords: "SEO para hotéis, SEO para pousadas, como aparecer no Google hotel, SEO hoteleiro, otimização site hotel, SEO para resorts, Google Business Profile hotel, SEO local hotel, marketing orgânico hotel",
  alternates: { canonical: `${siteUrl}/seo-para-hoteis` },
  openGraph: {
    title: "SEO para Hotéis e Pousadas | Réserve",
    description: "Apareça no Google antes das OTAs com SEO especializado em hotelaria. Google Business Profile, conteúdo de destino e otimização técnica para hotéis.",
    type: "website",
    url: `${siteUrl}/seo-para-hoteis`,
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

const pillars = [
  { title: "SEO Técnico", desc: "Velocidade, Core Web Vitals, URLs amigáveis, schema markup, versão mobile. Base que o Google exige para ranquear bem.", icon: "⚙️" },
  { title: "Google Business Profile", desc: "Otimização completa do perfil local — fotos, avaliações, categorias e posts. Aparece no Maps e no pacote local das buscas.", icon: "📍" },
  { title: "Conteúdo de Destino", desc: "Blog com guias, roteiros e dicas sobre o destino. Capta viajantes ainda na fase de planejamento, antes de escolher o hotel.", icon: "✍️" },
  { title: "Link Building", desc: "Parcerias com publicações de turismo e hotelaria para aumentar a autoridade do domínio e ranquear termos mais competitivos.", icon: "🔗" },
];

const timeline = [
  { period: "30–90 dias", what: "Melhorias no Google Business Profile e otimizações técnicas começam a gerar impacto em buscas locais e pelo nome do hotel." },
  { period: "3–6 meses", what: "Conteúdo novo começa a ser indexado. Crescimento consistente de tráfego orgânico." },
  { period: "6–12 meses", what: "Autoridade de domínio consolidada. Ranqueamento para termos mais competitivos do destino." },
  { period: "12+ meses", what: "Canal orgânico maduro gerando reservas com custo marginal zero. Ativo que pertence ao hotel." },
];

const faqs = [
  { q: "SEO para hotel é diferente de SEO normal?", a: "Sim. Hotelaria tem sazonalidade, buscas por destino, Google Hotel Ads integrado, Google Business Profile relevante e competição direta com OTAs bilionárias. Uma estratégia genérica de SEO não considera nenhuma dessas nuances." },
  { q: "Quanto tempo leva para aparecer no Google?", a: "Otimizações técnicas e de Google Business Profile geram resultados em 30 a 90 dias. Para ranquear termos competitivos do destino, 6 a 12 meses com estratégia consistente." },
  { q: "Vale a pena investir em SEO sendo um hotel pequeno?", a: "Sim — especialmente para pousadas e boutique hotels. Termos long-tail do destino têm baixa concorrência e alta intenção. Um hotel pequeno pode dominar buscas específicas que grandes redes ignoram." },
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
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#1a2918", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #84936f 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>SEO para Hotéis</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Serviço Especializado
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              SEO para Hotéis:<br />
              <span style={{ color: BRAND_GREEN }}>apareça antes das OTAs</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Otimizamos seu hotel para aparecer organicamente no Google e Google Maps — atraindo hóspedes que nunca precisaram passar pelo Booking.com.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Tenho interesse no serviço de SEO para hotéis da Réserve."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_GREEN }}
            >
              Quero melhorar meu SEO
            </a>
          </div>
        </section>

        {/* Pilares */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>Nosso método</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              4 pilares do SEO Hoteleiro
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {pillars.map((p, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <div className="text-2xl mb-3">{p.icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{p.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline de resultados */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>Resultados</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              SEO é um ativo que cresce com o tempo
            </h2>
            <div className="flex flex-col gap-4">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-5 p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-[13px] font-semibold shrink-0 w-24 pt-0.5" style={{ color: BRAND_GREEN }}>{t.period}</span>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{t.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Perguntas sobre SEO para Hotéis
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#1a2918" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Seu hotel aparece no Google hoje?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico de SEO gratuito e descubra como seu hotel está posicionado frente às OTAs e concorrentes.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Tenho interesse no serviço de SEO para hotéis da Réserve."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90"
              style={{ background: BRAND_GREEN }}
            >
              Diagnóstico de SEO Gratuito
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
