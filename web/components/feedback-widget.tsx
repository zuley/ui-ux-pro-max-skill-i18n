'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy, ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react';

type Vote = 'up' | 'down' | null;

export function FeedbackWidget({
  pageTitle,
  pagePath
}: {
  pageTitle: string;
  pagePath: string;
}) {
  const t = useTranslations('feedback');
  const storageKey = `feedback:draft:${pagePath}`;
  const [draft, setDraft] = useState<{ vote: Vote; message: string }>(() => {
    if (typeof window === 'undefined') return { vote: null, message: '' };
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return { vote: null, message: '' };
      const parsed = JSON.parse(raw) as { vote?: Vote; message?: string };
      return { vote: parsed.vote ?? null, message: parsed.message ?? '' };
    } catch {
      return { vote: null, message: '' };
    }
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft));
    } catch {}
  }, [draft, storageKey]);

  const vote = draft.vote;
  const message = draft.message;

  const body = useMemo(() => {
    const lines = [
      `Page: ${pagePath}`,
      `Vote: ${vote ?? 'n/a'}`,
      '',
      'Feedback:',
      message.trim() || '(empty)'
    ];
    return lines.join('\n');
  }, [message, pagePath, vote]);

  const issueUrl = useMemo(() => {
    const title = encodeURIComponent(`${t('issueTitlePrefix')} ${pageTitle}`);
    const encodedBody = encodeURIComponent(body);
    return `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues/new?title=${title}&body=${encodedBody}`;
  }, [body, pageTitle, t]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-10 glass-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-heading font-bold text-gray-900 dark:text-white">
            {t('title')}
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {t('privacy')}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setDraft((prev) => ({ ...prev, vote: 'up' }))}
          className={[
            'inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer',
            vote === 'up'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white/70 dark:bg-black/20 text-gray-700 dark:text-gray-200 border-gray-200/70 dark:border-white/10 hover:bg-white/90 dark:hover:bg-black/30'
          ].join(' ')}
        >
          <ThumbsUp className="w-4 h-4" />
          {t('helpful')}
        </button>

        <button
          type="button"
          onClick={() => setDraft((prev) => ({ ...prev, vote: 'down' }))}
          className={[
            'inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer',
            vote === 'down'
              ? 'bg-rose-600 text-white border-rose-600'
              : 'bg-white/70 dark:bg-black/20 text-gray-700 dark:text-gray-200 border-gray-200/70 dark:border-white/10 hover:bg-white/90 dark:hover:bg-black/30'
          ].join(' ')}
        >
          <ThumbsDown className="w-4 h-4" />
          {t('notHelpful')}
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t('detailsLabel')}
        </label>
        <textarea
          value={message}
          onChange={(e) => setDraft((prev) => ({ ...prev, message: e.target.value }))}
          rows={4}
          className="mt-2 w-full rounded-lg border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('detailsPlaceholder')}
        />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-black/30 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          {t('copy')}
        </button>

        <a
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          {t('openIssue')}
        </a>
      </div>
    </div>
  );
}
