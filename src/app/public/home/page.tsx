"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "./_components/Banner";
import { BannerTwo } from "./_components/BannerTwo";
import Contact from "./_components/Contact";
import QuemSomos from "./_components/QuemSomos";
import OQueFazemos from "./_components/OQueFazemos";
import ParaQuemFazemos from "./_components/ParaQuemFazemos";
import ConsultoriaBanner from "./_components/ConsultoriaBanner";

const Home = () => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Banner />
        <QuemSomos />
        <OQueFazemos />
        <ParaQuemFazemos />
        <BannerTwo />
        <ConsultoriaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
