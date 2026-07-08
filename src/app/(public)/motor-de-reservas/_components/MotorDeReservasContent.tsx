"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WHATSAPP_LINK } from "@/constants/company";
import { useLocale } from "@/context/LocaleContext";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#6e5e52";

const content = {
  pt: {
    waText: "Olá! Quero implantar um motor de reservas no site do meu hotel.",
    crumbHome: "Início",
    crumb: "Motor de Reservas",
    badge: "Reserva Direta",
    h1a: "Motor de reservas para hotéis:",
    h1b: "reserva direta, sem comissão de OTA",
    heroP: "Transformamos o site do seu hotel ou pousada em um canal de vendas próprio, com um motor de reservas integrado ao PMS, otimizado para converter e pensado para o viajante brasileiro.",
    heroCta: "Quero um motor de reservas",
    introH2: "O motor de reservas é o que torna o seu site um canal de vendas",
    introP1a: "A maioria dos hotéis investe em tráfego e redes sociais, mas envia o hóspede para reservar no Booking, e paga de 15% a 25% de comissão em cada reserva. Sem um ",
    introP1strong: "motor de reservas",
    introP1b: " eficiente no próprio site, todo esforço de marketing acaba alimentando as OTAs.",
    introP2a: "Na Réserve implantamos o motor de reservas certo para o seu hotel e o integramos a uma estratégia completa de ",
    introLink1: "reservas diretas",
    introP2b: ", ",
    introLink2: "site hoteleiro",
    introP2c: " e ",
    introLink3: "Google Hotel Ads",
    introP2d: ", para que cada visitante tenha o caminho mais curto possível até a reserva.",
    benLabel: "Por que importa",
    benH2: "O que um bom motor de reservas entrega",
    benefits: [
      { title: "Reserva direta, zero comissão", desc: "O hóspede reserva no seu site e o valor cai integral no seu caixa, sem repassar 15% a 25% de comissão para Booking, Expedia ou Decolar." },
      { title: "Integração com o seu PMS", desc: "O motor sincroniza tarifas, disponibilidade e reservas com o seu sistema de gestão, eliminando overbooking e atualização manual." },
      { title: "Otimizado para conversão", desc: "Checkout rápido, em poucos passos, em português e com pagamento nacional (Pix, cartão, parcelamento), feito para o viajante brasileiro fechar." },
      { title: "Tarifas e pacotes flexíveis", desc: "Crie diárias promocionais, pacotes, mínimo de noites e regras sazonais sem depender de terceiros." },
      { title: "Mobile-first", desc: "A maioria das reservas diretas vem do celular. O motor é responsivo e leve, com carregamento rápido (bom para SEO e para conversão)." },
      { title: "Dados que são seus", desc: "E-mail, telefone e histórico do hóspede ficam com o hotel, base para remarketing, fidelização e campanhas futuras, não com a OTA." },
    ],
    stepsLabel: "Como trabalhamos",
    stepsH2: "Da escolha do motor à reserva direta funcionando",
    steps: [
      { n: "01", title: "Diagnóstico e escolha do motor", desc: "Avaliamos o porte do hotel, o PMS atual e o volume de reservas para indicar o motor de reservas ideal. Não vendemos um único fornecedor, escolhemos o que converte mais para o seu caso." },
      { n: "02", title: "Implantação e integração", desc: "Configuramos o motor, integramos ao PMS/channel manager e instalamos os meios de pagamento e as regras tarifárias do hotel." },
      { n: "03", title: "Otimização de conversão", desc: "Ajustamos a jornada de reserva, gatilhos de escassez, provas sociais e a página de tarifas para maximizar a taxa de conversão." },
      { n: "04", title: "Rastreamento e crescimento", desc: "Conectamos Google Analytics, Google Ads e Meta para medir cada reserva direta gerada e escalar os canais de maior ROI." },
    ],
    faqLabel: "Dúvidas Frequentes",
    faqH2: "Perguntas sobre motor de reservas",
    faqs: [
      { q: "O que é um motor de reservas para hotel?", a: "É o sistema que permite que o hóspede consulte disponibilidade, escolha a diária e finalize a reserva diretamente no site do hotel, com pagamento online, sem passar por uma OTA como Booking ou Expedia. É o que transforma o site em um canal de vendas próprio." },
      { q: "Qual é o melhor motor de reservas?", a: "Não existe um único 'melhor'. Depende do porte do hotel, do PMS que você usa e do volume de reservas. Para pousadas e hotéis independentes, o ideal é um motor leve, em português, com Pix e parcelamento. Fazemos o diagnóstico e indicamos a opção que mais converte para o seu caso." },
      { q: "O motor de reservas substitui as OTAs?", a: "Não substitui, equilibra. As OTAs trazem visibilidade; o motor de reservas garante que parte dessa demanda venha pelo canal direto, sem comissão. A estratégia é usar as OTAs como vitrine e converter o máximo de reservas no seu próprio site." },
      { q: "Preciso trocar o meu site para ter um motor de reservas?", a: "Nem sempre. Em muitos casos integramos o motor ao site existente. Quando o site atual prejudica a conversão (lento, sem mobile, sem confiança), recomendamos um site hoteleiro novo já com o motor integrado." },
      { q: "Quanto custa implantar um motor de reservas?", a: "Há motores com mensalidade fixa e outros que cobram um percentual por reserva (bem menor que a comissão de OTA). No diagnóstico mostramos o custo real e o quanto você economiza em comissões ao migrar reservas para o canal direto." },
      { q: "Como funciona um motor de reservas na prática?", a: "O hóspede entra no site do hotel, escolhe as datas e vê a disponibilidade e as tarifas em tempo real (sincronizadas com o seu PMS). Ele seleciona o quarto, preenche os dados e paga online (Pix, cartão ou parcelamento). A reserva cai automaticamente no sistema de gestão do hotel, sem intervenção manual e sem risco de overbooking." },
      { q: "Existe motor de reservas para pousadas pequenas?", a: "Sim. Há motores leves e acessíveis pensados para pousadas e hotéis independentes, com mensalidade baixa e sem complexidade. Para empreendimentos pequenos, o motor de reservas é justamente o que reduz o peso da comissão de OTA na margem." },
      { q: "Motor de reservas serve para resort?", a: "Serve e é altamente recomendado. Resorts têm ticket médio mais alto e pacotes complexos (diárias, all-inclusive, experiências), e um bom motor de reservas suporta tarifas, pacotes e upsell, aumentando a receita por reserva direta." },
    ],
    ctaH2: "Pronto para vender direto, sem comissão?",
    ctaP: "Solicite um diagnóstico gratuito e descubra qual motor de reservas faz sentido para o seu hotel, e quanto você deixa de pagar em comissão ao migrar reservas para o canal direto.",
    ctaBtn: "Diagnóstico Gratuito",
  },
  en: {
    waText: "Hi! I want to set up a booking engine on my hotel's website.",
    crumbHome: "Home",
    crumb: "Booking Engine",
    badge: "Direct Booking",
    h1a: "Booking engine for hotels:",
    h1b: "direct bookings, no OTA commission",
    heroP: "We turn your hotel or inn's website into a sales channel of its own, with a booking engine integrated to your PMS, optimized to convert and built for the Brazilian traveler.",
    heroCta: "I want a booking engine",
    introH2: "The booking engine is what turns your website into a sales channel",
    introP1a: "Most hotels invest in traffic and social media, but send the guest to book on Booking, and pay 15% to 25% commission on every reservation. Without an efficient ",
    introP1strong: "booking engine",
    introP1b: " on their own site, all the marketing effort ends up feeding the OTAs.",
    introP2a: "At Réserve we deploy the right booking engine for your hotel and integrate it into a complete strategy of ",
    introLink1: "direct bookings",
    introP2b: ", ",
    introLink2: "a hotel website",
    introP2c: " and ",
    introLink3: "Google Hotel Ads",
    introP2d: ", so every visitor has the shortest possible path to a reservation.",
    benLabel: "Why it matters",
    benH2: "What a good booking engine delivers",
    benefits: [
      { title: "Direct booking, zero commission", desc: "The guest books on your site and the full amount lands in your account, without handing over 15% to 25% commission to Booking, Expedia or Decolar." },
      { title: "Integration with your PMS", desc: "The engine syncs rates, availability and reservations with your management system, eliminating overbooking and manual updates." },
      { title: "Optimized for conversion", desc: "A fast, few-step checkout, with local payment (Pix, card, installments), built for the traveler to complete the booking." },
      { title: "Flexible rates and packages", desc: "Create promotional rates, packages, minimum nights and seasonal rules without depending on third parties." },
      { title: "Mobile-first", desc: "Most direct bookings come from mobile. The engine is responsive and lightweight, with fast loading (good for SEO and conversion)." },
      { title: "Data that's yours", desc: "The guest's email, phone and history stay with the hotel, a base for remarketing, loyalty and future campaigns, not with the OTA." },
    ],
    stepsLabel: "How we work",
    stepsH2: "From choosing the engine to direct bookings up and running",
    steps: [
      { n: "01", title: "Assessment and engine selection", desc: "We assess the hotel's size, current PMS and booking volume to recommend the ideal booking engine. We don't sell a single vendor, we choose what converts most for your case." },
      { n: "02", title: "Deployment and integration", desc: "We configure the engine, integrate it with the PMS/channel manager and set up payment methods and the hotel's rate rules." },
      { n: "03", title: "Conversion optimization", desc: "We refine the booking journey, scarcity triggers, social proof and the rates page to maximize the conversion rate." },
      { n: "04", title: "Tracking and growth", desc: "We connect Google Analytics, Google Ads and Meta to measure every direct booking generated and scale the highest-ROI channels." },
    ],
    faqLabel: "Frequently Asked Questions",
    faqH2: "Questions about booking engines",
    faqs: [
      { q: "What is a hotel booking engine?", a: "It's the system that lets the guest check availability, choose a rate and complete the reservation directly on the hotel's website, with online payment, without going through an OTA like Booking or Expedia. It's what turns the website into a sales channel of its own." },
      { q: "Which is the best booking engine?", a: "There's no single 'best'. It depends on the hotel's size, the PMS you use and your booking volume. For inns and independent hotels, the ideal is a lightweight engine with local payment and installments. We run the assessment and recommend the option that converts most for your case." },
      { q: "Does the booking engine replace OTAs?", a: "It doesn't replace them, it balances them. OTAs bring visibility; the booking engine ensures part of that demand comes through the direct channel, commission-free. The strategy is to use OTAs as a storefront and convert as many bookings as possible on your own site." },
      { q: "Do I need to replace my website to have a booking engine?", a: "Not always. In many cases we integrate the engine into the existing site. When the current site hurts conversion (slow, not mobile-friendly, lacking trust), we recommend a new hotel website with the engine already integrated." },
      { q: "How much does it cost to set up a booking engine?", a: "There are engines with a fixed monthly fee and others that charge a percentage per booking (much lower than OTA commission). In the assessment we show the real cost and how much you save in commissions by moving bookings to the direct channel." },
      { q: "How does a booking engine work in practice?", a: "The guest enters the hotel's website, picks the dates and sees availability and rates in real time (synced with your PMS). They select the room, fill in their details and pay online (Pix, card or installments). The reservation drops automatically into the hotel's management system, with no manual work and no overbooking risk." },
      { q: "Is there a booking engine for small inns?", a: "Yes. There are lightweight, affordable engines built for inns and independent hotels, with a low monthly fee and no complexity. For small properties, the booking engine is exactly what reduces the weight of OTA commission on the margin." },
      { q: "Is a booking engine useful for a resort?", a: "It is, and highly recommended. Resorts have a higher average ticket and complex packages (room rates, all-inclusive, experiences), and a good booking engine supports rates, packages and upsell, increasing revenue per direct booking." },
    ],
    ctaH2: "Ready to sell direct, with no commission?",
    ctaP: "Request a free assessment and find out which booking engine makes sense for your hotel, and how much commission you stop paying by moving bookings to the direct channel.",
    ctaBtn: "Free Assessment",
  },
};

