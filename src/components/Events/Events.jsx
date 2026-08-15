import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Sun, Flower2, Music, Heart, Sparkles, MapPin, Clock, CalendarDays } from 'lucide-react';
import { events } from '../../data/events';
import { assets } from '../../data/assets';
import SectionDivider from '../DecorativeElements/SectionDivider';
import Reveal from '../common/Reveal';

const ICONS = { sun: Sun, flower: Flower2, music: Music, heart: Heart, sparkles: Sparkles };

const ACCENTS = {
  gold: { ring: 'border-gold/50', chip: 'bg-gold/15 text-gold-deep', dot: 'text-gold' },
  sage: { ring: 'border-sage/50', chip: 'bg-sage/15 text-sage-deep', dot: 'text-sage' },
  royal: { ring: 'border-royal/40', chip: 'bg-royal/10 text-royal', dot: 'text-royal' },
  maroon: { ring: 'border-maroon/40', chip: 'bg-maroon/10 text-maroon', dot: 'text-maroon' },
  blush: { ring: 'border-blush/60', chip: 'bg-blush/20 text-blush-deep', dot: 'text-blush-deep' },
};

function EventCard({ event, index }) {
  const Icon = ICONS[event.icon] || Sparkles;
  const a = ACCENTS[event.accent] || ACCENTS.gold;
  const alt = index % 2 === 1;

  return (
    <Reveal
      y={30}
      delay={(index % 2) * 0.08}
      className={`group relative ml-12 overflow-hidden rounded-2xl border bg-ivory/70 backdrop-blur-sm shadow-soft transition-transform duration-500 hover:-translate-y-1 sm:ml-16 sm:rounded-3xl ${a.ring}`}
    >
      {/* Accent glow on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-light/10 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

      <div className={`flex items-center gap-3 p-3.5 sm:gap-5 sm:p-7 ${alt ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
        {/* Icon medallion */}
        <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border sm:h-16 sm:w-16 ${a.ring} bg-ivory`}>
          <span className={`absolute inset-1 rounded-full border border-dashed ${a.ring} opacity-40`} />
          <Icon className={a.dot} size={20} strokeWidth={1.5} />
        </div>

        {/* Body */}
        <div className={`min-w-0 flex-1 ${alt ? 'sm:text-right' : ''}`}>
          <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${alt ? 'sm:justify-end' : ''}`}>
            <h3 className="font-display text-xl leading-tight text-maroon tracking-wide sm:text-2xl">{event.name}</h3>
            <p className="font-script text-base italic text-gold-deep sm:text-lg">{event.tagline}</p>
          </div>

          {/* Full description only on larger screens to keep mobile compact */}
          <p className="mt-2 hidden text-sm leading-relaxed text-ink/70 sm:block">{event.description}</p>

          {/* Compact meta line — small pills, tighter on mobile */}
          <div className={`mt-1.5 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2 ${alt ? 'sm:justify-end' : ''}`}>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs ${a.chip}`}>
              <CalendarDays size={12} className="shrink-0" /> {event.date}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs ${a.chip}`}>
              <Clock size={12} className="shrink-0" /> {event.time}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs ${a.chip}`}>
              <MapPin size={12} className="shrink-0" /> {event.location}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Events() {
  const lineRef = useRef(null);
  // Track scroll through the events timeline so the violet line "draws" downward.
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.8', 'end 0.55'],
  });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const dotTop = useTransform(grow, [0, 1], ['0%', '100%']);
  const dotOpacity = useTransform(grow, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section id="events" className="relative overflow-hidden py-12 sm:py-28">
      {/* Warm diyas backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={assets.images.diyasLotus}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/85 to-ivory" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Five days of celebration</p>
          <h2 className="mt-2 font-display text-3xl text-maroon sm:mt-3 sm:text-5xl">Wedding Events</h2>
          <SectionDivider className="mt-3 sm:mt-5" />
          <p className="mx-auto mt-2 hidden max-w-lg font-script text-lg italic text-ink/70 sm:mt-3 sm:block">
            From the golden warmth of Haldi to the grandeur of the Reception —
            we would be honoured by your presence at each.
          </p>
        </Reveal>

        <div ref={lineRef} className="relative mt-6 sm:mt-14">
          {/* Faint base rail (violet) */}
          <div className="absolute left-6 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-violet/25 to-transparent sm:left-8" />
          {/* Animated violet line that draws downward as you scroll */}
          <motion.div
            className="absolute left-6 top-0 h-full w-[2px] origin-top -translate-x-1/2 rounded-full sm:left-8"
            style={{
              scaleY: grow,
              background: 'linear-gradient(to bottom, #C7ACDA 0%, #8E6BA8 45%, #5B3E73 100%)',
              boxShadow: '0 0 10px rgba(142,107,168,0.6)',
            }}
          />
          {/* Glowing leading dot that travels down the line */}
          <motion.span
            className="absolute left-6 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-white/70 bg-violet sm:left-8"
            style={{
              top: dotTop,
              opacity: dotOpacity,
              marginTop: '-7px',
              boxShadow: '0 0 14px 4px rgba(142,107,168,0.75)',
            }}
          />

          <motion.div className="space-y-3 sm:space-y-6">
            {events.map((event, i) => (
              <div key={event.id} className="relative">
                {/* Connector dot marking this event on the line */}
                <span className="absolute left-6 top-8 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet bg-ivory shadow-[0_0_10px_rgba(142,107,168,0.55)] sm:left-8" />
                <EventCard event={event} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
