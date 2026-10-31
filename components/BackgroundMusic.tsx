"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SRC = "/audio/bgm.mp3?v=2";
const VOLUME = 0.04;
const FADE_IN = 2.5;
/** Skip the intro and loop from 0:20 through the end of the track. */
const START_AT = 20;

/** Events that count as a user gesture, which browsers require before audio may start. */
const UNLOCK_EVENTS = ["pointerdown", "pointerup", "keydown", "touchend", "click"] as const;

/**
 * Loops /audio/bgm.mp3 from 0:20 through the end, gaplessly via Web Audio.
 * Playback starts as soon as the browser allows it: immediately if autoplay is permitted,
 * otherwise on the visitor's first tap, click or key press.
 */
export function BackgroundMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const mutedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    ctxRef.current = ctx;
    gainRef.current = gain;
    let cancelled = false;
    let faded = false;

    const fadeIn = () => {
      if (faded || ctx.state !== "running") return;
      faded = true;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + FADE_IN);
    };

    const onState = () => {
      setPlaying(ctx.state === "running");
      fadeIn();
    };
    ctx.addEventListener("statechange", onState);

    const unlock = () => {
      if (mutedRef.current || ctx.state === "running") return;
      ctx.resume().then(removeUnlock, () => {});
    };
    const removeUnlock = () => UNLOCK_EVENTS.forEach((e) => window.removeEventListener(e, unlock));
    UNLOCK_EVENTS.forEach((e) => window.addEventListener(e, unlock));

    const onVisibility = () => {
      if (mutedRef.current) return;
      if (document.hidden) ctx.suspend();
      else ctx.resume().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    fetch(SRC)
      .then((r) => r.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        if (cancelled) return;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const startAt = Math.min(START_AT, Math.max(0, buffer.duration - 0.05));
        source.loop = true;
        source.loopStart = startAt;
        source.loopEnd = buffer.duration;
        source.connect(gain);
        source.start(0, startAt);
        setReady(true);
        ctx.resume().catch(() => {});
        fadeIn();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      removeUnlock();
      document.removeEventListener("visibilitychange", onVisibility);
      ctx.removeEventListener("statechange", onState);
      ctx.close();
    };
  }, []);

  const toggle = () => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    if (playing) {
      mutedRef.current = true;
      ctx.suspend();
    } else {
      mutedRef.current = false;
      ctx.resume().then(() => {
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + 0.8);
      });
    }
  };

  return (
    <AnimatePresence>
      {ready && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Mute background music" : "Play background music"}
          aria-pressed={playing}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full border border-forest/15 bg-cream/85 text-forest shadow-[0_10px_30px_-12px_rgba(24,43,40,0.45)] backdrop-blur-md lg:bottom-8 lg:right-8"
        >
          {playing ? (
            <span className="relative flex items-center justify-center">
              <motion.span
                aria-hidden
                className="absolute size-11 rounded-full border border-forest/25"
                animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <Volume2 size={18} strokeWidth={1.6} />
            </span>
          ) : (
            <VolumeX size={18} strokeWidth={1.6} />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