export default function MotorDeReservasContent() {
  const { locale } = useLocale();
  const c = content[locale === "en" ? "en" : "pt"];
  const waHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(c.waText)}`;

  return (
    <>
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#15110d", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${BRAND_GREEN} 0%, transparent 60%)` }} />
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
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "580px", lineHeight: 1.75 }}>
              {c.heroP}
            </p>
            <a
              href={waHref}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              {c.heroCta}
            </a>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.introH2}
            </h2>
            <p className="text-[16px] font-light leading-[1.85] mb-4" style={{ color: TEXT_BODY }}>
              {c.introP1a}<strong>{c.introP1strong}</strong>{c.introP1b}
            </p>
            <p className="text-[16px] font-light leading-[1.85]" style={{ color: TEXT_BODY }}>
              {c.introP2a}<Link href="/reservas-diretas" style={{ color: BRAND_BROWN }}>{c.introLink1}</Link>{c.introP2b}<Link href="/sites-para-hoteis" style={{ color: BRAND_BROWN }}>{c.introLink2}</Link>{c.introP2c}<Link href="/google-hotel-ads" style={{ color: BRAND_BROWN }}>{c.introLink3}</Link>{c.introP2d}
            </p>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.benLabel}</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.benH2}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {c.benefits.map((b, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{b.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como implantamos */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>{c.stepsLabel}</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.stepsH2}
            </h2>
            <div className="flex flex-col gap-4">
              {c.steps.map((s) => (
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.faqLabel}</span>
            </div>
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#15110d" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              {c.ctaH2}
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              {c.ctaP}
            </p>
            <a
              href={waHref}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              {c.ctaBtn}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
