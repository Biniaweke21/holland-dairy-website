'use client';

import { useEffect, useRef, useState } from 'react';

export default function ProductShowcase() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [card1Visible, setCard1Visible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px',
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      });
    }, observerOptions);

    const card1Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCard1Visible(true);
        }
      });
    }, observerOptions);

    const card2Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCard2Visible(true);
        }
      });
    }, observerOptions);

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    if (card1Ref.current) {
      card1Observer.observe(card1Ref.current);
    }

    if (card2Ref.current) {
      card2Observer.observe(card2Ref.current);
    }

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current);
      }
      if (card1Ref.current) {
        card1Observer.unobserve(card1Ref.current);
      }
      if (card2Ref.current) {
        card2Observer.unobserve(card2Ref.current);
      }
    };
  }, []);

  return (
    <section
      style={{
        backgroundColor: '#f5f5f5',
        padding: '120px 48px',
        fontFamily: 'Nunito, sans-serif',
      }}
      className="product-showcase-section"
    >
      {/* SECTION HEADER */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: '64px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
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
            marginBottom: '16px',
          }}
        >
          WHAT WE OFFER
        </div>

        {/* Main Heading */}
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#1a1a1a',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
          className="product-showcase-heading"
        >
          From our farms to your family's table.
        </h2>

        {/* Subheading */}
        <p
          style={{
            fontSize: '18px',
            color: '#555555',
          }}
        >
          Premium dairy products made with local Ethiopian milk and Dutch craftsmanship.
        </p>
      </div>

      {/* PRODUCT CARDS */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
        }}
        className="product-cards-grid"
      >
        {/* CARD 1 - Natural Yoghurt */}
        <div
          ref={card1Ref}
          className="product-card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            borderTop: '4px solid #2D7A3A',
            transition: 'all 0.3s ease, opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            opacity: card1Visible ? 1 : 0,
            transform: card1Visible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          {/* Image Area */}
          <div
            style={{
              height: '280px',
              backgroundColor: '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#2D7A3A',
                fontSize: '14px',
              }}
            >
              Natural Yoghurt
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: '32px' }}>
            {/* Tag */}
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: '#2D7A3A',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              YOGHURT
            </div>

            {/* Heading */}
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '16px',
              }}
            >
              Natural Yoghurt
            </h3>

            {/* Body Text */}
            <p
              style={{
                fontSize: '15px',
                color: '#555555',
                lineHeight: 1.7,
              }}
            >
              We've perfected Ethiopian Yoghurt processing. Our Dutch manufacturing process takes the highest quality raw local milk and transforms it into a rich, tasty, creamy, and delicious yoghurt that our consumers can't get enough of. The best part is that this Yoghurt is incredibly healthy!
            </p>
          </div>
        </div>

        {/* CARD 2 - Fruit Yoghurt */}
        <div
          ref={card2Ref}
          className="product-card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            borderTop: '4px solid #2D7A3A',
            transition: 'all 0.3s ease, opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
            opacity: card2Visible ? 1 : 0,
            transform: card2Visible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          {/* Image Area */}
          <div
            style={{
              height: '280px',
              backgroundColor: '#fff8e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#2D7A3A',
                fontSize: '14px',
              }}
            >
              Fruit Yoghurt
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: '32px' }}>
            {/* Tag */}
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: '#2D7A3A',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              FRUIT YOGHURT
            </div>

            {/* Heading */}
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '16px',
              }}
            >
              Fruit Yoghurt
            </h3>

            {/* Body Text */}
            <p
              style={{
                fontSize: '15px',
                color: '#555555',
                lineHeight: 1.7,
              }}
            >
              Our fruit yoghurts bring the fun, the flavour, the energy you need to keep going. They are your everyday pick-me-up. When your day feels long, your to-do list feels endless, or you just need a little something good, our yoghurts show up with a burst of fruit and a whole lot of joy.
            </p>

            {/* Flavour Tags */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px',
              }}
            >
              <span
                style={{
                  backgroundColor: '#e8f5e9',
                  color: '#2D7A3A',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                Strawberry
              </span>
              <span
                style={{
                  backgroundColor: '#e8f5e9',
                  color: '#2D7A3A',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                Mango
              </span>
              <span
                style={{
                  backgroundColor: '#e8f5e9',
                  color: '#2D7A3A',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                Banana
              </span>
            </div>

            {/* View More Button */}
            <a
              href="https://holland-dairy.com/our-products/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '24px',
                backgroundColor: '#2D7A3A',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a5c2a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2D7A3A';
              }}
            >
              View More
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        .product-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
        }

        @media (max-width: 768px) {
          .product-showcase-section {
            padding: 80px 24px !important;
          }
          .product-showcase-heading {
            font-size: 32px !important;
          }
          .product-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
