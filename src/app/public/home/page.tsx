"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "./_components/Banner";
import { BannerFour } from "./_components/BannerFour";
import { BannerThree } from "./_components/BannerThree";
import { BannerTwo } from "./_components/BannerTwo";
import Contact from "./_components/Contact";
import {GlowAppBanner} from "./_components/GlowAppBanner";
import SubscriptionPlans from "./_components/Plans";

const Home = () => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Banner />
        <BannerTwo />
        <GlowAppBanner />
        <BannerThree />
        <BannerFour />
        <SubscriptionPlans />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
