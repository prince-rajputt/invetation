/**
 * ============================================================
 *  PRINCE & PRIYA — WEDDING CONFIGURATION
 * ============================================================
 *  This is the SINGLE source of truth for the whole website.
 *  Change names, dates, venue, messages and links here — the
 *  entire site updates automatically. Nothing is hardcoded in
 *  the components.
 * ============================================================
 */

export const wedding = {
  // --- Couple -------------------------------------------------
  groom: {
    name: 'Prince',
    role: 'The Groom',
    profession: 'Software Engineer',
    description:
      'A gentle soul with a quiet strength, a lover of old songs and long drives. Prince believes the best moments in life are the simple ones — shared over chai, laughter and a hand to hold.',
    parents: 'Son of Mr. Rajesh Sharma & Mrs. Sunita Sharma',
  },
  bride: {
    name: 'Priya',
    role: 'The Bride',
    profession: 'Doctor',
    description:
      'Warm, radiant and endlessly kind, Priya paints, dances and finds beauty in everything around her. Her smile is the kind that turns an ordinary day into a cherished memory.',
    parents: 'Daughter of Mr. Arun Verma & Mrs. Meera Verma',
  },

  // --- The Wedding Day ---------------------------------------
  // ISO 8601 with timezone offset (IST = +05:30) for correct countdown.
  weddingDate: '2027-02-18T19:00:00+05:30',
  weddingDateLabel: '18 February 2027',
  weddingDayLabel: 'Thursday',

  // --- Venue --------------------------------------------------
  venue: {
    name: 'Vrindavan Grand Palace',
    city: 'Kolkata, West Bengal',
    address: 'Plot 12, Jessore Road, Rajarhat, Kolkata, West Bengal 700135, India',
    time: '7:00 PM onwards',
    // Replace with the real Google Maps share link when available.
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vrindavan+Grand+Palace+Kolkata',
    // Embeddable map (no API key needed). Swap the `q=` value for the real
    // place name or lat,long when available.
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=Vrindavan%20Grand%20Palace%20Rajarhat%20Kolkata&t=&z=13&ie=UTF8&iwloc=&output=embed',
  },

  // --- Invitation copy ---------------------------------------
  messages: {
    blessingLine: 'Together with the blessings of our families',
    inviteLine: 'invite you to celebrate their wedding',
    hindiBlessing: '॥ श्री गणेशाय नमः ॥',
    storyIntro:
      'Some stories are written by destiny. Ours was written in moments, smiles, conversations and countless memories.',
    weddingMessage:
      'Two souls that found each other across a crowd of a thousand faces. On this day, with the divine grace of Radha and Krishna, we begin our forever.',
    mandapLines: ['Two souls.', 'One promise.', 'A lifetime together.'],
    countdownZero: 'Today, two hearts become one.',
    finalBlessing: ['With love,', 'with blessings,', 'and with hearts full of joy…'],
    finalTagline: 'Forever begins here.',
  },

  // --- Contact / RSVP ----------------------------------------
  contact: {
    rsvpBy: '31 January 2027',
    phonePrimary: '+91 98300 00000',
    phoneSecondary: '+91 98310 00000',
    email: 'wedding@princeandpriya.love',
    hashtag: '#PrinceWedsPriya',
  },

  // --- Family names (blessings section) ----------------------
  family: {
    groomSide: {
      title: "Groom's Family",
      members: ['Mr. Rajesh & Mrs. Sunita Sharma', 'Aarav Sharma (Brother)', 'Late Sh. Mohan Lal Sharma'],
    },
    brideSide: {
      title: "Bride's Family",
      members: ['Mr. Arun & Mrs. Meera Verma', 'Ananya Verma (Sister)', 'Late Smt. Kamla Devi Verma'],
    },
  },

  // --- Social / share ----------------------------------------
  social: {
    instagram: '#',
    whatsappShare:
      'https://wa.me/?text=You%20are%20invited%20to%20Prince%20%26%20Priya%27s%20wedding%20on%2018%20Feb%202027%20%E2%9D%A4%EF%B8%8F',
  },
};

export default wedding;
