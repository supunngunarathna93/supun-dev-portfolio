import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { List, X } from '@phosphor-icons/react';

const LINKS = [
  { key: 'work',     href: '#work'      },
  { key: 'about',    href: '#about'     },
  { key: 'services', href: '#services'  },
  { key: 'contact',  href: '#contact'   },
];

const LANGS = ['en', 'si', 'ta'];

const ease = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [active, setActive]       = useState('');

  // Scroll progress for the playhead indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Detect scroll for nav background
  useEffect(() => {
    let prevScrolled = window.scrollY > 60;
    const onScroll = () => {
      const next = window.scrollY > 60;
      if (next !== prevScrolled) { prevScrolled = next; setScrolled(next); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = ['hero', 'work', 'beforeafter', 'workflow', 'services', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('portfolio-lang', lng);
  };

  return (
    <>
      {/* ── Scroll playhead ── */}
      <motion.div
        className="playhead"
        style={{ width: scaleX }}
        aria-hidden="true"
      />

      <nav
        className="main-nav"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 'var(--z-nav)',
          padding: scrolled ? '0.65rem 2rem' : '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.4s, background 0.4s, border-color 0.4s',
          background: scrolled
            ? 'rgba(11, 11, 13, 0.82)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          aria-label="Supun N Gunarathna — home"
        >
          <div style={{
            width: 32, height: 32,
            borderRadius: 'var(--r-sm)',
            background: 'var(--amber)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--ink)',
              letterSpacing: '0.02em',
            }}>SG</span>
          </div>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: 'var(--bone)',
            letterSpacing: '-0.01em',
          }}>Supun</span>
        </a>

        {/* Desktop links */}
        <ul
          style={{ display: 'flex', gap: '0.1rem', listStyle: 'none', alignItems: 'center' }}
          className="desk-nav"
        >
          {LINKS.map(({ key, href }) => {
            const isActive = active === href.slice(1);
            return (
              <li key={key}>
                <a
                  href={href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: 'none',
                    color: isActive ? 'var(--amber)' : 'var(--smoke)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--r-sm)',
                    transition: 'color 0.18s, background 0.18s',
                    background: isActive ? 'var(--amber-glow)' : 'transparent',
                    display: 'block',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.color = 'var(--bone)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.color = 'var(--smoke)';
                    }
                  }}
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            );
          })}

          {/* Lang switcher */}
          <li style={{ display: 'flex', gap: '0.15rem', marginLeft: '0.75rem', padding: '0.25rem 0.5rem', borderLeft: '1px solid var(--border)' }}>
            {LANGS.map((lng) => (
              <button
                key={lng}
                onClick={() => changeLang(lng)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  color: i18n.language === lng ? 'var(--amber)' : 'var(--fog)',
                  cursor: 'pointer',
                  padding: '0.25rem 0.4rem',
                  borderRadius: 'var(--r-sm)',
                  transition: 'color 0.18s',
                  fontWeight: i18n.language === lng ? 600 : 400,
                }}
                aria-label={`Switch to ${lng}`}
                aria-pressed={i18n.language === lng}
              >
                {lng}
              </button>
            ))}
          </li>

          {/* Hire CTA */}
          <li style={{ marginLeft: '0.5rem' }}>
            <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem' }}>
              {t('nav.hire')}
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="hamburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            display: 'none',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-sm)',
            color: 'var(--bone)',
            cursor: 'pointer',
            padding: '0.5rem',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
            style={{
              position: 'fixed',
              top: '64px', left: '1rem', right: '1rem',
              zIndex: 'calc(var(--z-nav) - 1)',
              background: 'rgba(17, 17, 20, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              padding: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
              boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
            }}
          >
            {LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--bone)',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--r-sm)',
                  transition: 'background 0.18s, color 0.18s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--amber)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--bone)'; }}
              >
                {t(`nav.${key}`)}
              </a>
            ))}

            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', marginTop: '0.25rem', borderTop: '1px solid var(--border)' }}>
              {LANGS.map((lng) => (
                <button
                  key={lng}
                  onClick={() => { changeLang(lng); setOpen(false); }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: i18n.language === lng ? 'var(--amber-glow)' : 'none',
                    border: i18n.language === lng ? '1px solid var(--amber-border)' : '1px solid transparent',
                    color: i18n.language === lng ? 'var(--amber)' : 'var(--fog)',
                    cursor: 'pointer',
                    padding: '0.3rem 0.7rem',
                    borderRadius: 'var(--r-sm)',
                    fontWeight: i18n.language === lng ? 600 : 400,
                  }}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)} style={{ textAlign: 'center', marginTop: '0.25rem' }}>
              {t('nav.hire')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .main-nav  { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .desk-nav  { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .main-nav  { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </>
  );
}
