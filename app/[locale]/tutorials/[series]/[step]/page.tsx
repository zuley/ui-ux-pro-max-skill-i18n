import type { Metadata } from 'next';
import {
  absoluteSiteUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_TWITTER_IMAGE_URL,
  SITE_URL
} from '@/lib/site-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft, Clock } from 'lucide-react';
import {
  getSeriesSteps,
  getStep,
  listAllStepParams,
  listSeries,
} from '@/lib/content/tutorials';
import { isFallback } from '@/lib/content/fallback';
import { getAuthor } from '@/lib/authors';
import { tutorialSeriesPath } from '@/lib/locale-path';
import { LocaleFallbackBanner } from '@/components/content/locale-fallback-banner';
import { ArticleJsonLd } from '@/components/content/article-jsonld';
import { ReadingProgress } from '@/components/content/reading-progress';
import { SeriesSidebar } from '@/components/tutorials/series-sidebar';
import { StepNav } from '@/components/tutorials/step-nav';
import type { Locale } from '@/lib/content/types';
import { toMetaDescription } from '@/lib/seo';

type PageParams = { locale: string; series: string; step: string };

export async function generateStaticParams() {
  const all = await listAllStepParams();
  return all.map(({ seriesSlug, stepSlug }) => ({
    series: seriesSlug,
    step: stepSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, series, step } = await params;
  const resolved = await getStep(locale as Locale, series, step);
  if (!resolved) return {};

  const currentUrl = absoluteSiteUrl(`/tutorials/${series}/${step}`, locale);
  const { title, summary, cover, date, updated, tags } = resolved.frontmatter;
  const metaDescription = toMetaDescription(summary);

  return {
    title,
    description: metaDescription,
    keywords: tags.join(', '),
    alternates: {
      canonical: currentUrl,
      languages: {
        'x-default': `${SITE_URL}/tutorials/${series}/${step}`,
        en: `${SITE_URL}/tutorials/${series}/${step}`,
        zh: `${SITE_URL}/zh/tutorials/${series}/${step}`,
        vi: `${SITE_URL}/vi/tutorials/${series}/${step}`,
        ja: `${SITE_URL}/ja/tutorials/${series}/${step}`,
      },
    },
    openGraph: {
      title,
      description: metaDescription,
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale,
      type: 'article',
      publishedTime: date,
      modifiedTime: updated ?? date,
      images: cover ? [{ url: cover }] : [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      images: cover ? [cover] : [DEFAULT_TWITTER_IMAGE_URL],
    },
  };
}

export default async function TutorialStepPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, series, step } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const resolved = await getStep(typedLocale, series, step, {
    includeBody: true,
  });
  if (!resolved || !resolved.Body) notFound();

  const t = await getTranslations({ locale });
  const author = getAuthor(resolved.frontmatter.author);
  const showFallback = isFallback(typedLocale, resolved.sourceLocale);
  const seriesMeta = (await listSeries()).find((s) => s.slug === series)!;
  const siblings = await getSeriesSteps(typedLocale, series);
  const canonicalUrl = absoluteSiteUrl(`/tutorials/${series}/${step}`, locale);

  // Use a local alias so TS treats Body as definitely-defined inside JSX.
  const Body = resolved.Body;

  const prev = resolved.prev
    ? {
        ...resolved.prev,
        title: siblings.find((s) => s.stepSlug === resolved.prev?.stepSlug)
          ?.frontmatter.title,
      }
    : undefined;
  const next = resolved.next
    ? {
        ...resolved.next,
        title: siblings.find((s) => s.stepSlug === resolved.next?.stepSlug)
          ?.frontmatter.title,
      }
    : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ReadingProgress />
      <ArticleJsonLd
        type="TechArticle"
        url={canonicalUrl}
        title={resolved.frontmatter.title}
        description={resolved.frontmatter.summary}
        datePublished={resolved.frontmatter.date}
        dateModified={resolved.frontmatter.updated}
        authorName={author.name}
        authorUrl={`${SITE_URL}/about`}
        inLanguage={locale}
        keywords={resolved.frontmatter.tags}
        image={resolved.frontmatter.cover ?? DEFAULT_OG_IMAGE_URL}
      />

      <Link
        href={tutorialSeriesPath(locale, series)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('tutorials.backToSeries')}
      </Link>

      <div className="mt-6 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <SeriesSidebar
              steps={siblings}
              locale={locale}
              activeStepSlug={step}
              title={t(seriesMeta.titleKey)}
            />
          </div>
        </aside>

        <main className="min-w-0">
          <article>
            {showFallback ? (
              <LocaleFallbackBanner message={t('tutorials.fallbackBanner')} />
            ) : null}

            <header>
              <div className="text-[11px] font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                {t('tutorials.stepLabel', {
                  n: resolved.index,
                  total: resolved.total,
                })}
              </div>
              <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                {resolved.frontmatter.title}
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {resolved.frontmatter.summary}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{author.name}</span>
                <span>
                  <time dateTime={resolved.frontmatter.date}>
                    {resolved.frontmatter.date}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {t('tutorials.minRead', { n: resolved.readingMinutes })}
                </span>
              </div>
            </header>

            <div className="mt-6">
              <Body />
            </div>

            <StepNav
              locale={locale}
              prev={prev}
              next={next}
              prevLabel={t('tutorials.prev')}
              nextLabel={t('tutorials.next')}
            />
          </article>
        </main>
      </div>
    </div>
  );
}
