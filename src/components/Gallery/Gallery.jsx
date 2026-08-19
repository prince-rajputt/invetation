import { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery } from '../../data/gallery';
import SectionDivider from '../DecorativeElements/SectionDivider';
import Reveal from '../common/Reveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * Horizontal scroll gallery, modelled on motion.dev's "scroll horizontal"
 * example: a tall pinned section whose vertical scroll progress drives a
 * horizontal translateX across the track, so scrolling down pans the
 * gallery sideways.
 */
function HorizontalTrack({ onOpen }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const distance = trackRef.current.scrollWidth - window.innerWidth;
      setScrollRange(distance > 0 ? distance : 0);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${scrollRange}px)` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-4 px-6 will-change-transform sm:gap-6 sm:px-10">
          {gallery.map((item, i) => (
            <button
              key={item.id}
              onClick={() => onOpen(i)}
              className="group relative h-[350px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-gold/30 shadow-soft sm:h-[500px] sm:w-[400px]"
              aria-label={`View ${item.caption}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-maroon/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="font-display text-sm text-gold-light/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-1 font-script text-2xl italic text-ivory">{item.caption}</p>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Touch-native swipeable carousel used on phones/tablets and whenever
 * reduced motion is requested. A scroll-jacked pinned track (HorizontalTrack)
 * fights with vertical touch scrolling and feels janky on mobile browsers,
 * so small screens get a normal horizontally-scrollable, snap-aligned row
 * instead — cards peek at the edges to invite swiping.
 */
function StaticTrack({ onOpen }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    if (!card) return;
    const step = card.offsetWidth + 16; // matches gap-4
    setActive(Math.round(el.scrollLeft / step));
  }, []);

  const scrollToCard = (i) => {
    const el = trackRef.current;
    const card = el?.children[i];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="mt-2">
      <p className="mb-3 text-center font-script text-base italic text-ink/50">
        ← Swipe to explore →
      </p>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[11vw] pb-2"
      >
        {gallery.map((item, i) => (
          <button
            key={item.id}
            onClick={() => onOpen(i)}
            className="group relative aspect-[4/5] w-[78vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-2xl border border-gold/30 shadow-soft active:scale-[0.98] transition-transform"
            aria-label={`View ${item.caption}`}
          >
            <img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-maroon/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <span className="font-display text-xs text-gold-light/80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-1 font-script text-xl italic text-ivory">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {gallery.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? 'w-5 bg-gold' : 'w-1.5 bg-gold/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [index, setIndex] = useState(null); // active lightbox index
  const touchStart = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const useStaticTrack = reduced || isMobile;
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
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Moments &amp; memories</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">Gallery</h2>
          <SectionDivider className="mt-5" />
          <p className="mx-auto mt-3 max-w-lg font-script text-lg italic text-ink/70">
            A glimpse of the love, the tradition and the beauty that awaits.
          </p>
        </Reveal>
      </div>

      {useStaticTrack ? <StaticTrack onOpen={setIndex} /> : <HorizontalTrack onOpen={setIndex} />}

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
