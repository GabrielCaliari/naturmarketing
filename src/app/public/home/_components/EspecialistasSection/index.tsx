"use client";

import { motion, type Variants } from "framer-motion";

const EspecialistasSection = () => {
  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section className="especialistas-section">
      <div className="especialistas-container">
        <motion.div
          className="especialistas-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <h2 className="especialistas-heading">
            Contar com um time de especialistas é fundamental para o sucesso de todo negócio.
          </h2>
          <p className="especialistas-subtitle">
            Com a RÉSERVE você garante gestão completa de marketing feita por{" "}
            <strong>especialistas em mercado hoteleiro.</strong>
          </p>
        </motion.div>
        <div className="especialistas-image">
          <div className="especialistas-gradient" />
          <img
            src="/img/resource/resersecao5.png"
            alt="Especialista em hotelaria"
          />
        </div>
      </div>
    </section>
  );
};

export default EspecialistasSection;
