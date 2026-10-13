import { motion, useReducedMotion } from 'framer-motion';

const SOFTWARE_TILES = [
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    file: '/logos/davinci-resolve.png',
    alt: 'DaVinci Resolve Studio — Color Grading & Post-Production',
    // Top-left
    style: {
      top: '18%',
      left: '-9%',
      width: 'clamp(46px, 5vw, 66px)',
      height: 'clamp(46px, 5vw, 66px)',
    },
    depth: 18,
    floatDuration: 5.4,
    delay: 0.15,
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    file: '/logos/photoshop.png',
    alt: 'Adobe Photoshop — Graphic Design & Thumbnails',
    // Mid-left
    style: {
      top: '44%',
      left: '-12%',
      width: 'clamp(44px, 4.8vw, 62px)',
      height: 'clamp(44px, 4.8vw, 62px)',
    },
    depth: 15,
    floatDuration: 4.9,
    delay: 0.3,
  },
  {
    id: 'aftereffects',
    name: 'Adobe After Effects',
    file: '/logos/after-effects.png',
    alt: 'Adobe After Effects — Motion Design & Visual Effects',
    // Bottom-left
    style: {
      bottom: '16%',
      left: '-8%',
      width: 'clamp(46px, 5vw, 64px)',
      height: 'clamp(46px, 5vw, 64px)',
    },
    depth: 16,
    floatDuration: 5.2,
    delay: 0.45,
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere Pro',
    file: '/logos/premiere-pro.png',
    alt: 'Adobe Premiere Pro — Long-form & Multicam Broadcast Editing',
    // Top-right
    style: {
      top: '10%',
      right: '-6%',
      width: 'clamp(48px, 5.2vw, 68px)',
      height: 'clamp(48px, 5.2vw, 68px)',
    },
    depth: 22,
    floatDuration: 6.2,
    delay: 0.2,
  },
  {
    id: 'capcut',
    name: 'CapCut',
    file: '/logos/capcut.png',
    alt: 'CapCut — Short-form & Viral Social Video Editing',
    // Mid-right
    style: {
      top: '34%',
      right: '-11%',
      width: 'clamp(46px, 5vw, 64px)',
      height: 'clamp(46px, 5vw, 64px)',
    },
    depth: 20,
    floatDuration: 5.8,
    delay: 0.38,
  },
  {
    id: 'figma',
    name: 'Figma',
    file: '/logos/figma.png',
    alt: 'Figma — Visual Layout & UI/UX Design',
    // Lower-right
    style: {
      top: '56%',
      right: '-8%',
      width: 'clamp(44px, 4.8vw, 62px)',
      height: 'clamp(44px, 4.8vw, 62px)',
    },
    depth: 17,
    floatDuration: 6.5,
    delay: 0.55,
  },
  {
    id: 'claude',
    name: 'Claude AI',
    file: '/logos/claude.png',
    alt: 'Claude AI — Creative Scripting & Workflow Automation',
    // Bottom-right
    style: {
      bottom: '14%',
      right: '-11%',
      width: 'clamp(42px, 4.5vw, 58px)',
      height: 'clamp(42px, 4.5vw, 58px)',
    },
    depth: 19,
    floatDuration: 4.8,
    delay: 0.7,
  },
];

export default function FloatingTiles({ mouseOffset = { x: 0, y: 0 } }) {
  const reduce = useReducedMotion();

  return (
    <>
      {SOFTWARE_TILES.map((tile) => {
        // Subtle depth parallax
        const px = reduce ? 0 : mouseOffset.x * tile.depth;
        const py = reduce ? 0 : mouseOffset.y * tile.depth;

        return (
          <motion.div
            key={tile.id}
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.55,
              delay: tile.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              zIndex: 10,
              userSelect: 'none',
              ...tile.style,
            }}
          >
            {/* Bobbing Motion Container */}
            <motion.div
              animate={reduce ? {} : { y: [0, -7, 0], x: [0, 2.5, 0] }}
              transition={{
                duration: tile.floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: '100%',
                height: '100%',
                transform: `translate3d(${px}px, ${py}px, 0)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* Tile Body: Uniform glassmorphic rounded-square container */}
              <div
                title={tile.name}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 'clamp(12px, 1.4vw, 18px)',
                  background: 'rgba(24, 24, 29, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 14px rgba(212, 168, 67, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16%',
                  transition: 'border-color 0.25s, transform 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--amber, #D4A843)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={tile.file}
                  alt={tile.alt}
                  width="256"
                  height="256"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}
