'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollVideoHeroProps {
  onScrollProgress?: (progress: number) => void;
  onHeroComplete?: () => void;
}

const FRAME_COUNT = 152;
const SNAP_FRAMES = [1, 52, 112, 151];
const FPS = 18;

const TEXT_BLOCKS = [
  {
    label: 'WELCOME TO THE FLAVOURVERSE',
    line1: 'One Bottle.',
    line2: 'Four Worlds.',
    subtext: 'Crafted from Ethiopian milk and transformed through Dutch dairy expertise.',
    extra: 'Scroll to discover what\'s inside.',
    side: 'left',
  },
  {
    label: 'WORLD 01 • MANGO',
    line1: 'Step Into The',
    line2: 'Golden Hour.',
    subtext: 'A world of vibrant colour, juicy flavour, and endless summer energy.',
    extra: 'The brighter side of refreshment.',
    side: 'right',
  },
  {
    label: 'WORLD 02 • STRAWBERRY',
    line1: 'Where Sweetness',
    line2: 'Takes Flight.',
    subtext: 'Bold berry notes swirl through a dreamlike landscape of colour and cream.',
    extra: 'A little joy in every moment.',
    side: 'left',
  },
  {
    label: 'WORLD 03 • BANANA',
    line1: 'Smooth Never',
    line2: 'Stands Still.',
    subtext: 'Rich banana flavour flows with effortless energy and satisfying comfort.',
    extra: 'Made to move with you.',
    side: 'right',
  },
];

