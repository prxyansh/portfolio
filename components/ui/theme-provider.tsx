'use client';

import clsx from 'clsx';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ThemeMode = 'night' | 'dusk';

interface ThemeContextValue {
  theme: ThemeMode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('night');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('obsidian-theme') as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored ?? (prefersDark ? 'night' : 'dusk'));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof document === 'undefined') return;
    const body = document.body;
    body.classList.remove('theme-night', 'theme-dusk');
    body.classList.add(`theme-${theme}`);
    window.localStorage.setItem('obsidian-theme', theme);
  }, [theme, hydrated]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'night' ? 'dusk' : 'night'));
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <ThemeToggle theme={theme} toggle={toggle} />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}

function ThemeToggle({ theme, toggle }: { theme: ThemeMode; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      className={clsx(
        'fixed bottom-6 left-6 z-[140] rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[0.6rem] uppercase tracking-[0.4em] backdrop-blur-xl transition hover:text-white/90',
        theme === 'dusk' ? 'text-white/85' : 'text-white/65'
      )}
    >
      {theme === 'night' ? 'Night' : 'Dusk'}
    </button>
  );
}
