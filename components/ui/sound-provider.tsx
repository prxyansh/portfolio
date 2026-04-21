'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type SoundCue = 'hover' | 'modal' | 'timeline';

interface SoundContextValue {
  enabled: boolean;
  play: (cue: SoundCue) => void;
  toggle: () => void;
}

const cueShapes: Record<SoundCue, { start: number; end: number; duration: number; gain: number }> = {
  hover: { start: 1200, end: 1400, duration: 0.08, gain: 0.12 },
  modal: { start: 800, end: 1200, duration: 0.15, gain: 0.15 },
  timeline: { start: 1000, end: 1600, duration: 0.12, gain: 0.13 },
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<AudioContext | null>(null);
  const motionQuery = useRef<MediaQueryList | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('obsidian-sound');
    motionQuery.current = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduce = motionQuery.current.matches;
    setEnabled(stored ? stored === 'on' : !prefersReduce);
    setHydrated(true);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setEnabled(false);
      }
    };

    motionQuery.current.addEventListener('change', handleMotionChange);
    return () => motionQuery.current?.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    window.localStorage.setItem('obsidian-sound', enabled ? 'on' : 'off');
  }, [enabled, hydrated]);

  const ensureContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioRef.current) {
      const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      audioRef.current = AudioCtor ? new AudioCtor() : null;
    }
    if (audioRef.current && audioRef.current.state === 'suspended') {
      void audioRef.current.resume();
    }
    return audioRef.current;
  }, []);

  const play = useCallback(
    (cue: SoundCue) => {
      if (!enabled) return;
      const audioContext = ensureContext();
      if (!audioContext) return;

      const shape = cueShapes[cue];
      const now = audioContext.currentTime;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(shape.start, now);
      filter.Q.value = 8;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(shape.gain, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + shape.duration);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(shape.start, now);
      osc.frequency.exponentialRampToValueAtTime(shape.end, now + shape.duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(now);
      osc.stop(now + shape.duration + 0.05);
    },
    [enabled, ensureContext]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
  }, []);

  const value = useMemo(() => ({ enabled, play, toggle }), [enabled, play, toggle]);

  return (
    <SoundContext.Provider value={value}>
      {children}
      <SoundToggle enabled={enabled} toggle={toggle} />
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within SoundProvider');
  }
  return context;
}

function SoundToggle({ enabled, toggle }: { enabled: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      className="fixed bottom-6 right-6 z-[140] rounded-full border border-white/20 bg-white/5 px-5 py-2 text-[0.6rem] uppercase tracking-[0.4em] text-white/70 backdrop-blur-xl transition hover:text-white"
    >
      {enabled ? 'Sound On' : 'Sound Off'}
    </button>
  );
}
