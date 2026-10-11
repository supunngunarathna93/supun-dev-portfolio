import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FilmStrip,
  Palette,
  DeviceMobile,
  Star,
  WaveformSlash,
  Lightning,
} from '@phosphor-icons/react';

const ease = [0.16, 1, 0.3, 1];

const SERVICE_ICONS = [
  FilmStrip,
  Palette,
  DeviceMobile,
  Star,
  Lightning,
  WaveformSlash,
];

const SERVICE_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6'];

export default function Services() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(null);

  const toggle = (key) => setOpen(open === key ? null : key);

  return (
    <section id="services" style={{ padding: '8rem 0' }}>
      <div className="container" ref={ref}>
        {/* Header */}
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
            {t('services.title')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: 'var(--smoke)',
            maxWidth: '44ch',
            lineHeight: 1.7,
          }}>
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services list — vertical accordion */}
        <div style={{ display: 'flex', flexDirection: 'column' }} role="list">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = SERVICE_ICONS[i];
            const isOpen = open === key;
            return (
              <motion.div
                key={key}
                initial={reduce ? false : { opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.07, ease }}
                role="listitem"
              >
                <button
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-controls={`service-body-${key}`}
                  id={`service-hdr-${key}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.35rem 0',
                    background: 'none',
                    border: 'none',
                    borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    flexShrink: 0,
                    width: 40, height: 40,
                    borderRadius: 'var(--r-sm)',
                    background: isOpen ? 'var(--amber)' : 'var(--surface-2)',
                    border: '1px solid',
                    borderColor: isOpen ? 'var(--amber)' : 'var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background var(--t-fast), border-color var(--t-fast)',
                  }}>
                    <Icon
                      size={18}
                      weight="regular"
                      style={{ color: isOpen ? 'var(--ink)' : 'var(--smoke)', transition: 'color var(--t-fast)' }}
                    />
                  </div>

                  {/* Number + title */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--fog)',
                      letterSpacing: '0.12em',
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                      fontWeight: 600,
                      color: isOpen ? 'var(--amber)' : 'var(--bone)',
                      letterSpacing: '-0.01em',
                      transition: 'color var(--t-fast)',
                    }}>
                      {t(`services.${key}_title`)}
                    </span>
                  </div>

                  {/* Chevron */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: isOpen ? 'var(--amber)' : 'var(--fog)',
                    transition: 'transform 0.25s, color var(--t-fast)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }} aria-hidden="true">
                    ↓
                  </span>
                </button>

                {/* Expanded body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`service-body-${key}`}
                      aria-labelledby={`service-hdr-${key}`}
                      role="region"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        color: 'var(--smoke)',
                        lineHeight: 1.75,
                        padding: '1rem 0 1.5rem 3.5rem',
                        maxWidth: '56ch',
                      }}>
                        {t(`services.${key}_desc`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
