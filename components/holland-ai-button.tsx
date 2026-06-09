'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What flavours do you have? 🍓',
  'Recommend something healthy 💪',
  'Tell me about Holland Dairy',
  'What makes your yogurt special?',
];

export default function HollandAIButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [dropHovered, setDropHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('holland-ai-chat');
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('holland-ai-chat', JSON.stringify(messages));
    } catch {}
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/holland-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.error || 'Sorry, something went wrong.',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Sorry, I couldn\'t connect. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('holland-ai-chat');
  };

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
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        .holland-scrollbar::-webkit-scrollbar { width: 4px; }
        .holland-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .holland-scrollbar::-webkit-scrollbar-thumb { background: #2D7A3A; border-radius: 999px; }
        .suggestion-chip:hover { background: rgba(45,122,58,0.4) !important; }
        .send-btn:hover { background: #1a5c2a !important; }
        .close-btn:hover { color: white !important; }
        .clear-btn:hover { color: rgba(255,255,255,0.8) !important; }
        .ai-input:focus { border-color: rgba(45,122,58,0.6) !important; outline: none; }
      `}</style>

      {/* CHAT WINDOW */}
      <div
        style={{
          position: 'fixed',
          bottom: isMobile ? '100px' : '120px',
          right: isMobile ? '16px' : '36px',
          width: isMobile ? 'calc(100vw - 32px)' : '360px',
          height: '500px',
          zIndex: 999,
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(45,122,58,0.3)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(45,122,58,0.1)',
          transformOrigin: 'bottom right',
          transform: isOpen ? 'scale(1)' : 'scale(0.8)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
      >
        {/* HEADER */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(45,122,58,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/cow.png" alt="Holland AI" style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(45,122,58,0.5))' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '15px', color: 'white' }}>Holland AI</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Your dairy assistant</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', animation: 'dotPulse 2s ease-in-out infinite' }} />
            <button className="clear-btn" onClick={clearChat} style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s ease' }}>Clear</button>
            <button className="close-btn" onClick={() => setIsOpen(false)} style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', lineHeight: 1, transition: 'color 0.2s ease', padding: '0 2px' }}>×</button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="holland-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Welcome message */}
          {messages.length === 0 && (
            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.9)', borderRadius: '18px 18px 18px 4px', padding: '10px 16px', fontSize: '14px', fontFamily: 'Nunito, sans-serif', maxWidth: '85%' }}>
              👋 Hi! I'm Holland AI. Ask me anything about our yoghurts, cheese, or the Holland Dairy story!
            </div>
          )}

          {/* Suggestion chips */}
          {messages.length === 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="suggestion-chip"
                  onClick={() => sendMessage(s)}
                  style={{ background: 'rgba(45,122,58,0.2)', border: '1px solid rgba(45,122,58,0.4)', color: 'rgba(255,255,255,0.8)', borderRadius: '999px', padding: '8px 14px', fontSize: '12px', fontFamily: 'Nunito, sans-serif', cursor: 'pointer', transition: 'background 0.2s ease' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? '#2D7A3A' : 'rgba(255,255,255,0.08)',
                color: msg.role === 'user' ? 'white' : 'rgba(255,255,255,0.9)',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '10px 16px',
                fontSize: '14px',
                fontFamily: 'Nunito, sans-serif',
                maxWidth: msg.role === 'user' ? '80%' : '85%',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}
            >
              {msg.content}
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.08)', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', display: 'flex', gap: '5px', alignItems: 'center' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', animation: 'typingDot 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            ref={inputRef}
            className="ai-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); } }}
            placeholder="Ask about our products..."
            style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '10px 18px', color: 'white', fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2D7A3A', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s ease', opacity: (!inputValue.trim() || isLoading) ? 0.5 : 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <div
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
            opacity: isHovered && !isOpen ? 1 : 0,
            pointerEvents: 'none',
            transform: isHovered && !isOpen ? 'translateX(0px)' : 'translateX(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#4ade80', textTransform: 'uppercase' }}>HOLLAND AI</span>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>Ask me anything</span>
        </div>

        {/* MILK DROP CONTAINER */}
        <div
          onClick={() => setIsOpen((v) => !v)}
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
          <div style={{ position: 'absolute', zIndex: 0, width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,122,58,0.3) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(74,222,128,0.5)', pointerEvents: 'none', animation: 'aiRing1 2.5s ease-out infinite', animationDelay: '0s' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(74,222,128,0.5)', pointerEvents: 'none', animation: 'aiRing2 2.5s ease-out infinite', animationDelay: '0.8s' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(74,222,128,0.5)', pointerEvents: 'none', animation: 'aiRing3 2.5s ease-out infinite', animationDelay: '1.6s' }} />
          <img src="/milk1.png" alt="Holland AI" style={{ width: '56px', height: 'auto', objectFit: 'contain', position: 'relative', zIndex: 2, animation: 'glowPulse 2s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', zIndex: 3, width: '100%', height: '3px', background: 'linear-gradient(to right, transparent, rgba(74,222,128,0.8), transparent)', borderRadius: '999px', animation: 'scanLine 2s linear infinite', pointerEvents: 'none', left: 0 }} />
          <div style={{ position: 'absolute', zIndex: 4, top: '60%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#4ade80', textShadow: '0 0 8px rgba(74,222,128,0.9), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>AI</div>
        </div>
      </div>
    </>
  );
}
