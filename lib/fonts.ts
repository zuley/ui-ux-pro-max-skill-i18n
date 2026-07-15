import { DM_Sans, Noto_Sans_Devanagari, Space_Grotesk } from 'next/font/google';

/**
 * Shared font instances. next/font requires these to be initialised at
 * module scope, so they live here and are imported by both route-tree
 * roots (app/(en) and app/[locale]) instead of being declared twice.
 */
export const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});
export const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
});

/** Locale-aware className string applied to <body> in both layouts. */
export function fontBodyClassName(locale: string) {
  const bodyFont = locale === 'hi'
    ? notoSansDevanagari.className
    : dmSans.className;

  return `${bodyFont} ${dmSans.variable} ${spaceGrotesk.variable} ${notoSansDevanagari.variable}`;
}
