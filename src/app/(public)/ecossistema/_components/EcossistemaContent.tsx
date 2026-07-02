"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IconArrowRight } from "@tabler/icons-react";
import { useLocale } from "@/context/LocaleContext";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#5C4F45";

type Pillar = {
  n: string;
  title: string;
  desc: string;
  links: { label: string; href: string }[];
};

const content = {
  pt: {
    crumbHome: "Início",
    crumb: "Ecossistema",
    badge: "A Metodologia Réserve",
    h1a: "Ecossistema de",
    h1b: "Aquisição de Hóspedes",
    heroP: "Campanha isolada não sustenta ocupação. O nosso método conecta demanda, conversão, atendimento e dados em um sistema único — para que cada real investido volte em reserva direta, mês após mês.",
    heroCta: "Solicitar diagnóstico gratuito",
    introH2: "Por que campanhas isoladas falham na hotelaria",
    introP1: "A maioria dos hotéis já tentou: um gestor de tráfego aqui, um site novo ali, um perfil ativo no Instagram. Cada peça até funciona sozinha — mas o hóspede não reserva em peças isoladas. Ele pesquisa no Google, compara na OTA, visita o site, pergunta no WhatsApp e só então decide. Se qualquer elo dessa corrente falha, a reserva vai para o concorrente ou para a comissão da OTA.",
    introP2: "O Ecossistema de Aquisição de Hóspedes existe para fechar esses elos. Não vendemos serviços avulsos: montamos o sistema completo, medimos cada etapa e otimizamos onde o dado mostrar que a reserva está escapando.",
    pillarsLabel: "Os 5 pilares",
    pillarsH2: "Como o ecossistema funciona",
    pillars: [
      {
        n: "01",
        title: "Diagnóstico e Estratégia",
        desc: "Tudo começa com um raio-X da operação: presença digital, dependência de OTA, site, tarifas e atendimento. É o diagnóstico que define onde atacar primeiro — sem achismo.",
        links: [{ label: "Diagnóstico Gratuito", href: "/diagnostico" }],
      },
      {
        n: "02",
        title: "Geração de Demanda",
        desc: "Colocamos a sua hospedagem na frente do viajante certo, no momento da decisão: Google Hotel Ads para quem compara tarifas, Meta Ads para despertar desejo e SEO para demanda constante sem custo por clique.",
        links: [
          { label: "Google Hotel Ads", href: "/google-hotel-ads" },
          { label: "Meta Ads", href: "/meta-ads" },
          { label: "SEO para Hotéis", href: "/seo-para-hoteis" },
        ],
      },
      {
        n: "03",
        title: "Conversão no Canal Direto",
        desc: "Demanda sem conversão alimenta OTA. Um site hoteleiro rápido, com motor de reservas integrado ao PMS, transforma o clique em reserva no seu canal — com o valor integral no seu caixa.",
        links: [
          { label: "Sites para Hotéis", href: "/sites-para-hoteis" },
          { label: "Motor de Reservas", href: "/motor-de-reservas" },
          { label: "Reservas Diretas", href: "/reservas-diretas" },
        ],
      },
      {
        n: "04",
        title: "Atendimento que Fecha Reserva",
        desc: "O gargalo real da hotelaria não é o anúncio — é o atendimento. Lead que espera mais de 5 minutos esfria. A automação com IA no WhatsApp responde na hora, qualifica e conduz até a reserva, 24 horas por dia.",
        links: [{ label: "Automação de Atendimento", href: "/automacao-atendimento" }],
      },
      {
        n: "05",
        title: "Dados e Otimização Contínua",
        desc: "Cada reserva é rastreada até a origem. Relatórios claros mostram o que gera receita e o que desperdiça verba — e a gestão de canais equilibra OTA e canal direto para proteger a margem.",
        links: [
          { label: "Relatórios de Performance", href: "/relatorios-performance" },
          { label: "Gestão de Canais", href: "/gestao-de-canais" },
        ],
      },
    ] as Pillar[],
    cycleLabel: "Na prática",
    cycleH2: "Um ciclo que se retroalimenta",
    cycleP: "O ecossistema não é uma linha de montagem — é um ciclo. Os dados do atendimento alimentam os anúncios, os anúncios alimentam o site, o site alimenta a base de hóspedes, e a base volta a gerar reservas por remarketing e fidelização. Quanto mais tempo roda, mais barato fica adquirir cada hóspede.",
    cycleItems: [
      { title: "Mês 1–2", desc: "Diagnóstico, correção do canal direto (site + motor) e primeiras campanhas no ar." },
      { title: "Mês 3–4", desc: "Atendimento automatizado integrado, funil medido de ponta a ponta e otimização das campanhas por dado real." },
      { title: "Mês 5+", desc: "Escala dos canais de maior ROI, remarketing para a base própria e redução progressiva da dependência de OTA." },
    ],
    ctaH2: "Quer ver o ecossistema aplicado ao seu hotel?",
    ctaP: "Solicite um diagnóstico gratuito. Analisamos a sua operação e mostramos exatamente onde estão as reservas que você está deixando na mesa.",
    ctaBtn: "Solicitar Diagnóstico Gratuito",
  },
  en: {
    crumbHome: "Home",
    crumb: "Ecosystem",
    badge: "The Réserve Method",
    h1a: "Guest Acquisition",
    h1b: "Ecosystem",
    heroP: "Isolated campaigns don't sustain occupancy. Our method connects demand, conversion, guest service and data into a single system — so every dollar invested comes back as a direct booking, month after month.",
    heroCta: "Request a free assessment",
    introH2: "Why isolated campaigns fail in hospitality",
    introP1: "Most hotels have tried it: a traffic manager here, a new website there, an active Instagram profile. Each piece may even work on its own — but guests don't book in isolated pieces. They search on Google, compare on the OTA, visit the website, ask on WhatsApp and only then decide. If any link in that chain fails, the booking goes to a competitor or to the OTA's commission.",
    introP2: "The Guest Acquisition Ecosystem exists to close those links. We don't sell one-off services: we build the complete system, measure every stage and optimize wherever the data shows a booking slipping away.",
    pillarsLabel: "The 5 pillars",
    pillarsH2: "How the ecosystem works",
    pillars: [
      {
        n: "01",
        title: "Assessment and Strategy",
        desc: "Everything starts with an X-ray of the operation: digital presence, OTA dependence, website, rates and guest service. The assessment defines where to strike first — no guesswork.",
        links: [{ label: "Free Assessment", href: "/diagnostico" }],
      },
      {
        n: "02",
        title: "Demand Generation",
        desc: "We put your property in front of the right traveler at the moment of decision: Google Hotel Ads for rate shoppers, Meta Ads to spark desire and SEO for constant demand with no cost per click.",
        links: [
          { label: "Google Hotel Ads", href: "/google-hotel-ads" },
          { label: "Meta Ads", href: "/meta-ads" },
          { label: "Hotel SEO", href: "/seo-para-hoteis" },
        ],
      },
      {
        n: "03",
        title: "Direct Channel Conversion",
        desc: "Demand without conversion feeds the OTAs. A fast hotel website with a booking engine integrated to your PMS turns the click into a booking on your own channel — with the full amount in your account.",
        links: [
          { label: "Hotel Websites", href: "/sites-para-hoteis" },
          { label: "Booking Engine", href: "/motor-de-reservas" },
          { label: "Direct Bookings", href: "/reservas-diretas" },
        ],
      },
      {
        n: "04",
        title: "Guest Service that Closes Bookings",
        desc: "Hospitality's real bottleneck isn't the ad — it's the response. A lead that waits more than 5 minutes goes cold. AI-powered WhatsApp automation replies instantly, qualifies and guides the guest to the booking, 24/7.",
        links: [{ label: "Service Automation", href: "/automacao-atendimento" }],
      },
      {
        n: "05",
        title: "Data and Continuous Optimization",
        desc: "Every booking is traced back to its source. Clear reports show what generates revenue and what wastes budget — and channel management balances OTAs and the direct channel to protect your margin.",
        links: [
          { label: "Performance Reports", href: "/relatorios-performance" },
          { label: "Channel Management", href: "/gestao-de-canais" },
        ],
      },
    ] as Pillar[],
    cycleLabel: "In practice",
    cycleH2: "A cycle that feeds itself",
    cycleP: "The ecosystem isn't an assembly line — it's a cycle. Service data feeds the ads, the ads feed the website, the website feeds the guest base, and the base generates new bookings through remarketing and loyalty. The longer it runs, the cheaper each guest becomes to acquire.",
    cycleItems: [
      { title: "Months 1–2", desc: "Assessment, direct-channel fixes (website + booking engine) and first campaigns live." },
      { title: "Months 3–4", desc: "Automated guest service integrated, funnel measured end to end and campaigns optimized on real data." },
      { title: "Months 5+", desc: "Scaling the highest-ROI channels, remarketing to your own base and progressively reducing OTA dependence." },
    ],
    ctaH2: "Want to see the ecosystem applied to your hotel?",
    ctaP: "Request a free assessment. We'll analyze your operation and show exactly where the bookings you're leaving on the table are.",
    ctaBtn: "Request Free Assessment",
  },
};

