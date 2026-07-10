import { setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default async function LegalLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
      <Navbar />
      <div id="main-content" tabIndex={-1} className="pt-28 pb-16 outline-none">{children}</div>
      <Footer />
    </div>
  );
}
