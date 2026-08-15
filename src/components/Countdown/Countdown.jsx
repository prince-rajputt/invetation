import { AnimatePresence, motion } from 'framer-motion';
import { wedding } from '../../config/wedding';
import { useCountdown } from '../../hooks/useCountdown';

/** A single flip-in time unit, styled like engraved wedding stationery. */
function Unit({ value, label }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-gold/40 bg-gradient-to-b from-ivory to-ivory-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] sm:h-20 sm:w-20">
        <span className="pointer-events-none absolute inset-1 rounded-lg border border-gold/15" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            className="font-display text-3xl sm:text-4xl text-maroon tabular-nums"
            initial={{ y: '-60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '60%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-gold-deep sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ compact = false }) {
  const { days, hours, minutes, seconds, finished } = useCountdown(wedding.weddingDate);

  if (finished) {
    return (
      <motion.p
        className="font-display text-2xl sm:text-3xl text-gradient-gold"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {wedding.messages.countdownZero}
      </motion.p>
    );
  }

  return (
    <div className={`flex items-start justify-center gap-2 sm:gap-4 ${compact ? '' : 'py-2'}`}>
      <Unit value={days} label="Days" />
      <span className="mt-4 font-display text-2xl text-gold/50 sm:mt-6 sm:text-3xl">:</span>
      <Unit value={hours} label="Hours" />
      <span className="mt-4 font-display text-2xl text-gold/50 sm:mt-6 sm:text-3xl">:</span>
      <Unit value={minutes} label="Minutes" />
      <span className="mt-4 font-display text-2xl text-gold/50 sm:mt-6 sm:text-3xl">:</span>
      <Unit value={seconds} label="Seconds" />
    </div>
  );
}
