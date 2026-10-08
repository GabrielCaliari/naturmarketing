"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

const BRAND_BROWN = "#994f2a";
// Verde para TEXTO sobre fundos claros — >= 4.5:1 (WCAG AA); o tom de marca
// (#84936f) só decora. O mesmo tom serve de fundo do selo, com texto branco.
const BRAND_GREEN_TEXT = "#5d6b4c";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#5C4F45";

const TransformSection = () => {
  const { t } = useLocale();

  const handleContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="transform" className="py-16 md:py-24 overflow-hidden" style={{ background: "#F7F3EE" }}>
      <div className="section-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

        <Reveal from="left" className="flex flex-col">
          {/* Eyebrow */}
          <p className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 shrink-0" style={{ background: BRAND_BROWN }} />
            <span
              className="text-[11px] font-semibold uppercase"
              style={{ letterSpacing: "0.3em", color: BRAND_BROWN }}
            >
              {t('transform.label')}
            </span>
          </p>

          <h2
            className="mt-8 max-w-xl text-4xl md:text-5xl xl:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: TEXT_HEAD,
            }}
          >
            {t('transform.h3.1')}{" "}
            <span style={{ fontStyle: "italic", color: BRAND_GREEN_TEXT }}>
              {t('transform.h3.1.highlight')}
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-[18px] leading-[1.75]" style={{ fontWeight: 300, color: TEXT_BODY }}>
            {t('transform.h3.2')}{" "}
            <strong className="font-semibold" style={{ color: BRAND_GREEN_TEXT }}>
              {t('transform.h3.highlight')}
            </strong>{" "}
            {t('transform.h3.end')} {t('transform.body')}{" "}
            <strong className="font-semibold" style={{ color: TEXT_HEAD }}>
              {t('transform.body.strong')}
            </strong>
          </p>

          <button
            onClick={handleContact}
            className="group mt-10 inline-flex items-center gap-3 self-start transition-opacity duration-300 hover:opacity-80"
          >
            <span
              className="text-[12px] font-bold uppercase"
              style={{ letterSpacing: "0.2em", color: BRAND_BROWN }}
            >
              {t('transform.cta')}
            </span>
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300"
              style={{ border: `1px solid rgba(153,79,42,0.4)` }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND_BROWN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </Reveal>

        <Reveal from="right" delay={180} className="relative">
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "4/3", boxShadow: "0 20px 50px rgba(26,15,8,0.18)" }}
          >
            <Image
              src="/img/resource/hotel-reception.jpg"
              alt={t('transform.alt')}
              fill
              quality={70}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Selo: fundo no verde escurecido para o texto branco de 11px
              manter >= 4.5:1 (o #84936f do layout original não passa). */}
          <div
            className="absolute -bottom-6 -left-6 hidden rounded-2xl px-8 py-6 md:block"
            style={{ background: BRAND_GREEN_TEXT, boxShadow: "0 12px 30px rgba(26,15,8,0.2)" }}
          >
            <p
              className="text-4xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 1.1, color: "#ffffff" }}
            >
              {t('transform.badge.value')}
            </p>
            <p
              className="mt-1 text-[11px] font-medium uppercase"
              style={{ letterSpacing: "0.08em", color: "rgba(255,255,255,0.88)" }}
            >
              {t('transform.badge.label')}
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default TransformSection;
