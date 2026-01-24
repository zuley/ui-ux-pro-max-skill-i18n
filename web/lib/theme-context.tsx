'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (x?: number, y?: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => { }
});

const THEME_KEY = 'theme';
const THEME_EVENT = 'themechange';

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

function subscribeTheme(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => { };

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
  } catch { }
  window.dispatchEvent(new Event(THEME_EVENT));
}

// 圆形扩展动画函数
function animateThemeTransition(x: number, y: number, isDark: boolean, callback: () => void) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    callback();
    return;
  }

  // 检查是否支持 View Transitions API
  if ('startViewTransition' in document) {
    // 设置 CSS 变量来控制圆形扩展的中心点
    const xPercent = (x / window.innerWidth) * 100;
    const yPercent = (y / window.innerHeight) * 100;

    document.documentElement.style.setProperty('--x', `${xPercent}%`);
    document.documentElement.style.setProperty('--y', `${yPercent}%`);

    const transition = (document as any).startViewTransition(() => {
      callback();
    });
    return;
  }

  // 降级方案：使用 CSS clip-path 动画
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // 创建遮罩层
  const clipPath = document.createElement('div');
  clipPath.style.position = 'fixed';
  clipPath.style.top = '0';
  clipPath.style.left = '0';
  clipPath.style.width = '100vw';
  clipPath.style.height = '100vh';
  clipPath.style.borderRadius = '50%';
  clipPath.style.background = isDark ? '#ffffff' : '#0a0a0a';
  clipPath.style.transformOrigin = `${x}px ${y}px`;
  clipPath.style.clipPath = `circle(0px at ${x}px ${y}px)`;
  clipPath.style.zIndex = '9999';
  clipPath.style.pointerEvents = 'none';
  clipPath.style.transition = 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

  document.body.appendChild(clipPath);

  // 触发动画
  requestAnimationFrame(() => {
    clipPath.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;
  });

  // 在动画中途切换主题
  setTimeout(() => {
    callback();
  }, 300);

  // 动画结束后移除遮罩
  setTimeout(() => {
    clipPath.remove();
  }, 600);
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

  const toggleTheme = (x?: number, y?: number) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    if (x !== undefined && y !== undefined) {
      // 使用圆形扩展动画
      animateThemeTransition(x, y, theme === 'light', () => {
        writeTheme(newTheme);
      });
    } else {
      // 直接切换（无动画）
      writeTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
