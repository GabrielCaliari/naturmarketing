"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { getFeaturedPosts } from "@/data/blog-posts";
import { useLocale } from "@/context/LocaleContext";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

const categoryColors: Record<string, string> = {
  "Estratégia": "#84936f",
  "Google Ads": "#4a7c9e",
  "OTAs & Canal Direto": "#994f2a",
  "SEO": "#5a7a4a",
  "Pousadas": "#8a6f4a",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPreview() {
  const { locale } = useLocale();
  const posts = getFeaturedPosts(3);

  const labels = {
    section: locale === "en" ? "From the Blog" : "Do Blog",
    h2: locale === "en" ? "Insights for" : "Conteúdo para",
    h2strong: locale === "en" ? "Hotel Marketing" : "Marketing Hoteleiro",
    body: locale === "en"
      ? "Strategies, tools and data for hotels that want to grow through direct bookings."
      : "Estratégias, ferramentas e dados para hotéis que querem crescer com reservas diretas.",
    read: locale === "en" ? "Read article →" : "Ler artigo →",
    readmin: locale === "en" ? "min read" : "min",
    cta: locale === "en" ? "See all articles" : "Ver todos os artigos",
  };

  return (
    <section className="py-10 md:py-16" style={{ background: "#F7F3EE" }}>
      <motion.div
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>
              {labels.section}
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h2 className="h2" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
            {labels.h2}{" "}
            <strong className="font-semibold">{labels.h2strong}</strong>
          </h2>
          <p className="paragraph max-w-lg" style={{ fontWeight: 300, color: TEXT_BODY }}>
            {labels.body}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => {
            const catColor = categoryColors[post.category] || BRAND_GREEN;
            return (
              <motion.div key={post.slug} variants={fadeUp}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                  style={{ background: BG_CARD, border: `1px solid ${BORDER}`, textDecoration: "none" }}
                >
                  {/* Cover colorido com categoria */}
                  <div
                    className="w-full flex flex-col items-start justify-end px-5 py-4 relative overflow-hidden"
                    style={{ height: "140px", background: catColor }}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                      }}
                    />
                    <span
                      className="relative z-10 text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <div className="flex items-center gap-2" style={{ color: TEXT_BODY }}>
                      <span className="text-[11px]">{post.readTime} {labels.readmin}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: TEXT_BODY }} />
                      <span className="text-[11px]">{formatDate(post.publishedAt, locale)}</span>
                    </div>

                    <h3
                      className="text-[15px] font-semibold leading-snug transition-colors duration-300 group-hover:text-[#994f2a] flex-1"
                      style={{ color: TEXT_HEAD }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-[13px] leading-[1.7] font-light" style={{ color: TEXT_BODY }}>
                      {post.excerpt.slice(0, 100)}…
                    </p>

                    <div
                      className="flex items-center justify-between mt-2 pt-3"
                      style={{ borderTop: `1px solid ${BORDER}` }}
                    >
                      <span
                        className="text-[11px] font-medium transition-colors duration-300 group-hover:text-[#994f2a]"
                        style={{ color: BRAND_BROWN }}
                      >
                        {labels.read}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            style={{ background: BG_CARD, border: `1px solid ${BORDER}`, color: TEXT_HEAD }}
          >
            {labels.cta}
            <span style={{ color: BRAND_BROWN }}>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
