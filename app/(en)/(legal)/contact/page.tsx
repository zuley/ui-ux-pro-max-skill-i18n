import type { Metadata } from 'next';
import { LegalContent, getLegalPageCopy } from '@/components/legal/legal-content';
import { legalCanonicalUrl, legalLanguageAlternates } from '@/lib/legal-path';

const pageCopy = getLegalPageCopy('contact', 'en');

export const metadata: Metadata = {
  title: `${pageCopy.title} | UI UX Pro Max Skill`,
  description: pageCopy.description,
  alternates: {
    canonical: legalCanonicalUrl('en', 'contact'),
    languages: legalLanguageAlternates('contact')
  }
};

export default function ContactPage() {
  return <LegalContent page="contact" locale="en" />;
}
