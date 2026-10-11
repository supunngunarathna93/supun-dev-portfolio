export default function HeroSideLabels() {
  return (
    <>
      {/* ── Left Side Label ── */}
      <div
        className="hero-side-label-left"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 'clamp(1rem, 2.5vw, 2.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          zIndex: 6,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.625rem',
            letterSpacing: '0.22em',
            color: 'var(--fog, #5A5963)',
            textTransform: 'uppercase',
          }}
        >
          VIDEO EDITING / MOTION DESIGN
        </span>
        <span
          style={{
            width: 1,
            height: 48,
            background: 'var(--border, rgba(255,255,255,0.08))',
          }}
        />
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'var(--amber, #D4A843)',
            opacity: 0.6,
          }}
        />
      </div>

      {/* ── Right Side Label ── */}
      <div
        className="hero-side-label-right"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 'clamp(1rem, 2.5vw, 2.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          zIndex: 6,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'var(--amber, #D4A843)',
            opacity: 0.6,
          }}
        />
        <span
          style={{
            width: 1,
            height: 48,
            background: 'var(--border, rgba(255,255,255,0.08))',
          }}
        />
        <span
          style={{
            writingMode: 'vertical-rl',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.625rem',
            letterSpacing: '0.22em',
            color: 'var(--fog, #5A5963)',
            textTransform: 'uppercase',
          }}
        >
          FILMMAKING / COLOR GRADING
        </span>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hero-side-label-left,
          .hero-side-label-right {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
