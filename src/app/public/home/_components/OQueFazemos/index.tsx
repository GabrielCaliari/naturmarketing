"use client";

import { motion, type Variants } from "framer-motion";
import {
  IconBrandInstagram,
  IconCamera,
  IconWorld,
  IconPalette,
  IconTargetArrow,
  IconChartBar,
} from "@tabler/icons-react";

const servicos = [
  {
    icon: <IconBrandInstagram size={32} stroke={1.5} />,
    titulo: "Redes Sociais & Plataformas",
    descricao:
      "Produção de conteúdo estratégico, gerenciamento completo do perfil nas suas redes sociais e otimização em plataformas OTAs",
  },
  {
    icon: <IconCamera size={32} stroke={1.5} />,
    titulo: "Produção Audiovisual",
    descricao:
      "Captação profissional e presencial de fotos e vídeos do seu hotel que gera desejo e reforça a percepção de valor da experiência.",
  },
  {
    icon: <IconWorld size={32} stroke={1.5} />,
    titulo: "Sites e Landing Pages",
    descricao:
      "Desenvolvimento de sites modernos e bem otimizados com sistema de reserva direta, reduzindo seus custos e dependência de OTAs.",
  },
  {
    icon: <IconPalette size={32} stroke={1.5} />,
    titulo: "Branding Hoteleiro",
    descricao:
      "Desenvolvimento de identidade visual e posicionamento de marca que elevam o padrão de sofisticação da sua hospedagem no mercado.",
  },
  {
    icon: <IconTargetArrow size={32} stroke={1.5} />,
    titulo: "Anúncios no META e Google",
    descricao:
      "Campanhas otimizadas no META Ads e Google Hotel Ads para atrair hóspedes qualificados e converter em reservas diretas.",
  },
  {
    icon: <IconChartBar size={32} stroke={1.5} />,
    titulo: "Relatórios de desempenho",
    descricao:
      "Métricas detalhadas de desempenho com foco em ROI para garantirmos otimização constante e maior performance.",
  },
];

export default function OQueFazemos() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section id="services" className="oqf-section">
      <motion.div
        className="oqf-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2 className="oqf-title" variants={fadeUp}>
          <strong>Escale seus resultados</strong> com soluções completas desenvolvidas para{" "}
          <strong>hotelaria</strong>
        </motion.h2>

        <motion.div className="oqf-grid" variants={stagger}>
          {servicos.map((servico, index) => (
            <motion.div key={index} className="oqf-card" variants={fadeUp}>
              <div className="oqf-card-icon">{servico.icon}</div>
              <h3 className="oqf-card-title">{servico.titulo}</h3>
              <p className="oqf-card-desc">{servico.descricao}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
