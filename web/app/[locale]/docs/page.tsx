import { redirect } from 'next/navigation';



type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DocsIndexPage({ params }: Props) {
  const { locale } = await params;
  redirect(locale === 'en' ? '/docs/getting-started' : `/${locale}/docs/getting-started`);
}
