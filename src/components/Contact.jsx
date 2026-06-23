import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [copied, setCopied] = useState(false);

  const email = 'supun@example.com'; // ← replace with your real email

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { label: 'GitHub', href: 'https://github.com/yourusername' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: '8rem 2rem 6rem', background: 'linear-gradient(180deg, var(--black) 0%, var(--navy) 100%)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>04 — Contact</span>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: 700 }}>
            Let's make something<br /><span style={{ color: 'var(--amber)' }}>worth watching.</span>
          </h2>

          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 500, marginBottom: '3rem' }}>
            Open to freelance projects, collaborations, and interesting conversations — about tech, film, or both.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={copy} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              padding: '0.9rem 2.2rem',
              background: copied ? 'rgba(200,169,110,0.15)' : 'var(--amber)',
              color: copied ? 'var(--amber)' : 'var(--black)',
              border: copied ? '1px solid var(--amber)' : 'none',
              fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em',
              cursor: 'pointer', transition: 'all 0.3s',
            }}>
              {copied ? '✓ Copied!' : 'Copy Email'}
            </button>

            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'Space Grotesk', sans-serif",
                padding: '0.9rem 2.2rem',
                border: '1px solid var(--border)', color: 'var(--white)',
                textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem',
                letterSpacing: '0.05em', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--amber)'; e.target.style.color = 'var(--amber)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--white)'; }}
              >{l.label}</a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div style={{ marginTop: '6rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: 'var(--muted)' }}>
            © 2025 Supun Peiris
          </span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
            Built with React + Vite
          </span>
        </div>
      </div>
    </section>
  );
}
