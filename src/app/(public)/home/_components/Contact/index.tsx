import { IconBrandWhatsapp, IconArrowRight } from "@tabler/icons-react";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-40 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span
              className="text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: BRAND_GREEN }}
            >
              Fale conosco
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h2
            className="font-extralight leading-[1.06] tracking-[-0.025em]"
            style={{ fontSize: "clamp(1.85rem, 3.8vw, 3rem)", color: "#1A0F08" }}
          >
            Fale com Nossa{" "}
            <strong className="font-semibold">Agência de Marketing</strong>{" "}
            para Hotéis
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

          {/* Info column */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3
                className="text-[19px] md:text-[22px] font-semibold leading-snug"
                style={{ color: BRAND_BROWN }}
              >
                Especialistas em Marketing Hoteleiro e Estratégia de Reservas Diretas
              </h3>
              <p
                className="text-[15px] font-light leading-[1.85]"
                style={{ color: "#6b5c50" }}
              >
                Chega de perder receita para OTAs. Fale com nossa equipe e descubra como transformar
                sua presença digital em reservas diretas, sem intermediários, sem enrolação.
              </p>
            </div>

            {/* Trust signals */}
            <div
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ background: "#F0EBE3", border: "1px solid rgba(196,164,142,0.2)" }}
            >
              {[
                "Diagnóstico estratégico 100% gratuito",
                "Sem contrato de fidelidade no primeiro mês",
                "Resultados mensuráveis com relatórios semanais",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: BRAND_GREEN }}
                  />
                  <span className="text-[13px] font-light" style={{ color: "#6b5c50" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <DiagnosticoCTA
              trackId="cta_contact_especialista"
              source="/"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-[13px] text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] w-fit cursor-pointer"
              style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
            >
              <IconBrandWhatsapp size={17} />
              Fale com um Especialista Agora
            </DiagnosticoCTA>
          </div>

          {/* CTA card column — padronizado no modal de diagnóstico */}
          <div
            className="flex flex-col gap-6 rounded-2xl p-8 md:p-10 text-center items-center"
            style={{
              background: "#FDFAF7",
              border: "1px solid rgba(196,164,142,0.25)",
              boxShadow: "0 8px 40px rgba(26,15,8,0.06)",
            }}
          >
            <div className="flex flex-col gap-2">
              <h4 className="text-[18px] md:text-[20px] font-semibold" style={{ color: "#1A0F08" }}>
                Comece pelo seu diagnóstico gratuito
              </h4>
              <p className="text-[13px] font-light leading-relaxed" style={{ color: "#6b5c50" }}>
                Responda 3 passos rápidos e nosso time já inicia o atendimento no WhatsApp sabendo
                tudo sobre a sua hospedagem e o que você precisa.
              </p>
            </div>

            <DiagnosticoCTA
              trackId="cta_contact_form"
              source="/"
              className="w-full max-w-sm py-4 rounded-xl font-medium text-[13px] text-white transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
            >
              Solicitar Diagnóstico Gratuito
              <IconArrowRight size={15} stroke={2} />
            </DiagnosticoCTA>

            <p className="text-[12px] font-light" style={{ color: "#9a8878" }}>
              Leva menos de 1 minuto · Respondemos em até 24 horas úteis
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
