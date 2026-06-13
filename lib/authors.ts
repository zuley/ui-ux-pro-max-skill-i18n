/**
 * Single source of truth for content authors.
 *
 * MDX frontmatter references authors by their `id` (slug). When more
 * authors are added later, just append to this map — frontmatter and
 * pages continue to work without changes.
 */

import { SITE_URL } from '@/lib/site-config';

export type Author = {
  id: string;
  name: string;
  /** Optional short bio (single sentence). */
  bio?: string;
  /** Optional avatar path under /public. */
  avatar?: string;
  /** Optional external profile link. */
  url?: string;
};

export const AUTHORS: Record<string, Author> = {
  admin: {
    id: 'admin',
    name: 'Zley',
    bio: 'Independent developer. Builds and maintains the UI UX Pro Max Skill docs site, and writes about getting professional UI out of AI coding tools.',
    url: `${SITE_URL}/about/`,
  },
};

export const DEFAULT_AUTHOR_ID = 'admin';

export function getAuthor(id?: string | null): Author {
  if (id && AUTHORS[id]) return AUTHORS[id];
  return AUTHORS[DEFAULT_AUTHOR_ID]!;
}
