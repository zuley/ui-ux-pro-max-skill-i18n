import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AdSenseScript } from '@/components/ads/adsense-script';

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
      <AdSenseScript />
      <Navbar />
      <div id="main-content" tabIndex={-1} className="pt-28 pb-16 outline-none">{children}</div>
      <Footer />
    </div>
  );
}
