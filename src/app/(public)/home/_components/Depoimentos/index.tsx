"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";
import { DEPOIMENTOS, type Depoimento, type DepoimentoTexto, type DepoimentoVideo } from "@/data/depoimentos";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG_CARD     = "#FDFAF7";
const BORDER      = "rgba(196,164,142,0.2)";
const TEXT_HEAD   = "#1A0F08";
const TEXT_BODY   = "#6e5e52";
const TEXT_LABEL  = "#5d6b4c";

function Stars({ nota }: { nota?: 1 | 2 | 3 | 4 | 5 }) {
  if (!nota) return null;
  return (
    <div className="flex items-center gap-1">
      <span aria-hidden="true" className="flex items-center gap-1">
        {Array.from({ length: nota }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" style={{ fill: BRAND_BROWN }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5.46 5.32L17.82 22 12 18.27 6.18 22l1.28-7.41L2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </span>
      <span className="sr-only">Avaliação: {nota} de 5 estrelas</span>
    </div>
  );
}

function TextCard({ d }: { d: DepoimentoTexto }) {
  return (
    <div
      className="flex h-full flex-col justify-between gap-6 p-7 rounded-[14px] aspect-[4/5] md:aspect-auto"
      style={{ background: BG_CARD, border: `1px solid ${BORDER}`, minHeight: "300px" }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto md:overflow-visible min-h-0">
        <Stars nota={d.nota} />
        <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.65, color: TEXT_BODY }}>
          &ldquo;{d.texto}&rdquo;
        </p>
      </div>
      <div>
        <p style={{ fontSize: "13px", fontWeight: 500, color: TEXT_HEAD }}>
          {d.nome}
          {d.cargo ? `, ${d.cargo}` : ""}
        </p>
        <p style={{ fontSize: "12px", color: TEXT_BODY }}>
          {d.hotel} · {d.localidade}
        </p>
      </div>
    </div>
  );
}

function VideoCard({ d, t }: { d: DepoimentoVideo; t: (key: string) => string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ambas as árvores (grid desktop + carrossel mobile) ficam montadas o
  // tempo todo — só o CSS `display` alterna com o breakpoint. Se o vídeo
  // estiver aberto e o card deixar de estar visível (breakpoint mudou,
  // display:none foi aplicado, ou o card saiu de vista no scroll do
  // carrossel), o IntersectionObserver detecta a perda de interseção e
  // fechamos o player, desmontando o <video> — isso interrompe a
  // reprodução (e o áudio) de forma confiável, sem depender de pause()
  // manual nem de listeners de resize.
  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setOpen(false);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden rounded-[14px] aspect-[4/5] md:aspect-auto"
      style={{ border: `1px solid ${BORDER}`, minHeight: "300px" }}
    >
      {open ? (
        <video
          src={d.videoSrc}
          controls
          autoPlay
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        >
          {d.captionsSrc && (
            <track kind="captions" src={d.captionsSrc} srcLang="pt-BR" label="Português" default />
          )}
        </video>
      ) : (
        <>
          <Image
            src={d.posterSrc}
            alt=""
            fill
            quality={70}
            sizes="(min-width: 768px) 33vw, 90vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(15,12,9,0.65), transparent 55%)" }}
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`${t("depo.video.play")} ${d.nome}`}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
            style={{ width: "52px", height: "52px", background: "#fff" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: BRAND_BROWN, marginLeft: "2px" }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p style={{ fontSize: "13px", fontWeight: 500, color: "#fff" }}>
              {d.nome}
              {d.cargo ? `, ${d.cargo}` : ""}
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>
              {d.hotel} · {d.localidade}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function DepoimentoCard({ d, t }: { d: Depoimento; t: (key: string) => string }) {
  return d.tipo === "video" ? <VideoCard d={d} t={t} /> : <TextCard d={d} />;
}

// Vídeos primeiro (ordenação estável — preserva a ordem relativa dentro de
// cada grupo), como pedido no brief.
function ordenar(lista: Depoimento[]): Depoimento[] {
  return [...lista].sort((a, b) => {
    if (a.tipo === b.tipo) return 0;
    return a.tipo === "video" ? -1 : 1;
  });
}

export default function Depoimentos() {
  const { t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTicking = useRef(false);

  if (DEPOIMENTOS.length === 0) return null;

  const depoimentos = ordenar(DEPOIMENTOS);

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
    <section
      id="depoimentos"
      className="py-10 md:py-16"
      style={{ background: "#F0EBE3", borderTop: `1px solid ${BORDER}` }}
    >
      <div className="section-container">
        <Reveal className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: TEXT_LABEL,
              }}
            >
              {t("depo.label")}
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h2 className="h2" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
            {t("depo.h2")}{" "}
            <strong className="font-semibold" style={{ color: TEXT_HEAD }}>
              {t("depo.h2.strong")}
            </strong>
          </h2>
          <p className="paragraph max-w-lg" style={{ fontWeight: 300, color: TEXT_BODY }}>
            {t("depo.body")}
          </p>
        </Reveal>

        {/* Desktop grid — flex-wrap em vez de grid-cols fixo: com 1-6
            depoimentos (o que existir enquanto a lista real for pequena) os
            cards ficam centralizados em vez de espremidos numa coluna ou
            deixando um órfão colado à esquerda. */}
        <div className="hidden md:flex md:flex-wrap md:items-stretch justify-center gap-6">
          {depoimentos.map((d, i) => (
            <Reveal key={d.id} delay={i * 60} style={{ width: "calc(33.333% - 16px)", minWidth: "280px" }}>
              <DepoimentoCard d={d} t={t} />
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
                setActiveIndex(Math.round(track.scrollLeft / cardWidth));
              });
            }}
          >
            {depoimentos.map((d) => (
              <div key={d.id} className="flex-shrink-0 snap-center" style={{ width: "88%" }}>
                <DepoimentoCard d={d} t={t} />
              </div>
            ))}
          </div>

          {depoimentos.length > 1 && (
            <div className="flex items-center justify-center gap-1 mt-5">
              <button
                type="button"
                onClick={() => scrollTo(Math.max(activeIndex - 1, 0))}
                aria-label={t("depo.prev")}
                className="flex items-center justify-center"
                style={{ width: "24px", height: "24px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BRAND_BROWN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {depoimentos.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
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

              <button
                type="button"
                onClick={() => scrollTo(Math.min(activeIndex + 1, depoimentos.length - 1))}
                aria-label={t("depo.next")}
                className="flex items-center justify-center"
                style={{ width: "24px", height: "24px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BRAND_BROWN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
