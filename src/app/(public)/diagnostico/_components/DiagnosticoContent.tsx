"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IconBrandWhatsapp, IconArrowRight } from "@tabler/icons-react";
import { useLocale } from "@/context/LocaleContext";
import { trackFormStart, trackFormSubmit, trackButtonClick } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#5C4F45";

const content = {
  pt: {
    waText: "Olá! Quero um diagnóstico gratuito de marketing para a minha hospedagem.",
    crumbHome: "Início",
    crumb: "Diagnóstico Gratuito",
    badge: "100% gratuito · Sem compromisso",
    h1a: "Descubra onde o seu hotel",
    h1b: "perde reservas todos os meses",
    heroP: "Analisamos a operação digital da sua hospedagem (presença no Google, dependência de OTA, site, anúncios e atendimento) e apresentamos um plano de ação claro. Sem custo e sem compromisso.",
    heroCta: "Solicitar meu diagnóstico",
    recLabel: "O que você recebe",
    recH2: "Um raio-X completo da sua operação digital",
    receives: [
      { title: "Análise de presença digital", desc: "Como o seu hotel aparece no Google, no Google Maps e nas redes, e o que está afastando o hóspede antes mesmo da reserva." },
      { title: "Custo real da dependência de OTA", desc: "Quanto você paga de comissão por mês para Booking, Expedia e Decolar, e quanto dá para migrar para o canal direto." },
      { title: "Auditoria de site e motor de reservas", desc: "Velocidade, mobile e caminho de reserva: onde o visitante desiste e o que precisa mudar para ele fechar no seu site." },
      { title: "Plano de ação priorizado", desc: "Um documento objetivo com as ações de maior impacto para gerar reservas diretas, apresentado em reunião, sem tecniquês." },
    ],
    stepsLabel: "Como funciona",
    stepsH2: "Três passos, nenhuma burocracia",
    steps: [
      { n: "01", title: "Preencha o formulário", desc: "Leva menos de 2 minutos. Conte o essencial sobre a sua hospedagem e o seu maior desafio hoje." },
      { n: "02", title: "Analisamos a sua operação", desc: "Nossa equipe audita presença digital, site, canais e anúncios da sua hospedagem em até 48h úteis." },
      { n: "03", title: "Reunião de apresentação", desc: "Agendamos uma conversa para apresentar o diagnóstico e o plano de ação. Você decide se quer executar com a gente." },
    ],
    formTitle: "Solicite o seu diagnóstico gratuito",
    formSub: "Respondemos em até 24 horas úteis",
    fName: "Seu nome completo",
    fEmail: "seu@email.com",
    fPhone: "WhatsApp: (00) 00000-0000",
    fHotel: "Nome da hospedagem e site (se tiver)",
    fChallenge: "Qual é o maior desafio do seu hotel hoje?",
    submit: "Solicitar Diagnóstico Gratuito",
    submitting: "Enviando...",
    orWa: "Prefere agilizar? Agende direto pelo WhatsApp:",
    waBtn: "Agendar pelo WhatsApp",
    trust: [
      "Diagnóstico estratégico 100% gratuito",
      "Sem contrato de fidelidade no primeiro mês",
      "Especialistas dedicados exclusivamente à hotelaria",
    ],
    error: "Erro ao enviar. Por favor, tente novamente ou fale conosco pelo WhatsApp.",
  },
  en: {
    waText: "Hi! I'd like a free marketing assessment for my property.",
    crumbHome: "Home",
    crumb: "Free Assessment",
    badge: "100% free · No commitment",
    h1a: "Find out where your hotel",
    h1b: "loses bookings every month",
    heroP: "We analyze your property's digital operation (Google presence, OTA dependence, website, ads and guest service) and present a clear action plan. Free of charge, no strings attached.",
    heroCta: "Request my assessment",
    recLabel: "What you get",
    recH2: "A complete X-ray of your digital operation",
    receives: [
      { title: "Digital presence analysis", desc: "How your hotel shows up on Google, Google Maps and social media, and what's driving guests away before they even book." },
      { title: "The real cost of OTA dependence", desc: "How much you pay in commission every month to Booking, Expedia and other OTAs, and how much can move to the direct channel." },
      { title: "Website and booking engine audit", desc: "Speed, mobile and the booking path: where visitors give up and what needs to change for them to book on your site." },
      { title: "Prioritized action plan", desc: "An objective document with the highest-impact actions to generate direct bookings, presented in a meeting, no jargon." },
    ],
    stepsLabel: "How it works",
    stepsH2: "Three steps, zero bureaucracy",
    steps: [
      { n: "01", title: "Fill in the form", desc: "It takes less than 2 minutes. Tell us the essentials about your property and your biggest challenge today." },
      { n: "02", title: "We analyze your operation", desc: "Our team audits your property's digital presence, website, channels and ads within 48 business hours." },
      { n: "03", title: "Presentation meeting", desc: "We schedule a call to walk you through the assessment and the action plan. You decide whether to execute it with us." },
    ],
    formTitle: "Request your free assessment",
    formSub: "We reply within 24 business hours",
    fName: "Your full name",
    fEmail: "your@email.com",
    fPhone: "WhatsApp: phone number",
    fHotel: "Property name and website (if any)",
    fChallenge: "What is your hotel's biggest challenge today?",
    submit: "Request Free Assessment",
    submitting: "Sending...",
    orWa: "In a hurry? Schedule directly on WhatsApp:",
    waBtn: "Schedule on WhatsApp",
    trust: [
      "100% free strategic assessment",
      "No loyalty contract in the first month",
      "Specialists dedicated exclusively to hospitality",
    ],
    error: "Error sending. Please try again or reach us on WhatsApp.",
  },
};

