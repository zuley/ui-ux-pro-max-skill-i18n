'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('common');

  const label = theme === 'dark' ? t('switchToLight') : t('switchToDark');

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      aria-label={label}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
