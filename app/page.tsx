"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import ScrollVideoHero from "@/components/scroll-video-hero";
import AboutSection from "@/components/about-section";
import ProductShowcase from "@/components/product-showcase";
import Footer from "@/components/footer";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroComplete, setHeroComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Navbar scrollProgress={scrollProgress} />
      <ScrollVideoHero onScrollProgress={setScrollProgress} onHeroComplete={() => setHeroComplete(true)} />
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#ffffff',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -40px 80px rgba(0,0,0,0.4)',
          opacity: heroComplete ? 1 : 0,
          pointerEvents: heroComplete ? 'auto' : 'none',
          transition: 'opacity 0.6s ease',
        }}
      >
        <AboutSection />
        <ProductShowcase />
        <Footer />
      </div>
    </main>
  );
}
