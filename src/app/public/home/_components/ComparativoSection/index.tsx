"use client";

import { motion, type Variants } from "framer-motion";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

const comItems = [
  "Fluxo constante de reservas diretas e mais autonomia",
  "Posicionamento alinhado que atrai hóspedes qualificados",
  "Estratégia de comunicação focada em valorização da marca",
  "Planejamento com base em dados, clareza e resultados.",
];

const semItems = [
  "Margem comprida por comissões e maior dependência de OTAs",
  "Comunicação genérica que afasta e não sustenta ticket",
  "Competição por preço",
  "Decisões incertas baseadas em tentativa e erro",
];

const ComparativoSection = () => {
  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 } },
  };

  return (
    <section className="comparativo-section">
      <div className="comparativo-container">
        <motion.div
          className="comparativo-card comparativo-card--com"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <h3 className="comparativo-title">
            Sua hospedagem <strong>com</strong> a
          </h3>
          <p className="comparativo-brand">réserve</p>
          <ul className="comparativo-list">
            {comItems.map((item, i) => (
              <li key={i}>
                <IconCircleCheck size={22} stroke={1.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="comparativo-card comparativo-card--sem"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInRight}
        >
          <h3 className="comparativo-title">
            Sua hospedagem
            <br />
            <strong>sem estrutura de</strong>
            <br />
            <strong>marketing</strong>
          </h3>
          <ul className="comparativo-list">
            {semItems.map((item, i) => (
              <li key={i}>
                <IconCircleX size={22} stroke={1.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparativoSection;
