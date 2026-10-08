"use client";

import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

const BRAND_BROWN = "#994f2a";
const BRAND_BROWN_LIGHT = "#c4a48e";
const TEXT_HEAD = "#1A0F08";

export default function ParaQuemFazemos() {
  const { t } = useLocale();

  const publicos = [
    {
      image: "/img/resource/segment-resort.jpg",
      labelKey: 'para.p1.label',
      titleKey: 'para.p1.title',
      descKey: 'para.p1.desc',
    },
    {
      image: "/img/resource/segment-pousada.jpg",
      labelKey: 'para.p2.label',
      titleKey: 'para.p2.title',
      descKey: 'para.p2.desc',
    },
    {
      image: "/img/resource/segment-airbnb.jpg",
      labelKey: 'para.p3.label',
      titleKey: 'para.p3.title',
      descKey: 'para.p3.desc',
    },
  ];

  const handleContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="para-quem-fazemos" className="py-16 md:py-24" style={{ background: "#F7F3EE" }}>
      <div className="section-container">
        <Reveal className="flex flex-col">
          {/* Eyebrow */}
          <p className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 shrink-0" style={{ background: BRAND_BROWN }} />
            <span className="text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.3em", color: BRAND_BROWN }}>
              {t('para.label')}
            </span>
          </p>

          <h2
            className="mt-8 max-w-3xl text-4xl md:text-5xl xl:text-6xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 1.08, color: TEXT_HEAD }}
          >
            {t('para.h2')}{" "}
            <span style={{ fontStyle: "italic", color: "#5d6b4c" }}>{t('para.h2.strong')}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {publicos.map((p, i) => (
            <Reveal
              key={i}
              as="article"
              delay={i * 100}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                <Image
                  src={p.image}
                  alt={t(p.titleKey)}
                  fill
                  quality={70}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradiente: escuro na base, onde mora o texto — garante o
                  contraste AA do texto branco sobre a foto. */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,15,8,0.92) 0%, rgba(26,15,8,0.55) 45%, rgba(26,15,8,0.15) 100%)",
                }}
              />

              <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                <p
                  className="text-[10px] font-semibold uppercase"
                  style={{ letterSpacing: "0.25em", color: BRAND_BROWN_LIGHT }}
                >
                  {t(p.labelKey)}
                </p>

                <h3
                  className="mt-3 text-[26px] md:text-[28px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: "var(--color-text-on-dark)",
                  }}
                >
                  {t(p.titleKey)}
                </h3>

                <p
                  className="mt-3 text-[14px] font-light leading-[1.75]"
                  style={{ color: "var(--color-text-muted-on-dark)" }}
                >
                  {t(p.descKey)}
                </p>

                <button
                  onClick={handleContact}
                  className="group/btn mt-6 inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
                >
                  <span
                    className="text-[10px] font-bold uppercase"
                    style={{ letterSpacing: "0.2em", color: "var(--color-text-on-dark)" }}
                  >
                    {t('para.learnmore')}
                  </span>
                  <IconArrowRight
                    size={14}
                    stroke={2}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    style={{ color: BRAND_BROWN_LIGHT }}
                  />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
