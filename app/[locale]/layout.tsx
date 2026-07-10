import type { Metadata } from "next";
import { setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, prefixedLocales } from '@/i18n/routing';
import { adsenseMetadata } from '@/lib/adsense';
import { RootShell } from '@/components/root-shell';
import type { Locale } from '@/lib/content/types';
import "../globals.css";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE_URL,
  SITE_URL
} from '@/lib/site-config';

type AppLocale = (typeof routing.locales)[number];

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const currentUrl = locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${t('common.navTitle')} — ${t('common.description')}`,
    description: t('common.metaDescription'),
    keywords: t('common.keywords'),
    alternates: {
      canonical: currentUrl,
      languages: {
        'x-default': SITE_URL,
        'en': SITE_URL,
        'zh': `${SITE_URL}/zh`,
        'vi': `${SITE_URL}/vi`,
        'ja': `${SITE_URL}/ja`,
      },
    },
    openGraph: {
      title: `${t('common.navTitle')} — ${t('common.description')}`,
      description: t('common.metaDescription'),
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale: locale,
      type: 'website',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('common.navTitle')} — ${t('common.description')}`,
      description: t('common.metaDescription'),
      images: [DEFAULT_TWITTER_IMAGE_URL],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: adsenseMetadata(),
  };
}

export function generateStaticParams() {
  // English is served at the root by app/(en) — never emit /en/* here.
  return prefixedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <RootShell locale={locale as Locale} messages={messages}>
      {children}
    </RootShell>
  );
}
