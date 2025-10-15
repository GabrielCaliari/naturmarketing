"use client";

import {
  IconBrandWhatsapp,
  IconMapPin,
} from "@tabler/icons-react";

import Link from "next/link";

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-two)',
      marginTop: '80px',
      padding: '60px 0 20px',
      position: 'relative',
      zIndex: 1,
      width: '100%',
      clear: 'both',
      display: 'block',
      visibility: 'visible',
      opacity: 1
    }}>
      <div style={{
        width: '80%',
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          marginTop: '60px'
        }}>
          <div>
            <Link href="/" style={{ display: 'block' }}>
              <img src="/img/logos/main-logo.png" alt="Logo" style={{ maxWidth: '200px', height: 'auto' }} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h5 style={{ fontWeight: '700', color: 'var(--white-color)', textTransform: 'capitalize', marginBottom: '20px' }}>
              Navegue
            </h5>
            <Link href="/" style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', display: 'block', marginBottom: '10px' }}>
              Home
            </Link>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }} style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', display: 'block', marginBottom: '10px' }}>
              Contato
            </a>
            <Link href="/privacy-policy" style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', display: 'block', marginBottom: '10px' }}>
              Política de Privacidade
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h5 style={{ fontWeight: '700', color: 'var(--white-color)', textTransform: 'capitalize', marginBottom: '20px' }}>
              Informações de Contato
            </h5>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50px',
                color: 'var(--main-color)',
                border: '1px dashed var(--main-color)',
                backgroundColor: 'rgba(255, 51, 154, 0.1)'
              }}>
                <IconMapPin />
              </div>
              <span>Brasil</span>
            </div>
          </div>
        </div>

        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: 'var(--color-nine)',
          borderRadius: '10px'
        }}>
          <div style={{ fontSize: '16px', color: 'rgba(247, 247, 247, 0.7)' }}>
            GlowApp@ - Todos os direitos reservados |  
            <Link href="/privacy-policy" style={{ color: 'var(--white-color)' }}> Política de Privacidade</Link> 
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50px',
              color: 'var(--white-color)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s'
            }}>
              <IconBrandWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
