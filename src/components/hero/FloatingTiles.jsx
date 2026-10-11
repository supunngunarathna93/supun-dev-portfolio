import { motion, useReducedMotion } from 'framer-motion';

const SOFTWARE_TILES = [
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    file: '/logos/davinci-resolve.png',
    alt: 'DaVinci Resolve Studio — Primary Color Grading & Edit Suite',
    // Top-left of portrait
    style: {
      top: '12%',
      left: '-6%',
      width: 'clamp(56px, 6vw, 76px)',
      height: 'clamp(56px, 6vw, 76px)',
    },
    depth: 18,
    floatDuration: 5.4,
    delay: 0.2,
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere Pro',
    file: '/logos/premiere-pro.png',
    alt: 'Adobe Premiere Pro — Long-form & Multicam Broadcast Editing',
    // Top-right of portrait
    style: {
      top: '20%',
      right: '-4%',
      width: 'clamp(52px, 5.5vw, 72px)',
      height: 'clamp(52px, 5.5vw, 72px)',
    },
    depth: 24,
    floatDuration: 6.2,
    delay: 0.35,
  },
  {
    id: 'aftereffects',
    name: 'Adobe After Effects',
    file: '/logos/after-effects.png',
    alt: 'Adobe After Effects — Motion Design & Visual Effects',
    // Bottom-left of portrait
    style: {
      bottom: '22%',
      left: '-10%',
      width: 'clamp(50px, 5.2vw, 68px)',
      height: 'clamp(50px, 5.2vw, 68px)',
    },
    depth: 14,
    floatDuration: 4.8,
    delay: 0.5,
  },
  {
    id: 'claude',
    name: 'Claude AI',
    file: '/logos/claude.png',
    alt: 'Claude AI — Creative Scripting & Workflow Automation',
    // Bottom-right of portrait
    style: {
      bottom: '16%',
      right: '-8%',
      width: 'clamp(46px, 4.8vw, 62px)',
      height: 'clamp(46px, 4.8vw, 62px)',
    },
    depth: 20,
    floatDuration: 5.8,
    delay: 0.65,
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
              animate={reduce ? {} : { y: [0, -8, 0], x: [0, 3, 0] }}
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
                  borderRadius: 'clamp(14px, 1.6vw, 20px)',
                  background: 'rgba(24, 24, 29, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 14px rgba(212, 168, 67, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '18%',
                  transition: 'border-color 0.25s, transform 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--amber, #D4A843)';
                  e.currentTarget.style.transform = 'scale(1.08)';
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
