import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllSlugs, blogPosts } from "@/data/blog-posts";
import { getSeoMeta } from "@/data/blog-meta";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import ArticleContent from "./_components/ArticleContent";

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

  // Versões cortadas para a SERP (ver getSeoMeta); o `title` e o `excerpt` do
  // post continuam servindo o <h1> e o card da listagem. Sem sufixo de marca: a
  // Réserve ainda é desconhecida na busca, e num artigo disputando a posição 8
  // quem ganha o clique é a manchete, não o nome da agência.
  const seo = getSeoMeta(slug);
  const tituloSerp = seo?.titulo ?? post.title;
  const descricaoSerp = seo?.descricao ?? post.excerpt;

  return {
    title: tituloSerp,
    description: descricaoSerp,
    keywords: post.keywords.join(", "),
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [COMPANY_NAP.name],
      images: [{ url: post.coverImage, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Related posts: prefer same category, then fill with the most recent others.
  // The recency fallback guarantees every article links out to 2 others, so
  // single-post categories (e.g. "Pousadas") still receive internal links and
  // don't end up orphaned / "crawled, currently not indexed".
  const sameCategory = blogPosts.filter(
    (p) => p.slug !== slug && p.category === post.category
  );
  const fillers = blogPosts
    .filter((p) => p.slug !== slug && !sameCategory.includes(p))
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  const related = [...sameCategory, ...fillers].slice(0, 2);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    keywords: post.keywords.join(", "),
    inLanguage: "pt-BR",
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: COMPANY_NAP.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.jpg`,
      },
    },
    author: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: COMPANY_NAP.name,
      url: siteUrl,
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
          { name: "Blog", url: "/blog" },
          { name: post.category, url: `/blog` },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <Header />
      <ArticleContent post={post} related={related} />
      <Footer />
    </>
  );
}
