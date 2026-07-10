import type { Metadata } from 'next';
import { GlobalNotFoundContent } from '@/components/global-not-found-content';
import { fontBodyClassName } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: '404 | UI UX Pro Max Skill',
  description: 'The requested page could not be found.'
};

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={fontBodyClassName}>
        <GlobalNotFoundContent />
      </body>
    </html>
  );
}
