# Prince & Priya — Wedding Invitation Website

A luxury, cinematic Hindu wedding invitation built with **React + Vite + Tailwind CSS + Framer Motion**.

## Run it

```bash
npm install
npm run optimize:assets   # one-time: builds web-ready art into /public from /assets
npm run dev               # local dev server
npm run build             # production build -> /dist
npm run preview           # preview the production build
```

> `npm run optimize:assets` is already run once (the optimized files live in `public/img` and `public/video`). Re-run it only if you change the source art in `assets/`.

## Change the wedding details — one file

Everything (names, date, venue, family, messages, contact, maps link) lives in:

```
src/config/wedding.js
```

Nothing is hardcoded in components. Related lists:

- `src/data/events.js` — the five ceremonies (Haldi → Reception)
- `src/data/story.js` — the "Our Story" timeline
- `src/data/gallery.js` — gallery images & captions
- `src/data/assets.js` — the single asset map (paths to art/video)

To swap the Google Maps location, edit `venue.mapsUrl` in `wedding.js`.

## Structure

```
src/
  config/wedding.js          # single source of truth
  data/                      # events, story, gallery, asset map
  hooks/                     # useCountdown, useReducedMotion, useResponsive
  styles/index.css           # design system (palette, buttons, dividers)
  components/
    IntroVideo/              # full-screen cinematic intro + end transition
    WeddingHero/             # invitation reveal (Radha-Krishna, parallax)
    ScratchReveal/           # gold-foil scratch card -> countdown
    Countdown/               # live countdown + full section
    Couple/ Story/ Events/   # bride & groom, timeline, ceremonies
    Mandap/ Venue/ Gallery/  # cinematic vows, venue+map, lightbox gallery
    Family/ RSVP/            # blessings, RSVP form
    FinalBlessing/ Footer/
    Nav/ MusicButton/ FallingPetals/
    DecorativeElements/      # SVG ornaments, section dividers
    common/                  # Reveal, WordReveal helpers
```

## Notes

- **Assets**: the original high-res art in `assets/` is optimized to WebP (~90MB → ~3.7MB). Faces of Radha/Krishna are kept within safe crop areas.
- **Music**: no audio file shipped, so the floating button synthesizes a soft ambient drone via the Web Audio API. Drop a track in `public/audio` and swap the synth in `MusicButton.jsx` for an `<audio>` element to use a real song.
- **RSVP**: submissions are handled client-side (demo). Wire the `submit` handler in `RSVP.jsx` to an email service / API to collect responses.
- **Accessibility**: honours `prefers-reduced-motion` globally (via `MotionConfig reducedMotion="user"` + CSS), with alt text, focus states, keyboard nav in the gallery, and semantic sections.
- **Performance**: below-the-fold images are lazy-loaded; the hero art is prioritized; particle counts scale down on mobile.
