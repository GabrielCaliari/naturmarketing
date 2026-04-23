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
      className="relative flex flex-col overflow-hidden px-6 md:px-16"
      style={{ minHeight: "80svh", background: "#2a1f14" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/img/resource/seedsbackground.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(20,12,6,0.45)" }}
        />
      </div>

      {/* Conteúdo */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto w-full"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        {/* Badge */}
        <motion.div variants={fadeUp} style={{ marginBottom: "1.75rem" }}>
          <span
            className="inline-flex items-center gap-2.5 text-[10px] font-medium tracking-[0.28em] uppercase px-5 py-2.5 rounded-full"
            style={{
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-white/60" />
            Diagnóstico Gratuito
          </span>
        </motion.div>

        {/* Título — mesmo tamanho do Banner hero */}
        <motion.h2
          variants={fadeUp}
          style={{
            color: "#ffffff",
            marginBottom: "1.5rem",
            maxWidth: "900px",
            fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
            fontWeight: 700,
            lineHeight: "1.05",
            textAlign: "center",
          }}
        >
          Descubra por que seu<br/> hotel{" "}
         
            perde reservas<br/>
          
          todos os dias
        </motion.h2>

        {/* Subtítulo — mesmo tamanho do Banner hero */}
        <motion.p
          variants={fadeUp}
          style={{
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: "520px",
            margin: "0 auto 2.75rem",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.7,
          }}
        >
          Solicite uma análise estratégica gratuita e receba um plano de ação personalizado.<br />
          <strong style={{ fontWeight: 600, color: "#ffffff" }}>
            Aumente seu faturamento direto agora.
          </strong>
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <button
            onClick={handleClick}
            className="inline-flex items-center px-8 py-3.5 rounded-full text-[12px] font-medium tracking-[0.1em] uppercase text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: BRAND_BROWN, letterSpacing: "0.08em" }}
          >
            Diagnóstico Gratuito
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
