"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch playlist on mount
  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(data => {
        if (data.playlist && data.playlist.length > 0) {
          setPlaylist(data.playlist);
          setHasError(false);
        } else {
          setHasError(true);
          setErrorMessage("No music files found");
        }
      })
      .catch(err => {
        console.error('Failed to fetch playlist:', err);
        setHasError(true);
        setErrorMessage("Failed to load music");
      });
  }, []);

  // Initialize audio element and setup track progression
  useEffect(() => {
    if (playlist.length === 0) return;

    audioRef.current = new Audio(playlist[currentTrackIndex]);
    audioRef.current.volume = volume;

    const handleTrackEnd = () => {
      setCurrentTrackIndex(prev => (prev + 1) % playlist.length);
    };

    const handleError = () => {
      console.error('Audio error:', audioRef.current?.error);
      setHasError(true);
      setErrorMessage("Failed to load audio file");
      setIsPlaying(false);
    };

    audioRef.current.addEventListener('ended', handleTrackEnd);
    audioRef.current.addEventListener('error', handleError);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleTrackEnd);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [playlist, currentTrackIndex, volume]);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Auto-resume playback when track changes
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => console.warn('Playback failed:', err));
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.warn("Audio playback failed:", err);
          setHasError(true);
          setIsPlaying(false);

          // Check for autoplay policy error
          if (err.name === 'NotAllowedError') {
            setErrorMessage("Click to enable audio");
          } else {
            setErrorMessage("Playback failed");
          }
        });
    }
  };

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding controls for smoother UX
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed z-50 flex flex-col items-end gap-2"
      style={{
        bottom: 'calc(5rem + env(safe-area-inset-bottom))',
        right: 'calc(1rem + env(safe-area-inset-right))',
      }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Volume control */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-full border border-amber-400/30 bg-black/90 px-5 py-3 backdrop-blur-xl shadow-lg shadow-amber-500/20"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-amber-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M11 5L6 9H2v6h4l5 4V5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {volume > 0.5 && (
                <>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </>
              )}
              {volume > 0 && volume <= 0.5 && (
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              )}
            </svg>

            <div className="relative w-32 h-2 bg-amber-900/30 rounded-full overflow-hidden">
              {/* Volume level indicator */}
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={false}
                animate={{ width: `${volume * 100}%` }}
                transition={{ duration: 0.1 }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {/* Slider thumb */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-300 shadow-lg shadow-amber-500/50 pointer-events-none z-20"
                initial={false}
                animate={{ left: `calc(${volume * 100}% - 8px)` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <span className="text-sm text-amber-300 font-semibold min-w-[2.5rem] tabular-nums">
              {Math.round(volume * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={togglePlay}
        disabled={hasError && errorMessage !== "Click to enable audio"}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-xl transition-colors ${
          hasError
            ? "border-red-400/30 bg-red-950/20 hover:border-red-400/60 hover:bg-red-500/10"
            : "border-amber-400/30 bg-black/80 hover:border-amber-400/60 hover:bg-amber-500/10"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        whileHover={{ scale: hasError ? 1.05 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 blur-md opacity-0"
          animate={{
            opacity: isPlaying ? [0.3, 0.6, 0.3] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Ripple effect when playing */}
        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-amber-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-amber-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{
            rotate: isPlaying ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {isPlaying ? (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-amber-300"
              fill="currentColor"
            >
              <path d="M9 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              <motion.path
                d="M9 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
                animate={{
                  scaleY: [1, 0.7, 1, 0.85, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-amber-300"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.div>

        {/* Musical notes floating when playing */}
        <AnimatePresence>
          {isPlaying && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-amber-400 text-xs"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, (i - 1) * 15],
                    y: [0, -30],
                    scale: [0, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                >
                  ♪
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!showControls && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs backdrop-blur-xl pointer-events-none ${
              hasError
                ? "border-red-400/30 bg-red-950/90 text-red-200"
                : "border-amber-400/30 bg-black/90 text-amber-200"
            }`}
          >
            {hasError ? errorMessage : (isPlaying ? "Music playing" : "Play music")}
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 ${
              hasError ? "border-l-red-400/30" : "border-l-amber-400/30"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
