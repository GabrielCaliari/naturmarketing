import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP, WHATSAPP_LINK } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Motor de Reservas para Hotéis | Réserve — Site com Reserva Direta",
  description:
    "Implantamos o melhor motor de reservas para o seu hotel ou pousada: reserva direta no site, sem comissão de OTA, integrado ao seu PMS e otimizado para conversão.",
  keywords:
    "motor de reservas para hotel, motor de reservas para hotéis, motor de reservas online, site para hotel com motor de reservas, melhor motor de reservas, software de reservas diretas, sistema de reservas online para hotéis, motor de reserva",
  alternates: { canonical: `${siteUrl}/motor-de-reservas` },
  openGraph: {
    title: "Motor de Reservas para Hotéis | Réserve",
    description:
      "Reserva direta no site do seu hotel, sem comissão de OTA — motor de reservas integrado ao PMS e otimizado para converter visitantes em hóspedes.",
    type: "website",
    url: `${siteUrl}/motor-de-reservas`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Réserve — Motor de Reservas para Hotéis" }],
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

const benefits = [
  { title: "Reserva direta, zero comissão", desc: "O hóspede reserva no seu site e o valor cai integral no seu caixa — sem repassar 15% a 25% de comissão para Booking, Expedia ou Decolar." },
  { title: "Integração com o seu PMS", desc: "O motor sincroniza tarifas, disponibilidade e reservas com o seu sistema de gestão, eliminando overbooking e atualização manual." },
  { title: "Otimizado para conversão", desc: "Checkout rápido, em poucos passos, em português e com pagamento nacional (Pix, cartão, parcelamento) — feito para o viajante brasileiro fechar." },
  { title: "Tarifas e pacotes flexíveis", desc: "Crie diárias promocionais, pacotes, mínimo de noites e regras sazonais sem depender de terceiros." },
  { title: "Mobile-first", desc: "A maioria das reservas diretas vem do celular. O motor é responsivo e leve, com carregamento rápido (bom para SEO e para conversão)." },
  { title: "Dados que são seus", desc: "E-mail, telefone e histórico do hóspede ficam com o hotel — base para remarketing, fidelização e campanhas futuras, não com a OTA." },
];

const steps = [
  { n: "01", title: "Diagnóstico e escolha do motor", desc: "Avaliamos o porte do hotel, o PMS atual e o volume de reservas para indicar o motor de reservas ideal — não vendemos um único fornecedor, escolhemos o que converte mais para o seu caso." },
  { n: "02", title: "Implantação e integração", desc: "Configuramos o motor, integramos ao PMS/channel manager e instalamos os meios de pagamento e as regras tarifárias do hotel." },
  { n: "03", title: "Otimização de conversão", desc: "Ajustamos a jornada de reserva, gatilhos de escassez, provas sociais e a página de tarifas para maximizar a taxa de conversão." },
  { n: "04", title: "Rastreamento e crescimento", desc: "Conectamos Google Analytics, Google Ads e Meta para medir cada reserva direta gerada e escalar os canais de maior ROI." },
];

const faqs = [
  { q: "O que é um motor de reservas para hotel?", a: "É o sistema que permite que o hóspede consulte disponibilidade, escolha a diária e finalize a reserva diretamente no site do hotel, com pagamento online — sem passar por uma OTA como Booking ou Expedia. É o que transforma o site em um canal de vendas próprio." },
  { q: "Qual é o melhor motor de reservas?", a: "Não existe um único 'melhor' — depende do porte do hotel, do PMS que você usa e do volume de reservas. Para pousadas e hotéis independentes, o ideal é um motor leve, em português, com Pix e parcelamento. Fazemos o diagnóstico e indicamos a opção que mais converte para o seu caso." },
  { q: "O motor de reservas substitui as OTAs?", a: "Não substitui, equilibra. As OTAs trazem visibilidade; o motor de reservas garante que parte dessa demanda venha pelo canal direto, sem comissão. A estratégia é usar as OTAs como vitrine e converter o máximo de reservas no seu próprio site." },
  { q: "Preciso trocar o meu site para ter um motor de reservas?", a: "Nem sempre. Em muitos casos integramos o motor ao site existente. Quando o site atual prejudica a conversão (lento, sem mobile, sem confiança), recomendamos um site hoteleiro novo já com o motor integrado." },
  { q: "Quanto custa implantar um motor de reservas?", a: "Há motores com mensalidade fixa e outros que cobram um percentual por reserva (bem menor que a comissão de OTA). No diagnóstico mostramos o custo real e o quanto você economiza em comissões ao migrar reservas para o canal direto." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Motor de Reservas para Hotéis",
  description:
    "Implantação e otimização de motor de reservas para hotéis e pousadas: reserva direta no site, integração com PMS e foco em conversão e redução de comissões de OTA.",
  provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: COMPANY_NAP.name, url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Motor de Reservas / Sistema de Reserva Direta Hoteleira",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const WA = `${WHATSAPP_LINK}?text=${encodeURIComponent("Olá! Quero implantar um motor de reservas no site do meu hotel.")}`;

export default function MotorDeReservasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Motor de Reservas", url: "/motor-de-reservas" },
      ]} />
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#15110d", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${BRAND_GREEN} 0%, transparent 60%)` }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Motor de Reservas</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Reserva Direta
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Motor de reservas para hotéis:<br />
              <span style={{ color: BRAND_GREEN }}>reserva direta, sem comissão de OTA</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "580px", lineHeight: 1.75 }}>
              Transformamos o site do seu hotel ou pousada em um canal de vendas próprio — com um motor de reservas integrado ao PMS, otimizado para converter e pensado para o viajante brasileiro.
            </p>
            <a
              href={WA}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              Quero um motor de reservas
            </a>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              O motor de reservas é o que torna o seu site um canal de vendas
            </h2>
            <p className="text-[16px] font-light leading-[1.85] mb-4" style={{ color: TEXT_BODY }}>
              A maioria dos hotéis investe em tráfego e redes sociais, mas envia o hóspede para reservar no Booking — e paga de 15% a 25% de comissão em cada reserva. Sem um <strong>motor de reservas</strong> eficiente no próprio site, todo esforço de marketing acaba alimentando as OTAs.
            </p>
            <p className="text-[16px] font-light leading-[1.85]" style={{ color: TEXT_BODY }}>
              Na Réserve implantamos o motor de reservas certo para o seu hotel e o integramos a uma estratégia completa de <Link href="/reservas-diretas" style={{ color: BRAND_BROWN }}>reservas diretas</Link>, <Link href="/sites-para-hoteis" style={{ color: BRAND_BROWN }}>site hoteleiro</Link> e <Link href="/google-hotel-ads" style={{ color: BRAND_BROWN }}>Google Hotel Ads</Link> — para que cada visitante tenha o caminho mais curto possível até a reserva.
            </p>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>Por que importa</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              O que um bom motor de reservas entrega
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {benefits.map((b, i) => (
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
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>Como trabalhamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Da escolha do motor à reserva direta funcionando
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>Dúvidas Frequentes</span>
            </div>
            <h2 className="mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Perguntas sobre motor de reservas
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#15110d" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Pronto para vender direto, sem comissão?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico gratuito e descubra qual motor de reservas faz sentido para o seu hotel — e quanto você deixa de pagar em comissão ao migrar reservas para o canal direto.
            </p>
            <a
              href={WA}
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
