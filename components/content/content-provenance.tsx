import { getTranslations } from 'next-intl/server';
import { OFFICIAL_PROJECT_URL, SITE_ISSUES_URL } from '@/lib/site-config';
import { UPSTREAM, UPSTREAM_README_URL } from '@/lib/upstream-content';
import type { BaseFrontmatter } from '@/lib/content/types';

export async function ContentProvenance({ locale, content }: {
  locale: string;
  content?: BaseFrontmatter;
}) {
  const t = await getTranslations({ locale, namespace: 'provenance' });
  const linkClass = 'underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-300';
  return (
    <aside className="my-6 space-y-2 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
      <p>{content ? t(content.contentKind === 'unverified' ? 'pending' : content.contentKind === 'editorial' ? 'editorial' : 'docsNote') : t('docsNote')}</p>
      {content?.contentKind === 'translation' && content.sourceUrl ? (
        <p>{t('translation')}: <a className={linkClass} href={content.sourceUrl} rel="noopener noreferrer" target="_blank">{content.sourceAuthor} · {content.sourceRef}</a></p>
      ) : !content ? (
        <p><a className={linkClass} href={UPSTREAM_README_URL} rel="noopener noreferrer" target="_blank">{t('reference')} · Next Level Builder · {UPSTREAM.release}</a></p>
      ) : null}
      <p>{t('checked')}: {content?.reviewedAt ?? UPSTREAM.checkedAt}</p>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <a className={linkClass} href={SITE_ISSUES_URL} target="_blank" rel="noopener noreferrer">{t('siteFeedback')}</a>
        <a className={linkClass} href={`${OFFICIAL_PROJECT_URL}/issues`} target="_blank" rel="noopener noreferrer">{t('upstreamFeedback')}</a>
      </div>
    </aside>
  );
}
