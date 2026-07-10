'use client';

import { useTranslations } from 'next-intl';

export function SkipLink() {
  const t = useTranslations('common');

  return (
    <a
      href="#main-content"
      className="fixed left-3 top-3 z-[200] -translate-y-24 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
    >
      {t('skipToContent')}
    </a>
  );
}
