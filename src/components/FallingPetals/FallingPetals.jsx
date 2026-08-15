import { useMemo, useState, useCallback } from 'react';
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
  ['#ffd166', '#f4a300'], // sunflower orange
  ['#f7b2d9', '#e0559c'], // hot pink
  ['#c9a6f7', '#9b5de5'], // orchid purple
  ['#ff9b85', '#e8542a'], // tangerine
  ['#a8e6cf', '#4fb286'], // fresh mint
  ['#ffe0f0', '#ff7aa8'], // candy pink
];

function randomSeed(i, count) {
  return {
    left: (i / count) * 100 + (Math.random() * 8 - 4),
    delay: Math.random() * 14,
    duration: 12 + Math.random() * 12,
    size: 10 + Math.random() * 12,
    drift: (Math.random() * 2 - 1) * 60,
    rotate: Math.random() * 360,
  };
}

function Petal({ i, count }) {
  const [gen, setGen] = useState(0);
  const [popped, setPopped] = useState(false);
  const seed = useMemo(() => randomSeed(i, count), [i, count, gen]);
  const [c1, c2] = PETAL_COLORS[(i + gen) % PETAL_COLORS.length];
  const gid = `pg-${i}-${gen}`;

  const style = {
    left: `${seed.left}%`,
    width: `${seed.size}px`,
    height: `${seed.size * 1.3}px`,
    animationDelay: popped ? '0s' : `${seed.delay}s`,
    animationDuration: popped ? '0.6s' : `${seed.duration}s`,
    '--drift': `${seed.drift}px`,
    '--rot': `${seed.rotate}deg`,
  };

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!popped) setPopped(true);
    },
    [popped]
  );

  // Only the finite "pop" animation fires animationend (the endless fall
  // animation never does), so this safely re-spawns just the popped petal.
  const handleAnimEnd = useCallback(() => {
    if (popped) {
      setPopped(false);
      setGen((g) => g + 1);
    }
  }, [popped]);

  return (
    <span
      className={`petal${popped ? ' petal-pop' : ''}`}
      style={style}
      onClick={handleClick}
      onAnimationEnd={handleAnimEnd}
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 26" width="100%" height="100%">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <path
          d="M10 0C4 6 0 12 0 17c0 5 4 9 10 9s10-4 10-9c0-5-4-11-10-17Z"
          fill={`url(#${gid})`}
          opacity="0.9"
        />
      </svg>
      {popped && (
        <span className="petal-sparks" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, s) => (
            <span
              key={s}
              className="petal-spark"
              style={{ '--sa': `${(s / 6) * 360}deg` }}
            />
          ))}
        </span>
      )}
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
