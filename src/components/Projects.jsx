import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    title: 'Fresh Lens App',
    tag: 'Flutter · TFLite · Firebase',
    year: '2026',
    desc: 'AI-powered fruit ripeness detection app for Sri Lankan farmers. Supports Mango, Java Apple, Watermelon, and Passion Fruit with multilingual UI (EN / SI / TA), Firebase auth, marketplace, and dark/light theming.',
    highlight: true,
  },
  {
    title: 'Multilingual Portfolio',
    tag: 'React · Vite · Framer Motion',
    year: '2026',
    desc: 'This portfolio itself — built with Vite, Tailwind CSS v4, react-i18next for English/Sinhala/Tamil support, glass-effect cards, and scroll animations.',
    highlight: false,
  },
  {
    title: '"මේ හිත සනසා" Music Video',
    tag: 'Sony A6400 · After Effects · Filmmaking',
    year: '2026',
    desc: 'Directed and shot a Sinhala music video on the UVOCTECH campus — handheld cinematography with two lead actors. End-to-end: script, direction, editing, and color grade.',
    highlight: false,
    videoPath: '/videos/music-video.mp4',
  },
  {
    title: 'Cinematic Motion Project',
    tag: 'After Effects · Gemini Imagen 3 · Photoshop',
    year: '2026',
    desc: 'AI-assisted dark cinematic motion video. AI backgrounds generated via Gemini Imagen 3, graded in Photoshop, then animated in After Effects with a structured color narrative arc.',
    highlight: false,
    videoPath: '/videos/cinematic-motion.mp4',
  },
  {
    title: 'BTS Video',
    tag: 'Primire Pro',
    year: '2026',
    desc: 'BTS of Opening ceremony proadcast Studio & Inauguration of 2026 at UOVT.',
    highlight: true,
    videoPath: '/videos/bts.mp4',
  },

];

function ProjectCard({ project, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: project.highlight ? 'linear-gradient(135deg, var(--navy) 0%, rgba(200,169,110,0.06) 100%)' : 'var(--navy)',
        border: project.highlight ? '1px solid rgba(200,169,110,0.35)' : '1px solid var(--border)',
        padding: '2rem',
        cursor: (project.videoPath || project.videoLink) ? 'pointer' : 'default',
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
      
      {(project.videoPath || project.videoLink) && (
        <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--amber)', fontSize: '0.8rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
          <span>▶ Watch Video</span>
        </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [selectedVideo, setSelectedVideo] = useState(null);

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
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              onClick={() => {
                if (p.videoLink) {
                  window.open(p.videoLink, '_blank');
                } else if (p.videoPath) {
                  setSelectedVideo(p.videoPath);
                }
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '900px',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                style={{
                  position: 'absolute',
                  top: '1rem', right: '1rem',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: 'white', border: 'none',
                  width: '32px', height: '32px',
                  borderRadius: '50%',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  cursor: 'pointer', zIndex: 10,
                  fontSize: '1.2rem'
                }}
              >
                ✕
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
