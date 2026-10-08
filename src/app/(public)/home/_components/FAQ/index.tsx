"use client";

import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import Reveal from "@/components/Reveal";
import { useIsMobile } from "@/hooks/useMobileDevice";
import { useLocale } from "@/context/LocaleContext";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";

const BRAND_BROWN = "#994f2a";
// Verde para TEXTO sobre fundos claros — >= 4.5:1 (WCAG AA)
const BRAND_GREEN_TEXT = "#5d6b4c";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#5C4F45";
const HAIRLINE = "rgba(26,15,8,0.12)";

const faqKeys = ['faq.q1','faq.q2','faq.q3','faq.q4','faq.q5','faq.q6','faq.q7','faq.q8'];
const answerKeys = ['faq.a1','faq.a2','faq.a3','faq.a4','faq.a5','faq.a6','faq.a7','faq.a8'];

export default function FAQ() {
  const { isMobile } = useIsMobile({ breakpoint: 768 });
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const allFaqs = faqKeys.map((qk, i) => ({
    pergunta: t(qk),
    resposta: t(answerKeys[i]),
  }));

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  // No mobile exibimos menos itens para não ficar extenso; o schema FAQPage
  // abaixo usa exatamente `faqs` para nunca divergir do que está visível (§18.a.2).
  const faqs = isMobile ? allFaqs.slice(0, 5) : allFaqs;

  return (
    <section id="faq" className="py-16 md:py-24" style={{ background: "#F0EBE3" }}>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.pergunta,
              acceptedAnswer: { "@type": "Answer", text: f.resposta },
            })),
          }),
        }}
      />

      <div className="section-container grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        {/* Coluna esquerda: título + CTA */}
        <Reveal from="left" className="flex flex-col">
          <p className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 shrink-0" style={{ background: BRAND_BROWN }} />
            <span className="text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.3em", color: BRAND_BROWN }}>
              {t('faq.label')}
            </span>
          </p>

          <h2
            className="mt-8 text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 1.08, color: TEXT_HEAD }}
          >
            {t('faq.h2')}{" "}
            <span style={{ fontStyle: "italic", color: BRAND_GREEN_TEXT }}>{t('faq.h2.strong')}</span>
          </h2>

          <p className="mt-6 max-w-md text-[14px] font-light leading-[1.75]" style={{ color: TEXT_BODY }}>
            {t('faq.desc')}
          </p>

          <DiagnosticoCTA
            trackId="cta_faq"
            source="/"
            className="mt-8 self-start inline-flex items-center rounded-full px-8 py-4 text-[12px] font-bold uppercase text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{ background: BRAND_BROWN, letterSpacing: "0.15em" }}
          >
            {t('faq.cta')}
          </DiagnosticoCTA>
        </Reveal>

        {/* Coluna direita: acordeão */}
        <div style={{ borderTop: `1px solid ${HAIRLINE}` }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className="text-[18px] md:text-[20px] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      lineHeight: 1.3,
                      color: isOpen ? BRAND_GREEN_TEXT : TEXT_HEAD,
                    }}
                  >
                    {faq.pergunta}
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
                    style={{
                      border: `1px solid ${isOpen ? BRAND_BROWN : HAIRLINE}`,
                      background: isOpen ? BRAND_BROWN : "transparent",
                      color: isOpen ? "#ffffff" : TEXT_HEAD,
                    }}
                  >
                    <IconPlus size={16} stroke={2} />
                  </span>
                </button>

                <div className={`accordion-panel ${isOpen ? "accordion-open" : ""}`}>
                  <div className="accordion-inner">
                    <p className="max-w-2xl pb-6 text-[15px] font-light leading-[1.85]" style={{ color: TEXT_BODY }}>
                      {faq.resposta}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
