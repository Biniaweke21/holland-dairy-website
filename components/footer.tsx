'use client';

import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1a5c2a',
        color: 'white',
        fontFamily: 'Nunito, sans-serif',
        padding: '80px 48px 40px 48px',
      }}
      className="footer-section"
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* MAIN FOOTER CONTENT - Three Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '64px',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            marginBottom: '40px',
            paddingBottom: '60px',
          }}
          className="footer-columns"
        >
          {/* LEFT COLUMN - Brand */}
          <div>
            {/* Logo */}
            <img
              src="/holland-logo.png"
              alt="Holland Dairy"
              style={{
                height: '48px',
                objectFit: 'contain',
                marginBottom: '20px',
              }}
            />

            {/* Tagline */}
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7,
                maxWidth: '280px',
              }}
            >
              Holland Dairy is a leading dairy processing company in Ethiopia. We're Ethiopian by nationality and Dutch by technology.
            </p>

            {/* Social Icons */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '24px',
              }}
            >
              <a
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              <a
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              <a
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.9 3.6c-.4.3-.7.6-1 1L14.6 6c-.2.4-.3.8-.3 1.2v6.2c0 .5.2.9.5 1.3.3.3.7.5 1.2.5h.6c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7V7.8c0-.7-.1-1.3-.4-1.9-.3-.6-.7-1.1-1.3-1.5-.6-.4-1.3-.6-2-.6-.7 0-1.3.1-1.9.4-.5.3-1 .7-1.3 1.2V3.8c0-.2-.1-.4-.3-.6-.2-.1-.4-.2-.6-.2h-.8c-.2 0-.4.1-.6.2-.2.2-.3.4-.3.6v11.7c0 .2.1.4.3.6.2.1.4.2.6.2h.8c.2 0 .4-.1.6-.2.2-.2.3-.4.3-.6V9.3c0-.6.2-1.2.6-1.6.4-.5 1-.7 1.7-.7.6 0 1.1.2 1.5.6.4.4.6.9.6 1.6v5.3c0 .2.1.4.3.6.2.1.4.2.6.2h.8c.2 0 .4-.1.6-.2.2-.2.3-.4.3-.6V8.3c0-.9-.2-1.7-.6-2.4-.4-.7-1-1.2-1.7-1.6-.7-.4-1.6-.6-2.4-.6-.9 0-1.7.2-2.4.6-.7.4-1.3.9-1.7 1.6-.4.7-.6 1.5-.6 2.4v6.2c0 .5.2.9.5 1.3.3.3.7.5 1.2.5h.6c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7V9.5c0-.4-.1-.8-.3-1.2l-1.3-1.4c-.3-.4-.6-.7-1-1-.4-.3-.9-.4-1.4-.4-.5 0-1 .1-1.4.4-.4.3-.7.6-1 1L3.4 8.3c-.2.4-.3.8-.3 1.2v5.3c0 .2.1.4.3.6.2.1.4.2.6.2h.8c.2 0 .4-.1.6-.2.2-.2.3-.4.3-.6V9.3c0-.6.2-1.2.6-1.6.4-.5 1-.7 1.7-.7.6 0 1.1.2 1.5.6.4.4.6.9.6 1.6v5.3c0 .2.1.4.3.6.2.1.4.2.6.2h.8c.2 0 .4-.1.6-.2.2-.2.3-.4.3-.6V8.3c0-.9-.2-1.7-.6-2.4-.4-.7-1-1.2-1.7-1.6-.7-.4-1.6-.6-2.4-.6-.9 0-1.7.2-2.4.6-.7.4-1.3.9-1.7 1.6-.4.7-.6 1.5-.6 2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* CENTER COLUMN - Important Links */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Important Links
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <a
                href="https://holland-dairy.com/our-story/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                Our Story
              </a>

              <a
                href="https://holland-dairy.com/our-products/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                Our Products
              </a>

              <a
                href="https://holland-dairy.com/vacancies/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                Career
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - Contact Info */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Contact Info
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <MapPin
                  size={16}
                  style={{ color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  Bishoftu, Ethiopia
                </span>
              </div>

              {/* Phone */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Phone
                  size={16}
                  style={{ color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  6653
                </span>
              </div>

              {/* Email */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Mail
                  size={16}
                  style={{ color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}
                />
                <a
                  href="mailto:info@holland-dairy.com"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                  }}
                >
                  info@holland-dairy.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="footer-bottom"
        >
          {/* Copyright */}
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            © {new Date().getFullYear()} Holland Dairy. All Rights Reserved.
          </p>

          {/* Legal Links */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
            }}
            className="footer-legal-links"
          >
            <a
              href="#"
              className="footer-legal-link"
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="footer-legal-link"
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              Terms of Use
            </a>

            <a
              href="#"
              className="footer-legal-link"
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        .footer-link:hover {
          color: white !important;
          text-decoration: underline !important;
          text-decoration-thickness: 2px !important;
        }

        .footer-legal-link:hover {
          color: white !important;
        }

        @media (max-width: 768px) {
          .footer-section {
            padding: 60px 24px 32px 24px !important;
          }

          .footer-columns {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }

          .footer-bottom {
            flex-direction: column !important;
            gap: 16px !important;
            align-items: center !important;
            text-align: center;
          }

          .footer-legal-links {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </footer>
  );
}
