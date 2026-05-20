"use client";

import { motion, type Variants } from "framer-motion";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const steps = [
  {
    num: "01",
    label: "Diagnóstico",
    image: "/img/resource/secao2-img1.png",
    text: "Auditamos toda a operação digital do seu hotel para identificar oportunidades ocultas de receita e pontos de perda.",
  },
  {
    num: "02",
    label: "Direcionamento",
    image: "/img/resource/icon1.png",
    text: "Estruturamos um plano exclusivo de gestão de tráfego e conversão desenhado para o seu empreendimento.",
  },
  {
    num: "03",
    label: "Implementação",
    image: "/img/resource/icon2.png",
    text: "Executamos marketing hoteleiro de alta performance de forma integrada e orientada a resultados concretos.",
  },
  {
    num: "04",
    label: "Otimização",
    image: "/img/resource/icon3.png",
    text: "Monitoramos, analisamos e otimizamos continuamente para maximizar o ROI do seu hotel mês a mês.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function QuemSomos() {
  return (
    <section id="about" style={{ background: "#F0EBE3" }}>

      {/* Process labels bar */}
      <div style={{ borderTop: "1px solid rgba(196,164,142,0.3)", borderBottom: "1px solid rgba(196,164,142,0.3)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={[
                  "flex items-center gap-2.5 py-3.5 px-2",
                  i < steps.length - 1 ? "border-r" : "",
                ].join(" ")}
                style={{ borderColor: "rgba(196,164,142,0.3)" }}
              >
                <span
                  className="text-[9px] font-semibold tracking-[0.2em]"
                  style={{ color: `${BRAND_GREEN}80` }}
                >
                  {step.num}
                </span>
                <span
                  className="text-[11px] font-medium tracking-[0.15em] uppercase"
                  style={{ color: "#7a6a5e" }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brown editorial banner */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={stagger}
        className="py-24 md:py-32 px-6 md:px-16 text-center relative overflow-hidden"
        style={{ background: BRAND_BROWN }}
      >
        {/* Subtle radial highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
            <p
              className="text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              A Metodologia Réserve
            </p>
            <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-extralight text-white leading-[1.06] tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(1.85rem, 4.2vw, 3.4rem)" }}
          >
            Estratégia de Conversão,<br/> 
            Tráfego e Conteúdo
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[15px] md:text-base font-light leading-[1.85] pt-4"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            trabalhando juntos para aumentar o faturamento do seu hotel<br className="hidden sm:block" />
            gerando mais <strong className="font-semibold text-white">reservas diretas</strong>
          </motion.p>
        </div>
      </motion.div>

      {/* 4-step process grid */}
      <div style={{ borderTop: "2px solid rgba(153,79,42,0.35)" }}>
        <motion.div
          className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              className="flex flex-col items-center text-center gap-5"
            >
              <span
                className="text-[10px] font-semibold tracking-[0.28em] uppercase"
                style={{ color: `${BRAND_BROWN}90` }}
              >
                {step.num}
              </span>
              <div
                className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white"
                style={{ border: `2px solid rgba(153,79,42,0.4)` }}
              >
                <img
                  src={step.image}
                  alt={step.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="text-[12px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: "#4a3728" }}
                >
                  {step.label}
                </span>
                <p className="text-[12.5px] leading-[1.75] font-light" style={{ color: "#7a6a5e" }}>
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
