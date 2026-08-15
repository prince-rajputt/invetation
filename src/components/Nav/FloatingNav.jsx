import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LotusMark } from '../DecorativeElements/Ornaments';

const LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'Our Story', id: 'story' },
  { label: 'Events', id: 'events' },
  { label: 'Venue', id: 'venue' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'RSVP', id: 'rsvp' },
];

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Reveal the menu button only after the user has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <AnimatePresence>
        {visible && !open && (
          <motion.button
            onClick={() => setOpen(true)}
            className="fixed top-4 right-4 sm:top-6 sm:right-7 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-gold/40 bg-ivory/80 text-maroon shadow-gold backdrop-blur-md"
            aria-label="Open menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={22} strokeWidth={1.6} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-maroon-deep/95 via-maroon/95 to-royal-deep/95 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, #e7c878 0%, transparent 60%)',
              }}
            />

            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 sm:top-7 sm:right-8 flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/40 text-ivory"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <motion.nav
              className="relative flex flex-col items-center gap-1"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            >
              <LotusMark className="mb-6 text-gold-light" size={40} />
              {LINKS.map((l) => (
                <motion.button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="group px-8 py-2 font-display text-3xl sm:text-4xl text-ivory/90 transition-colors hover:text-gold-light"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {l.label}
                  <span className="mx-auto mt-1 block h-px w-0 bg-gold-light transition-all duration-500 group-hover:w-full" />
                </motion.button>
              ))}
              <motion.p
                className="mt-8 font-script text-lg italic text-gold-light/80"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                Prince &amp; Priya
              </motion.p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
