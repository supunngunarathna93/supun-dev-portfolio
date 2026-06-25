import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: '📱',
    number: '01',
    name: 'Mobile & App Dev',
    desc: 'Building cross-platform mobile apps with Flutter — from AI-powered detectors to marketplace platforms with Firebase backends.',
    skills: ['Flutter', 'Dart', 'Firebase', 'TFLite', 'FVM', 'REST APIs'],
    accent: '#7c5cfc',
  },
  {
    icon: '🌐',
    number: '02',
    name: 'Web Development',
    desc: 'Creating modern, responsive websites and SPAs with React and Vite — optimized, animated, and production-ready.',
    skills: ['React', 'Vite', 'Framer Motion', 'HTML/CSS/JS', 'react-i18next'],
    accent: '#00d4ff',
  },
  {
    icon: '🤖',
    number: '03',
    name: 'AI & Machine Learning',
    desc: 'Training and deploying lightweight ML models for real-world use cases — from image classification to AI-assisted workflows.',
    skills: ['Teachable Machine', 'TFLite', 'Dataset Curation', 'Class Balancing', 'Gemini'],
    accent: '#e040fb',
  },
  {
    icon: '🎬',
    number: '04',
    name: 'Filmmaking & Post',
    desc: 'End-to-end video production — scripting, direction, cinematography on Sony A6400, editing, and cinematic color grading.',
    skills: ['Sony A6400', 'After Effects', 'Premiere Pro', 'Photoshop', 'Color Grading'],
    accent: '#f0b429',
  },
  {
    icon: '🎨',
    number: '05',
    name: 'AI-Assisted Visuals',
    desc: 'Leveraging generative AI to create backgrounds, assets, and composites — blending AI output with traditional post-production.',
    skills: ['Gemini Imagen 3', 'AI Compositing', 'Prompt Engineering', 'Photoshop'],
    accent: '#7c5cfc',
  },
  {
    icon: '🌍',
    number: '06',
    name: 'Multilingual Interfaces',
    desc: 'Building apps and interfaces that speak multiple languages — English, Sinhala, and Tamil — for inclusive digital products.',
    skills: ['react-i18next', 'Sinhala', 'Tamil', 'English', 'i18n'],
    accent: '#00d4ff',
  },
];

function ServiceCard({ svc, index, inView }) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 20,
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.35s',
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25 },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${svc.accent}55`;
        e.currentTarget.style.boxShadow = `0 0 40px ${svc.accent}18, 0 20px 50px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--glass-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: `linear-gradient(90deg, transparent, ${svc.accent}55, transparent)`,
      }} />

      {/* Number + Icon row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.2em',
          color: svc.accent,
          opacity: 0.7,
        }}>{svc.number}</span>
        <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{svc.icon}</span>
      </div>

      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '1.15rem', fontWeight: 700,
        marginBottom: '0.8rem',
        letterSpacing: '-0.01em',
        color: 'var(--white)',
      }}>{svc.name}</h3>

      <p style={{
        color: 'var(--muted)',
        fontSize: '0.88rem',
        lineHeight: 1.7,
        marginBottom: '1.4rem',
      }}>{svc.desc}</p>

      {/* Skill tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {svc.skills.map((skill) => (
          <span key={skill} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.7rem',
            padding: '0.28rem 0.75rem',
            borderRadius: 50,
            border: `1px solid ${svc.accent}30`,
            color: svc.accent,
            background: `${svc.accent}08`,
            letterSpacing: '0.04em',
          }}>{skill}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" ref={ref} style={{ padding: '9rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* BG orb */}
      <div style={{
        position: 'absolute', bottom: '5%', left: '-5%',
        width: 550, height: 550,
        background: 'radial-gradient(circle, rgba(124,92,252,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', borderRadius: '50%',
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
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            Tools of the <span className="grad-text">craft</span>
          </h2>
          <p style={{
            color: 'var(--muted)',
            fontSize: '1rem',
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: '3.5rem',
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
            <ServiceCard key={svc.name} svc={svc} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
