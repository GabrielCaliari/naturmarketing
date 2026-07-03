"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "./_components/Banner";
import { LocalBusinessJsonLd, ServiceJsonLd } from "@/components/SEO/JsonLd";
import FloatingSocial from "@/components/FloatingSocial";
import { useLocale } from "@/context/LocaleContext";
import TransformSection   from "./_components/TransformSection";
import OQueFazemos        from "./_components/OQueFazemos";
import ParaQuemFazemos    from "./_components/ParaQuemFazemos";
import ResultadosSection  from "./_components/ResultadosSection";

// Abaixo da dobra: divididas em chunks separados para reduzir o JS avaliado
// no carregamento inicial (Total Blocking Time / Speed Index). Continuam
// renderizadas no servidor (ssr padrão = true), só o bundle é adiado.
const PlataformasSection = dynamic(() => import("./_components/PlataformasSection"));
const ComparativoSection = dynamic(() => import("./_components/ComparativoSection"));
const BlogPreview        = dynamic(() => import("./_components/BlogPreview"));
const FAQ                = dynamic(() => import("./_components/FAQ"));
const ConsultoriaBanner  = dynamic(() => import("./_components/ConsultoriaBanner"));

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
