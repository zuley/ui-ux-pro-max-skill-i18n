import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing, prefixedLocales } from '@/i18n/routing';
import { ThemeProvider } from '@/lib/theme-context';
import { adsenseMetadata } from '@/lib/adsense';
import { AnnouncementBar } from '@/components/announcement-bar';
import { SearchIndexProvider } from '@/components/search/search-index-context';
import { buildSearchIndex } from '@/lib/search-index';
import type { Locale } from '@/lib/content/types';
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { SITE_URL } from '@/lib/site-config';

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

type AppLocale = (typeof routing.locales)[number];

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const currentUrl = locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${t('common.title')} - ${t('common.description')}`,
    description: t('hero.subtitle'),
    keywords: t('common.keywords'),
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': SITE_URL,
        'zh': `${SITE_URL}/zh`,
        'vi': `${SITE_URL}/vi`,
        'ja': `${SITE_URL}/ja`,
      },
    },
    openGraph: {
      title: `${t('common.title')} - ${t('common.description')}`,
      description: t('hero.subtitle'),
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('common.title')} - ${t('common.description')}`,
      description: t('hero.subtitle'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: adsenseMetadata(),
  };
}

export function generateStaticParams() {
  // English is served at the root by app/(en) — never emit /en/* here.
  return prefixedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const searchIndex = await buildSearchIndex(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <body className={`${dmSans.className} ${dmSans.variable} ${spaceGrotesk.variable}`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{try{const t=localStorage.getItem('theme');const d=document.documentElement;if(t==='light'){d.classList.remove('dark');d.style.colorScheme='light';}else{d.classList.add('dark');d.style.colorScheme='dark';}}catch{}})();"
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y3KXMDMBC1"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Y3KXMDMBC1');"
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SearchIndexProvider value={searchIndex}>
              <AnnouncementBar />
              {children}
            </SearchIndexProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
