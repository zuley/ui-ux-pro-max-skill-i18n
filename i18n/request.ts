import { getRequestConfig } from 'next-intl/server';
import { resolveCatalogMessages } from '@/lib/upstream-content';
import { routing } from './routing';

type AppLocale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as AppLocale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: resolveCatalogMessages((await import(`../messages/${locale}.json`)).default),
    timeZone: 'UTC',
    now: new Date()
  };
});
