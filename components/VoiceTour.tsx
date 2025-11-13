"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { heroCopy } from "@/lib/canonicalCopy";
import { LANGUAGE_COUNT } from "@/lib/languageStats";

type VoiceStatus = "idle" | "playing" | "paused" | "unsupported" | "error";

export default function VoiceTour() {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechSupportedRef = useRef(false);

  const script = useMemo(() => [
    `Welcome to PRAVIEL. ${heroCopy.eyebrow}. We currently steward ${LANGUAGE_COUNT} ancient languages with zero hallucinated glosses.`,
    "Egypt: Glyph-level tutors trace every determinative and mirror papyrus fibers so your eyes never lose contrast under torchlight.",
    "Greece: Meter guides keep Homer's dactylic hexameter honest while nomina sacra and scholia overlays float beside the text.",
    "Rome: Scriptio continua toggles, morphology heatmaps, and research-grade exports let you brief professors straight from the Aeneid.",
    "Privacy-first infrastructure means you can run offline or bring your own key without telemetry.",
  ], []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    speechSupportedRef.current = "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined";
    if (!speechSupportedRef.current) {
      setStatus("unsupported");
    }
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const playScript = () => {
    if (!speechSupportedRef.current) {
      setStatus("unsupported");
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(script.join(" "));
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 0.95;
    utterance.volume = 1;
    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("error");

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setStatus("playing");
  };

  const pauseScript = () => {
    if (!speechSupportedRef.current) return;
    window.speechSynthesis.pause();
    setStatus("paused");
  };

  const resumeScript = () => {
    if (!speechSupportedRef.current) return;
    window.speechSynthesis.resume();
    setStatus("playing");
  };

  const stopScript = () => {
    if (!speechSupportedRef.current) return;
    window.speechSynthesis.cancel();
    setStatus("idle");
  };

  const showResume = status === "paused";
  const showPause = status === "playing";

  return (
    <section
      id="voice-tour"
      className="relative px-4 sm:px-6 py-16 sm:py-24 md:py-32"
      aria-labelledby="voice-tour-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1222]/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-black/60 p-6 sm:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl scroll-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8C55B]">Audio tour</p>
            <h2 id="voice-tour-title" className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Let the ancients narrate the interface
            </h2>
            <p className="mt-3 text-sm text-zinc-300 sm:text-base">
              Uses the browser Speech Synthesis API so nothing leaves your device.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={playScript}
              className="rounded-full border border-[#E8C55B]/40 bg-[#E8C55B]/10 px-4 py-2 text-sm font-semibold text-white uppercase tracking-[0.3em]"
              disabled={status === "playing" || status === "unsupported"}
            >
              Play
            </button>
            {showPause ? (
              <button
                type="button"
                onClick={pauseScript}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200"
              >
                Pause
              </button>
            ) : null}
            {showResume ? (
              <button
                type="button"
                onClick={resumeScript}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200"
              >
                Resume
              </button>
            ) : null}
            <button
              type="button"
              onClick={stopScript}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200"
            >
              Stop
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {script.map((segment, index) => (
            <p key={`segment-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
              {segment}
            </p>
          ))}
        </div>

        <p
          className="mt-4 text-xs text-zinc-500"
          role="status"
          aria-live="polite"
        >
          Status:{" "}
          {status === "unsupported"
            ? "Speech synthesis not available on this device."
            : status}
        </p>
      </div>
    </section>
  );
}
