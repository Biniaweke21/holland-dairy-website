'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
  scrollProgress?: number;
}

function getNavStyle(progress: number): { background: string; borderColor: string } {
  if (progress >= 0 && progress < 0.33) {
    // Natural yogurt / white section
    return {
      background: 'rgba(255,255,255,0.15)',
      borderColor: 'rgba(255,255,255,0.2)',
    };
  } else if (progress >= 0.33 && progress < 0.66) {
    // Mango/strawberry section
    return {
      background: 'rgba(255,140,0,0.25)',
      borderColor: 'rgba(255,140,0,0.3)',
    };
  } else {
    // Banana section
    return {
      background: 'rgba(255,220,50,0.25)',
      borderColor: 'rgba(255,220,50,0.3)',
    };
  }
}

export default function Navbar({ scrollProgress = 0 }: NavbarProps) {
  const [scrollY, setScrollY] = useState(0);
  const [inWhiteSection, setInWhiteSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      const heroHeight = window.innerHeight;
      setInWhiteSection(sy > heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAtTop = scrollY < 50;
  const heroStyle = isAtTop
    ? { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }
    : getNavStyle(scrollProgress);

  const whiteStyle = {
    background: 'rgba(255,255,255,0.95)',
    borderColor: 'rgba(0,0,0,0.1)',
  };

  const style = inWhiteSection ? whiteStyle : heroStyle;
  const linkColor = inWhiteSection ? '#0A0A0A' : 'rgba(255,255,255,0.75)';
  const linkHoverColor = inWhiteSection ? '#2D7A3A' : 'white';
  const ctaBorder = inWhiteSection ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)';
  const ctaColor = inWhiteSection ? '#0A0A0A' : 'white';
  const ctaHoverBg = inWhiteSection ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)';
  const ctaHoverBorder = inWhiteSection ? '#2D7A3A' : 'rgba(255,255,255,0.6)';
  const shadowColor = inWhiteSection ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.15)';

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        padding: '0 24px',
      }}
    >
      <nav
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '1200px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          borderRadius: '16px',
          transition: 'all 0.4s ease, background 0.6s ease, border-color 0.6s ease',
          boxShadow: `0 8px 32px ${shadowColor}`,
          border: '1px solid',
          borderColor: style.borderColor,
          backdropFilter: 'blur(20px)',
          background: style.background,
          fontFamily: 'Nunito, sans-serif',
        }}
      >
      {/* Left - Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/holland-logo.png"
          alt="Holland Dairy"
          style={{ height: '40px', objectFit: 'contain', borderRadius: '16px' }}
        />
      </div>

      {/* Center - Nav Links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
        className="nav-center"
      >
        <a
          href="#home"
          style={{ fontSize: '14px', fontWeight: 600, color: linkColor, textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
        >
          Home
        </a>
        <a
          href="#products"
          style={{ fontSize: '14px', fontWeight: 600, color: linkColor, textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
        >
          Our Products
        </a>
        <a
          href="#story"
          style={{ fontSize: '14px', fontWeight: 600, color: linkColor, textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
        >
          Our Story
        </a>
        <a
          href="#career"
          style={{ fontSize: '14px', fontWeight: 600, color: linkColor, textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
        >
          Career
        </a>
      </div>

      {/* Right - CTA Button */}
      <div className="nav-right">
        <a
          href="https://holland-dairy.com/our-products/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', background: 'transparent', border: `1px solid ${ctaBorder}`, color: ctaColor, fontSize: '13px', fontWeight: 500, padding: '8px 20px', borderRadius: '999px', textDecoration: 'none', transition: 'all 0.2s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = ctaHoverBg; e.currentTarget.style.borderColor = ctaHoverBorder; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = ctaBorder; }}
        >
          Our Products
        </a>
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .nav-center {
            display: none !important;
          }
          .nav-right {
            display: none !important;
          }
          nav {
            justify-content: center !important;
            padding: 0 24px !important;
          }
        }
      `}</style>
      </nav>
    </div>
  );
}
