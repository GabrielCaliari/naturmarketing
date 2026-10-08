"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";
import { SERVICE_PRESELECT } from "@/components/LeadModal/constants";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#6e5e52";


const content = {
  pt: {
    waText: "Olá! Tenho interesse no serviço de SEO para hotéis da Réserve.",
    crumbHome: "Início",
    crumb: "SEO para Hotéis",
    badge: "Serviço Especializado",
    h1a: "SEO para Hotéis:",
    h1b: "apareça antes das OTAs",
    heroP: "Otimizamos seu hotel para aparecer organicamente no Google e Google Maps, atraindo hóspedes que nunca precisaram passar pelo Booking.com.",
    heroCta: "Quero melhorar meu SEO",
    pillarsLabel: "Nosso método",
    pillarsH2: "4 pilares do SEO Hoteleiro",
    pillarsPa: "SEO hoteleiro é um dos pilares centrais de qualquer ",
    pillarsPlink1: "trabalho sério de marketing para hotéis",
    pillarsPb: ", e trabalha lado a lado com a ",
    pillarsPlink2: "gestão de canais digitais",
    pillarsPc: " do hotel, sobretudo o Google Business Profile e as avaliações.",
    pillars: [
      { title: "SEO Técnico", desc: "Velocidade, Core Web Vitals, URLs amigáveis, schema markup, versão mobile. Base que o Google exige para ranquear bem.", icon: "⚙️" },
      { title: "Google Business Profile", desc: "Otimização completa do perfil local: fotos, avaliações, categorias e posts. Aparece no Maps e no pacote local das buscas.", icon: "📍" },
      { title: "Conteúdo de Destino", desc: "Blog com guias, roteiros e dicas sobre o destino. Capta viajantes ainda na fase de planejamento, antes de escolher o hotel.", icon: "✍️" },
      { title: "Link Building", desc: "Parcerias com publicações de turismo e hotelaria para aumentar a autoridade do domínio e ranquear termos mais competitivos.", icon: "🔗" },
    ],
    tlLabel: "Resultados",
    tlH2: "SEO é um ativo que cresce com o tempo",
    tlPa: "O caminho completo, com prazos e táticas para cada etapa, está no nosso ",
    tlPlink: "guia completo de SEO para hotéis",
    tlPb: ".",
    timeline: [
      { period: "30–90 dias", what: "Melhorias no Google Business Profile e otimizações técnicas começam a gerar impacto em buscas locais e pelo nome do hotel." },
      { period: "3–6 meses", what: "Conteúdo novo começa a ser indexado. Crescimento consistente de tráfego orgânico." },
      { period: "6–12 meses", what: "Autoridade de domínio consolidada. Ranqueamento para termos mais competitivos do destino." },
      { period: "12+ meses", what: "Canal orgânico maduro gerando reservas com custo marginal zero. Ativo que pertence ao hotel." },
    ],
    faqH2: "Perguntas sobre SEO para Hotéis",
    faqs: [
      { q: "SEO para hotel é diferente de SEO normal?", a: "Sim. Hotelaria tem sazonalidade, buscas por destino, Google Hotel Ads integrado, Google Business Profile relevante e competição direta com OTAs bilionárias. Uma estratégia genérica de SEO não considera nenhuma dessas nuances." },
      { q: "Quanto tempo leva para aparecer no Google?", a: "Otimizações técnicas e de Google Business Profile geram resultados em 30 a 90 dias. Para ranquear termos competitivos do destino, 6 a 12 meses com estratégia consistente." },
      { q: "Vale a pena investir em SEO sendo um hotel pequeno?", a: "Sim, especialmente para pousadas e boutique hotels. Termos long-tail do destino têm baixa concorrência e alta intenção. Um hotel pequeno pode dominar buscas específicas que grandes redes ignoram." },
    ],
    ctaH2: "Seu hotel aparece no Google hoje?",
    ctaP: "Solicite um diagnóstico de SEO gratuito e descubra como seu hotel está posicionado frente às OTAs e concorrentes.",
    ctaBtn: "Diagnóstico de SEO Gratuito",
  },
  en: {
    waText: "Hi! I'm interested in Réserve's SEO service for hotels.",
    crumbHome: "Home",
    crumb: "SEO for Hotels",
    badge: "Specialized Service",
    h1a: "SEO for Hotels:",
    h1b: "appear ahead of the OTAs",
    heroP: "We optimize your hotel to appear organically on Google and Google Maps, attracting guests who never had to go through Booking.com.",
    heroCta: "I want to improve my SEO",
    pillarsLabel: "Our method",
    pillarsH2: "The 4 pillars of Hotel SEO",
    pillarsPa: "Hotel SEO is one of the central pillars of any ",
    pillarsPlink1: "serious marketing program for hotels",
    pillarsPb: ", and it works hand in hand with the hotel's ",
    pillarsPlink2: "digital channel management",
    pillarsPc: ", especially the Google Business Profile and reviews.",
    pillars: [
      { title: "Technical SEO", desc: "Speed, Core Web Vitals, friendly URLs, schema markup, mobile version. The foundation Google requires to rank well.", icon: "⚙️" },
      { title: "Google Business Profile", desc: "Complete local profile optimization: photos, reviews, categories and posts. Appears on Maps and in the local pack of searches.", icon: "📍" },
      { title: "Destination Content", desc: "A blog with guides, itineraries and tips about the destination. Captures travelers still in the planning phase, before choosing a hotel.", icon: "✍️" },
      { title: "Link Building", desc: "Partnerships with travel and hospitality publications to increase domain authority and rank for more competitive terms.", icon: "🔗" },
    ],
    tlLabel: "Results",
    tlH2: "SEO is an asset that grows over time",
    tlPa: "The full path, with timelines and tactics for each stage, is in our ",
    tlPlink: "complete hotel SEO guide",
    tlPb: ".",
    timeline: [
      { period: "30–90 days", what: "Improvements to Google Business Profile and technical optimizations start to impact local searches and searches by the hotel name." },
      { period: "3–6 months", what: "New content starts getting indexed. Consistent growth in organic traffic." },
      { period: "6–12 months", what: "Consolidated domain authority. Ranking for the destination's more competitive terms." },
      { period: "12+ months", what: "A mature organic channel generating bookings at zero marginal cost. An asset that belongs to the hotel." },
    ],
    faqH2: "Questions about SEO for Hotels",
    faqs: [
      { q: "Is hotel SEO different from regular SEO?", a: "Yes. Hospitality has seasonality, destination searches, integrated Google Hotel Ads, a relevant Google Business Profile and direct competition with billion-dollar OTAs. A generic SEO strategy considers none of those nuances." },
      { q: "How long does it take to appear on Google?", a: "Technical and Google Business Profile optimizations produce results in 30 to 90 days. To rank for competitive destination terms, 6 to 12 months with a consistent strategy." },
      { q: "Is it worth investing in SEO as a small hotel?", a: "Yes, especially for inns and boutique hotels. Long-tail destination terms have low competition and high intent. A small hotel can dominate specific searches that large chains ignore." },
    ],
    ctaH2: "Does your hotel show up on Google today?",
    ctaP: "Request a free SEO assessment and find out how your hotel is positioned against OTAs and competitors.",
    ctaBtn: "Free SEO Assessment",
  },
};

