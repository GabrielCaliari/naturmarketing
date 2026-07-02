"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
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
const TEXT_BODY = "#6e5e52";
const BORDER = "rgba(196,164,142,0.22)";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const valorIcons = [
  <IconTarget key="t" size={20} stroke={1.5} />,
  <IconHeart key="h" size={20} stroke={1.5} />,
  <IconRocket key="r" size={20} stroke={1.5} />,
  <IconAward key="a" size={20} stroke={1.5} />,
  <IconFriends key="f" size={20} stroke={1.5} />,
  <IconUsers key="u" size={20} stroke={1.5} />,
];

const servicos = [
  { label: "Google Hotel Ads", href: "/google-hotel-ads" },
  { label: "SEO para Hotéis", href: "/seo-para-hoteis" },
  { label: "Reservas Diretas", href: "/reservas-diretas" },
  { label: "Sites para Hotéis", href: "/sites-para-hoteis" },
  { label: "Meta Ads", href: "/meta-ads" },
  { label: "Gestão de Canais", href: "/gestao-de-canais" },
];

const content = {
  pt: {
    heroLabel: "Quem somos",
    heroH1a: "A agência de ",
    heroH1strong: "Marketing Hoteleiro",
    heroH1b: "que transforma resultados",
    heroP: "Conheça o time de especialistas em Marketing Hoteleiro e Estratégia de Reservas Diretas",
    sobreLabel: "Sobre a Réserve",
    sobreH2a: "Fundada para libertar hotéis da ",
    sobreH2strong: "dependência de OTAs",
    sobreParas: [
      "A RÉSERVE é uma agência de Marketing Hoteleiro especializada em diagnóstico, estratégia e reservas diretas para hotéis, pousadas e lodges de experiência. Nossa expertise é transformar presença digital em reservas diretas e receita real.",
      "Fundada com a missão de libertar os empreendimentos hoteleiros da dependência de OTAs, a RÉSERVE combina estratégia de marketing de alto nível com um conhecimento profundo das particularidades do setor hoteleiro brasileiro.",
      "Nossa equipe de especialistas atua de forma integrada — unindo tráfego pago, Google Hotel Ads, branding, conteúdo e tecnologia para construir canais próprios de aquisição que trabalham pelo seu hotel 24 horas por dia.",
      "Com metodologias exclusivas de marketing hoteleiro, já ajudamos dezenas de estabelecimentos a aumentarem suas reservas diretas, reduzirem custos com comissões e consolidarem sua marca como referência de mercado.",
    ],
    servLabel: "O que fazemos",
    servH2a: "Serviços especializados em ",
    servH2strong: "marketing hoteleiro",
    servP: "Do tráfego pago à tecnologia de reservas, atuamos em todas as frentes que transformam a presença digital do seu hotel em receita direta.",
    valoresLabel: "Nossos Valores",
    valoresH2a: "O que guia cada ",
    valoresH2strong: "decisão que tomamos",
    valores: [
      { titulo: "Foco em Resultados", desc: "Cada ação de marketing hoteleiro que executamos é mensurada e orientada ao retorno real do seu investimento." },
      { titulo: "Paixão pelo Setor", desc: "Vivemos e respiramos hotelaria. Esse conhecimento profundo é o que nos diferencia de agências genéricas de marketing." },
      { titulo: "Inovação Constante", desc: "As estratégias de marketing hoteleiro evoluem constantemente e nós evoluímos junto para sempre entregar o que gera resultado real." },
      { titulo: "Excelência", desc: "Nenhum detalhe é irrelevante quando se trata de posicionar seu hotel como a melhor opção do mercado." },
      { titulo: "Parceria", desc: "Tratamos o seu hotel como se fosse nosso. O seu sucesso em reservas diretas é o nosso resultado." },
      { titulo: "Equipe Dedicada", desc: "Cada membro é especialista em marketing para hotéis — nenhum generalista. Só quem entende de hotelaria." },
    ],
    timeLabel: "O Time",
    timeH2a: "Time de ",
    timeH2strong: "Especialistas em Marketing Hoteleiro",
    equipe: [
      { titulo: "Especialistas em Marketing Hoteleiro", desc: "Profissionais certificados em campanhas digitais para hotelaria, SEO, Google Hotel Ads e gestão de redes sociais." },
      { titulo: "Designers e Criativos", desc: "Equipe criativa especializada em conteúdo visual para hotéis — fotos, vídeos e identidade de marca que elevam a percepção de valor." },
      { titulo: "Desenvolvedores", desc: "Especialistas em sites de alta performance para hotelaria com motor de reserva direta integrado e otimizado para conversão." },
      { titulo: "Estrategistas de Tráfego", desc: "Especialistas em estratégia e tráfego pago para hotelaria que constroem funis de conversão com ROI mensurável para cada tipo de negócio." },
    ],
    quote: "“Cada hotel tem um potencial que ainda não foi explorado. Nós estamos aqui para desbloqueá-lo.”",
    ctaH2a: "Pronto para ter uma ",
    ctaH2strong: "Agência de Marketing para Hotéis",
    ctaH2b: " do seu lado?",
    ctaP: "Em 30 minutos, mapeamos as principais oportunidades de reservas diretas do seu hotel — sem compromisso.",
    ctaWaText: "Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem.",
    ctaBtn: "Solicitar Diagnóstico Gratuito",
    ctaSub: "Sem compromisso · 100% gratuito",
  },
  en: {
    heroLabel: "Who we are",
    heroH1a: "The ",
    heroH1strong: "Hotel Marketing",
    heroH1b: "agency that transforms results",
    heroP: "Meet the team of specialists in Hotel Marketing and Direct Booking Strategy",
    sobreLabel: "About Réserve",
    sobreH2a: "Founded to free hotels from ",
    sobreH2strong: "OTA dependency",
    sobreParas: [
      "RÉSERVE is a Hotel Marketing agency specialized in diagnosis, strategy and direct bookings for hotels, inns and experience lodges. Our expertise is turning digital presence into direct bookings and real revenue.",
      "Founded with the mission to free hospitality businesses from OTA dependency, RÉSERVE combines high-level marketing strategy with deep knowledge of the particularities of the Brazilian hotel sector.",
      "Our team of specialists works in an integrated way — combining paid traffic, Google Hotel Ads, branding, content and technology to build owned acquisition channels that work for your hotel 24 hours a day.",
      "With exclusive hotel marketing methodologies, we have already helped dozens of properties increase their direct bookings, reduce commission costs and consolidate their brand as a market reference.",
    ],
    servLabel: "What we do",
    servH2a: "Services specialized in ",
    servH2strong: "hotel marketing",
    servP: "From paid traffic to booking technology, we work across every front that turns your hotel's digital presence into direct revenue.",
    valoresLabel: "Our Values",
    valoresH2a: "What guides every ",
    valoresH2strong: "decision we make",
    valores: [
      { titulo: "Results-Focused", desc: "Every hotel marketing action we run is measured and oriented to the real return on your investment." },
      { titulo: "Passion for the Sector", desc: "We live and breathe hospitality. That deep knowledge is what sets us apart from generic marketing agencies." },
      { titulo: "Constant Innovation", desc: "Hotel marketing strategies evolve constantly and we evolve with them, to always deliver what generates real results." },
      { titulo: "Excellence", desc: "No detail is irrelevant when it comes to positioning your hotel as the best option in the market." },
      { titulo: "Partnership", desc: "We treat your hotel as if it were our own. Your success in direct bookings is our result." },
      { titulo: "Dedicated Team", desc: "Every member is a specialist in hotel marketing — no generalists. Only people who understand hospitality." },
    ],
    timeLabel: "The Team",
    timeH2a: "A Team of ",
    timeH2strong: "Hotel Marketing Specialists",
    equipe: [
      { titulo: "Hotel Marketing Specialists", desc: "Professionals certified in digital campaigns for hospitality, SEO, Google Hotel Ads and social media management." },
      { titulo: "Designers and Creatives", desc: "A creative team specialized in visual content for hotels — photos, videos and brand identity that raise the perception of value." },
      { titulo: "Developers", desc: "Specialists in high-performance hospitality websites with an integrated, conversion-optimized direct booking engine." },
      { titulo: "Traffic Strategists", desc: "Specialists in strategy and paid traffic for hospitality who build conversion funnels with measurable ROI for every type of business." },
    ],
    quote: "“Every hotel has potential that hasn't been explored yet. We're here to unlock it.”",
    ctaH2a: "Ready to have a ",
    ctaH2strong: "Hotel Marketing Agency",
    ctaH2b: " on your side?",
    ctaP: "In 30 minutes, we map the main direct booking opportunities for your hotel — with no commitment.",
    ctaWaText: "Hi! I'd like to receive a free strategic assessment of my property's digital presence.",
    ctaBtn: "Request a Free Assessment",
    ctaSub: "No commitment · 100% free",
  },
};

