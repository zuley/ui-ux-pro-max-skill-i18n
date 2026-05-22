import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { listSeries } from '@/lib/content/tutorials';
import { SeriesCard } from '@/components/tutorials/series-card';

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
  const currentUrl =
    locale === 'en'
      ? `${baseUrl}/tutorials`
      : `${baseUrl}/${locale}/tutorials`;

  return {
    title: `${t('tutorials.title')} | UI UX Pro Max Skill`,
    description: t('tutorials.subtitle'),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/tutorials`,
        zh: `${baseUrl}/zh/tutorials`,
        vi: `${baseUrl}/vi/tutorials`,
        ja: `${baseUrl}/ja/tutorials`,
      },
    },
    openGraph: {
      title: `${t('tutorials.title')} | UI UX Pro Max Skill`,
      description: t('tutorials.subtitle'),
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale,
      type: 'website',
    },
  };
}

export default async function TutorialsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const series = await listSeries();
  const t = await getTranslations({ locale });

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t('tutorials.title')}
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          {t('tutorials.subtitle')}
        </p>
      </header>

      {series.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-white/10 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
          {t('tutorials.empty')}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {series.map((s) => (
            <SeriesCard
              key={s.slug}
              series={s}
              locale={locale}
              title={t(s.titleKey)}
              description={t(s.descriptionKey)}
              stepsLabel={t('tutorials.totalSteps', { n: s.steps.length })}
            />
          ))}
        </div>
      )}
    </main>
  );
}
