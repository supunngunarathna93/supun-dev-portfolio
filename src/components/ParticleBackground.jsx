import { useEffect, useRef } from 'react';

const PARTICLE_COUNT  = 110;
const CONNECTION_DIST = 130;
const MOUSE_REPEL     = 110;   // px radius where mouse pushes particles
const BASE_SPEED      = 0.28;

// Accent colours matching the portfolio palette
const COLORS = [
  { r: 124, g: 92,  b: 252 }, // violet
  { r: 0,   g: 212, b: 255 }, // cyan
  { r: 224, g: 64,  b: 251 }, // magenta
  { r: 255, g: 255, b: 255 }, // white
];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function createParticle(w, h) {
  const c = randomColor();
  return {
    x:  Math.random() * w,
    y:  Math.random() * h,
    vx: (Math.random() - 0.5) * BASE_SPEED * 2,
    vy: (Math.random() - 0.5) * BASE_SPEED * 2,
    r:  Math.random() * 1.4 + 0.5,   // radius 0.5–1.9 px
    alpha: Math.random() * 0.5 + 0.25,
    pulse: Math.random() * Math.PI * 2, // phase offset for breathing
    pulseSpeed: Math.random() * 0.012 + 0.006,
    color: c,
  };
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const particles = useRef([]);
  const rafId     = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    // Resize handler
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-scatter particles on resize
      particles.current = Array.from(
        { length: PARTICLE_COUNT },
        () => createParticle(canvas.width, canvas.height)
      );
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()  => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    // ── Main animation loop ──
    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const ps = particles.current;

      // Update + draw each particle
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL && dist > 0) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL;
          p.vx += (dx / dist) * force * 0.35;
          p.vy += (dy / dist) * force * 0.35;
        }

        // Friction to prevent runaway speed
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = BASE_SPEED * 5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Pulse breathing
        p.pulse += p.pulseSpeed;
        const breathe = 0.6 + 0.4 * Math.sin(p.pulse);
        const alpha   = p.alpha * breathe;

        // Draw dot
        const { r: cr, g: cg, b: cb } = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * breathe, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();

        // Tiny glow halo on larger particles
        if (p.r > 1.1) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          grad.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha * 0.35})`);
          grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Draw connection lines to nearby particles
        for (let j = i + 1; j < ps.length; j++) {
          const q  = ps[j];
          const ex = p.x - q.x;
          const ey = p.y - q.y;
          const d  = Math.sqrt(ex * ex + ey * ey);

          if (d < CONNECTION_DIST) {
            const t = 1 - d / CONNECTION_DIST;        // 0→1 as closer
            const lineAlpha = t * t * 0.25;           // quadratic fade

            // Blend colour between the two particle colours
            const mr = (p.color.r + q.color.r) / 2;
            const mg = (p.color.g + q.color.g) / 2;
            const mb = (p.color.b + q.color.b) / 2;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${mr},${mg},${mb},${lineAlpha})`;
            ctx.lineWidth   = t * 0.8;
            ctx.stroke();
          }
        }
      }

      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',   // never blocks clicks
        zIndex: 0,
        opacity: 0.75,
      }}
    />
  );
}
