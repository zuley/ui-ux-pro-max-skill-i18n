import { absoluteSiteUrl } from '@/lib/site-config';
import { localizedAlternates } from '@/lib/metadata';
import { SITE_NAME } from '@/lib/site-config';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ExamplesPageContent } from '@/components/examples-page-content';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE_URL
} from '@/lib/site-config';

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const currentUrl = absoluteSiteUrl('/examples', locale);

  return {
    title: `${t('gallery.title')} | UI UX Pro Max Skill`,
    description: t('gallery.subtitle'),
    alternates: localizedAlternates('/examples', locale),
    openGraph: {
      title: `${t('gallery.title')} | UI UX Pro Max Skill`,
      description: t('gallery.subtitle'),
      url: currentUrl,
      siteName: SITE_NAME,
      locale,
      type: 'website',
      images: [{ ...DEFAULT_OG_IMAGE, alt: t('gallery.subtitle') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('gallery.title')} | UI UX Pro Max Skill`,
      description: t('gallery.subtitle'),
      images: [DEFAULT_TWITTER_IMAGE_URL],
    },
  };
}

export default async function ExamplesPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ExamplesPageContent />;
}
