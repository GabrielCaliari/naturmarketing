"use client";

import { motion, type Variants } from "framer-motion";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

// Componentes de ícones SVG para cada OTA
const BookingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="18" rx="2" fill="#003580"/>
    <text x="12" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">B</text>
  </svg>
);

const AirbnbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#FF5A5F"/>
    <circle cx="12" cy="9" r="2.5" fill="white"/>
  </svg>
);

const HoteisIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" fill="#D32F2F"/>
    <text x="12" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">H</text>
  </svg>
);

const DecolarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FF6900"/>
    <path d="M8 12l3-3v2h5v2h-5v2l-3-3z" fill="white"/>
  </svg>
);

const ExpediaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="2" fill="#FFC72C"/>
    <circle cx="7" cy="12" r="2" fill="#003580"/>
    <circle cx="17" cy="12" r="2" fill="#003580"/>
  </svg>
);

// Agora com ícones SVG personalizados
const otas = [
  { icon: <BookingIcon />, label: "Booking.com" },
  { icon: <AirbnbIcon />, label: "Airbnb" },
  { icon: <HoteisIcon />, label: "Hoteis.com" },
  { icon: <DecolarIcon />, label: "Decolar" },
  { icon: <ExpediaIcon />, label: "Expedia" },
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
  <section style={{ background: "#F0EBE3", paddingTop: "80px", paddingBottom: "80px" }}>

    {/* ── Bloco OTAs ── */}
    <motion.div
      className="max-w-7xl mx-auto px-6 md:px-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      style={{ marginBottom: "80px" }}
    >
      {/* Label */}
      <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-3">
        <div className="w-10 h-px" style={{ background: BRAND_GREEN }} />
        <span
          className="text-[9px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: BRAND_GREEN }}
        >
          Intermediários que gerenciamos
        </span>
      </motion.div>

      {/* Título */}
      <motion.h3
        variants={fadeUp}
        style={{
          fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
          fontWeight: 400,
          lineHeight: 1.4,
          color: "#4a3728",
          marginBottom: "48px",
        }}
      >
        Canais onde otimizamos o posicionamento do seu hotel
      </motion.h3>

      {/* Cards OTAs - agora com ícones SVG */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        {otas.map((ota) => (
          <div
            key={ota.label}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "#FDFAF7",
              border: "1px solid rgba(196,164,142,0.3)",
              boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
            }}
          >
            {ota.icon}
            <span
              className="text-[13px] font-medium tracking-wide"
              style={{ color: "#4a3728" }}
            >
              {ota.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>

    {/* ── Divisor ── */}
    <div
      className="max-w-7xl mx-auto px-6 md:px-16"
      style={{ height: "1px", background: "rgba(196,164,142,0.35)", marginBottom: "80px" }}
    />

    {/* ── Bloco Canais Próprios ── */}
    <motion.div
      className="max-w-7xl mx-auto px-6 md:px-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
    >
      {/* Label */}
      <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-3">
        <div className="w-10 h-px" style={{ background: BRAND_BROWN }} />
        <span
          className="text-[9px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: BRAND_BROWN }}
        >
          Canal próprio de aquisição
        </span>
      </motion.div>

      {/* Título */}
      <motion.h3
        variants={fadeUp}
        style={{
          fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
          fontWeight: 400,
          lineHeight: 1.4,
          color: "#4a3728",
          marginBottom: "48px",
        }}
      >
        Canais onde construímos o seu ecossistema de reservas diretas
      </motion.h3>

      {/* Chips de plataformas */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        {canais.map((canal) => (
          <div
            key={canal.label}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "#FDFAF7",
              border: "1px solid rgba(196,164,142,0.3)",
              boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
            }}
          >
            <img
              src={canal.src}
              alt={canal.label}
              className="w-5 h-5 object-contain"
            />
            <span
              className="text-[13px] font-medium tracking-wide"
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
