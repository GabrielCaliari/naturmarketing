"use client";

import Link from "next/link";
import { IconPhone, IconMail, IconClock, IconBrandInstagram } from "@tabler/icons-react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { useLocale } from "@/context/LocaleContext";
import { COMPANY_NAP } from "@/constants/company";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG = "#F0EBE3";
const CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.25)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#5C4F45";

const content = {
  pt: {
    crumbHome: "Início",
    crumb: "Contato",
    badge: "Fale com a Réserve",
    h1: "Vamos conversar sobre o seu hotel",
    p: "Preencha os 3 passos ao lado e nosso time de vendas já inicia o atendimento no WhatsApp sabendo tudo sobre a sua hospedagem e o que você precisa. Prefere o caminho tradicional? Use um dos contatos abaixo.",
    infoTitle: "Canais de atendimento",
    hoursLabel: "Horário de atendimento",
    instagramLabel: "Siga no Instagram",
  },
  en: {
    crumbHome: "Home",
    crumb: "Contact",
    badge: "Talk to Réserve",
    h1: "Let's talk about your hotel",
    p: "Fill in the 3 steps on the side and our sales team starts the conversation on WhatsApp already knowing all about your property and what you need. Prefer the traditional way? Use one of the contacts below.",
    infoTitle: "Contact channels",
    hoursLabel: "Business hours",
    instagramLabel: "Follow on Instagram",
  },
};

export default function ContatoContent() {
  const { locale } = useLocale();
  const c = content[locale === "en" ? "en" : "pt"];

  return (
    <>
      <Header />
      <main style={{ background: BG, minHeight: "100vh" }}>
        {/* Hero */}
        <section className="pt-36 pb-14 px-6 md:px-16" style={{ background: "#15110d", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${BRAND_GREEN} 0%, transparent 60%)` }} />
          <div className="max-w-5xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              <Link href="/" className="hover:text-white transition-colors">{c.crumbHome}</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.92)" }}>{c.crumb}</span>
            </nav>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)" }}>
              {c.badge}
            </span>
            <h1 className="text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1 }}>
              {c.h1}
            </h1>
          </div>
        </section>

        {/* Grid: info + formulário embutido */}
        <section className="py-14 md:py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Coluna de informações */}
            <div className="flex flex-col gap-8">
              <p className="text-[15px] font-light leading-[1.85]" style={{ color: TEXT_BODY }}>
                {c.p}
              </p>

              <div className="flex flex-col gap-3">
                <h2 className="text-[13px] font-semibold tracking-[0.2em] uppercase" style={{ color: BRAND_GREEN }}>
                  {c.infoTitle}
                </h2>

                <a href={COMPANY_NAP.phone.href} className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:shadow-md" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <IconPhone size={20} color={BRAND_BROWN} />
                  <span className="text-[14px]" style={{ color: TEXT_HEAD }}>{COMPANY_NAP.phone.display}</span>
                </a>

                <a href={`mailto:${COMPANY_NAP.email}`} className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:shadow-md" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <IconMail size={20} color={BRAND_BROWN} />
                  <span className="text-[14px]" style={{ color: TEXT_HEAD }}>{COMPANY_NAP.email}</span>
                </a>

                <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <IconClock size={20} color={BRAND_GREEN} />
                  <span className="text-[14px]" style={{ color: TEXT_HEAD }}>{c.hoursLabel}: {COMPANY_NAP.hours.display}</span>
                </div>

                <a href={COMPANY_NAP.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:shadow-md" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <IconBrandInstagram size={20} color={BRAND_GREEN} />
                  <span className="text-[14px]" style={{ color: TEXT_HEAD }}>{c.instagramLabel}</span>
                </a>
              </div>
            </div>

            {/* Formulário embutido (mesmo wizard do modal, já aberto) */}
            <div
              className="rounded-3xl overflow-hidden shadow-xl"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <LeadForm titleId="contato-form-title" analyticsId="contato_form" />
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
