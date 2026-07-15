import type { Metadata } from 'next';
import { LegalContent, getLegalPageCopy } from '@/components/legal/legal-content';
import { legalCanonicalUrl, legalLanguageAlternates } from '@/lib/legal-path';

type PageParams = { locale: string };

export async function generateMetadata({
  params
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pageCopy = getLegalPageCopy('terms', locale);

  return {
    title: `${pageCopy.title} | UI UX Pro Max Skill`,
    description: pageCopy.description,
    alternates: {
      canonical: legalCanonicalUrl(locale, 'terms'),
      languages: legalLanguageAlternates('terms')
    }
  };
}

export default async function TermsPage({
  params
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  return <LegalContent page="terms" locale={locale} />;
}
