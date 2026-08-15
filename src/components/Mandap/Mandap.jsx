import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Cinematic full-bleed wedding/mandap section — the emotional centre.
 * Slow zoom, golden light, parallax text.
 */
export default function Mandap() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', reduced ? '-8%' : '8%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['20%', reduced ? '20%' : '-20%']);

  return (
    <section ref={ref} className="relative flex min-h-[95svh] items-center justify-center overflow-hidden bg-ink">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: reduced ? 0 : y }}>
        <img
          src={assets.images.coupleMandap}
          alt="The bride and groom exchanging garlands beneath a flower-laden mandap"
          loading="lazy"
          className={`h-[116%] w-full object-cover object-center ${reduced ? '' : 'animate-slow-zoom'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep/40 via-transparent to-royal-deep/40" />
      </motion.div>

      {/* Golden light shafts */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(231,200,120,0.45) 0%, transparent 55%)',
        }}
      />

      {/* Text */}
      <motion.div className="relative z-10 px-6 text-center" style={{ y: reduced ? 0 : textY }}>
        <div className="space-y-1">
          {wedding.messages.mandapLines.map((line, i) => (
            <motion.p
              key={i}
              className="font-display text-4xl sm:text-6xl md:text-7xl leading-tight text-ivory text-shadow-soft"
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.div
          className="mx-auto mt-8 h-px w-24 bg-gold-light/70"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.p
          className="mt-6 font-script text-xl italic text-gold-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          {wedding.groom.name} &amp; {wedding.bride.name}
        </motion.p>
      </motion.div>
    </section>
  );
}
