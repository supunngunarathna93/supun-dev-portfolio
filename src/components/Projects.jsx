import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    title: 'Fresh Lens App',
    tag: 'Flutter · TFLite · Firebase',
    year: '2026', emoji: '🌿',
    desc: 'AI-powered fruit ripeness detection app for Sri Lankan farmers. Supports Mango, Java Apple, Watermelon, and Passion Fruit with multilingual UI (EN / SI / TA), Firebase auth, marketplace, and dark/light theming.',
    featured: true, accent: '#7c5cfc', links: [],
  },
  {
    title: 'Multilingual Portfolio',
    tag: 'React · Vite · Framer Motion',
    year: '2026', emoji: '🌐',
    desc: 'This portfolio itself — built with Vite, react-i18next for English/Sinhala/Tamil support, glass-effect cards, cinematic dark theme, and smooth scroll animations.',
    featured: false, accent: '#00d4ff', links: [],
  },
  {
    title: '\"මේ හිත සනසා\" Music Video',
    tag: 'Sony A6400 · After Effects · Filmmaking',
    year: '2026', emoji: '🎬',
    desc: 'Directed and shot a Sinhala music video on the UVOCTECH campus — handheld cinematography with two lead actors. End-to-end: script, direction, editing, and color grade.',
    featured: false, accent: '#e040fb', videoLink: null,
  },
  {
    title: 'Cinematic Motion Project',
    tag: 'After Effects · Gemini Imagen 3 · Photoshop',
    year: '2026', emoji: '✨',
    desc: 'AI-assisted dark cinematic motion video. AI backgrounds generated via Gemini Imagen 3, graded in Photoshop, then animated in After Effects with a structured color narrative arc.',
    featured: false, accent: '#f0b429', videoLink: null,
  },
  {
    title: 'BTS Video — UOVT 2026',
    tag: 'Premiere Pro · Video Production',
    year: '2026', emoji: '🎥',
    desc: 'Behind-the-scenes coverage of the Opening Ceremony & Inauguration of 2026 at the University of Vocational Technology — broadcast studio production.',
    featured: true, accent: '#00d4ff',
    videoLink: 'https://drive.google.com/file/d/1aQyKoRgEV2HxwVil0fyPZvU4PCp41dLy/view?usp=sharing',
  },
];

function ProjectCard({ project, index, onClick }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);
  const hasVideo = !!(project.videoLink || project.videoPath);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(18,14,48,0.72)'
          : 'rgba(10,8,30,0.50)',
        backdropFilter: 'blur(28px) saturate(170%)',
        WebkitBackdropFilter: 'blur(28px) saturate(170%)',
        border: `1px solid ${hovered ? project.accent + '50' : 'rgba(124,92,252,0.18)'}`,
        borderRadius: 22,
        padding: '2rem',
        cursor: hasVideo ? 'pointer' : 'default',
        transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.3s, background 0.3s',
        position: 'relative', overflow: 'hidden',
        boxShadow: hovered
          ? `0 0 0 1px ${project.accent}18, 0 0 50px ${project.accent}14, 0 24px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
          : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
        transform: hovered ? 'translateY(-6px)' : 'none',
      }}
    >
      {/* Inner top shine */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${project.accent}70, transparent)`
          : 'linear-gradient(90deg, transparent, rgba(124,92,252,0.25), transparent)',
        transition: 'opacity 0.3s',
      }} />

      {/* Featured badge */}
      {project.featured && (
        <span style={{
          position: 'absolute', top: '1.2rem', right: '1.2rem',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          background: `linear-gradient(135deg, ${project.accent}, ${project.accent}99)`,
          color: '#fff', padding: '0.22rem 0.65rem',
          borderRadius: 50, fontWeight: 700,
          boxShadow: `0 0 14px ${project.accent}55`,
        }}>Featured</span>
      )}

      {/* Emoji + header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: `${project.accent}12`,
          border: `1px solid ${project.accent}30`,
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', flexShrink: 0,
          boxShadow: `0 0 16px ${project.accent}14`,
        }}>{project.emoji}</div>
        <div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.65rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: project.accent, opacity: 0.85,
            display: 'block',
          }}>{project.tag}</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.7rem', color: 'var(--muted)',
          }}>{project.year}</span>
        </div>
      </div>

      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '1.25rem', fontWeight: 700,
        marginBottom: '0.75rem', letterSpacing: '-0.01em',
        color: 'var(--white)',
      }}>{project.title}</h3>

      <p style={{
        color: 'var(--muted)', lineHeight: 1.72, fontSize: '0.88rem',
        marginBottom: hasVideo ? '1.2rem' : 0,
      }}>{project.desc}</p>

      {hasVideo && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          color: project.accent, fontSize: '0.8rem',
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          background: `${project.accent}10`,
          border: `1px solid ${project.accent}30`,
          backdropFilter: 'blur(8px)',
          borderRadius: 50, padding: '0.35rem 0.9rem',
        }}>
          <span style={{ fontSize: '0.75rem' }}>▶</span>
          <span>Watch Video</span>
        </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const ref          = useRef(null);
  const inView       = useInView(ref, { once: true, margin: '-60px' });
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: '9rem 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* BG accents */}
      <div style={{
        position: 'absolute', top: '30%', right: '-8%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(224,64,251,0.06) 0%, transparent 70%)',
        filter: 'blur(65px)', pointerEvents: 'none', borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '-5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        filter: 'blur(55px)', pointerEvents: 'none', borderRadius: '50%',
      }} />

      {/* Section glass stripe */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(10,8,30,0.30) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>02 — Projects</span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem',
          }}>
            Things I've <span className="grad-text">built</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 500, lineHeight: 1.7 }}>
            A mix of software, AI, and film — each project a different problem, a different medium.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '1.25rem',
        }}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title} project={p} index={i}
              onClick={() => {
                if (p.videoLink) window.open(p.videoLink, '_blank');
                else if (p.videoPath) setSelectedVideo(p.videoPath);
              }}
            />
          ))}
        </div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative', width: '100%', maxWidth: 900,
                aspectRatio: '16/9',
                background: 'rgba(5,5,13,0.95)',
                borderRadius: 20, overflow: 'hidden',
                boxShadow: '0 0 80px rgba(124,92,252,0.35), 0 40px 80px rgba(0,0,0,0.7)',
                border: '1px solid rgba(124,92,252,0.35)',
              }}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
                  background: 'rgba(10,8,30,0.7)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: '1rem',
                }}
              >✕</button>
              <video
                src={selectedVideo} controls autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
