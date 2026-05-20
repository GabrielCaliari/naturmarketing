import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllSlugs, blogPosts } from "@/data/blog-posts";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.reservemarketing.com.br";

  return {
    title: `${post.title} | Réserve Blog`,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
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
