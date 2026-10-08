"use client";

import { IconX, IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

// Verde escurecido: >= 4.5:1 (WCAG AA) tanto como texto em fundo claro
// quanto como fundo de card com texto branco
const BRAND_GREEN_DARK = "#5d6b4c";
const BRAND_BROWN = "#994f2a";

export default function ComparativoSection() {
  const { t } = useLocale();

  const semItems = [
    t('comp.sem1'), t('comp.sem2'), t('comp.sem3'), t('comp.sem4'),
  ];
  const comItems = [
    t('comp.com1'), t('comp.com2'), t('comp.com3'), t('comp.com4'),
  ];

  return (
    <section className="py-10 md:py-16" style={{ background: "#F7F3EE" }}>
      <div className="section-container">
        <Reveal className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>
              {t('comp.label')}
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
          </div>
          <h2 className="h1">{t('comp.h2')}</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* Sem estrutura */}
          <div className="flex flex-col gap-3">
            <Reveal className="mb-3">
              <span className="text-[32px] font-light" style={{ color: "rgba(26,15,8,0.5)", fontFamily: "var(--font-body)" }}>
                {t('comp.left')}
              </span>
            </Reveal>
            {semItems.map((item, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{ background: "#FDFAF7", border: "1px solid rgba(196,164,142,0.22)" }}
              >
                <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(180,80,65,0.1)", color: "rgba(180,80,65,0.7)" }}>
                  <IconX size={13} stroke={2.5} />
                </div>
                <span className="text-[15px] font-light" style={{ color: "rgba(26,15,8,0.6)" }}>{item}</span>
              </Reveal>
            ))}
          </div>

          {/* Com a Réserve */}
          <div className="flex flex-col gap-3">
            <Reveal className="mb-3">
              <span className="text-[32px]" style={{ color: BRAND_GREEN_DARK, fontWeight: 400 }}>
                {t('comp.right')}{" "}
                <span style={{ fontFamily: "var(--font-logo)", fontWeight: 400 }}>réserve</span>
              </span>
            </Reveal>
            {comItems.map((item, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{ background: BRAND_GREEN_DARK }}
              >
                <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
                  <IconCheck size={13} stroke={2.5} />
                </div>
                <span className="text-[15px] font-light" style={{ color: "rgba(255,255,255,0.92)" }}>{item}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={340} className="text-center mt-8">
          <span className="text-[13px] font-light" style={{ color: "rgba(26,15,8,0.55)" }}>
            {t('comp.footnote.text')}
            <Link
              href="/blog/agencia-marketing-hoteleiro-vs-agencia-generica"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              style={{ color: BRAND_GREEN_DARK }}
            >
              {t('comp.footnote.link')}
            </Link>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
