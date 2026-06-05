import type { Metadata } from "next";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import BlogPageContent from "./_components/BlogPageContent";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Blog | Réserve — Marketing Hoteleiro",
  description:
    "Artigos sobre marketing hoteleiro, Google Hotel Ads, reservas diretas, SEO para hotéis e estratégias para reduzir dependência de OTAs. Conteúdo especializado para hoteleiros.",
  keywords:
    "blog marketing hoteleiro, artigos marketing para hotéis, Google Hotel Ads, reservas diretas, SEO para hotéis, reduzir OTAs",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Blog | Réserve Marketing Hoteleiro",
    description:
      "Conteúdo especializado em marketing hoteleiro: estratégias, Google Hotel Ads, SEO e como aumentar reservas diretas.",
    type: "website",
    url: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <BlogPageContent />
      <Footer />
    </>
  );
}
