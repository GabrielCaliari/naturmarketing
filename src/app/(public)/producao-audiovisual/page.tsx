import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Produção Audiovisual para Hotéis | Réserve — Fotografia e Vídeo Hoteleiro",
  description: "Produção audiovisual de alto padrão para hotéis, resorts e pousadas. Fotografia profissional e vídeos que capturam a essência do seu hotel e convertem visitantes em hóspedes.",
  keywords: "fotografia para hotéis, vídeo para hotéis, produção audiovisual hotelaria, foto hotel profissional, vídeo institucional hotel, fotografia pousada, tour virtual hotel",
  alternates: { canonical: `${siteUrl}/producao-audiovisual` },
  openGraph: {
    title: "Produção Audiovisual para Hotéis | Réserve",
    description: "Fotografia e vídeo de alto padrão que capturam a alma do seu hotel e convertem visitantes em hóspedes.",
    type: "website",
    url: `${siteUrl}/producao-audiovisual`,
  },
};

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#6e5e52";

const deliverables = [
  { title: "Fotografia de Ambientes", desc: "Imagens profissionais de quartos, áreas comuns, restaurante e espaços exclusivos — com iluminação natural e composição que valoriza cada detalhe." },
  { title: "Vídeo Institucional", desc: "Filme de 1 a 3 minutos que captura a atmosfera e identidade do hotel, ideal para site, redes sociais e campanhas de branding." },
  { title: "Vídeo para Redes Sociais", desc: "Conteúdo vertical e horizontal adaptado para Instagram, Facebook e TikTok — otimizado para retenção e conversão em cada plataforma." },
  { title: "Fotografia Gastronômica", desc: "Imagens de pratos, bebidas e experiências gastronômicas que despertam desejo e valorizam o restaurante do hotel." },
  { title: "Conteúdo de Experiências", desc: "Registro de atividades, amenities e experiências únicas que diferenciam seu hotel — da piscina ao spa, das trilhas ao pôr do sol." },
  { title: "Tour Virtual 360°", desc: "Exploração imersiva de quartos e espaços do hotel — aumenta o tempo no site e a taxa de conversão em reservas." },
];

const steps = [
  { n: "01", title: "Briefing e Planejamento", desc: "Entendemos a identidade do hotel, o público-alvo e os diferenciais a destacar em cada material." },
  { n: "02", title: "Produção no Hotel", desc: "Equipe especializada em hotelaria — sabemos os melhores horários, ângulos e condições de luz para cada tipo de espaço." },
  { n: "03", title: "Edição e Tratamento", desc: "Pós-produção com padrão editorial: retoque, correção de cor e edição de vídeo alinhados à identidade visual do hotel." },
  { n: "04", title: "Entrega e Aplicação", desc: "Arquivos otimizados para cada canal — site, OTAs, redes sociais e materiais impressos — com guia de uso." },
];

const faqs = [
  { q: "Por que investir em fotografia profissional para o hotel?", a: "Hotéis com fotos profissionais recebem até 60% mais cliques nas OTAs e têm taxas de conversão significativamente maiores no site próprio. A imagem é o primeiro critério de decisão do hóspede — fotos amadoras custeiam reservas todos os dias." },
  { q: "Vocês produzem para qualquer tipo de hospedagem?", a: "Sim. Trabalhamos com hotéis, resorts, pousadas boutique, airbnbs de alto padrão e spas. O briefing é sempre personalizado para capturar a essência única de cada empreendimento." },
  { q: "Quanto tempo leva uma produção completa?", a: "Em média, uma produção completa de fotografia e vídeo é realizada em 1 a 2 dias na propriedade. A entrega dos materiais finais editados ocorre em 7 a 14 dias úteis após a produção." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Produção Audiovisual para Hotéis",
  description: "Fotografia profissional e produção de vídeo especializada para hotéis, resorts e pousadas no Brasil.",
  provider: { "@type": "Organization", name: "Réserve", url: siteUrl },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Produção Audiovisual Hoteleira",
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

export default function ProducaoAudiovisualPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Produção Audiovisual", url: "/producao-audiovisual" },
      ]} />
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#0f1a0f", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #84936f 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Produção Audiovisual</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              Serviço Especializado
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Fotografia e Vídeo<br />
              <span style={{ color: BRAND_GREEN }}>que vendem experiências</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "560px", lineHeight: 1.75 }}>
              Produção audiovisual de alto padrão especializada em hotelaria — capturamos a alma e a atmosfera única do seu hotel para transformar visitantes em hóspedes.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Tenho interesse na produção audiovisual para o meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_GREEN }}
            >
              Quero produção audiovisual para meu hotel
            </a>
          </div>
        </section>

        {/* Entregáveis */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>O que produzimos</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Conteúdo que posiciona e converte
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {deliverables.map((d, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{d.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{d.desc}</p>
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
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>Nosso processo</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              Do planejamento à entrega final
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
              Perguntas sobre Produção Audiovisual
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
        <section className="py-16 px-6 md:px-16" style={{ background: "#0f1a0f" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Seu hotel está sendo mostrado da melhor forma?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75 }}>
              Solicite um diagnóstico gratuito e descubra como fotos e vídeos profissionais podem aumentar suas reservas diretas.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Tenho interesse na produção audiovisual para o meu hotel."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_GREEN }}
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
