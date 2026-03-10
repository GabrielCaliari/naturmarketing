"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { useIsMobile } from "@/hooks/useMobileDevice";

import {
  IconMenu3,
  IconX,
} from "@tabler/icons-react";

const Header = () => {
  const { isMobile } = useIsMobile({ breakpoint: 1080 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fechar menu quando mudar para desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <header className="main-header fixed-header">
      <div className="auto-container">
        <div className="header-lower">
          <div className="inner-container">
            <div className="logo-box">
              <Link href="/" className="logo">
                <img src="/img/logos/reserve.png" alt="Réserve Marketing Agency" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="nav-outer">
                <nav className="main-menu">
                  <div className="navbar-collapse">
                    <ul className="navigation">
                      <li><Link href="/">Início</Link></li>
                      <li>
                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          Contato
                        </a>
                      </li>
                      <li>
                        <a
                          href="#services"
                          onClick={(e) => {
                            e.preventDefault();
                            const servicesSection = document.getElementById('services');
                            if (servicesSection) {
                              servicesSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          Serviços
                        </a>
                      </li>
                      <li>
                        <a
                          href="#about"
                          onClick={(e) => {
                            e.preventDefault();
                            const aboutSection = document.getElementById('about');
                            if (aboutSection) {
                              aboutSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          Quem Somos
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={handleOpenMenu}
                className="mobile-nav-toggler"
              >
                <IconMenu3 size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {isMobile && (
        <MobileMenuModal 
          isOpen={isMobileMenuOpen} 
          onClose={handleCloseMenu} 
        />
      )}
    </header>
  );
};

const MobileMenuModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const handleLinkClick = (callback?: () => void) => {
    if (callback) callback();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50
    }}>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100%',
        width: '320px',
        maxWidth: '85vw',
        backgroundColor: 'white',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(135,166,174,0.2)',
          backgroundColor: '#87a6ae'
        }}>
          <img src="/img/logos/reserve.png" alt="Réserve Marketing Agency" style={{ height: '36px' }} />
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              color: '#ffffff',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px' }}>
          <Link
            href="/"
            onClick={() => handleLinkClick()}
            style={{
              display: 'block',
              padding: '14px 16px',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '4px',
              fontSize: '15px',
              letterSpacing: '1px',
              textTransform: 'uppercase' as const,
              transition: 'background-color 0.3s'
            }}
          >
            Início
          </Link>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
              handleLinkClick();
            }}
            style={{
              display: 'block',
              padding: '14px 16px',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '4px',
              fontSize: '15px',
              letterSpacing: '1px',
              textTransform: 'uppercase' as const,
              transition: 'background-color 0.3s'
            }}
          >
            Contato
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const servicesSection = document.getElementById('services');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }
              handleLinkClick();
            }}
            style={{
              display: 'block',
              padding: '14px 16px',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '4px',
              fontSize: '15px',
              letterSpacing: '1px',
              textTransform: 'uppercase' as const,
              transition: 'background-color 0.3s'
            }}
          >
            Serviços
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
              handleLinkClick();
            }}
            style={{
              display: 'block',
              padding: '14px 16px',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '4px',
              fontSize: '15px',
              letterSpacing: '1px',
              textTransform: 'uppercase' as const,
              transition: 'background-color 0.3s'
            }}
          >
            Quem Somos
          </a>
        </nav>
      </div>
    </div>
  );
};


export default Header;
