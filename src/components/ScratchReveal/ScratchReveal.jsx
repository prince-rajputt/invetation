import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import Countdown from '../Countdown/Countdown';
import SectionDivider from '../DecorativeElements/SectionDivider';
import { LotusMark } from '../DecorativeElements/Ornaments';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Reveal from '../common/Reveal';

/**
 * Premium gold-foil scratch card. The user drags (mouse or touch) over a
 * canvas painted with a gold foil gradient + ornament; scratching erases it
 * to reveal the countdown underneath. At ~65% cleared it auto-reveals with a
 * sparkle + petal burst.
 *
 * Touch scrolling on the page is preserved everywhere except while actively
 * scratching inside the card.
 */
export default function ScratchReveal() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef(null);
  const revealedRef = useRef(false);
  const lastSampleRef = useRef(0);
  const reduced = useReducedMotion();

  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  const paintFoil = useCallback((canvas) => {
    const ctx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;
    // Gold foil base
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#b98a2f');
    grad.addColorStop(0.25, '#e7c878');
    grad.addColorStop(0.5, '#caa14a');
    grad.addColorStop(0.75, '#f0dca0');
    grad.addColorStop(1, '#a67c28');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Soft brushed-foil streaks
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 40; i++) {
      ctx.strokeStyle = i % 2 ? '#fff6df' : '#8a6420';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const yy = Math.random() * h;
      ctx.moveTo(0, yy);
      ctx.lineTo(w, yy + (Math.random() * 40 - 20));
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Ornamental text prompt
    ctx.fillStyle = 'rgba(92,29,36,0.55)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 15px Mukta, sans-serif';
    ctx.fillText('✦  S C R A T C H   H E R E  ✦', w / 2, h / 2 - 10);
    ctx.font = '400 13px Mukta, sans-serif';
    ctx.fillStyle = 'rgba(92,29,36,0.4)';
    ctx.fillText('drag to unveil the surprise', w / 2, h / 2 + 14);
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Work entirely in device-pixel space; getPos()/scratch() match this.
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    paintFoil(canvas);
  }, [paintFoil]);

  useEffect(() => {
    if (reduced) {
      // No scratch under reduced motion — reveal directly.
      setRevealed(true);
      revealedRef.current = true;
      return;
    }
    setupCanvas();
    const onResize = () => {
      if (!revealedRef.current) setupCanvas();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [reduced, setupCanvas]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const point = e.touches ? e.touches[0] : e;
    return {
      x: (point.clientX - rect.left) * dpr,
      y: (point.clientY - rect.top) * dpr,
    };
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = 32 * dpr;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    if (lastRef.current) {
      ctx.lineWidth = r * 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastRef.current.x, lastRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastRef.current = { x, y };
  };

  const computeProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    // Sample sparsely for performance
    const step = 16;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      total++;
      if (data[i] === 0) clear++;
    }
    return total ? clear / total : 0;
  }, []);

  const maybeReveal = useCallback(
    (force = false) => {
      if (revealedRef.current) return;
      // getImageData is costly; sample at most ~every 120ms while dragging.
      const now = performance.now();
      if (!force && now - lastSampleRef.current < 120) return;
      lastSampleRef.current = now;
      const p = computeProgress();
      setProgress(p);
      if (p >= 0.62) {
        revealedRef.current = true;
        setRevealed(true);
      }
    },
    [computeProgress]
  );

  // Pointer events unify mouse + touch + pen. Combined with
  // `touch-action: none` on the canvas, dragging a finger scratches instead
  // of scrolling the page — which fixes the "acts like a click" bug on phones
  // (React attaches touchmove as a passive listener, so preventDefault there
  // never worked).
  const start = (e) => {
    if (revealedRef.current) return;
    drawingRef.current = true;
    lastRef.current = null;
    // Keep receiving move events even if the finger drifts off the canvas.
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      /* noop */
    }
    const { x, y } = getPos(e);
    scratch(x, y);
    // Sample progress live so a single tap+drag reveals without needing to lift.
    maybeReveal();
  };
  const move = (e) => {
    if (!drawingRef.current || revealedRef.current) return;
    if (e.cancelable) e.preventDefault();
    const { x, y } = getPos(e);
    scratch(x, y);
    maybeReveal();
  };
  const end = (e) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastRef.current = null;
    try {
      e?.currentTarget?.releasePointerCapture?.(e.pointerId);
    } catch {
      /* noop */
    }
    maybeReveal(true);
  };

  return (
    <section className="relative overflow-hidden bg-ivory py-20 sm:py-28">
      {/* faint pattern wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url(${assets.images.patternPaisley})`,
          backgroundSize: '600px',
        }}
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">Just for you</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">
            A Little Surprise Awaits
          </h2>
          <SectionDivider className="mt-5" />
          <p className="mx-auto mt-2 max-w-md font-script text-lg italic text-ink/70">
            Gently scratch the golden foil below to unveil what we are counting
            down to…
          </p>
        </Reveal>

        {/* Scratch card */}
        <Reveal delay={0.15} className="mt-10">
          <div
            ref={wrapRef}
            className="relative mx-auto aspect-[3/2] w-full max-w-md select-none overflow-hidden rounded-3xl border border-gold/50 shadow-soft"
          >
            {/* Revealed content underneath */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-ivory via-ivory to-ivory-deep px-4">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `url(${assets.images.mandalaGold})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'multiply',
                }}
              />
              <p className="relative z-10 text-[0.65rem] uppercase tracking-[0.3em] text-gold-deep">
                Our Wedding Countdown
              </p>
              <div className="relative z-10 scale-[0.82] sm:scale-90">
                <Countdown compact />
              </div>
            </div>

            {/* Foil canvas */}
            {!revealed && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 z-20 h-full w-full cursor-grab touch-none active:cursor-grabbing"
                style={{ touchAction: 'none' }}
                onPointerDown={start}
                onPointerMove={move}
                onPointerUp={end}
                onPointerCancel={end}
                onPointerLeave={end}
              />
            )}

            {/* Reveal flourish */}
            <AnimatePresence>
              {revealed && !reduced && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.4, delay: 0.3 }}
                >
                  {[...Array(10)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-gold"
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0.6],
                        x: Math.cos((i / 10) * Math.PI * 2) * 120,
                        y: Math.sin((i / 10) * Math.PI * 2) * 90,
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                      <Sparkles size={18} />
                    </motion.span>
                  ))}
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1.6, opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1.2 }}
                    className="h-32 w-32 rounded-full bg-gold-light/40 blur-2xl"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* progress hint */}
          {!revealed && !reduced && (
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gold-deep/70">
              <LotusMark size={16} />
              {progress > 0.05
                ? `${Math.round(progress * 100)}% revealed — keep going`
                : 'Scratch with your finger or mouse'}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
