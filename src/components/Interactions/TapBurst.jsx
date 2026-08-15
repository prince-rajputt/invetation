import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Global tap / click / swipe delight. Wherever the user presses (mouse OR
 * touch), a burst of gold sparkles + soft petals radiates out with a ripple
 * ring. Pointer events unify mouse + touch, so it "just works" everywhere.
 *
 * Lightweight: each burst is a handful of nodes that self-remove after ~1s,
 * throttled so rapid swipes don't flood the DOM. Disabled under reduced
 * motion.
 */

let uid = 0;

const SPARKLE_COLORS = ['#e7c878', '#c9a24b', '#f0dca0', '#e5a6a6'];

function Star({ angle, distance, color, size, delay }) {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="absolute left-0 top-0"
      style={{ color }}
      initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
      animate={{
        x,
        y,
        scale: [0, 1, 0.4],
        opacity: [1, 1, 0],
        rotate: 180,
      }}
      transition={{ duration: 0.85, ease: 'easeOut', delay }}
    >
      <path
        d="M12 0l2.2 7.6L22 10l-7.8 2.4L12 24l-2.2-11.6L2 10l7.8-2.4z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

function Petal({ angle, distance, delay }) {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance + 14; // slight gravity
  const colors = [
    ['#f3d2ce', '#e5a6a6'],
    ['#f7e6c4', '#e7c878'],
    ['#fdf6ec', '#f0e2c8'],
  ];
  const [c1, c2] = colors[uid % colors.length];
  return (
    <motion.svg
      width="14"
      height="18"
      viewBox="0 0 20 26"
      className="absolute left-0 top-0"
      initial={{ x: 0, y: 0, scale: 0, opacity: 0.95, rotate: 0 }}
      animate={{ x, y, scale: [0, 1, 0.9], opacity: [0.95, 0.9, 0], rotate: 220 }}
      transition={{ duration: 1, ease: 'easeOut', delay }}
    >
      <defs>
        <linearGradient id={`tb-${uid++}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <path
        d="M10 0C4 6 0 12 0 17c0 5 4 9 10 9s10-4 10-9c0-5-4-11-10-17Z"
        fill={`url(#tb-${uid - 1})`}
      />
    </motion.svg>
  );
}

function Burst({ x, y, onDone }) {
  const stars = 7;
  const petals = 4;
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {/* Ripple ring */}
      <motion.span
        className="absolute -left-1 -top-1 block h-2 w-2 rounded-full border border-gold/70"
        initial={{ scale: 0, opacity: 0.9 }}
        animate={{ scale: 22, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      {/* Soft glow */}
      <motion.span
        className="absolute -left-6 -top-6 block h-12 w-12 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(231,200,120,0.5), transparent 70%)' }}
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      {Array.from({ length: stars }).map((_, i) => (
        <Star
          key={`s${i}`}
          angle={(i / stars) * Math.PI * 2 + Math.random() * 0.4}
          distance={34 + Math.random() * 30}
          color={SPARKLE_COLORS[i % SPARKLE_COLORS.length]}
          size={10 + Math.random() * 10}
          delay={Math.random() * 0.06}
        />
      ))}
      {Array.from({ length: petals }).map((_, i) => (
        <Petal
          key={`p${i}`}
          angle={(i / petals) * Math.PI * 2 + Math.PI / 4}
          distance={26 + Math.random() * 22}
          delay={0.02 + Math.random() * 0.08}
        />
      ))}
      {/* cleanup after the longest particle finishes */}
      <motion.span
        onAnimationComplete={onDone}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.05 }}
      />
    </div>
  );
}

export default function TapBurst() {
  const reduced = useReducedMotion();
  const [bursts, setBursts] = useState([]);
  const lastRef = useRef(0);

  const spawn = useCallback((clientX, clientY) => {
    const now = performance.now();
    if (now - lastRef.current < 70) return; // throttle rapid swipes
    lastRef.current = now;
    const id = ++uid;
    // keep at most ~8 live bursts
    setBursts((b) => [...b.slice(-7), { id, x: clientX, y: clientY }]);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onDown = (e) => {
      const p = e.touches ? e.touches[0] : e;
      if (p) spawn(p.clientX, p.clientY);
    };
    // pointerdown covers mouse + touch + pen in one event
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onDown);
  }, [reduced, spawn]);

  const remove = useCallback(
    (id) => setBursts((b) => b.filter((x) => x.id !== id)),
    []
  );

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[85] overflow-hidden">
      <AnimatePresence>
        {bursts.map((b) => (
          <Burst key={b.id} x={b.x} y={b.y} onDone={() => remove(b.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
