import { Heart } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import { LotusMark } from '../DecorativeElements/Ornaments';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-deep text-ivory">
      {/* Floral top border */}
      <div
        className="h-24 w-full opacity-30"
        style={{
          backgroundImage: `url(${assets.images.floralBouquet})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-x',
          filter: 'saturate(0.85)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-4 text-center">
        <div className="flex justify-center text-gold-light">
          <LotusMark size={32} />
        </div>
        <h3 className="mt-4 font-display text-3xl text-gold-light">
          {wedding.groom.name} &amp; {wedding.bride.name}
        </h3>
        <p className="mt-2 font-script text-lg italic text-ivory/70">
          {wedding.messages.finalTagline}
        </p>

        <div className="mx-auto my-6 h-px w-40 bg-gold-light/30" />

        <p className="text-sm text-ivory/60">
          {wedding.weddingDayLabel}, {wedding.weddingDateLabel}
        </p>
        <p className="text-sm text-ivory/60">
          {wedding.venue.name}, {wedding.venue.city}
        </p>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ivory/45">
          Made with <Heart size={12} className="text-blush" fill="currentColor" /> for our loved ones
        </p>
        <p className="mt-1 text-xs text-ivory/35">{wedding.contact.hashtag}</p>

        <div className="mx-auto mt-8 flex flex-col items-center gap-2 opacity-80">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/40">Planned by</p>
          <div className="rounded-lg bg-ivory/90 px-3 py-1.5">
            <img src={assets.images.logo} alt="Fab Eventz logo" className="h-9 w-auto" loading="lazy" />
          </div>
        </div>
      </div>
    </footer>
  );
}
