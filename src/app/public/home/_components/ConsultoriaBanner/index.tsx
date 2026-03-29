"use client";

import { motion, type Variants } from "framer-motion";
import { trackButtonClick } from "@/lib/analytics";

export default function ConsultoriaBanner() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const handleClick = () => {
    trackButtonClick("cta_diagnostico", "/");
    window.open(
      "https://wa.me/5535998067432?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem.",
      "_blank"
    );
  };

  return (
    <section className="consultoria-section">
      <motion.div
        className="consultoria-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.h2 className="consultoria-heading" variants={fadeUp}>
          Receba um <strong>diagnóstico estratégico e gratuito</strong> sobre a presença digital
          da sua hospedagem.
        </motion.h2>

        <motion.div variants={fadeUp}>
          <button className="consultoria-btn" onClick={handleClick}>
            Quero minha análise
          </button>
        </motion.div>

        <motion.p className="consultoria-sub" variants={fadeUp}>
          <strong>
            Descubra os ajustes necessários na sua performance digital para converter em mais
            reservas diretas.
          </strong>
        </motion.p>
      </motion.div>
    </section>
  );
}
