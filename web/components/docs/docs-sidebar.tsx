'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { DocsNavItem, DocSlug } from '@/content/docs/nav';
import { docPath } from '@/lib/locale-path';

export function DocsSidebar({
  items,
  activeSlug,
  getTitle
}: {
  items: DocsNavItem[];
  activeSlug: DocSlug;
  getTitle: (key: string) => string;
}) {
  const locale = useLocale();

  return (
    <div className="glass-card p-4">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
        {getTitle('docs.sidebarTitle')}
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.slug === activeSlug;
          return (
            <Link
              key={item.slug}
              href={docPath(locale, item.slug)}
              className={[
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              ].join(' ')}
            >
              <div>{getTitle(item.titleKey)}</div>
              <div
                className={[
                  'text-xs mt-0.5',
                  isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                ].join(' ')}
              >
                {getTitle(item.descriptionKey)}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
