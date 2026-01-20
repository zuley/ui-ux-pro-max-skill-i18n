'use client';

import { useTranslations } from 'next-intl';
import { Palette, Type, BarChart, Layout, MousePointerClick, Layers } from 'lucide-react';

export function Features() {
  const t = useTranslations('features');
  
  const features = [
    {
      id: 'styles',
      icon: Layers,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      id: 'colors',
      icon: Palette,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    {
      id: 'typography',
      icon: Type,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      id: 'charts',
      icon: BarChart,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      id: 'landing',
      icon: Layout,
      color: 'text-pink-500',
      bg: 'bg-pink-500/10'
    },
    {
      id: 'ux',
      icon: MousePointerClick,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const sectionT = t.raw(`sections.${feature.id}`);
          const tags = sectionT.tags as string[];
          const Icon = feature.icon;

          return (
            <div key={feature.id} className="glass-card p-8 hover:shadow-xl transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg} group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {sectionT.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {sectionT.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
