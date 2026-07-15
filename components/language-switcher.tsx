'use client';

import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import {
  useState,
  useRef,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from 'react';

const languages = [
  { code: 'zh', name: '中文', short: '中' },
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'hi', name: 'हिन्दी', short: 'हि' },
  { code: 'vi', name: 'Tiếng Việt', short: 'VI' },
  { code: 'ja', name: '日本語', short: '日' }
];

export function LanguageSwitcher() {
  const locale = useLocale();
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

  const getLocalizedPath = (newLocale: string) => {
    let localeNeutralPath = pathname;

    for (const supportedLocale of routing.locales) {
      const localePrefix = `/${supportedLocale}`;
      if (localeNeutralPath === localePrefix) {
        localeNeutralPath = '/';
        break;
      }
      if (localeNeutralPath.startsWith(`${localePrefix}/`)) {
        localeNeutralPath = localeNeutralPath.slice(localePrefix.length);
        break;
      }
    }

    return newLocale === routing.defaultLocale
      ? localeNeutralPath
      : localeNeutralPath === '/'
        ? `/${newLocale}/`
        : `/${newLocale}${localeNeutralPath}`;
  };

  const handleLanguageChange = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    newLocale: string
  ) => {
    if (newLocale === locale) {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    // A locale change replaces the document language and root layout. Use a
    // full navigation so root-only beforeInteractive scripts are not mounted
    // again inside the current React client tree.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      setIsOpen(false);
      return;
    }

    event.preventDefault();
    const searchAndHash = `${window.location.search}${window.location.hash}`;

    window.location.replace(`${getLocalizedPath(newLocale)}${searchAndHash}`);
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
          window.requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus());
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
            const items = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('a'));
            const current = items.indexOf(document.activeElement as HTMLAnchorElement);
            const next = event.key === 'ArrowDown'
              ? (current + 1) % items.length
              : (current - 1 + items.length) % items.length;
            items[next]?.focus();
          }}
          className="absolute top-full right-0 z-[60] mt-2 max-h-[calc(100dvh-var(--announcement-height)-4.5rem)] w-48 overflow-y-auto overscroll-contain rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          {languages.map((lang) => (
            <a
              key={lang.code}
              href={getLocalizedPath(lang.code)}
              onClick={(event) => handleLanguageChange(event, lang.code)}
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
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
