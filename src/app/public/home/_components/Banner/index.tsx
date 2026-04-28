"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BackgroundImage from "./../../../../../../public/img/resource/background.png";

const Banner = () => {
  const handleScroll = () => {
    document.getElementById("transform")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Imagem de fundo com blur */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={BackgroundImage}
          alt=""
          fill
          priority={true}
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
        />
        {/* Overlay marrom para contraste */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(90, 45, 15, 0.62)" }}
        />
      </div>

      {/* Conteúdo centralizado */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center items-center text-center section-container"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: "1.75rem" }}
        >
          <span
            className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-5 py-2.5 rounded-full"
            style={{
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-white/70" />
            Agência de Marketing Hoteleiro
          </span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            color: "#ffffff",
            marginBottom: "1.5rem",
            maxWidth: "900px",
            fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
            fontWeight: 700,
            lineHeight: "1.05",
          }}
        >
          A agência de<br /> marketing
          para hotéis<br /> que{" "}
          converte.
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            marginBottom: "2.75rem",
            maxWidth: "520px",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.7,
          }}
        >
          Mais reservas diretas. Menos OTAs.<br />{" "}
          <strong style={{ fontWeight: 600, color: "#ffffff" }}>
            Canal próprio trabalhando pelo seu hotel 24h.
          </strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href="https://wa.me/553597742984?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 rounded-full text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "#ffffff", color: "#1A0F08", letterSpacing: "0.08em" }}
          >
            Diagnóstico Gratuito
          </a>

          <button
            onClick={handleScroll}
            className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 hover:text-white"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <motion.span
              style={{
                borderColor: "rgba(255,255,255,0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.35)",
                flexShrink: 0,
              }}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1V11M6 11L1 6M6 11L11 6" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
            Explorar
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export { Banner };
