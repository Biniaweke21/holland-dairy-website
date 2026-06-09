'use client';

import { useState } from 'react';

export default function HollandAIButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [dropHovered, setDropHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(-4deg) scale(1); }
          25% { transform: rotate(2deg) scale(1.04); }
          50% { transform: rotate(-2deg) scale(0.97); }
          75% { transform: rotate(3deg) scale(1.02); }
        }
        @keyframes milkFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes aiRing1 {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.0); opacity: 0; }
        }
        @keyframes aiRing2 {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
        }
        @keyframes aiRing3 {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(3.2); opacity: 0; }
        }
        @keyframes scanLine {
          0% { top: 0%; opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(45,122,58,0.6)) drop-shadow(0 0 20px rgba(45,122,58,0.3)); }
          50% { filter: drop-shadow(0 0 16px rgba(74,222,128,0.9)) drop-shadow(0 0 40px rgba(45,122,58,0.5)); }
        }
        @keyframes textFadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0px); }
        }
        @keyframes hologramFlicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.7; }
          97% { opacity: 1; }
          98% { opacity: 0.5; }
          99% { opacity: 1; }
        }
      `}</style>

      <div
        onClick={() => {}}
        style={{
          position: 'fixed',
          bottom: '36px',
          right: '36px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          animation: 'milkFloat 3s ease-in-out infinite',
        }}
      >
        {/* LABEL PILL */}
        <div
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(45,122,58,0.4)',
            borderRadius: '999px',
            padding: '8px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2px',
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? 'auto' : 'none',
            transform: isHovered ? 'translateX(0px)' : 'translateX(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <span
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: '#4ade80',
              textTransform: 'uppercase',
            }}
          >
            HOLLAND AI
          </span>
          <span
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '10px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Ask me anything
          </span>
        </div>

        {/* MILK DROP CONTAINER */}
        <div
          onMouseEnter={() => { setIsHovered(true); setDropHovered(true); }}
          onMouseLeave={() => { setIsHovered(false); setDropHovered(false); }}
          style={{
            position: 'relative',
            width: '64px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'wobble 5s ease-in-out infinite',
            transform: dropHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* GLOW SHADOW */}
          <div
            style={{
              position: 'absolute',
              zIndex: 0,
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(45,122,58,0.3) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />

          {/* ENERGY RINGS */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(74,222,128,0.5)', pointerEvents: 'none', animation: 'aiRing1 2.5s ease-out infinite', animationDelay: '0s' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(74,222,128,0.5)', pointerEvents: 'none', animation: 'aiRing2 2.5s ease-out infinite', animationDelay: '0.8s' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(74,222,128,0.5)', pointerEvents: 'none', animation: 'aiRing3 2.5s ease-out infinite', animationDelay: '1.6s' }} />

          {/* MILK DROP IMAGE */}
          <img
            src="/milk1.png"
            alt="Holland AI"
            style={{
              width: '56px',
              height: 'auto',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2,
              animation: 'glowPulse 2s ease-in-out infinite',
            }}
          />

          {/* SCAN LINE */}
          <div
            style={{
              position: 'absolute',
              zIndex: 3,
              width: '100%',
              height: '3px',
              background: 'linear-gradient(to right, transparent, rgba(74,222,128,0.8), transparent)',
              borderRadius: '999px',
              animation: 'scanLine 2s linear infinite',
              pointerEvents: 'none',
              left: 0,
            }}
          />

          {/* AI TEXT */}
          <div
            style={{
              position: 'absolute',
              zIndex: 4,
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: '#4ade80',
              textShadow: '0 0 8px rgba(74,222,128,0.9), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            AI
          </div>
        </div>
      </div>
    </>
  );
}
