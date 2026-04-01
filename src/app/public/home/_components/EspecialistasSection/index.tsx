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
            Contar com um time<br />
            de especialistas é <br />
            fundamental para o <br />
            sucesso de todo <br />
            negócio.
          </h2>
          <p className="especialistas-subtitle">
            Com a RÉSERVE você garante<br />
            gestão completa de marketing<br />
            feita por <strong>especialistas em 
              <br />mercado hoteleiro.</strong>
          </p>
        </motion.div>
        <div className="especialistas-image">
          <div className="especialistas-gradient" />
          <div className="especialistas-gradient-right" />
          <motion.img
            src="/img/resource/resersecao5.png"
            alt="Especialista em hotelaria"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  );
};

export default EspecialistasSection;
