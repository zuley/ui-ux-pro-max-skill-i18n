'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {}
});

const THEME_KEY = 'theme';
const THEME_EVENT = 'themechange';

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

function subscribeTheme(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {};

  const handler = () => onStoreChange();
  window.addEventListener('storage', handler);
  window.addEventListener(THEME_EVENT, handler);

  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(THEME_EVENT, handler);
  };
}

function writeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, readTheme, () => 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => writeTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
