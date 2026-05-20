"use client";

import { motion, type Variants } from "framer-motion";
import { IconX, IconCheck } from "@tabler/icons-react";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const semItems = [
  "Altas taxas de comissão nas OTAs",
  "Comunicação genérica sem identidade",
  "Marketing reativo e sem estratégia",
  "Dependência total de intermediários",
];

const comItems = [
  "Reservas diretas com zero comissão",
  "Posicionamento premium e diferenciado",
  "Estratégia integrada com ROI mensurável",
  "Canal próprio de aquisição de hóspedes",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ComparativoSection() {
  return (
    <section className="py-10 md:py-16" style={{ background: "#F7F3EE" }}>
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>
              O Comparativo
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
          </div>
          <h2 className="h1">A diferença é clara</h2>
        </motion.div>

        {/* Colunas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {/* Coluna esquerda — Sem estrutura */}
          <div className="flex flex-col gap-3">
            <motion.div variants={fadeUp} className="mb-3">
              <span
                className="text-[32px] font-light"
                style={{ color: "rgba(26,15,8,0.35)", fontFamily: "var(--font-rubik), sans-serif" }}
              >
                Sem estrutura
              </span>
            </motion.div>
            {semItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{
                  background: "#FDFAF7",
                  border: "1px solid rgba(196,164,142,0.22)",
                }}
              >
                <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(180,80,65,0.1)", color: "rgba(180,80,65,0.7)" }}>
                  <IconX size={13} stroke={2.5} />
                </div>
                <span className="text-[15px] font-light" style={{ color: "rgba(26,15,8,0.6)" }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Coluna direita — Com a Réserve */}
          <div className="flex flex-col gap-3">
            <motion.div variants={fadeUp} className="mb-3">
              <span
                className="text-[32px]"
                style={{ color: BRAND_GREEN, fontWeight: 400 }}
              >
                Com a{" "}
                <span style={{ fontFamily: "PP Hatton Medium, Georgia, serif", fontWeight: 400 }}>
                  réserve
                </span>
              </span>
            </motion.div>
            {comItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{
                  background: BRAND_GREEN,
                  border: "none",
                }}
              >
                <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
                  <IconCheck size={13} stroke={2.5} />
                </div>
                <span className="text-[15px] font-light" style={{ color: "rgba(255,255,255,0.92)" }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
