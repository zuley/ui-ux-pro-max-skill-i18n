import { setRequestLocale } from 'next-intl/server';
import { PageContent } from '@/components/page-content';
import { LatestContent } from '@/components/home/latest-content';
import type { Locale } from '@/lib/content/types';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageContent latestContent={<LatestContent locale={locale as Locale} />} />
  );
}
