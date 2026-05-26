import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/content/blog';
import { listSeries } from '@/lib/content/tutorials';
import { PostCard } from '@/components/blog/post-card';
import { SeriesCard } from '@/components/tutorials/series-card';
import { blogIndexPath, tutorialsIndexPath } from '@/lib/locale-path';
import type { Locale } from '@/lib/content/types';

/**
 * Homepage module that surfaces the latest blog posts and tutorial
 * series so visitors landing on the homepage can discover content
 * without going through navigation.
 *
 * Server component: pulls data at build time, then renders. When there
 * is no content for a section (e.g. empty blog or empty tutorial set),
 * that section is silently omitted so the homepage never shows a half-
 * empty module.
 */
export async function LatestContent({ locale }: { locale: Locale }) {
  const [posts, series, t] = await Promise.all([
    getAllPosts(locale),
    listSeries(),
    getTranslations({ locale }),
  ]);

  const latestPosts = posts.slice(0, 3);
  const featuredSeries = series.slice(0, 3);

  if (latestPosts.length === 0 && featuredSeries.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {latestPosts.length > 0 ? (
          <div>
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {t('blog.latestTitle')}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('blog.latestSubtitle')}
                </p>
              </div>
              <Link
                href={blogIndexPath(locale)}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 transition-colors"
              >
                {t('blog.seeAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                  minReadLabel={(n: number) =>
                    t('blog.minRead', { n })
                  }
                />
              ))}
            </div>
          </div>
        ) : null}

        {featuredSeries.length > 0 ? (
          <div>
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {t('tutorials.featuredTitle')}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('tutorials.featuredSubtitle')}
                </p>
              </div>
              <Link
                href={tutorialsIndexPath(locale)}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 transition-colors"
              >
                {t('tutorials.seeAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredSeries.map((s) => (
                <SeriesCard
                  key={s.slug}
                  series={s}
                  locale={locale}
                  title={t(s.titleKey)}
                  description={t(s.descriptionKey)}
                  stepsLabel={t('tutorials.totalSteps', {
                    n: s.steps.length,
                  })}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
