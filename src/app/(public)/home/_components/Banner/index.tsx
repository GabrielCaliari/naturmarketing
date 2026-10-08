"use client";

import Image from "next/image";
import HeroImage from "./../../../../../../public/img/resource/hotel-pool.jpg";
import { useLocale } from "@/context/LocaleContext";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";

// Faixa de números do rodapé do hero. Só os índices ficam aqui — os textos
// vêm do dicionário para não escapar do i18n.
const STAT_INDEXES = [1, 2, 3, 4] as const;

const Banner = () => {
  const { t } = useLocale();

  const handleScroll = () => {
    // Depoimentos só existe no DOM quando há depoimento cadastrado (a seção
    // renderiza null com a lista vazia) — cai para #transform nesse caso.
    const target = document.getElementById("depoimentos") ?? document.getElementById("transform");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="banner-section relative overflow-hidden">
      {/* Foto de fundo. alt="" + aria-hidden: é imagem de apoio atrás do
          texto — toda a informação já está no h1/subtítulo, e anunciá-la
          antes do título só adiciona ruído no leitor de tela.
          priority + fetchPriority: é o LCP em todos os breakpoints (agora a
          foto cobre a seção inteira, não só metade), por isso uma <Image> só
          em vez das duas variantes por breakpoint de antes. */}
      <Image
        src={HeroImage}
        alt=""
        aria-hidden="true"
        fill
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
        placeholder="blur"
      />

      {/* Gradiente: escuro na base (onde mora o texto) e quase limpo no topo,
          para a foto respirar. Garante o contraste AA do texto branco. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, rgba(26,15,8,0.90) 0%, rgba(26,15,8,0.45) 50%, rgba(26,15,8,0.25) 100%)",
        }}
      />

      {/* section-container: mesmo max-width (1440px) e mesmo padding lateral
          do header — é o que alinha o conteúdo do hero com o logo. */}
      <div className="section-container banner-inner relative z-10 flex flex-col justify-end">

        {/* Eyebrow */}
        <p className="hero-fade-up flex items-center gap-4">
          <span
            aria-hidden="true"
            style={{ width: "40px", height: "1px", background: "var(--color-text-muted-on-dark)", flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-text-muted-on-dark)",
            }}
          >
            {t('banner.badge')}
          </span>
        </p>

        {/* Título */}
        <h1
          className="hero-rise hero-delay-1 mt-8 max-w-4xl text-5xl md:text-7xl xl:text-[84px]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            lineHeight: 1.04,
            color: "var(--color-text-on-dark)",
          }}
        >
          {t('banner.title.1')}{" "}
          {/* Itálico de verdade: a DM Serif Display carrega a face italic
              (ver app/layout.tsx), então não há oblíquo sintético aqui. */}
          <span style={{ fontStyle: "italic", color: "var(--color-brand-brown-light)" }}>
            {t('banner.title.2')}
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className="hero-fade-up hero-delay-2 mt-8 max-w-xl"
          style={{
            fontSize: "18px",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "var(--color-text-muted-on-dark)",
          }}
        >
          {t('banner.subtitle')}{" "}
          <strong style={{ fontWeight: 600, color: "var(--color-text-on-dark)" }}>
            {t('banner.subtitle.strong')}
          </strong>
        </p>

        {/* CTAs */}
        <div className="hero-fade-up hero-delay-3 mt-10 flex flex-wrap items-center gap-6">
          <DiagnosticoCTA
            trackId="cta_home_hero"
            source="/"
            className="inline-flex items-center transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
            style={{
              background: "var(--color-brand-brown)",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "16px 32px",
              borderRadius: "999px",
            }}
          >
            {t('banner.cta.primary')}
          </DiagnosticoCTA>

          <button
            onClick={handleScroll}
            className="inline-flex items-center gap-3 transition-colors duration-300"
          >
            <span
              className="hero-arrow-bounce"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1V11M6 11L1 6M6 11L11 6" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-text-muted-on-dark)",
              }}
            >
              {t('banner.cta.secondary')}
            </span>
          </button>
        </div>

        {/* Números */}
        <div
          className="hero-fade-up hero-delay-3 mt-16 grid grid-cols-2 gap-8 pt-8 md:grid-cols-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          {STAT_INDEXES.map((i) => (
            <div key={i}>
              <p
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: "var(--color-text-on-dark)",
                }}
              >
                {t(`banner.stat.${i}.value`)}
              </p>
              <p
                className="mt-2"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                  color: "var(--color-text-muted-on-dark)",
                }}
              >
                {t(`banner.stat.${i}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Banner };
