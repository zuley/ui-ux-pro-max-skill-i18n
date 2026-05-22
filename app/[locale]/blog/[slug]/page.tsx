import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Clock, ArrowLeft } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { getPost, listAllSlugs } from '@/lib/content/blog';
import { isFallback } from '@/lib/content/fallback';
import { getAuthor } from '@/lib/authors';
import { blogIndexPath } from '@/lib/locale-path';
import { LocaleFallbackBanner } from '@/components/content/locale-fallback-banner';
import { ArticleJsonLd } from '@/components/content/article-jsonld';
import { ReadingProgress } from '@/components/content/reading-progress';
import type { Locale } from '@/lib/content/types';

type PageParams = { locale: string; slug: string };

export async function generateStaticParams() {
  const slugs = await listAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale as Locale, slug);
  if (!post) return {};

  const baseUrl = 'https://ui-ux-pro-max-skill.com';
  const currentUrl =
    locale === 'en'
      ? `${baseUrl}/blog/${slug}`
      : `${baseUrl}/${locale}/blog/${slug}`;
  const { title, summary, cover, date, tags } = post.frontmatter;

  return {
    title: `${title} | UI UX Pro Max Skill`,
    description: summary,
    keywords: tags.join(', '),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/blog/${slug}`,
        zh: `${baseUrl}/zh/blog/${slug}`,
        vi: `${baseUrl}/vi/blog/${slug}`,
        ja: `${baseUrl}/ja/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description: summary,
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale,
      type: 'article',
      publishedTime: date,
      images: cover ? [{ url: cover }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const post = await getPost(typedLocale, slug, { includeBody: true });
  if (!post || !post.Body) notFound();

  const t = await getTranslations({ locale });
  const author = getAuthor(post.frontmatter.author);
  const showFallback = isFallback(typedLocale, post.sourceLocale);
  const baseUrl = 'https://ui-ux-pro-max-skill.com';
  const canonicalUrl =
    locale === 'en'
      ? `${baseUrl}/blog/${slug}`
      : `${baseUrl}/${locale}/blog/${slug}`;

  // Re-typed alias avoids TS narrowing churn when destructuring the
  // optional Body component below.
  const Body = post.Body;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <ReadingProgress />
      <ArticleJsonLd
        type="Article"
        url={canonicalUrl}
        title={post.frontmatter.title}
        description={post.frontmatter.summary}
        datePublished={post.frontmatter.date}
        authorName={author.name}
        inLanguage={locale}
        keywords={post.frontmatter.tags}
        image={post.frontmatter.cover}
      />

      <Link
        href={blogIndexPath(locale)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('blog.backToIndex')}
      </Link>

      <article className="mt-6">
        {showFallback ? (
          <LocaleFallbackBanner message={t('blog.fallbackBanner')} />
        ) : null}

        <header>
          {post.frontmatter.tags.length > 0 ? (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {post.frontmatter.title}
          </h1>

          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {post.frontmatter.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{author.name}</span>
            <span>
              <time dateTime={post.frontmatter.date}>
                {post.frontmatter.date}
              </time>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {t('blog.minRead', { n: post.readingMinutes })}
            </span>
          </div>
        </header>

        <div className="mt-6">
          <Body />
        </div>
      </article>
    </main>
  );
}
