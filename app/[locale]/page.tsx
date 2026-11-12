import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageContent } from '@/components/page-content';
import { LatestContent } from '@/components/home/latest-content';
import { SiteJsonLd } from '@/components/site-jsonld';
import type { Locale } from '@/lib/content/types';
import {
  absoluteSiteUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE_URL,
  SITE_NAME
} from '@/lib/site-config';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const title = t('metaTitle');
  const description = t('metaDescription');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteSiteUrl('/', locale),
      siteName: SITE_NAME,
      locale,
      type: 'website',
      images: [DEFAULT_OG_IMAGE]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_TWITTER_IMAGE_URL]
    }
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteJsonLd locale={locale} />
      <PageContent latestContent={<LatestContent locale={locale as Locale} />} />
    </>
  );
}
