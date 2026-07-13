import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Clock, ArrowLeft } from 'lucide-react';
import { getPost, listAllSlugs } from '@/lib/content/blog';
import { isFallback } from '@/lib/content/fallback';
import { getAuthor } from '@/lib/authors';
import { blogIndexPath } from '@/lib/locale-path';
import { LocaleFallbackBanner } from '@/components/content/locale-fallback-banner';
import { ArticleJsonLd } from '@/components/content/article-jsonld';
import { BreadcrumbJsonLd } from '@/components/content/breadcrumb-jsonld';
import { ReadingProgress } from '@/components/content/reading-progress';
import { ArticleToc } from '@/components/content/article-toc';
import { EndOfArticleCta } from '@/components/content/end-of-article-cta';
import type { Locale } from '@/lib/content/types';
import { toMetaDescription } from '@/lib/seo';
import {
  absoluteSiteUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_TWITTER_IMAGE_URL,
  SITE_URL
} from '@/lib/site-config';

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

  const currentUrl = absoluteSiteUrl(`/blog/${slug}`, locale);
  const { title, summary, cover, date, updated, tags } = post.frontmatter;
  const metaDescription = toMetaDescription(summary);

  return {
    title,
    description: metaDescription,
    keywords: tags.join(', '),
    alternates: {
      canonical: currentUrl,
      languages: {
        'x-default': `${SITE_URL}/blog/${slug}`,
        en: `${SITE_URL}/blog/${slug}`,
        zh: `${SITE_URL}/zh/blog/${slug}`,
        vi: `${SITE_URL}/vi/blog/${slug}`,
        ja: `${SITE_URL}/ja/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description: metaDescription,
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale,
      type: 'article',
      publishedTime: date,
      modifiedTime: updated ?? date,
      images: cover ? [{ url: cover }] : [{ ...DEFAULT_OG_IMAGE, alt: metaDescription }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      images: cover ? [cover] : [DEFAULT_TWITTER_IMAGE_URL],
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
  const canonicalUrl = absoluteSiteUrl(`/blog/${slug}`, locale);

  // Re-typed alias avoids TS narrowing churn when destructuring the
  // optional Body component below.
  const Body = post.Body;

  // Author initials fallback for the metadata avatar — we don't ship
  // photo avatars yet, so a tinted monogram is a cheap signal of
  // authorship that beats "by Some Name" set in 12px gray.
  const authorInitials = author.name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    // Outer wrapper hosts the article (centered narrow measure on mobile,
    // left-aligned in a flex row on desktop) plus the sticky TOC rail
    // that appears at ≥1024px. The article body stays at ~680px (the
    // long-form reading optimum) in both layouts.
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:flex lg:items-start lg:gap-12">
      <main className="mx-auto lg:mx-0 max-w-[680px] lg:flex-1 lg:min-w-0">
      <ReadingProgress />
      <ArticleJsonLd
        type="Article"
        url={canonicalUrl}
        title={post.frontmatter.title}
        description={post.frontmatter.summary}
        datePublished={post.frontmatter.date}
        dateModified={post.frontmatter.updated}
        authorName={author.name}
        authorUrl={`${SITE_URL}/about`}
        inLanguage={locale}
        keywords={post.frontmatter.tags}
        image={post.frontmatter.cover ?? DEFAULT_OG_IMAGE_URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t('navbar.home'), url: absoluteSiteUrl('/', locale) },
          { name: t('navbar.blog'), url: absoluteSiteUrl('/blog', locale) },
          { name: post.frontmatter.title, url: canonicalUrl },
        ]}
      />

      <Link
        href={blogIndexPath(locale)}
        className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t('blog.backToIndex')}
      </Link>

      <article className="mt-10">
        {showFallback ? (
          <LocaleFallbackBanner message={t('blog.fallbackBanner')} />
        ) : null}

        {/* Header is four independent blocks with deliberate gaps so
            the eye walks down them instead of taking them all at once. */}
        <header>
          {post.frontmatter.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="mt-6 font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            {post.frontmatter.title}
          </h1>

          {/* Lead paragraph: bigger, lighter, gray-700, no `font-bold` so
              it reads as introduction not as another headline. */}
          <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-[1.55] font-light">
            {post.frontmatter.summary}
          </p>

          {/* Thin rule + avatar row. The hairline is what makes the
              metadata feel like "metadata" instead of "another paragraph". */}
          <div className="mt-10 pt-6 border-t border-gray-200/70 dark:border-white/10 flex items-center gap-3">
            <div
              aria-hidden
              className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-[11px] font-semibold flex items-center justify-center"
            >
              {authorInitials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {author.name}
              </div>
              <div className="text-[12px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <time dateTime={post.frontmatter.date}>
                  {post.frontmatter.date}
                </time>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {t('blog.minRead', { n: post.readingMinutes })}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Generous gap before the body so the header has room to land. */}
        <div className="mt-12">
          <Body />
        </div>

        <EndOfArticleCta
          locale={locale}
          eyebrow={t('blog.ctaEyebrow')}
          title={t('blog.ctaTitle')}
          description={t('blog.ctaDescription')}
          tryLabel={t('blog.ctaTry')}
          rssLabel={t('blog.ctaRss')}
          moreLabel={t('blog.ctaMore')}
        />
      </article>
      </main>

      {post.toc && post.toc.length > 1 ? (
        // `sticky` on the aside itself + `self-start` to opt out of
        // the flex `items-stretch` default. Without self-start the
        // aside would stretch to the article's full height and sticky
        // would have nothing to stick to — which is the bug the
        // previous "<aside><div sticky/></aside>" structure hit.
        <aside className="hidden lg:block lg:w-56 lg:shrink-0 lg:self-start lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2">
          <ArticleToc items={post.toc} title={t('blog.tocTitle')} />
        </aside>
      ) : null}
    </div>
  );
}
