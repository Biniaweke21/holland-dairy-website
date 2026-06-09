'use client';

import { useRef, useState } from 'react';

const CARDS = [
  {
    image: '/hol3.jpg',
    label: 'LOCAL FARMS',
    heading: 'Local Farms. Local Families.',
    body: 'Every drop of milk comes from Ethiopian smallholder farmers. Over 4,000 families power every Holland Dairy product.',
  },
  {
    image: '/hol4.jpg',
    label: 'QUALITY FIRST',
    heading: 'Every Drop Carefully Selected.',
    body: 'Our milk collection points test every batch for quality. Only the best milk makes it into your Holland Dairy product.',
  },
  {
    image: '/hol5.jpg',
    label: 'DUTCH TECHNOLOGY',
    heading: 'Ethiopian Pride. World-Class Standards.',
    body: 'ISO 22000:2018 certified — the first dairy company in Ethiopia to achieve this global food safety standard.',
  },
  {
    image: '/hol1.jpg',
    label: 'FOR YOUR FAMILY',
    heading: 'Ready For Your Family.',
    body: 'From our farms to your table. Premium dairy that every Ethiopian family deserves.',
  },
];

export default function StorySectionMobile() {
  const [activeStep, setActiveStep] = useState(0);
  const carouselTouchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    carouselTouchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = carouselTouchStartX.current - e.changedTouches[0].clientX;
    if (deltaX > 40 && activeStep < 3) setActiveStep((s) => s + 1);
    else if (deltaX < -40 && activeStep > 0) setActiveStep((s) => s - 1);
  };

  return (
    <div className="block md:hidden" style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      {/* Carousel track */}
      <div
        style={{
          display: 'flex',
          transform: `translateX(-${activeStep * 100}vw)`,
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            style={{ width: '100vw', flexShrink: 0, position: 'relative', height: '520px', overflow: 'hidden' }}
          >
            <img
              src={card.image}
              alt={card.label}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
              }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', color: '#4ade80', textTransform: 'uppercase', marginBottom: '10px' }}>
                {card.label}
              </div>
              <h3 style={{ fontFamily: 'Nunito, sans-serif', fontSize: '28px', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '10px' }}>
                {card.heading}
              </h3>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => setActiveStep((s) => Math.max(s - 1, 0))}
        disabled={activeStep === 0}
        style={{
          position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', zIndex: 5,
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '16px',
          cursor: activeStep === 0 ? 'default' : 'pointer',
          opacity: activeStep === 0 ? 0.3 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        ‹
      </button>
      <button
        onClick={() => setActiveStep((s) => Math.min(s + 1, 3))}
        disabled={activeStep === 3}
        style={{
          position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', zIndex: 5,
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '16px',
          cursor: activeStep === 3 ? 'default' : 'pointer',
          opacity: activeStep === 3 ? 0.3 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        ›
      </button>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', padding: '16px 0' }}>
        {CARDS.map((_, i) => (
          <div
            key={i}
            style={{
              width: '6px', height: '6px', borderRadius: '50%',
              ...(activeStep === i
                ? { background: '#2D7A3A', transform: 'scale(1.3)' }
                : { background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(0,0,0,0.15)' }),
            }}
          />
        ))}
      </div>
    </div>
  );
}
