'use client';

import { useEffect, useRef, useState } from 'react';

interface TextBlock {
  start: number;
  end: number;
  side: 'left' | 'right';
  label: string;
  line1: string;
  line2: string;
  subtext: string;
  extra: string;
}

interface ScrollVideoHeroProps {
  onScrollProgress?: (progress: number) => void;
}

const FRAME_COUNT = 152;
const TOTAL_ZONES = 3;

const ACTS = [
  { start: 1, end: 57 },
  { start: 58, end: 114 },
  { start: 115, end: 171 },
  { start: 172, end: 228 },
];

const TEXT_BLOCKS: TextBlock[] = [
  {
    start: 0.015,
    end: 0.235,
    side: 'left',
    label: 'WELCOME TO THE FLAVOURVERSE',
    line1: 'One Bottle.',
    line2: 'Four Worlds.',
    subtext: 'Crafted from Ethiopian milk and transformed through Dutch dairy expertise.',
    extra: 'Scroll to discover what\'s inside.'
  },
  {
    start: 0.265,
    end: 0.485,
    side: 'right',
    label: 'WORLD 01 • MANGO',
    line1: 'Step Into The',
    line2: 'Golden Hour.',
    subtext: 'A world of vibrant colour, juicy flavour, and endless summer energy.',
    extra: 'The brighter side of refreshment.'
  },
  {
    start: 0.515,
    end: 0.735,
    side: 'left',
    label: 'WORLD 02 • STRAWBERRY',
    line1: 'Where Sweetness',
    line2: 'Takes Flight.',
    subtext: 'Bold berry notes swirl through a dreamlike landscape of colour and cream.',
    extra: 'A little joy in every moment.'
  },
  {
    start: 0.765,
    end: 0.985,
    side: 'right',
    label: 'WORLD 03 • BANANA',
    line1: 'Smooth Never',
    line2: 'Stands Still.',
    subtext: 'Rich banana flavour flows with effortless energy and satisfying comfort.',
    extra: 'Made to move with you.'
  }
];

function getFrameIndex(progress: number): number {
  return Math.min(151, Math.floor(progress * 152));
}

