import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '2+', label: 'Years Coding' },
  { value: '10+', label: 'Projects Built' },
  { value: '3', label: 'Languages' },
  { value: '∞', label: 'Curiosity' },
];

const info = [
  { label: 'University', value: 'University of Vocational Technology, Sri Lanka' },
  { label: 'Degree', value: 'Multimedia & Web Technology' },
  { label: 'Focus', value: 'Mobile Apps · AI/ML · Filmmaking · Video Editing' },
  { label: 'Languages', value: 'Sinhala · Tamil · English' },
  { label: 'Currently', value: 'Building Fresh Lens App + Multilingual React Portfolio' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} style={{ padding: '9rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* background accent */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,212,255,0.055) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', borderRadius: '50%',
      }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>01 — About</span>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '3.5rem',
            letterSpacing: '-0.02em',
          }}>
            Crafting at the edge of<br />
            <span className="grad-text">code &amp; cinema</span>
          </h2>

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '4rem',
          }} className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  borderRadius: 16,
                }}
              >
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #7c5cfc, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}>{s.value}</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Two-column bio + info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }} className="about-grid">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.4rem', fontSize: '1rem' }}>
                I'm a second-year{' '}
                <span style={{ color: 'var(--white)', fontWeight: 500 }}>Multimedia and Web Technology</span>{' '}
                student at the University of Vocational Technology in Sri Lanka. My work lives at the crossroads of{' '}
                <span style={{ color: '#7c5cfc', fontWeight: 500 }}>software development</span>,{' '}
                <span style={{ color: '#00d4ff', fontWeight: 500 }}>AI/ML</span>, and{' '}
                <span style={{ color: '#e040fb', fontWeight: 500 }}>visual storytelling</span>.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '1rem' }}>
                Every project starts the same way: a problem worth solving, a story worth
                telling, and whatever tools it takes to get there. Whether that's writing
                Flutter code, directing a music video, or training an AI model — I'm in.
              </p>

              {/* Decorative line */}
              <div style={{
                marginTop: '2rem',
                height: 2,
                width: 80,
                background: 'linear-gradient(90deg, #7c5cfc, transparent)',
                borderRadius: 2,
              }} />
            </motion.div>

            {/* Info list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
            >
              {info.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                  style={{
                    display: 'flex',
                    gap: '1.2rem',
                    alignItems: 'flex-start',
                    padding: '1.1rem 0',
                    borderBottom: '1px solid rgba(124,92,252,0.1)',
                  }}
                >
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#7c5cfc',
                    minWidth: 100,
                    paddingTop: 3,
                    opacity: 0.9,
                  }}>{label}</span>
                  <span style={{
                    color: 'var(--white)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}>{value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
