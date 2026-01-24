'use client';

import { useTranslations } from 'next-intl';

export function Stats() {
  const t = useTranslations('stats');

  const stats = [
    { value: '57', label: t('styles') },
    { value: '95', label: t('palettes') },
    { value: '56', label: t('fonts') },
    { value: '11', label: t('stacks') },
    { value: '24', label: t('charts') },
    { value: '29', label: t('landing') },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-4 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
