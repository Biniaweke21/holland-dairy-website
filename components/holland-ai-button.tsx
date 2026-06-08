'use client';

export default function HollandAIButton() {
  return (
    <button
      onClick={() => {}}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 1000,
        background: "#2D7A3A",
        color: "white",
        border: "none",
        borderRadius: "999px",
        padding: "14px 24px",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "Nunito, sans-serif",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 24px rgba(45,122,58,0.4)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1a5c2a";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,122,58,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#2D7A3A";
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(45,122,58,0.4)";
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
      Holland AI
    </button>
  );
}
