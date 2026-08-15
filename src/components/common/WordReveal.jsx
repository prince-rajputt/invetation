import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Reveals a heading word-by-word on scroll (staggered rise). Falls back to
 * plain text under reduced motion.
 */
export default function WordReveal({ text, className = '', as: Tag = 'h2', delay = 0, amount = 0.5 }) {
  const reduced = useReducedMotion();
  const words = String(text).split(' ');

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  const word = {
    hidden: { opacity: 0, y: '0.5em', filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: '0em',
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // See Reveal.jsx: motion(Tag) must be memoized, not recreated per render.
  const MotionTag = useMemo(() => motion(Tag), [Tag]);
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
