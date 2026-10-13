import { motion, useReducedMotion } from 'framer-motion';
import FloatingTiles from './FloatingTiles';
import RotatingBadge from './RotatingBadge';

export default function HeroPortrait({ mouseOffset }) {
  const reduce = useReducedMotion();

  return (
    <div
      className="hero-portrait-frame"
    >
      {/* ── Cut-out Portrait with organic bottom fade ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 4,
          maskImage: 'linear-gradient(to bottom, black 72%, transparent 99%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 99%)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <picture>
          <source
            srcSet="/hero/supun-cutout-900.webp 900w, /hero/supun-cutout-1600.webp 1600w"
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 560px"
            type="image/webp"
          />
          <img
            src="/hero/supun-cutout.png"
            alt="Supun Gunarathna — Senior Video Editor & Colorist"
            width="1080"
            height="1080"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))',
            }}
          />
        </picture>
      </motion.div>

      {/* ── Floating Software Tiles (Anchored to portrait frame) ── */}
      <FloatingTiles mouseOffset={mouseOffset} />

      {/* ── Circular Rotating Badge (Anchored near top-left of portrait) ── */}
      <RotatingBadge />
    </div>
  );
}