export default function DiagnosticoContent() {
  const router = useRouter();
  const { locale } = useLocale();
  const c = content[locale === "en" ? "en" : "pt"];
  const waHref = buildWhatsAppUrl(c.waText);

  const [formStarted, setFormStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("diagnostico_form");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const phone = (formData.get("phone") as string).trim();
    const hotel = (formData.get("hotel") as string).trim();
    const challenge = (formData.get("challenge") as string).trim();

    const greeting =
      locale === "en"
        ? `Hi! 👋 My name is *${name}*, from *${hotel}*.`
        : `Olá! 👋 Boa tarde, me chamo *${name}*, da pousada *${hotel}*.`;
    const askLine =
      locale === "en"
        ? "I'd like to request my free marketing assessment."
        : "Gostaria de solicitar o meu diagnóstico gratuito de marketing.";
    const challengeLabel = locale === "en" ? "Biggest challenge" : "Maior desafio hoje";

    const message = [
      greeting,
      "",
      askLine,
      `${challengeLabel}: ${challenge}`,
      "",
      `📧 E-mail: ${email}`,
      `📱 Telefone: ${phone}`,
    ].join("\n");

    trackFormSubmit("diagnostico_form", true);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    router.push("/consultoria-sucesso");
  };

  const inputClass =
    "w-full bg-[#F7F3EE] border rounded-xl px-5 py-3.5 text-[14px] text-[#1A0F08] font-light placeholder:text-[#b0a099] outline-none transition-all duration-200 focus:bg-white disabled:opacity-50"
  + " border-[rgba(196,164,142,0.3)] focus:border-[#84936f] focus:ring-2 focus:ring-[rgba(132,147,111,0.12)]";

  return (
    <>
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>

        {/* Hero */}
        <section className="pt-36 pb-16 px-6 md:px-16" style={{ background: "#15110d", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${BRAND_GREEN} 0%, transparent 60%)` }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              <Link href="/" className="hover:text-white transition-colors">{c.crumbHome}</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.92)" }}>{c.crumb}</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              {c.badge}
            </span>
            <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1 }}>
              {c.h1a}<br />
              <span style={{ color: BRAND_GREEN }}>{c.h1b}</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, maxWidth: "580px", lineHeight: 1.75 }}>
              {c.heroP}
            </p>
            <a
              href="#form"
              onClick={(e) => { e.preventDefault(); document.getElementById("form")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN }}
            >
              {c.heroCta}
              <IconArrowRight size={15} stroke={2} />
            </a>
          </div>
        </section>

        {/* O que você recebe */}
        <section className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>{c.recLabel}</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.recH2}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {c.receives.map((r, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: TEXT_HEAD }}>{r.title}</h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: TEXT_BODY }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>{c.stepsLabel}</span>
            </div>
            <h2 className="mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
              {c.stepsH2}
            </h2>
            <div className="flex flex-col gap-4">
              {c.steps.map((s) => (
                <div key={s.n} className="flex items-start gap-5 p-5 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-[32px] font-light shrink-0 leading-none" style={{ color: "rgba(153,79,42,0.25)" }}>{s.n}</span>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: TEXT_HEAD }}>{s.title}</h3>
                    <p className="text-[14px] font-light" style={{ color: TEXT_BODY }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section id="form" className="py-16 px-6 md:px-16" style={{ background: "#F7F3EE" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Trust column */}
            <div className="flex flex-col gap-8">
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, color: TEXT_HEAD }}>
                {c.formTitle}
              </h2>
              <div
                className="flex flex-col gap-3 p-6 rounded-2xl"
                style={{ background: BG, border: `1px solid ${BORDER}` }}
              >
                {c.trust.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: BRAND_GREEN }} />
                    <span className="text-[13px] font-light" style={{ color: TEXT_BODY }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[14px] font-light" style={{ color: TEXT_BODY }}>{c.orWa}</p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick("whatsapp_diagnostico", "/diagnostico")}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-[13px] text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] w-fit"
                  style={{ background: BRAND_GREEN, letterSpacing: "0.04em" }}
                >
                  <IconBrandWhatsapp size={17} />
                  {c.waBtn}
                </a>
              </div>
            </div>

            {/* Form column */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-2xl p-8 md:p-10"
              style={{
                background: BG_CARD,
                border: "1px solid rgba(196,164,142,0.25)",
                boxShadow: "0 8px 40px rgba(26,15,8,0.06)",
              }}
            >
              <p className="text-[12px] font-light -mb-1" style={{ color: "#9a8878" }}>
                {c.formSub}
              </p>
              <input type="text" name="name" placeholder={c.fName} className={inputClass} onFocus={handleFormStart} disabled={isSubmitting} required />
              <input type="email" name="email" placeholder={c.fEmail} className={inputClass} onFocus={handleFormStart} disabled={isSubmitting} required />
              <input type="tel" name="phone" placeholder={c.fPhone} className={inputClass} onFocus={handleFormStart} disabled={isSubmitting} required />
              <input type="text" name="hotel" placeholder={c.fHotel} className={inputClass} onFocus={handleFormStart} disabled={isSubmitting} required />
              <textarea name="challenge" placeholder={c.fChallenge} className={`${inputClass} h-28 resize-none`} onFocus={handleFormStart} disabled={isSubmitting} required />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-medium text-[13px] text-white transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed mt-1 flex items-center justify-center gap-2"
                style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
              >
                {isSubmitting ? c.submitting : (
                  <>
                    {c.submit}
                    <IconArrowRight size={15} stroke={2} />
                  </>
                )}
              </button>
            </form>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
