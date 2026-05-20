"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/useMobileDevice";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

// Top 5 FAQs para mobile, todas para desktop
const allFaqs = [
  {
    pergunta: "Qual a diferença entre contratar a Réserve e uma agência de marketing genérica?",
    resposta:
      "Uma agência generalista trata um hotel como qualquer outro negócio. A Réserve entende a sazonalidade do setor, a dinâmica das OTAs, o comportamento do hóspede no funil de reserva, o Google Hotel Ads e as estratégias específicas para aumentar a taxa de ocupação direta. Campanhas mal configuradas por quem não conhece a hotelaria desperdiçam orçamento e não geram reservas — a diferença no resultado é significativa.",
  },
  {
    pergunta: "É possível reduzir a dependência das OTAs sem perder ocupação?",
    resposta:
      "Sim. A estratégia é usar as OTAs como vitrine e redirecionar a demanda para o canal direto com benefícios exclusivos: melhor tarifa no site próprio, early check-in, café da manhã incluso. Com site otimizado, motor de reservas eficiente e campanhas direcionadas, hotéis conseguem migrar de 80% de dependência de OTA para 40–50%, mantendo a ocupação e aumentando a margem por reserva.",
  },
  {
    pergunta: "Quanto devo investir em marketing para o meu hotel ou pousada?",
    resposta:
      "O referencial de mercado é de 4% a 6% da receita anual. Para um hotel com meta de R$1.000.000 em faturamento, isso representa R$40.000 a R$60.000 por ano. Compare esse valor com o que você já paga em comissões para OTAs — que costumam variar entre 15% e 30% por reserva. Na maioria dos casos, o marketing próprio gera reservas com custo muito menor do que ficar dependente de plataformas.",
  },
  {
    pergunta: "Meu hotel precisa de um site próprio se já aparece no Booking e no Airbnb?",
    resposta:
      "Com certeza. Estudos mostram que mais da metade dos viajantes que encontram um hotel numa OTA visita o site próprio antes de reservar. Um site próprio com motor de reservas elimina a comissão, permite personalizar a experiência do hóspede e é o principal ativo para qualquer estratégia de SEO e tráfego pago. Sem ele, você depende 100% das condições e algoritmos das plataformas.",
  },
  {
    pergunta: "Como funciona a gestão do Google Hotel Ads?",
    resposta:
      "O Google Hotel Ads exibe o preço e a disponibilidade do seu hotel diretamente nos resultados de busca e no Google Maps, ao lado das OTAs. Integramos seu motor de reservas ao Google, gerenciamos lances e segmentação, e otimizamos continuamente para maximizar reservas diretas com o menor custo por conversão — capturando hóspedes no exato momento em que estão prontos para reservar.",
  },
  {
    pergunta: "Quanto tempo leva para ver os primeiros resultados?",
    resposta:
      "Campanhas de tráfego pago (Google Ads, Meta Ads) podem gerar reservas em poucos dias. SEO e inbound marketing têm resultados crescentes e consistentes a partir de 3 a 6 meses. A estratégia ideal combina os dois: tráfego pago para resultados imediatos e SEO + conteúdo para construir uma base de reservas diretas sustentável e cada vez mais barata no longo prazo.",
  },
  {
    pergunta: "Que resultados posso esperar e como são medidos?",
    resposta:
      "Os principais indicadores que acompanhamos são: custo por reserva gerada, taxa de conversão do site, receita de canais diretos vs. OTAs, taxa de ocupação por período e ROAS (retorno sobre gasto em anúncios). Toda estratégia é baseada em dados reais — não em métricas de vaidade como curtidas ou seguidores. Você recebe relatórios periódicos com visibilidade total dos resultados.",
  },
  {
    pergunta: "A Réserve atende hotéis de qualquer porte e em todo o Brasil?",
    resposta:
      "Sim. Atendemos desde boutique hotels, pousadas de charme e hostels até grandes resorts, em todo o território nacional. Para propriedades menores, a estratégia foca em canais de alto impacto com menor orçamento — Google Meu Negócio otimizado, campanhas cirúrgicas e SEO local. Nossa equipe opera 100% digital, sem perda qualidade ou agilidade.",
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
  const { isMobile } = useIsMobile({ breakpoint: 768 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  
  // Mostrar apenas 5 perguntas no mobile
  const faqs = isMobile ? allFaqs.slice(0, 5) : allFaqs;

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
