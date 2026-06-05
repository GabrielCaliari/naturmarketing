"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/useMobileDevice";
import { useLocale } from "@/context/LocaleContext";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const faqKeys = ['faq.q1','faq.q2','faq.q3','faq.q4','faq.q5','faq.q6','faq.q7','faq.q8'];
const answerKeys = ['faq.a1','faq.a2','faq.a3','faq.a4','faq.a5','faq.a6','faq.a7','faq.a8'];

export default function FAQ() {
  const { isMobile } = useIsMobile({ breakpoint: 768 });
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const allFaqs = faqKeys.map((qk, i) => ({
    pergunta: t(qk),
    resposta: t(answerKeys[i]),
  }));

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  // No mobile exibimos menos itens para não ficar extenso; o schema FAQPage
  // abaixo usa exatamente `faqs` para nunca divergir do que está visível (§18.a.2).
  const faqs = isMobile ? allFaqs.slice(0, 5) : allFaqs;

  return (
    <section id="faq" className="py-10 md:py-16 px-6 md:px-16" style={{ background: "#F0EBE3" }}>
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

      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>
              {t('faq.label')}
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h2 className="h2" style={{ color: "#1A0F08", fontWeight: 400 }}>
            {t('faq.h2')}{" "}
            <strong className="font-semibold">{t('faq.h2.strong')}</strong>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl overflow-hidden"
              style={{ background: "#FDFAF7", border: "1px solid rgba(196,164,142,0.25)" }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-[17px] font-medium leading-snug" style={{ color: "#1A0F08" }}>
                  {faq.pergunta}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                  style={{ color: BRAND_BROWN }}
                >
                  <IconChevronDown size={18} stroke={2} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-6 pb-6 text-[16px] font-light leading-[1.85]" style={{ color: "#7a6a5e" }}>
                      {faq.resposta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
