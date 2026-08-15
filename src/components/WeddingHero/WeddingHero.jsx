import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import { LotusMark, CornerBracket, DividerFlourish } from '../DecorativeElements/Ornaments';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Hero / invitation reveal. A hand-drawn golden mandala backdrop (SVG) is the
 * hero — softly zooming behind a framed, glass-morphic invitation card so the
 * couple's names lead. Typography is restrained and devotional.
 */
export default function WeddingHero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const ease = [0.22, 1, 0.36, 1];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Backdrop artwork */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={assets.images.heroBackdrop}
          alt="A golden mandala framed by a sacred toran arch, lotus blooms and floating petals"
          className={`h-full w-full object-cover object-center ${reduced ? '' : 'animate-slow-zoom'}`}
          fetchpriority="high"
        />
        {/* Focal ivory vignette so the framed card lifts off the mandala */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 48% at 50% 46%, rgba(251,246,236,0.55) 0%, rgba(251,246,236,0.12) 45%, transparent 70%)',
          }}
        />
        {/* Blend the base into the page below */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ivory to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-5 text-center"
        style={{ y: textY, opacity: fade }}
      >
        {/* Sanskrit invocation */}
        <motion.p
          className="font-script text-lg text-maroon/85"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1, ease }}
        >
          {wedding.messages.hindiBlessing}
        </motion.p>

        {/* Framed invitation card */}
        <motion.div
          className="relative mt-6 w-full max-w-md rounded-[2.25rem] border border-gold/35 bg-ivory/45 px-8 py-11 shadow-soft backdrop-blur-md sm:max-w-lg sm:px-14 sm:py-12"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.1, ease }}
        >
          {/* Corner brackets */}
          <CornerBracket className="absolute -left-2 -top-2 text-gold/70" size={64} />
          <CornerBracket className="absolute -right-2 -top-2 -scale-x-100 text-gold/70" size={64} />
          <CornerBracket className="absolute -bottom-2 -left-2 -scale-y-100 text-gold/70" size={64} />
          <CornerBracket className="absolute -bottom-2 -right-2 -scale-100 text-gold/70" size={64} />

          <p className="eyebrow text-gold-deep">Together with our families</p>
          <p className="mt-3 font-script text-base italic text-ink/75 sm:text-lg">
            {wedding.messages.inviteLine}
          </p>

          {/* Names */}
          <div className="my-5 flex flex-col items-center">
            <h1 className="font-display text-6xl leading-none text-gradient-gold text-shadow-soft sm:text-7xl">
              {wedding.groom.name}
            </h1>
            <div className="my-3 flex items-center gap-3 text-gold">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="font-script text-3xl italic text-maroon">&amp;</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <h1 className="font-display text-6xl leading-none text-gradient-gold text-shadow-soft sm:text-7xl">
              {wedding.bride.name}
            </h1>
          </div>

          <DividerFlourish className="mx-auto text-gold/70" width={190} />

          {/* Date + venue */}
          <div className="mt-5 flex flex-col items-center gap-1.5">
            <span className="flex items-center gap-2.5 text-sm uppercase tracking-[0.28em] text-maroon">
              <LotusMark size={16} className="text-gold" />
              {wedding.weddingDayLabel}, {wedding.weddingDateLabel}
              <LotusMark size={16} className="text-gold" />
            </span>
            <span className="font-script text-base text-ink/70 sm:text-lg">
              {wedding.venue.name} · {wedding.venue.city}
            </span>
          </div>

          {/* Vendor credit */}
          <motion.div
            className="mx-auto mt-6 flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease }}
          >
            <span className="h-px w-10 bg-gold/30" />
            <p className="text-[9px] uppercase tracking-[0.25em] text-ink/45 sm:text-[10px]">
              Planned by
            </p>
            <div className="rounded-full border border-gold/25 bg-ivory/80 px-3 py-1 shadow-gold backdrop-blur-sm">
              <img src={assets.images.logo} alt="Fab Eventz logo" className="h-7 w-auto sm:h-8" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold-deep"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
      >
        <span className="flex flex-col items-center gap-1 text-[0.65rem] uppercase tracking-[0.3em]">
          Scroll
          <ChevronDown size={16} className={reduced ? '' : 'animate-bounce'} />
        </span>
      </motion.div>
    </section>
  );
}
