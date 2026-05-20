"use client";

import { motion, type Variants } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ResultadosSection() {
  const { t } = useLocale();

  const stats = [
    { value: "+40%", label: t('results.stat1.label'), desc: t('results.stat1.desc') },
    { value: "3×",   label: t('results.stat2.label'), desc: t('results.stat2.desc') },
    { value: "90d",  label: t('results.stat3.label'), desc: t('results.stat3.desc') },
    { value: "100%", label: t('results.stat4.label'), desc: t('results.stat4.desc') },
  ];

  return (
    <section className="py-10 md:py-16" style={{ background: "#F0EBE3" }}>
      <motion.div
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_BROWN }}>
              {t('results.label')}
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_BROWN }} />
          </div>
          <h2 className="h2" style={{ color: "#1A0F08", fontWeight: 400 }}>
            {t('results.h2')}{" "}
            <strong className="font-semibold" style={{ color: BRAND_BROWN }}>
              {t('results.h2.strong')}
            </strong>
          </h2>
          <p className="paragraph max-w-lg" style={{ fontWeight: 300, color: "#7a6a5e" }}>
            {t('results.desc')}
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col gap-3 px-7 py-8 rounded-2xl transition-all duration-500 cursor-default hover:shadow-lg hover:-translate-y-1"
              style={{ background: BRAND_GREEN }}
            >
              <span className="text-[52px] font-light leading-none tracking-tight" style={{ color: "#ffffff" }}>
                {stat.value}
              </span>
              <span className="text-[12px] font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.85)" }}>
                {stat.label}
              </span>
              <p className="text-[14px] font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex flex-col gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-center gap-5 px-5 py-6 rounded-2xl transition-all duration-500"
              style={{ background: BRAND_GREEN }}
            >
              <span
                className="text-[42px] font-light leading-none tracking-tight shrink-0 w-28 text-center"
                style={{ color: "#ffffff" }}
              >
                {stat.value}
              </span>
              <div className="w-px self-stretch" style={{ background: "rgba(255,255,255,0.2)" }} />
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {stat.label}
                </span>
                <p className="text-[13px] font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
