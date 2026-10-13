import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ease = [0.16, 1, 0.3, 1];

// DaVinci Resolve wordmark (simplified SVG mark — amber colored)
function ResolveIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="6" fill="rgba(212,168,67,0.12)" stroke="rgba(212,168,67,0.25)" strokeWidth="1"/>
      <circle cx="18" cy="18" r="9" stroke="var(--amber)" strokeWidth="1.5" fill="none"/>
      <circle cx="18" cy="18" r="4" fill="var(--amber)" opacity="0.9"/>
      <circle cx="18" cy="18" r="1.5" fill="var(--ink)"/>
    </svg>
  );
}

function PremierIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="6" fill="rgba(212,168,67,0.08)" stroke="rgba(212,168,67,0.2)" strokeWidth="1"/>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
        style={{ fontFamily:'var(--font-mono)', fontSize:'0.9rem', fontWeight:600, fill:'var(--amber)' }}>
        Pr
      </text>
    </svg>
  );
}

function CapCutIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="6" fill="rgba(212,168,67,0.08)" stroke="rgba(212,168,67,0.2)" strokeWidth="1"/>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
        style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', fontWeight:600, fill:'var(--amber)' }}>
        CC
      </text>
    </svg>
  );
}

const TOOLS = [
  {
    key: 'resolve',
    icon: <ResolveIcon />,
    pipelineLabel: 'Primary suite',
  },
  {
    key: 'premiere',
    icon: <PremierIcon />,
    pipelineLabel: 'Broadcast & collab',
  },
  {
    key: 'capcut',
    icon: <CapCutIcon />,
    pipelineLabel: 'Social & short-form',
  },
];

function ToolCell({ tool, t, index, inView, reduce }) {
  const tagsKey = `workflow.${tool.key}_tags`;
  const tags = t(tagsKey, { returnObjects: true });

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.1, ease }}
      className="card"
      style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}
    >
      {/* Icon + pipeline label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
        {tool.icon}
        <div>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--bone)',
            letterSpacing: '-0.01em',
          }}>
            {t(`workflow.${tool.key}_title`)}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'var(--amber-dim)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: '0.1rem',
          }}>
            {tool.pipelineLabel}
          </div>
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.88rem',
        color: 'var(--smoke)',
        lineHeight: 1.7,
        marginBottom: '1.25rem',
      }}>
        {t(`workflow.${tool.key}_desc`)}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {Array.isArray(tags) ? tags.map((tag) => (
          <span key={tag} className="chip">{tag}</span>
        )) : null}
      </div>
    </motion.div>
  );
}

export default function Workflow() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();

  return (
    <section id="workflow">
      <div className="container" ref={ref}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: '3rem' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--bone)',
            marginBottom: '0.6rem',
          }}>
            {t('workflow.title')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: 'var(--smoke)',
            maxWidth: '44ch',
            lineHeight: 1.7,
          }}>
            {t('workflow.subtitle')}
          </p>
        </motion.div>

        {/* Bento — 3 equal cells on desktop, stacked on mobile */}
        <div className="workflow-grid">
          {TOOLS.map((tool, i) => (
            <ToolCell
              key={tool.key}
              tool={tool}
              t={t}
              index={i}
              inView={inView}
              reduce={reduce}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .workflow-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 640px) and (max-width: 900px) { .workflow-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
