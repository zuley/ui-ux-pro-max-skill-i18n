import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tutorialSeriesPath } from '@/lib/locale-path';
import type { TutorialSeriesMeta } from '@/lib/content/types';

/**
 * Series card on the Tutorials index. Step count comes from meta.steps
 * length; localised title/description come from i18n keys so the card
 * renders correctly across all four locales without per-series JSON.
 */
export function SeriesCard({
  series,
  locale,
  title,
  description,
  stepsLabel,
}: {
  series: TutorialSeriesMeta;
  locale: string;
  title: string;
  description: string;
  stepsLabel: string;
}) {
  return (
    <Link
      href={tutorialSeriesPath(locale, series.slug)}
      className="group glass-card p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="text-[11px] font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
        {stepsLabel}
      </div>

      <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
        {description}
      </p>

      <div className="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300">
        Start <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
