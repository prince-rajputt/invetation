import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music2,
  Pause,
  Play,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Upload,
  Sparkles,
  Disc3,
  X,
  ListMusic,
  Heart,
  Check,
  Radio
} from 'lucide-react';

/* ───────────────────────────────────────────────────────────
 * Royal Indian Wedding Music Player & Sangeet Track Selector
 * ─────────────────────────────────────────────────────────
 * Pre-loaded with authentic Indian wedding / Sangeet MP3 tracks
 * + allows uploading / linking any favorite Hindi wedding song
 * (e.g. Din Shagna Da, Kudmayi, Nachde Ne Saare, Madhanya, etc.)
 * ───────────────────────────────────────────────────────── */

const DEFAULT_TRACKS = [
  {
    id: 'sangeet-1',
    title: 'Sangeet Dhol Celebration',
    hindiTitle: 'संगीत ढोल धमाल (Sangeet Dance Beats)',
    tag: '💃 Sangeet Dance',
    src: '/audio/sangeet-beats.mp3',
    duration: '2:42',
    description: 'Upbeat festive Dholak & percussion for high energy Sangeet night',
  },
  {
    id: 'phere-1',
    title: 'Phere & Kudmayi Romance',
    hindiTitle: 'फेरे और कुड़माई (Bansuri & Sitar Melody)',
    tag: '🌸 Phere / Varmala',
    src: '/audio/indian-flute.mp3',
    duration: '2:48',
    description: 'Soulful Indian flute, sitar & tabla for emotional moments',
  },
  {
    id: 'baraat-1',
    title: 'Royal Shaadi Grand Entry',
    hindiTitle: 'शाही बारात एंट्री (Grand Wedding Theme)',
    tag: '👑 Royal Baraat',
    src: '/audio/wedding-theme.mp3',
    duration: '2:30',
    description: 'Majestic orchestration fit for Prince & Priya’s royal union',
  },
  {
    id: 'romantic-1',
    title: 'Dilbaro Romantic Strings',
    hindiTitle: 'दिलबरो वेडिंग मेलोडी (Romantic Shaadi Vibe)',
    tag: '💖 Romantic Vibe',
    src: '/audio/romantic-wedding.mp3',
    duration: '2:35',
    description: 'Sweet, heart-warming strings & acoustic melody',
  },
  {
    id: 'desi-1',
    title: 'Desi Sangeet Rhythms',
    hindiTitle: 'देसी संगीत ताल (Traditional Folk Rhythms)',
    tag: '🪕 Desi Shaadi',
    src: '/audio/track205.mp3',
    duration: '2:20',
    description: 'Classic folk rhythmic cadence and festive energy',
  },
];

