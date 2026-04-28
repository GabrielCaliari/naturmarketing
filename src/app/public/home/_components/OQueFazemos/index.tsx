"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  IconChevronLeft,
  IconChevronRight,
  IconBrandMeta,
  IconBrandGoogle,
} from "@tabler/icons-react";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG_CARD     = "#FDFAF7";
const BORDER      = "rgba(196,164,142,0.2)";
const TEXT_HEAD   = "#1A0F08";
const TEXT_BODY   = "#7a6a5e";
const TEXT_LABEL  = "#84936f";

// Ícones inline SVG padronizados
const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="3" />
    <path d="M16.5 7.5v.001" />
  </svg>
);

const CameraIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const SiteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);



const SEOIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18 17V9M13 17V5M8 17v-3" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const servicos = [
  {
    icon: <InstagramIcon />,
    titulo: "Gestão de Canais Digitais",
    descricao: "Redes sociais, OTAs e plataformas digitais gerenciadas de forma integrada — do Instagram ao Booking, do Google ao WhatsApp.",
  },
  {
    icon: <CameraIcon />,
    titulo: "Produção Audiovisual",
    descricao: "Vídeos e fotografia de alto padrão que capturam a alma e a atmosfera única do seu hotel.",
  },
  {
    icon: <SiteIcon />,
    titulo: "Sites e Landing Pages",
    descricao: "Interfaces focadas em conversão com navegação fluida e integração direta com motor de reservas.",
  },
  {
    icon: <IconBrandGoogle size={28} stroke={1.3} />,
    titulo: "Google Ads & Hotel Ads",
    descricao: "Google Hotel Ads, Search e Display segmentados para capturar viajantes no momento da decisão.",
  },
  {
    icon: <IconBrandMeta size={28} stroke={1.3} />,
    titulo: "Meta Ads",
    descricao: "Anúncios no Facebook e Instagram que alcançam o público ideal e convertem em reservas diretas.",
  },
  {
    icon: <SEOIcon />,
    titulo: "SEO para Hotéis",
    descricao: "Otimização focada em hotelaria para seu hotel aparecer antes dos concorrentes no Google.",
  },
  {
    icon: <AnalyticsIcon />,
    titulo: "Relatórios de Performance",
    descricao: "Análise profunda de ROI e métricas de desempenho para decisões baseadas em dados reais.",
  },
  {
    icon: <WhatsAppIcon />,
    titulo: "Automação de Atendimento",
    descricao: "Automação inteligente do WhatsApp para capturar leads, responder dúvidas e converter reservas 24h por dia.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ── Card ── */
function BentoCard({
  servico,
}: {
  servico: { icon: React.ReactNode; titulo: string; descricao: string };
}) {
  return (
    <div
      className={[
        "group flex flex-col items-center text-center gap-3 px-4 py-5 rounded-2xl h-full",
        "transition-all duration-500 cursor-default",
        "hover:bg-[#84936f] hover:shadow-lg hover:-translate-y-1",
      ].join(" ")}
      style={{
        background: BG_CARD,
        border: `1px solid ${BORDER}`,
      }}
    >
      {/* Ícone */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-white/15"
        style={{ background: "rgba(132,147,111,0.12)", color: BRAND_GREEN }}
      >
        {servico.icon}
      </div>
      {/* Texto */}
      <div className="flex flex-col gap-1.5 flex-1">
        <h3
          className="text-[15px] font-semibold leading-tight transition-colors duration-500 group-hover:text-white"
          style={{ color: TEXT_HEAD }}
        >
          {servico.titulo}
        </h3>
        <p
          className="text-[13px] leading-[1.65] font-light transition-colors duration-500 group-hover:text-white/80"
          style={{ color: TEXT_BODY }}
        >
          {servico.descricao}
        </p>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function OQueFazemos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    // Centraliza o card no viewport do track
    const trackWidth = track.offsetWidth;
    const cardWidth = card.offsetWidth;
    const scrollLeft = card.offsetLeft - (trackWidth - cardWidth) / 2;
    track.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(servicos.length - 1, activeIndex + 1));

  return (
    <section id="services" className="py-10 md:py-16" style={{ background: "#F0EBE3" }}>
      <motion.div
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span
              className="text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: TEXT_LABEL }}
            >
              Como Atuamos
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h2 className="h2" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
            Soluções completas desenvolvidas para{" "}
            <strong className="font-semibold" style={{ color: TEXT_HEAD }}>
              hotelaria
            </strong>
          </h2>
          <p className="paragraph max-w-lg italic" style={{ fontWeight: 300, color: TEXT_BODY }}>
            Atuamos em todos os pontos de contato da jornada do hóspede de alto padrão.
          </p>
        </motion.div>

        {/* ── Desktop grid — 4 cols centralizados ── */}
        <div className="hidden md:flex md:flex-wrap justify-center gap-4">
          {servicos.map((s, i) => (
            <motion.div key={i} variants={fadeUp} style={{ width: "calc(25% - 12px)", minWidth: "200px" }}>
              <BentoCard servico={s} />
            </motion.div>
          ))}
        </div>

        {/* ── Mobile carousel ── */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory px-[10vw]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={() => {
              const track = trackRef.current;
              if (!track) return;
              const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth + 12;
              setActiveIndex(Math.round((track.scrollLeft) / cardWidth));
            }}
          >
            {servicos.map((s, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-center"
                style={{ width: "75vw", maxWidth: "280px" }}
              >
                <BentoCard servico={s} />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
              style={{ background: BG_CARD, border: `1px solid ${BORDER}`, color: BRAND_BROWN }}
              aria-label="Anterior"
            >
              <IconChevronLeft size={16} stroke={2} />
            </button>

            <div className="flex items-center gap-2">
              {servicos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir para slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === i ? "20px" : "6px",
                    height: "6px",
                    background: activeIndex === i ? BRAND_BROWN : "rgba(153,79,42,0.25)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={activeIndex === servicos.length - 1}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
              style={{ background: BG_CARD, border: `1px solid ${BORDER}`, color: BRAND_BROWN }}
              aria-label="Próximo"
            >
              <IconChevronRight size={16} stroke={2} />
            </button>
          </div>
        </div>

        {/* ── CTA strip ── */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 rounded-2xl"
          style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
        >
          <p className="paragraph text-center sm:text-left" style={{ fontWeight: 300, color: TEXT_BODY }}>
            Quer uma estratégia completa e integrada para o seu hotel?{" "}
            <strong className="font-medium" style={{ color: TEXT_HEAD }}>
              Solicite um diagnóstico gratuito.
            </strong>
          </p>
          <a
            href="https://wa.me/5535998067432?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center px-6 py-3 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
          >
            Falar com Especialista
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
