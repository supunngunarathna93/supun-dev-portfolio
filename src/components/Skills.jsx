import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const services = [
  {
    icon: '📱', number: '01', name: 'Mobile & App Dev',
    desc: 'Building cross-platform mobile apps with Flutter — from AI-powered detectors to marketplace platforms with Firebase backends.',
    skills: ['Flutter', 'Dart', 'Firebase', 'TFLite', 'FVM', 'REST APIs'],
    accent: '#7c5cfc',
  },
  {
    icon: '🌐', number: '02', name: 'Web Development',
    desc: 'Creating modern, responsive websites and SPAs with React and Vite — optimized, animated, and production-ready.',
    skills: ['React', 'Vite', 'Framer Motion', 'HTML/CSS/JS', 'react-i18next'],
    accent: '#00d4ff',
  },
  {
    icon: '🤖', number: '03', name: 'AI & Machine Learning',
    desc: 'Training and deploying lightweight ML models for real-world use cases — from image classification to AI-assisted workflows.',
    skills: ['Teachable Machine', 'TFLite', 'Dataset Curation', 'Class Balancing', 'Gemini'],
    accent: '#e040fb',
  },
  {
    icon: '🎬', number: '04', name: 'Filmmaking & Post',
    desc: 'End-to-end video production — scripting, direction, cinematography on Sony A6400, editing, and cinematic color grading.',
    skills: ['Sony A6400', 'After Effects', 'Premiere Pro', 'Photoshop', 'Color Grading'],
    accent: '#f0b429',
  },
  {
    icon: '🎨', number: '05', name: 'AI-Assisted Visuals',
    desc: 'Leveraging generative AI to create backgrounds, assets, and composites — blending AI output with traditional post-production.',
    skills: ['Gemini Imagen 3', 'AI Compositing', 'Prompt Engineering', 'Photoshop'],
    accent: '#7c5cfc',
  },
  {
    icon: '🌍', number: '06', name: 'Multilingual Interfaces',
    desc: 'Building apps and interfaces that speak multiple languages — English, Sinhala, and Tamil — for inclusive digital products.',
    skills: ['react-i18next', 'Sinhala', 'Tamil', 'English', 'i18n'],
    accent: '#00d4ff',
  },
];

function ServiceCard({ svc, index }) {
  const cardRef    = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(18,14,50,0.70)' : 'rgba(10,8,30,0.48)',
        border: `1px solid ${hovered ? svc.accent + '50' : 'rgba(124,92,252,0.18)'}`,
        backdropFilter: 'blur(28px) saturate(170%)',
        WebkitBackdropFilter: 'blur(28px) saturate(170%)',
        borderRadius: 22,
        padding: '2rem',
        position: 'relative', overflow: 'hidden', cursor: 'default',
        transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.35s, background 0.3s',
        boxShadow: hovered
          ? `0 0 50px ${svc.accent}14, 0 24px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
          : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
        transform: hovered ? 'translateY(-6px)' : 'none',
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${svc.accent}70, transparent)`
          : `linear-gradient(90deg, transparent, ${svc.accent}35, transparent)`,
        transition: 'all 0.35s',
      }} />

      {/* Number + Icon row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.3rem' }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.2em', color: svc.accent, opacity: 0.7,
        }}>{svc.number}</span>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: `${svc.accent}12`,
          border: `1px solid ${svc.accent}28`,
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: hovered ? `0 0 20px ${svc.accent}20` : 'none',
          transition: 'box-shadow 0.35s',
        }}>{svc.icon}</div>
      </div>

      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '1.15rem', fontWeight: 700,
        marginBottom: '0.8rem', letterSpacing: '-0.01em',
        color: 'var(--white)',
      }}>{svc.name}</h3>

      <p style={{
        color: 'var(--muted)', fontSize: '0.88rem',
        lineHeight: 1.7, marginBottom: '1.4rem',
      }}>{svc.desc}</p>

      {/* Skill tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {svc.skills.map((skill) => (
          <span key={skill} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.7rem', padding: '0.28rem 0.78rem',
            borderRadius: 50,
            border: `1px solid ${svc.accent}28`,
            color: svc.accent,
            background: `${svc.accent}08`,
            backdropFilter: 'blur(6px)',
            letterSpacing: '0.04em',
          }}>{skill}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" ref={ref} style={{ padding: '9rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* BG orbs */}
      <div style={{
        position: 'absolute', bottom: '5%', left: '-5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,92,252,0.07) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none', borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', top: '10%', right: '-3%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        filter: 'blur(55px)', pointerEvents: 'none', borderRadius: '50%',
      }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>03 — What I Do</span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem',
          }}>
            Tools of the <span className="grad-text">craft</span>
          </h2>
          <p style={{
            color: 'var(--muted)', fontSize: '1rem',
            maxWidth: 520, lineHeight: 1.7, marginBottom: '3.5rem',
          }}>
            From Flutter apps to cinematic videos — here's what I bring to every project.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1.25rem',
        }}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.name} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
