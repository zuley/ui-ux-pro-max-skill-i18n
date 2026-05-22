'use client';

import { useMemo, useState } from 'react';
import type { PostSummary } from '@/lib/content/types';
import { PostCard } from './post-card';

/**
 * Client-side tag filter. Receives the full set of posts pre-rendered
 * at build time and toggles cards in/out by `tag`. We do this in the
 * client (instead of separate /tag/<x> routes) to keep the static
 * export small and the interaction instant.
 */
export function TagFilter({
  posts,
  tags,
  locale,
  allLabel,
  emptyLabel,
  minReadLabel,
}: {
  posts: PostSummary[];
  tags: { tag: string; count: number }[];
  locale: string;
  allLabel: string;
  emptyLabel: string;
  minReadLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!active) return posts;
    return posts.filter((p) => p.frontmatter.tags.includes(active));
  }, [active, posts]);

  const formatMinRead = (n: number) =>
    minReadLabel.replace('{n}', String(n));

  return (
    <div>
      {tags.length > 0 ? (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={[
              'text-xs font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer',
              active === null
                ? 'bg-indigo-600 text-white'
                : 'bg-white/60 dark:bg-black/20 text-gray-700 dark:text-gray-200 border border-gray-200/70 dark:border-white/10 hover:bg-white/80 dark:hover:bg-black/30',
            ].join(' ')}
          >
            {allLabel} ({posts.length})
          </button>
          {tags.map((t) => (
            <button
              key={t.tag}
              type="button"
              onClick={() => setActive(t.tag)}
              className={[
                'text-xs font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer',
                active === t.tag
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/60 dark:bg-black/20 text-gray-700 dark:text-gray-200 border border-gray-200/70 dark:border-white/10 hover:bg-white/80 dark:hover:bg-black/30',
              ].join(' ')}
            >
              {t.tag} ({t.count})
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-white/10 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
          {emptyLabel}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              minReadLabel={formatMinRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