const Empresa = () => {
  const { locale } = useLocale();
  const c = content[locale === "en" ? "en" : "pt"];
  const waHref = `https://wa.me/5535998067432?text=${encodeURIComponent(c.ctaWaText)}`;

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
                {c.heroLabel}
              </span>
              <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-extralight text-white leading-[1.06] tracking-[-0.025em] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {c.heroH1a}
              <strong className="font-semibold">{c.heroH1strong}</strong>
              <br />{c.heroH1b}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[15px] md:text-base font-light leading-[1.85]"
              style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto" }}
            >
              {c.heroP}
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
                {c.sobreLabel}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="h2 mb-10"
              style={{ color: TEXT_HEAD, fontWeight: 400 }}
            >
              {c.sobreH2a}
              <strong className="font-semibold">{c.sobreH2strong}</strong>
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
              {c.sobreParas.map((p, i) => (
                <p key={i} className="text-[15px] font-light leading-[1.85]" style={{ color: TEXT_BODY }}>
                  {p}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Serviços ── */}
        <section className="py-20 md:py-24 px-6 md:px-16" style={{ background: BG_CREAM }}>
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span
                className="text-[10px] font-medium tracking-[0.3em] uppercase"
                style={{ color: BRAND_GREEN }}
              >
                {c.servLabel}
              </span>
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            </motion.div>

            <motion.h2 variants={fadeUp} className="h2 mb-5" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
              {c.servH2a}
              <strong className="font-semibold">{c.servH2strong}</strong>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[15px] font-light leading-[1.85] mb-9"
              style={{ color: TEXT_BODY, maxWidth: "560px", margin: "0 auto 2.25rem" }}
            >
              {c.servP}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
              {servicos.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:scale-[1.04]"
                  style={{
                    background: BG_CARD,
                    border: `1px solid ${BORDER}`,
                    color: TEXT_HEAD,
                    boxShadow: "0 2px 12px rgba(26,15,8,0.04)",
                  }}
                >
                  {s.label}
                </Link>
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
                  {c.valoresLabel}
                </span>
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              </div>
              <h2 className="h2" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
                {c.valoresH2a}
                <strong className="font-semibold">{c.valoresH2strong}</strong>
              </h2>
            </motion.div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ borderTop: `1px solid ${BORDER}`, borderLeft: `1px solid ${BORDER}` }}
            >
              {c.valores.map((v, i) => (
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
                    {valorIcons[i]}
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
                  {c.timeLabel}
                </span>
                <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              </div>
              <h2 className="h2" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
                {c.timeH2a}
                <strong className="font-semibold">{c.timeH2strong}</strong>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {c.equipe.map((e, i) => (
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
              {c.quote}
            </motion.p>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-16 md:py-20 px-6 md:px-16 relative overflow-hidden"
          style={{ background: "#2a1f14" }}
        >
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <Image
              src="/img/resource/seedsbackground.webp"
              alt=""
              fill
              quality={85}
              sizes="100vw"
              className="object-cover"
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
              {c.ctaH2a}
              <strong className="font-extralight italic" style={{ color: "rgba(255,255,255,0.75)" }}>
                {c.ctaH2strong}
              </strong>
              {c.ctaH2b}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[15px] font-light leading-[1.8] mb-8"
              style={{ color: "rgba(255,255,255,0.55)", maxWidth: "480px", margin: "0 auto 2rem" }}
            >
              {c.ctaP}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-medium text-[13px] text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: BRAND_BROWN, letterSpacing: "0.05em" }}
              >
                {c.ctaBtn}
              </Link>
              <p
                className="mt-3 text-[11px] font-light"
                style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}
              >
                {c.ctaSub}
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
