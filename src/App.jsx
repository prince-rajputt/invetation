import { useState, useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';

import IntroVideo from './components/IntroVideo/IntroVideo';
import FloatingNav from './components/Nav/FloatingNav';
import FallingPetals from './components/FallingPetals/FallingPetals';
import TapBurst from './components/Interactions/TapBurst';
import CursorGlow from './components/Interactions/CursorGlow';

import WeddingHero from './components/WeddingHero/WeddingHero';
import ScratchReveal from './components/ScratchReveal/ScratchReveal';
import Couple from './components/Couple/Couple';
import Story from './components/Story/Story';
import Events from './components/Events/Events';
import Venue from './components/Venue/Venue';
import Gallery from './components/Gallery/Gallery';
import Family from './components/Family/Family';
import RSVP from './components/RSVP/RSVP';
import Footer from './components/Footer/Footer';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // Keep the page pinned to the top during the intro so the reveal starts clean.
  useEffect(() => {
    if (!introDone) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introDone]);

  return (
    // reducedMotion="user" makes every framer-motion animation honour the
    // OS "reduce motion" setting — transforms/scale are skipped while gentle
    // opacity fades are kept, matching the accessibility brief.
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!introDone && <IntroVideo key="intro" onFinish={() => setIntroDone(true)} />}
      </AnimatePresence>

      {introDone && (
        <>
          <FloatingNav />
          <FallingPetals density={2} />
          <TapBurst />
          <CursorGlow />

          <main>
            <WeddingHero />
            <ScratchReveal />
            <Couple />
            <Story />
            <Events />
            <Venue />
            <Gallery />
            <Family />
            <RSVP />
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  );
}
