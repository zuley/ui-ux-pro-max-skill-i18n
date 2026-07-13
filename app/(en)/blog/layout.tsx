import { setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

/**
 * EN-default route-group shell mirroring app/[locale]/blog/layout.tsx
 * so /blog/* (no /en/ prefix) is reachable. Providers and the
 * announcement bar live in the route-group root layout (app/(en)/layout.tsx).
 */
export default function EnglishBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale('en');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
      <Navbar />
      <div id="main-content" tabIndex={-1} className="pt-28 pb-16 outline-none">{children}</div>
      <Footer />
    </div>
  );
}