export default function MusicButton() {
  const [tracks, setTracks] = useState(DEFAULT_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customSongName, setCustomSongName] = useState('');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentTrack = tracks[currentTrackIndex] || DEFAULT_TRACKS[0];

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.src = currentTrack.src;
    audio.volume = isMuted ? 0 : volume;
    audio.loop = true;
    audioRef.current = audio;

    const handleEnded = () => {
      // Advance to next song in playlist
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update track src when currentTrack changes
  useEffect(() => {
    if (!audioRef.current) return;
    const wasPlaying = isPlaying;
    audioRef.current.src = currentTrack.src;
    audioRef.current.volume = isMuted ? 0 : volume;
    audioRef.current.currentTime = 0;

    if (wasPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error:', err);
          setIsPlaying(false);
        });
    }
  }, [currentTrackIndex, tracks]);

  // Volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Toggle play/pause
  const togglePlay = useCallback(async () => {
    setHasInteracted(true);
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio play prevented:', err);
      }
    }
  }, [isPlaying]);

  // Select track
  const selectTrack = (index) => {
    setHasInteracted(true);
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Next Track
  const nextTrack = () => {
    setHasInteracted(true);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  // Prev Track
  const prevTrack = () => {
    setHasInteracted(true);
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  // Handle Custom MP3 Upload (e.g. Din Shagna Da, Kudmayi, etc.)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const fileName = file.name.replace(/\.[^/.]+$/, '');

    const newTrack = {
      id: `custom-${Date.now()}`,
      title: fileName || 'Custom Hindi Wedding Song',
      hindiTitle: `⭐ ${fileName || 'आपका शादी का गाना'}`,
      tag: '✨ Custom Song',
      src: fileUrl,
      duration: 'Custom',
      description: 'Your uploaded Hindi wedding song',
      isCustom: true,
    };

    setTracks((prev) => [newTrack, ...prev]);
    setCurrentTrackIndex(0);
    setCustomSongName(fileName);
    setHasInteracted(true);

    if (audioRef.current) {
      audioRef.current.src = fileUrl;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Handle Custom Online MP3 URL
  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;

    const newTrack = {
      id: `url-${Date.now()}`,
      title: 'Online Hindi Wedding Song',
      hindiTitle: '🌐 ऑनलाइन शादी का गाना',
      tag: '🌐 Online Track',
      src: customUrlInput.trim(),
      duration: 'Online',
      description: 'Streamed wedding song',
      isCustom: true,
    };

    setTracks((prev) => [newTrack, ...prev]);
    setCurrentTrackIndex(0);
    setCustomUrlInput('');
    setShowUrlInput(false);
    setHasInteracted(true);

    if (audioRef.current) {
      audioRef.current.src = newTrack.src;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      {/* Hidden file input for custom MP3 upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
      />

      {/* Floating Main Music Pill / Button */}
      <div className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-50 flex items-center gap-2">
        {/* Floating Song Ticker / Player Card (when playing & hovering/active) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              onClick={() => setIsMenuOpen(true)}
              className="hidden md:flex items-center gap-3 py-2 px-3.5 rounded-full border border-gold/40 bg-ivory/90 text-maroon shadow-gold backdrop-blur-md cursor-pointer hover:border-gold transition-colors"
            >
              <div className="flex gap-[3px] items-end h-3.5 w-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[2.5px] bg-gold-deep rounded-full"
                    animate={{ height: ['3px', '14px', '3px'] }}
                    transition={{
                      duration: 0.5 + i * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.08,
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-col text-left max-w-[150px] lg:max-w-[200px]">
                <span className="text-[11px] font-sans font-semibold text-maroon truncate">
                  {currentTrack.hindiTitle || currentTrack.title}
                </span>
                <span className="text-[9px] font-sans text-gold-deep flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {currentTrack.tag} • क्लिक करके बदलें
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(true);
                }}
                className="p-1.5 rounded-full hover:bg-gold/20 text-maroon text-xs"
                title="Change Song / गाने की सूची"
              >
                <ListMusic size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Main Round Music Button */}
        <motion.button
          onClick={() => {
            if (!isPlaying && !hasInteracted) {
              togglePlay();
              setIsMenuOpen(true);
            } else {
              togglePlay();
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsMenuOpen(true);
          }}
          className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-gold/60 bg-gradient-to-br from-ivory to-ivory-200 text-maroon shadow-gold backdrop-blur-md group hover:scale-105 active:scale-95 transition-transform"
          aria-label={isPlaying ? 'Pause wedding music' : 'Play Hindi wedding song'}
          title="Click to Play / Right Click for Wedding Song List"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {/* Rotating gold border ring */}
          <span
            className={`pointer-events-none absolute inset-0 rounded-full border-2 border-dashed border-gold/60 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          />

          {/* Glowing pulse if not yet playing */}
          {!isPlaying && (
            <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-gold animate-ping opacity-40" />
          )}

          {/* Vinyl center dot */}
          <span className="absolute w-2 h-2 rounded-full bg-gold/80" />

          {/* Equalizer / Disc Icon */}
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.span
                key="pause"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <Pause size={20} className="text-maroon fill-maroon/20" strokeWidth={2} />
              </motion.span>
            ) : (
              <motion.span
                key="play"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <Music2 size={20} className="text-maroon" strokeWidth={2} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Small Playlist Icon Trigger Button */}
        <motion.button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-ivory/95 text-maroon shadow-md backdrop-blur-md hover:bg-gold/20 transition-all hover:scale-110 active:scale-95"
          title="गाना चुनें / Select Wedding Song"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <ListMusic size={14} className="text-maroon" />
        </motion.button>
      </div>

      {/* Royal Wedding Music Drawer / Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full sm:max-w-md bg-ivory border border-gold/50 rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[85vh] flex flex-col z-10 text-ink"
            >
              {/* Gold Ornamental Header Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gold/20 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-maroon border border-gold/40">
                    <Disc3 size={18} className={isPlaying ? 'animate-spin-slow' : ''} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-maroon flex items-center gap-1.5">
                      शादी का संगीत (Wedding Music)
                    </h3>
                    <p className="text-[11px] font-sans text-stone-600">
                      प्रिंस और प्रिया की शादी का शुभ संगीत
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gold/20 text-maroon transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Now Playing Banner */}
              <div className="bg-gradient-to-r from-maroon/10 via-gold/15 to-maroon/10 rounded-xl p-3.5 border border-gold/30 mb-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-maroon text-ivory">
                      {isPlaying ? '▶ अब बज रहा है (Playing)' : '⏸ रुका हुआ (Paused)'}
                    </span>
                    <span className="text-[11px] text-gold-deep font-semibold">
                      {currentTrack.tag}
                    </span>
                  </div>
                  <span className="text-xs text-stone-500">{currentTrack.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-serif text-base font-bold text-maroon leading-tight truncate">
                      {currentTrack.hindiTitle || currentTrack.title}
                    </div>
                    <div className="text-[11px] text-stone-600 truncate">
                      {currentTrack.description}
                    </div>
                  </div>
                </div>

                {/* Player Controls Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-gold/20 mt-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevTrack}
                      className="p-1.5 rounded-full hover:bg-gold/20 text-maroon"
                      title="पिछला गाना (Previous)"
                    >
                      <SkipBack size={16} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="h-9 w-9 rounded-full bg-maroon text-ivory flex items-center justify-center shadow-md hover:bg-maroon-deep transition-transform active:scale-95"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                    <button
                      onClick={nextTrack}
                      className="p-1.5 rounded-full hover:bg-gold/20 text-maroon"
                      title="अगला गाना (Next)"
                    >
                      <SkipForward size={16} />
                    </button>
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsMuted((prev) => !prev)}
                      className="p-1 text-maroon hover:text-gold-deep"
                    >
                      {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-gold/40 accent-maroon rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Upload or Custom Hindi Song Action */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/40 text-maroon text-xs font-semibold transition-all hover:scale-[1.01]"
                >
                  <Upload size={14} className="text-maroon" />
                  <span>अपना मनपसंद गाना लगाएं (Upload MP3)</span>
                </button>
                <button
                  onClick={() => setShowUrlInput((prev) => !prev)}
                  className="px-3 py-2 rounded-xl bg-ivory-200 hover:bg-gold/20 border border-gold/30 text-maroon text-xs"
                  title="Song URL link"
                >
                  <Radio size={14} />
                </button>
              </div>

              {/* URL Input Form if toggled */}
              {showUrlInput && (
                <form onSubmit={handleAddUrl} className="flex gap-2 mb-3">
                  <input
                    type="url"
                    placeholder="https://.../song.mp3 paste link"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-gold/40 bg-white focus:outline-none focus:border-maroon text-ink"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-maroon text-ivory text-xs font-semibold hover:bg-maroon-deep"
                  >
                    Play
                  </button>
                </form>
              )}

              {/* Track Selection List */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-56">
                <div className="text-[11px] font-sans font-bold text-maroon uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles size={12} className="text-gold" />
                  चुनिंदा शादी के गाने (Curated Wedding Songs)
                </div>

                {tracks.map((t, idx) => {
                  const isSelected = currentTrackIndex === idx;
                  return (
                    <div
                      key={t.id}
                      onClick={() => selectTrack(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gold/20 border-gold shadow-sm'
                          : 'bg-white/60 hover:bg-gold/10 border-gold/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'bg-maroon text-ivory'
                              : 'bg-gold/20 text-maroon'
                          }`}
                        >
                          {isSelected && isPlaying ? (
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              ♪
                            </motion.span>
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-serif font-bold text-maroon truncate">
                            {t.hindiTitle || t.title}
                          </div>
                          <div className="text-[10px] text-stone-500 flex items-center gap-1.5">
                            <span className="font-semibold text-gold-deep">{t.tag}</span>
                            <span>•</span>
                            <span>{t.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {isSelected && (
                          <span className="text-maroon p-1">
                            <Check size={16} strokeWidth={2.5} />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hindi Tip Footer */}
              <div className="mt-3 pt-2.5 border-t border-gold/20 text-[10px] text-stone-500 text-center flex items-center justify-center gap-1">
                <Heart size={11} className="text-maroon fill-maroon" />
                <span>
                  टिप: आप कोई भी बॉलीवुड शादी का गाना (जैसे दिन शगना दा, कुड़माई, नचदे ने सारे) ऊपर अपलोड कर सकते हैं!
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