function getFramePath(index: number): string {
  return `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
}

function getTextStyle(block: TextBlock, scrollProgress: number): { opacity: number; translateYvh: number } {
  if (scrollProgress < block.start || scrollProgress > block.end) {
    return { opacity: 0, translateYvh: 100 };
  }

  const travelProgress = (scrollProgress - block.start) / (block.end - block.start);

  let translateYvh = 0;

  if (travelProgress < 0.2) {
    const enterProgress = travelProgress / 0.2;
    translateYvh = 100 - (1 - Math.pow(1 - enterProgress, 3)) * 100;
  } else if (travelProgress <= 0.8) {
    translateYvh = 0;
  } else {
    const exitProgress = (travelProgress - 0.8) / 0.2;
    translateYvh = -(Math.pow(exitProgress, 3) * 100);
  }

  return { opacity: 1, translateYvh };
}

export default function ScrollVideoHero({ onScrollProgress }: ScrollVideoHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef<number>(-1);
  const rafId = useRef<number | null>(null);
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outerBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [loadingMounted, setLoadingMounted] = useState(true);
  const [firstBatchReady, setFirstBatchReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Preload all images
  useEffect(() => {
    let loadCount = 0;
    let firstBatchCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      (img as any).fetchPriority = i <= 10 ? 'high' : 'low';
      images.current[i - 1] = img;
      img.decode().then(() => {
        loadCount++;
        setLoadedCount(loadCount);
        if (loadCount === FRAME_COUNT) setIsReady(true);
        if (i <= 10) {
          firstBatchCount++;
          if (firstBatchCount === 10) setFirstBatchReady(true);
        }
      }).catch(() => {
        loadCount++;
        setLoadedCount(loadCount);
        if (loadCount === FRAME_COUNT) setIsReady(true);
      });
    }
  }, []);

  // Draw first frame as soon as first batch is ready
  useEffect(() => {
    if (firstBatchReady) {
      drawFrame(1);
    }
  }, [firstBatchReady]);

  // Lock scroll during loading
  useEffect(() => {
    if (loadingMounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
  }, [loadingMounted]);

  // Handle loading screen dismissal
  useEffect(() => {
    if (isReady) {
      setTimeout(() => { setLoadingVisible(false); }, 400);
      setTimeout(() => { setLoadingMounted(false); }, 1000);
    }
  }, [isReady]);

  // Resize canvas function
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  };

  // Draw frame function
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (index === lastDrawnFrame.current) return;
    lastDrawnFrame.current = index;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index) - 1));
    const img = images.current[frameIndex];
    if (!img || !img.complete) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const x = (w - img.naturalWidth * scale) / 2;
    const y = (h - img.naturalHeight * scale) / 2;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  };

  // Calculate and draw frame from scroll position
  const updateFrame = () => {
    if (!wrapperRef.current) return;

    const scrollY = window.scrollY;
    const wrapperTop = wrapperRef.current.getBoundingClientRect().top + scrollY;
    const wrapperHeight = wrapperRef.current.offsetHeight;
    const vh = window.innerHeight;

    const overallProgress = Math.max(0, Math.min(1, (scrollY - wrapperTop) / (wrapperHeight - vh)));

    setScrollProgress(overallProgress);

    if (onScrollProgress) {
      onScrollProgress(overallProgress);
    }

    const frameIndex = getFrameIndex(overallProgress);
    drawFrame(frameIndex);

    TEXT_BLOCKS.forEach((block, i) => {
      const inner = textBlockRefs.current[i];
      const outer = outerBlockRefs.current[i];
      if (!inner || !outer) return;
      const { opacity, translateYvh } = getTextStyle(block, overallProgress);
      outer.style.opacity = String(opacity);
      inner.style.transform = `translateY(${translateYvh}vh)`;
    });
  };

  // Scroll event listener
  useEffect(() => {
    if (!isReady) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateFrame);
    };

    const handleResize = () => {
      resizeCanvas();
      updateFrame();
    };

    resizeCanvas();
    updateFrame();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true } as any);
      window.removeEventListener('resize', handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isReady, onScrollProgress]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: '700vh',
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
          zIndex: 1,
        }}
      >
        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />

        {/* Loading Screen */}
        {loadingMounted && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              overflow: 'hidden',
              opacity: loadingVisible ? 1 : 0,
              pointerEvents: loadingVisible ? 'auto' : 'none',
              transition: 'opacity 0.6s ease',
            }}
          >
            <style>{`
              @keyframes fadeInLogo {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0px); }
              }
              @keyframes breathe {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0px); opacity: 0.3; }
                50% { transform: translateY(-20px); opacity: 0.7; }
              }
            `}</style>

            <img
              src="/frames/ezgif-frame-001.jpg"
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />

            {[['35%','20%','0s'],['60%','15%','0.5s'],['40%','80%','1s'],['65%','85%','1.5s'],['25%','50%','0.3s'],['70%','45%','2s']].map(([top, left, delay], i) => (
              <div key={i} style={{ position: 'absolute', top, left, width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`, animationDelay: delay }} />
            ))}

            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px',
              }}
            >
              <img
                src="/cow.png"
                alt="Cow"
                style={{ height: '56px', objectFit: 'contain', animation: 'fadeInLogo 0.8s ease' }}
              />
              <div
                style={{
                  width: '200px',
                  height: '3px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.15)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    background: 'linear-gradient(to right, #2D7A3A, #4ade80, #2D7A3A)',
                    backgroundSize: '200%',
                    width: `${Math.round((loadedCount / FRAME_COUNT) * 100)}%`,
                    transition: 'width 0.1s ease',
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  animation: 'breathe 1.5s ease-in-out infinite',
                }}
              >
                Loading your flavour experience...
              </div>
            </div>
          </div>
        )}

        {/* Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Scroll Progress Indicator line */}
        <div
          style={{
            position: 'absolute',
            ...(isMobile
              ? { bottom: '37px', left: '50%', transform: 'translateX(-50%)', width: '104px', height: '1.5px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }
              : { left: '29px', top: '50%', transform: 'translateY(-50%)', width: '1.5px', height: '104px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)' }),
            zIndex: 9,
            pointerEvents: 'none',
          }}
        />
        {/* Circle indicators */}
        <div
          style={{
            position: 'absolute',
            ...(isMobile
              ? { bottom: '32px', left: '50%', transform: 'translateX(-50%)', flexDirection: 'row' as const }
              : { left: '24px', top: '50%', transform: 'translateY(-50%)', flexDirection: 'column' as const }),
            zIndex: 10,
            display: 'flex',
            gap: '20px',
            pointerEvents: 'none',
          }}
        >
          {[0, 1, 2, 3].map((i) => {
            const activeIndex = Math.min(3, Math.floor(scrollProgress * 4));
            return (
              <div
                key={i}
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  transition: 'all 0.4s ease',
                  background: activeIndex === i ? '#ffffff' : 'transparent',
                  border: activeIndex === i ? 'none' : '1.5px solid rgba(255,255,255,0.55)',
                  boxShadow: activeIndex === i ? '0 0 6px 2px rgba(255,255,255,0.95), 0 0 20px 6px rgba(255,255,255,0.5), 0 0 40px 10px rgba(255,255,255,0.2)' : 'none',
                  outline: activeIndex === i ? '2px solid rgba(255,255,255,0.2)' : 'none',
                  outlineOffset: activeIndex === i ? '3px' : '0px',
                  transform: activeIndex === i ? 'scale(1.4)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>

        {/* Text Blocks */}
        {TEXT_BLOCKS.map((block, index) => {
          const isLeft = block.side === 'left';
          return (
            <div
              key={index}
              ref={(el) => { outerBlockRefs.current[index] = el; }}
              style={{
                position: 'absolute',
                ...(isLeft ? { left: isMobile ? '4%' : '6%' } : { right: isMobile ? '4%' : '6%' }),
                top: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0,
              }}
            >
              <div
                ref={(el) => { textBlockRefs.current[index] = el; }}
                style={{
                  willChange: 'transform',
                  maxWidth: isMobile ? 'min(280px, 80vw)' : '360px',
                  transform: 'translateY(100vh)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '12px',
                    letterSpacing: '0.2em',
                    color: '#4ade80',
                    fontWeight: 600,
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    fontFamily: 'Nunito, sans-serif',
                  }}
                >
                  {block.label}
                </span>

                <h2
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(48px, 6vw, 90px)',
                    fontWeight: 800,
                    color: 'white',
                    lineHeight: 0.95,
                    marginBottom: '14px',
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                  }}
                >
                  <span style={{ display: 'block' }}>{block.line1}</span>
                  <span style={{ display: 'block' }}>{block.line2}</span>
                </h2>

                <p
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: isMobile ? '14px' : '17px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    letterSpacing: '0.01em',
                    marginTop: '10px',
                    textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                  }}
                >
                  {block.subtext}
                </p>

                <p
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)',
                    fontStyle: 'italic',
                    marginTop: '8px',
                  }}
                >
                  {block.extra}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ height: 0, visibility: 'hidden' }} />
    </div>
  );
}
