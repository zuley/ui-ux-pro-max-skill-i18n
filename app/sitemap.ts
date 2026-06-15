import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { docsNav } from '@/content/docs/nav';
import { listAllSlugs, getAllPosts } from '@/lib/content/blog';
import { listSeries, getSeriesSteps } from '@/lib/content/tutorials';
import type { Locale } from '@/lib/content/types';
import { SITE_URL } from '@/lib/site-config';

// Required when next.config.ts uses output: 'export'. Without it the
// sitemap route is treated as dynamic and the build fails.
export const dynamic = 'force-static';


function abs(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${locale}${path}`;
}

function alternatesFor(path: string): {
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {
    // Fallback for users whose language isn't en/zh/vi/ja — the en root.
    'x-default': abs(routing.defaultLocale, path),
  };
  for (const l of routing.locales) {
    languages[l] = abs(l, path);
  }
  return { languages };
}

/**
 * Static sitemap covering every route the export emits — home, legal,
 * docs, blog, and tutorials — across all locales. Per-route lastModified
 * comes from frontmatter `date` where available so re-publishes propagate
 * to crawlers.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const today = new Date();

  // Marketing + legal routes — same for every locale.
  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/about', priority: 0.5, freq: 'monthly' },
    { path: '/contact', priority: 0.4, freq: 'yearly' },
    { path: '/privacy', priority: 0.3, freq: 'yearly' },
    { path: '/terms', priority: 0.3, freq: 'yearly' },
    { path: '/blog', priority: 0.8, freq: 'weekly' },
    { path: '/tutorials', priority: 0.8, freq: 'weekly' },
  ];
  for (const { path, priority, freq } of staticPaths) {
    for (const locale of routing.locales) {
      entries.push({
        url: abs(locale, path),
        lastModified: today,
        changeFrequency: freq,
        priority,
        alternates: alternatesFor(path),
      });
    }
  }

  // Docs slugs (handled by the existing static docs route — included for
  // completeness so crawlers see the full set).
  for (const doc of docsNav) {
    const path = `/docs/${doc.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: abs(locale, path),
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: alternatesFor(path),
      });
    }
  }

  // Blog posts. Load default-locale posts once and index by slug so the
  // per-slug loop is O(1) lookup instead of re-parsing every MDX file on
  // every iteration (was O(N²) on disk reads at content-set scale).
  const slugs = await listAllSlugs();
  const defaultLocalePosts = await getAllPosts(routing.defaultLocale as Locale);
  const postBySlug = new Map(defaultLocalePosts.map((p) => [p.slug, p]));
  for (const slug of slugs) {
    const path = `/blog/${slug}`;
    const meta = postBySlug.get(slug);
    const lastModified = meta ? new Date(meta.frontmatter.date) : today;
    for (const locale of routing.locales) {
      entries.push({
        url: abs(locale, path),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: alternatesFor(path),
      });
    }
  }

  // Tutorials — series landing + each step.
  const series = await listSeries();
  for (const s of series) {
    const seriesPath = `/tutorials/${s.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: abs(locale, seriesPath),
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: alternatesFor(seriesPath),
      });
    }

    const steps = await getSeriesSteps(routing.defaultLocale as Locale, s.slug);
    for (const step of steps) {
      const stepPath = `/tutorials/${s.slug}/${step.stepSlug}`;
      const lastModified = new Date(step.frontmatter.date);
      for (const locale of routing.locales) {
        entries.push({
          url: abs(locale, stepPath),
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: alternatesFor(stepPath),
        });
      }
    }
  }

  return entries;
}
