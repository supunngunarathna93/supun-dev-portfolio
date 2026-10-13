import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HeroTitle from './hero/HeroTitle';
import HeroPortrait from './hero/HeroPortrait';
import HeroSideLabels from './hero/HeroSideLabels';
import ShowreelModal from './hero/ShowreelModal';

const ease = [0.16, 1, 0.3, 1];

// Giant display backdrop words cycling through editing & motion disciplines
const TYPING_WORDS = ['EDITOR', 'COLORIST', 'MOTION', 'FILMMAKER'];

export default function Hero() {
  const reduce = useReducedMotion();
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Typewriter effect for giant backdrop text behind the portrait
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(TYPING_WORDS[0].length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const currentWord = TYPING_WORDS[wordIndex];

    if (!isDeleting && subIndex === currentWord.length) {
      // Hold completed word for ~2.3 seconds
      const timeout = setTimeout(() => setIsDeleting(true), 2300);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      // Word fully erased, brief 350ms breath before typing next discipline
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      }, 350);
      return () => clearTimeout(timeout);
    }

    const speed = isDeleting ? 65 : 125;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIndex, reduce]);

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

      {/* ── Full-Screen Kinetic Backdrop behind the entire hero section ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.05, ease }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            transform: `translate3d(${mouseOffset.x * -16}px, ${mouseOffset.y * -10}px, 0)`,
            transition: 'transform 0.18s ease-out',
            willChange: 'transform',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-condensed, "Bebas Neue", sans-serif)',
              fontSize: 'clamp(9rem, 32vw, 44rem)',
              fontWeight: 800,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              lineHeight: 1,
              padding: '0.12em 0',
              textAlign: 'center',
              background: 'linear-gradient(180deg, rgba(232, 230, 223, 0.14) 0%, rgba(232, 230, 223, 0.015) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))',
            }}
          >
            {reduce ? 'EDITOR' : TYPING_WORDS[wordIndex].substring(0, subIndex)}
          </span>
        </motion.div>
      </div>

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
