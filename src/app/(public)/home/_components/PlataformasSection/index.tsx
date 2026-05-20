"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

// OTAs com SVGs reais da pasta public/img/svg
const otas = [
  { 
    src: "/img/svg/bookingcom-logo-svgrepo-com.svg", 
    label: "Booking.com",
    alt: "Logo do Booking.com - plataforma de reservas de hotéis"
  },
  { 
    src: "/img/svg/Airbnb_Logo_Bélo.svg", 
    label: "Airbnb",
    alt: "Logo do Airbnb - plataforma de hospedagem alternativa"
  },
  { 
    src: "/img/svg/Hotels.com New.svg", 
    label: "Hotels.com",
    alt: "Logo do Hotels.com - site de reservas de hotéis"
  },
  { 
    src: "/img/svg/decolar-logo-2019.svg", 
    label: "Decolar",
    alt: "Logo da Decolar - agência de viagens online"
  },
  { 
    src: "/img/svg/Expedia_Logo_2023.svg", 
    label: "Expedia",
    alt: "Logo da Expedia - plataforma de viagens e hospedagem"
  },
];

const canais = [
  { 
    src: "/img/svg/instagram-icon.svg", 
    label: "Instagram",
    alt: "Ícone do Instagram - rede social para marketing visual"
  },
  { 
    src: "/img/svg/facebook-icon.svg",  
    label: "Facebook",
    alt: "Ícone do Facebook - rede social para marketing digital"
  },
  { 
    src: "/img/svg/tiktok-icon.svg",    
    label: "TikTok",
    alt: "Ícone do TikTok - plataforma de vídeos curtos"
  },
  { 
    src: "/img/svg/google-icon.svg",    
    label: "Google",
    alt: "Ícone do Google - mecanismo de busca e publicidade"
  },
  { 
    src: "/img/svg/whatsapp-icon.svg",  
    label: "WhatsApp",
    alt: "Ícone do WhatsApp - aplicativo de mensagens"
  },
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
  <section style={{ background: "#F0EBE3" }} className="py-10 md:py-16">

    {/* ── Bloco Canais Próprios ── */}
    <motion.div
      className="max-w-7xl mx-auto px-6 md:px-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      style={{ marginBottom: "60px" }}
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
        className="h2"
        style={{
          fontWeight: 400,
          color: "#4a3728",
          marginBottom: "48px",
        }}
      >
        Canais onde construímos o seu ecossistema de reservas diretas
      </motion.h3>

      {/* Chips de plataformas - Desktop */}
      <motion.div
        variants={fadeUp}
        className="hidden md:flex items-center justify-center gap-3 flex-wrap"
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
            <Image
              src={canal.src}
              alt={canal.alt}
              width={20}
              height={20}
              className="object-contain"
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

      {/* Carousel infinito - Mobile */}
      <motion.div
        variants={fadeUp}
        className="md:hidden overflow-hidden relative"
      >
        <div className="flex animate-scroll-infinite-seamless gap-3" style={{ width: "max-content" }}>
          {/* Primeira cópia */}
          {canais.map((canal, idx) => (
            <div
              key={`first-${idx}`}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full flex-shrink-0"
              style={{
                background: "#FDFAF7",
                border: "1px solid rgba(196,164,142,0.3)",
                boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
              }}
            >
              <Image
                src={canal.src}
                alt={canal.alt}
                width={20}
                height={20}
                className="object-contain"
              />
              <span
                className="text-[13px] font-medium tracking-wide"
                style={{ color: "#4a3728" }}
              >
                {canal.label}
              </span>
            </div>
          ))}
          {/* Segunda cópia para loop seamless */}
          {canais.map((canal, idx) => (
            <div
              key={`second-${idx}`}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full flex-shrink-0"
              style={{
                background: "#FDFAF7",
                border: "1px solid rgba(196,164,142,0.3)",
                boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
              }}
            >
              <Image
                src={canal.src}
                alt={canal.alt}
                width={20}
                height={20}
                className="object-contain"
              />
              <span
                className="text-[13px] font-medium tracking-wide"
                style={{ color: "#4a3728" }}
              >
                {canal.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>

    {/* ── Divisor ── */}
    <div
      className="max-w-7xl mx-auto px-6 md:px-16"
      style={{ height: "1px", background: "rgba(196,164,142,0.35)", marginBottom: "60px" }}
    />

    {/* ── Bloco OTAs ── */}
    <motion.div
      className="max-w-7xl mx-auto px-6 md:px-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
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
        className="h2"
        style={{
          fontWeight: 400,
          color: "#4a3728",
          marginBottom: "48px",
        }}
      >
        Canais onde otimizamos o posicionamento do seu hotel
      </motion.h3>

      {/* Cards OTAs - Desktop */}
      <motion.div
        variants={fadeUp}
        className="hidden md:flex items-center justify-center gap-3 flex-wrap"
      >
        {otas.map((ota) => (
          <div
            key={ota.label}
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "#FDFAF7",
              border: "1px solid rgba(196,164,142,0.3)",
              boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
              height: "48px",
              minWidth: "120px",
            }}
          >
            <Image
              src={ota.src}
              alt={ota.alt}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>

      {/* Carousel infinito - Mobile */}
      <motion.div
        variants={fadeUp}
        className="md:hidden overflow-hidden relative"
      >
        <div className="flex animate-scroll-infinite-seamless gap-3" style={{ width: "max-content" }}>
          {/* Primeira cópia */}
          {otas.map((ota, idx) => (
            <div
              key={`first-${idx}`}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full flex-shrink-0"
              style={{
                background: "#FDFAF7",
                border: "1px solid rgba(196,164,142,0.3)",
                boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
                height: "48px",
                minWidth: "120px",
              }}
            >
              <Image
                src={ota.src}
                alt={ota.alt}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          ))}
          {/* Segunda cópia para loop seamless */}
          {otas.map((ota, idx) => (
            <div
              key={`second-${idx}`}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full flex-shrink-0"
              style={{
                background: "#FDFAF7",
                border: "1px solid rgba(196,164,142,0.3)",
                boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
                height: "48px",
                minWidth: "120px",
              }}
            >
              <Image
                src={ota.src}
                alt={ota.alt}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>

  </section>
);

export default PlataformasSection;
