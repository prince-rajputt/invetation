# Prince & Priya — Wedding Invitation

A luxury, cinematic Hindu wedding invitation website built as an interactive digital wedding card — not a static page. Cinematic intro, a scratch-to-reveal countdown, scroll-drawn timelines, a lightbox gallery, and playful touch/petal micro-interactions throughout.

**Live site:** [invetation-sand.vercel.app](https://invetation-sand.vercel.app)

---

## Features

- **Cinematic intro** — full-screen video intro with a skip option, transitioning into the invitation reveal.
- **Hero invitation card** — a framed, glass-morphic card over a golden mandala backdrop with parallax on scroll.
- **Scratch-to-reveal** — a gold-foil scratch card that reveals the live countdown to the big day.
- **Our Story** — a scroll-animated pink timeline connecting key moments in the couple's story.
- **Wedding Events** — Haldi, Mehendi, Sangeet, Wedding and Reception laid out on a scroll-drawn violet timeline, each with date/time/location.
- **Venue** — address, embedded map, and one-tap "Open in Google Maps" / "Get Directions".
- **Gallery** — a masonry grid with a full-screen lightbox (keyboard nav + swipe support).
- **Family & Blessings**, **RSVP form** with a client-side confirmation state.
- **Delight everywhere:**
  - Falling petals ambient background.
  - Gold sparkle + petal bursts wherever you tap or drag to scroll (mobile & desktop).
  - A soft cursor glow on desktop.
  - Magnetic 3D tilt + glow on photo cards (desktop).
  - Scroll-triggered reveals with blur/scale entrances, and hand-drawn gold dividers.
- **Fully responsive**, honours `prefers-reduced-motion`, and keeps focus/keyboard accessibility in the gallery and nav.

## Tech stack

React 18 · Vite · Tailwind CSS · Framer Motion · lucide-react icons

## Getting started

```bash
npm install
npm run dev               # local dev server (http://localhost:5173)
npm run build              # production build -> /dist
npm run preview            # preview the production build locally
npm run optimize:assets    # rebuild optimized web assets from /assets into /public
```

> `optimize:assets` only needs to be re-run if you add or change source art in `/assets` — the optimized output already lives in `public/img` and `public/video`.

## Customize the wedding details

Everything — names, date, venue, family, invitation copy, contact info, and the maps link — lives in one file:

```
src/config/wedding.js
```

Nothing is hardcoded in components. Related content lives in:

- `src/data/events.js` — the five ceremonies (Haldi → Reception)
- `src/data/story.js` — the "Our Story" timeline
- `src/data/gallery.js` — gallery images & captions
- `src/data/assets.js` — the single asset map (paths to art/video/logo)

## Project structure

```
src/
  config/wedding.js          # single source of truth for wedding details
  data/                      # events, story, gallery, asset map
  hooks/                     # useCountdown, useReducedMotion, useResponsive
  styles/index.css           # design system — palette, buttons, dividers
  components/
    IntroVideo/               # cinematic intro + transition
    WeddingHero/               # invitation reveal card
    ScratchReveal/ Countdown/   # gold-foil scratch card, live countdown
    Couple/ Story/ Events/      # bride & groom, story timeline, ceremonies
    Venue/ Gallery/             # map + directions, lightbox gallery
    Family/ RSVP/ Footer/
    Nav/ MusicButton/ FallingPetals/
    Interactions/                # TapBurst, CursorGlow, TiltCard
    DecorativeElements/          # SVG ornaments, section dividers
    common/                       # Reveal, WordReveal scroll-animation helpers

assets/       # original high-res source art (unoptimized)
public/img/   # optimized WebP assets served by the site
scripts/optimize-assets.mjs   # generates public/img from assets/
```

## Notes

- **Assets**: source art in `assets/` is optimized to WebP via `scripts/optimize-assets.mjs`, keeping page weight low.
- **Music**: no audio file shipped by default — the floating button synthesizes a soft ambient drone via the Web Audio API. Drop a track in `public/audio` and swap the synth in `MusicButton.jsx` for a real `<audio>` element to use one.
- **RSVP**: submissions are handled client-side (demo only). Wire the `submit` handler in `src/components/RSVP/RSVP.jsx` to an email service or API to actually collect responses.
- **Accessibility**: honours `prefers-reduced-motion` globally, with alt text, focus states, and keyboard navigation in the gallery.
- **Deployment**: connected to Vercel — every push to `main` triggers an automatic production deploy.

---

Planned by **Fab Eventz**.
