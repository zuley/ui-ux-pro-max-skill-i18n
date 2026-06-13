import type { Metadata } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import { adsenseMetadata } from '@/lib/adsense';
import { AnnouncementBar } from '@/components/announcement-bar';
import { ThemeProvider } from '@/lib/theme-context';
import { SearchIndexProvider } from '@/components/search/search-index-context';
import { buildSearchIndex } from '@/lib/search-index';
import messages from '@/messages/en.json';
import '../globals.css';
import { SITE_URL } from '@/lib/site-config';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  other: adsenseMetadata()
};

/**
 * Root layout for the EN-default route group. Mirrors
 * app/[locale]/layout.tsx: providers, the analytics scripts and the
 * announcement bar live here once, so individual pages and the section
 * layouts (blog/docs/tutorials/legal) only render their own chrome.
 */
export default async function EnglishRootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  setRequestLocale('en');
  const searchIndex = await buildSearchIndex('en');

  return (
    <html lang="en" suppressHydrationWarning className="dark">
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
        <NextIntlClientProvider locale="en" messages={messages}>
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
