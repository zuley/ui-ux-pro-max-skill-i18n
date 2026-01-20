import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default async function DocsLayout({
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
      <div className="pt-24 pb-16">{children}</div>
      <Footer />
    </div>
  );
}

