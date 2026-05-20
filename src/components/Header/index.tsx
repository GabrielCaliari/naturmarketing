"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobileDevice";
import { IconMenu3, IconX } from "@tabler/icons-react";
import { useLocale } from "@/context/LocaleContext";

const navLinksPt = [
  { label: "Início", href: "/" },
  { label: "Serviços", id: "services" },
  { label: "Contato", id: "contact" },
];

const navLinksEn = [
  { label: "Home", href: "/" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

const LanguageSwitcher = ({ compact = false }: { compact?: boolean }) => {
  const { locale, setLocale } = useLocale();
  const size = compact ? "2rem" : "2.25rem";
  const fontSize = compact ? "1.1rem" : "1.25rem";

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setLocale("pt")}
        title="Português"
        aria-label="Mudar para Português"
        style={{
          width: size,
          height: size,
          fontSize,
          borderRadius: "50%",
          border: locale === "pt" ? "2px solid #994f2a" : "2px solid transparent",
          background: locale === "pt" ? "rgba(153,79,42,0.18)" : "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        🇧🇷
      </button>
      <button
        onClick={() => setLocale("en")}
        title="English"
        aria-label="Switch to English"
        style={{
          width: size,
          height: size,
          fontSize,
          borderRadius: "50%",
          border: locale === "en" ? "2px solid #994f2a" : "2px solid transparent",
          background: locale === "en" ? "rgba(153,79,42,0.18)" : "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        🇺🇸
      </button>
    </div>
  );
};

const Header = () => {
  const { isMobile } = useIsMobile({ breakpoint: 1080 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, t } = useLocale();
  const navLinks = locale === "en" ? navLinksEn : navLinksPt;

  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  const ctaWa = t('banner.wa');

  return (
    <header className="main-header fixed-header">
      <div className="auto-container">
        <div className="header-lower">
          <div className="inner-container">
            <div className="logo-box">
              <Link href="/" className="logo header-logo">
                <span className="header-logo-brand">réserve</span>
                <span className="header-logo-sub">marketing agency</span>
              </Link>
            </div>

            {!isMobile && (
              <div className="nav-outer">
                <nav className="main-menu">
                  <div className="navbar-collapse">
                    <ul className="navigation">
                      {navLinks.map((item) => (
                        <li key={item.label}>
                          {item.href ? (
                            <Link href={item.href}>{item.label}</Link>
                          ) : (
                            <a
                              href={`#${item.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id!)?.scrollIntoView({ behavior: "smooth" });
                              }}
                            >
                              {item.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>
            )}

            {!isMobile && (
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <a
                  href={ctaWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-cta-btn"
                >
                  {t('nav.cta')}
                </a>
              </div>
            )}

            {isMobile && (
              <div className="flex items-center gap-2">
                <LanguageSwitcher compact />
                <a
                  href={ctaWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-cta-btn-mobile"
                >
                  {locale === "en" ? "Diagnosis" : "Diagnóstico"}
                </a>
                <button onClick={() => setIsMobileMenuOpen(true)} className="mobile-nav-toggler">
                  <IconMenu3 size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} navLinks={navLinks} locale={locale} />
        )}
      </AnimatePresence>
    </header>
  );
};

const MobileMenu = ({
  onClose,
  navLinks,
  locale,
}: {
  onClose: () => void;
  navLinks: typeof navLinksPt;
  locale: string;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleNav = (id?: string) => {
    onClose();
    if (!id) return;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const ctaWa =
    locale === "en"
      ? "https://wa.me/553597742984?text=Hello!%20I%20would%20like%20a%20free%20strategic%20diagnosis%20for%20my%20property."
      : "https://wa.me/553597742984?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem.";
  const ctaLabel = locale === "en" ? "Free Diagnosis" : "Diagnóstico Gratuito";

  return (
    <div className="mobile-menu-overlay">
      <motion.div
        className="mobile-menu-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.div
        className="mobile-menu-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="mobile-menu-header">
          <Link href="/" className="header-logo" onClick={onClose}>
            <span className="header-logo-brand">réserve</span>
            <span className="header-logo-sub">marketing agency</span>
          </Link>
          <button onClick={onClose} className="mobile-menu-close">
            <IconX size={22} />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {navLinks.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.25 }}
            >
              {item.href ? (
                <Link href={item.href} className="mobile-menu-link" onClick={onClose}>
                  {item.label}
                </Link>
              ) : (
                <button className="mobile-menu-link" onClick={() => handleNav(item.id)}>
                  {item.label}
                </button>
              )}
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + navLinks.length * 0.06, duration: 0.25 }}
          className="absolute bottom-8 left-0 right-0 px-6"
        >
          <a
            href={ctaWa}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-3.5 rounded-full text-[14px] font-medium text-white transition-all duration-300 shadow-lg"
            style={{ background: "#994f2a", letterSpacing: "0.04em" }}
            onClick={onClose}
          >
            {ctaLabel}
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
