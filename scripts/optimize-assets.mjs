/**
 * Asset optimizer.
 * Source art lives in ../assets (untouched originals, 7-11MB each).
 * This produces web-ready WebP into ../public/img with sensible max widths,
 * plus copies the intro video into ../public/video.
 *
 *   npm run optimize:assets
 */
import sharp from 'sharp';
import { mkdir, copyFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets', 'images');
const NEW_IMG_SRC = path.join(ROOT, 'assets', 'new image');
const LOGO_SRC = path.join(ROOT, 'assets', 'logo');
const VIDEO_SRC = path.join(ROOT, 'assets', 'intro video');
const OUT_IMG = path.join(ROOT, 'public', 'img');
const OUT_VIDEO = path.join(ROOT, 'public', 'video');

// friendly-name -> [source dir, source file, max width, quality]
const MAP = {
  'radha-krishna-portrait': [SRC, 'radha-krishna-portrait.jpg', 1200, 82],
  'couple-portrait': [SRC, 'couple-portrait.jpg', 1100, 82],
  'floral-bouquet': [SRC, 'floral-bottom.jpg', 1400, 80],
  'radha-krishna-scene': [SRC, 'Gemini_Generated_Image_of97kaof97kaof97.png', 1800, 80],
  'couple-mandap': [SRC, 'Gemini_Generated_Image_j5q75wj5q75wj5q7.png', 1200, 82],
  'mandala-gold': [SRC, 'Gemini_Generated_Image_5p8wyz5p8wyz5p8w.png', 1400, 82],
  'frame-floral': [SRC, 'Gemini_Generated_Image_qc4c04qc4c04qc4c.png', 1800, 82],
  'venue-arch': [SRC, 'Gemini_Generated_Image_xjjtywxjjtywxjjt.png', 1800, 80],
  'kalash': [SRC, 'Gemini_Generated_Image_6g12p76g12p76g12.png', 1500, 80],
  'diyas-lotus': [SRC, 'Gemini_Generated_Image_1p603h1p603h1p60.png', 1600, 78],
  'pattern-paisley': [SRC, 'Gemini_Generated_Image_4l74n54l74n54l74.png', 1600, 72],
  'pattern-paisley-tall': [SRC, 'Gemini_Generated_Image_67qi0167qi0167qi.png', 1200, 72],
  'corner-floral': [SRC, 'Gemini_Generated_Image_n0r54xn0r54xn0r5.png', 1400, 82],
  'gallery-mehendi-sangeet': [NEW_IMG_SRC, 'PPM-SB-811-1536x1022.webp', 1400, 82],
  'gallery-couple-roses': [
    NEW_IMG_SRC,
    'beautiful-woman-long-red-dress-walks-around-city-with-her-husband-1024x683.webp',
    1400,
    82,
  ],
  'logo': [LOGO_SRC, 'cropped-logo-1-150x150.webp', 300, 90],
};

async function run() {
  await mkdir(OUT_IMG, { recursive: true });
  await mkdir(OUT_VIDEO, { recursive: true });

  for (const [name, [dir, file, width, quality]] of Object.entries(MAP)) {
    const src = path.join(dir, file);
    if (!existsSync(src)) {
      console.warn(`! missing source: ${file}`);
      continue;
    }
    const out = path.join(OUT_IMG, `${name}.webp`);
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(out);
    console.log(`✓ ${name}.webp`);
  }

  // Poster frame for the intro video (still fallback / preview)
  const rk = path.join(SRC, 'Gemini_Generated_Image_of97kaof97kaof97.png');
  if (existsSync(rk)) {
    await sharp(rk)
      .resize({ width: 1400 })
      .modulate({ brightness: 0.9 })
      .webp({ quality: 74 })
      .toFile(path.join(OUT_IMG, 'intro-poster.webp'));
    console.log('✓ intro-poster.webp');
  }

  // Copy intro video
  const files = await readdir(VIDEO_SRC).catch(() => []);
  const mp4 = files.find((f) => f.toLowerCase().endsWith('.mp4'));
  if (mp4) {
    await copyFile(path.join(VIDEO_SRC, mp4), path.join(OUT_VIDEO, 'intro.mp4'));
    console.log('✓ intro.mp4');
  } else {
    console.warn('! no intro .mp4 found');
  }

  console.log('\nDone.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
