import { motion } from 'framer-motion';
import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import SectionDivider from '../DecorativeElements/SectionDivider';
import { CornerBracket, LotusMark } from '../DecorativeElements/Ornaments';
import Reveal from '../common/Reveal';
import TiltCard from '../Interactions/TiltCard';

/** Framed portrait card with floral gold corners and soft zoom on hover. */
function PersonCard({ person, image, imageAlt, flip }) {
  return (
    <Reveal
      className="group relative flex flex-col items-center"
      y={40}
      delay={flip ? 0.15 : 0}
    >
      {/* Framed image */}
      <div className="relative mx-auto w-full max-w-[19rem]">
        <div className="pointer-events-none absolute -inset-2 rounded-[1.6rem] border border-gold/30" />
        <CornerBracket className="pointer-events-none absolute -left-2.5 -top-2.5 h-9 w-9 text-gold sm:h-[54px] sm:w-[54px]" size={54} />
        <CornerBracket
          className="pointer-events-none absolute -right-2.5 -top-2.5 h-9 w-9 scale-x-[-1] text-gold sm:h-[54px] sm:w-[54px]"
          size={54}
        />
        <CornerBracket
          className="pointer-events-none absolute -bottom-2.5 -left-2.5 h-9 w-9 scale-y-[-1] text-gold sm:h-[54px] sm:w-[54px]"
          size={54}
        />
        <CornerBracket
          className="pointer-events-none absolute -bottom-2.5 -right-2.5 h-9 w-9 scale-[-1] text-gold sm:h-[54px] sm:w-[54px]"
          size={54}
        />
        <TiltCard
          className="aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-gold/40 shadow-soft"
          max={5}
        >
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/25 via-transparent to-transparent" />
        </TiltCard>
      </div>

      {/* Text */}
      <div className="mt-4 text-center sm:mt-6">
        <h3 className="mt-1 font-display text-2xl text-maroon sm:text-4xl">{person.name}</h3>
        <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-gold-deep/90 sm:mt-2 sm:text-sm sm:tracking-[0.22em]">
          {person.profession}
        </p>
      </div>
    </Reveal>
  );
}

export default function Couple() {
  return (
    <section id="couple" className="relative overflow-hidden bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">The Beloved</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">
            The Bride &amp; Groom
          </h2>
          <SectionDivider className="mt-5" />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 items-start gap-x-5 gap-y-10 sm:mt-14 md:gap-10">
          <PersonCard
            person={wedding.groom}
            image={assets.images.groomPortrait}
            imageAlt="Portrait of the groom, Prince, in a cream sherwani"
          />

          {/* Center ampersand on desktop */}
          <PersonCard
            person={wedding.bride}
            image={assets.images.bridePortrait}
            imageAlt="Portrait of the bride, Priya, in a red bridal lehenga"
            flip
          />
        </div>

        <motion.div
          className="mt-14 flex items-center justify-center gap-4 text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="h-px w-16 bg-gold/40" />
          <LotusMark size={26} />
          <span className="font-script text-2xl italic text-maroon">
            {wedding.contact.hashtag}
          </span>
          <LotusMark size={26} />
          <span className="h-px w-16 bg-gold/40" />
        </motion.div>
      </div>
    </section>
  );
}
