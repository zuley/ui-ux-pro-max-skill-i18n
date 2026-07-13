/**
 * Emits WebSite + Organization + SoftwareApplication JSON-LD on the
 * homepage. Gives crawlers enough structured data to understand the site
 * as a software product entity.
 */
import { absoluteSiteUrl, SITE_URL } from '@/lib/site-config';

export function SiteJsonLd({ locale = 'en' }: { locale?: string }) {
  const homepageUrl = absoluteSiteUrl('/', locale);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${homepageUrl}#website`,
        url: homepageUrl,
        name: 'UI UX Pro Max Skill',
        description:
          'Design intelligence for Claude Code, Cursor, Windsurf, and other AI assistants.',
        inLanguage: locale,
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'UI UX Pro Max Skill',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon.ico`,
        },
        sameAs: [
          'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: 'UI UX Pro Max Skill',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Design intelligence skill for AI coding assistants. Provides 67 UI styles, 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types, 16 tech stacks, and 161 reasoning rules.',
        featureList: [
          '67 UI Styles',
          '161 Color Palettes',
          '57 Font Pairings',
          '99 UX Guidelines',
          '25 Chart Types',
          '16 Tech Stacks',
          '161 Reasoning Rules',
        ],
      },
    ],
  };

  const json = JSON.stringify(websiteSchema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
