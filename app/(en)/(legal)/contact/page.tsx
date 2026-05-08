import type { Metadata } from 'next';
import { LegalContent, getLegalPageCopy } from '@/components/legal/legal-content';
import { legalCanonicalUrl } from '@/lib/legal-path';

const pageCopy = getLegalPageCopy('contact', 'en');

export const metadata: Metadata = {
  title: `${pageCopy.title} | UI UX Pro Max Skill`,
  description: pageCopy.description,
  alternates: {
    canonical: legalCanonicalUrl('en', 'contact')
  }
};

export default function ContactPage() {
  return <LegalContent page="contact" locale="en" />;
}
