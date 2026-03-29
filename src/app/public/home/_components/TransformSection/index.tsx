"use client";

import { motion, type Variants } from "framer-motion";

const TransformSection = () => {
  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 } },
  };

  return (
    <section className="transform-section">
      <div className="transform-container">
        {/* Left - Text */}
        <motion.div
          className="transform-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <h2 className="transform-heading">
            Transformamos a presença online da sua hospedagem para gerar mais{" "}
            <strong>reservas diretas</strong> através de canais próprios.
          </h2>
          <p className="transform-subtitle">
            Tenha mais visibilidade, atraia hóspedes qualificados e proteja sua margem.
          </p>
        </motion.div>

        {/* Right - Images */}
        <motion.div
          className="transform-images"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInRight}
        >
          <div className="transform-img-room">
            <img
              src="/img/resource/secao2-img1.png"
              alt="Quarto de hotel elegante"
            />
          </div>
          <div className="transform-img-polaroid">
            <img
              src="/img/resource/secao2-img2.png"
              alt="Check-in em hotel"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformSection;
