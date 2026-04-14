"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "./_components/Banner";
import TransformSection from "./_components/TransformSection";
import QuemSomos from "./_components/QuemSomos";
import OQueFazemos from "./_components/OQueFazemos";
import ParaQuemFazemos from "./_components/ParaQuemFazemos";
import ConsultoriaBanner from "./_components/ConsultoriaBanner";
import EspecialistasSection from "./_components/EspecialistasSection";
import PlataformasSection from "./_components/PlataformasSection";
import ComparativoSection from "./_components/ComparativoSection";

const Home = () => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Banner />
        <TransformSection />
        {/* <QuemSomos />        <EspecialistasSection /> */}
        <OQueFazemos />
        <ParaQuemFazemos />
        <PlataformasSection />
        <ComparativoSection />
        <ConsultoriaBanner />
      </main>
      <Footer />
    </>
  );
};

export default Home;
