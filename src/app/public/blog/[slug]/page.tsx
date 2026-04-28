import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getAllSlugs, blogPosts } from "@/data/blog-posts";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Artigo não encontrado | Réserve" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.reservemarketing.com.br";

  return {
    title: `${post.title} | Réserve Blog`,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    alternates: {
      canonical: `${siteUrl}/public/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Réserve Marketing"],
    },
  };
}

const BRAND_GREEN = "#84936f";
const BRAND_BROWN = "#994f2a";
const BG_CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.2)";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#7a6a5e";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    keywords: post.keywords.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Réserve Marketing",
      url: "https://www.reservemarketing.com.br",
    },
    author: {
      "@type": "Organization",
      name: "Réserve Marketing",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: "/" },
          { name: "Blog", url: "/public/blog" },
          { name: post.category, url: `/public/blog` },
          { name: post.title, url: `/public/blog/${post.slug}` },
        ]}
      />
      <Header />
      <main style={{ background: "#F0EBE3", minHeight: "100vh" }}>
        {/* Breadcrumb + Hero */}
        <section className="pt-32 pb-10 px-6 md:px-16" style={{ background: "#F0EBE3" }}>
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: TEXT_BODY }}>
              <Link href="/" style={{ color: TEXT_BODY }} className="hover:underline">
                Início
              </Link>
              <span>/</span>
              <Link href="/public/blog" style={{ color: TEXT_BODY }} className="hover:underline">
                Blog
              </Link>
              <span>/</span>
              <span style={{ color: TEXT_HEAD }}>{post.category}</span>
            </nav>

            {/* Category */}
            <div className="mb-5">
              <span
                className="text-[10px] font-medium tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
                style={{ background: "rgba(132,147,111,0.12)", color: BRAND_GREEN }}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="h2 mb-5"
              style={{ color: TEXT_HEAD, fontWeight: 400, lineHeight: "1.2" }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-5 mb-8" style={{ color: TEXT_BODY }}>
              <span className="text-[13px]">{formatDate(post.publishedAt)}</span>
              <span className="w-1 h-1 rounded-full" style={{ background: TEXT_BODY }} />
              <span className="text-[13px]">{post.readTime} min de leitura</span>
            </div>

            {/* Excerpt */}
            <p
              className="paragraph italic mb-10 pb-10"
              style={{
                color: TEXT_BODY,
                fontWeight: 300,
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              {post.excerpt}
            </p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <section className="pb-16 px-6 md:px-16">
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
            >
              <div>
                <p className="text-[15px] font-semibold mb-1" style={{ color: TEXT_HEAD }}>
                  Quer aplicar essas estratégias no seu hotel?
                </p>
                <p className="text-[14px] font-light" style={{ color: TEXT_BODY }}>
                  Solicite um diagnóstico gratuito e entenda onde sua operação pode crescer.
                </p>
              </div>
              <a
                href="https://wa.me/553597742984?text=Olá! Li um artigo do blog da Réserve e gostaria de receber um diagnóstico estratégico gratuito."
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center px-7 py-3 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: BRAND_BROWN, letterSpacing: "0.04em" }}
              >
                Diagnóstico Gratuito
              </a>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="pb-20 px-6 md:px-16">
            <div className="max-w-3xl mx-auto">
              <p
                className="text-[10px] font-medium tracking-[0.3em] uppercase mb-6"
                style={{ color: BRAND_GREEN }}
              >
                Artigos Relacionados
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/public/blog/${p.slug}`}
                    className="group flex flex-col gap-3 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{
                      background: BG_CARD,
                      border: `1px solid ${BORDER}`,
                      textDecoration: "none",
                    }}
                  >
                    <span
                      className="text-[10px] font-medium tracking-[0.2em] uppercase"
                      style={{ color: BRAND_GREEN }}
                    >
                      {p.category}
                    </span>
                    <h3
                      className="text-[15px] font-semibold leading-snug transition-colors duration-300 group-hover:text-[#994f2a]"
                      style={{ color: TEXT_HEAD }}
                    >
                      {p.title}
                    </h3>
                    <span
                      className="text-[12px] font-medium mt-auto"
                      style={{ color: BRAND_BROWN }}
                    >
                      Ler artigo →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
