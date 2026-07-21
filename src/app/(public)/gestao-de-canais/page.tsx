import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";
import { SERVICE_PRESELECT } from "@/components/LeadModal/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Gestão de Canais Digitais para Hotéis | Réserve | Marketing Hoteleiro Integrado",
  description: "Gerenciamos redes sociais, OTAs e plataformas digitais do seu hotel de forma integrada. Do Instagram ao Booking, do Google ao WhatsApp, tudo alinhado para gerar reservas diretas.",
  keywords: "gestão de canais digitais hotel, gestão OTA hotel, redes sociais para hotéis, marketing digital hoteleiro, gestão Instagram hotel, gestão Booking hotel, canais digitais pousada",
  alternates: { canonical: `${siteUrl}/gestao-de-canais` },
  openGraph: {
    title: "Gestão de Canais Digitais para Hotéis | Réserve",
    description: "Gerenciamos redes sociais, OTAs e plataformas digitais do seu hotel de forma integrada, do Instagram ao Booking, do Google ao WhatsApp.",
    type: "website",
    url: `${siteUrl}/gestao-de-canais`,
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#6e5e52";

const channels = [
  { name: "Instagram & Facebook", desc: "Conteúdo estratégico, gestão de perfil, campanhas pagas e engajamento com potenciais hóspedes." },
  { name: "Google Meu Negócio", desc: "Perfil otimizado com fotos, posts, avaliações gerenciadas e informações atualizadas para máxima visibilidade local." },
  { name: "Booking.com & Expedia", desc: "Otimização de perfil, gestão de tarifas, paridade de preços e estratégias de ranqueamento nas OTAs." },
  { name: "WhatsApp Business", desc: "Canal direto de atendimento e conversão, respondendo dúvidas e convertendo leads em reservas em tempo real." },
  { name: "Airbnb & Temporada", desc: "Otimização de anúncios, calendário de preços dinâmico e gestão de avaliações para maximizar ocupação." },
  { name: "E-mail Marketing", desc: "Réguas de relacionamento, pré-estadia, pós-estadia e campanhas de reativação para hóspedes recorrentes." },
];

const processSteps = [
  { n: "01", title: "Diagnóstico de Canais", desc: "Mapeamos todos os canais ativos do hotel, identificamos gaps e oportunidades de posicionamento." },
  { n: "02", title: "Estratégia Integrada", desc: "Criamos um plano unificado onde cada canal tem papel definido na jornada do hóspede." },
  { n: "03", title: "Produção e Execução", desc: "Gerenciamos conteúdo, moderação, atualização de tarifas e otimizações contínuas em todos os canais." },
  { n: "04", title: "Relatórios e Ajustes", desc: "Monitoramento de métricas-chave e otimizações mensais baseadas em dados reais de performance." },
];

const faqs = [
  { q: "Por que gestão de canais integrada é mais eficiente que canais separados?", a: "Quando canais operam de forma isolada, a comunicação fica inconsistente e oportunidades são perdidas. Uma gestão integrada garante identidade de marca uniforme, paridade tarifária correta e uma estratégia onde Instagram, Google, OTAs e WhatsApp trabalham juntos para guiar o hóspede até a reserva direta." },
  { q: "Vocês gerenciam as OTAs ou apenas as redes sociais?", a: "Gerenciamos todo o ecossistema digital do hotel: redes sociais, OTAs, Google Meu Negócio, WhatsApp e e-mail marketing. A estratégia integrada é justamente o que diferencia nossa abordagem: todos os canais trabalhando com o mesmo objetivo." },
  { q: "Como funciona a gestão das avaliações online?", a: "Monitoramos e respondemos avaliações no Google, Booking.com, TripAdvisor e outros canais. Avaliações bem gerenciadas aumentam o ranqueamento nas plataformas e a taxa de conversão de visitantes em reservas." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gestão de Canais Digitais para Hotéis",
  description: "Gerenciamento integrado de redes sociais, OTAs e plataformas digitais para hotéis, resorts e pousadas.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Gestão de Canais Digitais Hoteleiros",
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

export default function GestaoDeCanaisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Gestão de Canais Digitais", url: "/gestao-de-canais" },
      ]} />
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#1a1030", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #7c5cbf 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Gestão de Canais Digitais</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Serviço Especializado
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Gestão de Canais Digitais<br />
              <span style={{ color: BRAND_GREEN }}>integrada para o seu hotel</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Do Instagram ao Booking, do Google Meu Negócio ao WhatsApp, gerenciamos todos os pontos de contato digitais do seu hotel com uma única estratégia integrada.
            </p>
            <DiagnosticoCTA
              preselect={SERVICE_PRESELECT["/gestao-de-canais"]}
              trackId="cta_gestao_canais_hero"
              source="/gestao-de-canais"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
              style={{ background: BRAND_BROWN }}
            >
              Quero gestão integrada para meu hotel
            </DiagnosticoCTA>
          </div>
        </section>

        {/* Canais */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>Canais que gerenciamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Todos os canais do seu hotel, uma só estratégia
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {channels.map((c, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{c.name}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como trabalhamos */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>Como trabalhamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Do diagnóstico à execução contínua
            </h2>
            <div className="flex flex-col gap-4">
              {processSteps.map((s) => (
                <div key={s.n} className="flex items-start gap-5 p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-[32px] font-light shrink-0 leading-none" style={{ color: "rgba(153,79,42,0.25)" }}>{s.n}</span>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: TEXT_HEAD }}>{s.title}</h3>
                    <p className="text-[14px] font-light" style={{ color: TEXT_BODY }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>Dúvidas Frequentes</span>
            </div>
            <h2 className="mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Perguntas sobre Gestão de Canais
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#1a1030" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Seus canais digitais estão trabalhando pelo hotel?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico gratuito e descubra como unificar todos os canais do seu hotel em uma estratégia que gera reservas diretas.
            </p>
            <DiagnosticoCTA
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
              trackId="cta_gestao_de_canais"
              source="/gestao-de-canais"
            >
              Diagnóstico Gratuito
            </DiagnosticoCTA>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
