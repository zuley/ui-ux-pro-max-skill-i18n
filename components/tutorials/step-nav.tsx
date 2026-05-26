import Link from 'next/link';
import { tutorialStepPath } from '@/lib/locale-path';

type StepRef = { seriesSlug: string; stepSlug: string; title?: string };

/**
 * Previous / next navigator shown at the bottom of every step. Mirrors
 * the look of the docs prev/next block for visual consistency.
 */
export function StepNav({
  locale,
  prev,
  next,
  prevLabel,
  nextLabel,
}: {
  locale: string;
  prev?: StepRef;
  next?: StepRef;
  prevLabel: string;
  nextLabel: string;
}) {
  if (!prev && !next) return null;

  return (
    <div className="mt-10 pt-6 border-t border-gray-200/70 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {prev ? (
        <Link
          href={tutorialStepPath(locale, prev.seriesSlug, prev.stepSlug)}
          className="rounded-lg border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-black/20 p-4 hover:bg-white/80 dark:hover:bg-black/30 transition-colors cursor-pointer"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {prevLabel}
          </div>
          {prev.title ? (
            <div className="mt-1 font-heading font-semibold text-gray-900 dark:text-white">
              {prev.title}
            </div>
          ) : null}
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={tutorialStepPath(locale, next.seriesSlug, next.stepSlug)}
          className="rounded-lg border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-black/20 p-4 hover:bg-white/80 dark:hover:bg-black/30 transition-colors cursor-pointer text-left sm:text-right"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {nextLabel}
          </div>
          {next.title ? (
            <div className="mt-1 font-heading font-semibold text-gray-900 dark:text-white">
              {next.title}
            </div>
          ) : null}
        </Link>
      ) : null}
    </div>
  );
}
