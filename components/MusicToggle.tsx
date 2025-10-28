"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch playlist on mount
  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(data => {
        if (data.playlist && data.playlist.length > 0) {
          setPlaylist(data.playlist);
        }
      })
      .catch(err => console.error('Failed to fetch playlist:', err));
  }, []);

  // Initialize audio element and setup track progression
  useEffect(() => {
    if (playlist.length === 0) return;

    audioRef.current = new Audio(playlist[currentTrackIndex]);
    audioRef.current.volume = volume;

    const handleTrackEnd = () => {
      setCurrentTrackIndex(prev => (prev + 1) % playlist.length);
    };

    audioRef.current.addEventListener('ended', handleTrackEnd);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleTrackEnd);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [playlist, currentTrackIndex]);

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
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      {/* Volume control */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-full border border-violet-400/30 bg-black/80 px-4 py-2 backdrop-blur-xl"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-violet-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M11 5L6 9H2v6h4l5 4V5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-violet-900/50 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-400
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(168,85,247,0.5)]
                [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-violet-400 [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />

            <span className="text-xs text-violet-300 font-medium min-w-[2rem]">
              {Math.round(volume * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/30 bg-black/80 backdrop-blur-xl transition-colors hover:border-violet-400/60 hover:bg-violet-500/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/30 blur-md opacity-0"
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
                className="absolute inset-0 rounded-full border-2 border-violet-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-violet-400"
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
              className="h-6 w-6 text-violet-300"
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
              className="h-6 w-6 text-violet-300"
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
                  className="absolute text-violet-400 text-xs"
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
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-violet-400/30 bg-black/90 px-3 py-1.5 text-xs text-violet-200 backdrop-blur-xl pointer-events-none"
          >
            {isPlaying ? "Music playing" : "Play music"}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-violet-400/30" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
