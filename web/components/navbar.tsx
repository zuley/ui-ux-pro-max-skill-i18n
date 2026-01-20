'use client';

import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';
import { Github } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('navbar');
  const tCommon = useTranslations('common');

  return (
    <nav className="fixed top-2 min-[400px]:top-4 left-2 min-[400px]:left-4 right-2 min-[400px]:right-4 z-50 glass-card max-w-6xl mx-auto transition-all duration-300">
      <div className="px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 min-[400px]:h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-1.5 min-[400px]:gap-2 group">
            <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB"></stop>
                  <stop offset="50%" stopColor="#3B82F6"></stop>
                  <stop offset="100%" stopColor="#F97316"></stop>
                </linearGradient>
                <linearGradient id="innerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F97316"></stop>
                  <stop offset="100%" stopColor="#2563EB"></stop>
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="22" stroke="url(#logoGradient)" strokeWidth="3" fill="none"></circle>
              <rect x="14" y="14" width="12" height="12" rx="2" fill="url(#logoGradient)" opacity="0.9"></rect>
              <rect x="18" y="18" width="12" height="12" rx="2" fill="url(#innerGradient)" opacity="0.8"></rect>
              <rect x="22" y="22" width="12" height="12" rx="2" fill="url(#logoGradient)" opacity="0.9"></rect>
              <circle cx="36" cy="12" r="2" fill="#F97316"></circle>
              <circle cx="12" cy="36" r="1.5" fill="#3B82F6"></circle>
            </svg>
            <span className="font-bold text-xs min-[400px]:text-sm sm:text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              {tCommon('title')}
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              {t('features')}
            </Link>
            <Link href="#stacks" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              {t('stacks')}
            </Link>
            <Link href="#styles" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              {t('styles')}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            
            <a 
              href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 min-[400px]:gap-2 px-2 min-[400px]:px-3 py-1 min-[400px]:py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs min-[400px]:text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Github className="w-3.5 h-3.5 min-[400px]:w-4 min-[400px]:h-4" />
              <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <svg className="w-3 h-3 min-[400px]:w-3.5 min-[400px]:h-3.5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                {t('github')}
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
