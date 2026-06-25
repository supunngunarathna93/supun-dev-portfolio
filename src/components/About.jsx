import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '2+', label: 'Years Coding' },
  { value: '10+', label: 'Projects Built' },
  { value: '3',   label: 'Languages' },
  { value: '∞',   label: 'Curiosity' },
];

const info = [
  { label: 'University', value: 'University of Vocational Technology, Sri Lanka' },
  { label: 'Degree',     value: 'Multimedia & Web Technology' },
  { label: 'Focus',      value: 'Mobile Apps · AI/ML · Filmmaking · Video Editing' },
  { label: 'Languages',  value: 'Sinhala · Tamil · English' },
  { label: 'Currently',  value: 'Building Fresh Lens App + Multilingual React Portfolio' },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} style={{ padding: '9rem 0', position: 'relative', overflow: 'hidden' }}>

      {/* BG accent orb */}
      <div style={{
        position: 'absolute', top: '15%', right: '-8%',
        width: 550, height: 550,
        background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
        filter: 'blur(65px)', pointerEvents: 'none', borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 70%)',
        filter: 'blur(55px)', pointerEvents: 'none', borderRadius: '50%',
      }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>01 — About</span>

          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontWeight: 800, lineHeight: 1.1,
            marginBottom: '3.5rem', letterSpacing: '-0.02em',
          }}>
            Crafting at the edge of<br />
            <span className="grad-text">code &amp; cinema</span>
          </h2>

          {/* Stats row — deep glass cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem', marginBottom: '3.5rem',
          }} className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{
                  background: 'rgba(10,8,30,0.55)',
                  border: '1px solid rgba(124,92,252,0.2)',
                  backdropFilter: 'blur(24px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                  borderRadius: 18,
                  padding: '1.75rem 1.5rem',
                  textAlign: 'center',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124,92,252,0.4)';
                  e.currentTarget.style.boxShadow   = '0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(124,92,252,0.12), inset 0 1px 0 rgba(255,255,255,0.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124,92,252,0.2)';
                  e.currentTarget.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)';
                }}
              >
                {/* top shine */}
                <div style={{
                  position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(124,92,252,0.45), transparent)',
                }} />
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900,
                  background: 'linear-gradient(135deg, #7c5cfc, #00d4ff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', lineHeight: 1, marginBottom: '0.4rem',
                }}>{s.value}</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.72rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--muted)',
                }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Two-column bio + info */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '3rem', alignItems: 'start',
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

              <div style={{
                marginTop: '2rem', height: 2, width: 80,
                background: 'linear-gradient(90deg, #7c5cfc, transparent)',
                borderRadius: 2,
              }} />
            </motion.div>

            {/* Info list — glass panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                background: 'rgba(10,8,30,0.50)',
                border: '1px solid rgba(124,92,252,0.18)',
                backdropFilter: 'blur(28px) saturate(160%)',
                WebkitBackdropFilter: 'blur(28px) saturate(160%)',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
                position: 'relative',
              }}
            >
              {/* top shine line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(124,92,252,0.5), rgba(0,212,255,0.3), transparent)',
              }} />

              {info.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                  style={{
                    display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
                    padding: '1.1rem 1.5rem',
                    borderBottom: i < info.length - 1 ? '1px solid rgba(124,92,252,0.1)' : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.68rem', letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#7c5cfc', minWidth: 90,
                    paddingTop: 3, opacity: 0.9,
                  }}>{label}</span>
                  <span style={{
                    color: 'var(--white)', fontSize: '0.9rem', lineHeight: 1.5,
                  }}>{value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 700px) { .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}</style>
    </section>
  );
}
