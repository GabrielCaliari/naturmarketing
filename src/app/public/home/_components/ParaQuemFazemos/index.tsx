"use client";

import { motion, type Variants } from "framer-motion";
import { IconBuilding, IconHome, IconBrandAirbnb } from "@tabler/icons-react";
import { CardCarousel } from "@/components/CardCarousel";
import { useIsMobile } from "@/hooks/useMobileDevice";

const publicos = [
  {
    icon: <IconBuilding size={32} stroke={1.5} />,
    titulo: "Hotéis e Resorts",
    descricao: "Estratégias completas para hotéis e resorts que buscam aumentar ocupação, maximizar receitas e reduzir dependência de OTAs.",
    features: ["Aumento de reservas diretas", "Gestão de reputação online", "Campanhas segmentadas por perfil de hóspede"],
  },
  {
    icon: <IconHome size={32} stroke={1.5} />,
    titulo: "Pousadas",
    descricao: "Marketing digital personalizado para pousadas que querem destacar seu charme e atrair mais hóspedes qualificados.",
    features: ["Posicionamento de marca autêntico", "Conteúdo que valoriza a experiência", "Captação de público regional e nacional"],
  },
  {
    icon: <IconBrandAirbnb size={32} stroke={1.5} />,
    titulo: "Airbnb",
    descricao: "Gestão de marketing para anfitriões que desejam se destacar, aumentar avaliações e maximizar a taxa de ocupação.",
    features: ["Otimização de anúncios na plataforma", "Fotografia e conteúdo profissional", "Estratégias de precificação e visibilidade"],
  },
];

const Card = ({ p }: { p: typeof publicos[0] }) => (
  <div className="pqf-card">
    <div className="pqf-card-icon">{p.icon}</div>
    <h3 className="pqf-card-title">{p.titulo}</h3>
    <p className="pqf-card-desc">{p.descricao}</p>
    <ul className="pqf-card-features">
      {p.features.map((f, j) => (
        <li key={j}><span className="pqf-check">✓</span> {f}</li>
      ))}
    </ul>
  </div>
);

export default function ParaQuemFazemos() {
  const { isMobile } = useIsMobile({ breakpoint: 768 });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <section id="para-quem-fazemos" className="pqf-section">
      <motion.div
        className="pqf-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2 className="pqf-title" variants={fadeUp}>
          Para quem <strong>fazemos</strong>
        </motion.h2>
        <motion.p className="pqf-subtitle" variants={fadeUp}>
          Especializados em atender diferentes tipos de empreendimentos hoteleiros com estratégias personalizadas
        </motion.p>

        {isMobile ? (
          <CardCarousel>
            {publicos.map((p, i) => <Card key={i} p={p} />)}
          </CardCarousel>
        ) : (
          <motion.div className="pqf-grid" variants={stagger}>
            {publicos.map((p, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card p={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
