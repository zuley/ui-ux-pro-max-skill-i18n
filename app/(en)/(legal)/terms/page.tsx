import type { Metadata } from 'next';
import { LegalContent, getLegalPageCopy } from '@/components/legal/legal-content';
import { legalCanonicalUrl } from '@/lib/legal-path';

const pageCopy = getLegalPageCopy('terms', 'en');

export const metadata: Metadata = {
  title: `${pageCopy.title} | UI UX Pro Max Skill`,
  description: pageCopy.description,
  alternates: {
    canonical: legalCanonicalUrl('en', 'terms')
  }
};

export default function TermsPage() {
  return <LegalContent page="terms" locale="en" />;
}
