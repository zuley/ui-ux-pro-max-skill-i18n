import Link from 'next/link';
import { tutorialStepPath } from '@/lib/locale-path';
import type { TutorialStepSummary } from '@/lib/content/types';

/**
 * Vertical step list shown on the series landing page and rendered
 * compactly on detail pages. Uses the step's `index` field so the
 * numbering matches the meta.steps order even if frontmatter shifts.
 */
export function SeriesSidebar({
  steps,
  locale,
  activeStepSlug,
  title,
}: {
  steps: TutorialStepSummary[];
  locale: string;
  activeStepSlug?: string;
  title: string;
}) {
  return (
    <nav className="glass-card p-5">
      <div className="font-heading font-semibold text-sm text-gray-900 dark:text-white mb-3">
        {title}
      </div>
      <ol className="space-y-1.5">
        {steps.map((step) => {
          const active = step.stepSlug === activeStepSlug;
          return (
            <li key={step.stepSlug}>
              <Link
                href={tutorialStepPath(
                  locale,
                  step.seriesSlug,
                  step.stepSlug
                )}
                className={[
                  'flex items-start gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer',
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-200 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5',
                ].join(' ')}
              >
                <span className="font-mono text-[11px] mt-0.5 text-gray-400 dark:text-gray-500">
                  {String(step.index).padStart(2, '0')}
                </span>
                <span className="min-w-0 truncate">
                  {step.frontmatter.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
