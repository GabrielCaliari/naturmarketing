"use client";

import { motion, type Variants } from "framer-motion";

const steps = [
  {
    image: "/img/resource/secao2-img1.png",
    text: "Analisamos a operação da hospedagem para identificar melhorias",
  },
  {
    image: "/img/resource/icon1.png",
    text: "Estruturamos um plano estratégico de conversão com canal próprio",
  },
  {
    image: "/img/resource/icon2.png",
    text: "Executamos todas as soluções propostas de forma integrada",
  },
  {
    image: "/img/resource/icon3.png",
    text: "Monitoramos métricas e ajustamos para melhorar performance",
  },
];

export default function QuemSomos() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <section id="about" className="quem-somos-section">
      {/* Labels bar */}
      <div className="quem-somos-labels">
        <div className="quem-somos-labels-inner">
          <span>Diagnóstico</span>
          <span>Direcionamento</span>
          <span>Implementação</span>
          <span>Otimização</span>
        </div>
      </div>

      {/* Spacer branco */}
      <div className="quem-somos-spacer" />

      {/* Top - Brown banner */}
      <div className="quem-somos-banner">
        <motion.div
          className="quem-somos-banner-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2 className="quem-somos-title" variants={fadeUp}>
            MARKETING, TRÁFEGO E CONTEÚDO
          </motion.h2>
          <motion.p className="quem-somos-subtitle" variants={fadeUp}>
            trabalhando juntos para que você tenha autoridade <br />de{" "}
            <strong>hospedagem premium</strong> no mercado
          </motion.p> 
        </motion.div>
      </div>

      {/* Bottom - Steps */}
      <div className="quem-somos-steps-wrapper">
        <motion.div
          className="quem-somos-steps"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="quem-somos-step" variants={fadeUp}>
              <div className="quem-somos-step-img">
                <img src={step.image} alt={step.text} />
              </div>
              <p className="quem-somos-step-text">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
