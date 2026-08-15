import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, Mail, Check, Send } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { assets } from '../../data/assets';
import SectionDivider from '../DecorativeElements/SectionDivider';
import { LotusMark } from '../DecorativeElements/Ornaments';
import Reveal from '../common/Reveal';

/**
 * RSVP form. There is no backend in this demo, so submission is handled
 * client-side with an elegant confirmation. Wire `onSubmit` to an email
 * service / API when going live.
 */
export default function RSVP() {
  const [form, setForm] = useState({ name: '', guests: '1', attending: 'yes', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    // Demo: no network call. Replace with a real endpoint when available.
    setSent(true);
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-gradient-to-b from-ivory to-ivory-deep/50 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `url(${assets.images.patternPaisleyTall})`, backgroundSize: '400px' }}
      />
      <div className="relative mx-auto max-w-xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Will you join us?</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-maroon">RSVP</h2>
          <SectionDivider className="mt-5" />
          <p className="mx-auto mt-3 max-w-md font-script text-lg italic text-ink/70">
            Your blessings mean the world to us. Kindly respond by{' '}
            <span className="text-maroon">{wedding.contact.rsvpBy}</span>.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <div className="relative rounded-3xl border border-gold/30 bg-ivory/80 p-6 shadow-soft backdrop-blur-sm sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="thanks"
                  className="flex flex-col items-center py-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'backOut' }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold-deep">
                    <Check size={30} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-maroon">
                    Thank you, {form.name.split(' ')[0]}!
                  </h3>
                  <p className="mt-2 font-script text-lg italic text-ink/70">
                    {form.attending === 'yes'
                      ? 'We can’t wait to celebrate with you. Your response has been noted.'
                      : 'We’ll miss you dearly, but thank you for letting us know.'}
                  </p>
                  <LotusMark className="mt-4 text-gold" size={28} />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label htmlFor="rsvp-name" className="mb-1 block text-xs uppercase tracking-[0.2em] text-gold-deep">
                      Your Name
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-gold/30 bg-ivory px-4 py-3 text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rsvp-attending" className="mb-1 block text-xs uppercase tracking-[0.2em] text-gold-deep">
                        Attending?
                      </label>
                      <select
                        id="rsvp-attending"
                        value={form.attending}
                        onChange={set('attending')}
                        className="w-full rounded-xl border border-gold/30 bg-ivory px-4 py-3 text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                      >
                        <option value="yes">Joyfully accepts</option>
                        <option value="no">Regretfully declines</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="rsvp-guests" className="mb-1 block text-xs uppercase tracking-[0.2em] text-gold-deep">
                        Guests
                      </label>
                      <select
                        id="rsvp-guests"
                        value={form.guests}
                        onChange={set('guests')}
                        className="w-full rounded-xl border border-gold/30 bg-ivory px-4 py-3 text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                      >
                        {['1', '2', '3', '4', '5+'].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rsvp-message" className="mb-1 block text-xs uppercase tracking-[0.2em] text-gold-deep">
                      A note for the couple <span className="normal-case tracking-normal text-ink/40">(optional)</span>
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={3}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Your wishes & blessings…"
                      className="w-full resize-none rounded-xl border border-gold/30 bg-ivory px-4 py-3 text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full justify-center">
                    <Send size={16} />
                    Send RSVP
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal delay={0.2} className="mt-8 flex flex-col items-center gap-3 text-center text-sm text-ink/70">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href={`tel:${wedding.contact.phonePrimary.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 transition hover:text-maroon">
              <Phone size={15} className="text-gold-deep" /> {wedding.contact.phonePrimary}
            </a>
            <a href={`mailto:${wedding.contact.email}`} className="inline-flex items-center gap-2 transition hover:text-maroon">
              <Mail size={15} className="text-gold-deep" /> {wedding.contact.email}
            </a>
          </div>
          <p className="inline-flex items-center gap-2 font-script text-lg italic text-gold-deep">
            <Heart size={15} /> {wedding.contact.hashtag}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
