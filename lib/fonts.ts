import { DM_Sans, Space_Grotesk } from 'next/font/google';

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

/** className string applied to <body> in both layouts. */
export const fontBodyClassName = `${dmSans.className} ${dmSans.variable} ${spaceGrotesk.variable}`;
