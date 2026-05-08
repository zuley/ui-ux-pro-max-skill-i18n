'use client';

import { useMemo } from 'react';
import { usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { DocsToc, type TocItem } from '@/components/docs/docs-toc';
import { docsNav, type DocSlug } from '@/content/docs/nav';

export function DocsShell({
  children,
  slug,
  toc
}: {
  children: React.ReactNode;
  slug: DocSlug;
  toc: TocItem[];
}) {
  const t = useTranslations();
  const pathname = usePathname();

  const activeSlug = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    const docsIndex = parts.indexOf('docs');
    const maybeSlug = docsIndex >= 0 ? parts[docsIndex + 1] : undefined;
    return (maybeSlug as DocSlug | undefined) ?? slug;
  }, [pathname, slug]);

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[260px_1fr_220px] lg:gap-10">
          <aside className="hidden lg:block lg:fixed lg:left-[max(1rem,calc((100vw-80rem)/2+1rem))] lg:top-28 lg:w-[260px] lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <DocsSidebar
              items={docsNav}
              activeSlug={activeSlug}
              getTitle={(key) => t(key)}
            />
          </aside>

          <main className="min-w-0 lg:col-start-2">{children}</main>

          <aside className="hidden lg:block lg:fixed lg:top-28 lg:w-[220px] lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:right-[max(1rem,calc((100vw-80rem)/2+1rem))]">
            <DocsToc items={toc} title={t('docs.toc')} />
          </aside>
        </div>
      </div>
    </div>
  );
}

