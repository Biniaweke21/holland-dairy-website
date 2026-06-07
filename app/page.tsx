"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import ScrollVideoHero from "@/components/scroll-video-hero";
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
      <ScrollVideoHero onScrollProgress={setScrollProgress} />
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '-100vh',
          paddingTop: '100vh',
          background: '#ffffff',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -40px 80px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}
      >
        <AboutSection />
        <ProductShowcase />
        <Footer />
      </div>
    </main>
  );
}
