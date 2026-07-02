"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobileDevice";
import { IconMenu3, IconX, IconChevronDown, IconCheck } from "@tabler/icons-react";
import { useLocale } from "@/context/LocaleContext";

// ── Flag SVGs ─────────────────────────────────────────────────────────────────
const FlagBR = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.68)} viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <rect width="20" height="14" fill="#009c3b" rx="2" />
    <polygon points="10,1.2 18.6,7 10,12.8 1.4,7" fill="#ffdf00" />
    <circle cx="10" cy="7" r="3.3" fill="#002776" />
    <rect x="6.8" y="6.5" width="6.4" height="1" fill="#fff" opacity="0.9" />
  </svg>
);

const FlagUS = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.68)} viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <rect width="20" height="14" fill="#fff" rx="2" />
    {[0, 2.15, 4.31, 6.46, 8.62, 10.77, 12.92].map((y, i) => (
      <rect key={i} x="0" width="20" height="1.08" y={y} fill="#b22234" />
    ))}
    <rect width="8" height="7.5" fill="#3c3b6e" rx="0" />
    {[1.2, 2.5, 3.8, 5.1, 6.4].map((y, row) =>
      [0, 1, 2, 3].map((col) => (
        <circle
          key={`${row}-${col}`}
          cx={1 + col * 2 + (row % 2 === 0 ? 0 : 1)}
          cy={y}
          r="0.5"
          fill="#fff"
        />
      ))
    )}
  </svg>
);

