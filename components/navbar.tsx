'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
  scrollProgress?: number;
}

function getNavStyle(progress: number): { background: string; borderColor: string } {
  if (progress >= 0 && progress < 0.33) {
    return { background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' };
  } else if (progress >= 0.33 && progress < 0.66) {
    return { background: 'rgba(255,140,0,0.25)', borderColor: 'rgba(255,140,0,0.3)' };
  } else {
    return { background: 'rgba(255,220,50,0.25)', borderColor: 'rgba(255,220,50,0.3)' };
  }
}

export default function Navbar({ scrollProgress = 0 }: NavbarProps) {
  const [scrollY, setScrollY] = useState(0);
  const [inWhiteSection, setInWhiteSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      setInWhiteSection(sy > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isAtTop = scrollY < 50;
  const heroStyle = isAtTop
    ? { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }
    : getNavStyle(scrollProgress);

  const whiteStyle = { background: 'rgba(255,255,255,0.95)', borderColor: 'rgba(0,0,0,0.1)' };
  const style = inWhiteSection ? whiteStyle : heroStyle;
  const linkColor = inWhiteSection ? '#0A0A0A' : 'rgba(255,255,255,0.75)';
  const linkHoverColor = inWhiteSection ? '#2D7A3A' : 'white';
  const ctaBorder = inWhiteSection ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)';
  const ctaColor = inWhiteSection ? '#0A0A0A' : 'white';
  const ctaHoverBg = inWhiteSection ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)';
  const ctaHoverBorder = inWhiteSection ? '#2D7A3A' : 'rgba(255,255,255,0.6)';
  const shadowColor = inWhiteSection ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.15)';
  const hamburgerColor = inWhiteSection ? '#0A0A0A' : 'white';

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Products', href: '#products' },
    { label: 'Our Story', href: '#story' },
    { label: 'Career', href: '#career' },
  ];

  return (
    <>
      {/* Mobile full-screen dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
            zIndex: 99, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '40px',
            animation: 'menuFadeIn 0.4s ease forwards',
          }}
        >
          <style>{`
            @keyframes menuFadeIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* Logo */}
          <img src="/holland-logo.png" alt="Holland Dairy" style={{ height: '48px', objectFit: 'contain', marginBottom: '8px' }} />

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontFamily: 'Nunito, sans-serif', fontSize: '28px', fontWeight: 700, color: 'white', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}
                onTouchStart={(e) => { e.currentTarget.style.color = '#4ade80'; }}
                onTouchEnd={(e) => { e.currentTarget.style.color = 'white'; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />

          {/* Contact */}
          <a href="mailto:info@holland-dairy.com" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            info@holland-dairy.com
          </a>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div
        style={{
          position: 'fixed', top: '16px', left: 0, right: 0, zIndex: 100,
          display: 'flex', justifyContent: 'center', pointerEvents: 'none', padding: '0 24px',
        }}
      >
        <nav
          style={{
            pointerEvents: 'auto', width: '100%', maxWidth: '1200px', height: '64px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 32px', borderRadius: '16px',
            transition: 'all 0.4s ease, background 0.6s ease, border-color 0.6s ease',
            boxShadow: `0 8px 32px ${shadowColor}`,
            border: '1px solid', borderColor: style.borderColor,
            backdropFilter: 'blur(20px)', background: style.background,
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/holland-logo.png" alt="Holland Dairy" style={{ height: '40px', objectFit: 'contain', borderRadius: '16px' }} />
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '40px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ fontSize: '14px', fontWeight: 600, color: linkColor, textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
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

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            style={{ width: '40px', height: '40px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', cursor: 'pointer', background: 'transparent', border: 'none', padding: 0 }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: hamburgerColor, borderRadius: '999px', transition: 'all 0.3s ease', transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: hamburgerColor, borderRadius: '999px', transition: 'all 0.3s ease', opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: hamburgerColor, borderRadius: '999px', transition: 'all 0.3s ease', transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </nav>
      </div>
    </>
  );
}
