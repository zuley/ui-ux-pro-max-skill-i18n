import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { DocsShell } from '@/components/docs/docs-shell';
import { docsNav, type DocSlug } from '@/content/docs/nav';
import { getDocDefinition, type Translator } from '@/content/docs/page-definitions';
import { ClientOnly } from '@/components/client-only';

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

  return {
    title: `${t(nav.titleKey)} | ${t('common.title')}`,
    description: t(nav.descriptionKey),
    openGraph: {
      title: `${t(nav.titleKey)} | ${t('common.title')}`,
      description: t(nav.descriptionKey)
    }
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

        <ClientOnly>
        </ClientOnly>

        <div className="mt-10 pt-6 border-t border-gray-200/70 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
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
              href={`/docs/${next.slug}`}
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
