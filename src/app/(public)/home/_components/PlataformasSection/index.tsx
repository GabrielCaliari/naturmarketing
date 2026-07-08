"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

// Só liga a animação (transform infinito) quando o carrossel está visível —
// evita o compositor rodando continuamente fora de tela enquanto a página carrega.
function useAutoScrollVisible<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

const BRAND_GREEN = "#84936f";
// Verde para TEXTO sobre fundos claros — >= 4.5:1 (WCAG AA)
const BRAND_GREEN_TEXT = "#5d6b4c";
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

const PlataformasSection = () => {
  const { t } = useLocale();
  const canaisScroll = useAutoScrollVisible<HTMLDivElement>();
  const otasScroll = useAutoScrollVisible<HTMLDivElement>();
  return (
  <section style={{ background: "#F0EBE3" }} className="py-10 md:py-16">

    {/* ── Bloco Canais Próprios ── */}
    <Reveal
      className="max-w-7xl mx-auto px-6 md:px-16 text-center"
      style={{ marginBottom: "60px" }}
    >
      {/* Label */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="w-10 h-px" style={{ background: BRAND_BROWN }} />
        <span
          className="text-[9px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: BRAND_BROWN }}
        >
          {t('plat.own.label')}
        </span>
      </div>

      {/* Título */}
      <h2
        className="h2"
        style={{
          fontWeight: 400,
          color: "#4a3728",
          marginBottom: "48px",
        }}
      >
        {t('plat.own.title')}
      </h2>

      {/* Chips de plataformas - Desktop */}
      <div className="hidden md:flex items-center justify-center gap-3 flex-wrap">
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
      </div>

      {/* Carousel infinito - Mobile */}
      <div ref={canaisScroll.ref} className="md:hidden overflow-hidden relative">
        <div
          className={`flex animate-scroll-infinite-seamless gap-3${canaisScroll.visible ? " is-playing" : ""}`}
          style={{ width: "max-content" }}
        >
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
      </div>
    </Reveal>

    {/* ── Divisor ── */}
    <div
      className="max-w-7xl mx-auto px-6 md:px-16"
      style={{ height: "1px", background: "rgba(196,164,142,0.35)", marginBottom: "60px" }}
    />

    {/* ── Bloco OTAs ── */}
    <Reveal className="max-w-7xl mx-auto px-6 md:px-16 text-center">
      {/* Label */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="w-10 h-px" style={{ background: BRAND_GREEN }} />
        <span
          className="text-[9px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: BRAND_GREEN_TEXT }}
        >
          {t('plat.ota.label')}
        </span>
      </div>

      {/* Título */}
      <h2
        className="h2"
        style={{
          fontWeight: 400,
          color: "#4a3728",
          marginBottom: "48px",
        }}
      >
        {t('plat.ota.title')}
      </h2>

      {/* Cards OTAs - Desktop */}
      <div className="hidden md:flex items-center justify-center gap-3 flex-wrap">
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
      </div>

      {/* Carousel infinito - Mobile */}
      <div ref={otasScroll.ref} className="md:hidden overflow-hidden relative">
        <div
          className={`flex animate-scroll-infinite-seamless gap-3${otasScroll.visible ? " is-playing" : ""}`}
          style={{ width: "max-content" }}
        >
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
      </div>
    </Reveal>

  </section>
  );
};

export default PlataformasSection;
