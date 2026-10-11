import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: -200, y: -200 });
  const ring  = useRef({ x: -200, y: -200 });

  const [visible, setVisible]   = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let rafId;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
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
    const onOver  = (e) => {
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

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  const dotSize  = clicking ? 5 : 7;
  const ringSize = hovering ? 46 : clicking ? 26 : 34;

  return (
    <>
      {/* Outer lagging ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: '50%',
          border: `1px solid ${hovering ? 'rgba(212,168,67,0.8)' : 'rgba(212,168,67,0.35)'}`,
          boxShadow: hovering ? '0 0 8px rgba(212,168,67,0.25)' : 'none',
          pointerEvents: 'none',
          zIndex: 'calc(var(--z-cursor) - 1)',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          borderRadius: '50%',
          background: 'var(--amber)',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          opacity: visible ? 1 : 0,
          transition: 'width 0.12s, height 0.12s, margin 0.12s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
