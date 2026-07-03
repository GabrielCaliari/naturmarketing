"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { trackButtonClick } from "@/lib/analytics";
import { useLocale } from "@/context/LocaleContext";

const BRAND_BROWN = "#994f2a";

export default function ConsultoriaBanner() {
  const { t } = useLocale();

  const handleClick = () => {
    trackButtonClick("cta_diagnostico", "/");
    window.open(t('cta.wa'), "_blank");
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col overflow-hidden px-6 md:px-16"
      style={{ minHeight: "80svh", background: "#2a1f14" }}
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/img/resource/seedsbackground.webp"
          alt=""
          fill
          quality={70}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(20,12,6,0.45)" }} />
      </div>

      <div
        className="relative z-10 flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto w-full"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}
      >
        {/* Badge */}
        <Reveal style={{ marginBottom: "1.75rem" }}>
          <span
            className="inline-flex items-center gap-2.5 text-[10px] font-medium tracking-[0.28em] uppercase px-5 py-2.5 rounded-full"
            style={{
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-white/60" />
            {t('cta.badge')}
          </span>
        </Reveal>

        {/* Título */}
        <Reveal
          as="h2"
          delay={120}
          style={{
            color: "#ffffff",
            marginBottom: "1.5rem",
            maxWidth: "900px",
            fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
            fontWeight: 700,
            lineHeight: "1.05",
            textAlign: "center",
          }}
        >
          {t('cta.title.1')}<br /> {t('cta.title.2')}{" "}
          {t('cta.title.3')}<br />
          {t('cta.title.4')}
        </Reveal>

        {/* Subtítulo */}
        <Reveal
          as="p"
          delay={240}
          style={{
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: "520px",
            margin: "0 auto 2.75rem",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.7,
          }}
        >
          {t('cta.body')}<br />
          <strong style={{ fontWeight: 600, color: "#ffffff" }}>
            {t('cta.body.strong')}
          </strong>
        </Reveal>

        {/* CTA */}
        <Reveal delay={360} className="flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={handleClick}
            className="inline-flex items-center px-8 py-3.5 rounded-full text-[12px] font-medium tracking-[0.1em] uppercase text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: BRAND_BROWN, letterSpacing: "0.08em" }}
          >
            {t('cta.btn')}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
