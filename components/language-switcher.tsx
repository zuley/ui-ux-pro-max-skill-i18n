'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'zh', name: '中文', short: '中' },
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'vi', name: 'Tiếng Việt', short: 'VI' },
  { code: 'ja', name: '日本語', short: '日' }
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClose(event: MouseEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent) {
        if (event.key !== 'Escape') return;
        setIsOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown') return;
          event.preventDefault();
          setIsOpen(true);
          window.requestAnimationFrame(() => menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus());
        }}
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        aria-label={t('switchLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="language-menu"
      >
        <Languages className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id="language-menu"
          role="menu"
          onKeyDown={(event) => {
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
            event.preventDefault();
            const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
            const current = items.indexOf(document.activeElement as HTMLButtonElement);
            const next = event.key === 'ArrowDown'
              ? (current + 1) % items.length
              : (current - 1 + items.length) % items.length;
            items[next]?.focus();
          }}
          className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              role="menuitemradio"
              aria-checked={locale === lang.code}
              className={`min-h-11 w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                locale === lang.code ? 'bg-gray-100 dark:bg-gray-700/60' : ''
              }`}
            >
              <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-100">{lang.short}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
