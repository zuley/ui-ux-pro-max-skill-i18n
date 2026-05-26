'use client';

import { useEffect, useState } from 'react';
import type { TocHeading } from '@/lib/content/toc';

/**
 * Sticky right-rail TOC shown on the article detail page at ≥1024px.
 * Highlights the section currently nearest the top of the viewport via
 * IntersectionObserver, so the reader sees where they are without a
 * scroll handler running on every frame.
 *
 * H3 entries get a left indent and a smaller weight so the h2 spine
 * stays scannable when sections nest.
 */
export function ArticleToc({
  items,
  title,
}: {
  items: TocHeading[];
  title: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    // Two horizontal bands frame the "currently reading" window. The
    // top margin matches the fixed-navbar height; the bottom margin
    // shrinks the window so a section only counts once it really sits
    // near the top of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top
          );
          setActiveId(visible[0]!.target.id);
        }
      },
      { rootMargin: '-112px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={title}>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
        {title}
      </div>
      <ul className="space-y-1 border-l border-gray-200 dark:border-white/10">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={[
                  'block -ml-px border-l py-1 transition-colors',
                  item.level === 3 ? 'pl-6 text-[12.5px]' : 'pl-4 text-[13px]',
                  active
                    ? 'border-indigo-500 text-indigo-700 dark:text-indigo-200 font-medium'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                ].join(' ')}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
