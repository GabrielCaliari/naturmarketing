"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const faqs = [
  {
    pergunta: "Quanto tempo leva para ver os primeiros resultados?",
    resposta:
      "Os primeiros resultados aparecem entre 30 e 60 dias após o início das campanhas, com crescimento consistente nos meses seguintes. Resultados orgânicos (SEO) levam de 3 a 6 meses para ganhar tração. Entregamos relatórios semanais para que você acompanhe cada etapa.",
  },
  {
    pergunta: "Vocês atendem pequenas pousadas e boutique hotels?",
    resposta:
      "Sim. Atendemos desde boutique hotels e pousadas de charme até grandes resorts. O que nos importa é o potencial do empreendimento e o desejo de crescer com reservas diretas — não apenas o tamanho. Nossa estratégia é customizada para cada tipo de hospedagem.",
  },
  {
    pergunta: "Como funciona a gestão do Google Hotel Ads?",
    resposta:
      "Integramos seu motor de reservas ao Google Hotel Ads para que seu hotel apareça diretamente nos resultados de busca do Google com preço e disponibilidade em tempo real. Gerenciamos lances, segmentação e otimização contínua para maximizar reservas diretas com menor custo por conversão.",
  },
  {
    pergunta: "Preciso cancelar meu contrato com as OTAs para trabalhar com vocês?",
    resposta:
      "Não. Trabalhamos em paralelo com suas OTAs atuais. O objetivo é aumentar progressivamente o volume de reservas diretas até que você tenha autonomia para reduzir — ou eliminar — comissões conforme desejar. A transição é gradual e estratégica.",
  },
  {
    pergunta: "Qual é o investimento mínimo para começar?",
    resposta:
      "O investimento varia conforme os objetivos, canais e porte do empreendimento. Começamos com um diagnóstico estratégico gratuito para entender sua realidade e montar uma proposta personalizada. Não temos pacotes genéricos — cada estratégia é construída sob medida.",
  },
  {
    pergunta: "A Réserve atua em todo o Brasil?",
    resposta:
      "Sim, atendemos hotéis, resorts e pousadas em todo o território nacional. Nossa equipe opera de forma 100% digital, o que nos permite trabalhar com empreendimentos de qualquer região sem perda de qualidade ou agilidade.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-10 md:py-16 px-6 md:px-16"
      style={{ background: "#F0EBE3" }}
    >
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
              acceptedAnswer: {
                "@type": "Answer",
                text: f.resposta,
              },
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
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span
              className="text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: BRAND_GREEN }}
            >
              Dúvidas Frequentes
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h2
            className="h2"
            style={{ color: "#1A0F08", fontWeight: 400 }}
          >
            Perguntas sobre{" "}
            <strong className="font-semibold">Marketing Hoteleiro</strong>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl overflow-hidden"
              style={{
                background: "#FDFAF7",
                border: "1px solid rgba(196,164,142,0.25)",
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span
                  className="text-[17px] font-medium leading-snug"
                  style={{ color: "#1A0F08" }}
                >
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
                    <p
                      className="px-6 pb-6 text-[16px] font-light leading-[1.85]"
                      style={{ color: "#7a6a5e" }}
                    >
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