// ── Language Dropdown ─────────────────────────────────────────────────────────
const LanguageSwitcher = ({ compact = false }: { compact?: boolean }) => {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { code: "pt" as const, label: "Português", Flag: FlagBR },
    { code: "en" as const, label: "English",   Flag: FlagUS },
  ];
  const current = options.find((o) => o.code === locale)!;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: open ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "8px",
          padding: compact ? "5px 8px" : "6px 10px",
          cursor: "pointer",
          outline: "none",
          transition: "background 0.2s",
        }}
      >
        <current.Flag size={compact ? 18 : 20} />
        <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em" }}>
          {locale === "pt" ? "PT" : "EN"}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} style={{ display: "flex", color: "rgba(255,255,255,0.55)" }}>
          <IconChevronDown size={12} stroke={2.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: "150px",
              background: "#1a1108",
              border: "1px solid rgba(196,164,142,0.22)",
              borderRadius: "12px",
              padding: "6px",
              zIndex: 200,
              boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
              listStyle: "none",
              margin: 0,
            }}
          >
            {options.map(({ code, label, Flag }) => {
              const active = locale === code;
              return (
                <li key={code}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => { setLocale(code); setOpen(false); }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: active ? "rgba(153,79,42,0.18)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}
                    onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    <Flag size={20} />
                    <span style={{ color: active ? "#ffffff" : "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: active ? 500 : 400, flex: 1, textAlign: "left" }}>
                      {label}
                    </span>
                    {active && <IconCheck size={13} stroke={2.5} style={{ color: "#994f2a" }} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Dropdown de serviços ──────────────────────────────────────────────────────
const ServicesDropdown = () => {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const services = [
    { label: t('nav.service1.label'), desc: t('nav.service1.desc'), href: "/gestao-de-canais" },
    { label: t('nav.service2.label'), desc: t('nav.service2.desc'), href: "/producao-audiovisual" },
    { label: t('nav.service3.label'), desc: t('nav.service3.desc'), href: "/sites-para-hoteis" },
    { label: t('nav.service4.label'), desc: t('nav.service4.desc'), href: "/google-hotel-ads" },
    { label: t('nav.service5.label'), desc: t('nav.service5.desc'), href: "/meta-ads" },
    { label: t('nav.service6.label'), desc: t('nav.service6.desc'), href: "/seo-para-hoteis" },
    { label: t('nav.service7.label'), desc: t('nav.service7.desc'), href: "/relatorios-performance" },
    { label: t('nav.service8.label'), desc: t('nav.service8.desc'), href: "/automacao-atendimento" },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 transition-colors duration-200 hover:text-white"
        style={{
          color: open ? "#ffffff" : "rgba(255,255,255,0.92)",
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "1.8px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {t('nav.services')}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <IconChevronDown size={14} stroke={2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute",
              top: "calc(100% + 12px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "640px",
              maxWidth: "calc(100vw - 32px)",
              boxSizing: "border-box",
              background: "#1a1108",
              border: "1px solid rgba(196,164,142,0.2)",
              borderRadius: "16px",
              padding: "10px",
              zIndex: 100,
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "6px",
            }}
          >
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/8"
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ color: "#ffffff", fontSize: "13px", fontWeight: 500 }}>
                    {s.label}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px" }}>
                    {s.desc}
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Header principal ──────────────────────────────────────────────────────────
const Header = () => {
  const { isMobile } = useIsMobile({ breakpoint: 1080 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, t } = useLocale();

  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  const ctaWa = t("banner.wa");

  return (
    <header className="main-header fixed-header">
      <div className="auto-container">
        <div className="header-lower">
          <div className="inner-container">

            {/* Logo */}
            <div className="logo-box">
              <Link href="/" className="logo header-logo">
                <span className="header-logo-brand">réserve</span>
                <span className="header-logo-sub">marketing agency</span>
              </Link>
            </div>

            {/* Desktop nav */}
            {!isMobile && (
              <nav className="nav-outer">
                <div className="main-menu">
                  <div className="navbar-collapse">
                    <ul className="navigation" style={{ display: "flex", alignItems: "center", gap: "28px", listStyle: "none", margin: 0, padding: 0 }}>
                      <li>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.92)", fontSize: "14px", fontWeight: 400, textDecoration: "none" }}>
                          {t('nav.home')}
                        </Link>
                      </li>
                      <li style={{ position: "relative" }}>
                        <ServicesDropdown />
                      </li>
                      <li>
                        <Link href="/ecossistema" style={{ color: "rgba(255,255,255,0.92)", fontSize: "14px", fontWeight: 400, textDecoration: "none" }}>
                          {t('nav.ecossistema')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.92)", fontSize: "14px", fontWeight: 400, textDecoration: "none" }}>
                          {t('nav.blog')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/marketing-hoteleiro" style={{ color: "rgba(255,255,255,0.92)", fontSize: "14px", fontWeight: 400, textDecoration: "none" }}>
                          {t('nav.empresa')}
                        </Link>
                      </li>
                      <li>
                        <a
                          href={ctaWa}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "rgba(255,255,255,0.92)", fontSize: "14px", fontWeight: 400, textDecoration: "none", cursor: "pointer" }}
                        >
                          {t('nav.contact')}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            )}

            {/* Desktop: language switcher + CTA */}
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <LanguageSwitcher />
                <Link href="/diagnostico" className="header-cta-btn">
                  {t("nav.cta")}
                </Link>
              </div>
            )}

            {/* Mobile: language switcher + CTA pequeno + hamburguer */}
            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <LanguageSwitcher compact />
                <Link href="/diagnostico" className="header-cta-btn-mobile">
                  {locale === "en" ? "Diagnosis" : "Diagnóstico"}
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="mobile-nav-toggler"
                  aria-label={locale === "en" ? "Open navigation menu" : "Abrir menu de navegação"}
                  aria-expanded={isMobileMenuOpen}
                >
                  <IconMenu3 size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            locale={locale}
            ctaWa={ctaWa}
            ctaLabel={t("nav.cta")}
            t={t}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

// ── Menu mobile ───────────────────────────────────────────────────────────────
const MobileMenu = ({
  onClose,
  locale: _locale,
  ctaWa,
  ctaLabel,
  t,
}: {
  onClose: () => void;
  locale: string;
  ctaWa: string;
  ctaLabel: string;
  t: (key: string) => string;
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { label: t('nav.service1.label'), desc: t('nav.service1.desc'), href: "/gestao-de-canais" },
    { label: t('nav.service2.label'), desc: t('nav.service2.desc'), href: "/producao-audiovisual" },
    { label: t('nav.service3.label'), desc: t('nav.service3.desc'), href: "/sites-para-hoteis" },
    { label: t('nav.service4.label'), desc: t('nav.service4.desc'), href: "/google-hotel-ads" },
    { label: t('nav.service5.label'), desc: t('nav.service5.desc'), href: "/meta-ads" },
    { label: t('nav.service6.label'), desc: t('nav.service6.desc'), href: "/seo-para-hoteis" },
    { label: t('nav.service7.label'), desc: t('nav.service7.desc'), href: "/relatorios-performance" },
    { label: t('nav.service8.label'), desc: t('nav.service8.desc'), href: "/automacao-atendimento" },
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const navItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.ecossistema'), href: "/ecossistema" },
    { label: t('nav.blog'), href: "/blog" },
    { label: t('nav.empresa'), href: "/marketing-hoteleiro" },
  ];

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
          <button onClick={onClose} className="mobile-menu-close" aria-label={_locale === "en" ? "Close menu" : "Fechar menu"}>
            <IconX size={22} />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.05, duration: 0.22 }}
            >
              <Link href={item.href} className="mobile-menu-link" onClick={onClose}>
                {item.label}
              </Link>
            </motion.div>
          ))}

          {/* Serviços acordeão */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.22 }}
          >
            <button
              className="mobile-menu-link flex items-center justify-between w-full"
              onClick={() => setServicesOpen((v) => !v)}
            >
              <span>{t('nav.services')}</span>
              <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <IconChevronDown size={16} stroke={2} />
              </motion.span>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: "hidden" }}
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={onClose}
                      className="flex flex-col gap-0.5 px-4 py-2.5"
                      style={{ textDecoration: "none" }}
                    >
                      <span style={{ color: "#1A0F08", fontSize: "14px", fontWeight: 500 }}>{s.label}</span>
                      <span style={{ color: "#6e5e52", fontSize: "11px" }}>{s.desc}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contato → WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.22 }}
          >
            <a
              href={ctaWa}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu-link block"
              onClick={onClose}
            >
              {t('nav.contact')}
            </a>
          </motion.div>
        </nav>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.25 }}
          className="absolute bottom-8 left-0 right-0 px-6"
        >
          <Link
            href="/diagnostico"
            className="block w-full text-center px-6 py-3.5 rounded-full text-[14px] font-medium text-white transition-all duration-300 shadow-lg"
            style={{ background: "#994f2a", letterSpacing: "0.04em" }}
            onClick={onClose}
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
