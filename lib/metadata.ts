import { routing } from '@/i18n/routing';
import { absoluteSiteUrl } from '@/lib/site-config';

export function localizedAlternates(path: string, locale = 'en') {
  return {
    canonical: absoluteSiteUrl(path, locale),
    languages: {
      'x-default': absoluteSiteUrl(path),
      ...Object.fromEntries(routing.locales.map(language => [language, absoluteSiteUrl(path, language)])),
    },
  };
}
