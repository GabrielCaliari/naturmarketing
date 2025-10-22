"use client";

import {
  IconApple,
  IconBrandAndroid,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import BackgroundImage from './../../../../../../public/img/resource/background.png'
import { motion } from 'framer-motion';
import { trackButtonClick } from '@/lib/analytics';

const Banner = () => {
  const router = useRouter();

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
            href="https://www.instagram.com/brokerx.app/profilecard/?igsh=cGRjcGVweXc0cTBi"
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
            <div className="sec-title_title">Do antes ao depois</div>
            <h1 className="banner-one_heading">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animationVariants}
              >
                Documente, <br />
                Organize e Compartilhe <br />
                <span>Suas Transformações</span>
              </motion.div>
            </h1>
            <div className="sec-title_text">
              O GlowApp é uma plataforma digital inovadora, disponível em app e web, que revoluciona a organização diária de profissionais, especialmente aqueles que buscam otimizar seu tempo e melhorar a gestão do trabalho. 
              Com foco em facilitar a rotina, a plataforma permite que os usuários registrem fotos dos clientes no estilo "antes e depois",
               criando um portfólio visual completo e um histórico detalhado de todos os serviços realizados ao longo dos anos.
            </div>
            <div className="story-two_button">
              <button
                className="theme-btn btn-style-one"
                onClick={() => {
                  trackButtonClick('download_android', '/');
                  router.push("/android-download");
                }}
              >
                <span className="btn-wrap">
                  <span className="text-one">
                    <IconBrandAndroid />
                    Android
                  </span>
                  <span className="text-two">
                    <IconBrandAndroid />
                    Android
                  </span>
                </span>
              </button>
              <button
                className="theme-btn btn-style-one"
                onClick={() => {
                  trackButtonClick('download_iphone', '/');
                  router.push("/iphone-download");
                }}
              >
                <span className="btn-wrap">
                  <span className="text-one">
                    <IconApple />
                    Iphone
                  </span>
                  <span className="text-two">
                    <IconApple />
                    Iphone
                  </span>
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
