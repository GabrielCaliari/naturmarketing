"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "./_components/Banner";
import { LocalBusinessJsonLd, ServiceJsonLd } from "@/components/SEO/JsonLd";
import FloatingSocial from "@/components/FloatingSocial";
import { useLocale } from "@/context/LocaleContext";
import TransformSection   from "./_components/TransformSection";
import OQueFazemos        from "./_components/OQueFazemos";
import ParaQuemFazemos    from "./_components/ParaQuemFazemos";
import PlataformasSection from "./_components/PlataformasSection";
import ComparativoSection from "./_components/ComparativoSection";
import ResultadosSection  from "./_components/ResultadosSection";
import BlogPreview        from "./_components/BlogPreview";
import FAQ                from "./_components/FAQ";
import ConsultoriaBanner  from "./_components/ConsultoriaBanner";

const Home = () => {
  const { locale } = useLocale();

  return (
    <>
      <LocalBusinessJsonLd />
      <ServiceJsonLd />

      <Header />
      <FloatingSocial />

      <main className="overflow-x-hidden">
        <Banner key={`banner-${locale}`} />
        <TransformSection key={`transform-${locale}`} />
        <ResultadosSection key={`results-${locale}`} />
        <OQueFazemos key={`services-${locale}`} />
        <ParaQuemFazemos key={`para-${locale}`} />
        <PlataformasSection key={`plat-${locale}`} />
        <ComparativoSection key={`comp-${locale}`} />
        <BlogPreview key={`blog-${locale}`} />
        <FAQ key={`faq-${locale}`} />
        <ConsultoriaBanner key={`cta-${locale}`} />
      </main>

      <Footer key={`footer-${locale}`} />
    </>
  );
};

export default Home;