function getFramePath(index: number): string {
  return `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
}

export default function ScrollVideoHero({ onScrollProgress, onHeroComplete }: ScrollVideoHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const outerBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [firstBatchReady, setFirstBatchReady] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [loadingMounted, setLoadingMounted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSnap, setActiveSnap] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);

  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const animRafRef = useRef<number | null>(null);
  const lastDrawnRef = useRef(-1);
  const isSnappingRef = useRef(false);
  const activeSnapRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Preload images
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

  // Lock scroll during loading
  useEffect(() => {
    if (loadingMounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
  }, [loadingMounted]);

  // Loading dismissal
  useEffect(() => {
    if (isReady) {
      setTimeout(() => setLoadingVisible(false), 400);
      setTimeout(() => setLoadingMounted(false), 1000);
    }
  }, [isReady]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (index === lastDrawnRef.current) return;
    lastDrawnRef.current = index;
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

  useEffect(() => {
    if (firstBatchReady) {
      resizeCanvas();
      lastDrawnRef.current = -1;
      drawFrame(1);
    }
  }, [firstBatchReady]);

  const updateTextBlocks = (snapIndex: number, progress: number) => {
    TEXT_BLOCKS.forEach((_, i) => {
      const outer = outerBlockRefs.current[i];
      const inner = textBlockRefs.current[i];
      if (!outer || !inner) return;
      const isActive = i === snapIndex;
      outer.style.opacity = isActive ? String(Math.min(1, progress * 2)) : '0';
      inner.style.transform = isActive
        ? `translateY(${(1 - Math.min(1, progress * 2)) * 40}px)`
        : 'translateY(40px)';
    });
  };

  const animateToFrame = (targetFrame: number, snapIndex: number, onDone?: () => void) => {
    if (animRafRef.current) cancelAnimationFrame(animRafRef.current);

    const startFrame = currentFrameRef.current;
    const totalFrames = Math.abs(targetFrame - startFrame);
    if (totalFrames === 0) {
      updateTextBlocks(snapIndex, 1);
      onDone?.();
      return;
    }

    const direction = targetFrame > startFrame ? 1 : -1;
    const duration = (totalFrames / FPS) * 1000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const frame = Math.round(startFrame + eased * totalFrames * direction);
      currentFrameRef.current = frame;
      drawFrame(frame);

      // Update navbar progress
      const navProgress = (frame - 1) / (FRAME_COUNT - 1);
      onScrollProgress?.(navProgress);

      // Update text blocks
      updateTextBlocks(snapIndex, eased);

      if (t < 1) {
        animRafRef.current = requestAnimationFrame(tick);
      } else {
        currentFrameRef.current = targetFrame;
        drawFrame(targetFrame);
        updateTextBlocks(snapIndex, 1);
        onDone?.();
      }
    };

    animRafRef.current = requestAnimationFrame(tick);
  };

  const snapToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(SNAP_FRAMES.length - 1, index));
    if (clamped === activeSnapRef.current && !isSnappingRef.current) return;
    isSnappingRef.current = true;
    activeSnapRef.current = clamped;
    setActiveSnap(clamped);
    setDotIndex(clamped);
    animateToFrame(SNAP_FRAMES[clamped], clamped, () => {
      isSnappingRef.current = false;
      if (clamped === SNAP_FRAMES.length - 1) onHeroComplete?.();
    });
  };

  // Scroll and wheel handling
  useEffect(() => {
    if (!isReady) return;

    resizeCanvas();
    lastDrawnRef.current = -1;
    drawFrame(1);
    updateTextBlocks(0, 1);

    let lastWheelTime = 0;
    const WHEEL_COOLDOWN = 800;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // If at last snap and scrolling down, release to page scroll
      if (activeSnapRef.current === SNAP_FRAMES.length - 1 && e.deltaY > 0) return;
      // If at first snap and scrolling up, release to page scroll
      if (activeSnapRef.current === 0 && e.deltaY < 0) return;
      e.preventDefault();
      if (now - lastWheelTime < WHEEL_COOLDOWN) return;
      lastWheelTime = now;
      const direction = e.deltaY > 0 ? 1 : -1;
      snapToIndex(activeSnapRef.current + direction);
    };

    let touchStartY = 0;
    let lastTouchTime = 0;
    const TOUCH_COOLDOWN = 800;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchTime < TOUCH_COOLDOWN) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 20) return;
      // If at last snap and swiping down, release to page scroll
      if (activeSnapRef.current === SNAP_FRAMES.length - 1 && deltaY > 0) return;
      if (activeSnapRef.current === 0 && deltaY < 0) return;
      lastTouchTime = now;
      const direction = deltaY > 0 ? 1 : -1;
      snapToIndex(activeSnapRef.current + direction);
    };

    const handleResize = () => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    };

    const el = wrapperRef.current;
    el?.addEventListener('wheel', handleWheel, { passive: false });
    el?.addEventListener('touchstart', handleTouchStart, { passive: true });
    el?.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      el?.removeEventListener('wheel', handleWheel);
      el?.removeEventListener('touchstart', handleTouchStart);
      el?.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
    };
  }, [isReady]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: '100vh',
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
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* Loading Screen */}
        {loadingMounted && (
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 20, overflow: 'hidden',
              opacity: loadingVisible ? 1 : 0,
              pointerEvents: loadingVisible ? 'auto' : 'none',
              transition: 'opacity 0.6s ease',
            }}
          >
            <style>{`
              @keyframes cowFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-18px); }
              }
              @keyframes ringPulse1 {
                0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.7; }
                100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
              }
              @keyframes ringPulse2 {
                0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
                100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
              }
              @keyframes ringPulse3 {
                0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.5; }
                100% { transform: translate(-50%, -50%) scale(3.4); opacity: 0; }
              }
              @keyframes ringPulse4 {
                0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.4; }
                100% { transform: translate(-50%, -50%) scale(4.0); opacity: 0; }
              }
              @keyframes loadingFill {
                from { width: 0%; }
                to { width: 100%; }
              }
              @keyframes breathe {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
              }
              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0px); }
              }
            `}</style>
            <img src="/frames/ezgif-frame-001.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(20px)', transform: 'scale(1.1)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
              {/* Cow container with energy rings */}
              <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', borderRadius: '50%', border: '1.5px solid rgba(45,122,58,0.6)', pointerEvents: 'none', animation: 'ringPulse1 2s ease-out infinite', animationDelay: '0s' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', borderRadius: '50%', border: '1.5px solid rgba(45,122,58,0.6)', pointerEvents: 'none', animation: 'ringPulse2 2s ease-out infinite', animationDelay: '0.5s' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', borderRadius: '50%', border: '1.5px solid rgba(45,122,58,0.6)', pointerEvents: 'none', animation: 'ringPulse3 2s ease-out infinite', animationDelay: '1s' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', borderRadius: '50%', border: '1.5px solid rgba(45,122,58,0.6)', pointerEvents: 'none', animation: 'ringPulse4 2s ease-out infinite', animationDelay: '1.5s' }} />
                <img
                  src="/cow.png"
                  alt="Cow"
                  style={{
                    width: '110px',
                    height: 'auto',
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 2,
                    filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(45,122,58,0.3))',
                    animation: 'cowFloat 2.8s ease-in-out infinite',
                  }}
                />
              </div>
              {/* Loading bar */}
              <div style={{ width: '180px', height: '3px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', overflow: 'hidden', animation: 'fadeInUp 0.6s ease 0.3s both' }}>
                <div style={{ height: '100%', background: 'linear-gradient(to right, #2D7A3A, #4ade80)', borderRadius: '999px', animation: 'loadingFill 2.5s ease-in-out forwards' }} />
              </div>
              {/* Loading text */}
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', animation: 'breathe 1.5s ease-in-out infinite, fadeInUp 0.6s ease 0.5s both' }}>
                Loading your flavour experience...
              </div>
            </div>
          </div>
        )}

        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)' }} />

        {/* Progress indicator line */}
        <div
          style={{
            position: 'absolute',
            ...(isMobile
              ? { bottom: '37px', left: '50%', transform: 'translateX(-50%)', width: '104px', height: '1.5px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }
              : { left: '29px', top: '50%', transform: 'translateY(-50%)', width: '1.5px', height: '104px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)' }),
            zIndex: 9, pointerEvents: 'none',
          }}
        />
        {/* Dots */}
        <div
          style={{
            position: 'absolute',
            ...(isMobile
              ? { bottom: '32px', left: '50%', transform: 'translateX(-50%)', flexDirection: 'row' as const }
              : { left: '24px', top: '50%', transform: 'translateY(-50%)', flexDirection: 'column' as const }),
            zIndex: 10, display: 'flex', gap: '20px', pointerEvents: 'none',
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: '11px', height: '11px', borderRadius: '50%', transition: 'all 0.4s ease',
                background: dotIndex === i ? '#ffffff' : 'transparent',
                border: dotIndex === i ? 'none' : '1.5px solid rgba(255,255,255,0.55)',
                boxShadow: dotIndex === i ? '0 0 6px 2px rgba(255,255,255,0.95), 0 0 20px 6px rgba(255,255,255,0.5), 0 0 40px 10px rgba(255,255,255,0.2)' : 'none',
                outline: dotIndex === i ? '2px solid rgba(255,255,255,0.2)' : 'none',
                outlineOffset: dotIndex === i ? '3px' : '0px',
                transform: dotIndex === i ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
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
                top: 0, height: '100%', display: 'flex', alignItems: 'center',
                pointerEvents: 'none', zIndex: 2, opacity: 0,
              }}
            >
              <div
                ref={(el) => { textBlockRefs.current[index] = el; }}
                style={{ willChange: 'transform', maxWidth: isMobile ? 'min(280px, 80vw)' : '360px', transform: 'translateY(40px)' }}
              >
                <span style={{ display: 'inline-block', fontSize: '12px', letterSpacing: '0.2em', color: '#4ade80', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', fontFamily: 'Nunito, sans-serif' }}>
                  {block.label}
                </span>
                <h2 style={{ fontFamily: 'Nunito, sans-serif', fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(48px, 6vw, 90px)', fontWeight: 800, color: 'white', lineHeight: 0.95, marginBottom: '14px', letterSpacing: '-0.02em', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                  <span style={{ display: 'block' }}>{block.line1}</span>
                  <span style={{ display: 'block' }}>{block.line2}</span>
                </h2>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: isMobile ? '14px' : '17px', fontWeight: 400, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, letterSpacing: '0.01em', marginTop: '10px', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
                  {block.subtext}
                </p>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginTop: '8px' }}>
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
