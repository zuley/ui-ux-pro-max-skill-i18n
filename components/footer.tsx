'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  blogIndexPath,
  docPath,
  localePath,
  tutorialsIndexPath,
} from '@/lib/locale-path';

export function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navbar');
  const locale = useLocale();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href={localePath(locale, '/')} className="flex items-center gap-2 mb-4 group">
              <span className="font-heading font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {tCommon('title')}
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href={localePath(locale, '/about')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('about')}
              </Link>
              <Link href={localePath(locale, '/privacy')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('privacy')}
              </Link>
              <Link href={localePath(locale, '/terms')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('terms')}
              </Link>
              <Link href={localePath(locale, '/contact')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('contact')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('resources')}</h3>
            <ul className="space-y-3">
              <li><Link href={docPath(locale, 'getting-started')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('docs')}</Link></li>
              <li><Link href={tutorialsIndexPath(locale)} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('tutorials')}</Link></li>
              <li><Link href={blogIndexPath(locale)} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('blog')}</Link></li>
              <li><Link href={localePath(locale, '/#features')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('features')}</Link></li>
              <li><Link href={localePath(locale, '/#stacks')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('stacks')}</Link></li>
              <li><Link href={localePath(locale, '/#styles')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('styles')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('database')}</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-400">67 UI Styles</li>
              <li className="text-gray-600 dark:text-gray-400">161 Color Palettes</li>
              <li className="text-gray-600 dark:text-gray-400">57 Font Pairings</li>
              <li className="text-gray-600 dark:text-gray-400">25 Chart Types</li>
              <li className="text-gray-600 dark:text-gray-400">16 Tech Stacks</li>
              <li className="text-gray-600 dark:text-gray-400">161 Reasoning Rules</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('builtWith').split('\n').map((line, idx) => (
              <span key={idx} className="block">{line}</span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
