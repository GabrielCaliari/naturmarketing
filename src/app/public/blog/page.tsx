import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.reservemarketing.com.br";

export const metadata: Metadata = {
  title: "Blog | Réserve — Marketing Hoteleiro",
  description:
    "Artigos sobre marketing hoteleiro, Google Hotel Ads, reservas diretas, SEO para hotéis e estratégias para reduzir dependência de OTAs. Conteúdo especializado para hoteleiros.",
  keywords:
    "blog marketing hoteleiro, artigos marketing para hotéis, Google Hotel Ads, reservas diretas, SEO para hotéis, reduzir OTAs",
  alternates: {
    canonical: `${siteUrl}/public/blog`,
  },
  openGraph: {
    title: "Blog | Réserve Marketing Hoteleiro",
    description:
      "Conteúdo especializado em marketing hoteleiro: estratégias, Google Hotel Ads, SEO e como aumentar reservas diretas.",
    type: "website",
    url: `${siteUrl}/public/blog`,
  },
};

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

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <Header />
      <main style={{ background: "#F0EBE3", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          className="pt-32 pb-14 px-6 md:px-16"
          style={{ background: "#F0EBE3" }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
              <span
                className="text-[10px] font-medium tracking-[0.3em] uppercase"
                style={{ color: BRAND_GREEN }}
              >
                Conteúdo Especializado
              </span>
              <div className="w-8 h-px" style={{ background: BRAND_GREEN }} />
            </div>
            <h1
              className="h2 mb-4"
              style={{ color: TEXT_HEAD, fontWeight: 400 }}
            >
              Blog de{" "}
              <strong className="font-semibold">Marketing Hoteleiro</strong>
            </h1>
            <p
              className="paragraph max-w-xl mx-auto"
              style={{ color: TEXT_BODY, fontWeight: 300 }}
            >
              Estratégias, ferramentas e insights para hotéis, resorts e
              pousadas que querem crescer com reservas diretas.
            </p>
          </div>
        </section>

        {/* Destaques */}
        <section className="pb-10 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <p
              className="text-[10px] font-medium tracking-[0.3em] uppercase mb-6"
              style={{ color: BRAND_GREEN }}
            >
              Destaques
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((post) => (
                <BlogCard key={post.slug} post={post} highlight />
              ))}
            </div>
          </div>
        </section>

        {/* Todos os artigos */}
        <section className="pb-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <p
              className="text-[10px] font-medium tracking-[0.3em] uppercase mb-6"
              style={{ color: BRAND_GREEN }}
            >
              Todos os Artigos
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function BlogCard({
  post,
  highlight = false,
}: {
  post: (typeof blogPosts)[0];
  highlight?: boolean;
}) {
  return (
    <Link
      href={`/public/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: BG_CARD,
        border: `1px solid ${BORDER}`,
        textDecoration: "none",
      }}
    >
      {/* Placeholder cover */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: "160px",
          background: highlight
            ? "rgba(132,147,111,0.18)"
            : "rgba(196,164,142,0.12)",
        }}
      >
        <span
          className="text-[11px] font-medium tracking-[0.2em] uppercase"
          style={{ color: BRAND_GREEN }}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-medium tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(132,147,111,0.1)",
              color: BRAND_GREEN,
            }}
          >
            {post.category}
          </span>
          <span
            className="text-[11px]"
            style={{ color: TEXT_BODY }}
          >
            {post.readTime} min
          </span>
        </div>

        <h2
          className="text-[16px] font-semibold leading-snug transition-colors duration-300 group-hover:text-[#994f2a]"
          style={{ color: TEXT_HEAD }}
        >
          {post.title}
        </h2>

        <p
          className="text-[13px] leading-[1.7] font-light flex-1"
          style={{ color: TEXT_BODY }}
        >
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-2 pt-3" style={{ borderTop: `1px solid ${BORDER}` }}>
          <span className="text-[11px]" style={{ color: TEXT_BODY }}>
            {formatDate(post.publishedAt)}
          </span>
          <span
            className="text-[11px] font-medium transition-colors duration-300 group-hover:text-[#994f2a]"
            style={{ color: BRAND_BROWN }}
          >
            Ler artigo →
          </span>
        </div>
      </div>
    </Link>
  );
}
