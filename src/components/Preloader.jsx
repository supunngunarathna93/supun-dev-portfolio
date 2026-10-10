import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

// ── Session guard ───────────────────────────────────────────────────────────
function shouldShow() {
  try {
    if (sessionStorage.getItem('preloader-shown')) return false;
    sessionStorage.setItem('preloader-shown', '1');
    return true;
  } catch {
    return true;
  }
}

// ── Timecode helpers ─────────────────────────────────────────────────────────
function frameToTC(frame, fps = 25) {
  const totalSec = Math.floor(frame / fps);
  const f  = frame % fps;
  const s  = totalSec % 60;
  const m  = Math.floor(totalSec / 60) % 60;
  const h  = Math.floor(totalSec / 3600);
  return [h, m, s, f].map((n) => String(n).padStart(2, '0')).join(':');
}

// ── ClapperBoard SVG ─────────────────────────────────────────────────────────
function ClapperBoard({ clapOpen, snapFlash }) {
  return (
    <div className="clapper-wrap" style={{ filter: snapFlash ? 'brightness(3)' : 'brightness(1)', transition: 'filter 0.08s' }}>
      <svg
        viewBox="0 0 340 260"
        className="clapper-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad-viol" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c5cfc" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
          <linearGradient id="grad-board-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14142a" />
            <stop offset="100%" stopColor="#0a0a18" />
          </linearGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="stripe-bw" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
            <rect width="8" height="16" fill="#f0eeff" />
            <rect x="8" width="8" height="16" fill="#0a0a18" />
          </pattern>
        </defs>

        {/* Bottom board */}
        <rect x="10" y="80" width="320" height="168" rx="10" fill="url(#grad-board-bg)" stroke="url(#grad-viol)" strokeWidth="1.5" />
        <rect x="10" y="80" width="320" height="5" rx="5" fill="url(#grad-viol)" />

        {/* Dividers */}
        <line x1="10" y1="132" x2="330" y2="132" stroke="rgba(124,92,252,0.3)" strokeWidth="1" />
        <line x1="10" y1="168" x2="330" y2="168" stroke="rgba(124,92,252,0.3)" strokeWidth="1" />
        <line x1="170" y1="132" x2="170" y2="168" stroke="rgba(124,92,252,0.3)" strokeWidth="1" />
        <line x1="170" y1="168" x2="170" y2="210" stroke="rgba(124,92,252,0.3)" strokeWidth="1" />

        {/* PROD */}
        <text x="20" y="100" fill="url(#grad-viol)" fontSize="7.5" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2" fontWeight="700">PROD</text>
        <text x="20" y="115" fill="#f0eeff" fontSize="10" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">SUPUN GUNARATHNA</text>
        <text x="20" y="126" fill="rgba(122,122,154,0.7)" fontSize="7" fontFamily="'Space Grotesk', sans-serif" letterSpacing="1">MULTIMEDIA · DEVELOPER · FILMMAKER</text>

        {/* ROLL */}
        <text x="20" y="148" fill="rgba(122,122,154,0.6)" fontSize="6.5" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2">ROLL</text>
        <text x="20" y="162" fill="#f0eeff" fontSize="11" fontFamily="'Space Grotesk', monospace" fontWeight="700">001</text>

        {/* SCENE */}
        <text x="180" y="148" fill="rgba(122,122,154,0.6)" fontSize="6.5" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2">SCENE</text>
        <text x="180" y="162" fill="#f0eeff" fontSize="11" fontFamily="'Space Grotesk', monospace" fontWeight="700">001A</text>

        {/* TAKE */}
        <text x="20" y="184" fill="rgba(122,122,154,0.6)" fontSize="6.5" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2">TAKE</text>
        <text x="20" y="200" fill="url(#grad-viol)" fontSize="14" fontFamily="'Space Grotesk', monospace" fontWeight="800" filter="url(#glow-filter)">01</text>

        {/* DATE */}
        <text x="180" y="184" fill="rgba(122,122,154,0.6)" fontSize="6.5" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2">DATE</text>
        <text x="180" y="200" fill="#f0eeff" fontSize="9" fontFamily="'Inter', sans-serif">2024 · SRI LANKA</text>

        {/* Signature */}
        <line x1="20" y1="240" x2="320" y2="240" stroke="rgba(124,92,252,0.25)" strokeWidth="1" strokeDasharray="3,3" />
        <text x="20" y="235" fill="rgba(122,122,154,0.5)" fontSize="6" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2">DIRECTOR / DP SIGNATURE</text>

        {/* Hinge */}
        <rect x="10" y="68" width="14" height="18" rx="3" fill="rgba(124,92,252,0.5)" />

        {/* Clapper stick */}
        <g
          style={{
            transformOrigin: '17px 72px',
            transform: `rotate(${clapOpen ? -25 : 0}deg)`,
            transition: clapOpen
              ? 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)'
              : 'transform 0.12s cubic-bezier(0.55,0,1,0.45)',
          }}
        >
          <rect x="10" y="52" width="320" height="28" rx="6" fill="url(#stripe-bw)" />
          <rect x="10" y="52" width="320" height="28" rx="6" fill="url(#grad-viol)" opacity="0.18" />
          <rect x="10" y="52" width="320" height="28" rx="6" fill="none" stroke="url(#grad-viol)" strokeWidth="1.5" />
          <text x="50" y="70" fill="#fff" fontSize="9.5" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" letterSpacing="3">CLAP SLATE</text>
        </g>
      </svg>
    </div>
  );
}

