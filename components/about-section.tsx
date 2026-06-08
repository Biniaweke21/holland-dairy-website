'use client';

import { useEffect, useRef, useState } from 'react';

const HEADLINE = 'Building a brighter tomorrow through dairy products.';

function BrandValueBlock({
  imageSrc,
  label,
  heading,
  body,
  textAlign = 'left',
}: {
  imageSrc: string;
  label: string;
  heading: string;
  body: string;
  textAlign?: 'left' | 'right';
}) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisible(true); }); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const resolvedAlign = isMobile ? 'left' : textAlign;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? '60vh' : '70vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        margin: 0,
        padding: 0,
      }}
    >
      <img
        src={imageSrc}
        alt={label}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: isMobile ? '40px 24px' : '64px 56px',
          maxWidth: '720px',
          marginLeft: resolvedAlign === 'left' ? '0' : 'auto',
          marginRight: resolvedAlign === 'right' ? '0' : 'auto',
          textAlign: resolvedAlign,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <span style={{ display: 'block', fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4ade80', marginBottom: '16px' }}>
          {label}
        </span>
        <h2 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.5rem)' : 'clamp(2rem, 4vw, 3.5rem)', color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '24px' }}>
          {heading}
        </h2>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

const STORY_STEPS = [
  {
    image: '/hol3.jpg',
    label: 'WHERE IT BEGINS',
    heading: 'Local Farms. Local Families.',
    body: 'We source our milk exclusively from Ethiopian farms, focusing on smaller local communities to help them thrive.',
  },
  {
    image: '/hol4.jpg',
    label: 'THE RAW INGREDIENT',
    heading: 'Every Drop Carefully Selected.',
    body: 'Only the highest quality raw milk makes it through. We ensure full compliance and sustainability before a single drop enters our process.',
  },
  {
    image: '/hol5.jpg',
    label: 'DUTCH TECHNOLOGY',
    heading: 'Ethiopian Pride. World-Class Standards.',
    body: 'Our state-of-the-art facility combines Dutch dairy expertise with Ethiopian passion to produce products of unmatched quality.',
  },
  {
    image: '/hol1.jpg',
    label: 'THE RESULT',
    heading: 'Ready For Your Family.',
    body: 'From farm to shelf — a product Ethiopians can be proud of. Premium quality dairy, made right here at home.',
  },
];

function StorySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [stepVisible, setStepVisible] = useState([false, false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const observers = stepRefs.current.map((el, i) => {
      const obs = new IntersectionObserver(
        (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveStep(i); }); },
        { threshold: 0.5 }
      );
      if (el) obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs, i) => { if (stepRefs.current[i]) obs.unobserve(stepRefs.current[i]!); });
  }, [isMobile]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      const obs = new IntersectionObserver(
        (entries) => { entries.forEach((e) => { if (e.isIntersecting) setStepVisible((prev) => { const n = [...prev]; n[i] = true; return n; }); }); },
        { threshold: 0.2 }
      );
      if (el) obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs, i) => { if (stepRefs.current[i]) obs.unobserve(stepRefs.current[i]!); });
  }, []);

  if (isMobile) {
    return (
      <div style={{ backgroundColor: '#ffffff' }}>
        {STORY_STEPS.map((step, i) => (
          <div key={i} ref={(el) => { stepRefs.current[i] = el; }}>
            <div style={{ width: '100%', height: '60vw', position: 'relative', overflow: 'hidden' }}>
              <img src={step.image} alt={step.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '40px 24px', opacity: stepVisible[i] ? 1 : 0, transform: stepVisible[i] ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2D7A3A', display: 'block', marginBottom: '12px' }}>{step.label}</span>
              <h3 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 6vw, 2rem)', color: '#0A0A0A', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>{step.heading}</h3>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1rem', color: '#555555', lineHeight: 1.8 }}>{step.body}</p>
            </div>
            {i < STORY_STEPS.length - 1 && <div style={{ height: '1px', backgroundColor: '#e5e5e5', margin: '0 24px' }} />}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={sectionRef} style={{ display: 'flex', position: 'relative', backgroundColor: '#ffffff' }}>
      {/* LEFT — sticky image */}
      <div style={{ width: '50%', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px 32px 40px', backgroundColor: '#f8f8f8' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden' }}>
          {STORY_STEPS.map((step, i) => (
            <img
              key={i}
              src={step.image}
              alt={step.label}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: activeStep === i ? 1 : 0,
                transform: activeStep === i ? 'scale(1.04)' : 'scale(1.08)',
                transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — scrolling steps */}
      <div style={{ width: '50%', backgroundColor: '#ffffff' }}>
        {STORY_STEPS.map((step, i) => (
          <div key={i} ref={(el) => { stepRefs.current[i] = el; }} style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 72px' }}>
            <div style={{ width: '100%' }}>
              <div style={{ width: '48px', height: '1px', backgroundColor: '#2D7A3A', opacity: stepVisible[i] ? 0.2 : 0, marginBottom: '24px', transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0ms' }} />
              <span
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#2D7A3A',
                  display: 'block',
                  marginBottom: '20px',
                  opacity: stepVisible[i] ? 1 : 0,
                  transform: stepVisible[i] ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 60ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) 60ms',
                }}
              >
                {step.label}
              </span>
              <h3
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  color: activeStep === i ? '#2D7A3A' : '#0A0A0A',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  marginBottom: '28px',
                  opacity: stepVisible[i] ? 1 : 0,
                  transform: stepVisible[i] ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 120ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) 120ms, color 0.5s ease',
                }}
              >
                {step.heading}
              </h3>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#2D7A3A', marginBottom: '28px', opacity: stepVisible[i] ? 1 : 0, transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 200ms' }} />
              <p
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '1.05rem',
                  color: '#555555',
                  lineHeight: 1.9,
                  maxWidth: '420px',
                  opacity: stepVisible[i] ? 1 : 0,
                  transform: stepVisible[i] ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 260ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) 260ms',
                }}
              >
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [bsVisible, setBsVisible] = useState(false);
  const [visibleWords, setVisibleWords] = useState<boolean[]>([]);
  const [paraVisible, setParaVisible] = useState(false);

  const bsRef = useRef<HTMLDivElement>(null);

  const words = HEADLINE.split(' ');

  useEffect(() => {
    const observerOptions = { threshold: 0.2, rootMargin: '0px' };

    const bsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setBsVisible(true);
          words.forEach((_, i) => {
            setTimeout(() => {
              setVisibleWords((prev) => { const next = [...prev]; next[i] = true; return next; });
            }, 200 + i * 80);
          });
          setTimeout(() => setParaVisible(true), 200 + words.length * 80 + 200);
        }
      });
    }, { threshold: 0.15 });

    if (bsRef.current) bsObserver.observe(bsRef.current);

    return () => {
      if (bsRef.current) bsObserver.unobserve(bsRef.current);
    };
  }, []);

  return (
    <section style={{ backgroundColor: '#ffffff', fontFamily: 'Nunito, sans-serif' }}>

      {/* BRAND STATEMENT SECTION */}
      <div id="brand-statement" ref={bsRef} style={{ padding: '120px 48px 100px', textAlign: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <div style={{ opacity: bsVisible ? 1 : 0, transform: bsVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2D7A3A' }}>
              EST. BISHOFTU, ETHIOPIA
            </span>
          </div>

          <div style={{ opacity: bsVisible ? 0.2 : 0, transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s', display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div style={{ width: '60px', height: '1px', backgroundColor: '#2D7A3A' }} />
          </div>

          <h2
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              color: '#0A0A0A',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '40px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.25em',
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: visibleWords[i] ? 1 : 0,
                  transform: visibleWords[i] ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {word}
              </span>
            ))}
          </h2>

          <p
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
              color: '#444444',
              lineHeight: 1.85,
              maxWidth: '680px',
              margin: '0 auto',
              opacity: paraVisible ? 1 : 0,
              transform: paraVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Holland Dairy is a leading dairy company in Ethiopia. We're Ethiopian by nationality and Dutch by technology. Our purpose is to provide a healthy and positive future for Ethiopians and their families — because we believe high-quality, fresh dairy should be accessible to all.
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ width: '100%', height: '1px', backgroundColor: '#e5e5e5' }} />

      {/* STORY SECTION */}
      <StorySection />

    </section>
  );
}
