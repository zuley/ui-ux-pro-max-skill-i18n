import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { fontBodyClassName } from '@/lib/fonts';
import { GA_ID, THEME_INIT_SCRIPT } from '@/lib/site-config';
import { ThemeProvider } from '@/lib/theme-context';
import { SearchIndexProvider } from '@/components/search/search-index-context';
import { buildSearchIndex } from '@/lib/search-index';
import { AnnouncementBar } from '@/components/announcement-bar';
import type { Locale } from '@/lib/content/types';
import { adsensePublisherId } from '@/lib/adsense';

type Messages = React.ComponentProps<typeof NextIntlClientProvider>['messages'];

/**
 * The single <html>/<body> shell shared by both route-tree roots
 * (app/(en)/layout.tsx and app/[locale]/layout.tsx). Hosts the theme-init
 * script, analytics, the i18n/theme/search providers and the announcement
 * bar so none of that is duplicated per tree. Each layout only supplies
 * its `locale` + `messages` and keeps its own metadata exports.
 */
export async function RootShell({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const searchIndex = await buildSearchIndex(locale);

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
        crossOrigin="anonymous"
      />
      <body className={fontBodyClassName}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
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
