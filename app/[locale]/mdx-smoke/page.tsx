import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import SmokeContent from '@/content/_smoke/hello.mdx';

/**
 * Smoke-test route for the MDX pipeline (PR1).
 *
 * This page imports an MDX file directly so we can verify that:
 *  - `@next/mdx` compiles content/**.mdx with static export enabled
 *  - The global `mdx-components.tsx` map is applied
 *  - Routes still get pre-rendered per locale
 *
 * To be removed once PR3 lands and the real /blog routes take over.
 */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MdxSmokePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <SmokeContent />
    </main>
  );
}
