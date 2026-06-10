import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Reservas Diretas para Hotéis | Réserve — Menos OTAs, Mais Margem",
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

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

const etapas = [
  { mes: "Mês 1–2", title: "Site + Motor de Reservas", desc: "Otimizamos ou construímos seu site com motor de reservas integrado, rápido e focado em conversão." },
  { mes: "Mês 1–2", title: "Google Hotel Ads", desc: "Canal de maior ROI ativado para capturar viajantes que já buscam seu destino." },
  { mes: "Mês 2–4", title: "Campanhas Search", desc: "Google Ads pelo nome do hotel e por termos de destino — garante que você aparece antes das OTAs." },
  { mes: "Mês 3–6", title: "SEO + Conteúdo", desc: "Tráfego orgânico crescente que gera reservas sem custo variável no longo prazo." },
  { mes: "Mês 4+", title: "Base de Hóspedes", desc: "E-mail marketing e programa de benefícios para hóspedes anteriores — custo de aquisição zero." },
];

const benefits = [
  "Zero comissão por reserva",
  "Relacionamento direto com o hóspede",
  "Dados próprios para remarketing",
  "Controle total de tarifas",
  "Maior margem por reserva",
  "Ativo que valoriza com o tempo",
];

const faqs = [
  { q: "O que são reservas diretas?", a: "Reservas diretas são as hospedagens que o hóspede fecha pelos canais próprios do hotel — site com motor de reservas, WhatsApp, telefone ou recepção — sem passar por uma OTA como Booking, Expedia ou Decolar. Por isso, não há comissão: o valor integral fica com o hotel." },
  { q: "Como aumentar as reservas diretas do meu hotel?", a: "O caminho combina quatro frentes: um site rápido com motor de reservas integrado, Google Hotel Ads e Google Ads para capturar quem já busca o destino, uma garantia de melhor tarifa no canal direto e uma base de e-mail/WhatsApp para remarketing. É exatamente o sistema que montamos na Réserve." },
  { q: "Em quanto tempo posso reduzir a dependência das OTAs?", a: "Uma meta conservadora e alcançável é migrar de 20% para 40% de canal direto em 12 meses. Alguns hotéis chegam a 60% com estratégia bem executada." },
  { q: "Preciso sair do Booking.com para ter reservas diretas?", a: "Não. A estratégia é usar as OTAs como vitrine (distribuição) e capturar a demanda gerada por elas no canal direto. Os dois canais trabalham juntos." },
  { q: "Qual benefício devo oferecer para o hóspede reservar direto?", a: "As táticas mais eficazes: melhor tarifa garantida no site, early check-in, café da manhã incluso, upgrade sujeito a disponibilidade. A garantia de melhor preço é a mais simples e mais poderosa." },
  { q: "Reservas diretas valem a pena para pousadas e resorts pequenos?", a: "Sim, e muitas vezes ainda mais. Empreendimentos menores sentem o peso da comissão de OTA com mais força na margem. Um canal direto bem estruturado é o que torna a operação sustentável — vale tanto para pousadas quanto para resorts." },
  { q: "Reserva direta é mais barata que pelo Booking?", a: "Para o hotel, sim: não há comissão de 15% a 25%. Para o hóspede, costuma ser igual ou mais vantajosa, porque o hotel pode repassar parte da economia da comissão como melhor preço ou benefícios exclusivos no canal direto." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Estratégia de Reservas Diretas para Hotéis",
  description: "Canal direto de aquisição de hóspedes para hotéis, resorts e pousadas — com zero comissão por reserva.",
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
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#1f1410", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #994f2a 0%, transparent 55%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Reservas Diretas</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Estratégia de Canal Direto
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Pare de pagar 20% de comissão<br />
              <span style={{ color: BRAND_GREEN }}>em cada reserva</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Construímos o canal direto do seu hotel — site,{" "}
              <Link href="/motor-de-reservas" style={{ color: BRAND_GREEN, textDecoration: "underline" }}>motor de reservas</Link>, campanhas e estratégia integrada. Reservas sem intermediário, margem que fica com você.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Quero aumentar as reservas diretas do meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              Quero mais reservas diretas
            </a>
          </div>
        </section>

        {/* A conta */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>A conta real</span>
            </div>
            <h2 className="mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Quanto você perde por mês em comissões?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl" style={{ background: "rgba(180,80,65,0.06)", border: "1px solid rgba(180,80,65,0.15)" }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(180,80,65,0.7)" }}>Cenário atual — com OTAs</p>
                <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>
                  Faturamento R$80.000/mês · 60% via Booking (18% comissão) = <strong style={{ color: TEXT_HEAD }}>R$ 8.640/mês em comissões</strong> = R$ 103.680/ano perdidos.
                </p>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: "rgba(132,147,111,0.08)", border: `1px solid rgba(132,147,111,0.2)` }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: BRAND_GREEN }}>Com canal direto — Réserve</p>
                <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>
                  40% de reservas diretas = R$ 3.456/mês economizados em comissões + ativo digital crescente que é seu.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span style={{ color: BRAND_GREEN }}>✓</span>
                  <span className="text-[13px] font-light" style={{ color: TEXT_HEAD }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>Como fazemos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Roteiro de migração para canal direto
            </h2>
            <div className="flex flex-col gap-4">
              {etapas.map((e, i) => (
                <div key={i} className="flex items-start gap-5 p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-[12px] font-semibold shrink-0 w-20 pt-0.5" style={{ color: BRAND_BROWN }}>{e.mes}</span>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: TEXT_HEAD }}>{e.title}</h3>
                    <p className="text-[14px] font-light" style={{ color: TEXT_BODY }}>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Perguntas sobre Reservas Diretas
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#1f1410" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Quanto seu hotel perde por mês?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico gratuito e receba uma análise do seu canal direto atual com plano de ação personalizado.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Quero aumentar as reservas diretas do meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90"
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
