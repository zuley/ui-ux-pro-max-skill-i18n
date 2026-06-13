import { SITE_URL } from '@/lib/site-config';
export type LegalSlug = 'privacy' | 'terms' | 'contact' | 'about';


export function legalCanonicalUrl(locale: string, slug: LegalSlug) {
  return locale === 'en' ? `${SITE_URL}/${slug}/` : `${SITE_URL}/${locale}/${slug}/`;
}
