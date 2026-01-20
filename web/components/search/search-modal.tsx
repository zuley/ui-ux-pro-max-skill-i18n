'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Search, X } from 'lucide-react';
import { docsNav } from '@/content/docs/nav';
import { useTranslations } from 'next-intl';

type SearchItem = {
  title: string;
  href: string;
  keywords?: string[];
};

function buildDefaultItems(t: (key: string) => string): SearchItem[] {
  const homeItems: SearchItem[] = [
    { title: t('navbar.examples'), href: '/#styles', keywords: ['gallery', 'styles', 'demos'] }
  ];

  const docItems: SearchItem[] = docsNav.map((n) => ({
    title: t(n.titleKey),
    href: `/docs/${n.slug}`,
    keywords: [n.slug]
  }));

  return [...docItems, ...homeItems];
}

export function SearchModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  const items = useMemo(() => buildDefaultItems(t), [t]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);

    return items
      .map((item) => {
        const haystack = [item.title, ...(item.keywords ?? [])].join(' ').toLowerCase();
        const score = haystack.includes(q) ? haystack.indexOf(q) : -1;
        return { item, score };
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((r) => r.item);
  }, [items, query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('search.title')}
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6"
    >
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
        aria-label={t('search.close')}
      />

      <div className="relative w-full max-w-2xl glass-card p-0 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200/70 dark:border-white/10">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label={t('search.close')}
          >
            <X className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto p-2">
          {results.length === 0 ? (
            <div className="px-3 py-10 text-center text-sm text-gray-600 dark:text-gray-400">
              {t('search.noResults')}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {results.map((r) => (
                <button
                  key={r.href}
                  type="button"
                  onClick={() => {
                    router.push(r.href);
                    onClose();
                  }}
                  className="text-left rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {r.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {r.href}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-200/70 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <span>{t('search.hint')}</span>
          <span className="font-mono">Esc</span>
        </div>
      </div>
    </div>
  );
}
