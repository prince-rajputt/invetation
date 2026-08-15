import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import SectionDivider from '../DecorativeElements/SectionDivider';
import { LotusMark } from '../DecorativeElements/Ornaments';
import Reveal from '../common/Reveal';

function SideCard({ side, delay }) {
  return (
    <Reveal y={36} delay={delay} className="text-center">
      <div className="rounded-3xl border border-gold/25 bg-ivory/70 p-8 shadow-soft backdrop-blur-sm">
        <p className="eyebrow text-gold-deep">{side.title}</p>
        <div className="mx-auto my-4 flex justify-center text-gold">
          <LotusMark size={26} />
        </div>
        <ul className="space-y-2">
          {side.members.map((m, i) => (
            <li
              key={i}
              className={`font-script leading-snug text-ink/80 ${
                i === 0 ? 'text-xl text-maroon' : 'text-lg'
              }`}
            >
              {m}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Family() {
  return (
    <section id="family" className="relative overflow-hidden py-20 sm:py-28">
      {/* Kalash watermark */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <img
          src={assets.images.kalash}
          alt=""
          aria-hidden="true"
          className="w-full max-w-3xl object-cover opacity-[0.10]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">With the blessings of</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">Our Families</h2>
          <SectionDivider className="mt-5" />
          <p className="mx-auto mt-3 max-w-lg font-script text-lg italic text-ink/70">
            Two families united in love and gratitude, joyfully invite you to
            share in this celebration.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SideCard side={wedding.family.groomSide} delay={0} />
          <SideCard side={wedding.family.brideSide} delay={0.12} />
        </div>
      </div>
    </section>
  );
}