export default function EcossistemaContent() {
  const { locale } = useLocale();
  const c = content[locale === "en" ? "en" : "pt"];

  return (
    <>
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#15110d", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${BRAND_GREEN} 0%, transparent 60%)` }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              <Link href="/" className="hover:text-white transition-colors">{c.crumbHome}</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.92)" }}>{c.crumb}</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              {c.badge}
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              {c.h1a}<br />
              <span style={{ color: BRAND_GREEN }}>{c.h1b}</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "580px", lineHeight: 1.75 }}>
              {c.heroP}
            </p>
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              {c.heroCta}
              <IconArrowRight size={15} stroke={2} />
            </Link>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.introH2}
            </h2>
            <p className="text-[16px] font-light leading-[1.85] mb-4" style={{ color: TEXT_BODY }}>
              {c.introP1}
            </p>
            <p className="text-[16px] font-light leading-[1.85]" style={{ color: TEXT_BODY }}>
              {c.introP2}
            </p>
          </div>
        </section>

        {/* Pilares */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.pillarsLabel}</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.pillarsH2}
            </h2>
            <div className="flex flex-col gap-4">
              {c.pillars.map((p) => (
                <div key={p.n} className="flex items-start gap-5 p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-[32px] font-light shrink-0 leading-none" style={{ color: "rgba(153,79,42,0.25)" }}>{p.n}</span>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{p.title}</h3>
                    <p className="text-[14px] font-light leading-relaxed mb-3" style={{ color: TEXT_BODY }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {p.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="inline-flex items-center gap-1 text-[13px] font-medium transition-opacity hover:opacity-75"
                          style={{ color: BRAND_BROWN }}
                        >
                          {l.label}
                          <IconArrowRight size={12} stroke={2} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ciclo */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>{c.cycleLabel}</span>
            </div>
            <h2 className="mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.cycleH2}
            </h2>
            <p className="text-[16px] font-light leading-[1.85] mb-10" style={{ color: TEXT_BODY }}>
              {c.cycleP}
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {c.cycleItems.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: BRAND_GREEN }}>{item.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#15110d" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              {c.ctaH2}
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.75)", fontWeight: 300, lineHeight: 1.75 }}>
              {c.ctaP}
            </p>
            <Link
              href="/diagnostico"
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              {c.ctaBtn}
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
