"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { blogPostsMeta as blogPosts } from "@/data/blog-meta";
import { useLocale } from "@/context/LocaleContext";
import { formatDate } from "@/lib/format-date";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#6e5e52";

export default function BlogPageContent() {
  const { locale, t } = useLocale();
  const byDateDesc = (a: typeof blogPosts[number], b: typeof blogPosts[number]) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  const featured = blogPosts.filter((p) => p.featured).sort(byDateDesc);
  const rest = blogPosts.filter((p) => !p.featured).sort(byDateDesc);

  return (
    <main style={{ background: "#F0EBE3", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-14 px-6 md:px-16" style={{ background: "#F0EBE3" }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: BRAND_GREEN }}>
              {t("blog.listing.label")}
            </span>
            <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
          </div>
          <h1 className="h2 mb-4" style={{ color: TEXT_HEAD, fontWeight: 400 }}>
            {t("blog.listing.h1")}{" "}
            <strong className="font-semibold">{t("blog.listing.h1strong")}</strong>
          </h1>
          <p className="paragraph max-w-xl mx-auto" style={{ color: TEXT_BODY, fontWeight: 300 }}>
            {t("blog.listing.body")}
          </p>
        </div>
      </section>

      {/* Destaques */}
      <section className="pb-10 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <Reveal
            as="p"
            className="text-[10px] font-medium tracking-[0.3em] uppercase mb-6"
            style={{ color: BRAND_GREEN }}
          >
            {t("blog.listing.featured")}
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {featured.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60} className="h-full">
                <BlogCard post={post} highlight locale={locale} t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Todos os artigos */}
      <section className="pb-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <Reveal
            as="p"
            className="text-[10px] font-medium tracking-[0.3em] uppercase mb-6"
            style={{ color: BRAND_GREEN }}
          >
            {t("blog.listing.all")}
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60} className="h-full">
                <BlogCard post={post} locale={locale} t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BlogCard({
  post,
  highlight = false,
  locale,
  t,
}: {
  post: (typeof blogPosts)[0];
  highlight?: boolean;
  locale: string;
  t: (key: string) => string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: BG_CARD, border: `1px solid ${BORDER}`, textDecoration: "none" }}
    >
      <div className="w-full relative overflow-hidden" style={{ height: "190px" }}>
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />
        <span
          className="absolute bottom-3 left-4 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
          style={{ background: highlight ? BRAND_GREEN : BRAND_BROWN, color: "#fff" }}
        >
          {post.category}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center gap-2" style={{ color: TEXT_BODY }}>
          <span className="text-[11px]">{post.readTime} {t("blog.readmin")}</span>
          <span className="w-1 h-1 rounded-full" style={{ background: TEXT_BODY }} />
          <span className="text-[11px]">{formatDate(post.publishedAt, locale)}</span>
        </div>

        <h2
          className="text-[16px] font-semibold leading-snug transition-colors duration-300 group-hover:text-[#994f2a]"
          style={{ color: TEXT_HEAD }}
        >
          {post.title}
        </h2>

        <p className="text-[13px] leading-[1.7] font-light flex-1" style={{ color: TEXT_BODY }}>
          {post.excerpt}
        </p>

        <div
          className="flex items-center gap-1.5 mt-2 pt-3 text-[11px] font-medium"
          style={{ borderTop: `1px solid ${BORDER}`, color: BRAND_BROWN }}
        >
          <span>{t("blog.readmore")}</span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
