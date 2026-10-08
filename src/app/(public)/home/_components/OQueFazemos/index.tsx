"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";
import ClientesCarousel from "../ClientesCarousel";

const BRAND_BROWN = "#994f2a";
const BG_CARD     = "#FDFAF7";
const BORDER      = "rgba(26,15,8,0.10)";
const TEXT_HEAD   = "#1A0F08";
const TEXT_BODY   = "#5C4F45";
// Verde para TEXTO/ícone sobre fundos claros — >= 4.5:1 (WCAG AA)
const TEXT_GREEN  = "#5d6b4c";

// Ícones do layout de referência (Lucide: share-2, clapperboard,
// monitor-smartphone, search, megaphone, trending-up, bar-chart-3 e
// message-circle), inline em vez de instalar a lucide-react só por oito
// desenhos — é a mesma convenção dos SVGs que já existiam aqui.
const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const serviceIcons = [
  // Gestão de canais digitais
  <Icon key="share">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </Icon>,
  // Produção audiovisual
  <Icon key="clapperboard">
    <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
    <path d="m6.2 5.3 3.1 3.9" />
    <path d="m12.4 3.4 3.1 4" />
    <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  </Icon>,
  // Sites e landing pages
  <Icon key="monitor">
    <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
    <path d="M10 19v-3.96 3.15" />
    <path d="M7 19h5" />
    <rect width="6" height="10" x="16" y="12" rx="2" />
  </Icon>,
  // Google Ads & Hotel Ads
  <Icon key="search">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>,
  // Meta Ads
  <Icon key="megaphone">
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </Icon>,
  // SEO hoteleiro
  <Icon key="trending">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Icon>,
  // Relatórios de performance
  <Icon key="chart">
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </Icon>,
  // Chatbot e automação
  <Icon key="message">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </Icon>,
];

const serviceKeys = ['s1','s2','s3','s4','s5','s6','s7','s8'];

function ServiceCard({ icon, titulo, descricao }: { icon: React.ReactNode; titulo: string; descricao: string }) {
  return (
    <div
      className={[
        "group flex h-full flex-col rounded-2xl p-8 md:p-7",
        "min-h-[260px] md:min-h-[240px]",
        "transition-all duration-500 cursor-default",
        "hover:-translate-y-1 hover:shadow-xl",
      ].join(" ")}
      style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
    >
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors duration-500 group-hover:bg-[#5d6b4c] group-hover:text-white"
        style={{ background: "rgba(132,147,111,0.15)", color: TEXT_GREEN }}
      >
        {icon}
      </span>

      <h3
        className="mt-6 text-[20px] md:text-[19px]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 1.3, color: TEXT_HEAD }}
      >
        {titulo}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.7] font-light" style={{ color: TEXT_BODY }}>
        {descricao}
      </p>
    </div>
  );
}

export default function OQueFazemos() {
  const { t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTicking = useRef(false);

  const servicos = serviceKeys.map((k, i) => ({
    icon: serviceIcons[i],
    titulo: t(`${k}.title`),
    descricao: t(`${k}.desc`),
  }));

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    const trackWidth = track.offsetWidth;
    const cardWidth = card.offsetWidth;
    const scrollLeft = card.offsetLeft - (trackWidth - cardWidth) / 2;
    track.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section id="services" className="py-16 md:py-24" style={{ background: "#F0EBE3" }}>
      <div className="section-container">
        <Reveal className="flex flex-col">
          {/* Eyebrow */}
          <p className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 shrink-0" style={{ background: BRAND_BROWN }} />
            <span className="text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.3em", color: BRAND_BROWN }}>
              {t('services.label')}
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="max-w-2xl text-4xl md:text-5xl xl:text-6xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 1.08, color: TEXT_HEAD }}
            >
              {t('services.h2')}{" "}
              <span style={{ fontStyle: "italic", color: TEXT_GREEN }}>{t('services.h2.strong')}</span>
            </h2>
            <p className="max-w-sm text-[14px] leading-[1.7] font-light" style={{ color: TEXT_BODY }}>
              {t('services.body')}
            </p>
          </div>
        </Reveal>

        {/* Desktop grid */}
        <div className="mt-12 hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicos.map((s, i) => (
            <Reveal key={i} delay={i * 60} className="h-full">
              <ServiceCard icon={s.icon} titulo={s.titulo} descricao={s.descricao} />
            </Reveal>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-10 md:hidden">
          <div
            ref={trackRef}
            className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={() => {
              if (scrollTicking.current) return;
              scrollTicking.current = true;
              window.requestAnimationFrame(() => {
                scrollTicking.current = false;
                const track = trackRef.current;
                if (!track) return;
                const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth + 12;
                setActiveIndex(Math.round((track.scrollLeft) / cardWidth));
              });
            }}
          >
            {servicos.map((s, i) => (
              <div key={i} className="flex-shrink-0 snap-center" style={{ width: "100%" }}>
                <ServiceCard icon={s.icon} titulo={s.titulo} descricao={s.descricao} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-5">
            {servicos.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="flex items-center justify-center"
                style={{ width: "24px", height: "24px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <span
                  className="rounded-full transition-all duration-300 block"
                  style={{
                    width: activeIndex === i ? "20px" : "6px",
                    height: "6px",
                    background: activeIndex === i ? BRAND_BROWN : "rgba(153,79,42,0.25)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carrossel de fotos de clientes — full-bleed entre os cards e o CTA */}
      <div className="mt-10 md:mt-14">
        <ClientesCarousel />
      </div>

      <div className="section-container">
        {/* CTA strip */}
        <Reveal
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 rounded-2xl"
          style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
        >
          <p className="paragraph text-center sm:text-left" style={{ fontWeight: 300, color: TEXT_BODY }}>
            {t('services.cta.text')}{" "}
            <strong className="font-medium" style={{ color: TEXT_HEAD }}>
              {t('services.cta.strong')}
            </strong>
          </p>
          <DiagnosticoCTA
            trackId="cta_services_strip"
            source="/"
            className="shrink-0 inline-flex items-center px-6 py-3 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
          >
            {t('services.cta.btn')}
          </DiagnosticoCTA>
        </Reveal>
      </div>
    </section>
  );
}
