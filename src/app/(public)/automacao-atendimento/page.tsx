import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Automação de Atendimento para Hotéis | Réserve — WhatsApp e Reservas 24h",
  description: "Automação inteligente de WhatsApp para hotéis, resorts e pousadas. Capturamos leads, respondemos dúvidas e convertemos reservas diretas 24 horas por dia, 7 dias por semana.",
  keywords: "automação WhatsApp hotel, chatbot hotel, atendimento automatizado pousada, WhatsApp Business hotel, automação reservas hotel, bot atendimento hotelaria, WhatsApp API hotel",
  alternates: { canonical: `${siteUrl}/automacao-atendimento` },
  openGraph: {
    title: "Automação de Atendimento para Hotéis | Réserve",
    description: "Automação inteligente do WhatsApp para capturar leads, responder dúvidas e converter reservas 24h por dia para o seu hotel.",
    type: "website",
    url: `${siteUrl}/automacao-atendimento`,
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

const features = [
  { title: "Atendimento 24/7 no WhatsApp", desc: "Respostas automáticas inteligentes fora do horário comercial — nenhum lead perde a chance de reservar por falta de atendimento." },
  { title: "Qualificação de Leads", desc: "Fluxo automatizado que identifica datas, tipo de acomodação e orçamento, entregando leads qualificados direto para a equipe." },
  { title: "Envio de Proposta Automático", desc: "Após qualificação, o sistema envia disponibilidade, tarifas e link de reserva direta — acelerando o ciclo de conversão." },
  { title: "Follow-up Inteligente", desc: "Sequências automáticas para leads que não responderam ou não finalizaram a reserva, com mensagens personalizadas por etapa." },
  { title: "Pré e Pós-Estadia", desc: "Mensagens automáticas de confirmação, instruções de check-in, boas-vindas personalizadas e solicitação de avaliação após a estadia." },
  { title: "Integração com CRM", desc: "Todos os contatos e histórico de conversas centralizado, com tagging automático por origem, status e tipo de reserva." },
];

const steps = [
  { n: "01", title: "Mapeamento de Fluxos", desc: "Identificamos os principais cenários de atendimento do hotel para construir fluxos que replicam o atendimento humano." },
  { n: "02", title: "Configuração e Integração", desc: "Configuração do WhatsApp Business API, construção dos fluxos e integração com o motor de reservas e CRM." },
  { n: "03", title: "Treinamento da Equipe", desc: "Capacitamos a equipe para gerenciar a plataforma, assumir conversas quando necessário e interpretar os relatórios." },
  { n: "04", title: "Monitoramento e Refinamento", desc: "Análise contínua de taxa de resposta, conversão e satisfação — com otimizações mensais dos fluxos." },
];

const faqs = [
  { q: "A automação substitui o atendimento humano?", a: "Não — ela complementa. A automação garante resposta imediata 24h e qualifica o lead, mas quando o hóspede prefere falar com uma pessoa ou a situação requer julgamento humano, a conversa é transferida facilmente para a equipe. O objetivo é que nenhum lead fique sem resposta, nunca." },
  { q: "Preciso de um número exclusivo para o WhatsApp Business API?", a: "Sim. O WhatsApp Business API exige um número dedicado, diferente do WhatsApp pessoal. Auxiliamos na configuração completa, incluindo a verificação do número e a aprovação do meta business." },
  { q: "Como funciona a integração com o motor de reservas?", a: "Integramos a automação com os principais motores de reservas do mercado hoteleiro. O sistema consulta disponibilidade em tempo real e envia o link de reserva direta para o hóspede — sem precisar de atendente para essa etapa." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automação de Atendimento para Hotéis",
  description: "Automação inteligente de WhatsApp para capturar leads e converter reservas diretas 24h para hotéis, resorts e pousadas.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Automação de Atendimento Hoteleiro",
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

export default function AutomacaoAtendimentoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Automação de Atendimento", url: "/automacao-atendimento" },
      ]} />
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#0f1f0f", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #25d366 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Automação de Atendimento</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Serviço Especializado
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Automação de Atendimento:<br />
              <span style={{ color: BRAND_GREEN }}>reservas diretas 24h via WhatsApp</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Automação inteligente que captura leads, responde dúvidas e converte reservas diretas enquanto sua equipe descansa — sem perder nenhuma oportunidade.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Tenho interesse na automação de atendimento para o meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              Quero automação para meu hotel
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>O que automatizamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Atendimento inteligente em cada etapa da jornada
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{f.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processo */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>Como implantamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Da configuração ao atendimento ativo
            </h2>
            <div className="flex flex-col gap-4">
              {steps.map((s) => (
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
              Perguntas sobre Automação de Atendimento
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#0f1f0f" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Seu hotel perde leads fora do horário comercial?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico gratuito e descubra quantas reservas seu hotel pode converter com automação inteligente no WhatsApp.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Tenho interesse na automação de atendimento para o meu hotel."
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
