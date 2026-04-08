"use client";

import { motion, type Variants } from "framer-motion";

const canais = [
  { src: "/img/svg/instagram-icon.svg", label: "Instagram" },
  { src: "/img/svg/facebook-icon.svg", label: "Facebook" },
  { src: "/img/svg/tiktok-icon.svg", label: "TikTok" },
  { src: "/img/svg/google-icon.svg", label: "Google" },
  { src: "/img/svg/whatsapp-icon.svg", label: "WhatsApp" },
];

const PlataformasSection = () => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="plataformas-section">
      {/* Top - OTAs */}
      <div className="plataformas-otas">
        <motion.div
          className="plataformas-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2 className="plataformas-heading" variants={fadeUp}>
            Plataformas onde <strong>otimizamos</strong>
            <br />
            canais intermediários (OTAs)
          </motion.h2>
          <motion.div className="plataformas-logos" variants={fadeUp}>
            <img src="/img/resource/booking.png.png" alt="Booking.com" className="plataformas-ota-img" />
            <img src="/img/resource/airbnb.png" alt="Airbnb" className="plataformas-ota-img" />
            <img src="/img/resource/hoteis.png.png" alt="Hoteis.com" className="plataformas-ota-img" />
            <img src="/img/resource/decolar.png.png" alt="Decolar" className="plataformas-ota-img" />
            <img src="/img/resource/expedia.png.png" alt="Expedia" className="plataformas-ota-img" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom - Canais Próprios */}
      <div className="plataformas-proprios">
        <motion.div
          className="plataformas-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2 className="plataformas-heading plataformas-heading--dark" variants={fadeUp}>
            Plataformas onde <strong>gerenciamos</strong>
            <br />
            canais próprios de aquisição
          </motion.h2>
          <motion.div className="plataformas-canais" variants={fadeUp}>
            {canais.map((canal) => (
              <div key={canal.label} className="plataformas-canal">
                <img src={canal.src} alt={canal.label} className="plataformas-canal-img" />
                <span>{canal.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlataformasSection;
