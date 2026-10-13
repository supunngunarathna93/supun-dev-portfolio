import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ease = [0.16, 1, 0.3, 1];

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();

  const INFO_KEYS = ['university', 'degree', 'focus', 'languages', 'based'];

  return (
    <section id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', right: '-8%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 65%)',
        filter: 'blur(80px)',
        pointerEvents: 'none', borderRadius: '50%',
      }} />

      <div className="container" ref={ref}>
        {/* Asymmetric split: left portrait zone, right content */}
        <div className="about-grid">

          {/* Left — editorial large text + decorative */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            {/* Giant editorial quote */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: 'var(--bone)',
              marginBottom: '2.5rem',
            }}>
              {t('about.headline')}
            </div>

            {/* Divider with amber accent */}
            <div style={{
              height: 2, width: 64,
              background: 'var(--amber)',
              borderRadius: 2,
              marginBottom: '2rem',
            }} />

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--smoke)',
              lineHeight: 1.8,
              marginBottom: '1.25rem',
              maxWidth: '48ch',
            }}>
              {t('about.bio1')}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--smoke)',
              lineHeight: 1.8,
              maxWidth: '48ch',
            }}>
              {t('about.bio2')}
            </p>
          </motion.div>

          {/* Right — info panel */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            {/* Section label */}
            <div style={{ marginBottom: '2rem' }}>
              <span className="label" style={{ color: 'var(--fog)', fontSize: '0.6rem' }}>
                {t('about.title')}
              </span>
            </div>

            {/* Info rows */}
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
            }}>
              {INFO_KEYS.map((key, i) => (
                <motion.div
                  key={key}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease }}
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'flex-start',
                    padding: '1rem 1.5rem',
                    borderBottom: i < INFO_KEYS.length - 1
                      ? '1px solid var(--border)'
                      : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--amber)',
                    minWidth: 80,
                    paddingTop: 2,
                    opacity: 0.8,
                  }}>
                    {t(`about.label_${key}`)}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    color: 'var(--bone)',
                    lineHeight: 1.55,
                  }}>
                    {t(`about.info_${key}`)}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Web/dev note — secondary info */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem 1.25rem',
              background: 'var(--amber-glow)',
              border: '1px solid var(--amber-border)',
              borderRadius: 'var(--r-md)',
            }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                color: 'var(--smoke)',
                lineHeight: 1.65,
              }}>
                In parallel: building web apps with React + Vite, Flutter mobile apps,
                and AI/ML experiments — all skills that feed back into the edit suite.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
