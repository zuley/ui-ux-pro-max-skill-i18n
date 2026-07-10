'use client';

import { useTranslations } from 'next-intl';
import { useLayoutEffect, useRef } from 'react';

export function AnnouncementBar() {
  const t = useTranslations('announcement');
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        '--announcement-height',
        `${bar.getBoundingClientRect().height}px`
      );
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="fixed top-0 left-0 right-0 z-50 bg-blue-600/95 text-white text-[11px] sm:text-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1 flex items-center justify-center gap-x-2 gap-y-0.5 text-center leading-tight sm:leading-normal">
        <span className="min-w-0">{t('text')}</span>
        <a
          href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="underline underline-offset-2 hover:text-white/90 transition-colors"
        >
          {t('link')}
        </a>
      </div>
    </div>
  );
}
