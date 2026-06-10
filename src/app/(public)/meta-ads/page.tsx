import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Meta Ads para Hotéis | Réserve — Facebook e Instagram Ads Hoteleiro",
  description: "Gestão especializada de Meta Ads para hotéis, resorts e pousadas. Anúncios no Facebook e Instagram que alcançam o público ideal e convertem em reservas diretas.",
  keywords: "Meta Ads hotel, Facebook Ads hotel, Instagram Ads hotel, anúncios Facebook pousada, tráfego pago hotelaria, campanhas Instagram hotel, Meta Ads hoteleiro, retargeting hotel",
  alternates: { canonical: `${siteUrl}/meta-ads` },
  openGraph: {
    title: "Meta Ads para Hotéis | Réserve",
    description: "Anúncios no Facebook e Instagram que alcançam o público ideal e convertem em reservas diretas para o seu hotel.",
    type: "website",
    url: `${siteUrl}/meta-ads`,
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

const formats = [
  { title: "Campanhas de Conversão", desc: "Anúncios otimizados para reserva direta — levam o viajante diretamente ao motor de reservas do hotel." },
  { title: "Retargeting Inteligente", desc: "Recuperamos visitantes que acessaram o site ou o perfil do hotel sem reservar, com criativos personalizados para cada etapa do funil." },
  { title: "Lookalike de Hóspedes", desc: "Criamos públicos semelhantes aos seus melhores hóspedes — alcançando pessoas com alto potencial de conversão que ainda não conhecem o hotel." },
  { title: "Campanhas Sazonais", desc: "Estratégia de alta temporada, feriados e datas especiais com antecedência — capturando demanda antes da concorrência." },
  { title: "Tráfego para OTAs e Site", desc: "Campanhas de awareness para construção de marca e tráfego qualificado, complementando as ações de conversão direta." },
  { title: "Criativos para Redes Sociais", desc: "Produção de peças visuais e vídeos adaptados para cada formato do Meta — Feed, Stories, Reels e Carrossel." },
];

const steps = [
  { n: "01", title: "Pixel e Configuração", desc: "Instalação e configuração do Meta Pixel, Conversions API e eventos de conversão para rastreamento preciso." },
  { n: "02", title: "Mapeamento de Públicos", desc: "Definimos públicos por interesse, comportamento, localização e lookalike baseado em hóspedes reais." },
  { n: "03", title: "Criação das Campanhas", desc: "Estrutura de campanha por objetivo — awareness, consideração e conversão — com testes A/B de criativos." },
  { n: "04", title: "Otimização Contínua", desc: "Monitoramento diário de métricas, ajuste de lances e substituição de criativos para manter o ROAS crescente." },
];

const faqs = [
  { q: "Meta Ads vale a pena para hotéis pequenos?", a: "Sim. Meta Ads é especialmente eficaz para pousadas e boutique hotels porque permite segmentação ultra-precisa por localização, interesse em viagens e perfil de renda. Com orçamentos a partir de R$1.500/mês em mídia, é possível gerar reservas mensuráveis." },
  { q: "Como medir o resultado das campanhas de Meta Ads?", a: "Acompanhamos custo por reserva gerada, ROAS (retorno sobre gasto em anúncios), taxa de conversão do landing page e impacto no volume de reservas diretas. O Meta Pixel e a Conversions API garantem rastreamento preciso de cada reserva originada em campanha." },
  { q: "É possível usar Meta Ads junto com Google Ads?", a: "Sim — e a combinação é poderosa. O Google Ads captura quem já está buscando ativamente. O Meta Ads gera desejo e reconhecimento de marca, além de recuperar visitantes que ainda não reservaram. As duas estratégias são complementares." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Meta Ads para Hotéis",
  description: "Gestão de campanhas no Facebook e Instagram para hotéis, resorts e pousadas no Brasil.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Meta Ads Hoteleiro",
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

export default function MetaAdsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Meta Ads", url: "/meta-ads" },
      ]} />
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#0f1525", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #1877f2 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Meta Ads</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Serviço Especializado
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Meta Ads para Hotéis:<br />
              <span style={{ color: BRAND_GREEN }}>reservas diretas via Facebook e Instagram</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Campanhas no Facebook e Instagram que alcançam viajantes no perfil exato do seu hóspede ideal — e convertem em reservas diretas com custo previsível.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Tenho interesse no serviço de Meta Ads para o meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              Quero Meta Ads para meu hotel
            </a>
          </div>
        </section>

        {/* Formatos */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>Como atuamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Campanhas para cada etapa da jornada do hóspede
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {formats.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{f.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>Como trabalhamos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Da configuração técnica à otimização contínua
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
              Perguntas sobre Meta Ads para Hotéis
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#0f1525" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Pronto para reservas diretas via Meta Ads?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico gratuito e descubra quanto seu hotel pode ganhar com campanhas bem estruturadas no Facebook e Instagram.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Tenho interesse no serviço de Meta Ads para o meu hotel."
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
