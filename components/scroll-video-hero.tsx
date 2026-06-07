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
  { start: 1, end: 57 },    // Act 1: Natural yogurt
  { start: 58, end: 114 },  // Act 2: Mango
  { start: 115, end: 171 }, // Act 3: Strawberry
  { start: 172, end: 228 }, // Act 4: Banana
];

const TEXT_BLOCKS: TextBlock[] = [
  {
    start: 0.015,
    end: 0.235,
    side: 'left',
    label: 'EST. IN ETHIOPIA',
    line1: 'Local Milk.',
    line2: 'Premium Quality.',
    subtext: 'Building a brighter tomorrow through dairy products.',
    extra: 'Proudly made for Ethiopian families.'
  },
  {
    start: 0.265,
    end: 0.485,
    side: 'right',
    label: 'MANGO FLAVOUR',
    line1: 'Bursting with',
    line2: 'real flavour.',
    subtext: 'Fresh mango. Real fruit. Pure joy in every sip.',
    extra: 'Every sip bursts with real fruit.'
  },
  {
    start: 0.515,
    end: 0.735,
    side: 'left',
    label: 'STRAWBERRY FLAVOUR',
    line1: 'Sweet meets',
    line2: 'creamy.',
    subtext: 'The flavour your day has been waiting for.',
    extra: 'Find your favourite flavour today.'
  },
  {
    start: 0.765,
    end: 0.985,
    side: 'right',
    label: 'BANANA FLAVOUR',
    line1: 'Energy that',
    line2: 'keeps going.',
    subtext: 'Pure banana. Pure power. Pure Holland Dairy.',
    extra: 'Feel the energy in every spoonful.'
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
    translateYvh = 100 - (enterProgress * 100);
  } else if (travelProgress <= 0.8) {
    translateYvh = 0;
  } else {
    const exitProgress = (travelProgress - 0.8) / 0.2;
    translateYvh = -(exitProgress * 100);
  }

  return { opacity: 1, translateYvh };
}

export default function ScrollVideoHero({ onScrollProgress }: ScrollVideoHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef<number>(-1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [, forceUpdate] = useState({});

  // Preload all images
  useEffect(() => {
    let loadCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadCount++;
        setLoadedCount(loadCount);
        if (loadCount === FRAME_COUNT) {
          setIsReady(true);
        }
      };
      images.current[i - 1] = img;
    }
  }, []);

  // Draw frame function
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Early return if already drawn
    if (index === lastDrawnFrame.current) return;
    lastDrawnFrame.current = index;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index) - 1));
    const img = images.current[frameIndex];
    if (!img || !img.complete) return;

    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;

    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  };

  // Calculate and draw frame from scroll position
  const updateFrame = () => {
    if (!wrapperRef.current) return;

    const scrollY = window.scrollY;
    const wrapperTop = wrapperRef.current.getBoundingClientRect().top + scrollY;
    const wrapperHeight = wrapperRef.current.offsetHeight;
    const vh = window.innerHeight;

    // Overall progress for navbar
    const overallProgress = Math.max(0, Math.min(1, (scrollY - wrapperTop) / (wrapperHeight - vh)));
    
    setScrollProgress(overallProgress);
    
    if (onScrollProgress) {
      onScrollProgress(overallProgress);
    }

    // Get frame index based on progress
    const frameIndex = getFrameIndex(overallProgress);

    // Draw frame immediately
    drawFrame(frameIndex);
    forceUpdate({});
  };

  // Scroll event listener
  useEffect(() => {
    if (!isReady) return;

    const handleScroll = () => {
      updateFrame();
    };

    const handleResize = () => {
      updateFrame();
    };

    // Initial calculation
    updateFrame();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isReady, onScrollProgress]);

  return (
    <div 
      ref={wrapperRef} 
      style={{ 
        position: 'relative', 
        height: '950vh',
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
        {!isReady && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: '14px',
                letterSpacing: '0.1em',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#2D7A3A', marginBottom: '8px', fontSize: '16px' }}>●</div>
              Loading... {Math.round((loadedCount / FRAME_COUNT) * 100)}%
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

        {/* Text Blocks */}
        {TEXT_BLOCKS.map((block, index) => {
          const { opacity, translateYvh } = getTextStyle(block, scrollProgress);
          const isLeft = block.side === 'left';
          const isActOne = index === 0;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                ...(isLeft ? { left: '6%' } : { right: '6%' }),
                top: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
                zIndex: 2,
                opacity: opacity,
              }}
            >
              <div
                style={{
                  maxWidth: '360px',
                  transform: `translateY(${translateYvh}vh)`,
                }}
              >
                {/* Label */}
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    letterSpacing: '0.3em',
                    color: '#4ade80',
                    fontWeight: 700,
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                  }}
                >
                  {block.label}
                </span>

                {/* Heading */}
                <h2
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: isActOne ? '64px' : '54px',
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1.08,
                    marginBottom: '14px',
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                  }}
                >
                  <span style={{ display: 'block' }}>{block.line1}</span>
                  <span style={{ display: 'block' }}>{block.line2}</span>
                </h2>

                {/* Subtext */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
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

                {/* Extra line */}
                <p
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '13px',
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

      {/* Bottom sentinel */}
      <div style={{ height: 0, visibility: 'hidden' }} />
    </div>
  );
}
