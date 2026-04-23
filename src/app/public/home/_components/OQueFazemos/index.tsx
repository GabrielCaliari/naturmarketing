"use client";

import { motion, type Variants } from "framer-motion";
import {
  IconBrandInstagram,
  IconCamera,
  IconWorld,
  IconPalette,
  IconTargetArrow,
  IconChartBar,
  IconBuildingStore,
} from "@tabler/icons-react";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

// Paleta light
const BG_SECTION  = "#F7F3EE";
const BG_CARD     = "#FDFAF7";
const BORDER      = "rgba(196,164,142,0.2)";
const TEXT_HEAD   = "#1A0F08";
const TEXT_BODY   = "#7a6a5e";
const TEXT_LABEL  = "#84936f";

const servicos = [
  {
    icon: <IconBrandInstagram size={22} stroke={1.4} />,
    titulo: "Redes Sociais",
    descricao:
      "Curadoria de conteúdo que desperta o desejo imediato de reserva através de narrativa visual.",
  },
  {
    icon: <IconCamera size={22} stroke={1.4} />,
    titulo: "Produção Audiovisual",
    descricao:
      "Vídeos e fotografia de alto padrão que capturam a alma e a atmosfera única do seu hotel.",
  },
  {
    icon: <IconWorld size={22} stroke={1.4} />,
    titulo: "Sites e Landing Pages",
    descricao:
      "Interfaces focadas em conversão com navegação fluida e integração direta com motor de reservas.",
  },
  {
    icon: <IconPalette size={22} stroke={1.4} />,
    titulo: "Branding Hoteleiro",
    descricao:
      "Criação de identidades que transmitem exclusividade e elevam o valor percebido da diária.",
  },
  {
    icon: <IconTargetArrow size={22} stroke={1.4} />,
    titulo: "Google Hotel Ads & Meta Ads",
    descricao:
      "Tráfego pago inteligente — Google Hotel Ads, Search e Meta Ads segmentados para quem está pronto para reservar.",
  },
  {
    icon: <IconBuildingStore size={22} stroke={1.4} />,
    titulo: "SEO para Hotéis",
    descricao:
      "Otimização de mecanismos de busca focada em hotelaria para seu hotel aparecer antes dos concorrentes no Google.",
  },
  {
    icon: <IconChartBar size={22} stroke={1.4} />,
    titulo: "Relatórios de Performance",
    descricao:
      "Análise profunda de ROI e métricas de desempenho para decisões baseadas em dados reais.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function OQueFazemos() {
  return (
    <section
      id="services"
      className="py-10 md:py-12"
      style={{ background: "#F0EBE3" }}
    >
      <motion.div
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {/* ── Header split ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span
                className="text-[10px] font-medium tracking-[0.3em] uppercase"
                style={{ color: TEXT_LABEL }}
              >
                Vertical Hotelaria
              </span>
            </div>
            <h2
              className="h2"
              style={{
                color: TEXT_HEAD,
                fontWeight: 400,
              }}
            >
              Soluções completas desenvolvidas para{" "}
              <strong className="font-semibold" style={{ color: TEXT_HEAD }}>
                hotelaria
              </strong>
            </h2>
          </div>

          <p
            className="paragraph max-w-xs pb-3 italic"
            style={{
              fontWeight: 300,
              color: TEXT_BODY,
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            Atuamos em todos os pontos de contato da jornada do hóspede de alto padrão.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ borderTop: `1px solid ${BORDER}`, borderLeft: `1px solid ${BORDER}` }}
        >
          {servicos.map((s, i) => (
            <BentoCard key={i} servico={s} />
          ))}
        </div>

        {/* ── CTA strip ── */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 rounded-2xl"
          style={{
            background: BG_CARD,
            border: `1px solid ${BORDER}`,
          }}
        >
          <p
            className="paragraph text-center sm:text-left"
            style={{ 
              fontWeight: 300,
              color: TEXT_BODY 
            }}
          >
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

/* ── Card isolado para capturar hover sem conflito de inline style ── */
function BentoCard({
  servico,
}: {
  servico: { icon: React.ReactNode; titulo: string; descricao: string };
}) {
  return (
    <motion.div
      className={[
        "group flex flex-col justify-between gap-2.5 p-4 md:p-5",
        "transition-all duration-700 cursor-default",
        "hover:bg-[#84936f] hover:scale-[1.02] hover:shadow-lg",
      ].join(" ")}
      style={{
        background: BG_CARD,
        borderRight: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      whileHover={{ y: -4 }}
    >
      {/* Ícone */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:bg-white/15 group-hover:scale-110"
        style={{
          background: "rgba(132,147,111,0.12)",
          color: BRAND_GREEN,
        }}
      >
        <div className="scale-90">{servico.icon}</div>
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-1.5">
        <h3
          className="text-[14px] font-semibold leading-tight transition-colors duration-500 group-hover:text-white"
          style={{ color: TEXT_HEAD }}
        >
          {servico.titulo}
        </h3>
        <p
          className="text-[11.5px] leading-[1.6] font-light transition-colors duration-500 group-hover:text-white/75"
          style={{ color: TEXT_BODY }}
        >
          {servico.descricao}
        </p>
      </div>
    </motion.div>
  );
}
