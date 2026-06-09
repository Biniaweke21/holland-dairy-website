'use client';

import { useEffect, useRef, useState } from 'react';

export default function ProductShowcase() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [card1Visible, setCard1Visible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);
  const [card1Hovered, setCard1Hovered] = useState(false);
  const [card2Hovered, setCard2Hovered] = useState(false);
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const options = { threshold: 0.2 };

    const headerObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setHeaderVisible(true); });
    }, options);

    const card1Obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCard1Visible(true); });
    }, options);

    const card2Obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCard2Visible(true); });
    }, options);

    if (headerRef.current) headerObs.observe(headerRef.current);
    if (card1Ref.current) card1Obs.observe(card1Ref.current);
    if (card2Ref.current) card2Obs.observe(card2Ref.current);

    return () => {
      if (headerRef.current) headerObs.unobserve(headerRef.current);
      if (card1Ref.current) card1Obs.unobserve(card1Ref.current);
      if (card2Ref.current) card2Obs.unobserve(card2Ref.current);
    };
  }, []);

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: isMobile ? '80px 24px' : '120px 48px',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      <style>{`
        @keyframes floatImage {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
      `}</style>

      {/* SECTION HEADER */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            color: '#2D7A3A',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          WHAT WE OFFER
        </div>
        <h2
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: isMobile ? '36px' : '52px',
            fontWeight: 800,
            color: '#1a1a1a',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          <span style={{ color: '#2D7A3A' }}>From our farms to your table.</span>
        </h2>
        <p
          style={{
            fontSize: '17px',
            fontWeight: 400,
            color: '#777777',
          }}
        >
          Premium dairy crafted from local Ethiopian milk.
        </p>
      </div>

      {/* CARDS CONTAINER */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {/* CARD 1 — Natural Yoghurt */}
        <div
          ref={card1Ref}
          onMouseEnter={() => setCard1Hovered(true)}
          onMouseLeave={() => setCard1Hovered(false)}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #f0f0f0',
            boxShadow: card1Hovered
              ? '0 12px 48px rgba(0,0,0,0.1)'
              : '0 2px 20px rgba(0,0,0,0.06)',
            padding: '0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            minHeight: '340px',
            transform: card1Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-left 0.3s ease, opacity 0.8s ease 0.2s, filter 0.8s ease 0.2s',
            opacity: card1Visible ? 1 : 0,
          }}
        >
          {/* TEXT SIDE */}
          <div
            style={{
              flex: 1,
              padding: isMobile ? '40px 28px' : '56px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#2D7A3A',
                textTransform: 'uppercase',
                marginBottom: '16px',
                display: 'inline-block',
              }}
            >
              NATURAL YOGHURT
            </span>
            <h3
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: isMobile ? '30px' : '40px',
                color: '#1a1a1a',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Pure. Fresh. Perfected.
            </h3>
            <p
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                color: '#555555',
                lineHeight: 1.8,
                marginBottom: '32px',
                maxWidth: '420px',
              }}
            >
              We've perfected Ethiopian Yoghurt processing. Our Dutch manufacturing process takes the highest quality raw local milk and transforms it into a rich, tasty, creamy, and delicious yoghurt. The best part is that this Yoghurt is incredibly healthy!
            </p>
            <div>
              <a
                href="https://holland-dairy.com/our-products/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setBtn1Hovered(true)}
                onMouseLeave={() => setBtn1Hovered(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: btn1Hovered ? '12px' : '8px',
                  background: btn1Hovered ? '#1a5c2a' : '#2D7A3A',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 700,
                  padding: '14px 28px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                Explore Natural <span>→</span>
              </a>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div
            style={{
              width: isMobile ? '100%' : '380px',
              flexShrink: 0,
              background: 'linear-gradient(135deg, #f8fdf9 0%, #f0f7f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '260px' : 'auto',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(45,122,58,0.08) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <img
              src="/natural.jpg"
              alt="Natural Yoghurt"
              style={{
                width: '240px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '16px',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                animation: 'floatImage 4s ease-in-out infinite',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* CARD 2 — Fruit Yoghurt */}
        <div
          ref={card2Ref}
          onMouseEnter={() => setCard2Hovered(true)}
          onMouseLeave={() => setCard2Hovered(false)}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #f0f0f0',
            boxShadow: card2Hovered
              ? '0 12px 48px rgba(0,0,0,0.1)'
              : '0 2px 20px rgba(0,0,0,0.06)',
            padding: '0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            minHeight: '340px',
            transform: card2Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-left 0.3s ease, opacity 0.8s ease 0.4s, filter 0.8s ease 0.4s',
            opacity: card2Visible ? 1 : 0,
          }}
        >
          {/* IMAGE SIDE */}
          <div
            style={{
              width: isMobile ? '100%' : '380px',
              flexShrink: 0,
              background: 'linear-gradient(135deg, #fffbf0 0%, #fff3d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '260px' : 'auto',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(45,122,58,0.08) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <img
              src="/fruit.jpg"
              alt="Fruit Yoghurt"
              style={{
                width: '240px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '16px',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                animation: 'floatImage 4s ease-in-out infinite',
                animationDelay: '0.8s',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </div>

          {/* TEXT SIDE */}
          <div
            style={{
              flex: 1,
              padding: isMobile ? '40px 28px' : '56px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#2D7A3A',
                textTransform: 'uppercase',
                marginBottom: '16px',
                display: 'inline-block',
              }}
            >
              FRUIT YOGHURT
            </span>
            <h3
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: isMobile ? '30px' : '40px',
                color: '#1a1a1a',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Your Everyday Pick-Me-Up.
            </h3>
            <p
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                color: '#555555',
                lineHeight: 1.8,
                marginBottom: '24px',
                maxWidth: '420px',
              }}
            >
              Our fruit yoghurts bring the fun, the flavour, the energy you need to keep going. Strawberry, Mango, and Banana flavours bursting with real fruit and a whole lot of joy.
            </p>
            {/* Flavour Pills */}
            <div style={{ marginBottom: '32px' }}>
              {['Strawberry', 'Mango', 'Banana'].map((flavour) => (
                <span
                  key={flavour}
                  style={{
                    background: '#f0f7f1',
                    color: '#2D7A3A',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 14px',
                    borderRadius: '999px',
                    marginRight: '8px',
                    marginBottom: '16px',
                    display: 'inline-block',
                    fontFamily: 'Nunito, sans-serif',
                  }}
                >
                  {flavour}
                </span>
              ))}
            </div>
            <div>
              <a
                href="https://holland-dairy.com/our-products/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setBtn2Hovered(true)}
                onMouseLeave={() => setBtn2Hovered(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: btn2Hovered ? '12px' : '8px',
                  background: btn2Hovered ? '#1a5c2a' : '#2D7A3A',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 700,
                  padding: '14px 28px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                View All Flavours <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
