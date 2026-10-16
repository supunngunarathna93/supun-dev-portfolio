import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowsHorizontal } from '@phosphor-icons/react';

const ease = [0.16, 1, 0.3, 1];

// VIDEO SLOTS: replace these with real before/after frame grabs or video posters
const BEFORE_IMG = 'public/projects/before.png';
const AFTER_IMG = 'public/projects/after.png';

export default function BeforeAfter() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const sliderRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const [position, setPosition] = useState(50); // 0–100%
  const [dragging, setDragging] = useState(false);

  const getPos = useCallback((e) => {
    if (!sliderRef.current) return 50;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(1, Math.min(99, pct));
  }, []);

  const onStart = (e) => {
    setDragging(true);
  };
  const onMove = useCallback((e) => {
    if (!dragging || !sliderRef.current) return;
    setPosition(getPos(e));
  }, [dragging, getPos]);
  const onEnd = () => setDragging(false);

  return (
    <section id="beforeafter">
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
            {t('beforeafter.title')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: 'var(--smoke)',
            maxWidth: '46ch',
            lineHeight: 1.7,
          }}>
            {t('beforeafter.subtitle')}
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            marginTop: '1rem',
            border: '1px solid var(--amber-border)',
            background: 'var(--amber-glow)',
            borderRadius: 'var(--r-sm)',
            padding: '0.25rem 0.75rem',
          }}>
            <span className="label">{t('beforeafter.tool_note')}</span>
          </div>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <div
            ref={sliderRef}
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchMove={onMove}
            onTouchEnd={onEnd}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              userSelect: 'none',
              touchAction: 'none',
              cursor: dragging ? 'ew-resize' : 'col-resize',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
            role="img"
            aria-label="Before and after color grading comparison. Drag horizontally to compare."
          >
            {/* AFTER (graded) — full width, clipped on left */}
            <img
              src={AFTER_IMG}
              alt="Color-graded footage"
              draggable={false}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                userSelect: 'none',
              }}
            />

            {/* BEFORE (raw) — responsive clip-path */}
            <div style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              clipPath: `inset(0 ${100 - position}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - position}% 0 0)`,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}>
              <img
                src={BEFORE_IMG}
                alt="Raw ungraded footage"
                draggable={false}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  userSelect: 'none',
                }}
              />
            </div>

            {/* Divider line */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0,
              left: `${position}%`,
              width: 2,
              background: 'var(--amber)',
              boxShadow: '0 0 10px rgba(212,168,67,0.5)',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }} />

            {/* Handle */}
            <div
              onMouseDown={onStart}
              onTouchStart={onStart}
              style={{
                position: 'absolute', top: '50%',
                left: `${position}%`,
                transform: 'translate(-50%, -50%)',
                width: 'clamp(38px, 5vw, 44px)',
                height: 'clamp(38px, 5vw, 44px)',
                borderRadius: '50%',
                background: 'var(--amber)',
                border: '3px solid var(--ink)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'ew-resize',
                boxShadow: '0 0 16px rgba(212,168,67,0.4), 0 4px 12px rgba(0,0,0,0.5)',
                zIndex: 10,
                touchAction: 'none',
                transition: 'transform 0.1s',
              }}
              aria-label="Drag to compare before and after"
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
            >
              <ArrowsHorizontal size={18} weight="bold" style={{ color: 'var(--ink)' }} />
            </div>

            {/* BEFORE badge */}
            <div style={{
              position: 'absolute', top: '0.75rem', left: '0.75rem',
              background: 'rgba(11,11,13,0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-sm)',
              padding: '0.2rem 0.65rem',
              pointerEvents: 'none',
              opacity: position > 15 ? 1 : 0,
              transition: 'opacity 0.2s',
            }}>
              <span className="label" style={{ color: 'var(--smoke)' }}>
                {t('beforeafter.badge_before')}
              </span>
            </div>

            {/* AFTER badge */}
            <div style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              background: 'rgba(11,11,13,0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--amber-border)',
              borderRadius: 'var(--r-sm)',
              padding: '0.2rem 0.65rem',
              pointerEvents: 'none',
              opacity: position < 85 ? 1 : 0,
              transition: 'opacity 0.2s',
            }}>
              <span className="label">{t('beforeafter.badge_after')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
