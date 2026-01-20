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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_220px] gap-6 lg:gap-10">
        <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-auto">
          <DocsSidebar
            items={docsNav}
            activeSlug={activeSlug}
            getTitle={(key) => t(key)}
          />
        </aside>

        <main className="min-w-0">{children}</main>

        <aside className="hidden lg:block lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-auto">
          <DocsToc items={toc} title={t('docs.toc')} />
        </aside>
      </div>
    </div>
  );
}

