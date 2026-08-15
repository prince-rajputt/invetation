import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery } from '../../data/gallery';
import SectionDivider from '../DecorativeElements/SectionDivider';
import Reveal from '../common/Reveal';

const SPAN = {
  wide: 'sm:col-span-2',
  tall: 'row-span-2',
  normal: '',
};

export default function Gallery() {
  const [index, setIndex] = useState(null); // active lightbox index
  const touchStart = useRef(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % gallery.length)),
    []
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    []
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, next, prev]);

  // Touch swipe
  const onTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
    touchStart.current = null;
  };

  const active = open ? gallery[index] : null;

  return (
    <section id="gallery" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Moments &amp; memories</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">Gallery</h2>
          <SectionDivider className="mt-5" />
          <p className="mx-auto mt-3 max-w-lg font-script text-lg italic text-ink/70">
            A glimpse of the love, the tradition and the beauty that awaits.
          </p>
        </Reveal>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 sm:gap-4">
          {gallery.map((item, i) => (
            <Reveal
              as="button"
              key={item.id}
              y={30}
              delay={(i % 3) * 0.05}
              amount={0.2}
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden rounded-2xl border border-gold/30 shadow-soft ${SPAN[item.span] || ''}`}
              aria-label={`View ${item.caption}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 translate-y-2 font-script text-lg italic text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition hover:bg-white/10"
              aria-label="Close gallery"
            >
              <X size={22} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition hover:bg-white/10 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition hover:bg-white/10 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight size={26} />
            </button>

            <motion.figure
              key={active.id}
              className="relative mx-4 max-h-[82vh] max-w-4xl"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[78vh] w-auto rounded-xl border border-gold/30 object-contain"
              />
              <figcaption className="mt-3 text-center font-script text-xl italic text-gold-light">
                {active.caption}
                <span className="ml-3 text-sm not-italic text-ivory/50">
                  {index + 1} / {gallery.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
