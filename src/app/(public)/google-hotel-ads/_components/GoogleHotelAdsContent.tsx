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
    waText: "Olá! Tenho interesse no serviço de Google Hotel Ads da Réserve.",
    crumbHome: "Início",
    crumb: "Google Hotel Ads",
    badge: "Serviço Especializado",
    h1a: "Google Hotel Ads",
    h1b: "que gera reservas diretas",
    heroP: "Apareça ao lado do Booking.com e Expedia nos resultados do Google, mas com o hóspede reservando diretamente no seu site, sem comissão.",
    heroCta: "Quero aparecer no Google Hotel Ads",
    whatLabel: "O que é",
    whatH2: "O canal de maior ROI para hotelaria",
    whatP1: "O Google Hotel Ads exibe as tarifas e disponibilidade do seu hotel diretamente nos resultados de busca e no Google Maps, ao lado das OTAs. Quando o viajante pesquisa hotel em seu destino, seu hotel aparece com seu preço direto, competindo de igual para igual com o Booking e o Expedia.",
    whatP2: "Hotéis que gerenciam bem o Google Hotel Ads conquistam reservas com custo de aquisição entre 5% e 8% do valor da reserva, contra 15% a 25% cobrados pelas OTAs. É o canal de maior retorno sobre investimento no marketing hoteleiro.",
    stats: [
      { v: "5–8%", l: "Custo médio por reserva" },
      { v: "3–7d", l: "Para primeiras reservas" },
      { v: "+40%", l: "Redução de dependência OTA" },
    ],
    stepsLabel: "Como trabalhamos",
    stepsH2: "5 passos para seu hotel aparecer no Google Hotel Ads",
    steps: [
      { n: "01", title: "Google Business Profile", desc: "Configuração e otimização completa do perfil, a base técnica de tudo." },
      { n: "02", title: "Motor de Reservas", desc: "Integramos seu sistema com o Google Hotel Center para sincronização de tarifas em tempo real." },
      { n: "03", title: "Campanha no Google Ads", desc: "Estratégia de lances por mercado, device e sazonalidade para máximo ROAS." },
      { n: "04", title: "Paridade Tarifária", desc: "Garantimos que seu site oferece preço igual ou melhor que o Booking, condição essencial para conversão." },
      { n: "05", title: "Otimização Contínua", desc: "Relatórios mensais com custo por reserva, ROAS e ajustes baseados em dados reais." },
    ],
    dicasLabel: "Boas práticas",
    dicasH2: "Dicas para Google Hotel Ads que realmente convertem",
    dicasP: "Aparecer no Google Hotel Ads é só o começo. Estas são as práticas que separam uma campanha que queima verba de uma que gera reservas diretas com lucro, as mesmas que aplicamos na gestão de Google Ads para hotéis e pousadas.",
    dicas: [
      { title: "Garanta paridade tarifária", desc: "Seu preço no site precisa ser igual ou menor que o das OTAs. Sem paridade, o Hotel Ads mostra você mais caro e o hóspede reserva no Booking." },
      { title: "Separe campanhas por dispositivo", desc: "Celular e desktop convertem de formas diferentes. Lances separados por device evitam desperdício e melhoram o custo por reserva." },
      { title: "Ajuste lances por antecedência de reserva", desc: "Quem busca para datas próximas converte mais. Subir o lance para janelas curtas captura demanda quente com melhor ROAS." },
      { title: "Acompanhe o custo por reserva, não o CPC", desc: "A métrica que importa é quanto custa cada reserva confirmada, não o clique isolado. É o que diz se o Hotel Ads está realmente lucrativo." },
    ],
    faqLabel: "Dúvidas Frequentes",
    faqH2: "Perguntas sobre Google Hotel Ads",
    faqs: [
      { q: "Qual a diferença entre Google Hotel Ads e Google Ads para hotel?", a: "São canais complementares. O Google Hotel Ads (antigo Hotel Center) exibe tarifa e disponibilidade no módulo de hotéis da busca e do Maps, ao lado das OTAs. O Google Ads para hotéis (a rede de pesquisa, antigo Google AdWords) captura buscas como 'hotel em [destino]' e leva o viajante ao seu site. A estratégia ideal usa os dois juntos." },
      { q: "Preciso de motor de reservas para usar Google Hotel Ads?", a: "Sim. O Google Hotel Ads exige integração com um sistema de reservas homologado que sincronize tarifas e disponibilidade em tempo real. Ajudamos na escolha e implementação do motor de reservas certo." },
      { q: "Quanto custa aparecer no Google Hotel Ads?", a: "O modelo é CPC (custo por clique) ou CPA (custo por aquisição). Hotéis bem gerenciados pagam entre 5% e 8% do valor da reserva, bem abaixo dos 15% a 25% das OTAs." },
      { q: "Quanto tempo leva para ver resultados?", a: "As primeiras reservas diretas podem aparecer em 3 a 7 dias após a ativação técnica correta. A otimização para o máximo ROI leva de 30 a 60 dias." },
      { q: "Preciso sair do Booking para usar Google Hotel Ads?", a: "Não. O Hotel Ads compete com as OTAs no mesmo resultado de busca. Seu hotel aparece ao lado delas com o seu preço direto. As OTAs continuam como vitrine; o Hotel Ads captura a reserva no canal direto." },
      { q: "Google Hotel Ads funciona para pousada e resort?", a: "Sim. Pousadas, resorts e hotéis boutique se beneficiam tanto quanto grandes redes, desde que tenham motor de reservas integrado e paridade tarifária. Para resorts, o Hotel Ads costuma ter ROI ainda maior pelo ticket médio mais alto." },
      { q: "Qual a diferença entre Hotel Ads e o Google AdWords tradicional?", a: "'Google AdWords' é o nome antigo do Google Ads. Para hotéis, o Hotel Ads mostra preço e datas direto no resultado; o Google Ads de pesquisa mostra um anúncio de texto. Usamos os dois de forma integrada para cobrir toda a jornada de busca do hóspede." },
    ],
    ctaH2: "Pronto para gerar reservas diretas pelo Google?",
    ctaP: "Solicite um diagnóstico gratuito e descubra quanto seu hotel perde por não estar no Google Hotel Ads.",
    ctaBtn: "Diagnóstico Gratuito",
  },
  en: {
    waText: "Hi! I'm interested in Réserve's Google Hotel Ads service.",
    crumbHome: "Home",
    crumb: "Google Hotel Ads",
    badge: "Specialized Service",
    h1a: "Google Hotel Ads",
    h1b: "that generates direct bookings",
    heroP: "Appear next to Booking.com and Expedia in Google results, but with the guest booking directly on your website, commission-free.",
    heroCta: "I want to appear on Google Hotel Ads",
    whatLabel: "What it is",
    whatH2: "The highest-ROI channel for hospitality",
    whatP1: "Google Hotel Ads shows your hotel's rates and availability directly in search results and on Google Maps, alongside the OTAs. When a traveler searches for a hotel in your destination, your hotel appears with your direct price, competing head to head with Booking and Expedia.",
    whatP2: "Hotels that manage Google Hotel Ads well win bookings at an acquisition cost between 5% and 8% of the booking value, versus the 15% to 25% charged by OTAs. It's the highest return-on-investment channel in hotel marketing.",
    stats: [
      { v: "5–8%", l: "Average cost per booking" },
      { v: "3–7d", l: "To first bookings" },
      { v: "+40%", l: "Reduction in OTA dependency" },
    ],
    stepsLabel: "How we work",
    stepsH2: "5 steps to get your hotel on Google Hotel Ads",
    steps: [
      { n: "01", title: "Google Business Profile", desc: "Complete profile setup and optimization, the technical foundation of everything." },
      { n: "02", title: "Booking Engine", desc: "We integrate your system with Google Hotel Center for real-time rate synchronization." },
      { n: "03", title: "Google Ads Campaign", desc: "A bidding strategy by market, device and seasonality for maximum ROAS." },
      { n: "04", title: "Rate Parity", desc: "We ensure your site offers a price equal to or better than Booking, an essential condition for conversion." },
      { n: "05", title: "Continuous Optimization", desc: "Monthly reports with cost per booking, ROAS and adjustments based on real data." },
    ],
    dicasLabel: "Best practices",
    dicasH2: "Google Hotel Ads tips that actually convert",
    dicasP: "Appearing on Google Hotel Ads is just the start. These are the practices that separate a campaign that burns budget from one that generates profitable direct bookings, the same ones we apply managing Google Ads for hotels and inns.",
    dicas: [
      { title: "Ensure rate parity", desc: "Your price on the site needs to be equal to or lower than the OTAs'. Without parity, Hotel Ads shows you as more expensive and the guest books on Booking." },
      { title: "Split campaigns by device", desc: "Mobile and desktop convert differently. Separate bids by device avoid waste and improve cost per booking." },
      { title: "Adjust bids by booking lead time", desc: "Those searching for near-term dates convert more. Raising bids for short windows captures hot demand with better ROAS." },
      { title: "Track cost per booking, not CPC", desc: "The metric that matters is how much each confirmed booking costs, not the isolated click. It's what tells you whether Hotel Ads is truly profitable." },
    ],
    faqLabel: "Frequently Asked Questions",
    faqH2: "Questions about Google Hotel Ads",
    faqs: [
      { q: "What's the difference between Google Hotel Ads and Google Ads for hotels?", a: "They're complementary channels. Google Hotel Ads (formerly Hotel Center) shows rate and availability in the hotels module of search and Maps, alongside OTAs. Google Ads for hotels (the search network, formerly Google AdWords) captures searches like 'hotel in [destination]' and takes the traveler to your site. The ideal strategy uses both together." },
      { q: "Do I need a booking engine to use Google Hotel Ads?", a: "Yes. Google Hotel Ads requires integration with an approved booking system that syncs rates and availability in real time. We help choose and implement the right booking engine." },
      { q: "How much does it cost to appear on Google Hotel Ads?", a: "The model is CPC (cost per click) or CPA (cost per acquisition). Well-managed hotels pay between 5% and 8% of the booking value, well below the 15% to 25% of OTAs." },
      { q: "How long does it take to see results?", a: "The first direct bookings can appear within 3 to 7 days after correct technical activation. Optimization for maximum ROI takes 30 to 60 days." },
      { q: "Do I need to leave Booking to use Google Hotel Ads?", a: "No. Hotel Ads competes with OTAs in the same search result. Your hotel appears next to them with your direct price. OTAs remain a storefront; Hotel Ads captures the booking on the direct channel." },
      { q: "Does Google Hotel Ads work for inns and resorts?", a: "Yes. Inns, resorts and boutique hotels benefit just as much as large chains, as long as they have an integrated booking engine and rate parity. For resorts, Hotel Ads tends to have even higher ROI due to the higher average ticket." },
      { q: "What's the difference between Hotel Ads and traditional Google AdWords?", a: "'Google AdWords' is the old name for Google Ads. For hotels, Hotel Ads shows price and dates right in the result; search Google Ads shows a text ad. We use both in an integrated way to cover the guest's entire search journey." },
    ],
    ctaH2: "Ready to generate direct bookings through Google?",
    ctaP: "Request a free assessment and find out how much your hotel loses by not being on Google Hotel Ads.",
    ctaBtn: "Free Assessment",
  },
};

