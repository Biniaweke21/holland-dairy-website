'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const [sectionAVisible, setSectionAVisible] = useState(false);
  const [sectionBVisible, setSectionBVisible] = useState(false);
  
  const sectionARef = useRef<HTMLDivElement>(null);
  const sectionBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px',
    };

    const sectionAObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSectionAVisible(true);
        }
      });
    }, observerOptions);

    const sectionBObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSectionBVisible(true);
        }
      });
    }, observerOptions);

    if (sectionARef.current) {
      sectionAObserver.observe(sectionARef.current);
    }

    if (sectionBRef.current) {
      sectionBObserver.observe(sectionBRef.current);
    }

    return () => {
      if (sectionARef.current) {
        sectionAObserver.unobserve(sectionARef.current);
      }
      if (sectionBRef.current) {
        sectionBObserver.unobserve(sectionBRef.current);
      }
    };
  }, []);

  return (
    <section style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      {/* SECTION A - Hero Text Block */}
      <div
        ref={sectionARef}
        style={{
          padding: '120px 48px',
          maxWidth: '800px',
          margin: '0 auto',
          opacity: sectionAVisible ? 1 : 0,
          transform: sectionAVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#2D7A3A',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          OUR STORY
        </div>

        {/* Main Heading */}
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#1a1a1a',
            lineHeight: 1.2,
            marginBottom: '32px',
          }}
          className="about-heading"
        >
          We believe every Ethiopian family deserves premium dairy.
        </h2>

        {/* Body Paragraph */}
        <p
          style={{
            fontSize: '18px',
            color: '#555555',
            lineHeight: 1.8,
          }}
        >
          Holland Dairy is a leading dairy company in Ethiopia. We're Ethiopian by nationality and Dutch by technology. Our purpose is to provide a healthy and positive future for Ethiopians and their families. We believe that high-quality, fresh dairy sourced from local farms should be accessible to all Ethiopians.
        </p>
      </div>

      {/* DIVIDER */}
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#e5e5e5',
        }}
      />

      {/* SECTION B - Two Column Layout */}
      <div
        ref={sectionBRef}
        style={{
          padding: '80px 48px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
          }}
          className="about-columns"
        >
          {/* Left Column - Premium Quality */}
          <div
            style={{
              borderLeft: '3px solid #2D7A3A',
              paddingLeft: '24px',
              opacity: sectionBVisible ? 1 : 0,
              transform: sectionBVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '16px',
              }}
            >
              Premium Quality
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: '#555555',
                lineHeight: 1.8,
              }}
            >
              You and your family deserve the highest quality dairy products to support a happy and healthy life. At Holland Dairy, we're committed to quality throughout all steps of our supply chain from the raw milk we buy from local farmers and the manufacturing process to the packaging and the distribution. We ensure full compliance and sustainability before sourcing milk from any Ethiopian dairy farm, as well as conduct continued quality checks to ensure our premium quality. As a result, Holland Dairy is known to be the leading quality dairy brand in Ethiopia.
            </p>
          </div>

          {/* Right Column - Locally Sourced */}
          <div
            style={{
              borderLeft: '3px solid #2D7A3A',
              paddingLeft: '24px',
              opacity: sectionBVisible ? 1 : 0,
              transform: sectionBVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '16px',
              }}
            >
              Locally Sourced
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: '#555555',
                lineHeight: 1.8,
              }}
            >
              Ethiopian dairy farming plays an important role in the economy of many rural communities. To support Ethiopia and Ethiopians, we are dedicated to only sourcing our raw milk from local farms. More importantly, we're focusing on smaller farms to help these local communities thrive.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .about-heading {
            font-size: 32px !important;
          }
          .about-columns {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          div[style*="padding: 120px 48px"] {
            padding: 80px 24px !important;
          }
          div[style*="padding: 80px 48px"] {
            padding: 60px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
