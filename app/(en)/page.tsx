import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageContent } from '@/components/page-content';
import { LatestContent } from '@/components/home/latest-content';
import messages from '@/messages/en.json';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE_URL,
  SITE_URL
} from '@/lib/site-config';


export const metadata: Metadata = {
  title: `${messages.common.navTitle} — ${messages.common.description}`,
  description: messages.common.metaDescription,
  keywords: messages.common.keywords,
  alternates: {
    canonical: SITE_URL,
    languages: {
      'x-default': SITE_URL,
      en: SITE_URL,
      zh: `${SITE_URL}/zh`,
      vi: `${SITE_URL}/vi`,
      ja: `${SITE_URL}/ja`
    }
  },
  openGraph: {
    title: `${messages.common.navTitle} — ${messages.common.description}`,
    description: messages.common.metaDescription,
    url: SITE_URL,
    siteName: 'UI UX Pro Max Skill',
    locale: 'en',
    type: 'website',
    images: [DEFAULT_OG_IMAGE]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${messages.common.navTitle} — ${messages.common.description}`,
    description: messages.common.metaDescription,
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

  return <PageContent latestContent={<LatestContent locale="en" />} />;
}
