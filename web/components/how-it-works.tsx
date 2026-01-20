'use client';

import { useTranslations } from 'next-intl';

export function HowItWorks() {
  const t = useTranslations('howItWorks');
  
  const steps = [1, 2, 3, 4, 5, 6];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl my-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => {
          const stepData = t.raw(`steps.${step}`);
          return (
            <div key={step} className="glass-card p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl select-none group-hover:opacity-20 transition-opacity">
                {step}
              </div>
              
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4 shadow-lg shadow-blue-500/30">
                  {step}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {stepData.title}
                </h3>
                
                <div className="bg-gray-100 dark:bg-gray-900/80 rounded-lg p-3 font-mono text-sm text-gray-600 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap">
                  {stepData.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
