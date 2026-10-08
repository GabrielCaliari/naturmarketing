"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "./_components/Banner";
import { LocalBusinessJsonLd, ServiceJsonLd, ReviewsJsonLd } from "@/components/SEO/JsonLd";
import FloatingSocial from "@/components/FloatingSocial";
import TransformSection   from "./_components/TransformSection";
import OQueFazemos        from "./_components/OQueFazemos";
import ParaQuemFazemos    from "./_components/ParaQuemFazemos";
// Resultados ("Números que falam por si") está fora do ar a pedido do cliente —
// os mesmos números já aparecem na faixa de stats do hero. O componente segue
// em _components/ResultadosSection; para voltar, descomente aqui e no <main>.
// import ResultadosSection  from "./_components/ResultadosSection";

// Abaixo da dobra: divididas em chunks separados para reduzir o JS avaliado
// no carregamento inicial (Total Blocking Time / Speed Index). Continuam
// renderizadas no servidor (ssr padrão = true), só o bundle é adiado.
// Depoimentos entra aqui também: mesmo hoje renderizando null (lista vazia),
// o import estático trazia next/image, Reveal, carrossel e player de vídeo
// para o chunk inicial.
const Depoimentos         = dynamic(() => import("./_components/Depoimentos"));
const PlataformasSection = dynamic(() => import("./_components/PlataformasSection"));
const ComparativoSection = dynamic(() => import("./_components/ComparativoSection"));
const BlogPreview        = dynamic(() => import("./_components/BlogPreview"));
const FAQ                = dynamic(() => import("./_components/FAQ"));
const ConsultoriaBanner  = dynamic(() => import("./_components/ConsultoriaBanner"));

const Home = () => {
  return (
    <>
      <LocalBusinessJsonLd />
      <ServiceJsonLd />
      {/* Só emite algo quando houver depoimento real com nota — ver src/data/depoimentos.ts */}
      <ReviewsJsonLd />

      <Header />
      <FloatingSocial />

      <main className="overflow-x-hidden">
        <Banner />
        {/* Logo abaixo do hero: prova social é a primeira coisa depois da promessa.
            Renderiza null enquanto não houver depoimento cadastrado. */}
        <Depoimentos />
        <TransformSection />
        {/* <ResultadosSection /> */}
        <OQueFazemos />
        <ParaQuemFazemos />
        <PlataformasSection />
        <ComparativoSection />
        <BlogPreview />
        <FAQ />
        <ConsultoriaBanner />
      </main>

      <Footer />
    </>
  );
};

export default Home;
