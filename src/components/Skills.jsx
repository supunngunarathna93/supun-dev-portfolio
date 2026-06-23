import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const categories = [
  {
    name: 'Mobile & App Dev',
    skills: ['Flutter', 'Dart', 'Firebase', 'TFLite / Teachable Machine', 'FVM'],
  },
  {
    name: 'Web Development',
    skills: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'react-i18next', 'HTML / CSS / JS'],
  },
  {
    name: 'AI & Machine Learning',
    skills: ['Google Teachable Machine', 'TFLite Model Integration', 'Dataset Curation', 'Class Balancing'],
  },
  {
    name: 'Filmmaking & Post',
    skills: ['Sony A6400', 'After Effects', 'Adobe Photoshop', 'Cinematography', 'Color Grading', 'Direction'],
  },
  {
    name: 'AI Tools',
    skills: ['Gemini Imagen 3', 'AI-assisted Compositing', 'Prompt Engineering'],
  },
  {
    name: 'Languages',
    skills: ['Sinhala (Native)', 'English (Fluent)', 'Tamil (Working)'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" ref={ref} style={{ padding: '8rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>03 — Skills</span>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '3.5rem' }}>
          Tools of the <span style={{ color: 'var(--amber)' }}>craft</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {categories.map((cat, ci) => {
          const catRef = useRef(null);
          const catInView = useInView(catRef, { once: true, margin: '-40px' });
          return (
            <motion.div
              ref={catRef}
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={catInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
            >
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1.2rem', opacity: 0.9 }}>
                {cat.name}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {cat.skills.map(skill => (
                  <span key={skill} style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.8rem', padding: '0.35rem 0.85rem',
                    border: '1px solid var(--border)',
                    color: 'var(--white)', letterSpacing: '0.03em',
                    background: 'var(--navy)',
                    transition: 'border-color 0.2s, color 0.2s',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = 'var(--amber)'; e.target.style.color = 'var(--amber)'; }}
                    onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--white)'; }}
                  >{skill}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
