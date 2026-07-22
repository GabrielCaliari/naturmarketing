"use client";

import Image from "next/image";
import BackgroundImage from "./../../../../../../public/img/resource/background.webp";
import { useLocale } from "@/context/LocaleContext";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";

const Banner = () => {
  const { t } = useLocale();

  const handleScroll = () => {
    document.getElementById("transform")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex flex-col overflow-hidden banner-section"
      style={{ minHeight: "100svh" }}
    >
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
        {/* Gradiente em vez de overlay chapado: escurece só as faixas que
            sustentam o texto (badge no topo, CTAs na base) e deixa a foto
            aparecer no meio. Tom 60,30,10 é menos saturado que o marrom
            anterior, então não tinge a imagem de laranja. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(60,30,10,0.55) 0%, rgba(60,30,10,0.22) 45%, rgba(60,30,10,0.60) 100%)",
          }}
        />
      </div>

      <div
        className="relative z-10 flex-1 flex flex-col justify-center items-center text-center section-container"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        {/* Badge */}
        <div className="hero-fade-up" style={{ marginBottom: "1.75rem" }}>
          <span
            className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-5 py-2.5 rounded-full"
            style={{
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-white/70" />
            {t('banner.badge')}
          </span>
        </div>

        {/* Título */}
        <h1
          className="hero-rise hero-delay-1"
          style={{
            color: "#ffffff",
            marginBottom: "1.5rem",
            maxWidth: "900px",
            fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
            fontWeight: 700,
            lineHeight: "1.05",
            // Compensa a faixa central clara do gradiente: garante contraste do
            // branco sobre as regiões mais claras da foto.
            textShadow: "0 1px 12px rgba(0,0,0,0.35)",
          }}
        >
          {t('banner.title.1')}<br /> {t('banner.title.2')}
          <br />{t('banner.title.3')}<br /> {t('banner.title.4')}{" "}
          {t('banner.title.5')}
        </h1>

        {/* Subtítulo */}
        <p
          className="hero-fade-up hero-delay-2"
          style={{
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            marginBottom: "2.75rem",
            maxWidth: "520px",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.7,
            textShadow: "0 1px 10px rgba(0,0,0,0.35)",
          }}
        >
          {t('banner.subtitle')}<br />{" "}
          <strong style={{ fontWeight: 600, color: "#ffffff" }}>
            {t('banner.subtitle.strong')}
          </strong>
        </p>

        {/* CTAs */}
        <div className="hero-fade-up hero-delay-3 flex flex-wrap items-center justify-center gap-5">
          <DiagnosticoCTA
            trackId="cta_home_hero"
            source="/"
            className="inline-flex items-center px-8 py-3.5 rounded-full text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
            style={{ background: "#ffffff", color: "#1A0F08", letterSpacing: "0.08em" }}
          >
            {t('banner.cta.primary')}
          </DiagnosticoCTA>

          <button
            onClick={handleScroll}
            className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 hover:text-white"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <span
              className="hero-arrow-bounce"
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
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1V11M6 11L1 6M6 11L11 6" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {t('banner.cta.secondary')}
          </button>
        </div>
      </div>
    </section>
  );
};

export { Banner };
