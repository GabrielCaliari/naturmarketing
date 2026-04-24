"use client";

import { motion, type Variants } from "framer-motion";

const BRAND_BROWN = "#994f2a";

const stats = [
  {
    value: "+40%",
    label: "Redução de dependência de OTAs",
    desc: "Média alcançada pelos hotéis que estruturam canal próprio de reservas com a Réserve.",
  },
  {
    value: "3×",
    label: "Aumento em reservas diretas",
    desc: "Hotéis com estratégia integrada triplicam o volume de reservas sem intermediários.",
  },
  {
    value: "6 meses",
    label: "Para resultados mensuráveis",
    desc: "Prazo médio para consolidar presença digital e colher retorno consistente sobre o investimento.",
  },
  {
    value: "100%",
    label: "Foco exclusivo em hotelaria",
    desc: "Não atendemos outros segmentos. Todo o nosso conhecimento é aplicado ao mercado hoteleiro.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ResultadosSection() {
  return (
    <section className="py-10 md:py-16" style={{ background: "#F0EBE3" }}>
      <motion.div
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
            <span
              className="text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: BRAND_BROWN }}
            >
              Resultados
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
          </div>
          <h2 className="h2" style={{ color: "#1A0F08", fontWeight: 400 }}>
            Números que{" "}
            <strong className="font-semibold" style={{ color: BRAND_BROWN }}>
              falam por si
            </strong>
          </h2>
          <p className="paragraph max-w-lg" style={{ fontWeight: 300, color: "#7a6a5e" }}>
            Médias baseadas na performance dos hotéis que adotam estratégia integrada de marketing hoteleiro.
          </p>
        </motion.div>

        {/* Grid desktop */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col gap-3 p-7 rounded-2xl"
              style={{
                background: i === 0 ? BRAND_BROWN : "#FDFAF7",
                border: i === 0 ? "none" : "1px solid rgba(196,164,142,0.25)",
              }}
            >
              <span
                className="text-[48px] font-light leading-none tracking-tight"
                style={{ color: i === 0 ? "#ffffff" : BRAND_BROWN }}
              >
                {stat.value}
              </span>
              <span
                className="text-[12px] font-semibold tracking-wide uppercase"
                style={{ color: i === 0 ? "rgba(255,255,255,0.9)" : "#1A0F08" }}
              >
                {stat.label}
              </span>
              <p
                className="text-[14px] font-light leading-relaxed"
                style={{ color: i === 0 ? "rgba(255,255,255,0.7)" : "#7a6a5e" }}
              >
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile — 1 col */}
        <div className="sm:hidden flex flex-col gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-center gap-5 p-5 rounded-2xl"
              style={{
                background: i === 0 ? BRAND_BROWN : "#FDFAF7",
                border: i === 0 ? "none" : "1px solid rgba(196,164,142,0.25)",
              }}
            >
              {/* Valor à esquerda */}
              <span
                className="text-[40px] font-light leading-none tracking-tight shrink-0 w-28 text-center"
                style={{ color: i === 0 ? "#ffffff" : BRAND_BROWN }}
              >
                {stat.value}
              </span>
              {/* Divisor vertical */}
              <div
                className="w-px self-stretch"
                style={{ background: i === 0 ? "rgba(255,255,255,0.2)" : "rgba(196,164,142,0.35)" }}
              />
              {/* Texto à direita */}
              <div className="flex flex-col gap-1">
                <span
                  className="text-[11px] font-semibold tracking-wide uppercase"
                  style={{ color: i === 0 ? "rgba(255,255,255,0.9)" : "#1A0F08" }}
                >
                  {stat.label}
                </span>
                <p
                  className="text-[13px] font-light leading-relaxed"
                  style={{ color: i === 0 ? "rgba(255,255,255,0.7)" : "#7a6a5e" }}
                >
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
