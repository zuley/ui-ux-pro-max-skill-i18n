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
            <div className="flex gap-4">
              <a
                href="https://github.com/zuley/ui-ux-pro-max-skill-i18n"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
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
              <li className="text-gray-600 dark:text-gray-400">8 Tech Stacks</li>
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
