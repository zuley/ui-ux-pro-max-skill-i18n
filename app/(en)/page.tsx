import { localizedAlternates } from '@/lib/metadata';
import { SITE_NAME } from '@/lib/site-config';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageContent } from '@/components/page-content';
import { LatestContent } from '@/components/home/latest-content';
import { SiteJsonLd } from '@/components/site-jsonld';
import { resolveCatalogMessages } from '@/lib/upstream-content';
import messages from '@/messages/en.json';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE_URL,
  SITE_URL
} from '@/lib/site-config';

const hero = resolveCatalogMessages(messages.hero);

export const metadata: Metadata = {
  title: hero.metaTitle,
  description: hero.metaDescription,
  keywords: messages.common.keywords,
  alternates: localizedAlternates('/', 'en'),
  openGraph: {
    title: hero.metaTitle,
    description: hero.metaDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en',
    type: 'website',
    images: [DEFAULT_OG_IMAGE]
  },
  twitter: {
    card: 'summary_large_image',
    title: hero.metaTitle,
    description: hero.metaDescription,
    images: [DEFAULT_TWITTER_IMAGE_URL]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootPage() {
  setRequestLocale('en');

  return (
    <>
      <SiteJsonLd locale="en" />
      <PageContent latestContent={<LatestContent locale="en" />} />
    </>
  );
}
