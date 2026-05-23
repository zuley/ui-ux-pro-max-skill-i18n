import Link from 'next/link';
import { ArrowRight, Rss } from 'lucide-react';
import { blogIndexPath, localePath } from '@/lib/locale-path';

/**
 * Block shown at the bottom of every blog post. The article ending is
 * the last moment we have the reader's attention — without something
 * here, they bounce. Three intents in priority order:
 *   1. Primary CTA → install / try the product (the whole reason we
 *      have a blog at all).
 *   2. Subscribe (RSS) — for the reader who liked the article enough
 *      to want more without committing to the product yet.
 *   3. More posts — escape hatch back into the site for the reader
 *      who isn't sold by either of the above.
 */
export function EndOfArticleCta({
  locale,
  eyebrow,
  title,
  description,
  tryLabel,
  rssLabel,
  moreLabel,
  primaryHref = 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
}: {
  locale: string;
  eyebrow: string;
  title: string;
  description: string;
  tryLabel: string;
  rssLabel: string;
  moreLabel: string;
  primaryHref?: string;
}) {
  return (
    <aside className="mt-16 mb-4 rounded-2xl border border-gray-200/70 dark:border-white/10 bg-gradient-to-br from-indigo-50/80 via-white to-fuchsia-50/60 dark:from-indigo-500/10 dark:via-white/[0.02] dark:to-fuchsia-500/10 p-7 sm:p-9">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
        {eyebrow}
      </div>
      <h2 className="mt-2 font-heading text-2xl sm:text-[26px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-gray-700 dark:text-gray-300 max-w-[58ch]">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={primaryHref}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors cursor-pointer"
        >
          {tryLabel}
          <ArrowRight className="w-4 h-4" />
        </a>

        <a
          href={localePath(locale, '/blog/rss.xml')}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-300 transition-colors cursor-pointer"
        >
          <Rss className="w-3.5 h-3.5" />
          {rssLabel}
        </a>

        <Link
          href={blogIndexPath(locale)}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          {moreLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
