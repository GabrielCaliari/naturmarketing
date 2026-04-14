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
  <section id="transform" className="py-16 md:py-24 overflow-hidden" style={{ background: "#F7F3EE" }}>
    <div className="max-w-6xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* Left — Text */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeLeft}
        className="flex flex-col gap-6"
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

        {/* Headline — dois blocos separados como na referência */}
        <div className="flex flex-col gap-4">
          <h2
            className="font-semibold leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1A0F08" }}
          >
            Somos especialistas<br />em Marketing Hoteleiro.
          </h2>
          <h2
            className="font-semibold leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1A0F08" }}
          >
            Construímos canais próprios que geram{" "}
            <span style={{ color: BRAND_GREEN }}>reservas diretas</span>{" "}
            e eliminam a comissão das OTAs.
          </h2>
        </div>

        {/* Body */}
        <p
          className="text-[14px] font-light leading-[1.75]"
          style={{ color: "#6b5c50" }}
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
      >
        {/* Imagem + arco */}
        <div className="relative flex items-center justify-center">

          {/* Grid de pontos decorativo */}
          <div
            className="absolute top-0 left-0 pointer-events-none"
            style={{ opacity: 0.35 }}
            aria-hidden="true"
          >
            {Array.from({ length: 4 }).map((_, row) => (
              <div key={row} className="flex gap-2.5 mb-2.5">
                {Array.from({ length: 8 }).map((_, col) => (
                  <div key={col} className="w-1 h-1 rounded-full" style={{ background: "#84936f" }} />
                ))}
              </div>
            ))}
          </div>

          {/* Arco decorativo — semicírculo à direita da imagem */}
          <svg
            className="absolute pointer-events-none hidden lg:block"
            style={{ top: "15%", right: "-70px", height: "70%", width: "80px" }}
            viewBox="0 0 80 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 10 0 A 150 150 0 0 1 10 300"
              stroke={BRAND_GREEN}
              strokeWidth="22"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          </svg>

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
