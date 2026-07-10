import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ExamplesPageContent } from '@/components/examples-page-content';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE_URL,
  SITE_URL
} from '@/lib/site-config';

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const currentUrl = locale === 'en' ? `${SITE_URL}/examples` : `${SITE_URL}/${locale}/examples`;

  return {
    title: `${t('gallery.title')} | UI UX Pro Max Skill`,
    description: t('gallery.subtitle'),
    alternates: {
      canonical: currentUrl,
      languages: {
        'x-default': `${SITE_URL}/examples`,
        en: `${SITE_URL}/examples`,
        zh: `${SITE_URL}/zh/examples`,
        vi: `${SITE_URL}/vi/examples`,
        ja: `${SITE_URL}/ja/examples`,
      },
    },
    openGraph: {
      title: `${t('gallery.title')} | UI UX Pro Max Skill`,
      description: t('gallery.subtitle'),
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale,
      type: 'website',
      images: [DEFAULT_OG_IMAGE],
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
