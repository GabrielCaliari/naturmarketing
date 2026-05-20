"use client";

import { Suspense, lazy } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "./_components/Banner";
import { LocalBusinessJsonLd, ServiceJsonLd } from "@/components/SEO/JsonLd";
import FloatingSocial from "@/components/FloatingSocial";
import { useLocale } from "@/context/LocaleContext";

const TransformSection   = lazy(() => import("./_components/TransformSection"));
const OQueFazemos        = lazy(() => import("./_components/OQueFazemos"));
const ParaQuemFazemos    = lazy(() => import("./_components/ParaQuemFazemos"));
const PlataformasSection = lazy(() => import("./_components/PlataformasSection"));
const ComparativoSection = lazy(() => import("./_components/ComparativoSection"));
const ResultadosSection  = lazy(() => import("./_components/ResultadosSection"));
const BlogPreview        = lazy(() => import("./_components/BlogPreview"));
const FAQ                = lazy(() => import("./_components/FAQ"));
const ConsultoriaBanner  = lazy(() => import("./_components/ConsultoriaBanner"));

const SectionSkeleton = () => (
  <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg" />
);

const Home = () => {
  const { locale } = useLocale();

  return (
    <>
      <LocalBusinessJsonLd />
      <ServiceJsonLd />

      <Header />
      <FloatingSocial />

      <main className="overflow-x-hidden">
        {/* key={locale} em cada seção força remount individual ao trocar idioma */}
        <Banner key={`banner-${locale}`} />

        <Suspense fallback={<SectionSkeleton />}>
          <TransformSection key={`transform-${locale}`} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ResultadosSection key={`results-${locale}`} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <OQueFazemos key={`services-${locale}`} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ParaQuemFazemos key={`para-${locale}`} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <PlataformasSection key={`plat-${locale}`} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ComparativoSection key={`comp-${locale}`} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <BlogPreview key={`blog-${locale}`} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <FAQ key={`faq-${locale}`} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ConsultoriaBanner key={`cta-${locale}`} />
        </Suspense>
      </main>

      <Footer key={`footer-${locale}`} />
    </>
  );
};

export default Home;
