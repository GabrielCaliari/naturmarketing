"use client";
import { useState, useEffect } from "react";

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
    <header className="fixed left-0 top-0 right-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img src="/img/logos/main-logo.png" alt="Logo" className="h-8 lg:h-10" />
        </a>

        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-pink-500 transition-colors">
                Home
              </a>
              <a 
                href="#plans" 
                onClick={(e) => {
                  e.preventDefault();
                  const plansSection = document.getElementById('plans');
                  if (plansSection) {
                    const offset = 100;
                    const elementPosition = plansSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                Planos
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                Contato
              </a>
              <a href="/" className="text-gray-700 hover:text-pink-500 transition-colors">
                Sobre
              </a>
            </nav>

          </>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={handleOpenMenu}
            className="p-2 text-gray-700 hover:text-pink-500 transition-colors"
          >
            <IconMenu3 size={24} />
          </button>
        )}
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
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <img src="/img/logos/main-logo.png" alt="Logo" className="h-8" />
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <a 
            href="/" 
            onClick={() => handleLinkClick()}
            className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Home
          </a>
          <a 
            href="#plans" 
            onClick={(e) => {
              e.preventDefault();
              const plansSection = document.getElementById('plans');
              if (plansSection) {
                const offset = 100;
                const elementPosition = plansSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
              handleLinkClick();
            }}
            className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Planos
          </a>
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
            className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Contato
          </a>
          <a 
            href="/" 
            onClick={() => handleLinkClick()}
            className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Sobre
          </a>
        </nav>
      </div>
    </div>
  );
};


export default Header;
