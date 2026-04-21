"use client";

import { motion, type Variants } from "framer-motion";
import { IconX, IconCircleCheckFilled } from "@tabler/icons-react";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const semItems = [
  {
    label: "Altas Taxas OTAs",
    desc: "Dependência extrema de Booking e Expedia, perdendo margem de lucro.",
  },
  {
    label: "Comunicação Genérica",
    desc: "O hotel parece apenas mais um no meio de centenas de opções.",
  },
  {
    label: "Marketing Reativo",
    desc: "Postagens sem estratégia apenas quando a ocupação está baixa.",
  },
];

const comItems = [
  {
    label: "Reservas Diretas",
    desc: "Redução de custos com comissões e fidelização direta do hóspede.",
  },
  {
    label: "Comunicação Premium",
    desc: "Posicionamento de marca que atrai o público certo e justifica o preço.",
  },
  {
    label: "ROI Mensurável",
    desc: "Estratégia previsível com foco em crescimento sustentável de receita.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.14, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ComparativoSection() {
  return (
    <section className="py-14 md:py-20 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header centralizado ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-20"
        >
          <span
            className="text-[10px] font-bold tracking-[0.4em] uppercase block mb-6"
            style={{ color: BRAND_BROWN }}
          >
            The Benchmark
          </span>

          {/* Título no estilo display serif — leve */}
          <h2
            style={{
              fontFamily: "PP Hatton Medium, Georgia, serif",
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              color: "#1A0F08",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            A diferença é clara
          </h2>

          <div
            className="mx-auto mt-8"
            style={{ width: "36px", height: "1px", background: "rgba(196,164,142,0.7)" }}
          />
        </motion.div>

        {/* ── Painéis ── */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">

          {/* Sem estrutura */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
            className="flex-1 flex flex-col p-10 md:p-14"
            style={{
              background: "#FDFAF7",
              border: "1px solid rgba(196,164,142,0.22)",
            }}
          >
            <span
              className="text-[9px] font-semibold tracking-[0.28em] uppercase mb-3 block"
              style={{ color: "rgba(122,106,94,0.45)" }}
            >
              Estado Atual
            </span>

            <h3
              className="mb-10 font-extralight leading-none"
              style={{
                fontFamily: "PP Hatton Medium, Georgia, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: "rgba(26,15,8,0.28)",
              }}
            >
              Sem Estrutura
            </h3>

            <ul className="flex flex-col gap-8 flex-1">
              {semItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* Ícone X */}
                  <div
                    className="shrink-0 w-5 h-5 flex items-center justify-center mt-1.5"
                    style={{ color: "rgba(180,80,65,0.5)" }}
                  >
                    <IconX size={13} stroke={2} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4
                      className="text-[10px] font-semibold tracking-[0.2em] uppercase"
                      style={{ color: "rgba(122,106,94,0.6)" }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="text-[13.5px] font-light leading-[1.75]"
                      style={{ color: "rgba(122,106,94,0.7)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Com a Réserve */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
            className="flex-1 flex flex-col p-10 md:p-14 relative overflow-hidden"
            style={{
              background: BRAND_GREEN,
              boxShadow: "0 32px 80px -16px rgba(0,0,0,0.18)",
            }}
          >
            {/* Radial highlight */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 55% at 75% 15%, rgba(255,255,255,0.09) 0%, transparent 65%)",
              }}
            />

            <div className="relative z-10 flex flex-col h-full">
              <span
                className="text-[9px] font-semibold tracking-[0.28em] uppercase mb-3 block"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Ecossistema Réserve
              </span>

              <h3
                className="mb-10 leading-none"
                style={{
                  fontFamily: "PP Hatton Medium, Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#ffffff",
                }}
              >
                Com a Réserve
              </h3>

              <ul className="flex flex-col gap-8 flex-1">
                {comItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    {/* Check circular preenchido */}
                    <div
                      className="shrink-0 mt-1.5"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      <IconCircleCheckFilled size={18} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4
                        className="text-[10px] font-semibold tracking-[0.2em] uppercase"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      >
                        {item.label}
                      </h4>
                      <p
                        className="text-[13.5px] font-light leading-[1.75]"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
