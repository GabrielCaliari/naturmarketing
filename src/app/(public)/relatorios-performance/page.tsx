import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.reservemkt.com.br";

export const metadata: Metadata = {
  title: "Relatórios de Performance para Hotéis | Réserve — Análise e ROI Hoteleiro",
  description: "Relatórios de performance e análise de ROI especializados para hotéis, resorts e pousadas. Métricas reais, decisões baseadas em dados e visibilidade total sobre seus investimentos em marketing.",
  keywords: "relatório de performance hotel, ROI marketing hoteleiro, análise dados hotel, métricas hotel, dashboard hotel, relatório reservas hotel, KPI hoteleiro, analytics hotel",
  alternates: { canonical: `${siteUrl}/relatorios-performance` },
  openGraph: {
    title: "Relatórios de Performance para Hotéis | Réserve",
    description: "Análise profunda de ROI e métricas de desempenho para decisões baseadas em dados reais sobre o marketing do seu hotel.",
    type: "website",
    url: `${siteUrl}/relatorios-performance`,
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

const metrics = [
  { title: "Custo por Reserva", desc: "Quanto cada canal (Google Ads, Meta Ads, SEO, direto) gasta para gerar uma reserva confirmada — a métrica mais importante do marketing hoteleiro." },
  { title: "ROAS por Canal", desc: "Retorno sobre o gasto em anúncios por plataforma, comparando performance entre Google Hotel Ads, Meta Ads e outros canais pagos." },
  { title: "Taxa de Conversão do Site", desc: "Percentual de visitantes que iniciam e finalizam uma reserva — indica a eficácia do site e do motor de reservas." },
  { title: "Receita Direta vs. OTAs", desc: "Evolução da participação de reservas diretas frente às OTAs ao longo do tempo — o indicador central da estratégia de independência." },
  { title: "Taxa de Ocupação por Período", desc: "Análise de ocupação por mês, canal e tipo de quarto para identificar oportunidades e gargalos de demanda." },
  { title: "Lifetime Value do Hóspede", desc: "Valor gerado por cada hóspede ao longo do tempo, considerando recorrência e recomendações — base para estratégias de fidelização." },
];

const tools = [
  { n: "01", title: "Google Analytics 4", desc: "Rastreamento completo de comportamento no site, funil de reservas e atribuição de canais." },
  { n: "02", title: "Google Looker Studio", desc: "Dashboard personalizado com visão consolidada de todos os canais em tempo real." },
  { n: "03", title: "Meta Business Suite", desc: "Performance detalhada de campanhas no Facebook e Instagram com atribuição de conversões." },
  { n: "04", title: "Relatório Mensal Estratégico", desc: "Documento gerencial com análise dos resultados, insights e plano de ação para o mês seguinte." },
];

const faqs = [
  { q: "Com que frequência recebo os relatórios?", a: "Relatórios mensais completos com análise estratégica. Dashboard em tempo real acessível a qualquer momento. Para campanhas em alta temporada, reuniões quinzenais de acompanhamento." },
  { q: "Quais dados são necessários para começar?", a: "Acesso às plataformas de anúncios, Google Analytics, motor de reservas e, se disponível, dados históricos de ocupação e receita. A estruturação do rastreamento faz parte do nosso onboarding." },
  { q: "Como os relatórios ajudam a tomar decisões?", a: "Ao invés de 'acho que está indo bem', você passa a saber exatamente qual canal gera mais reservas, qual público converte melhor e onde o orçamento deve ser aumentado ou cortado. Dados substituem suposições." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Relatórios de Performance para Hotéis",
  description: "Análise de ROI e relatórios de performance de marketing digital para hotéis, resorts e pousadas no Brasil.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Analytics e Relatórios Hoteleiros",
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

export default function RelatoriosPerformancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Relatórios de Performance", url: "/relatorios-performance" },
      ]} />
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#0f1a1a", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #84936f 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Relatórios de Performance</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Serviço Especializado
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Decisões baseadas em<br />
              <span style={{ color: BRAND_GREEN }}>dados reais do seu hotel</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Análise profunda de ROI, métricas de desempenho por canal e relatórios estratégicos mensais — para você saber exatamente o retorno de cada real investido.
            </p>
            <a
              href="https://wa.me/553597742984?text=Olá! Tenho interesse nos relatórios de performance para o meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              Quero visibilidade sobre meus resultados
            </a>
          </div>
        </section>

        {/* Métricas */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>O que medimos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              As métricas que realmente importam para hotelaria
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {metrics.map((m, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{m.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ferramentas */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>Ferramentas e entregas</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Visibilidade total sobre o desempenho do hotel
            </h2>
            <div className="flex flex-col gap-4">
              {tools.map((t) => (
                <div key={t.n} className="flex items-start gap-5 p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-[32px] font-light shrink-0 leading-none" style={{ color: "rgba(153,79,42,0.25)" }}>{t.n}</span>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: TEXT_HEAD }}>{t.title}</h3>
                    <p className="text-[14px] font-light" style={{ color: TEXT_BODY }}>{t.desc}</p>
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
              Perguntas sobre Relatórios de Performance
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#0f1a1a" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Você sabe o ROI real do seu marketing?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico gratuito e descubra como estruturar a análise de dados do seu hotel para tomar decisões de marketing baseadas em resultados reais.
            </p>
            <a
              href="https://wa.me/553597742984?text=Olá! Tenho interesse nos relatórios de performance para o meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              Diagnóstico Gratuito
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
