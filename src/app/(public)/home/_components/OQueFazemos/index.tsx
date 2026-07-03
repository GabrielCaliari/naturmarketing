"use client";

import { useRef, useState } from "react";
import {
  IconBrandMeta,
  IconBrandGoogle,
} from "@tabler/icons-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG_CARD     = "#FDFAF7";
const BORDER      = "rgba(196,164,142,0.2)";
const TEXT_HEAD   = "#1A0F08";
const TEXT_BODY   = "#6e5e52";
// Verde para TEXTO sobre fundos claros — >= 4.5:1 (WCAG AA)
const TEXT_LABEL  = "#5d6b4c";

const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="3" />
    <path d="M16.5 7.5v.001" />
  </svg>
);

const CameraIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const SiteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const SEOIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18 17V9M13 17V5M8 17v-3" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const serviceIcons = [
  <InstagramIcon key="ig" />,
  <CameraIcon key="cam" />,
  <SiteIcon key="site" />,
  <IconBrandGoogle key="g" size={28} stroke={1.3} />,
  <IconBrandMeta key="meta" size={28} stroke={1.3} />,
  <SEOIcon key="seo" />,
  <AnalyticsIcon key="analytics" />,
  <WhatsAppIcon key="wa" />,
];

const serviceKeys = ['s1','s2','s3','s4','s5','s6','s7','s8'];

function BentoCard({ icon, titulo, descricao }: { icon: React.ReactNode; titulo: string; descricao: string }) {
  return (
    <div
      className={[
        "group flex flex-col items-center text-center gap-3 px-5 py-6 rounded-2xl h-full",
        "transition-all duration-500 cursor-default",
        "hover:bg-[#84936f] hover:shadow-lg hover:-translate-y-1",
      ].join(" ")}
      style={{ background: BG_CARD, border: `1px solid ${BORDER}`, minHeight: "220px" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-white/15"
        style={{ background: "rgba(132,147,111,0.12)", color: BRAND_GREEN }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <h3
          className="text-[15px] font-semibold leading-tight transition-colors duration-500 group-hover:text-white"
          style={{ color: TEXT_HEAD }}
        >
          {titulo}
        </h3>
        <p
          className="text-[13px] leading-[1.65] font-light transition-colors duration-500 group-hover:text-white/80"
          style={{ color: TEXT_BODY }}
        >
          {descricao}
        </p>
      </div>
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
    <section id="services" className="py-10 md:py-16" style={{ background: "#F0EBE3" }}>
      <div className="section-container">
        <Reveal className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: TEXT_LABEL }}>
              {t('services.label')}
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h2 className="h2" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
            {t('services.h2')}{" "}
            <strong className="font-semibold" style={{ color: TEXT_HEAD }}>
              {t('services.h2.strong')}
            </strong>
          </h2>
          <p className="paragraph max-w-lg italic" style={{ fontWeight: 300, color: TEXT_BODY }}>
            {t('services.body')}
          </p>
        </Reveal>

        {/* Desktop grid */}
        <div className="hidden md:flex md:flex-wrap justify-center gap-4">
          {servicos.map((s, i) => (
            <Reveal key={i} delay={i * 60} style={{ width: "calc(25% - 12px)", minWidth: "200px" }}>
              <BentoCard icon={s.icon} titulo={s.titulo} descricao={s.descricao} />
            </Reveal>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
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
                <BentoCard icon={s.icon} titulo={s.titulo} descricao={s.descricao} />
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

        {/* CTA strip */}
        <Reveal
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 rounded-2xl"
          style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
        >
          <p className="paragraph text-center sm:text-left" style={{ fontWeight: 300, color: TEXT_BODY }}>
            {t('services.cta.text')}{" "}
            <strong className="font-medium" style={{ color: TEXT_HEAD }}>
              {t('services.cta.strong')}
            </strong>
          </p>
          <a
            href={t('services.wa')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center px-6 py-3 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
          >
            {t('services.cta.btn')}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
