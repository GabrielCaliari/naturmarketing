"use client";

import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";

const BRAND_GREEN = "#84936f";

const menuLinks = [
  { label: "Expertise", id: "services" },
  { label: "Projetos", id: "para-quem-fazemos" },
  { label: "O Método", id: "about" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/reserve.mkt/",
    icon: <IconBrandInstagram size={16} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5535977429840",
    icon: <IconBrandWhatsapp size={16} />,
  },
];

const legalLinks = [
  { label: "Privacidade", href: "/privacy-policy" },
  { label: "Termos", href: "/terms-and-conditions" },
];

const Footer = () => {
  const handleNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#F0EBE3", borderTop: "1px solid rgba(196,164,142,0.35)" }}>
      <div
        className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">

          {/* Marca + descrição */}
          <div className="flex flex-col gap-6 max-w-sm">
            <span
              style={{
                fontFamily: "PP Hatton Medium, Georgia, serif",
                fontSize: "32px",
                fontWeight: 400,
                color: "#1A0F08",
                lineHeight: 1,
              }}
            >
              réserve
            </span>
            <p
              className="text-[14px] font-light leading-[1.85]"
              style={{ color: "#7a6a5e" }}
            >
              Agência especializada em Marketing Hoteleiro. Transformamos hotéis, 
              pousadas e resorts em marcas fortes com reservas diretas e menos dependência de OTAs.
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 lg:gap-24">

            {/* Menu */}
            <div className="flex flex-col gap-5">
              <span
                className="text-[9px] font-bold tracking-[0.25em] uppercase"
                style={{ color: "rgba(26,15,8,0.3)" }}
              >
                Menu
              </span>
              {menuLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.id)}
                  className="text-left text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#994f2a]"
                  style={{ color: "#7a6a5e", fontWeight: 400 }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social */}
            <div className="flex flex-col gap-5">
              <span
                className="text-[9px] font-bold tracking-[0.25em] uppercase"
                style={{ color: "rgba(26,15,8,0.3)" }}
              >
                Social
              </span>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#994f2a]"
                  style={{ color: "#7a6a5e", fontWeight: 400 }}
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-5">
              <span
                className="text-[9px] font-bold tracking-[0.25em] uppercase"
                style={{ color: "rgba(26,15,8,0.3)" }}
              >
                Legal
              </span>
              {legalLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#994f2a]"
                  style={{ color: "#7a6a5e", fontWeight: 400 }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(196,164,142,0.3)" }}
        >
          <span
            className="text-[10px] tracking-[0.18em] uppercase"
            style={{ color: "rgba(26,15,8,0.35)" }}
          >
            © {new Date().getFullYear()} RÉSERVE · Marketing Hoteleiro
          </span>
          <Link
            href="/privacy-policy"
            className="text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#994f2a]"
            style={{ color: "rgba(26,15,8,0.35)" }}
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
