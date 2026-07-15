/*
 * This component is the document shell returned by both App Router root
 * layouts. Next hoists these beforeInteractive scripts into <head>, but the
 * legacy ESLint rule only recognizes a literal app/layout.tsx file.
 */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { fontBodyClassName } from '@/lib/fonts';
import {
  GA_ID,
  GOOGLE_ANALYTICS_INIT_SCRIPT,
  THEME_INIT_SCRIPT,
} from '@/lib/site-config';
import { ThemeProvider } from '@/lib/theme-context';
import { SearchIndexProvider } from '@/components/search/search-index-context';
import { buildSearchIndex } from '@/lib/search-index';
import { AnnouncementBar } from '@/components/announcement-bar';
import type { Locale } from '@/lib/content/types';
import { SkipLink } from '@/components/skip-link';
import { pickClientMessages } from '@/lib/client-messages';
import { AdSenseScript } from '@/components/ads/adsense-script';

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
  const clientMessages = pickClientMessages(messages);

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <body className={fontBodyClassName(locale)}>
        <AdSenseScript />
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
            __html: GOOGLE_ANALYTICS_INIT_SCRIPT,
          }}
        />
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <ThemeProvider>
            <SearchIndexProvider value={searchIndex}>
              <SkipLink />
              <AnnouncementBar />
              {children}
            </SearchIndexProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
