import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    padding: '1.2rem 2rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s',
    background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
  };

  return (
    <nav style={navStyle}>
      {/* ✏️ EDIT: Change "SP" to your own initials */}
      <a href="#hero" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: 'var(--amber)', textDecoration: 'none', letterSpacing: '0.05em' }}>
        SNG<span style={{ color: 'var(--white)' }}></span>
      </a>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }} className="desk-nav">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem',
              letterSpacing: '0.08em', textDecoration: 'none',
              color: 'var(--muted)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--amber)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l}</a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} className="hamburger">
        <div style={{ width: 22, height: 2, background: 'var(--white)', marginBottom: 5, transition: 'transform 0.3s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <div style={{ width: 22, height: 2, background: 'var(--white)', marginBottom: 5, opacity: open ? 0 : 1, transition: 'opacity 0.3s' }} />
        <div style={{ width: 22, height: 2, background: 'var(--white)', transition: 'transform 0.3s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: '60px', left: 0, right: 0,
              background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}
          >
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', color: 'var(--white)', textDecoration: 'none', letterSpacing: '0.05em' }}
              >{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .desk-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