export default function SeoParaHoteisContent() {
  const { locale } = useLocale();
  const c = content[locale === "en" ? "en" : "pt"];

  return (
    <>
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#1a2918", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #84936f 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">{c.crumbHome}</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{c.crumb}</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              {c.badge}
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              {c.h1a}<br />
              <span style={{ color: BRAND_GREEN }}>{c.h1b}</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              {c.heroP}
            </p>
            <DiagnosticoCTA
              preselect={SERVICE_PRESELECT["/seo-para-hoteis"]}
              trackId="cta_seo_hero"
              source="/seo-para-hoteis"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
              style={{ background: BRAND_GREEN }}
            >
              {c.heroCta}
            </DiagnosticoCTA>
          </div>
        </section>

        {/* Pilares */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.pillarsLabel}</span>
              </div>
              <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
                {c.pillarsH2}
              </h2>
              <p className="text-[15px] font-light leading-[1.85] mb-10 max-w-2xl" style={{ color: TEXT_BODY }}>
                {c.pillarsPa}<Link href="/marketing-hoteleiro" style={{ color: BRAND_BROWN }}>{c.pillarsPlink1}</Link>{c.pillarsPb}<Link href="/gestao-de-canais" style={{ color: BRAND_BROWN }}>{c.pillarsPlink2}</Link>{c.pillarsPc}
              </p>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-5">
              {c.pillars.map((p, i) => (
                <Reveal key={i} delay={i * 60} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <div className="text-2xl mb-3">{p.icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{p.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{p.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline de resultados */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>{c.tlLabel}</span>
              </div>
              <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
                {c.tlH2}
              </h2>
              <p className="text-[15px] font-light leading-[1.85] mb-10 max-w-2xl" style={{ color: TEXT_BODY }}>
                {c.tlPa}<Link href="/blog/seo-para-hoteis-aparecer-no-google" style={{ color: BRAND_BROWN }}>{c.tlPlink}</Link>{c.tlPb}
              </p>
            </Reveal>
            <div className="flex flex-col gap-4">
              {c.timeline.map((t, i) => (
                <Reveal key={i} delay={i * 60} className="flex items-start gap-5 p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-[13px] font-semibold shrink-0 w-24 pt-0.5" style={{ color: BRAND_GREEN }}>{t.period}</span>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{t.what}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <Reveal as="h2" className="mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.faqH2}
            </Reveal>
            <div className="flex flex-col gap-4">
              {c.faqs.map((f, i) => (
                <Reveal key={i} delay={i * 60} className="p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD, fontSize: "15px" }}>{f.q}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{f.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#1a2918" }}>
          <Reveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              {c.ctaH2}
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              {c.ctaP}
            </p>
            <DiagnosticoCTA
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90"
              style={{ background: BRAND_GREEN }}
              trackId="cta_seo_para_hoteis"
              source="/seo-para-hoteis"
            >
              {c.ctaBtn}
            </DiagnosticoCTA>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
