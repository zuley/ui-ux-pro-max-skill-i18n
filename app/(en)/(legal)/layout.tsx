import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/lib/theme-context';
import messages from '@/messages/en.json';

export default function EnglishLegalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  setRequestLocale('en');

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeProvider>
        <AnnouncementBar />
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
          <Navbar />
          <div className="pt-28 pb-16">{children}</div>
          <Footer />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
