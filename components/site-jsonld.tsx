import { UPSTREAM } from '@/lib/upstream-content';
/**
 * Emits WebSite + Organization + SoftwareApplication JSON-LD on the
 * homepage. Keeps this translation website separate from the upstream
 * software it describes.
 */
import {
  absoluteSiteUrl,
  OFFICIAL_PROJECT_URL,
  SITE_NAME,
  SITE_PUBLISHER_NAME,
  SITE_URL,
} from '@/lib/site-config';

export function SiteJsonLd({ locale = 'en' }: { locale?: string }) {
  const homepageUrl = absoluteSiteUrl('/', locale);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${homepageUrl}#website`,
        url: homepageUrl,
        name: SITE_NAME,
        description:
          'Unofficial multilingual translation of UI UX Pro Max Skill documentation and learning resources.',
        inLanguage: locale,
        publisher: { '@id': `${SITE_URL}/#organization` },
        about: { '@id': `${OFFICIAL_PROJECT_URL}#software` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_PUBLISHER_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon.ico`,
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${OFFICIAL_PROJECT_URL}#software`,
        name: 'UI UX Pro Max Skill',
        url: OFFICIAL_PROJECT_URL,
        sameAs: [OFFICIAL_PROJECT_URL],
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          `Upstream design guidance: ${UPSTREAM.counts.styles} searchable styles (${UPSTREAM.counts.activeStyles} active), ${UPSTREAM.counts.palettes} palettes, ${UPSTREAM.counts.fonts} font pairings and ${UPSTREAM.counts.stacks} stacks.`,
        featureList: [
          `${UPSTREAM.counts.styles} searchable styles (${UPSTREAM.counts.activeStyles} active)`,
          `${UPSTREAM.counts.palettes} color palettes`,
          `${UPSTREAM.counts.fonts} font pairings`,
          `${UPSTREAM.counts.ux} UX guidelines`,
          `${UPSTREAM.counts.stacks} technology stacks`,
          `${UPSTREAM.counts.charts} chart types`,
          `${UPSTREAM.counts.reasoning} industry reasoning profiles`,
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
