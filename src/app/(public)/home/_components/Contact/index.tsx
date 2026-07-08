"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { trackFormStart, trackFormSubmit, trackButtonClick } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const GREETING_WA_URL = buildWhatsAppUrl(
  "Olá! 👋 Gostaria de saber mais sobre os serviços de marketing digital para a minha pousada/hotel."
);

export default function Contact() {
  const router = useRouter();
  const [formStarted, setFormStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("home_contact_form");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const pousada = (formData.get("pousada") as string).trim();
    const email = (formData.get("email") as string).trim();
    const phone = (formData.get("phone") as string).trim();
    const message = (formData.get("message") as string).trim();

    const lines = [
      `Olá! 👋 Boa tarde, me chamo *${name}*, da pousada *${pousada}*.`,
      "",
      message,
      "",
      `📧 E-mail: ${email}`,
    ];
    if (phone) lines.push(`📱 Telefone: ${phone}`);

    trackFormSubmit("home_contact_form", true);
    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    router.push("/consultoria-sucesso");
  };

  const inputClass =
    "w-full bg-[#F7F3EE] border rounded-xl px-5 py-3.5 text-[14px] text-[#1A0F08] font-light placeholder:text-[#b0a099] outline-none transition-all duration-200 focus:bg-white disabled:opacity-50"
  + " border-[rgba(196,164,142,0.3)] focus:border-[#84936f] focus:ring-2 focus:ring-[rgba(132,147,111,0.12)]";

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

            <a
              href={GREETING_WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("whatsapp_contact", "/")}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-[13px] text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] w-fit"
              style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
            >
              <IconBrandWhatsapp size={17} />
              Fale com um Especialista Agora
            </a>
          </div>

          {/* Form column */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl p-8 md:p-10"
            style={{
              background: "#FDFAF7",
              border: "1px solid rgba(196,164,142,0.25)",
              boxShadow: "0 8px 40px rgba(26,15,8,0.06)",
            }}
          >
            <div className="mb-2">
              <h4
                className="text-[16px] font-semibold mb-1"
                style={{ color: "#1A0F08" }}
              >
                Envie uma mensagem
              </h4>
              <p className="text-[12px] font-light" style={{ color: "#9a8878" }}>
                Respondemos em até 24 horas úteis
              </p>
            </div>

            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className={inputClass}
              onFocus={handleFormStart}
              disabled={isSubmitting}
              required
            />
            <input
              type="text"
              name="pousada"
              placeholder="Nome da sua pousada ou hotel"
              className={inputClass}
              onFocus={handleFormStart}
              disabled={isSubmitting}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              className={inputClass}
              onFocus={handleFormStart}
              disabled={isSubmitting}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="(00) 00000-0000"
              className={inputClass}
              onFocus={handleFormStart}
              disabled={isSubmitting}
            />
            <textarea
              name="message"
              placeholder="Qual é o maior desafio do seu hotel hoje?"
              className={`${inputClass} h-28 resize-none`}
              onFocus={handleFormStart}
              disabled={isSubmitting}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-medium text-[13px] text-white transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed mt-1 flex items-center justify-center gap-2"
              style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
            >
              {isSubmitting ? "Abrindo WhatsApp..." : (
                <>
                  Enviar pelo WhatsApp
                  <IconBrandWhatsapp size={15} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
