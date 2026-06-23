import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Smart Ripeness App',
    tag: 'Flutter · TFLite · Firebase',
    year: '2024',
    desc: 'AI-powered fruit ripeness detection app for Sri Lankan farmers. Supports Mango, Java Apple, Watermelon, and Passion Fruit with multilingual UI (EN / SI / TA), Firebase auth, marketplace, and dark/light theming.',
    highlight: true,
  },
  {
    title: 'Multilingual Portfolio',
    tag: 'React · Vite · Framer Motion',
    year: '2025',
    desc: 'This portfolio itself — built with Vite, Tailwind CSS v4, react-i18next for English/Sinhala/Tamil support, glass-effect cards, and scroll animations.',
    highlight: false,
  },
  {
    title: '"මේ හිත සනසා" Music Video',
    tag: 'Sony A6400 · After Effects · Filmmaking',
    year: '2024',
    desc: 'Directed and shot a Sinhala music video on the UVOCTECH campus — handheld cinematography with two lead actors. End-to-end: script, direction, editing, and color grade.',
    highlight: false,
  },
  {
    title: 'Cinematic Motion Project',
    tag: 'After Effects · Gemini Imagen 3 · Photoshop',
    year: '2024',
    desc: 'AI-assisted dark cinematic motion video. AI backgrounds generated via Gemini Imagen 3, graded in Photoshop, then animated in After Effects with a structured color narrative arc.',
    highlight: false,
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: project.highlight ? 'linear-gradient(135deg, var(--navy) 0%, rgba(200,169,110,0.06) 100%)' : 'var(--navy)',
        border: project.highlight ? '1px solid rgba(200,169,110,0.35)' : '1px solid var(--border)',
        padding: '2rem',
        cursor: 'default',
        transition: 'border-color 0.3s, transform 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {project.highlight && (
        <span style={{
          position: 'absolute', top: '1rem', right: '1rem',
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.65rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          background: 'var(--amber)', color: 'var(--black)', padding: '0.2rem 0.6rem', fontWeight: 700,
        }}>Featured</span>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', opacity: 0.8 }}>{project.tag}</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', color: 'var(--muted)' }}>{project.year}</span>
      </div>

      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.8rem', letterSpacing: '-0.01em' }}>{project.title}</h3>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>{project.desc}</p>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="projects" ref={ref} style={{ padding: '8rem 2rem', background: 'linear-gradient(180deg, var(--black) 0%, rgba(26,26,46,0.3) 50%, var(--black) 100%)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>02 — Projects</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '3.5rem' }}>
            Things I've <span style={{ color: 'var(--amber)' }}>built</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
