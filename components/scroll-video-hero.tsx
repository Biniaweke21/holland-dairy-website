'use client';

import { useEffect, useRef, useState } from 'react';

interface TextBlock {
  actIndex: number;
  side: 'left' | 'right';
  label: string;
  headingLine1: string;
  headingLine2: string;
  subtext: string;
}

interface ScrollVideoHeroProps {
  onScrollProgress?: (progress: number) => void;
}

const FRAME_COUNT = 228;
const TOTAL_ZONES = 3;

const ACTS = [
  { start: 1, end: 57 },    // Act 1: Natural yogurt
  { start: 58, end: 114 },  // Act 2: Mango
  { start: 115, end: 171 }, // Act 3: Strawberry
  { start: 172, end: 228 }, // Act 4: Banana
];

const TEXT_BLOCKS: TextBlock[] = [
  {
    actIndex: 0,
    side: 'left',
    label: 'EST. IN ETHIOPIA',
    headingLine1: 'Local Milk.',
    headingLine2: 'Premium Quality.',
    subtext: 'Building a brighter tomorrow through dairy products.',
  },
  {
    actIndex: 1,
    side: 'right',
    label: 'MANGO FLAVOUR',
    headingLine1: 'Bursting with',
    headingLine2: 'real flavour.',
    subtext: 'Fresh mango. Real fruit. Pure joy in every sip.',
  },
  {
    actIndex: 2,
    side: 'left',
    label: 'STRAWBERRY & BANANA',
    headingLine1: 'Sweet meets',
    headingLine2: 'creamy.',
    subtext: 'Strawberry, Banana. The flavours your day has been waiting for.',
  },
];

// Center frames for each block
const BLOCK_CENTER_FRAMES = [1, 68, 148, 210];
const TRAVEL_WINDOW = 0.09;

function getBlockTiming(centerFrame: number) {
  const centerProgress = centerFrame / 228;
  const start = Math.max(0, centerProgress - TRAVEL_WINDOW);
  const end = Math.min(1, centerProgress + TRAVEL_WINDOW);
  return { start, end, centerProgress };
}

function getFrameIndex(progress: number): number {
  let frameIndex: number;

  if (progress >= 0 && progress < 0.33) {
    // Zone 1: frames 1 to 78
    const localProgress = progress / 0.33;
    frameIndex = 1 + Math.floor(localProgress * 77);
  } else if (progress >= 0.33 && progress < 0.66) {
    // Zone 2: frames 79 to 168
    const localProgress = (progress - 0.33) / 0.33;
    frameIndex = 79 + Math.floor(localProgress * 89);
  } else {
    // Zone 3: frames 169 to 228
    const localProgress = (progress - 0.66) / 0.34;
    frameIndex = 169 + Math.floor(localProgress * 59);
  }

  // Clamp between 1 and 228
  return Math.max(1, Math.min(FRAME_COUNT, frameIndex));
}

function getFramePath(index: number): string {
  return `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
}

function getTextBlockStyle(block: TextBlock, wrapperElement: HTMLDivElement | null): { opacity: number; translateY: string } {
  if (!wrapperElement) return { opacity: 0, translateY: '100vh' };

  const scrollY = window.scrollY;
  const wrapperTop = wrapperElement.getBoundingClientRect().top + scrollY;
  const wrapperHeight = wrapperElement.offsetHeight;
  const vh = window.innerHeight;

  // Calculate overall progress
  const scrollProgress = Math.max(0, Math.min(1, (scrollY - wrapperTop) / (wrapperHeight - vh)));

  // Get timing for this block
  const centerFrame = BLOCK_CENTER_FRAMES[block.actIndex];
  const timing = getBlockTiming(centerFrame);

  let opacity = 0;
  let translateY = '100vh';

  if (scrollProgress < timing.start || scrollProgress > timing.end) {
    // Outside block window
    opacity = 0;
    translateY = scrollProgress < timing.start ? '100vh' : '-100vh';
  } else {
    // Within block window
    opacity = 1;
    let travelProgress = (scrollProgress - timing.start) / (timing.end - timing.start);
    travelProgress = Math.max(0, Math.min(1, travelProgress));

    // Special case for block 1 - ensure it's centered on load
    if (timing.centerProgress < 0.05 && scrollProgress === 0) {
      travelProgress = Math.max(0.5, travelProgress);
    }

    const translateYvh = (0.5 - travelProgress) * 200;
    translateY = `${translateYvh}vh`;
  }

  return {
    opacity,
    translateY,
  };
}

export default function ScrollVideoHero({ onScrollProgress }: ScrollVideoHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef<number>(-1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
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
        height: '800vh',
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
          const style = getTextBlockStyle(block, wrapperRef.current);
          const isLeft = block.side === 'left';
          const isActOne = block.actIndex === 0;

          // Extra line for each block
          const extraLines = [
            'Proudly made for Ethiopian families.',
            'Every sip bursts with real fruit.',
            'Find your favourite flavour today.',
          ];

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
                opacity: style.opacity,
              }}
            >
              <div
                style={{
                  maxWidth: '360px',
                  transform: `translateY(${style.translateY})`,
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
                  <span style={{ display: 'block' }}>{block.headingLine1}</span>
                  <span style={{ display: 'block' }}>{block.headingLine2}</span>
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
                  {extraLines[block.actIndex]}
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
