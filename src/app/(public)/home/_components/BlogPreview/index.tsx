"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getFeaturedPosts } from "@/data/blog-posts";
import { useLocale } from "@/context/LocaleContext";
import { formatDate } from "@/lib/format-date";

const BRAND_GREEN = "#84936f";
// Verde para TEXTO/fundo de badge — >= 4.5:1 com branco (WCAG AA)
const BRAND_GREEN_TEXT = "#5d6b4c";
const BRAND_BROWN = "#994f2a";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#6e5e52";

// Fundos de badge com texto branco 10px: todos >= 4.5:1 (WCAG AA)
const categoryColors: Record<string, string> = {
  "Estratégia": "#5d6b4c",
  "Google Ads": "#3f6b8a",
  "OTAs & Canal Direto": "#994f2a",
  "SEO": "#5a7a4a",
  "Pousadas": "#8a6f4a",
};

export default function BlogPreview() {
  const { locale, t } = useLocale(); // locale usado no formatDate
  const posts = getFeaturedPosts(3);

  const labels = {
    section: t('blog.label'),
    h2: t('blog.h2'),
    h2strong: t('blog.h2.strong'),
    body: t('blog.body'),
    read: t('blog.read'),
    readmin: t('blog.readmin'),
    cta: t('blog.cta'),
  };

  return (
    <section className="py-10 md:py-16" style={{ background: "#F7F3EE" }}>
      <div className="section-container">
        {/* Header */}
        <Reveal className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN_TEXT }}>
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
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => {
            const catColor = categoryColors[post.category] || BRAND_GREEN_TEXT;
            return (
              <Reveal key={post.slug} delay={i * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                  style={{ background: BG_CARD, border: `1px solid ${BORDER}`, textDecoration: "none" }}
                >
                  {/* Cover com imagem real */}
                  <div className="w-full relative overflow-hidden" style={{ height: "180px" }}>
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
                    <span
                      className="absolute bottom-3 left-4 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                      style={{ background: catColor, color: "#fff" }}
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
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            style={{ background: BG_CARD, border: `1px solid ${BORDER}`, color: TEXT_HEAD }}
          >
            {labels.cta}
            <span style={{ color: BRAND_BROWN }}>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
