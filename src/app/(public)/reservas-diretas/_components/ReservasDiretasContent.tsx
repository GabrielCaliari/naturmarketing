"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    waText: "Olá! Quero aumentar as reservas diretas do meu hotel.",
    crumbHome: "Início",
    crumb: "Reservas Diretas",
    badge: "Estratégia de Canal Direto",
    h1a: "Pare de pagar 20% de comissão",
    h1b: "em cada reserva",
    heroP1: "Construímos o canal direto do seu hotel: site, ",
    motorLink: "motor de reservas",
    heroP2: ", campanhas e estratégia integrada. Reservas sem intermediário, margem que fica com você.",
    heroCta: "Quero mais reservas diretas",
    contaLabel: "A conta real",
    contaH2: "Quanto você perde por mês em comissões?",
    card1Label: "Cenário atual: com OTAs",
    card1Text1: "Faturamento R$80.000/mês · 60% via Booking (18% comissão) = ",
    card1Strong: "R$ 8.640/mês em comissões",
    card1Text2: " = R$ 103.680/ano perdidos.",
    card2Label: "Com canal direto: Réserve",
    card2Text: "40% de reservas diretas = R$ 3.456/mês economizados em comissões + ativo digital crescente que é seu.",
    benefits: [
      "Zero comissão por reserva",
      "Relacionamento direto com o hóspede",
      "Dados próprios para remarketing",
      "Controle total de tarifas",
      "Maior margem por reserva",
      "Ativo que valoriza com o tempo",
    ],
    roadmapLabel: "Como fazemos",
    roadmapH2: "Roteiro de migração para canal direto",
    etapas: [
      { mes: "Mês 1–2", title: "Site + Motor de Reservas", desc: "Otimizamos ou construímos seu site com motor de reservas integrado, rápido e focado em conversão." },
      { mes: "Mês 1–2", title: "Google Hotel Ads", desc: "Canal de maior ROI ativado para capturar viajantes que já buscam seu destino." },
      { mes: "Mês 2–4", title: "Campanhas Search", desc: "Google Ads pelo nome do hotel e por termos de destino, o que garante que você aparece antes das OTAs." },
      { mes: "Mês 3–6", title: "SEO + Conteúdo", desc: "Tráfego orgânico crescente que gera reservas sem custo variável no longo prazo." },
      { mes: "Mês 4+", title: "Base de Hóspedes", desc: "E-mail marketing e programa de benefícios para hóspedes anteriores, custo de aquisição zero." },
    ],
    faqH2: "Perguntas sobre Reservas Diretas",
    faqs: [
      { q: "O que são reservas diretas?", a: "Reservas diretas são as hospedagens que o hóspede fecha pelos canais próprios do hotel (site com motor de reservas, WhatsApp, telefone ou recepção), sem passar por uma OTA como Booking, Expedia ou Decolar. Por isso, não há comissão: o valor integral fica com o hotel." },
      { q: "Como aumentar as reservas diretas do meu hotel?", a: "O caminho combina quatro frentes: um site rápido com motor de reservas integrado, Google Hotel Ads e Google Ads para capturar quem já busca o destino, uma garantia de melhor tarifa no canal direto e uma base de e-mail/WhatsApp para remarketing. É exatamente o sistema que montamos na Réserve." },
      { q: "Em quanto tempo posso reduzir a dependência das OTAs?", a: "Uma meta conservadora e alcançável é migrar de 20% para 40% de canal direto em 12 meses. Alguns hotéis chegam a 60% com estratégia bem executada." },
      { q: "Preciso sair do Booking.com para ter reservas diretas?", a: "Não. A estratégia é usar as OTAs como vitrine (distribuição) e capturar a demanda gerada por elas no canal direto. Os dois canais trabalham juntos." },
      { q: "Qual benefício devo oferecer para o hóspede reservar direto?", a: "As táticas mais eficazes: melhor tarifa garantida no site, early check-in, café da manhã incluso, upgrade sujeito a disponibilidade. A garantia de melhor preço é a mais simples e mais poderosa." },
      { q: "Reservas diretas valem a pena para pousadas e resorts pequenos?", a: "Sim, e muitas vezes ainda mais. Empreendimentos menores sentem o peso da comissão de OTA com mais força na margem. Um canal direto bem estruturado é o que torna a operação sustentável. Vale tanto para pousadas quanto para resorts." },
      { q: "Reserva direta é mais barata que pelo Booking?", a: "Para o hotel, sim: não há comissão de 15% a 25%. Para o hóspede, costuma ser igual ou mais vantajosa, porque o hotel pode repassar parte da economia da comissão como melhor preço ou benefícios exclusivos no canal direto." },
    ],
    ctaH2: "Quanto seu hotel perde por mês?",
    ctaP: "Solicite um diagnóstico gratuito e receba uma análise do seu canal direto atual com plano de ação personalizado.",
    ctaBtn: "Diagnóstico Gratuito",
  },
  en: {
    waText: "Hi! I want to increase my hotel's direct bookings.",
    crumbHome: "Home",
    crumb: "Direct Bookings",
    badge: "Direct Channel Strategy",
    h1a: "Stop paying 20% commission",
    h1b: "on every booking",
    heroP1: "We build your hotel's direct channel: website, ",
    motorLink: "booking engine",
    heroP2: ", campaigns and an integrated strategy. Bookings with no middleman, margin that stays with you.",
    heroCta: "I want more direct bookings",
    contaLabel: "The real math",
    contaH2: "How much are you losing in commissions every month?",
    card1Label: "Current scenario: with OTAs",
    card1Text1: "Revenue of R$80,000/mo · 60% via Booking (18% commission) = ",
    card1Strong: "R$ 8,640/mo in commissions",
    card1Text2: " = R$ 103,680/year lost.",
    card2Label: "With a direct channel: Réserve",
    card2Text: "40% direct bookings = R$ 3,456/mo saved in commissions + a growing digital asset that is yours.",
    benefits: [
      "Zero commission per booking",
      "A direct relationship with the guest",
      "First-party data for remarketing",
      "Full control over rates",
      "Higher margin per booking",
      "An asset that appreciates over time",
    ],
    roadmapLabel: "How we do it",
    roadmapH2: "Migration roadmap to a direct channel",
    etapas: [
      { mes: "Month 1–2", title: "Website + Booking Engine", desc: "We optimize or build your website with an integrated booking engine, fast and conversion-focused." },
      { mes: "Month 1–2", title: "Google Hotel Ads", desc: "The highest-ROI channel, activated to capture travelers already searching for your destination." },
      { mes: "Month 2–4", title: "Search Campaigns", desc: "Google Ads on your hotel name and destination terms, ensuring you appear ahead of the OTAs." },
      { mes: "Month 3–6", title: "SEO + Content", desc: "Growing organic traffic that generates bookings with no variable cost in the long run." },
      { mes: "Month 4+", title: "Guest Database", desc: "Email marketing and a benefits program for past guests, zero acquisition cost." },
    ],
    faqH2: "Questions about Direct Bookings",
    faqs: [
      { q: "What are direct bookings?", a: "Direct bookings are stays the guest closes through the hotel's own channels (a website with a booking engine, WhatsApp, phone or the front desk), without going through an OTA like Booking, Expedia or Decolar. That's why there is no commission: the full amount stays with the hotel." },
      { q: "How do I increase my hotel's direct bookings?", a: "The path combines four fronts: a fast website with an integrated booking engine, Google Hotel Ads and Google Ads to capture people already searching for the destination, a best-rate guarantee on the direct channel, and an email/WhatsApp database for remarketing. It's exactly the system we build at Réserve." },
      { q: "How long until I can reduce my OTA dependency?", a: "A conservative, achievable goal is moving from 20% to 40% direct channel within 12 months. Some hotels reach 60% with a well-executed strategy." },
      { q: "Do I need to leave Booking.com to have direct bookings?", a: "No. The strategy is to use OTAs as a storefront (distribution) and capture the demand they generate on the direct channel. The two channels work together." },
      { q: "What benefit should I offer for a guest to book direct?", a: "The most effective tactics: a best-rate guarantee on the site, early check-in, breakfast included, upgrade subject to availability. The best-price guarantee is the simplest and most powerful." },
      { q: "Are direct bookings worth it for small inns and resorts?", a: "Yes, often even more so. Smaller properties feel the weight of OTA commission more heavily on their margin. A well-structured direct channel is what makes the operation sustainable. It's true for inns and resorts alike." },
      { q: "Is a direct booking cheaper than via Booking?", a: "For the hotel, yes: there's no 15% to 25% commission. For the guest, it's usually equal or better, because the hotel can pass part of the commission savings on as a better price or exclusive benefits on the direct channel." },
    ],
    ctaH2: "How much is your hotel losing every month?",
    ctaP: "Request a free assessment and receive an analysis of your current direct channel with a personalized action plan.",
    ctaBtn: "Free Assessment",
  },
};

