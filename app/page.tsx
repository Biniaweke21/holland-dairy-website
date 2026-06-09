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
  const [heroComplete, setHeroComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Navbar scrollProgress={scrollProgress} />
      <div className="hidden md:block">
        <ScrollVideoHero onScrollProgress={setScrollProgress} onHeroComplete={() => setHeroComplete(true)} />
      </div>
      <div className="block md:hidden">
        <ScrollVideoHeroMobile onScrollProgress={setScrollProgress} />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: isMobile ? '0' : '-60vh',
          paddingTop: isMobile ? '0' : '60vh',
          background: '#ffffff',
          borderRadius: isMobile ? '0' : '24px 24px 0 0',
          boxShadow: isMobile ? 'none' : '0 -40px 80px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          opacity: isMobile ? 1 : (heroComplete ? 1 : 0),
          pointerEvents: isMobile ? 'auto' : (heroComplete ? 'auto' : 'none'),
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