export default function GoogleHotelAdsContent() {
  const { locale } = useLocale();
  const c = content[locale === "en" ? "en" : "pt"];

  return (
    <>
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#2a1f14", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #994f2a 0%, transparent 60%)" }} />
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
              preselect={SERVICE_PRESELECT["/google-hotel-ads"]}
              trackId="cta_google_hotel_ads_hero"
              source="/google-hotel-ads"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
              style={{ background: BRAND_BROWN }}
            >
              {c.heroCta}
            </DiagnosticoCTA>
          </div>
        </section>

        {/* O que é */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.whatLabel}</span>
              </div>
              <h2 className="mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD, lineHeight: 1.2 }}>
                {c.whatH2}
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal as="p" style={{ color: TEXT_BODY, fontWeight: 300, lineHeight: 1.85 }}>
                {c.whatP1}
              </Reveal>
              <Reveal as="p" delay={120} style={{ color: TEXT_BODY, fontWeight: 300, lineHeight: 1.85 }}>
                {c.whatP2}
              </Reveal>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {c.stats.map((s, i) => (
                <Reveal key={i} delay={i * 60} className="text-center py-6 px-4 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <div className="text-[2.5rem] font-light leading-none mb-2" style={{ color: BRAND_BROWN }}>{s.v}</div>
                  <div className="text-[11px] font-medium tracking-wide uppercase" style={{ color: TEXT_BODY }}>{s.l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>{c.stepsLabel}</span>
              </div>
              <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
                {c.stepsH2}
              </h2>
            </Reveal>
            <div className="flex flex-col gap-4">
              {c.steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 60} className="flex items-start gap-5 p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-[32px] font-light shrink-0 leading-none" style={{ color: "rgba(153,79,42,0.25)" }}>{s.n}</span>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: TEXT_HEAD }}>{s.title}</h3>
                    <p className="text-[14px] font-light" style={{ color: TEXT_BODY }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Dicas */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.dicasLabel}</span>
              </div>
              <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
                {c.dicasH2}
              </h2>
              <p className="text-[15px] font-light leading-[1.85] mb-10 max-w-2xl" style={{ color: TEXT_BODY }}>
                {c.dicasP}
              </p>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-5">
              {c.dicas.map((d, i) => (
                <Reveal key={i} delay={i * 60} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{d.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{d.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.faqLabel}</span>
              </div>
              <h2 className="mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: TEXT_HEAD }}>
                {c.faqH2}
              </h2>
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#2a1f14" }}>
          <Reveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              {c.ctaH2}
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              {c.ctaP}
            </p>
            <DiagnosticoCTA
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
              trackId="cta_google_hotel_ads"
              source="/google-hotel-ads"
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
