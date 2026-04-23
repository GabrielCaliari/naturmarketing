"use client";

import { Suspense, lazy } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "./_components/Banner";
import { LocalBusinessJsonLd, ServiceJsonLd } from "@/components/SEO/JsonLd";

// Lazy load components below the fold
const TransformSection = lazy(() => import("./_components/TransformSection"));
const OQueFazemos = lazy(() => import("./_components/OQueFazemos"));
const ParaQuemFazemos = lazy(() => import("./_components/ParaQuemFazemos"));
const PlataformasSection = lazy(() => import("./_components/PlataformasSection"));
const QuemSomos = lazy(() => import("./_components/QuemSomos"));
const EspecialistasSection = lazy(() => import("./_components/EspecialistasSection"));
const ComparativoSection = lazy(() => import("./_components/ComparativoSection"));
const FAQ = lazy(() => import("./_components/FAQ"));
const ConsultoriaBanner = lazy(() => import("./_components/ConsultoriaBanner"));
const Contact = lazy(() => import("./_components/Contact"));

// Loading skeleton component
const SectionSkeleton = () => (
  <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg" />
);

const Home = () => {
  return (
    <>
      {/* Structured Data for Homepage */}
      <LocalBusinessJsonLd />
      <ServiceJsonLd />
      
      <Header />
      <main className="overflow-x-hidden">
        {/* Above the fold - load immediately */}
        <Banner />
        
        {/* Below the fold - lazy load with suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          <TransformSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <OQueFazemos />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <ParaQuemFazemos />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <PlataformasSection />
        </Suspense>

   

        <Suspense fallback={<SectionSkeleton />}>
          <ComparativoSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ConsultoriaBanner />
        </Suspense>

        {/* <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense> */}
      </main>
      <Footer />
    </>
  );
};

export default Home;
