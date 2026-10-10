import './RotatingBadge.css';

const TEXT = 'OPEN FOR NEW PROJECTS • OPEN FOR NEW PROJECTS • ';
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function RotatingBadge({ style = {} }) {
  // Build letter positions along a circle path using SVG textPath
  return (
    <div className="rotating-badge" style={style}>
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            id="circle-path"
            d={`
              M 45,45
              m -${RADIUS},0
              a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0
              a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0
            `}
          />
          <linearGradient id="badge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c5cfc" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
        <text
          fontSize="6.5"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
          letterSpacing="1.2"
          fill="url(#badge-grad)"
          opacity="0.9"
        >
          <textPath href="#circle-path" startOffset="0%">
            {TEXT}
          </textPath>
        </text>
      </svg>

      {/* Center arrow/dot */}
      <div className="rotating-badge-center">
        <span className="rotating-badge-arrow">↗</span>
      </div>
    </div>
  );
}
