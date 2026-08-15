import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * A soft gold aura that trails the cursor on desktop (fine pointers only).
 * One element, moved via rAF with easing — negligible cost. Skipped on
 * touch devices and under reduced motion.
 */
export default function CursorGlow() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Only for devices with a precise pointer (desktop / trackpad)
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf;
    let visible = false;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = '1';
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = '0';
    };

    const loop = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[40] h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 mix-blend-plus-lighter"
      style={{
        background:
          'radial-gradient(circle, rgba(231,200,120,0.20) 0%, rgba(229,166,166,0.10) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
