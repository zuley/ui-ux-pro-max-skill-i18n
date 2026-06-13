import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageContent } from '@/components/page-content';
import { LatestContent } from '@/components/home/latest-content';
import messages from '@/messages/en.json';
import { SITE_URL } from '@/lib/site-config';


export const metadata: Metadata = {
  title: `${messages.common.title} - ${messages.common.description}`,
  description: messages.hero.subtitle,
  keywords: messages.common.keywords,
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      zh: `${SITE_URL}/zh`,
      vi: `${SITE_URL}/vi`,
      ja: `${SITE_URL}/ja`
    }
  },
  openGraph: {
    title: `${messages.common.title} - ${messages.common.description}`,
    description: messages.hero.subtitle,
    url: SITE_URL,
    siteName: 'UI UX Pro Max Skill',
    locale: 'en',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${messages.common.title} - ${messages.common.description}`,
    description: messages.hero.subtitle
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
