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
    // Mango section
    return {
      background: 'rgba(255,140,0,0.25)',
      borderColor: 'rgba(255,140,0,0.3)',
    };
  } else {
    // Strawberry and banana section
    return {
      background: 'rgba(255,60,80,0.25)',
      borderColor: 'rgba(255,60,80,0.3)',
    };
  }
}

export default function Navbar({ scrollProgress = 0 }: NavbarProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAtTop = scrollY < 50;
  const style = isAtTop
    ? { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }
    : getNavStyle(scrollProgress);

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
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1px solid',
          borderColor: style.borderColor,
          backdropFilter: 'blur(20px)',
          background: style.background,
          fontFamily: 'Inter, sans-serif',
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
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
          }}
        >
          Home
        </a>
        <a
          href="#products"
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
          }}
        >
          Our Products
        </a>
        <a
          href="#story"
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
          }}
        >
          Our Story
        </a>
        <a
          href="#career"
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
          }}
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
          style={{
            display: 'inline-block',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '13px',
            fontWeight: 500,
            padding: '8px 20px',
            borderRadius: '999px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
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
