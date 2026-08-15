You are an expert senior frontend developer, creative director, motion designer, and premium wedding website designer.

I want you to build a COMPLETE premium Hindu wedding invitation website from scratch.

The website must feel like a luxury, cinematic, emotional, highly interactive Indian wedding invitation — NOT like a normal business website or a basic template.

IMPORTANT:
Do not just create a static website.
The website should feel like an interactive digital wedding card with beautiful transitions, animations, micro-interactions, music/video integration, flowers falling, elegant typography, Indian decorative elements, and cinematic storytelling.

==================================================
PROJECT
=======

Wedding invitation website.

Bride: Priya
Groom: Prince

Use these names throughout the website for now.

You can invent a realistic Hindu wedding date, venue, event schedule, family names and invitation text for the demo.

Use a future wedding date so the countdown is meaningful.

Example:
Wedding Date: 18 February 2027

Venue:
Vrindavan Grand Palace
Kolkata, West Bengal

You may create realistic placeholder details, but structure the code so they can easily be changed later from one configuration file.

Create a central configuration/data file such as:

src/config/wedding.js

Store:

* bride name
* groom name
* wedding date
* venue
* address
* Google Maps URL placeholder
* event dates
* event times
* family names
* social/contact details
* invitation messages
* gallery data

Do NOT hardcode these values throughout components.

==================================================
FIRST: INSPECT ALL PROVIDED ASSETS
==================================

Before writing the UI:

1. Inspect the complete assets/public folder.
2. Identify:

   * videos
   * images
   * logos
   * backgrounds
   * wedding photos
   * decorative assets
   * Radha/Krishna images
   * floral elements
   * any existing invitation artwork

Create an organized asset map.

Reuse the provided assets whenever they fit the design.

Do NOT replace a good provided asset with a newly generated asset.

If an important visual is missing, you may use the connected Higgsfield capability to generate a suitable image.

If Higgsfield is available through the current environment/integration, use it intelligently for missing assets.

Do NOT generate random unnecessary images.

All generated visuals must match the same visual identity:

* premium Hindu wedding
* Radha Krishna inspired
* Indian traditional aesthetics
* luxury
* elegant
* warm
* cinematic
* ivory
* gold
* blush pink
* royal blue
* muted green
* floral
* devotional
* sophisticated

==================================================
TECH STACK
==========

Use a modern production-quality frontend stack.

Prefer:

* React
* Vite
* JavaScript/TypeScript as appropriate
* Tailwind CSS
* Framer Motion for animations
* Lucide React for icons
* GSAP only where it provides meaningful advanced animation
* CSS animations where simpler

Do not unnecessarily install huge libraries.

Keep the application fast and maintainable.

==================================================
DESIGN DIRECTION
================

The visual direction should be:

"LUXURY CINEMATIC HINDU WEDDING INVITATION"

Think of:

* premium Indian wedding card
* Vrindavan
* Radha Krishna
* royal Indian palace
* floral mandap
* gold ornaments
* soft divine glow
* traditional Indian patterns
* cinematic storytelling
* luxury editorial design

Avoid:

* generic Bootstrap-looking layouts
* excessive cards
* boring grids
* generic gradients
* corporate UI
* overly bright neon colors
* excessive rounded containers
* template-like appearance

Use:

* elegant serif typography for headings
* sophisticated clean font for body text
* gold decorative separators
* floral corners
* subtle textures
* layered backgrounds
* ornamental borders
* soft shadows
* cinematic transitions

==================================================
PAGE EXPERIENCE
===============

The entire website should feel like ONE continuous wedding story.

Do NOT make each section feel disconnected.

Recommended flow:

1. Opening cinematic video
2. Video completion transition
3. Main invitation reveal
4. Scratch/reveal interaction
5. Bride + Groom
6. Wedding message
7. Countdown
8. Wedding events
9. Venue
10. Gallery
11. Family blessings
12. RSVP
13. Final Radha Krishna blessing
14. Footer

==================================================

1. CINEMATIC INTRO VIDEO
   ==================================================

The website must OPEN with the provided intro video.

Use the video from the assets folder if available.

The video should occupy the entire viewport.

Requirements:

* full-screen
* object-fit: cover
* mobile-friendly
* tablet-friendly
* autoplay
* muted initially if browser autoplay requires it
* playsInline
* no ugly video controls

During video playback:

