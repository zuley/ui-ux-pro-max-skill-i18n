import { setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

/**
 * EN-default route-group shell mirroring app/[locale]/docs/layout.tsx.
 * Providers and the announcement bar live in app/(en)/layout.tsx.
 */
export default function EnglishDocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  setRequestLocale('en');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
      <Navbar />
      <div className="pt-28 pb-16">{children}</div>
      <Footer />
    </div>
  );
}
