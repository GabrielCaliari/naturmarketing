"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { IconBuilding, IconHome, IconBrandAirbnb, IconArrowRight } from "@tabler/icons-react";
import { useLocale } from "@/context/LocaleContext";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ParaQuemFazemos() {
  const { t } = useLocale();

  const publicos = [
    {
      image: "/img/resource/hotel-resort.webp",
      icon: <IconBuilding size={13} stroke={1.8} />,
      labelKey: 'para.p1.label',
      titleKey: 'para.p1.title',
      descKey: 'para.p1.desc',
    },
    {
      image: "/img/resource/pousada.webp",
      icon: <IconHome size={13} stroke={1.8} />,
      labelKey: 'para.p2.label',
      titleKey: 'para.p2.title',
      descKey: 'para.p2.desc',
    },
    {
      image: "/img/resource/airnb.webp",
      icon: <IconBrandAirbnb size={13} stroke={1.8} />,
      labelKey: 'para.p3.label',
      titleKey: 'para.p3.title',
      descKey: 'para.p3.desc',
    },
  ];

  const handleContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="para-quem-fazemos" className="py-10 md:py-16" style={{ background: "#F7F3EE" }}>
      <motion.div
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>
              {t('para.label')}
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h2 className="h2" style={{ color: "#1A0F08", fontWeight: 400 }}>
            {t('para.h2')}{" "}
            <strong className="font-semibold">{t('para.h2.strong')}</strong>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publicos.map((p, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "#FDFAF7",
                border: "1px solid rgba(196,164,142,0.22)",
                boxShadow: "0 4px 24px rgba(26,15,8,0.06)",
              }}
            >
              <div className="relative overflow-hidden" style={{ height: "240px" }}>
                <Image
                  src={p.image}
                  alt={t(p.titleKey)}
                  fill
                  quality={85}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "rgba(26,15,8,0.06)" }} />
              </div>

              <div className="flex flex-col gap-4 p-6 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                    style={{ background: "rgba(153,79,42,0.08)", color: BRAND_BROWN }}
                  >
                    {p.icon}
                  </div>
                  <span className="text-[9px] font-semibold tracking-[0.22em] uppercase" style={{ color: BRAND_BROWN }}>
                    {t(p.labelKey)}
                  </span>
                </div>

                <h3
                  className="font-semibold leading-snug"
                  style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)", color: "#1A0F08", fontWeight: 600 }}
                >
                  {t(p.titleKey)}
                </h3>

                <p className="text-[13px] font-light leading-[1.85] flex-1" style={{ color: "#6e5e52" }}>
                  {t(p.descKey)}
                </p>

                <button
                  onClick={handleContact}
                  className="group/btn inline-flex items-center gap-2 pt-2 transition-colors duration-300"
                  style={{ borderTop: "1px solid rgba(196,164,142,0.2)", paddingTop: "14px" }}
                >
                  <span
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 group-hover/btn:text-[#994f2a]"
                    style={{ color: BRAND_GREEN }}
                  >
                    {t('para.learnmore')}
                  </span>
                  <IconArrowRight
                    size={13}
                    stroke={2}
                    className="transition-all duration-300 group-hover/btn:translate-x-1"
                    style={{ color: BRAND_GREEN }}
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
