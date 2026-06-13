import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh', 'vi', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

/**
 * Locales that live under a `/<locale>` URL prefix. The default locale
 * (en) is served at the root by the `app/(en)` route group instead, so
 * the `app/[locale]` tree must NOT generate pages for it — otherwise the
 * export emits a duplicate `/en/*` copy of the whole site.
 */
export const prefixedLocales = routing.locales.filter(
  (locale) => locale !== routing.defaultLocale
);

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