export default function ReservasDiretasContent() {
  const { locale } = useLocale();
  const c = content[locale === "en" ? "en" : "pt"];

  return (
    <>
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#1f1410", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #994f2a 0%, transparent 55%)" }} />
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
              {c.heroP1}
              <Link href="/motor-de-reservas" style={{ color: BRAND_GREEN, textDecoration: "underline" }}>{c.motorLink}</Link>{c.heroP2}
            </p>
            <DiagnosticoCTA
              preselect={SERVICE_PRESELECT["/reservas-diretas"]}
              trackId="cta_reservas_diretas_hero"
              source="/reservas-diretas"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
              style={{ background: BRAND_BROWN }}
            >
              {c.heroCta}
            </DiagnosticoCTA>
          </div>
        </section>

        {/* A conta */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>{c.contaLabel}</span>
            </div>
            <h2 className="mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.contaH2}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl" style={{ background: "rgba(180,80,65,0.06)", border: "1px solid rgba(180,80,65,0.15)" }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(180,80,65,0.7)" }}>{c.card1Label}</p>
                <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>
                  {c.card1Text1}<strong style={{ color: TEXT_HEAD }}>{c.card1Strong}</strong>{c.card1Text2}
                </p>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: "rgba(132,147,111,0.08)", border: `1px solid rgba(132,147,111,0.2)` }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: BRAND_GREEN }}>{c.card2Label}</p>
                <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>
                  {c.card2Text}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {c.benefits.map((b, i) => (
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
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.roadmapLabel}</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.roadmapH2}
            </h2>
            <div className="flex flex-col gap-4">
              {c.etapas.map((e, i) => (
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
              {c.faqH2}
            </h2>
            <div className="flex flex-col gap-4">
              {c.faqs.map((f, i) => (
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
              {c.ctaH2}
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              {c.ctaP}
            </p>
            <DiagnosticoCTA
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90"
              style={{ background: BRAND_BROWN }}
              trackId="cta_reservas_diretas"
              source="/reservas-diretas"
            >
              {c.ctaBtn}
            </DiagnosticoCTA>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
