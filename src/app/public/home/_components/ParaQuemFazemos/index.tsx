"use client";

import { motion, type Variants } from "framer-motion";
import { IconBuilding, IconHome, IconBrandAirbnb, IconArrowRight } from "@tabler/icons-react";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const publicos = [
  {
    image: "/img/resource/hotel&resort.png",
    icon: <IconBuilding size={13} stroke={1.8} />,
    label: "Escala e Posicionamento",
    titulo: "Hotéis e Resorts",
    descricao:
      "Estratégias que aumentam ocupação, elevam ticket médio e fortalecem a marca numa posição de liderança de mercado.",
  },
  {
    image: "/img/resource/pousada.png",
    icon: <IconHome size={13} stroke={1.8} />,
    label: "Alma e Exclusividade",
    titulo: "Pousadas e Boutique Hotels",
    descricao:
      "Marketing personalizado para empreendimentos que querem se destacar pelo charme, autenticidade e experiência — não pelo preço.",
  },
  {
    image: "/img/resource/airnb.png",
    icon: <IconBrandAirbnb size={13} stroke={1.8} />,
    label: "Performance e Desejo",
    titulo: "Airbnb & Temporada",
    descricao:
      "Para anfitriões que buscam o design visual impecável e a otimização de canais para maximizar reservas e avaliações.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ParaQuemFazemos() {
  const handleContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="para-quem-fazemos"
      className="py-20 md:py-24"
      style={{ background: "#F7F3EE" }}
    >
      <motion.div
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} className="text-center mb-14 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span
              className="text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: BRAND_GREEN }}
            >
              Para quem fazemos
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>

          <h2
            className="h2"
            style={{
              color: "#1A0F08",
              fontWeight: 400,
            }}
          >
            Marketing Hoteleiro para cada{" "}
            <strong className="font-semibold">
              tipo de empreendimento
            </strong>
          </h2>
        </motion.div>

        {/* ── Cards contidos ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publicos.map((p, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "#FDFAF7",
                border: "1px solid rgba(196,164,142,0.22)",
                boxShadow: "0 4px 24px rgba(26,15,8,0.06)",
              }}
            >
              {/* Imagem */}
              <div className="relative overflow-hidden" style={{ height: "240px" }}>
                <img
                  src={p.image}
                  alt={p.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay suave */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(26,15,8,0.06)" }}
                />
              </div>

              {/* Corpo do card */}
              <div className="flex flex-col gap-4 p-6 flex-1">

                {/* Ícone + Label */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                    style={{ background: "rgba(153,79,42,0.08)", color: BRAND_BROWN }}
                  >
                    {p.icon}
                  </div>
                  <span
                    className="text-[9px] font-semibold tracking-[0.22em] uppercase"
                    style={{ color: BRAND_BROWN }}
                  >
                    {p.label}
                  </span>
                </div>

                {/* Título */}
                <h3
                  className="font-semibold leading-snug"
                  style={{
                    fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                    color: "#1A0F08",
                    fontWeight: 600,
                  }}
                >
                  {p.titulo}
                </h3>

                {/* Descrição */}
                <p
                  className="text-[13px] font-light leading-[1.85] flex-1"
                  style={{ color: "#7a6a5e" }}
                >
                  {p.descricao}
                </p>

                {/* CTA inline */}
                <button
                  onClick={handleContact}
                  className="group/btn inline-flex items-center gap-2 pt-2 transition-colors duration-300"
                  style={{
                    borderTop: "1px solid rgba(196,164,142,0.2)",
                    paddingTop: "14px",
                  }}
                >
                  <span
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 group-hover/btn:text-[#994f2a]"
                    style={{ color: BRAND_GREEN }}
                  >
                    Saiba mais
                  </span>
                  <IconArrowRight
                    size={13}
                    stroke={2}
                    className="transition-all duration-300 group-hover/btn:translate-x-1"
                    style={{ color: BRAND_GREEN }}
                  />
                </button>

              </div>
            </motion.article>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
