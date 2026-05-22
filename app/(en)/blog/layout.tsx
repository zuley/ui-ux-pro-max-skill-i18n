import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/lib/theme-context';
import { SearchIndexProvider } from '@/components/search/search-index-context';
import { buildSearchIndex } from '@/lib/search-index';
import messages from '@/messages/en.json';

/**
 * EN-default route-group shell mirroring app/[locale]/blog/layout.tsx
 * so /blog/* (no /en/ prefix) is reachable. Without this, the navbar
 * links emitted by localePath('en', ...) all 404.
 */
export default async function EnglishBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale('en');
  const searchIndex = await buildSearchIndex('en');

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeProvider>
        <SearchIndexProvider value={searchIndex}>
          <AnnouncementBar />
          <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
            <Navbar />
            <div className="pt-28 pb-16">{children}</div>
            <Footer />
          </div>
        </SearchIndexProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
