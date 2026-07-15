import { SITE_URL } from '@/lib/site-config';
import { routing } from '@/i18n/routing';
export type LegalSlug = 'privacy' | 'terms' | 'contact' | 'about';


export function legalCanonicalUrl(locale: string, slug: LegalSlug) {
  return locale === 'en' ? `${SITE_URL}/${slug}/` : `${SITE_URL}/${locale}/${slug}/`;
}

export function legalLanguageAlternates(slug: LegalSlug) {
  return Object.fromEntries([
    ['x-default', legalCanonicalUrl(routing.defaultLocale, slug)],
    ...routing.locales.map((locale) => [locale, legalCanonicalUrl(locale, slug)]),
  ]);
}
