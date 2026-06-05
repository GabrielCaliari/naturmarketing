import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Google Hotel Ads para Hotéis | Réserve — Gestão Especializada",
  description: "Agência especializada em Google Hotel Ads para hotéis, resorts e pousadas. Integramos seu motor de reservas, gerenciamos lances e maximizamos reservas diretas com custo 3x menor que OTAs.",
  keywords: "Google Hotel Ads, Google Hotel Ads para hotéis, Google Hotel Ads agência, como aparecer no Google Hotel Ads, gestão Google Hotel Ads hotel, reservas diretas Google, Google Hotel Center, motor de reservas Google",
  alternates: { canonical: `${siteUrl}/google-hotel-ads` },
  openGraph: {
    title: "Google Hotel Ads para Hotéis | Réserve",
    description: "Apareça ao lado do Booking e Expedia no Google — mas com reserva direta. Gerenciamos Google Hotel Ads para hotéis, resorts e pousadas em todo o Brasil.",
    type: "website",
    url: `${siteUrl}/google-hotel-ads`,
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

const steps = [
  { n: "01", title: "Google Business Profile", desc: "Configuração e otimização completa do perfil — a base técnica de tudo." },
  { n: "02", title: "Motor de Reservas", desc: "Integramos seu sistema com o Google Hotel Center para sincronização de tarifas em tempo real." },
  { n: "03", title: "Campanha no Google Ads", desc: "Estratégia de lances por mercado, device e sazonalidade para máximo ROAS." },
  { n: "04", title: "Paridade Tarifária", desc: "Garantimos que seu site oferece preço igual ou melhor que o Booking — condição essencial para conversão." },
  { n: "05", title: "Otimização Contínua", desc: "Relatórios mensais com custo por reserva, ROAS e ajustes baseados em dados reais." },
];

const faqs = [
  { q: "Preciso de motor de reservas para usar Google Hotel Ads?", a: "Sim. O Google Hotel Ads exige integração com um sistema de reservas homologado que sincronize tarifas e disponibilidade em tempo real. Ajudamos na escolha e implementação." },
  { q: "Quanto custa aparecer no Google Hotel Ads?", a: "O modelo é CPC (custo por clique) ou CPA (custo por aquisição). Hotéis bem gerenciados pagam entre 5% e 8% do valor da reserva — bem abaixo dos 15% a 25% das OTAs." },
  { q: "Quanto tempo leva para ver resultados?", a: "As primeiras reservas diretas podem aparecer em 3 a 7 dias após a ativação técnica correta. Otimização para máximo ROI leva 30 a 60 dias." },
  { q: "Preciso sair do Booking para usar Google Hotel Ads?", a: "Não. O Hotel Ads compete com as OTAs no mesmo resultado de busca — seu hotel aparece ao lado delas com seu preço direto." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gestão de Google Hotel Ads para Hotéis",
  description: "Serviço especializado de configuração, integração e gestão de Google Hotel Ads para hotéis, resorts e pousadas no Brasil.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Google Hotel Ads Management",
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

export default function GoogleHotelAdsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Google Hotel Ads", url: "/google-hotel-ads" },
      ]} />
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#2a1f14", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #994f2a 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Google Hotel Ads</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Serviço Especializado
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Google Hotel Ads<br />
              <span style={{ color: BRAND_GREEN }}>que gera reservas diretas</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Apareça ao lado do Booking.com e Expedia nos resultados do Google — mas com o hóspede reservando diretamente no seu site, sem comissão.
            </p>
            <a
              href="https://wa.me/553597742984?text=Olá! Tenho interesse no serviço de Google Hotel Ads da Réserve."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              Quero aparecer no Google Hotel Ads
            </a>
          </div>
        </section>

        {/* O que é */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>O que é</span>
            </div>
            <h2 className="mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD, lineHeight: 1.2 }}>
              O canal de maior ROI para hotelaria
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <p style={{ color: TEXT_BODY, fontWeight: 300, lineHeight: 1.85 }}>
                O Google Hotel Ads exibe as tarifas e disponibilidade do seu hotel diretamente nos resultados de busca e no Google Maps — ao lado das OTAs. Quando o viajante pesquisa hotel em seu destino, seu hotel aparece com seu preço direto, competindo de igual para igual com o Booking e o Expedia.
              </p>
              <p style={{ color: TEXT_BODY, fontWeight: 300, lineHeight: 1.85 }}>
                Hotéis que gerenciam bem o Google Hotel Ads conquistam reservas com custo de aquisição entre 5% e 8% do valor da reserva — versus 15% a 25% cobrados pelas OTAs. É o canal de maior retorno sobre investimento no marketing hoteleiro.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { v: "5–8%", l: "Custo médio por reserva" },
                { v: "3–7d", l: "Para primeiras reservas" },
                { v: "+40%", l: "Redução de dependência OTA" },
              ].map((s, i) => (
                <div key={i} className="text-center py-6 px-4 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <div className="text-[2.5rem] font-light leading-none mb-2" style={{ color: BRAND_BROWN }}>{s.v}</div>
                  <div className="text-[11px] font-medium tracking-wide uppercase" style={{ color: TEXT_BODY }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>Como trabalhamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              5 passos para seu hotel aparecer no Google Hotel Ads
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
              Perguntas sobre Google Hotel Ads
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#2a1f14" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Pronto para gerar reservas diretas pelo Google?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico gratuito e descubra quanto seu hotel perde por não estar no Google Hotel Ads.
            </p>
            <a
              href="https://wa.me/553597742984?text=Olá! Tenho interesse no serviço de Google Hotel Ads da Réserve."
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
