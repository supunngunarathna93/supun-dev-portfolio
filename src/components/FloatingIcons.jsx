import { motion } from 'framer-motion';

// Tool chips config — letter badge, bg color, border color
const ICONS = [
  { id: 'pr',  label: 'Pr',   name: 'Premiere',   bg: 'rgba(0,0,80,0.7)',    border: 'rgba(153,102,255,0.6)', color: '#9966ff' },
  { id: 'ae',  label: 'Ae',   name: 'After Fx',   bg: 'rgba(30,0,80,0.7)',   border: 'rgba(153,102,255,0.6)', color: '#9966ff' },
  { id: 'ps',  label: 'Ps',   name: 'Photoshop',  bg: 'rgba(0,30,80,0.7)',   border: 'rgba(0,170,255,0.6)',   color: '#00aaff' },
  { id: 'lr',  label: 'Lr',   name: 'Lightroom',  bg: 'rgba(0,20,60,0.7)',   border: 'rgba(0,100,200,0.6)',   color: '#0064c8' },
  { id: 'ai',  label: 'Ai',   name: 'Illustrator',bg: 'rgba(60,20,0,0.7)',   border: 'rgba(255,154,0,0.6)',   color: '#ff9a00' },
  { id: 'dv',  label: 'DV',   name: 'DaVinci',    bg: 'rgba(40,5,5,0.7)',    border: 'rgba(230,57,57,0.6)',   color: '#e63939' },
  { id: 'fl',  label: 'Fl',   name: 'Flutter',    bg: 'rgba(0,20,60,0.7)',   border: 'rgba(0,212,255,0.6)',   color: '#00d4ff' },
  { id: 're',  label: 'Re',   name: 'React',      bg: 'rgba(0,40,60,0.7)',   border: 'rgba(97,218,251,0.6)',  color: '#61dafb' },
];

// Positions (x%, y%) relative to the photo container
// Spread around head/shoulders area
const POSITIONS = [
  { x: -18, y: 10  }, // far left upper
  { x: -12, y: 35  }, // left mid
  { x: -20, y: 58  }, // left lower
  { x: 100, y: 8   }, // far right upper
  { x: 96,  y: 30  }, // right mid
  { x: 98,  y: 55  }, // right lower
  { x: 15,  y: -7  }, // top center-left
  { x: 60,  y: -10 }, // top center-right
];

// Each chip floats with its own period and phase
const FLOATS = [
  { duration: 3.8, yAmp: 8,  rotate: 4,  delay: 0    },
  { duration: 4.5, yAmp: 10, rotate: -5, delay: 0.4  },
  { duration: 5.2, yAmp: 7,  rotate: 3,  delay: 0.8  },
  { duration: 3.5, yAmp: 11, rotate: -4, delay: 1.2  },
  { duration: 4.1, yAmp: 9,  rotate: 5,  delay: 0.2  },
  { duration: 5.8, yAmp: 8,  rotate: -3, delay: 0.6  },
  { duration: 4.8, yAmp: 12, rotate: 4,  delay: 1.0  },
  { duration: 3.9, yAmp: 9,  rotate: -6, delay: 1.4  },
];

export default function FloatingIcons({ show = true, isDesktop = true }) {
  // On mobile, show only first 4
  const icons = isDesktop ? ICONS : ICONS.slice(0, 5);

  return (
    <>
      {icons.map((icon, i) => {
        const pos   = POSITIONS[i] || POSITIONS[i % POSITIONS.length];
        const float = FLOATS[i]    || FLOATS[i % FLOATS.length];

        return (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: 0.6 + i * 0.08,
            }}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: 4,
            }}
          >
            <motion.div
              animate={{
                y: [0, -float.yAmp, 0, float.yAmp / 2, 0],
                rotate: [0, float.rotate, 0, -float.rotate / 2, 0],
              }}
              transition={{
                duration: float.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: float.delay,
              }}
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `${icon.bg}`,
                border: `1px solid ${icon.border}`,
                backdropFilter: 'blur(20px) saturate(160%)',
                WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 12px ${icon.border}, inset 0 1px 0 rgba(255,255,255,0.07)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                cursor: 'default',
                willChange: 'transform',
              }}
            >
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 800,
                color: icon.color,
                lineHeight: 1,
                textShadow: `0 0 8px ${icon.color}`,
                letterSpacing: '-0.02em',
              }}>
                {icon.label}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.42rem',
                color: 'rgba(240,238,255,0.45)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}>
                {icon.name}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}
