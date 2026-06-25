import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Observe which section is in view
  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'skills', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s, padding 0.3s',
        background: scrolled ? 'rgba(5,5,13,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(124,92,252,0.15)' : '1px solid transparent',
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #7c5cfc 0%, #00d4ff 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, color: '#fff',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 16px rgba(124,92,252,0.4)',
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
                    color: isActive ? '#7c5cfc' : 'rgba(240,238,255,0.6)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: 50,
                    transition: 'color 0.2s, background 0.2s',
                    background: isActive ? 'rgba(124,92,252,0.1)' : 'transparent',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => { if (!isActive) { e.target.style.color = '#7c5cfc'; e.target.style.background = 'rgba(124,92,252,0.07)'; } }}
                  onMouseLeave={(e) => { if (!isActive) { e.target.style.color = 'rgba(240,238,255,0.6)'; e.target.style.background = 'transparent'; } }}
                >{l}</a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              className="btn-glow"
              style={{ padding: '0.5rem 1.3rem', fontSize: '0.8rem', borderRadius: 50, marginLeft: '0.5rem' }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="hamburger"
          aria-label="Toggle menu"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexDirection: 'column', gap: 5 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2, background: 'var(--white)', borderRadius: 2,
              transition: 'transform 0.3s, opacity 0.3s',
              transform: open && i === 0 ? 'rotate(45deg) translateY(7px)' : open && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 199,
              background: 'rgba(5,5,13,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(124,92,252,0.15)',
              padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem',
            }}
          >
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', color: 'var(--white)', textDecoration: 'none', letterSpacing: '0.05em' }}
              >{l}</a>
            ))}
            <a href="#contact" className="btn-glow" onClick={() => setOpen(false)} style={{ textAlign: 'center', borderRadius: 50 }}>Hire Me</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .desk-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
