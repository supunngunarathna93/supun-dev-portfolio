import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const socials = [
  {
    label: 'GitHub',
    handle: '@supunngunarathna93',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    href: 'https://github.com/supunngunarathna93',
    accent: '#7c5cfc',
  },
  {
    label: 'LinkedIn',
    handle: 'Supun N Gunarathna',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: 'https://linkedin.com/in/supun-n-gunarathna-70ab43320',
    accent: '#00d4ff',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [copied, setCopied] = useState(false);

  const email = 'supunngunarathna.edit.work@gmail.com';

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '9rem 0 6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 500,
        background: 'radial-gradient(ellipse, rgba(124,92,252,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none', borderRadius: '50%',
      }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>04 — Contact</span>

          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            marginBottom: '1.5rem',
            maxWidth: 760,
          }}>
            Let's make something<br />
            <span className="grad-text">worth watching.</span>
          </h2>

          <p style={{
            color: 'var(--muted)',
            fontSize: '1.05rem',
            lineHeight: 1.75,
            maxWidth: 480,
            marginBottom: '3rem',
          }}>
            Open to freelance projects, collaborations, and interesting conversations —
            about tech, film, or both. Let's build something great together.
          </p>

          {/* Email card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.2rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 16,
              padding: '1.2rem 1.5rem',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(124,92,252,0.3), rgba(0,212,255,0.3))',
              border: '1px solid rgba(124,92,252,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
            }}>✉️</div>
            <div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.65rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--muted)',
                marginBottom: '0.15rem',
              }}>Email me at</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem', color: 'var(--white)', fontWeight: 500,
              }}>{email}</div>
            </div>
            <button
              onClick={copy}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8rem', fontWeight: 600,
                padding: '0.5rem 1.2rem',
                borderRadius: 50,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: copied
                  ? 'rgba(0,212,255,0.15)'
                  : 'linear-gradient(135deg, #7c5cfc, #00d4ff)',
                color: copied ? '#00d4ff' : '#fff',
                boxShadow: copied ? '0 0 15px rgba(0,212,255,0.3)' : '0 0 20px rgba(124,92,252,0.35)',
                letterSpacing: '0.05em',
              }}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </motion.div>

          {/* Social cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '6rem' }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '1rem 1.5rem',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 14,
                  textDecoration: 'none',
                  color: 'var(--white)',
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.25s',
                  minWidth: 200,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${s.accent}55`;
                  e.currentTarget.style.boxShadow = `0 0 25px ${s.accent}20`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{
                  color: s.accent,
                  width: 38, height: 38,
                  background: `${s.accent}15`,
                  border: `1px solid ${s.accent}30`,
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600, fontSize: '0.9rem',
                    marginBottom: '0.1rem',
                  }}>{s.label}</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.72rem', color: 'var(--muted)',
                  }}>{s.handle}</div>
                </div>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(124,92,252,0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: 'linear-gradient(135deg, #7c5cfc, #00d4ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.55rem', fontWeight: 800, color: '#fff',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>SG</div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem', color: 'var(--muted)',
            }}>© 2026 Supun N Gunarathna</span>
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem', color: 'var(--muted-2)',
            letterSpacing: '0.06em',
          }}>Built with React + Vite + Framer Motion</span>
        </div>
      </div>
    </section>
  );
}
