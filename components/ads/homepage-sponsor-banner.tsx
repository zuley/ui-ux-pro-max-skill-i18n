'use client';

import { useLocale, useTranslations } from 'next-intl';

const QODER_CHINESE_URL = 'https://www.aliyun.com/product/lingma?userCode=fpwwf33z';
const QODER_GLOBAL_URL = 'https://www.aliyun.com/product/qoder?userCode=fpwwf33z';

export function HomepageSponsorBanner() {
  const locale = useLocale();
  const t = useTranslations('announcement');
  const sponsorUrl = locale === 'zh' ? QODER_CHINESE_URL : QODER_GLOBAL_URL;

  return (
    <aside
      aria-label={t('adLabel')}
      className="absolute left-1/2 top-[calc(var(--announcement-height)+4.25rem)] z-20 w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 min-[400px]:top-[calc(var(--announcement-height)+5rem)] sm:top-[calc(var(--announcement-height)+5.25rem)]"
    >
      <a
        href={sponsorUrl}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        referrerPolicy="no-referrer"
        data-ad-placement="home-hero-banner"
        className="group flex min-h-20 w-full items-center justify-center px-4 py-3 text-center transition duration-200 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:min-h-24 sm:px-6"
      >
        <span className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-100 sm:text-base">
          <span className="text-[10px] font-bold tracking-wide text-blue-600 dark:text-blue-300 sm:text-xs">
            {t('adLabel')}
          </span>
          <span className="font-semibold">{t('adText')}</span>
          <span className="font-bold text-blue-600 underline decoration-blue-300 underline-offset-4 transition-colors group-hover:text-blue-700 dark:text-blue-300 dark:decoration-blue-500 dark:group-hover:text-blue-200">
            {t('adCta')}
          </span>
        </span>
      </a>
    </aside>
  );
}
