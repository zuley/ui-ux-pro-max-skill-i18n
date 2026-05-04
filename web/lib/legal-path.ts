export type LegalSlug = 'privacy' | 'terms' | 'contact';

const baseUrl = 'https://ui-ux-pro-max-skill.com';

export function legalCanonicalUrl(locale: string, slug: LegalSlug) {
  return locale === 'en' ? `${baseUrl}/${slug}/` : `${baseUrl}/${locale}/${slug}/`;
}
