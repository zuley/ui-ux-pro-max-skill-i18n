import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/content/blog';
import { listSeries, getSeriesSteps } from '@/lib/content/tutorials';
import {
  blogPostPath,
  tutorialSeriesPath,
  tutorialStepPath,
} from '@/lib/locale-path';
import type { Locale } from '@/lib/content/types';

export type SearchIndexItem = {
  title: string;
  href: string;
  kind: 'blog' | 'tutorial-series' | 'tutorial-step';
  keywords?: string[];
};

/**
 * Builds the cross-locale search index at build time. Pulled in via
 * the locale layout so it ships once per page render and stays in
 * sync with whatever content is on disk.
 */
export async function buildSearchIndex(
  locale: Locale
): Promise<SearchIndexItem[]> {
  const items: SearchIndexItem[] = [];
  const t = await getTranslations({ locale });

  const posts = await getAllPosts(locale);
  for (const post of posts) {
    items.push({
      title: post.frontmatter.title,
      href: blogPostPath(locale, post.slug),
      kind: 'blog',
      keywords: ['blog', post.slug, ...post.frontmatter.tags],
    });
  }

  const series = await listSeries();
  for (const s of series) {
    items.push({
      title: t(s.titleKey),
      href: tutorialSeriesPath(locale, s.slug),
      kind: 'tutorial-series',
      keywords: ['tutorial', 'series', s.slug],
    });

    const steps = await getSeriesSteps(locale, s.slug);
    for (const step of steps) {
      items.push({
        title: step.frontmatter.title,
        href: tutorialStepPath(locale, s.slug, step.stepSlug),
        kind: 'tutorial-step',
        keywords: [
          'tutorial',
          s.slug,
          step.stepSlug,
          ...step.frontmatter.tags,
        ],
      });
    }
  }

  return items;
}
