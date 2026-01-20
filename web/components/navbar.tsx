'use client';

import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Link, usePathname } from '@/i18n/routing';
import { Github, Menu, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { SearchModal } from '@/components/search/search-modal';
import { docsNav } from '@/content/docs/nav';

export function Navbar() {
  const t = useTranslations('navbar');
  const tCommon = useTranslations('common');
  const tDocs = useTranslations();
  const pathname = usePathname();
  const [mobileState, setMobileState] = useState<{ open: boolean; path: string }>(() => ({
    open: false,
    path: ''
  }));
  const [searchOpen, setSearchOpen] = useState(false);
  const mobileOpen = mobileState.open && mobileState.path === pathname;
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/docs')) return pathname.startsWith('/docs');
    return pathname === href;
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === 'k';
      if (!isK) return;
      if (!(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      setSearchOpen(true);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const primaryLinks = useMemo(
    () => [
      { href: '/', label: t('home') },
      { href: '/docs/getting-started', label: t('docs') }
    ],
    [t]
  );

  return (
    <>
      <nav className="fixed top-[36px] min-[400px]:top-[44px] left-2 min-[400px]:left-4 right-2 min-[400px]:right-4 z-40 glass-card max-w-7xl mx-auto transition-all duration-300">
        <div className="px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 min-[400px]:h-16">
            <Link href="/" className="flex items-center gap-1.5 min-[400px]:gap-2 group">
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

            <div className="hidden lg:flex items-center gap-7">
              {primaryLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    'transition-colors duration-200 cursor-pointer',
                    isActive(l.href)
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  ].join(' ')}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                href="/#styles"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {t('examples')}
              </Link>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-black/20 border border-gray-200/70 dark:border-white/10 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-black/30 transition-colors cursor-pointer"
                aria-label={tDocs('search.open')}
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">{tDocs('search.open')}</span>
                <span className="ml-1 hidden md:inline font-mono text-[10px] text-gray-500 dark:text-gray-400">
                  ⌘K
                </span>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label={tDocs('search.open')}
              >
                <Search className="w-5 h-5" />
              </button>

              <ThemeToggle />
              <LanguageSwitcher />
            
            <a 
              href="https://github.com/zuley/ui-ux-pro-max-skill-i18n" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={t('github')}
              title={t('github')}
              className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

              <button
                onClick={() =>
                  setMobileState((prev) => ({
                    open: !(prev.open && prev.path === pathname),
                    path: pathname
                  }))
                }
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
          </div>
        </div>
      </div>
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200/70 dark:border-white/10 px-3 min-[400px]:px-4 sm:px-6 lg:px-8 pb-4">
            <div className="pt-3 flex flex-col gap-2">
              {primaryLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
                    isActive(l.href)
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  ].join(' ')}
                >
                  {l.label}
                </Link>
              ))}

              <div className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400 px-3">
                {t('docs')}
              </div>
              {docsNav.map((n) => (
                <Link
                  key={n.slug}
                  href={`/docs/${n.slug}`}
                  className="rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  {tDocs(n.titleKey)}
                </Link>
              ))}

              <Link
                href="/#styles"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {t('examples')}
              </Link>
            </div>
          </div>
        )}
      </nav>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
