/**
 * Single source of truth for content authors.
 *
 * MDX frontmatter references authors by their `id` (slug). When more
 * authors are added later, just append to this map — frontmatter and
 * pages continue to work without changes.
 */

import { SITE_PUBLISHER_NAME, SITE_URL } from '@/lib/site-config';

export type Author = {
  id: string;
  name: string;
  type: 'Person' | 'Organization';
  /** Optional short bio (single sentence). */
  bio?: string;
  /** Optional avatar path under /public. */
  avatar?: string;
  /** Optional external profile link. */
  url?: string;
};

export const AUTHORS: Record<string, Author> = {
  team: {
    id: 'team',
    name: SITE_PUBLISHER_NAME,
    type: 'Organization',
    bio: 'An independent translation team that is not affiliated with or endorsed by the original UI UX Pro Max Skill project.',
    url: SITE_URL,
  },
};

export const DEFAULT_AUTHOR_ID = 'team';

export function getAuthor(id?: string | null): Author {
  if (id && AUTHORS[id]) return AUTHORS[id];
  return AUTHORS[DEFAULT_AUTHOR_ID]!;
}
