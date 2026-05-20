"use client";

import { motion, type Variants } from "framer-motion";

const BRAND_BROWN = "#994f2a";

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const EspecialistasSection = () => (
  <section className="overflow-hidden" style={{ background: BRAND_BROWN }}>
    <div className="section-container grid grid-cols-1 lg:grid-cols-2">

      {/* Text column */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeLeft}
        className="flex flex-col justify-center gap-6 py-10 md:py-16 text-center lg:text-left order-2 lg:order-1 relative"
      >
        {/* Subtle highlight */}
        <div
          className="absolute top-0 left-0 bottom-0 w-px hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)" }}
        />

        <div className="flex items-center justify-center lg:justify-start gap-3">
          <div className="w-6 h-px" style={{ background: "rgba(255,255,255,0.3)" }} />
          <span
            className="text-[10px] font-medium tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Por que a Réserve
          </span>
        </div>

        <h2
          className="h2 text-white"
          style={{ fontWeight: 300 }}
        >
          A diferença entre crescer e estagnar é ter um time de{" "}
          <strong className="font-semibold">Marketing Hoteleiro</strong>{" "}
          dedicado ao seu hotel.
        </h2>

        <p
          className="paragraph"
          style={{ 
            fontWeight: 300,
            color: "rgba(255,255,255,0.72)" 
          }}
        >
          Com a RÉSERVE, você tem uma{" "}
          <strong className="font-semibold text-white">
            agência de marketing para hotéis
          </strong>{" "}
          de alta performance dedicada a transformar presença digital em{" "}
          <strong className="font-semibold text-white">receita real.</strong>
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-2">
          {[
            { value: "40%+", desc: "Redução média de dependência de OTAs" },
            { value: "3×", desc: "Aumento médio em reservas diretas" },
            { value: "6 meses", desc: "Para resultados mensuráveis" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="text-[15px] font-semibold tracking-wide"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {s.value}
              </span>
              <span
                className="text-[13px] font-light"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {s.desc}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Image column */}
      <div className="relative overflow-hidden min-h-64 lg:min-h-96 order-1 lg:order-2">
        {/* Left gradient fade */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to right, ${BRAND_BROWN} 0%, transparent 100%)`,
          }}
        />
        {/* Bottom gradient fade on mobile */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none z-10 lg:hidden"
          style={{
            background: `linear-gradient(to top, ${BRAND_BROWN} 0%, transparent 100%)`,
          }}
        />
        <motion.img
          src="/img/resource/resersecao5.png"
          alt="Especialistas em marketing hoteleiro — Equipe Réserve"
          className="w-full h-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        />
      </div>

    </div>
  </section>
);

export default EspecialistasSection;
