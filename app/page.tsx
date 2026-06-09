"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import ScrollVideoHero from "@/components/scroll-video-hero";
import ScrollVideoHeroMobile from "@/components/scroll-video-hero-mobile";
import AboutSection from "@/components/about-section";
import ProductShowcase from "@/components/product-showcase";
import Footer from "@/components/footer";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Navbar scrollProgress={scrollProgress} />
      <div className="hidden md:block">
        <ScrollVideoHero onScrollProgress={setScrollProgress} />
      </div>
      <div className="block md:hidden">
        <ScrollVideoHeroMobile onScrollProgress={setScrollProgress} />
      </div>
      <div>
        <AboutSection />
        <ProductShowcase />
        <Footer />
      </div>
    </main>
  );
}