// ── Main Preloader ────────────────────────────────────────────────────────────
export default function Preloader({ onDone }) {
  const [visible, setVisible]     = useState(true);
  const [phase, setPhase]         = useState('intro');
  const [clapOpen, setClapOpen]   = useState(true);
  const [frame, setFrame]         = useState(0);
  const [progress, setProgress]   = useState(0);
  const [snapFlash, setSnapFlash] = useState(false);
  const [shake, setShake]         = useState(false);
  const rafRef  = useRef(null);
  const startRef = useRef(null);

  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (reducedMotion) {
      const t = setTimeout(() => { setVisible(false); onDone?.(); }, 800);
      return () => { clearTimeout(t); document.body.style.overflow = prev; };
    }

    const t0 = setTimeout(() => setPhase('counting'), 400);

    const FPS = 25;
    const COUNT_DURATION = 1600;

    const t1 = setTimeout(() => {
      startRef.current = performance.now();
      const tick = (now) => {
        const elapsed = now - startRef.current;
        const pct = Math.min(elapsed / COUNT_DURATION, 1);
        setFrame(Math.floor(pct * FPS * 2));
        setProgress(Math.floor(pct * 100));
        if (pct < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 400);

    const t2 = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      setProgress(100);
      setPhase('clap');
      setClapOpen(false);
      setTimeout(() => {
        setSnapFlash(true);
        setShake(true);
        setTimeout(() => { setSnapFlash(false); setShake(false); }, 200);
      }, 120);
    }, 2100);

    const t3 = setTimeout(() => {
      setPhase('exit');
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = prev;
        onDone?.();
      }, 650);
    }, 2350);

    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = prev;
    };
  }, []);

  if (!visible) return null;

  const isExit = phase === 'exit';

  return (
    <motion.div
      key="preloader"
      className={`preloader-root${shake ? ' preloader-shake' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: isExit ? '-100%' : 0 }}
      transition={isExit
        ? { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
        : { duration: 0.3 }}
    >
      {snapFlash && <div className="preloader-flash" />}

      <motion.div
        className="preloader-inner"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <ClapperBoard clapOpen={clapOpen} snapFlash={false} />

        <div className="preloader-tc-row">
          <span className="preloader-dot" />
          <span className="preloader-rolling">ROLLING</span>
          <span className="preloader-tc">{frameToTC(frame)}</span>
        </div>

        <div className="preloader-bar-wrap">
          <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
          <span className="preloader-pct">{progress}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
