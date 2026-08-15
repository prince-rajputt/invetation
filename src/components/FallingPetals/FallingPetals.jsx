import { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useResponsive } from '../../hooks/useResponsive';
import './petals.css';

/**
 * Elegant, occasional falling petals. Pure CSS animation on a fixed number
 * of lightweight DOM nodes (no per-frame JS loop). Count scales with device
 * and is disabled under reduced motion. Petals are marigold / rose / jasmine
 * toned and drift slowly.
 */
const PETAL_COLORS = [
  ['#f3d2ce', '#e5a6a6'], // rose blush
  ['#f7e6c4', '#e7c878'], // marigold gold
  ['#fdf6ec', '#f0e2c8'], // jasmine ivory
  ['#eab8b0', '#c9757c'], // deep rose
];

function Petal({ i, count }) {
  const left = (i / count) * 100 + (Math.random() * 8 - 4);
  const delay = Math.random() * 14;
  const duration = 12 + Math.random() * 12;
  const size = 10 + Math.random() * 12;
  const drift = (Math.random() * 2 - 1) * 60;
  const [c1, c2] = PETAL_COLORS[i % PETAL_COLORS.length];
  const rotate = Math.random() * 360;

  const style = {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size * 1.3}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    '--drift': `${drift}px`,
    '--rot': `${rotate}deg`,
  };

  return (
    <span className="petal" style={style} aria-hidden="true">
      <svg viewBox="0 0 20 26" width="100%" height="100%">
        <defs>
          <linearGradient id={`pg-${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <path
          d="M10 0C4 6 0 12 0 17c0 5 4 9 10 9s10-4 10-9c0-5-4-11-10-17Z"
          fill={`url(#pg-${i})`}
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

export default function FallingPetals({ density = 1 }) {
  const reduced = useReducedMotion();
  const device = useResponsive();

  const count = useMemo(() => {
    const base = device === 'mobile' ? 6 : device === 'tablet' ? 10 : 14;
    return Math.max(3, Math.round(base * density));
  }, [device, density]);

  if (reduced) return null;

  return (
    <div className="petal-layer" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <Petal key={i} i={i} count={count} />
      ))}
    </div>
  );
}
