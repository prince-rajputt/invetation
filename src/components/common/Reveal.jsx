import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Scroll-triggered reveal. Fades + rises into place once. Respects
 * reduced motion (renders immediately, no transform).
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 32,
  className = '',
  amount = 0.3,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion(Tag);

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
