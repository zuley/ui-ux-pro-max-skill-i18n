import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar } from '@/components/announcement-bar';
import { PageContent } from '@/components/page-content';
import { ThemeProvider } from '@/lib/theme-context';
import messages from '@/messages/en.json';

const baseUrl = 'https://ui-ux-pro-max-skill.com';

export const metadata: Metadata = {
  title: `${messages.common.title} - ${messages.common.description}`,
  description: messages.hero.subtitle,
  keywords: messages.common.keywords,
  alternates: {
    canonical: baseUrl,
    languages: {
      en: baseUrl,
      zh: `${baseUrl}/zh`,
      vi: `${baseUrl}/vi`
    }
  },
  openGraph: {
    title: `${messages.common.title} - ${messages.common.description}`,
    description: messages.hero.subtitle,
    url: baseUrl,
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

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeProvider>
        <AnnouncementBar />
        <PageContent />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
