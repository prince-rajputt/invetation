import { motion } from 'framer-motion';
import { LotusMark, DividerFlourish } from './Ornaments';

/**
 * Gold divider with a centred lotus, revealing on scroll. Use between
 * sections to keep the page feeling like one continuous story.
 */
export default function SectionDivider({ className = '', tone = 'gold' }) {
  const color = tone === 'ivory' ? 'text-gold-light/80' : 'text-gold';
  return (
    <motion.div
      className={`flex items-center justify-center gap-3 py-2 ${color} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      aria-hidden="true"
    >
      <DividerFlourish className="hidden sm:block opacity-80" width={180} />
      <span className="relative flex items-center justify-center">
        <span className="absolute h-8 w-8 rounded-full bg-gold-light/30 blur-md animate-glow" />
        <LotusMark size={30} className="relative animate-float" />
      </span>
      <DividerFlourish className="hidden sm:block opacity-80 rotate-180" width={180} />
    </motion.div>
  );
}
