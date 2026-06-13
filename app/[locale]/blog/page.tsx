import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Rss } from 'lucide-react';
import { prefixedLocales } from '@/i18n/routing';
import { getAllPosts, getAllTags } from '@/lib/content/blog';
import { localePath } from '@/lib/locale-path';
import type { Locale } from '@/lib/content/types';
import { TagFilter } from '@/components/blog/tag-filter';
import { SITE_URL } from '@/lib/site-config';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  // English is served at the root by app/(en) — never emit /en/* here.
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const currentUrl = locale === 'en' ? `${SITE_URL}/blog` : `${SITE_URL}/${locale}/blog`;

  return {
    title: `${t('blog.title')} | UI UX Pro Max Skill`,
    description: t('blog.subtitle'),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/blog`,
        zh: `${SITE_URL}/zh/blog`,
        vi: `${SITE_URL}/vi/blog`,
        ja: `${SITE_URL}/ja/blog`,
      },
    },
    openGraph: {
      title: `${t('blog.title')} | UI UX Pro Max Skill`,
      description: t('blog.subtitle'),
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale,
      type: 'website',
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const posts = await getAllPosts(typedLocale);
  const tags = await getAllTags(typedLocale);
  const t = await getTranslations({ locale });

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('blog.title')}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            {t('blog.subtitle')}
          </p>
        </div>
        <a
          href={localePath(locale, '/blog/rss.xml')}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 dark:text-gray-400 transition-colors"
          aria-label="RSS feed"
        >
          <Rss className="w-4 h-4" />
          RSS
        </a>
      </header>

      <TagFilter
        posts={posts}
        tags={tags}
        locale={locale}
        allLabel={t('blog.allTags')}
        emptyLabel={t('blog.empty')}
        minReadLabel={t('blog.minRead', { n: '{n}' })}
      />
    </main>
  );
}
