import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, ArrowUpRight } from '@phosphor-icons/react';

const ease = [0.16, 1, 0.3, 1];

export default function HeroTitle({ onOpenShowreel }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        zIndex: 5,
        maxWidth: '540px',
      }}
    >
      {/* ── Subtitle Eyebrow ── */}
      <motion.div
        {...fade(0.15)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          marginBottom: '1rem',
        }}
      >
        <span
          style={{
            width: 20,
            height: 1,
            background: 'var(--amber, #D4A843)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.75rem',
            letterSpacing: '0.22em',
            color: 'var(--smoke, #A09FA8)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          HELLO, I'M
        </span>
      </motion.div>

      {/* ── Name (Two lines in elegant DM Serif Display) ── */}
      <motion.h1
        {...fade(0.25)}
        style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(2.75rem, 6vw, 5.25rem)',
          fontWeight: 400,
          lineHeight: 1.04,
          letterSpacing: '-0.015em',
          color: 'var(--bone, #E8E6DF)',
          marginBottom: '1rem',
          textWrap: 'balance',
        }}
      >
        Supun<br />Gunarathna
      </motion.h1>

      {/* ── Role Line (Small tracked caps in Amber) ── */}
      <motion.div
        {...fade(0.35)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: '1.25rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
            letterSpacing: '0.16em',
            color: 'var(--amber, #D4A843)',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          VIDEO EDITOR &amp; VISUAL CREATOR
        </span>
      </motion.div>

      {/* ── Intro Bio Paragraph ── */}
      <motion.p
        {...fade(0.42)}
        style={{
          fontFamily: 'var(--font-sans, system-ui)',
          fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
          lineHeight: 1.68,
          color: 'var(--smoke, #A09FA8)',
          maxWidth: '44ch',
          marginBottom: '1.75rem',
        }}
      >
        Crafting cinematic narratives across documentaries, high-impact event productions, and short-form edits. Obsessed with rhythm, color fidelity, and the emotional weight of every cut.
      </motion.p>

      {/* ── Signature Line ── */}
      <motion.div
        {...fade(0.5)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <img
          src="/signature.svg"
          alt="Supun Gunarathna signature"
          style={{
            height: '46px',
            width: 'auto',
            filter: 'brightness(0) invert(0.8) sepia(0.6) saturate(3) hue-rotate(5deg)',
            opacity: 0.9,
          }}
        />
        <div style={{ height: 1, width: 40, background: 'var(--border)' }} />
      </motion.div>

      {/* ── Action Buttons ── */}
      <motion.div
        {...fade(0.58)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={onOpenShowreel}
          className="btn btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            boxShadow: '0 8px 24px var(--amber-glow)',
          }}
        >
          <Play size={16} weight="fill" />
          <span>{t('hero.cta_primary', 'Watch Showreel')}</span>
        </button>

        <a
          href="#contact"
          className="btn btn-ghost"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <span>{t('hero.cta_secondary', 'Get in Touch')}</span>
          <ArrowUpRight size={15} />
        </a>
      </motion.div>
    </div>
  );
}
