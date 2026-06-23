import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} style={{ padding: '8rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>01 — About</span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
              Crafting at the edge of<br /><span style={{ color: 'var(--amber)' }}>code & cinema</span>
            </h2>
            {/* ✏️ EDIT: First paragraph — your main bio introduction */}
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '1rem' }}>
              I'm a Second-year Multimedia and Web Technology student at the University of Vocational Technology in Sri Lanka. My work lives at the crossroads of software development, AI/ML, and visual storytelling.
            </p>
            {/* ✏️ EDIT: Second paragraph — highlight a specific project or personal story */}
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1rem' }}>
              Every project starts the same way: a problem worth solving, a story worth telling, and whatever tools it takes to get there.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* ✏️ EDIT: Update each "value" with your own university, degree, focus, languages, and current project */}
            {[
              { label: 'University', value: ', Sri Lanka' },
              { label: 'Degree', value: 'Multimedia & Web Technology' },
              { label: 'Focus', value: 'Mobile Apps · AI/ML · Filmmaking' },
              { label: 'Languages', value: 'Sinhala · Tamil · English' },
              { label: 'Currently', value: 'Building a multilingual React portfolio + Smart Ripeness App' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', minWidth: 110, paddingTop: 3, opacity: 0.8 }}>{label}</span>
                <span style={{ color: 'var(--white)', fontSize: '0.95rem', lineHeight: 1.5 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div > div:last-child { display: none; }
          #about > div > div { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
