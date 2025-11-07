"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_ENDPOINT = "/api/music";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [volume, setVolume] = useState(0.3);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hideControlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFetching = useRef(false);

  const resetAudio = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current?.removeAttribute("src");
    audioRef.current = null;
  }, []);

  const loadPlaylist = useCallback(async () => {
    if (playlist.length || isFetching.current) {
      return playlist;
    }

    isFetching.current = true;
    try {
      const response = await fetch(MUSIC_ENDPOINT);
      const data = (await response.json()) as { playlist?: string[] };
      const tracks = Array.isArray(data.playlist) ? data.playlist.filter(Boolean) : [];
      if (!tracks.length) {
        setHasError(true);
        setErrorMessage("No ambient tracks available.");
        return [];
      }

      setPlaylist(tracks);
      setCurrentTrackIndex(0);
      setHasError(false);
      setErrorMessage("");
      return tracks;
    } catch (error) {
      console.warn("music playlist failed", error);
      setHasError(true);
      setErrorMessage("Failed to load music");
      return [];
    } finally {
      isFetching.current = false;
    }
  }, [playlist.length]);

  const ensureAudioElement = useCallback(async (): Promise<{ audio: HTMLAudioElement | null; tracks: string[] }> => {
    const tracks = playlist.length ? playlist : await loadPlaylist();
    if (!tracks.length) {
      return { audio: null, tracks };
    }

    if (audioRef.current) {
      return { audio: audioRef.current, tracks };
    }

    const audio = new Audio();
    audio.preload = "none";
    audio.volume = volume;

    audio.addEventListener("ended", () => {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    });

    audio.addEventListener("error", () => {
      setHasError(true);
      setErrorMessage("Playback failed");
      setIsPlaying(false);
    });

    audioRef.current = audio;
    return { audio, tracks };
  }, [loadPlaylist, playlist, volume]);

  const togglePlay = useCallback(async () => {
    if (hasError) return;
    const { audio, tracks } = await ensureAudioElement();
    if (!audio || !tracks.length) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (!audio.src) {
      const nextTrack = tracks[currentTrackIndex % tracks.length] ?? tracks[0];
      audio.src = nextTrack;
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowControls(true);
      })
      .catch((error) => {
        console.warn("playback failed", error);
        setIsPlaying(false);
        setHasError(true);
        setErrorMessage("Playback requires interaction");
      });
  }, [ensureAudioElement, hasError, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playlist.length) return;
    const nextTrack = playlist[currentTrackIndex % playlist.length];
    if (!nextTrack) return;
    if (!audio.src.endsWith(nextTrack)) {
      audio.src = nextTrack;
    }
    if (isPlaying) {
      void audio.play();
    }
  }, [currentTrackIndex, isPlaying, playlist]);

  useEffect(() => () => resetAudio(), [resetAudio]);

  const scheduleHideControls = () => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => setShowControls(false), 1800);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 hidden flex-col gap-3 rounded-2xl border border-white/10 bg-black/70 p-4 text-sm text-white shadow-xl shadow-black/40 transition md:flex ${
        showControls ? "opacity-100" : "opacity-80"
      }`}
      onMouseEnter={() => {
        if (hideControlsTimeout.current) {
          clearTimeout(hideControlsTimeout.current);
        }
        setShowControls(true);
      }}
      onMouseLeave={() => scheduleHideControls()}
    >
      <button
        type="button"
        onClick={togglePlay}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition hover:bg-white/20"
      >
        {isPlaying ? "Pause ambience" : "Play ambience"}
      </button>

      {showControls && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Volume</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <div className="relative h-2 rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E8C55B] transition-[width]"
              style={{ width: `${volume * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(event) => setVolume(parseFloat(event.target.value))}
              className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
              aria-label="Ambient track volume"
            />
          </div>
        </div>
      )}

      {hasError && <p className="text-xs text-red-300">{errorMessage}</p>}
    </div>
  );
}
