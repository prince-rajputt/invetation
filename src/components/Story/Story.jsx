import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { wedding } from '../../config/wedding';
import { story } from '../../data/story';
import { assets } from '../../data/assets';
import SectionDivider from '../DecorativeElements/SectionDivider';
import { LotusMark } from '../DecorativeElements/Ornaments';
import Reveal from '../common/Reveal';

function TimelineItem({ item, index }) {
  const left = index % 2 === 0;
  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-8">
      {/* Connector dot */}
      <div className="absolute left-4 top-2 z-10 md:left-1/2 md:-translate-x-1/2">
        <motion.span
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-ivory text-gold shadow-gold"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
        >
          <LotusMark size={18} />
        </motion.span>
      </div>

      {/* Card */}
      <Reveal
        className={`ml-14 md:ml-0 ${
          left ? 'md:col-start-1 md:text-right md:pr-10' : 'md:col-start-2 md:text-left md:pl-10'
        }`}
        y={20}
      >
        <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-ivory to-ivory-deep/60 p-4 shadow-soft sm:p-6">
          <span className="font-display text-3xl text-gold/30 sm:text-5xl">{item.year}</span>
          <h3 className="mt-0.5 font-display text-xl text-maroon sm:mt-1 sm:text-2xl">{item.title}</h3>
          <p className="mt-1.5 font-script text-base leading-relaxed text-ink/70 sm:mt-2 sm:text-lg">
            {item.text}
          </p>
        </div>
      </Reveal>

      {/* Spacer for the empty column on desktop */}
      <div className={left ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'} />
    </div>
  );
}

export default function Story() {
  const lineRef = useRef(null);
  // Track scroll through the timeline so the pink line "draws" downward.
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.8', 'end 0.55'],
  });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const dotTop = useTransform(grow, [0, 1], ['0%', '100%']);
  const dotOpacity = useTransform(grow, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section id="story" className="relative overflow-hidden py-14 sm:py-28">
      {/* Devotional patterned background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: `url(${assets.images.patternPaisley})`, backgroundSize: '520px' }}
      />
      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Written by destiny</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">Our Story</h2>
          <SectionDivider className="mt-5" />
          <p className="mx-auto mt-3 max-w-xl font-script text-xl italic leading-relaxed text-ink/75">
            {wedding.messages.storyIntro}
          </p>
        </Reveal>

        <div ref={lineRef} className="relative mt-9 sm:mt-16">
          {/* Faint base rail (pink) */}
          <div className="absolute left-8 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-blush/25 to-transparent md:left-1/2 md:-translate-x-1/2" />
          {/* Animated pink line that draws downward as you scroll */}
          <motion.div
            className="absolute left-8 top-0 h-full w-[2px] origin-top -translate-x-1/2 rounded-full md:left-1/2 md:-translate-x-1/2"
            style={{
              scaleY: grow,
              background: 'linear-gradient(to bottom, #f3d2ce 0%, #e5a6a6 45%, #c9757c 100%)',
              boxShadow: '0 0 10px rgba(229,166,166,0.6)',
            }}
          />
          {/* Glowing leading dot that travels down the line */}
          <motion.span
            className="absolute left-8 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-white/70 bg-blush md:left-1/2 md:-translate-x-1/2"
            style={{
              top: dotTop,
              opacity: dotOpacity,
              marginTop: '-7px',
              boxShadow: '0 0 14px 4px rgba(229,166,166,0.75)',
            }}
          />
          <div className="space-y-5 sm:space-y-12">
            {story.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
