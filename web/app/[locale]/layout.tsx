import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/lib/theme-context';
import { AnnouncementBar } from '@/components/announcement-bar';
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "../globals.css";

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

  const baseUrl = 'https://ui-ux-pro-max-skill.com';
  const currentUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: `${t('common.title')} - ${t('common.description')}`,
    description: t('hero.subtitle'),
    keywords: t('common.keywords'),
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': baseUrl,
        'zh': `${baseUrl}/zh`,
        'vi': `${baseUrl}/vi`,
      },
    },
    openGraph: {
      title: `${t('common.title')} - ${t('common.description')}`,
      description: t('hero.subtitle'),
      url: currentUrl,
      siteName: 'UI UX Pro Max Skill',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'UI UX Pro Max Skill - Agent Skills for Claude Code',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('common.title')} - ${t('common.description')}`,
      description: t('hero.subtitle'),
      images: [`${baseUrl}/og-image.png`],
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
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Y3KXMDMBC1');"
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AnnouncementBar />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
