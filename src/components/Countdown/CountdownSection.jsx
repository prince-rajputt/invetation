import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import Countdown from './Countdown';
import SectionDivider from '../DecorativeElements/SectionDivider';
import Reveal from '../common/Reveal';

/** Full countdown section — restated prominently as luxury stationery. */
export default function CountdownSection() {
  return (
    <section id="countdown" className="relative overflow-hidden py-20 sm:py-28">
      {/* Rotating mandala behind the numbers */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src={assets.images.mandalaGold}
          alt=""
          aria-hidden="true"
          className="w-[130vw] max-w-3xl opacity-[0.12] animate-spin-slow"
        />
      </div>
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">Counting every moment</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">
            Until We Say Forever
          </h2>
          <SectionDivider className="mt-5" />
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <Countdown />
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-8 font-script text-xl italic text-ink/70">
            {wedding.weddingDayLabel}, {wedding.weddingDateLabel} · {wedding.venue.name}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
