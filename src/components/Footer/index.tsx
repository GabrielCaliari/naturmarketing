"use client";

import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { COMPANY_NAP } from "@/constants/company";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";

const BRAND_GREEN = "#84936f";

const serviceLinks = [
  { label: "Gestão de Canais", href: "/gestao-de-canais" },
  { label: "Produção Audiovisual", href: "/producao-audiovisual" },
  { label: "Sites para Hotéis", href: "/sites-para-hoteis" },
  { label: "Motor de Reservas", href: "/motor-de-reservas" },
  { label: "Google Ads & Hotel Ads", href: "/google-hotel-ads" },
  { label: "Meta Ads", href: "/meta-ads" },
  { label: "SEO para Hotéis", href: "/seo-para-hoteis" },
  { label: "Relatórios de Performance", href: "/relatorios-performance" },
  { label: "Automação de Atendimento", href: "/automacao-atendimento" },
];

const contentLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Nossa Empresa", href: "/marketing-hoteleiro" },
  { label: "Ecossistema", href: "/ecossistema" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: COMPANY_NAP.social.instagram,
    icon: <IconBrandInstagram size={16} />,
  },
  {
    label: "WhatsApp",
    href: buildWhatsAppUrl(
      "Olá! 👋 Gostaria de saber mais sobre os serviços de marketing digital para a minha pousada/hotel."
    ),
    icon: <IconBrandWhatsapp size={16} />,
  },
];

const legalLinks = [
  { label: "Privacidade", href: "/privacy-policy" },
  { label: "Termos", href: "/terms-and-conditions" },
];

const Footer = () => {
  const { t } = useLocale();
  return (
    <footer style={{ background: "#F0EBE3", borderTop: "1px solid rgba(196,164,142,0.35)" }}>
      <div
        className="max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-12"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">

          {/* Marca + descrição */}
          <div className="flex flex-col gap-6 max-w-sm">
            <span
              style={{
                fontFamily: "var(--font-logo)",
                fontSize: "32px",
                fontWeight: 400,
                color: "#1A0F08",
                lineHeight: 1,
              }}
            >
              réserve
            </span>
            <p
              className="text-[16px] font-light leading-[1.85]"
              style={{ color: "#5C4F45" }}
            >
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-4 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(132,147,111,0.12)",
                    color: BRAND_GREEN,
                    border: "1px solid rgba(132,147,111,0.2)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 lg:gap-12">

            {/* Serviços */}
            <div className="flex flex-col gap-4 col-span-2">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "rgba(26,15,8,0.62)" }}>
                {t('footer.col.services')}
              </span>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-left text-[13px] tracking-[0.1em] transition-colors duration-300 hover:text-[#994f2a]"
                    style={{ color: "#5C4F45", fontWeight: 400 }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "rgba(26,15,8,0.62)" }}>
                {t('footer.col.content')}
              </span>
              {contentLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] tracking-[0.1em] transition-colors duration-300 hover:text-[#994f2a]"
                  style={{ color: "#5C4F45", fontWeight: 400 }}
                >
                  {item.label}
                </Link>
              ))}
              <DiagnosticoCTA
                className="text-left text-[13px] tracking-[0.1em] transition-colors duration-300 hover:text-[#994f2a]"
                style={{ color: "#5C4F45", fontWeight: 400, cursor: "pointer" }}
                trackId="cta_footer"
                source="/"
              >
                Diagnóstico Gratuito
              </DiagnosticoCTA>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "rgba(26,15,8,0.62)" }}>
                {t('footer.col.social')}
              </span>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] tracking-[0.1em] transition-colors duration-300 hover:text-[#994f2a]"
                  style={{ color: "#5C4F45", fontWeight: 400 }}
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "rgba(26,15,8,0.62)" }}>
                {t('footer.col.legal')}
              </span>
              {legalLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[13px] tracking-[0.1em] transition-colors duration-300 hover:text-[#994f2a]"
                  style={{ color: "#5C4F45", fontWeight: 400 }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(196,164,142,0.3)" }}
        >
          <span
            className="text-[12px] tracking-[0.18em] uppercase"
            style={{ color: "rgba(26,15,8,0.62)" }}
            // O HTML estático é gerado no build; o ano pode divergir no cliente
            suppressHydrationWarning
          >
            © {new Date().getFullYear()} RÉSERVE · Marketing Hoteleiro
          </span>
          <Link
            href="/privacy-policy"
            className="text-[12px] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#994f2a]"
            style={{ color: "rgba(26,15,8,0.62)" }}
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
