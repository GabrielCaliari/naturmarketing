"use client";

import { motion, type Variants } from "framer-motion";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import {
  IconUsers,
  IconTarget,
  IconHeart,
  IconRocket,
  IconAward,
  IconFriends,
} from "@tabler/icons-react";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG_CREAM = "#F7F3EE";
const BG_LIGHT = "#F0EBE3";
const BG_CARD = "#FDFAF7";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";
const BORDER = "rgba(196,164,142,0.22)";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const valores = [
  {
    icon: <IconTarget size={20} stroke={1.5} />,
    titulo: "Foco em Resultados",
    desc: "Cada ação de marketing hoteleiro que executamos é mensurada e orientada ao retorno real do seu investimento.",
  },
  {
    icon: <IconHeart size={20} stroke={1.5} />,
    titulo: "Paixão pelo Setor",
    desc: "Vivemos e respiramos hotelaria. Esse conhecimento profundo é o que nos diferencia de agências genéricas de marketing.",
  },
  {
    icon: <IconRocket size={20} stroke={1.5} />,
    titulo: "Inovação Constante",
    desc: "As estratégias de gestão de tráfego para resorts e hotéis evoluem constantemente — e nós evoluímos junto.",
  },
  {
    icon: <IconAward size={20} stroke={1.5} />,
    titulo: "Excelência",
    desc: "Nenhum detalhe é irrelevante quando se trata de posicionar seu hotel como a melhor opção do mercado.",
  },
  {
    icon: <IconFriends size={20} stroke={1.5} />,
    titulo: "Parceria",
    desc: "Tratamos o seu hotel como se fosse nosso. O seu sucesso em reservas diretas é o nosso resultado.",
  },
  {
    icon: <IconUsers size={20} stroke={1.5} />,
    titulo: "Equipe Dedicada",
    desc: "Cada membro é especialista em marketing para hotéis — nenhum generalista. Só quem entende de hotelaria.",
  },
];

const equipe = [
  {
    titulo: "Especialistas em Marketing Hoteleiro",
    desc: "Profissionais certificados em campanhas digitais para hotelaria, SEO, Google Hotel Ads e gestão de redes sociais.",
  },
  {
    titulo: "Designers e Criativos",
    desc: "Equipe criativa especializada em conteúdo visual para hotéis — fotos, vídeos e identidade de marca que elevam a percepção de valor.",
  },
  {
    titulo: "Desenvolvedores",
    desc: "Especialistas em sites de alta performance para hotelaria com motor de reserva direta integrado e otimizado para conversão.",
  },
  {
    titulo: "Estrategistas de Tráfego",
    desc: "Especialistas em gestão de tráfego para resorts e hotéis que constroem funis de conversão com ROI mensurável.",
  },
];

