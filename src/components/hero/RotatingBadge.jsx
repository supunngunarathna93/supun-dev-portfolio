import { motion, useReducedMotion } from 'framer-motion';

export default function RotatingBadge({ style }) {
  const reduce = useReducedMotion();

  // Circle dimensions for textPath
  // Radius = 38, Center = (50, 50)
  // Circumference = 2 * PI * 38 ≈ 238.7
  const ringText = "• AVAILABLE WORLDWIDE • OPEN FOR PROJECTS ";

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: 110,
        height: 110,
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Outer Rotating Text Ring */}
      <motion.div
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <path
              id="badge-circle"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '8px',
              letterSpacing: '0.18em',
              fill: 'var(--amber, #D4A843)',
              textTransform: 'uppercase',
            }}
          >
            <textPath href="#badge-circle" startOffset="0%">
              {ringText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Static Circle with Pulse Dot */}
      <div
        style={{
          position: 'absolute',
          inset: '22px',
          borderRadius: '50%',
          background: 'rgba(17, 17, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid var(--amber-border, rgba(212,168,67,0.3))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(212, 168, 67, 0.08)',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#5DC28D',
            boxShadow: '0 0 8px rgba(93, 194, 141, 0.8)',
            marginBottom: 3,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '7.5px',
            lineHeight: 1.15,
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: 'var(--bone, #E8E6DF)',
            textTransform: 'uppercase',
          }}
        >
          OPEN<br />2026
        </span>
      </div>
    </div>
  );
}
