import { motion } from 'framer-motion';

// ✏️ EDIT: Update these keywords to match your own skills/interests (repeat them to fill the strip)
const ticker = ['Multimedia', 'Web Dev', 'Filmmaker', 'Video Editor', 'Content Creator', 'Flutter', 'React', 'Motion', 'Sri Lanka', 'Multimedia', 'Web Dev', 'Filmmaker', 'AI', 'Flutter', 'React', 'Motion', 'Sri Lanka'];

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>

      {/* Ambient gradient orbs */}
      <div style={{ position: 'absolute', top: '15%', left: '60%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(26,26,46,0.9) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1.5rem' }}>— Available for projects</span>

          {/* ✏️ EDIT: Your first name (and middle initial if needed) goes on line 1, last name on line 2 */}
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            Supun N<br />
            <span style={{ color: 'var(--amber)' }}>Gunarathna</span>
          </h1>

          {/* ✏️ EDIT: Your short tagline / bio description shown on the hero section */}
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: '2.5rem', fontWeight: 300 }}>
            Every project starts the same way. A problem worth solving, a story worth telling, and whatever tools it takes to get there.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" style={{
              fontFamily: "'Space Grotesk', sans-serif", padding: '0.8rem 2rem',
              background: 'var(--amber)', color: 'var(--black)', textDecoration: 'none',
              fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'none'; }}
            >View Work</a>
            <a href="#contact" style={{
              fontFamily: "'Space Grotesk', sans-serif", padding: '0.8rem 2rem',
              border: '1px solid var(--border)', color: 'var(--white)', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.05em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--amber)'; e.target.style.color = 'var(--amber)'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--white)'; }}
            >Get in Touch</a>
          </div>
        </motion.div>
      </div>

      {/* Film strip ticker */}
      <div style={{ marginTop: 'auto', paddingTop: '4rem', overflow: 'hidden', borderTop: '1px solid var(--border)', position: 'relative' }}>
        {/* Sprocket holes row */}
        <div style={{ display: 'flex', gap: '2.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem' }}>
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} style={{ width: 10, height: 7, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 1, flexShrink: 0 }} />
          ))}
        </div>

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '3rem', paddingBottom: '0.5rem', paddingTop: '0.5rem', willChange: 'transform' }}
        >
          {ticker.map((item, i) => (
            <span key={i} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: i % 2 === 0 ? 'var(--amber)' : 'var(--muted)',
              flexShrink: 0, whiteSpace: 'nowrap',
            }}>
              {item}
              <span style={{ marginLeft: '3rem', color: 'var(--border)', fontSize: '1rem' }}>▸</span>
            </span>
          ))}
        </motion.div>

        {/* Sprocket holes row */}
        <div style={{ display: 'flex', gap: '2.5rem', paddingTop: '0.5rem', paddingLeft: '1rem' }}>
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} style={{ width: 10, height: 7, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 1, flexShrink: 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
