import { motion } from 'framer-motion';

const ticker = [
  'Multimedia', 'Web Dev', 'Filmmaker', 'Video Editor',
  'Content Creator', 'Flutter', 'React', 'AI / ML', 'Sri Lanka',
  'Multimedia', 'Web Dev', 'Filmmaker', 'Video Editor',
  'Content Creator', 'Flutter', 'React', 'AI / ML', 'Sri Lanka',
];

const roles = ['Developer', 'Filmmaker', 'Creator', 'Designer'];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* ── Animated background orbs ── */}
      <div className="orb-1" style={{
        position: 'absolute', top: '8%', right: '10%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', borderRadius: '50%',
        filter: 'blur(60px)',
      }} />
      <div className="orb-2" style={{
        position: 'absolute', bottom: '15%', left: '5%',
        width: 450, height: 450,
        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', borderRadius: '50%',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(224,64,251,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(40px)',
      }} />

      {/* ── Subtle grid ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(124,92,252,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,0.035) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* ── Main content ── */}
      <div className="section-container" style={{ width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(124,92,252,0.1)',
              border: '1px solid rgba(124,92,252,0.3)',
              borderRadius: 50, padding: '0.35rem 1rem',
              marginBottom: '2rem',
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#00d4ff',
              boxShadow: '0 0 8px #00d4ff',
              animation: 'pulse-glow 2s ease-in-out infinite',
              display: 'block',
            }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.72rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(240,238,255,0.7)',
            }}>Available for projects</span>
          </motion.div>

          {/* Name */}
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '1.8rem',
          }}>
            <span style={{ display: 'block', color: 'var(--white)' }}>Supun N</span>
            <span
              className="grad-text"
              style={{ display: 'block' }}
            >Gunarathna</span>
          </h1>

          {/* Roles */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
              color: 'var(--muted)',
              maxWidth: 560,
              lineHeight: 1.7,
              marginBottom: '2.8rem',
              fontWeight: 300,
            }}
          >
            Every project starts the same way — a problem worth solving,
            a story worth telling, and whatever tools it takes to get there.
          </motion.p>

          {/* Role tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
          >
            {roles.map((role, i) => (
              <span key={role} style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem',
                padding: '0.3rem 0.9rem',
                borderRadius: 50,
                border: `1px solid ${i === 0 ? 'rgba(124,92,252,0.5)' : i === 1 ? 'rgba(0,212,255,0.35)' : 'rgba(224,64,251,0.35)'}`,
                color: i === 0 ? '#7c5cfc' : i === 1 ? '#00d4ff' : i === 2 ? '#e040fb' : 'var(--amber)',
                background: i === 0 ? 'rgba(124,92,252,0.08)' : i === 1 ? 'rgba(0,212,255,0.06)' : i === 2 ? 'rgba(224,64,251,0.06)' : 'rgba(240,180,41,0.06)',
                letterSpacing: '0.06em',
              }}>{role}</span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a href="#projects" className="btn-glow">View My Work</a>
            <a href="#contact" className="btn-outline">Get in Touch</a>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: '3rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.62rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--muted)',
          }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, rgba(124,92,252,0.8), transparent)',
            }}
          />
        </motion.div>
      </div>

      {/* ── Film strip ticker ── */}
      <div style={{
        marginTop: 'auto',
        overflow: 'hidden',
        borderTop: '1px solid rgba(124,92,252,0.12)',
        background: 'rgba(124,92,252,0.02)',
        position: 'relative',
      }}>
        {/* Top sprockets */}
        <div style={{ display: 'flex', gap: '2rem', padding: '0.6rem 1rem 0' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{
              width: 9, height: 6,
              border: '1px solid rgba(124,92,252,0.2)',
              borderRadius: 1, flexShrink: 0,
            }} />
          ))}
        </div>

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          style={{
            display: 'flex', gap: '3.5rem',
            padding: '0.6rem 0',
            willChange: 'transform',
          }}
        >
          {ticker.map((item, i) => (
            <span key={i} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.72rem', letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: i % 3 === 0 ? 'var(--violet)' : i % 3 === 1 ? 'var(--cyan-dim)' : 'var(--muted-2)',
              flexShrink: 0, whiteSpace: 'nowrap',
            }}>
              {item}
              <span style={{ marginLeft: '3.5rem', color: 'rgba(124,92,252,0.25)', fontSize: '0.9rem' }}>◆</span>
            </span>
          ))}
        </motion.div>

        {/* Bottom sprockets */}
        <div style={{ display: 'flex', gap: '2rem', padding: '0 1rem 0.6rem' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{
              width: 9, height: 6,
              border: '1px solid rgba(124,92,252,0.2)',
              borderRadius: 1, flexShrink: 0,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #hero h1 { font-size: clamp(2.8rem, 13vw, 5rem) !important; }
        }
      `}</style>
    </section>
  );
}
