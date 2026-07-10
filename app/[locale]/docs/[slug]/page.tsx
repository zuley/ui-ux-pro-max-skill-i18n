import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { DocsShell } from '@/components/docs/docs-shell';
import { docsNav, type DocSlug } from '@/content/docs/nav';
import { getDocDefinition, type Translator } from '@/content/docs/page-definitions';
import { docPath } from '@/lib/locale-path';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE_URL,
  SITE_URL
} from '@/lib/site-config';

type PageParams = { locale: string; slug: string };

export function generateStaticParams() {
  return docsNav.map((item) => ({ slug: item.slug }));
}

function isDocSlug(slug: string): slug is DocSlug {
  return docsNav.some((n) => n.slug === slug);
}

export async function generateMetadata({
  params
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });

  if (!isDocSlug(slug)) return {};
  const nav = docsNav.find((n) => n.slug === slug)!;

  const currentUrl = locale === 'en' ? `${SITE_URL}/docs/${slug}` : `${SITE_URL}/${locale}/docs/${slug}`;
  const pageTitle = `${t(nav.titleKey)} | UI UX Pro Max Skill`;
  const pageDescription = `${t(nav.descriptionKey)} - ${t('common.description')}.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `UI UX Pro Max Skill, ${t(nav.titleKey)}, Agent Skills, Claude Code, ${t('common.description')}`,
    alternates: {
      canonical: currentUrl,
      languages: {
        'x-default': `${SITE_URL}/docs/${slug}`,
        'en': `${SITE_URL}/docs/${slug}`,
        'zh': `${SITE_URL}/zh/docs/${slug}`,
        'vi': `${SITE_URL}/vi/docs/${slug}`,
        'ja': `${SITE_URL}/ja/docs/${slug}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale: locale,
      type: 'article',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
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
  };
}

export default async function DocPage({
  params
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isDocSlug(slug)) notFound();

  const t = (await getTranslations()) as unknown as Translator;
  const currentIndex = docsNav.findIndex((n) => n.slug === slug);
  const prev = currentIndex > 0 ? docsNav[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < docsNav.length - 1 ? docsNav[currentIndex + 1] : undefined;
  const current = docsNav[currentIndex]!;

  const { toc, content } = getDocDefinition(slug, t);

  return (
    <DocsShell slug={slug} toc={toc}>
      <article className="glass-card p-6 sm:p-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          {t(current.titleKey)}
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          {t(current.descriptionKey)}
        </p>

        {content}

        <div className="mt-10 pt-6 border-t border-gray-200/70 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={docPath(locale, prev.slug)}
              className="rounded-lg border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-black/20 p-4 hover:bg-white/80 dark:hover:bg-black/30 transition-colors cursor-pointer"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('docs.prev')}</div>
              <div className="mt-1 font-heading font-semibold text-gray-900 dark:text-white">
                {t(prev.titleKey)}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={docPath(locale, next.slug)}
              className="rounded-lg border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-black/20 p-4 hover:bg-white/80 dark:hover:bg-black/30 transition-colors cursor-pointer text-left sm:text-right"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('docs.next')}</div>
              <div className="mt-1 font-heading font-semibold text-gray-900 dark:text-white">
                {t(next.titleKey)}
              </div>
            </Link>
          ) : null}
        </div>
      </article>
    </DocsShell>
  );
}
