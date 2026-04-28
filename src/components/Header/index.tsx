"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobileDevice";
import { IconMenu3, IconX } from "@tabler/icons-react";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", id: "services" },
  { label: "Quem Somos", id: "about" },
  // { label: "Blog", href: "/public/blog" },
  { label: "Contato", id: "contact" },
];

const Header = () => {
  const { isMobile } = useIsMobile({ breakpoint: 1080 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

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
              <a
                href="https://wa.me/5535998067432?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem."
                target="_blank"
                rel="noopener noreferrer"
                className="header-cta-btn"
              >
                Diagnóstico Gratuito
              </a>
            )}

            {isMobile && (
              <button onClick={() => setIsMobileMenuOpen(true)} className="mobile-nav-toggler">
                <IconMenu3 size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
};

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
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

  return (
    <div className="mobile-menu-overlay">
      {/* Backdrop */}
      <motion.div
        className="mobile-menu-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="mobile-menu-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className="mobile-menu-header">
          <Link href="/" className="header-logo" onClick={onClose}>
            <span className="header-logo-brand">réserve</span>
            <span className="header-logo-sub">marketing agency</span>
          </Link>
          <button onClick={onClose} className="mobile-menu-close">
            <IconX size={22} />
          </button>
        </div>

        {/* Nav */}
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
      </motion.div>
    </div>
  );
};

export default Header;
