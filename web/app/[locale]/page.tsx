import { setRequestLocale } from 'next-intl/server';
import { PageContent } from '@/components/page-content';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PageContent />;
}
