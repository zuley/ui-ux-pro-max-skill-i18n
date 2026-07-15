import type { Metadata } from 'next';
import { LegalContent, getLegalPageCopy } from '@/components/legal/legal-content';
import { legalCanonicalUrl, legalLanguageAlternates } from '@/lib/legal-path';

const pageCopy = getLegalPageCopy('about', 'en');

export const metadata: Metadata = {
  title: `${pageCopy.title} | UI UX Pro Max Skill`,
  description: pageCopy.description,
  alternates: {
    canonical: legalCanonicalUrl('en', 'about'),
    languages: legalLanguageAlternates('about')
  }
};

export default function AboutPage() {
  return <LegalContent page="about" locale="en" />;
}
