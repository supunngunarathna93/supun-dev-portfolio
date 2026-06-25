import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]       = useState(false);
  const [active, setActive]   = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'skills', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? '0.75rem 2rem' : '1.1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(5,5,13,0.70)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(124,92,252,0.18)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 4px 32px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(124,92,252,0.12)'
          : 'none',
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #7c5cfc 0%, #00d4ff 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, color: '#fff',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 20px rgba(124,92,252,0.5), 0 2px 8px rgba(0,0,0,0.3)',
          }}>SG</div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '1rem',
            background: 'linear-gradient(135deg, #7c5cfc, #00d4ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
          }}>Supun</span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', alignItems: 'center' }} className="desk-nav">
          {links.map((l) => {
            const isActive = active === l.toLowerCase();
            return (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.85rem',
                    letterSpacing: '0.06em',
                    textDecoration: 'none',
                    color: isActive ? '#7c5cfc' : 'rgba(240,238,255,0.62)',
                    padding: '0.45rem 1rem',
                    borderRadius: 50,
                    transition: 'color 0.2s, background 0.2s',
                    background: isActive
                      ? 'rgba(124,92,252,0.12)'
                      : 'transparent',
                    display: 'block',
                    backdropFilter: isActive ? 'blur(8px)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.color = '#7c5cfc';
                      e.target.style.background = 'rgba(124,92,252,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.color = 'rgba(240,238,255,0.62)';
                      e.target.style.background = 'transparent';
                    }
                  }}
                >{l}</a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              className="btn-glow"
              style={{ padding: '0.5rem 1.4rem', fontSize: '0.82rem', borderRadius: 50, marginLeft: '0.6rem' }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="hamburger"
          aria-label="Toggle menu"
          style={{
            display: 'none', background: 'rgba(124,92,252,0.08)',
            border: '1px solid rgba(124,92,252,0.2)',
            backdropFilter: 'blur(12px)',
            borderRadius: 10,
            cursor: 'pointer', padding: '8px 10px',
            flexDirection: 'column', gap: 5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: 20, height: 2,
              background: 'var(--white)', borderRadius: 2,
              transition: 'transform 0.3s, opacity 0.3s',
              transform: open && i === 0 ? 'rotate(45deg) translateY(7px)'
                       : open && i === 2 ? 'rotate(-45deg) translateY(-7px)'
                       : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: '64px', left: '1rem', right: '1rem', zIndex: 199,
              background: 'rgba(8,6,24,0.88)',
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
              border: '1px solid rgba(124,92,252,0.22)',
              borderRadius: 20,
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,92,252,0.08)',
              padding: '1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1.2rem',
              overflow: 'hidden',
            }}
          >
            {/* Shine */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(124,92,252,0.5), rgba(0,212,255,0.3), transparent)',
            }} />
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.05rem',
                  color: 'rgba(240,238,255,0.85)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  padding: '0.4rem 0',
                  borderBottom: '1px solid rgba(124,92,252,0.1)',
                }}
              >{l}</a>
            ))}
            <a href="#contact" className="btn-glow" onClick={() => setOpen(false)}
              style={{ textAlign: 'center', borderRadius: 50, marginTop: '0.4rem' }}>
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .desk-nav  { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
