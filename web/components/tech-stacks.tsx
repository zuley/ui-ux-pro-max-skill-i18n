'use client';

import { useTranslations } from 'next-intl';

export function TechStacks() {
  const t = useTranslations('techStacks');
  
  const stacks = [
    'react', 'nextjs', 'vue', 'svelte', 
    'swiftui', 'reactnative', 'flutter', 'tailwind'
  ];

  return (
    <section id="stacks" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stacks.map((stack) => {
          const stackData = t.raw(`stacks.${stack}`);
          return (
            <div key={stack} className="glass-card p-6 text-center hover:border-blue-500/50 transition-colors cursor-default">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {stackData.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stackData.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
