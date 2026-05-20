"use client";

import { motion, type Variants } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const TransformSection = () => {
  const { t } = useLocale();

  return (
    <section id="transform" className="py-10 md:py-16 overflow-hidden" style={{ background: "#F7F3EE" }}>
      <div className="section-container flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
          className="flex flex-col gap-6 w-full max-w-md items-center text-center lg:items-start lg:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span
              className="text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: BRAND_GREEN }}
            >
              {t('transform.label')}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="h3" style={{ color: "#1A0F08" }}>
              {t('transform.h3.1')}
            </h3>
            <h3 className="h3" style={{ color: "#1A0F08" }}>
              {t('transform.h3.2')}{" "}
              <span style={{ color: BRAND_GREEN }}>{t('transform.h3.highlight')}</span>{" "}
              {t('transform.h3.end')}
            </h3>
          </div>

          <p className="paragraph" style={{ fontWeight: 300, color: "#6b5c50" }}>
            {t('transform.body')}{" "}
            <strong className="font-medium" style={{ color: "#3a2518" }}>
              {t('transform.body.strong')}
            </strong>
          </p>

          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[13px] font-medium tracking-wide text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              {t('transform.cta')}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeRight}
          className="hidden lg:block w-full max-w-sm"
        >
          <div className="relative flex items-center justify-center">
            <div
              className="relative z-10 w-full max-w-sm mx-auto rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 20px 50px rgba(26,15,8,0.15)" }}
            >
              <img
                src="/img/resource/check.png"
                alt="Check-in em hotel — Marketing Hoteleiro Réserve"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4", objectPosition: "center" }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TransformSection;
