"use client";

import { motion, type Variants } from "framer-motion";
import {
  IconBrandInstagram,
  IconCamera,
  IconWorld,
  IconPalette,
  IconTargetArrow,
  IconChartBar,
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
    titulo: "Anúncios (Meta/Google)",
    descricao:
      "Tráfego pago inteligente segmentado para o público de alta renda pronto para reservar.",
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
      className="py-14 md:py-20 px-6 md:px-16"
      style={{ background: "#F7F3EE", backgroundColor: "#F7F3EE" }}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {/* ── Header split ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-8"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span
                className="text-[10px] font-medium tracking-[0.3em] uppercase"
                style={{ color: TEXT_LABEL }}
              >
                Vertical Hotelaria
              </span>
            </div>
            <h2
              className="font-extralight leading-[1.1] tracking-[-0.025em]"
              style={{
                fontSize: "clamp(1.85rem, 3.8vw, 3rem)",
                color: TEXT_HEAD,
                fontWeight: 300,
              }}
            >
              Soluções completas desenvolvidas para{" "}
              <strong className="font-semibold" style={{ color: TEXT_HEAD }}>
                hotelaria
              </strong>
            </h2>
          </div>

          <p
            className="text-[14px] font-light leading-[1.85] max-w-xs pb-4 italic"
            style={{
              color: TEXT_BODY,
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            Atuamos em todos os pontos de contato da jornada do hóspede de alto padrão.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderTop: `1px solid ${BORDER}`, borderLeft: `1px solid ${BORDER}` }}
        >
          {servicos.map((s, i) => (
            <BentoCard key={i} servico={s} />
          ))}
        </div>

        {/* ── CTA strip ── */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-2xl"
          style={{
            background: "#F0EBE3",
            border: `1px solid ${BORDER}`,
          }}
        >
          <p
            className="text-[14px] font-light text-center sm:text-left"
            style={{ color: TEXT_BODY }}
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
            className="shrink-0 inline-flex items-center px-6 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
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
        "group flex flex-col justify-between gap-4 p-7 md:p-8",
        "transition-all duration-700 cursor-default",
        "hover:bg-[#84936f]",
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
    >
      {/* Ícone */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-white/15"
        style={{
          background: "rgba(132,147,111,0.12)",
          color: BRAND_GREEN,
        }}
      >
        {servico.icon}
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-3">
        <h3
          className="text-[16px] font-semibold leading-snug transition-colors duration-500 group-hover:text-white"
          style={{ color: TEXT_HEAD }}
        >
          {servico.titulo}
        </h3>
        <p
          className="text-[13px] leading-[1.8] font-light transition-colors duration-500 group-hover:text-white/75"
          style={{ color: TEXT_BODY }}
        >
          {servico.descricao}
        </p>
      </div>
    </motion.div>
  );
}
