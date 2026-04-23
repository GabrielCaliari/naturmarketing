"use client";

import { motion, type Variants } from "framer-motion";
import { trackButtonClick } from "@/lib/analytics";

const BRAND_BROWN = "#994f2a";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ConsultoriaBanner() {
  const handleClick = () => {
    trackButtonClick("cta_diagnostico", "/");
    window.open(
      "https://wa.me/5535998067432?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem.",
      "_blank"
    );
  };

  return (
    <section
      className="relative py-10 md:py-16 px-6 md:px-16 overflow-hidden"
      style={{ background: "#2a1f14" }}
    >
      {/* Background image — bem visível */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/img/resource/seedsbackground.png"
          alt=""
          className="w-full h-full object-cover"
          
        />
        {/* Overlay escuro leve para legibilidade */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(20,12,6,0.45)" }}
        />
      </div>

      {/* Conteúdo */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        {/* Badge */}
        <motion.div variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
          <span
            className="inline-flex items-center gap-2.5 text-[10px] font-medium tracking-[0.28em] uppercase px-5 py-2.5 rounded-full"
            style={{
              color: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-white/60" />
            Diagnóstico Gratuito
          </span>
        </motion.div>

        {/* Heading grande */}
        <motion.h2
          variants={fadeUp}
          className="h2 text-white"
          style={{
            textAlign: "center",
            marginBottom: "1.25rem",
          }}
        >
          Descubra por que seu hotel{" "}
          <em
            className="font-light"
            style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)" }}
          >
            perde reservas
          </em>{" "}
          todos os dias
        </motion.h2>

        {/* Subtexto */}
        <motion.p
          variants={fadeUp}
          className="paragraph"
          style={{
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            maxWidth: "560px",
            margin: "0 auto 2rem",
          }}
        >
          Solicite uma análise estratégica gratuita e receba um plano de ação personalizado
          para aumentar seu faturamento direto.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-medium text-[13px] text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: BRAND_BROWN, letterSpacing: "0.05em" }}
          >
            Diagnóstico Gratuito
          </button>
          
        </motion.div>
      </motion.div>
    </section>
  );
}
