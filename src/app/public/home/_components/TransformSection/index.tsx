"use client";

import { motion, type Variants } from "framer-motion";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const TransformSection = () => (
  <section id="transform" className="py-10 md:py-16 overflow-hidden" style={{ background: "#F7F3EE" }}>
    <div className="section-container flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">

      {/* Left — Text */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeLeft}
        className="flex flex-col gap-6 w-full max-w-md"
      >
        {/* Label */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          <span
            className="text-[10px] font-medium tracking-[0.3em] uppercase"
            style={{ color: BRAND_GREEN }}
          >
            Nossa Especialidade
          </span>
        </div>

        {/* Headline — usando h3 padronizado */}
        <div className="flex flex-col gap-4">
          <h3
            className="h3"
            style={{ color: "#1A0F08" }}
          >
            Somos especialistas<br />em Marketing Hoteleiro.
          </h3>
          <h3
            className="h3"
            style={{ color: "#1A0F08" }}
          >
            Construímos canais<br/> próprios que geram{" "}<br/> 
            <span style={{ color: BRAND_GREEN }}>reservas diretas</span>{" "}
            e <br/> eliminam a comissão<br/>  das OTAs.
          </h3>
        </div>

        {/* Body — usando paragraph padrão */}
        <p
          className="paragraph"
          style={{ fontWeight: 300, color: "#6b5c50" }}
        >
          Visibilidade de verdade, hóspedes que pagam<br/> pelo valor{" "}
          <strong className="font-medium" style={{ color: "#3a2518" }}>
            e margem que fica com você.
          </strong>
        </p>

        {/* CTA */}
        <div className="pt-2">
          <a
            href="#contact"
            className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium tracking-wide text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Falar com um especialista
          </a>
        </div>
      </motion.div>

      {/* Right — Image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeRight}
        className="w-full max-w-sm"
      >
        {/* Imagem + arco */}
        <div className="relative flex items-center justify-center">
    
          {/* Imagem principal */}
          <div
            className="relative z-10 w-full max-w-sm mx-auto rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 20px 50px rgba(26,15,8,0.15)" }}
          >
            <img
              src="/img/resource/check.png"
              alt="Check-in em hotel — Marketing Hoteleiro Réserve"
              className="w-full object-cover"
              style={{ aspectRatio: "3/4", objectPosition: "center" }}
            />
          </div>
        </div>
      </motion.div>

    </div>
  </section>
);

export default TransformSection;
