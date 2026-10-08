"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";

const BRAND_BROWN = "#994f2a";
const BRAND_BROWN_LIGHT = "#c4a48e";

export default function ConsultoriaBanner() {
  const { t } = useLocale();

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "#1A0F08" }}>
      {/* Foto de fundo. alt="" + aria-hidden: é imagem de apoio atrás do
          texto — toda a informação já está no h2/subtítulo. */}
      <Image
        src="/img/resource/cta-dark-lobby.jpg"
        alt=""
        aria-hidden="true"
        fill
        quality={70}
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradiente lateral: escuro à esquerda, onde mora o texto — garante o
          contraste AA do texto branco sobre a foto. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, rgba(26,15,8,0.95) 0%, rgba(26,15,8,0.78) 45%, rgba(26,15,8,0.40) 100%)",
        }}
      />

      <div className="section-container relative z-10 py-24 md:py-32 lg:py-40">
        {/* Eyebrow */}
        <Reveal as="p" className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-10 shrink-0"
            style={{ background: "var(--color-text-muted-on-dark)" }}
          />
          <span
            className="text-[11px] font-semibold uppercase"
            style={{ letterSpacing: "0.3em", color: "var(--color-text-muted-on-dark)" }}
          >
            {t('cta.badge')}
          </span>
        </Reveal>

        <Reveal
          as="h2"
          delay={120}
          className="mt-8 max-w-3xl text-4xl md:text-6xl xl:text-7xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            lineHeight: 1.06,
            color: "var(--color-text-on-dark)",
          }}
        >
          {t('cta.title.1')} {t('cta.title.2')}{" "}
          <span style={{ fontStyle: "italic", color: BRAND_BROWN_LIGHT }}>{t('cta.title.3')}</span>{" "}
          {t('cta.title.4')}
        </Reveal>

        {/* Subtítulo */}
        <Reveal
          as="p"
          delay={240}
          className="mt-8 max-w-xl text-[18px] leading-[1.75]"
          style={{ fontWeight: 300, color: "var(--color-text-muted-on-dark)" }}
        >
          {t('cta.body')}{" "}
          <strong style={{ fontWeight: 600, color: "var(--color-text-on-dark)" }}>
            {t('cta.body.strong')}
          </strong>
        </Reveal>

        {/* CTA */}
        <Reveal delay={360} className="mt-10">
          <DiagnosticoCTA
            trackId="cta_diagnostico"
            source="/"
            className="group inline-flex items-center gap-3 rounded-full px-10 py-5 text-[12px] font-bold uppercase text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{ background: BRAND_BROWN, letterSpacing: "0.15em" }}
          >
            {t('cta.btn')}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </DiagnosticoCTA>
        </Reveal>
      </div>
    </section>
  );
}