* keep UI extremely minimal
* optionally show a subtle "Tap to experience" or sound control if required

When the video ENDS:

DO NOT simply jump to the website.

Create a beautiful cinematic transition.

Possible transition:

* video slowly fades into warm ivory
* golden particles appear
* flower petals begin falling
* Radha/Krishna artwork softly appears
* decorative mandala expands
* main invitation typography fades in
* background music begins if user interaction permits

The transition should feel like opening a luxury wedding invitation.

Listen to the video's ended event.

The main website should begin automatically after the video finishes.

If video loading fails:

* gracefully fall back to the main invitation
* do not leave a blank screen

==================================================
2. HERO / INVITATION REVEAL
===========================

After the intro video:

Create a stunning full-screen hero.

Main visual:
Radha and Krishna artwork from provided assets if suitable.

If no suitable artwork exists, use the connected Higgsfield generation capability to create one.

Hero content:

"Together with the blessings of our families"

PRINCE
&
PRIYA

"invite you to celebrate their wedding"

Use elegant typography.

Do NOT make the text too large.

The artwork should remain the hero.

Add:

* subtle golden glow
* floating flower petals
* very subtle particles
* soft parallax movement
* slow image zoom
* ornamental Indian border

The hero must feel alive.

==================================================
3. SCRATCH / REVEAL INTERACTION
===============================

Immediately BELOW the hero, create a beautiful interactive scratch/reveal section.

This is very important.

Create a premium digital scratch-card interaction.

Heading:

"A Little Surprise Awaits"

Show a beautiful decorative scratch surface.

The user should physically drag/touch over the scratch area.

Support:

* mouse
* touch
* mobile
* tablet

Under the scratch layer reveal:

"OUR WEDDING COUNTDOWN"

and the countdown timer.

The scratch interaction should feel luxurious, not like a cheap lottery scratch card.

Use:

* gold foil effect
* floral decoration
* subtle texture
* Radha/Krishna inspired ornamental design

When approximately 60–70% of the area has been scratched:

Automatically reveal the content smoothly.

Add:

* sparkle animation
* flower petals
* soft glow

On mobile, touch interaction must work perfectly.

Do not block page scrolling unnecessarily.

==================================================
4. COUNTDOWN
============

Create a premium countdown section.

Countdown to the wedding date stored in:

src/config/wedding.js

Display:

DAYS
HOURS
MINUTES
SECONDS

Use an elegant design.

Do not use huge digital clock styling.

Make it look like luxury wedding stationery.

Animate the numbers subtly when they change.

When countdown reaches zero:
display:

"Today, two hearts become one."

Make sure timezone handling is sensible.

==================================================
5. BRIDE & GROOM SECTION
========================

Create a beautiful couple introduction.

Use provided photos if available.

If suitable couple artwork is available, use it.

Layout should be mobile-first.

Show:

Prince
The Groom

Priya
The Bride

Include elegant short descriptions.

Use:

* floral frames
* gold borders
* subtle reveal animations
* soft image zoom
* parallax

Do NOT make this look like a normal profile section.

==================================================
6. OUR STORY
============

Create an emotional wedding story section.

Example:

"Some stories are written by destiny.
Ours was written in moments,
smiles, conversations and countless memories."

Then create 3–4 timeline moments.

Example:
First Meeting
A Beautiful Beginning
Forever Became A Promise
The Wedding Day

Use elegant scroll animations.

Each timeline item should reveal as the user scrolls.

==================================================
7. WEDDING EVENTS
=================

Create beautiful event cards/sections.

Events:

HALDI
MEHENDI
SANGEET
WEDDING
RECEPTION

Use realistic placeholder dates and times.

Each event should have:

* date
* time
* location
* short description
* decorative artwork

Use different but consistent floral/Indian decorative elements.

Add subtle hover/touch interactions.

On mobile:
single-column layout.

On tablet:
beautiful two-column or alternating layout.

==================================================
8. MANDAP / WEDDING SECTION
===========================

Create a cinematic section for the main wedding ceremony.

Use a beautiful mandap image from assets.

If missing, generate an appropriate visual using Higgsfield.

Add:

* floating petals
* slow zoom
* golden light
* subtle particles

Text:

"Two souls.
One promise.
A lifetime together."

Make this section visually powerful.

==================================================
9. VENUE SECTION
================

Create a beautiful venue section.

Venue:

Vrindavan Grand Palace
Kolkata, West Bengal

Include:

