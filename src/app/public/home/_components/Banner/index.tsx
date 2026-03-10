"use client";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconChevronDown,
} from "@tabler/icons-react";
import BackgroundImage from './../../../../../../public/img/resource/background.png'
import { motion } from 'framer-motion';
import { trackButtonClick } from '@/lib/analytics';

const Banner = () => {
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="banner-one">
      <div className="auto-container">
        <div className="banner-one_image" style={{backgroundImage: `url(${BackgroundImage.src})`}}></div>
        <div className="banner-two_socials">
          <a href="#" onClick={(e) => e.preventDefault()}>
            <IconBrandWhatsapp />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/agencianatur"
          >
            <IconBrandInstagram />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/share/19MTVABLe2/"
          >
            <IconBrandFacebook />
          </a>
        </div>

        <div className="banner-one_content">
          <motion.div
            className="banner-one_content-inner reserve-hero"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.h1
              className="banner-one_heading reserve-heading"
              variants={childVariant}
            >
              Mais <strong>reservas diretas.</strong><br />
              <strong>Menos dependência</strong> de OTAs.
            </motion.h1>
            <motion.div
              className="reserve-cta"
              variants={childVariant}
            >
              <button
                className="reserve-cta-btn"
                onClick={() => {
                  trackButtonClick('cta_hero_conheca', '/');
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Conheça a <strong>RÉSERVE</strong></span>
                <IconChevronDown size={20} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Banner };
