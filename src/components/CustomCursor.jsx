import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const glowRef  = useRef(null);

  // Track raw mouse position
  const mouse = useRef({ x: -200, y: -200 });
  // Lagging ring position
  const ring  = useRef({ x: -200, y: -200 });

  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let rafId;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Dot & glow snap immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    // Lag ring with requestAnimationFrame
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    // Detect hoverable elements for cursor scale-up
    const onOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], label, input, textarea, select, .cursor-hover');
      setHovering(!!el);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
    };
  }, [visible]);

  // Don't render on touch / mobile devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  const dotSize    = clicking ? 6 : 8;
  const ringSize   = hovering ? 52 : clicking ? 28 : 38;
  const ringOpacity = hovering ? 0.9 : 0.65;
  const ringColor  = hovering ? '#00d4ff' : '#7c5cfc';

  return (
    <>
      {/* ── Spotlight ambient glow (very large, subtle) ── */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 320, height: 320,
          marginLeft: -160, marginTop: -160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.07) 0%, rgba(0,212,255,0.03) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s',
          willChange: 'transform',
        }}
      />

      {/* ── Outer lagging ring ── */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: '50%',
          border: `1.5px solid ${ringColor}`,
          boxShadow: `0 0 10px ${ringColor}60, 0 0 20px ${ringColor}25`,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: visible ? ringOpacity : 0,
          transition: 'width 0.25s, height 0.25s, margin 0.25s, border-color 0.25s, box-shadow 0.25s, opacity 0.4s',
          willChange: 'transform',
          backdropFilter: hovering ? 'blur(0px)' : 'none',
        }}
      />

      {/* ── Dot — snaps to cursor ── */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          borderRadius: '50%',
          background: hovering
            ? 'radial-gradient(circle, #00d4ff, #0080ff)'
            : 'radial-gradient(circle, #ffffff, #7c5cfc)',
          boxShadow: hovering
            ? '0 0 8px #00d4ff, 0 0 14px rgba(0,212,255,0.7)'
            : '0 0 8px #7c5cfc, 0 0 14px rgba(124,92,252,0.7)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'width 0.15s, height 0.15s, margin 0.15s, background 0.25s, box-shadow 0.25s, opacity 0.4s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
