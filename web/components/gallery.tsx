'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

export function Gallery() {
  const t = useTranslations('gallery');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeMode, setActiveMode] = useState('All Modes');

  const categories = [
    'All', 'SaaS', 'Education', 'Pet Services', 'AI/Chatbot', 
    'E-commerce', 'Fintech/Crypto', 'Healthcare', 'Creative'
  ];

  const modes = ['All Modes', 'Light', 'Dark'];

  // Mock Data based on snapshot
  const demos = [
    {
      id: 1,
      title: "SaaS Analytics Dashboard",
      category: "SaaS",
      mode: "Light",
      style: "Glassmorphism + Flat Design",
      image: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/thumbnails/saas-analytics-dashboard.png"
    },
    {
      id: 2,
      title: "Educational Platform",
      category: "Education",
      mode: "Light",
      style: "Claymorphism + Vibrant & Block-based",
      image: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/thumbnails/educational-platform.png"
    },
    {
      id: 3,
      title: "Pet Grooming & Spa",
      category: "Pet Services",
      mode: "Light",
      style: "Claymorphism + Vibrant & Block-based",
      image: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/thumbnails/pet-grooming.png"
    },
    {
      id: 4,
      title: "AI Chatbot Platform",
      category: "AI/Chatbot",
      mode: "Light",
      style: "AI-Native UI + Minimalism",
      image: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/thumbnails/ai-chatbot-platform.png"
    },
    {
      id: 5,
      title: "Luxury E-commerce",
      category: "E-commerce",
      mode: "Light",
      style: "Liquid Glass + Glassmorphism",
      image: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/thumbnails/luxury-ecommerce.png"
    },
    {
      id: 6,
      title: "Fintech Crypto Dashboard",
      category: "Fintech/Crypto",
      mode: "Dark",
      style: "Glassmorphism + Dark Mode (OLED)",
      image: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/thumbnails/fintech-crypto.png"
    }
  ];

  const filteredDemos = demos.filter(demo => {
    const categoryMatch = activeCategory === 'All' || demo.category === activeCategory;
    const modeMatch = activeMode === 'All Modes' || demo.mode === activeMode;
    return categoryMatch && modeMatch;
  });

  return (
    <section id="styles" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <span className="text-sm font-medium text-gray-500 mr-2">{t('filters.category')}:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <span className="text-sm font-medium text-gray-500 mr-2">{t('filters.mode')}:</span>
          {modes.map(mode => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeMode === mode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredDemos.map((demo) => (
          <div key={demo.id} className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
              {/* Fallback image if remote image fails or for placeholders */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-xs">{demo.title} Preview</span>
              </div>
              {/* Use unoptimized for external URLs to avoid config issues for now */}
              <img 
                src={demo.image} 
                alt={demo.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded">
                {demo.mode === 'Light' ? '☀️' : '🌙'} {demo.mode}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                  {demo.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {demo.title}
              </h3>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {demo.style}
              </p>
              
              <div className="flex gap-2">
                <button className="flex-1 btn-primary text-xs py-2">
                  {t('viewDemo')}
                </button>
                <button className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-medium transition-colors">
                  {t('showPrompt')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center glass-card p-8 sm:p-12 max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500"></div>
        <div className="text-4xl mb-4">🚀</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('readyTitle')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {t('readySubtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
            {t('getOnGithub')}
          </a>
          <a href="#features" className="text-blue-600 hover:text-blue-700 font-medium">
            {t('learnMore')} →
          </a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 text-sm text-gray-500">
          {(t.raw('features') as string[]).map((feature, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-green-500">✓</span> {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
