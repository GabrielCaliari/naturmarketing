"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import { formatDate } from "@/lib/format-date";
import type { BlogPost } from "@/data/blog-posts";
import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";
import Reveal from "@/components/Reveal";
import ReadingProgress from "./ReadingProgress";

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#6e5e52";

/* Autoria fixa — não há campo de autor nos dados dos posts. */
const AUTHOR_NAME = "Equipe Réserve";
const AUTHOR_BIO =
  "A Réserve é uma agência de marketing especializada em hotelaria. Trabalhamos com hotéis, resorts e pousadas para reduzir a dependência de OTAs e transformar o canal direto na principal fonte de reservas.";

/**
 * Avatar da autoria: o wordmark "réserve" do header/footer, não um monograma.
 * A marca é tipográfica — não existe arquivo de logo em public/img/logos/ —
 * então reproduzimos o mesmo tratamento do Footer (var(--font-display),
 * minúsculo, peso 400, TEXT_HEAD sobre fundo claro), que é o do fundo claro.
 * O header usa a versão branca, que não serviria aqui.
 */
function AuthorAvatar({ size }: { size: number }) {
  return (
    <div
      // decorativo: o nome da autoria já é lido logo ao lado, então o
      // wordmark repetido só poluiria o leitor de tela
      aria-hidden="true"
      className="shrink-0 rounded-full flex items-center justify-center overflow-hidden"
      style={{
        width: size,
        height: size,
        background: "#F0EBE3",
        border: `1px solid ${BORDER}`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          // proporção calibrada para o wordmark de 7 letras caber na corda
          // central do círculo sem encostar na borda
          fontSize: Math.round(size * 0.235),
          fontWeight: 400,
          color: TEXT_HEAD,
          lineHeight: 1,
        }}
      >
        réserve
      </span>
    </div>
  );
}

export default function ArticleContent({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const { locale, t } = useLocale();

  return (
    <main style={{ background: "#F0EBE3", minHeight: "100vh" }}>
      <ReadingProgress />

      {/* Breadcrumb + Hero */}
      <section className="pt-32 pb-10 px-6 md:px-16" style={{ background: "#F0EBE3" }}>
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: TEXT_BODY }}>
            <Link href="/" style={{ color: TEXT_BODY }} className="hover:underline">
              {t("blog.article.home")}
            </Link>
            <span>/</span>
            <Link href="/blog" style={{ color: TEXT_BODY }} className="hover:underline">
              Blog
            </Link>
            <span>/</span>
            <span style={{ color: TEXT_HEAD }}>{post.category}</span>
          </nav>

          <div className="mb-5">
            <span
              className="text-[10px] font-medium tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(132,147,111,0.12)", color: BRAND_GREEN }}
            >
              {post.category}
            </span>
          </div>

          <h1 className="h2 mb-5" style={{ color: TEXT_HEAD, fontWeight: 400, lineHeight: "1.2" }}>
            {post.title}
          </h1>

          {/* Autoria + meta (data e tempo de leitura) */}
          <div className="flex items-center gap-4 mb-8">
            <AuthorAvatar size={48} />
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] font-semibold" style={{ color: TEXT_HEAD }}>
                {AUTHOR_NAME}
              </span>
              <span className="text-[13px] font-light" style={{ color: TEXT_BODY }}>
                {formatDate(post.publishedAt, locale)} &bull; {post.readTime} {t("blog.readmin")}
              </span>
            </div>
          </div>

          <p className="paragraph italic mb-8" style={{ color: TEXT_BODY, fontWeight: 300 }}>
            {post.excerpt}
          </p>

          <div className="w-full relative overflow-hidden rounded-2xl mb-10" style={{ height: "380px" }}>
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="article-content"
            style={{ color: TEXT_BODY }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tópicos (keywords) */}
          {post.keywords.length > 0 && (
            <Reveal className="mt-12 pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
              <p
                className="text-[10px] font-medium tracking-[0.3em] uppercase mb-4"
                style={{ color: BRAND_GREEN }}
              >
                {t("blog.article.topics")}
              </p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {post.keywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="text-[11px] font-light px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(132,147,111,0.10)",
                      border: `1px solid ${BORDER}`,
                      color: TEXT_BODY,
                    }}
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Bio da autoria */}
          <Reveal
            className="mt-10 rounded-2xl p-6 flex items-start gap-4"
            style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
          >
            <AuthorAvatar size={64} />
            <div>
              <p className="text-[15px] font-semibold mb-2" style={{ color: TEXT_HEAD }}>
                Sobre a {AUTHOR_NAME}
              </p>
              <p className="text-[13px] leading-[1.75] font-light" style={{ color: TEXT_BODY }}>
                {AUTHOR_BIO}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="pb-16 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <Reveal
            className="rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
          >
            <div>
              <p className="text-[15px] font-semibold mb-1" style={{ color: TEXT_HEAD }}>
                {t("blog.article.cta.title")}
              </p>
              <p className="text-[14px] font-light" style={{ color: TEXT_BODY }}>
                {t("blog.article.cta.body")}
              </p>
            </div>
            <DiagnosticoCTA
              className="shrink-0 inline-flex items-center px-7 py-3 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
              trackId="cta_blog"
              source="/blog"
            >
              {t("blog.article.cta.btn")}
            </DiagnosticoCTA>
          </Reveal>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="pb-20 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <Reveal
              as="p"
              className="text-[10px] font-medium tracking-[0.3em] uppercase mb-6"
              style={{ color: BRAND_GREEN }}
            >
              {t("blog.article.related")}
            </Reveal>
            <div className="grid md:grid-cols-2 gap-5">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60} className="h-full">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{ background: BG_CARD, border: `1px solid ${BORDER}`, textDecoration: "none" }}
                  >
                    <div className="relative overflow-hidden" style={{ height: "140px" }}>
                      <Image
                        src={p.coverImage}
                        alt={p.coverAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
                      <span className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full" style={{ background: BRAND_GREEN, color: "#fff" }}>
                        {p.category}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 p-4 flex-1">
                      <h3
                        className="text-[14px] font-semibold leading-snug transition-colors duration-300 group-hover:text-[#994f2a]"
                        style={{ color: TEXT_HEAD }}
                      >
                        {p.title}
                      </h3>
                      <span className="text-[12px] font-medium mt-auto" style={{ color: BRAND_BROWN }}>
                        {t("blog.read")}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
