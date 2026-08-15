import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../../data/assets';
import { LotusMark } from '../DecorativeElements/Ornaments';

/**
 * Full-screen cinematic intro video. Autoplays muted + inline. When it ends
 * (or the user skips / it fails to load) we run a warm ivory bloom transition
 * and call onFinish so the main site takes over.
 */
export default function IntroVideo({ onFinish }) {
  const videoRef = useRef(null);
  const [ending, setEnding] = useState(false);
  const [failed, setFailed] = useState(false);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setEnding(true);
    // Let the bloom transition play before unmounting
    setTimeout(() => onFinish?.(), 1700);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => finish();
    const onError = () => {
      setFailed(true);
      finish();
    };
    v.addEventListener('ended', onEnded);
    v.addEventListener('error', onError);

    // Attempt autoplay; if blocked, we still show the poster + skip control.
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        /* autoplay blocked — user can tap Skip / it will still show poster */
      }
    };
    tryPlay();

    // Safety net: if the video never fires 'ended' (e.g. metadata missing),
    // finish shortly after its duration, or after a hard cap.
    const cap = setTimeout(() => finish(), 45000);

    return () => {
      v.removeEventListener('ended', onEnded);
      v.removeEventListener('error', onError);
      clearTimeout(cap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Video */}
      {!failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={assets.video.intro}
          poster={assets.video.introPoster}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
      )}
      {/* Poster fallback if video fails */}
      {failed && (
        <img
          src={assets.video.introPoster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Subtle vignette for legibility of controls */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/30" />

      {/* Minimal controls */}
      <div className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-4 px-6">
        <motion.p
          className="font-script text-lg tracking-widest text-ivory/85"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          A wedding story begins…
        </motion.p>
        <div className="flex items-center gap-3">
          <button
            onClick={finish}
            className="rounded-full border border-ivory/30 bg-black/25 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.25em] text-ivory backdrop-blur-md transition hover:bg-black/40"
          >
            Skip Intro
          </button>
        </div>
      </div>

      {/* CINEMATIC END TRANSITION — warm ivory bloom + mandala + lotus */}
      <AnimatePresence>
        {ending && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Ivory bloom from centre */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, #fdfbf6 0%, #fbf6ec 40%, #f4ead6 100%)',
              }}
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ clipPath: 'circle(150% at 50% 50%)' }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Expanding gold ring + lotus */}
            <motion.div
              className="relative z-10 text-gold"
              initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute h-32 w-32 rounded-full border border-gold/40" />
                <span className="absolute h-44 w-44 rounded-full border border-gold/20" />
                <LotusMark size={72} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
