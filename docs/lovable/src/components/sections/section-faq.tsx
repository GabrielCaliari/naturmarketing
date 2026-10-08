import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    question: "Qual a diferença entre contratar a Réserve e uma agência de marketing genérica?",
    answer:
      "Uma agência generalista trata um hotel como qualquer outro negócio. A Réserve entende a sazonalidade do setor, a dinâmica das OTAs, o comportamento do hóspede no funil de reserva, o Google Hotel Ads e as estratégias específicas para aumentar a taxa de ocupação direta. Campanhas mal configuradas por quem não conhece a hotelaria desperdiçam orçamento e não geram reservas. A diferença no resultado é significativa.",
  },
  {
    question: "É possível reduzir a dependência das OTAs sem perder ocupação?",
    answer:
      "Sim. A estratégia é usar as OTAs como vitrine e redirecionar a demanda para o canal direto com benefícios exclusivos: melhor tarifa no site próprio, early check-in, café da manhã incluso. Com site otimizado, motor de reservas eficiente e campanhas direcionadas, hotéis conseguem migrar de 80% de dependência de OTA para 40–50%, mantendo a ocupação e aumentando a margem por reserva.",
  },
  {
    question: "Quanto devo investir em marketing para o meu hotel ou pousada?",
    answer:
      "O referencial de mercado é de 4% a 6% da receita anual. Para um hotel com meta de R$1.000.000 em faturamento, isso representa R$40.000 a R$60.000 por ano. Compare esse valor com o que você já paga em comissões para OTAs, que costumam variar entre 15% e 30% por reserva. Na maioria dos casos, o marketing próprio gera reservas com custo muito menor do que ficar dependente de plataformas.",
  },
  {
    question: "Meu hotel precisa de um site próprio se já aparece no Booking e no Airbnb?",
    answer:
      "Com certeza. Estudos mostram que mais da metade dos viajantes que encontram um hotel numa OTA visita o site próprio antes de reservar. Um site próprio com motor de reservas elimina a comissão, permite personalizar a experiência do hóspede e é o principal ativo para qualquer estratégia de SEO e tráfego pago. Sem ele, você depende 100% das condições e algoritmos das plataformas.",
  },
  {
    question: "Como funciona a gestão do Google Hotel Ads?",
    answer:
      "O Google Hotel Ads exibe o preço e a disponibilidade do seu hotel diretamente nos resultados de busca e no Google Maps, ao lado das OTAs. Integramos seu motor de reservas ao Google, gerenciamos lances e segmentação, e otimizamos continuamente para maximizar reservas diretas com o menor custo por conversão, capturando hóspedes no exato momento em que estão prontos para reservar.",
  },
  {
    question: "Quanto tempo leva para ver os primeiros resultados?",
    answer:
      "Campanhas de tráfego pago (Google Ads, Meta Ads) podem gerar reservas em poucos dias. SEO e inbound marketing têm resultados crescentes e consistentes a partir de 3 a 6 meses. A estratégia ideal combina os dois: tráfego pago para resultados imediatos e SEO + conteúdo para construir uma base de reservas diretas sustentável e cada vez mais barata no longo prazo.",
  },
  {
    question: "Que resultados posso esperar e como são medidos?",
    answer:
      "Os principais indicadores que acompanhamos são: custo por reserva gerada, taxa de conversão do site, receita de canais diretos vs. OTAs, taxa de ocupação por período e ROAS (retorno sobre gasto em anúncios). Toda estratégia é baseada em dados reais, não em métricas de vaidade como curtidas ou seguidores. Você recebe relatórios periódicos com visibilidade total dos resultados.",
  },
  {
    question: "A Réserve atende hotéis de qualquer porte e em todo o Brasil?",
    answer:
      "Sim. Atendemos desde boutique hotels, pousadas de charme e hostels até grandes resorts, em todo o território nacional. Para propriedades menores, a estratégia foca em canais de alto impacto com menor orçamento: Google Meu Negócio otimizado, campanhas cirúrgicas e SEO local. Nossa equipe opera 100% digital, sem perda de qualidade ou agilidade.",
  },
];

export function SectionFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-brown">
              <span className="h-px w-10 bg-brand-brown" />
              Dúvidas Frequentes
            </p>
            <h2 className="mt-8 font-display text-4xl leading-[1.08] text-ink md:text-5xl">
              Perguntas sobre{" "}
              <span className="italic text-brand-green-deep">Marketing Hoteleiro</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
              Não encontrou a sua dúvida? Fale com um especialista e receba uma
              resposta personalizada para o seu hotel.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-block rounded-full bg-brand-brown px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-on-dark transition-all hover:bg-brand-brown/90 hover:shadow-lg"
            >
              Falar com um especialista
            </a>
          </div>

          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-lg leading-snug transition-colors md:text-xl ${
                        isOpen ? "text-brand-green-deep" : "text-ink"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all ${
                        isOpen
                          ? "rotate-45 border-brand-brown bg-brand-brown text-on-dark"
                          : "border-ink/20 text-ink"
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
