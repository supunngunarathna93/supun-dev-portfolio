import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HeroTitle from './hero/HeroTitle';
import HeroPortrait from './hero/HeroPortrait';
import HeroSideLabels from './hero/HeroSideLabels';
import ShowreelModal from './hero/ShowreelModal';

const ease = [0.16, 1, 0.3, 1];

// Giant display backdrop word: "EDITOR"
const GIANT_WORD = 'EDITOR';

export default function Hero() {
  const reduce = useReducedMotion();
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle desktop mouse parallax listener (normalized -0.5 to 0.5)
  useEffect(() => {
    if (reduce || typeof window === 'undefined') return;

    let rafId = null;
    const onMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) - 0.5;
        const ny = (e.clientY / window.innerHeight) - 0.5;
        setMouseOffset({ x: nx, y: ny });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 'clamp(80px, 12vh, 110px)',
        paddingBottom: 'clamp(40px, 6vh, 70px)',
        background: 'var(--ink, #0B0B0D)',
      }}
    >
      {/* ── Subtle warm ambient glow in center ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(500px, 70vw, 1000px)',
          height: 'clamp(500px, 70vw, 1000px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 168, 67, 0.06) 0%, rgba(11, 11, 13, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Giant Condensed Display Word ("EDITOR") behind subject ── */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.05, ease }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${mouseOffset.x * -12}px), calc(-50% + ${mouseOffset.y * -8}px))`,
          width: '100%',
          textAlign: 'center',
          zIndex: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 0.82,
          willChange: 'transform',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-condensed, "Bebas Neue", sans-serif)',
            fontSize: 'clamp(6.5rem, 21vw, 24rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            background: 'linear-gradient(180deg, rgba(232, 230, 223, 0.12) 0%, rgba(232, 230, 223, 0.015) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          {GIANT_WORD}
        </span>
      </motion.div>

      {/* ── Vertical Edge Labels (Editorial side notes) ── */}
      <HeroSideLabels />

      {/* ── Main Content Container: Split 2-Column Layout ── */}
      <div
        className="container hero-container"
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'center',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Left Column: Heading, Bio, Signature, Action Buttons */}
        <HeroTitle onOpenShowreel={() => setShowreelOpen(true)} />

        {/* Right Column: Layered Cutout Portrait with Floating App Tiles & Rotating Badge */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <HeroPortrait mouseOffset={mouseOffset} />
        </div>
      </div>

      {/* ── Lightbox Modal for Showreel Video ── */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 960px) {
          .hero-container {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .hero-container > div:first-child {
            align-items: center !important;
            text-align: center;
            margin: 0 auto;
          }
          .hero-container > div:first-child h1 {
            text-align: center;
          }
          .hero-container > div:first-child p {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-container > div:first-child > div {
            justify-content: center !important;
          }
        }

        @media (max-width: 640px) {
          #hero {
            padding-top: 85px !important;
            padding-bottom: 40px !important;
          }
          .hero-container {
            gap: 2.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
