"use client";

import { motion, type Variants } from "framer-motion";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const otas = [
  { src: "/img/resource/booking.png.png", alt: "Booking.com" },
  { src: "/img/resource/airbnb.png",      alt: "Airbnb" },
  { src: "/img/resource/hoteis.png.png",  alt: "Hoteis.com" },
  { src: "/img/resource/decolar.png.png", alt: "Decolar" },
  { src: "/img/resource/expedia.png.png", alt: "Expedia" },
];

const canais = [
  { src: "/img/svg/instagram-icon.svg", label: "Instagram" },
  { src: "/img/svg/facebook-icon.svg",  label: "Facebook" },
  { src: "/img/svg/tiktok-icon.svg",    label: "TikTok" },
  { src: "/img/svg/google-icon.svg",    label: "Google" },
  { src: "/img/svg/whatsapp-icon.svg",  label: "WhatsApp" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const PlataformasSection = () => (
  <section style={{ background: "#F0EBE3" }}>

    {/* ── Bloco OTAs ── */}
    <motion.div
      className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
    >
      {/* Label */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
        <div className="w-6 h-px" style={{ background: BRAND_GREEN }} />
        <span
          className="text-[9px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: BRAND_GREEN }}
        >
          Intermediários que gerenciamos
        </span>
      </motion.div>

      {/* Título */}
      <motion.p
        variants={fadeUp}
        className="font-extralight leading-[1.1] tracking-[-0.02em] mb-10"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
          color: "#4a3728",
          fontWeight: 300,
        }}
      >
        Canais onde otimizamos o posicionamento do seu hotel
      </motion.p>

      {/* Logos OTAs — grayscale para coesão visual */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-8 md:gap-12 flex-wrap"
      >
        {otas.map((ota) => (
          <img
            key={ota.alt}
            src={ota.src}
            alt={ota.alt}
            className="h-7 md:h-9 w-auto object-contain transition-all duration-300 hover:opacity-100"
            style={{
              filter: "grayscale(35%) contrast(0.85)",
              opacity: 0.7,
            }}
          />
        ))}
      </motion.div>
    </motion.div>

    {/* ── Divisor ── */}
    <div
      className="mx-6 md:mx-16"
      style={{ height: "1px", background: "rgba(196,164,142,0.35)" }}
    />

    {/* ── Bloco Canais Próprios ── */}
    <motion.div
      className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
    >
      {/* Label */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
        <div className="w-6 h-px" style={{ background: BRAND_BROWN }} />
        <span
          className="text-[9px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: BRAND_BROWN }}
        >
          Canal próprio de aquisição
        </span>
      </motion.div>

      {/* Título */}
      <motion.p
        variants={fadeUp}
        className="font-extralight leading-[1.1] tracking-[-0.02em] mb-10"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
          color: "#4a3728",
          fontWeight: 300,
        }}
      >
        Canais onde construímos o seu ecossistema de reservas diretas
      </motion.p>

      {/* Chips de plataformas */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-3 flex-wrap"
      >
        {canais.map((canal) => (
          <div
            key={canal.label}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "#FDFAF7",
              border: "1px solid rgba(196,164,142,0.3)",
              boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
            }}
          >
            <img
              src={canal.src}
              alt={canal.label}
              className="w-4 h-4 object-contain"
            />
            <span
              className="text-[12px] font-medium tracking-wide"
              style={{ color: "#4a3728" }}
            >
              {canal.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>

  </section>
);

export default PlataformasSection;