const Empresa = () => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">

        {/* ── Hero ── */}
        <section
          className="pt-40 pb-24 px-6 md:px-16 relative"
          style={{ background: BRAND_BROWN }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)",
            }}
          />
          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
              <span
                className="text-[10px] font-medium tracking-[0.3em] uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Quem somos
              </span>
              <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-extralight text-white leading-[1.06] tracking-[-0.025em] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              A agência de{" "}
              <strong className="font-semibold">Marketing Hoteleiro</strong>
              <br />que transforma resultados
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[15px] md:text-base font-light leading-[1.85]"
              style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto" }}
            >
              Conheça o time de especialistas em Marketing Hoteleiro e Gestão de Tráfego para Resorts
            </motion.p>
          </motion.div>
        </section>

        {/* ── Sobre ── */}
        <section className="py-20 md:py-28 px-6 md:px-16" style={{ background: BG_CREAM }}>
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span
                className="text-[10px] font-medium tracking-[0.3em] uppercase"
                style={{ color: BRAND_GREEN }}
              >
                Sobre a Réserve
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="h2 mb-10"
              style={{ color: TEXT_HEAD, fontWeight: 400 }}
            >
              Fundada para libertar hotéis da{" "}
              <strong className="font-semibold">dependência de OTAs</strong>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-5 p-8 md:p-12 rounded-2xl"
              style={{
                background: BG_CARD,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 8px 40px rgba(26,15,8,0.06)",
              }}
            >
              {[
                "A RÉSERVE é uma agência de Marketing Hoteleiro especializada em gestão de tráfego para resorts, hotéis e pousadas, com expertise em transformar presença digital em reservas diretas e receita real.",
                "Fundada com a missão de libertar os empreendimentos hoteleiros da dependência de OTAs, a RÉSERVE combina estratégia de marketing de alto nível com um conhecimento profundo das particularidades do setor hoteleiro brasileiro.",
                "Nossa equipe de especialistas atua de forma integrada — unindo tráfego pago, Google Hotel Ads, branding, conteúdo e tecnologia para construir canais próprios de aquisição que trabalham pelo seu hotel 24 horas por dia.",
                "Com metodologias exclusivas de marketing hoteleiro, já ajudamos dezenas de estabelecimentos a aumentarem suas reservas diretas, reduzirem custos com comissões e consolidarem sua marca como referência de mercado.",
              ].map((p, i) => (
                <p key={i} className="text-[15px] font-light leading-[1.85]" style={{ color: TEXT_BODY }}>
                  {p}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Valores ── */}
        <section className="py-20 md:py-28 px-6 md:px-16" style={{ background: BG_LIGHT }}>
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
                <span
                  className="text-[10px] font-medium tracking-[0.3em] uppercase"
                  style={{ color: BRAND_GREEN }}
                >
                  Nossos Valores
                </span>
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              </div>
              <h2 className="h2" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
                O que guia cada{" "}
                <strong className="font-semibold">decisão que tomamos</strong>
              </h2>
            </motion.div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ borderTop: `1px solid ${BORDER}`, borderLeft: `1px solid ${BORDER}` }}
            >
              {valores.map((v, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col gap-4 p-7 md:p-8"
                  style={{
                    background: BG_CARD,
                    borderRight: `1px solid ${BORDER}`,
                    borderBottom: `1px solid ${BORDER}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(132,147,111,0.12)", color: BRAND_GREEN }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold" style={{ color: TEXT_HEAD }}>
                    {v.titulo}
                  </h3>
                  <p className="text-[13px] font-light leading-[1.8]" style={{ color: TEXT_BODY }}>
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Equipe ── */}
        <section className="py-20 md:py-28 px-6 md:px-16" style={{ background: BG_CREAM }}>
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
                <span
                  className="text-[10px] font-medium tracking-[0.3em] uppercase"
                  style={{ color: BRAND_GREEN }}
                >
                  O Time
                </span>
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              </div>
              <h2 className="h2" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
                Time de{" "}
                <strong className="font-semibold">Especialistas em Marketing Hoteleiro</strong>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {equipe.map((e, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col gap-3 p-7 rounded-2xl"
                  style={{
                    background: BG_CARD,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "0 4px 24px rgba(26,15,8,0.05)",
                  }}
                >
                  <div className="w-1 h-6 rounded-full" style={{ background: BRAND_GREEN }} />
                  <h3 className="text-[15px] font-semibold" style={{ color: TEXT_HEAD }}>
                    {e.titulo}
                  </h3>
                  <p className="text-[13px] font-light leading-[1.85]" style={{ color: TEXT_BODY }}>
                    {e.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeUp}
              className="mt-12 text-center text-[15px] font-light italic"
              style={{ color: BRAND_BROWN }}
            >
              &ldquo;Cada hotel tem um potencial que ainda não foi explorado. Nós estamos aqui para desbloqueá-lo.&rdquo;
            </motion.p>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-16 md:py-20 px-6 md:px-16 relative overflow-hidden"
          style={{ background: "#2a1f14" }}
        >
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="/img/resource/seedsbackground.png"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "rgba(20,12,6,0.5)" }} />
          </div>

          <motion.div
            className="relative z-10 max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-semibold text-white leading-[1.08] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Pronto para ter uma{" "}
              <strong className="font-extralight italic" style={{ color: "rgba(255,255,255,0.75)" }}>
                Agência de Marketing para Hotéis
              </strong>{" "}
              do seu lado?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[15px] font-light leading-[1.8] mb-8"
              style={{ color: "rgba(255,255,255,0.55)", maxWidth: "480px", margin: "0 auto 2rem" }}
            >
              Em 30 minutos, mapeamos as principais oportunidades de reservas diretas do seu hotel — sem compromisso.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="https://wa.me/5535998067432?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-medium text-[13px] text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: BRAND_BROWN, letterSpacing: "0.05em" }}
              >
                Solicitar Diagnóstico Gratuito
              </Link>
              <p
                className="mt-3 text-[11px] font-light"
                style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}
              >
                Sem compromisso · 100% gratuito
              </p>
            </motion.div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Empresa;
