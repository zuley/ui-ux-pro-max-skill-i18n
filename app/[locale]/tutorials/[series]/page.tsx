import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { listSeries, getSeriesSteps } from '@/lib/content/tutorials';
import {
  tutorialsIndexPath,
  tutorialStepPath,
} from '@/lib/locale-path';
import type { Locale } from '@/lib/content/types';

type PageParams = { locale: string; series: string };

export async function generateStaticParams() {
  const series = await listSeries();
  return series.map((s) => ({ series: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, series } = await params;
  const all = await listSeries();
  const meta = all.find((s) => s.slug === series);
  if (!meta) return {};
  const t = await getTranslations({ locale });

  const currentUrl =
    locale === 'en'
      ? `${SITE_URL}/tutorials/${series}`
      : `${SITE_URL}/${locale}/tutorials/${series}`;

  return {
    title: `${t(meta.titleKey)} | UI UX Pro Max Skill`,
    description: t(meta.descriptionKey),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/tutorials/${series}`,
        zh: `${SITE_URL}/zh/tutorials/${series}`,
        vi: `${SITE_URL}/vi/tutorials/${series}`,
        ja: `${SITE_URL}/ja/tutorials/${series}`,
      },
    },
  };
}

export default async function TutorialSeriesPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, series } = await params;
  setRequestLocale(locale);

  const all = await listSeries();
  const meta = all.find((s) => s.slug === series);
  if (!meta) notFound();

  const t = await getTranslations({ locale });
  const steps = await getSeriesSteps(locale as Locale, series);

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <Link
        href={tutorialsIndexPath(locale)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('tutorials.backToIndex')}
      </Link>

      <header className="mt-6">
        <div className="text-[11px] font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
          {t('tutorials.totalSteps', { n: meta.steps.length })}
        </div>
        <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t(meta.titleKey)}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {t(meta.descriptionKey)}
        </p>
      </header>

      <ol className="mt-8 space-y-3">
        {steps.map((step) => (
          <li key={step.stepSlug}>
            <Link
              href={tutorialStepPath(locale, series, step.stepSlug)}
              className="group flex items-start gap-4 rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-black/20 p-4 hover:bg-white/80 dark:hover:bg-black/30 transition-colors cursor-pointer"
            >
              <span className="font-mono text-xs mt-1 text-gray-400 dark:text-gray-500 w-6 shrink-0">
                {String(step.index).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-heading font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  {step.frontmatter.title}
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {step.frontmatter.summary}
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  {t('tutorials.minRead', { n: step.readingMinutes })}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 mt-1 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