* venue image
* date
* time
* address
* "Open in Google Maps" button

Button should be elegant.

Use placeholder Google Maps URL in config.

Do not use an ugly embedded map unless necessary.

==================================================
10. GALLERY
===========

Create a premium wedding gallery.

Use provided image assets.

If there are insufficient suitable images:
generate only the required missing images through Higgsfield.

Gallery should support:

* masonry/grid layout
* image reveal animations
* lightbox
* next/previous
* close
* swipe on mobile
* keyboard navigation on desktop/tablet

Images should not feel randomly placed.

Create a cinematic gallery experience.

==================================================
11. FALLING FLOWERS
===================

Throughout the website, create subtle falling flower petals.

IMPORTANT:

Do NOT make flowers continuously fall heavily.

It should be:

* elegant
* slow
* random
* occasional
* lightweight

Use CSS/JS animation rather than generating hundreds of DOM elements.

Flowers can include:

* rose petals
* jasmine petals
* marigold petals

On mobile:
reduce particle count.

On tablet:
moderate particle count.

Respect:

prefers-reduced-motion

If user has reduced motion enabled:
significantly reduce or disable decorative animations.

==================================================
12. MICRO INTERACTIONS
======================

Add lots of small premium interactions.

Examples:

* buttons gently glow on hover
* floral elements move slightly
* images have subtle parallax
* headings reveal letter-by-letter or word-by-word
* gold ornaments fade in
* cards lift slightly
* gallery images zoom subtly
* countdown numbers animate
* scratch reveal sparkles
* section transitions use opacity + transform
* scroll-triggered animations
* flower petals
* subtle cursor interaction on larger screens

BUT:

Do NOT animate everything.

Animation must feel premium.

Avoid:

* bouncing buttons
* excessive spinning
* cartoon effects
* distracting transitions

==================================================
13. MUSIC
=========

If a wedding background music/audio asset exists, integrate it.

Because browsers restrict autoplay audio:

Start muted if necessary.

Add a beautiful floating music button.

The button should allow:

* play
* pause
* mute/unmute

Position it elegantly so it doesn't interfere with content.

Use a traditional/romantic Indian wedding feel if an audio asset is available.

==================================================
14. MOBILE FIRST
================

This is EXTREMELY IMPORTANT.

The primary target is:

Mobile phones.

Test design for:

* 360px
* 375px
* 390px
* 412px
* 430px

Then optimize for tablets:

* 768px
* 820px
* 834px
* 1024px

Do NOT simply shrink desktop design.

Design mobile layouts intentionally.

==================================================
15. MOBILE NAVIGATION
=====================

Do not use a large desktop navbar on mobile.

Use a beautiful minimal floating navigation.

Possible:
small floating menu button.

Menu:
Home
Our Story
Events
Venue
Gallery
RSVP

When opened:
beautiful full-screen or bottom-sheet navigation.

Include subtle animations.

==================================================
16. RESPONSIVE IMAGES
=====================

Use proper responsive image behavior.

Use:

* object-fit
* object-position
* aspect ratios
* lazy loading

Keep important faces and artwork inside safe areas.

Never crop Radha/Krishna faces.

Use responsive image sources when appropriate.

==================================================
17. PERFORMANCE
===============

This is very important because the website contains:

* video
* high-resolution images
* animations
* gallery
* particles

Optimize everything.

Requirements:

* lazy load below-the-fold images
* preload only critical hero/video assets
* compress images where appropriate
* avoid unnecessary rerenders
* avoid huge JS animation loops
* optimize particle count
* use GPU-friendly transforms
* avoid layout thrashing
* use poster image for video
* handle video loading errors

The website should feel smooth on a normal mobile phone.

==================================================
18. ACCESSIBILITY
=================

Add:

* alt text
* keyboard navigation
* accessible buttons
* focus states
* semantic HTML
* aria-labels where necessary

Respect:

prefers-reduced-motion

==================================================
19. SEO / META
==============

Add:

* title
* description
* Open Graph metadata
* wedding-themed favicon if suitable
* viewport settings

Example title:

"Prince & Priya — Wedding Invitation"

Description:

"With the blessings of our families, Prince and Priya invite you to celebrate their wedding."

==================================================
20. CODE ARCHITECTURE
=====================

Create clean reusable components.

Suggested structure:

