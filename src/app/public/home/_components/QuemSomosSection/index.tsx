"use client";

import { motion, type Variants } from "framer-motion";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F7F3EE";

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function QuemSomosSection() {
  return (
    <section id="quem-somos" className="overflow-hidden" style={{ background: BG }}>
      <div className="section-container grid grid-cols-1 lg:grid-cols-2">

        {/* ── Coluna texto ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
          className="flex flex-col justify-center gap-6 py-10 md:py-16 text-center lg:text-left order-2 lg:order-1"
        >
          {/* Label */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="w-6 h-px" style={{ background: BRAND_GREEN }} />
            <span
              className="text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: BRAND_GREEN }}
            >
              Quem Somos
            </span>
          </div>

          {/* Título */}
          <h2 className="h2" style={{ color: "#1A0F08", fontWeight: 400 }}>
            Nascemos dentro{" "}
            <strong className="font-semibold" style={{ color: BRAND_BROWN }}>
              da hotelaria.
            </strong>
          </h2>

          {/* Copy */}
          <p className="paragraph" style={{ fontWeight: 300, color: "#6b5c50" }}>
            A Réserve não é uma agência genérica que decidiu atender hotéis.
            Somos especialistas que escolheram a hotelaria como único mercado —
            porque entendemos que{" "}
            <strong className="font-medium" style={{ color: "#1A0F08" }}>
              vender diárias exige uma linguagem diferente.
            </strong>
          </p>

          <p className="paragraph" style={{ fontWeight: 300, color: "#6b5c50" }}>
            Trabalhamos com hotéis, pousadas e resorts que querem parar de depender
            de OTAs e construir um canal próprio de reservas — com identidade,
            estratégia e{" "}
            <strong className="font-medium" style={{ color: "#1A0F08" }}>
              resultado mensurável.
            </strong>
          </p>

          {/* CTA */}
          <div className="flex justify-center lg:justify-start pt-2">
            <a
              href="https://wa.me/553597742984?text=Olá! Gostaria de saber mais sobre a Réserve."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
            >
              Falar com a equipe
            </a>
          </div>
        </motion.div>

        {/* ── Coluna foto ── */}
        <div className="relative overflow-hidden min-h-64 lg:min-h-[480px] order-1 lg:order-2">
          {/* Gradiente esquerda — funde com o fundo no desktop */}
          <div
            className="absolute inset-y-0 left-0 w-1/3 pointer-events-none z-10 hidden lg:block"
            style={{ background: `linear-gradient(to right, ${BG} 0%, transparent 100%)` }}
          />
          {/* Gradiente inferior — mobile */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none z-10 lg:hidden"
            style={{ background: `linear-gradient(to top, ${BG} 0%, transparent 100%)` }}
          />

          {/* Placeholder — trocar src quando tiver a foto */}
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 min-h-64 lg:min-h-[480px]"
            style={{ background: "rgba(132,147,111,0.08)" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(132,147,111,0.15)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#84936f" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(132,147,111,0.5)" }}
            >
              Foto da equipe
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
