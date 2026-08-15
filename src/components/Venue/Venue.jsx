import { MapPin, Navigation, CalendarDays, Clock, Compass } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import SectionDivider from '../DecorativeElements/SectionDivider';
import Reveal from '../common/Reveal';

/* ── SVG corner flourish ─────────────────────────────────── */
function CornerFlourish({ className = '' }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 44 C4 20, 20 4, 44 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8 44 C8 26, 26 8, 44 8"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="44" cy="4" r="2.2" fill="currentColor" opacity="0.7" />
      <circle cx="4" cy="44" r="2.2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export default function Venue() {
  const { venue } = wedding;

  return (
    <section id="venue" className="relative overflow-hidden bg-ivory py-20 sm:py-28">
      {/* Subtle paper texture */}
      <div className="paper-veil absolute inset-0" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Where forever begins</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">The Venue</h2>
          <SectionDivider className="mt-5" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Image */}
          <Reveal y={40} className="relative">
            <div className="pointer-events-none absolute -inset-2 rounded-[1.6rem] border border-gold/25" />
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-gold/40 shadow-soft">
              <img
                src={assets.images.venueArch}
                alt={`${venue.name}, a garland-decked palace archway`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/30 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* Details */}
          <Reveal y={40} delay={0.12} className="text-center md:text-left">
            <h3 className="font-display text-3xl text-maroon">{venue.name}</h3>
            <p className="mt-1 font-script text-xl italic text-gold-deep">{venue.city}</p>

            <div className="mt-6 space-y-3 text-ink/75">
              <p className="flex items-start justify-center gap-3 md:justify-start">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                <span>
                  {wedding.weddingDayLabel}, {wedding.weddingDateLabel}
                </span>
              </p>
              <p className="flex items-start justify-center gap-3 md:justify-start">
                <Clock size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                <span>{venue.time}</span>
              </p>
              <p className="flex items-start justify-center gap-3 md:justify-start">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                <span className="max-w-xs">{venue.address}</span>
              </p>
            </div>

            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-8"
            >
              <Navigation size={16} />
              Open in Google Maps
            </a>
          </Reveal>
        </div>

        {/* ── Luxurious Map Section ──────────────────────────── */}
        <Reveal y={40} delay={0.1} className="mt-16">
          {/* Map header badge */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="gold-hairline flex-1 max-w-[100px]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ivory-200/80 px-5 py-2 text-xs uppercase tracking-[0.25em] text-gold-deep backdrop-blur-sm">
              <Compass size={14} className="animate-spin-slow" />
              Find Us Here
            </span>
            <span className="gold-hairline flex-1 max-w-[100px]" />
          </div>

          {/* Ornamental map frame */}
          <div className="venue-map-wrapper relative">
            {/* Outer decorative border */}
            <div
              className="pointer-events-none absolute -inset-3 rounded-[1.8rem]"
              style={{
                border: '1px solid rgba(201, 162, 75, 0.2)',
                background:
                  'linear-gradient(135deg, rgba(201,162,75,0.05) 0%, transparent 40%, transparent 60%, rgba(201,162,75,0.05) 100%)',
              }}
            />

            {/* Inner gold border */}
            <div className="pointer-events-none absolute -inset-1.5 rounded-[1.6rem] border border-gold/30" />

            {/* Corner flourishes */}
            <CornerFlourish className="pointer-events-none absolute -left-1 -top-1 text-gold/50" />
            <CornerFlourish className="pointer-events-none absolute -right-1 -top-1 rotate-90 text-gold/50" />
            <CornerFlourish className="pointer-events-none absolute -bottom-1 -left-1 -rotate-90 text-gold/50" />
            <CornerFlourish className="pointer-events-none absolute -bottom-1 -right-1 rotate-180 text-gold/50" />

            {/* Map container */}
            <div
              className="relative overflow-hidden rounded-[1.4rem] shadow-soft"
              style={{
                border: '2px solid rgba(201, 162, 75, 0.45)',
                boxShadow:
                  '0 20px 60px -20px rgba(58,42,34,0.25), inset 0 0 60px rgba(201,162,75,0.06)',
              }}
            >
              {/* Top gradient veil for blending */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(251,246,236,0.5), transparent)',
                }}
              />

              {/* Bottom gradient veil with venue name */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pb-4"
                style={{
                  height: '80px',
                  background:
                    'linear-gradient(to top, rgba(58,42,34,0.65), rgba(58,42,34,0.25) 60%, transparent)',
                }}
              >
                <span className="font-display text-sm tracking-widest2 text-ivory/90 sm:text-base">
                  {venue.name} — {venue.city}
                </span>
              </div>

              {/* The actual map iframe */}
              <iframe
                title={`Map to ${venue.name}`}
                src={venue.mapsEmbedUrl}
                className="venue-map-iframe h-[320px] w-full sm:h-[440px]"
                style={{
                  border: 0,
                  filter:
                    'sepia(0.25) saturate(0.9) brightness(1.02) hue-rotate(-5deg)',
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Floating "Get Directions" pill */}
            <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs shadow-gold"
                style={{ padding: '0.65rem 1.8rem' }}
              >
                <Navigation size={14} />
                Get Directions
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
