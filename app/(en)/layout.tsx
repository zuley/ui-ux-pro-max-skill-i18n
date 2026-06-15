import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { adsenseMetadata } from '@/lib/adsense';
import { RootShell } from '@/components/root-shell';
import messages from '@/messages/en.json';
import '../globals.css';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  other: adsenseMetadata()
};

/**
 * Root layout for the EN-default route group (served at `/`). Delegates
 * the <html>/<body> shell, analytics and providers to <RootShell>; the
 * app/[locale] layout shares the same shell for the prefixed locales.
 */
export default async function EnglishRootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  setRequestLocale('en');

  return (
    <RootShell locale="en" messages={messages}>
      {children}
    </RootShell>
  );
}
