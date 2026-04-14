"use client";

import { motion } from "framer-motion";
import BackgroundImage from "./../../../../../../public/img/resource/house1.png";

const BRAND_BROWN = "#994f2a";

const Banner = () => {
  const handleScroll = () => {
    document.getElementById("transform")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Imagem de fundo full */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={BackgroundImage.src}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Gradiente da esquerda para direita — branco sólido à esq, transparente à dir */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0.15) 65%, transparent 100%)",
          }}
        />
        {/* Gradiente sutil de baixo para cima */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Conteúdo — alinhado à esquerda */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto px-8 md:px-16"
        style={{ paddingTop: "80px", paddingBottom: "40px" }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: "1.5rem" }}
        >
          <span
            className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full"
            style={{
              color: "#3a2518",
              border: "1px solid rgba(58,37,24,0.25)",
              background: "rgba(255,255,255,0.6)",
              letterSpacing: "0.2em",
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#3a2518" }} />
            Agência de Marketing Hoteleiro
          </span>
        </motion.div>

        {/* Título — serif grande, à esquerda */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: "'PP Hatton Medium', Georgia, serif",
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            fontWeight: 500,
            lineHeight: 1.05,
            color: "#1A0F08",
            marginBottom: "1.25rem",
            maxWidth: "620px",
          }}
        >
          A agência de marketing<br />
          para hotéis que{" "}
          <em style={{ fontStyle: "italic", color: "#1A0F08" }}>converte.</em>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.65,
            color: "#3a2518",
            marginBottom: "2.5rem",
            maxWidth: "400px",
          }}
        >
          Mais reservas diretas. Menos OTAs.{" "}
          <strong style={{ fontWeight: 600, color: "#1A0F08" }}>
            Canal próprio trabalhando pelo seu hotel 24h.
          </strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="flex flex-wrap items-center gap-6"
        >
          <a
            href="https://wa.me/5535998067432?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3.5 text-[11px] font-medium tracking-[0.15em] uppercase text-white transition-all duration-300 hover:opacity-90"
            style={{ background: "#1A0F08", letterSpacing: "0.12em" }}
          >
            Começar Consultoria
          </a>

          <button
            onClick={handleScroll}
            className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ color: "#3a2518" }}
          >
            <div className="w-8 h-px" style={{ background: "#3a2518" }} />
            Nosso Portfólio
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export { Banner };
