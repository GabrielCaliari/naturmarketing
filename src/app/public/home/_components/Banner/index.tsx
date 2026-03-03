"use client";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import BackgroundImage from './../../../../../../public/img/resource/background.png'
import { motion } from 'framer-motion';
import { trackButtonClick } from '@/lib/analytics';

const Banner = () => {
  const animationVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
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
          <div className="banner-one_content-inner">
            <div className="sec-title_title">Marketing Digital Hoteleiro</div>
            <h1 className="banner-one_heading">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animationVariants}
              >
                Aumente suas <br />
                Reservas Diretas e <br />
                <span>Reduza Comissões</span>
              </motion.div>
            </h1>
            <div className="sec-title_text">
              A Natur é especializada em marketing digital para hotéis, pousadas e resorts. 
              Desenvolvemos estratégias personalizadas que aumentam sua visibilidade online, 
              engajam o público certo e transformam visitantes em hóspedes, reduzindo sua 
              dependência de OTAs e maximizando sua lucratividade.
            </div>
            <div className="story-two_button">
              <button
                className="theme-btn btn-style-one"
                onClick={() => {
                  trackButtonClick('cta_hero_contact', '/');
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="btn-wrap">
                  <span className="text-one">Fale Conosco</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Banner };
