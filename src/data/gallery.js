import { assets } from './assets';

/**
 * Gallery items. Uses the provided artwork. `span` controls the masonry
 * emphasis (tall / wide / normal) so the grid feels curated, not random.
 */
export const gallery = [
  {
    id: 'g1',
    src: assets.images.radhaKrishnaScene,
    alt: 'Radha and Krishna beneath a garden arch beside a lotus pond',
    caption: 'Divine Love',
    span: 'wide',
  },
  {
    id: 'g2',
    src: assets.images.coupleMandap,
    alt: 'The bride and groom exchanging garlands under a floral mandap',
    caption: 'The Vows',
    span: 'tall',
  },
  {
    id: 'g3',
    src: assets.images.galleryCoupleRoses,
    alt: 'A couple sharing a kiss beside a wall of red roses',
    caption: 'Golden Hour',
    span: 'normal',
  },
  {
    id: 'g4',
    src: assets.images.diyasLotus,
    alt: 'Brass diyas glowing among lotus flowers and marigold garlands',
    caption: 'A Thousand Lamps',
    span: 'normal',
  },
  {
    id: 'g5',
    src: assets.images.radhaKrishnaPortrait,
    alt: 'Radha and Krishna beneath a blossoming tree',
    caption: 'Eternal Melody',
    span: 'tall',
  },
  {
    id: 'g6',
    src: assets.images.kalash,
    alt: 'A sacred kalash adorned with marigold and mango leaves',
    caption: 'Sacred Rituals',
    span: 'normal',
  },
  {
    id: 'g7',
    src: assets.images.venueArch,
    alt: 'A carved temple archway decked with garlands and diyas',
    caption: 'The Palace Gates',
    span: 'wide',
  },
  {
    id: 'g8',
    src: assets.images.galleryMehendiSangeet,
    alt: 'Joyful guests singing and dancing together at the sangeet',
    caption: 'Dance & Delight',
    span: 'normal',
  },
];

export default gallery;
