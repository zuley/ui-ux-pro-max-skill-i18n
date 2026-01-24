'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('navbar');

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="#" className="flex items-center gap-2 mb-4 group">
              <span className="font-heading font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {tCommon('title')}
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
              {t('description')}
            </p>
            <div className="flex gap-4" />
          </div>

          <div>
            <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('resources')}</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('features')}</Link></li>
              <li><Link href="#stacks" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('stacks')}</Link></li>
              <li><Link href="#styles" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{tNav('styles')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('database')}</h4>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-400">57 UI Styles</li>
              <li className="text-gray-600 dark:text-gray-400">95 Color Palettes</li>
              <li className="text-gray-600 dark:text-gray-400">56 Font Pairings</li>
              <li className="text-gray-600 dark:text-gray-400">24 Chart Types</li>
              <li className="text-gray-600 dark:text-gray-400">11 Tech Stacks</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {t('builtWith').split('\n').map((line, idx) => (
              <span key={idx} className="block">{line}</span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
