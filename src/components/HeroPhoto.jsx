import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from './FloatingIcons';
import RotatingBadge from './RotatingBadge';

// Placeholder — drop your file at src/assets/profile.png
import profileImg from '../assets/profile.png';

const PARALLAX_MAX = 15; // px
const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

export default function HeroPhoto({ show = true }) {
  const [mouse, setMouse]         = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);
  const containerRef              = useRef(null);

  // Responsive breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const handler = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mouse parallax (desktop + non-touch only)
  useEffect(() => {
    if (isTouch || !isDesktop) return;
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({
        x: (e.clientX - cx) / cx,  // -1 to 1
        y: (e.clientY - cy) / cy,
      });
    };
    const onLeave = () => setMouse({ x: 0, y: 0 });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [isDesktop]);

  const photoX = mouse.x * PARALLAX_MAX * 0.4;
  const photoY = mouse.y * PARALLAX_MAX * 0.4;
  const iconsX = mouse.x * PARALLAX_MAX;
  const iconsY = mouse.y * PARALLAX_MAX;

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        // Height: fills the hero section right column
        height: isDesktop ? '100%' : 'auto',
        minHeight: isDesktop ? 'clamp(420px, 75vh, 820px)' : 280,
        paddingBottom: isDesktop ? 0 : '1rem',
        overflow: 'visible',
      }}
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {/* ── Radial glow behind photo ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '130%',
          height: '90%',
          background: 'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(124,92,252,0.22) 0%, rgba(0,212,255,0.08) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 1,
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
      />

      {/* ── Halo ring ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 1.0 }}
        style={{
          position: 'absolute',
          bottom: isDesktop ? '10%' : '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isDesktop ? '80%' : '85%',
          aspectRatio: '1',
          borderRadius: '50%',
          border: '1px solid rgba(124,92,252,0.18)',
          boxShadow: '0 0 40px rgba(124,92,252,0.12), inset 0 0 40px rgba(0,212,255,0.06)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Floating icon chips ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          transform: isDesktop && !isTouch
            ? `translate(${iconsX}px, ${iconsY}px)`
            : 'none',
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
        }}
      >
        <FloatingIcons show={show} isDesktop={isDesktop} />
      </motion.div>

      {/* ── Profile photo ── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 3,
          transform: isDesktop && !isTouch
            ? `translate(${photoX}px, ${photoY}px)`
            : 'none',
          transition: 'transform 0.18s ease-out',
          willChange: 'transform',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={show ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
      >
        <motion.img
          src={profileImg}
          alt="Supun N Gunarathna"
          animate={show ? {
            scale: [1, 1.015, 1, 1.015, 1],
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            height: isDesktop
              ? 'clamp(360px, 68vh, 760px)'
              : 'clamp(220px, 55vw, 340px)',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            display: 'block',
            // Gradient mask — blends into dark background at the bottom
            maskImage: 'linear-gradient(to top, transparent 0%, black 22%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 22%)',
            willChange: 'transform',
            userSelect: 'none',
            pointerEvents: 'none',
            maxWidth: isDesktop ? 'none' : '100%',
          }}
        />
      </motion.div>

      {/* ── Rotating badge ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        animate={show ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          bottom: isDesktop ? '14%' : '8%',
          left: isDesktop ? '4%' : '6%',
          zIndex: 6,
        }}
      >
        <RotatingBadge />
      </motion.div>
    </motion.div>
  );
}