src/
components/
IntroVideo/
WeddingHero/
ScratchReveal/
Countdown/
Couple/
Story/
Events/
Mandap/
Venue/
Gallery/
RSVP/
MusicButton/
FallingPetals/
DecorativeElements/
SectionDivider/

config/
wedding.js

data/
gallery.js
events.js

hooks/
useCountdown.js
useScrollAnimation.js

utils/

assets/

Keep components modular.

Do not create one giant App.jsx.

==================================================
21. ASSET MANAGEMENT
====================

Before building:

Inspect all provided assets.

Create a clear mapping such as:

heroVideo
heroImage
krishnaImage
radhaImage
coupleImage
mandapImage
venueImage
galleryImages
floralElements
music

Use actual asset paths.

If an asset is unsuitable:
do not force it into the design.

If Higgsfield can create a much better missing asset:
generate a matching asset.

Maintain visual consistency.

==================================================
22. VISUAL DETAILS
==================

Use subtle decorative elements throughout:

* lotus
* peacock feathers
* gold ornaments
* floral borders
* mandala patterns
* diyas
* marigold
* jasmine
* rose petals
* Indian arches
* temple motifs
* Radha Krishna artwork

But DO NOT overcrowd the website.

Whitespace is important.

==================================================
23. FINAL SECTION
=================

Create a beautiful emotional closing section.

Use Radha Krishna artwork.

Text:

"With love,
with blessings,
and with hearts full of joy..."

"Prince & Priya"

"Forever begins here."

Then show:

Wedding Date
Venue

Add a final floral decoration.

End with an elegant footer.

==================================================
24. IMPORTANT ANIMATION PHILOSOPHY
==================================

The website should feel like:

OPENING A LUXURY PHYSICAL WEDDING INVITATION.

Think:

video → fade → invitation opens → flowers appear → gold ornament reveals → scratch → countdown → story unfolds → wedding events → gallery → final blessing.

Animations should be:

* cinematic
* smooth
* slow where appropriate
* responsive
* emotional
* elegant

Use spring physics carefully.

Use scroll-based reveals.

Use staggered animations.

Use subtle parallax.

Use layered backgrounds.

==================================================
25. DO NOT STOP AT A BASIC IMPLEMENTATION
=========================================

Do NOT deliver:

* plain sections
* generic cards
* basic navbar
* basic countdown
* simple image grid
* default buttons
* basic fade animations

I want a visually impressive final result.

If something can be made more premium without hurting performance, improve it.

==================================================
26. DEVELOPMENT PROCESS
=======================

Follow this process:

STEP 1:
Inspect the existing project.

STEP 2:
Inspect all assets.

STEP 3:
Understand available video/images/audio.

STEP 4:
Plan the complete visual system.

STEP 5:
Create the configuration file.

STEP 6:
Build the intro video experience.

STEP 7:
Build the hero.

STEP 8:
Build scratch reveal + countdown.

STEP 9:
Build story/events/venue/gallery.

STEP 10:
Add animations.

STEP 11:
Add falling petals.

STEP 12:
Add music control.

STEP 13:
Optimize mobile.

STEP 14:
Optimize tablet.

STEP 15:
Test all interactions.

STEP 16:
Fix console errors.

STEP 17:
Check for broken images/video.

STEP 18:
Run production build.

STEP 19:
Fix all build errors.

STEP 20:
Give me a concise summary of what was built.

==================================================
FINAL QUALITY BAR
=================

Before considering the project complete, verify:

* Intro video works.
* Website starts automatically after video ends.
* Hero transition is cinematic.
* Scratch interaction works with mouse.
* Scratch interaction works with touch.
* Countdown works.
* Countdown updates every second.
* Falling petals work.
* Falling petals are not excessive.
* Music control works.
* Gallery lightbox works.
* Gallery swipe works on mobile.
* Navigation works.
* Google Maps button works.
* All provided assets are correctly loaded.
* Missing assets have graceful fallbacks.
* No broken images.
* No console errors.
* No horizontal scrolling on mobile.
* No content is cut off.
* Radha/Krishna faces are never incorrectly cropped.
* Tablet layout looks intentional.
* Mobile layout looks intentional.
* Reduced-motion preference is respected.
* Production build succeeds.

Most importantly:

MAKE IT LOOK LIKE A PREMIUM, EXPENSIVE, CINEMATIC INDIAN WEDDING INVITATION.

Do not ask me unnecessary questions.

First inspect the project and assets, then start implementing the website.
