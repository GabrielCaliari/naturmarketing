"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

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
            <Image
              src="/img/resource/secao2-img1.png"
              alt="Quarto de hotel elegante"
              width={600}
              height={450}
              quality={90}
              style={{ objectFit: "cover", width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
            />
          </div>
          <div className="transform-img-polaroid">
            <Image
              src="/img/resource/secao2-img2.png"
              alt="Check-in em hotel"
              width={400}
              height={300}
              quality={90}
              style={{ objectFit: "cover", width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformSection;
