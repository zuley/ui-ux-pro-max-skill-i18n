'use client';

import { useTranslations } from 'next-intl';

export function AnnouncementBar() {
  const t = useTranslations('announcement');

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600/95 text-white text-xs sm:text-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1 flex items-center justify-center gap-2">
        <span>{t('text')}</span>
        <a
          href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="underline underline-offset-2 hover:text-white/90 transition-colors"
        >
          {t('link')}
        </a>
      </div>
    </div>
  );
}
