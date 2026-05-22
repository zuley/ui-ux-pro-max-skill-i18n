import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllPosts, getAllTags } from '@/lib/content/blog';
import type { Locale } from '@/lib/content/types';
import { TagFilter } from '@/components/blog/tag-filter';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const baseUrl = 'https://ui-ux-pro-max-skill.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;

  return {
    title: `${t('blog.title')} | UI UX Pro Max Skill`,
    description: t('blog.subtitle'),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/blog`,
        zh: `${baseUrl}/zh/blog`,
        vi: `${baseUrl}/vi/blog`,
        ja: `${baseUrl}/ja/blog`,
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
      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t('blog.title')}
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          {t('blog.subtitle')}
        </p>
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
