'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { Moon, Rocket, Sun } from 'lucide-react';
import { PromptModal } from '@/components/prompt-modal';
import { Link } from '@/i18n/routing';

type Demo = {
  id: number;
  order: number;
  name: string;
  category: string;
  imageUrl: string;
  url: string;
  style: string;
  mode: 'light' | 'dark';
  primary_color: string;
  secondary_color: string;
  cta_color: string;
  background_color: string;
  implemented: boolean;
  prompt: string;
};

export function Gallery() {
  const t = useTranslations('gallery');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeMode, setActiveMode] = useState<'All Modes' | 'Light' | 'Dark'>('All Modes');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedPrompt, setSelectedPrompt] = useState<{ title: string; content: string } | null>(null);
  const [demos, setDemos] = useState<Demo[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch('/gallery.csv', { cache: 'no-store' });
      const text = await res.text();
      const parsed = parseGalleryCsv(text);
      if (!cancelled) setDemos(parsed);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const list: string[] = ['All'];
    for (const d of demos) {
      if (!list.includes(d.category)) list.push(d.category);
    }
    return list;
  }, [demos]);

  const modes: Array<'All Modes' | 'Light' | 'Dark'> = ['All Modes', 'Light', 'Dark'];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demos.filter((demo) => {
      const categoryMatch = activeCategory === 'All' || demo.category === activeCategory;
      const modeMatch =
        activeMode === 'All Modes' ||
        (activeMode === 'Light' && demo.mode === 'light') ||
        (activeMode === 'Dark' && demo.mode === 'dark');
      const queryMatch =
        !q ||
        demo.name.toLowerCase().includes(q) ||
        demo.category.toLowerCase().includes(q) ||
        demo.style.toLowerCase().includes(q) ||
        demo.prompt.toLowerCase().includes(q);
      return categoryMatch && modeMatch && queryMatch;
    });
  }, [activeCategory, activeMode, demos, query]);

  const shown = filtered.slice(0, visibleCount);

  const stats = useMemo(() => {
    const total = demos.length;
    const categoriesCount = categories.length - 1;
    const lightCount = demos.filter((d) => d.mode === 'light').length;
    const darkCount = demos.filter((d) => d.mode === 'dark').length;
    return { total, categoriesCount, lightCount, darkCount };
  }, [categories.length, demos]);

  return (
    <section id="styles" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl glass-card px-3 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
            </svg>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(6);
              }}
              placeholder={t('searchPlaceholder')}
              className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label={t('clearSearch')}
              >
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-center">
          <span className="text-sm font-medium text-gray-500 mr-2">{t('filters.category')}</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(6);
              }}
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
          <span className="text-sm font-medium text-gray-500 mr-2">{t('filters.mode')}</span>
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setActiveMode(mode);
                setVisibleCount(6);
              }}
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {shown.map((demo) => (
          <div key={demo.id} className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <img
                src={toAbsoluteUrl(demo.imageUrl)}
                alt={demo.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded flex items-center gap-1.5">
                {demo.mode === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    {t('mode.light')}
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    {t('mode.dark')}
                  </>
                )}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                  {demo.category}
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-1">{demo.name}</h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{demo.style}</p>

              <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">{t('colors')}</span>
                <ColorDot name="Primary" hex={demo.primary_color} />
                <ColorDot name="Secondary" hex={demo.secondary_color} />
                <ColorDot name="CTA" hex={demo.cta_color} />
              </div>

              <div className="flex gap-2">
                <a
                  className="flex-1 btn-primary text-xs py-2 text-center"
                  href={toAbsoluteUrl(demo.url)}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {t('viewDemo')}
                </a>
                <button
                  onClick={() => setSelectedPrompt({ title: demo.name, content: demo.prompt })}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-medium transition-colors"
                >
                  {t('showPrompt')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PromptModal
        open={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        title={selectedPrompt?.title || ''}
        content={selectedPrompt?.content || ''}
      />

      <div className="flex flex-col items-center gap-3 mb-16">
        {visibleCount < filtered.length && (
          <button onClick={() => setVisibleCount((c) => Math.min(c + 6, filtered.length))} className="btn-secondary">
            {t('loadMore')}
          </button>
        )}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {t('showing', { shown: Math.min(visibleCount, filtered.length), total: filtered.length })}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-500">
          {t('stats', { total: stats.total, categories: stats.categoriesCount, light: stats.lightCount, dark: stats.darkCount })}
        </div>
      </div>

      <div className="mt-20 text-center glass-card p-8 sm:p-12 max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500"></div>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('readyTitle')}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">{t('readySubtitle')}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/docs/getting-started"
            className="btn-primary flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            {t('quickStart')}
          </Link>
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

function toAbsoluteUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://ui-ux-pro-max-skill.nextlevelbuilder.io${url.startsWith('/') ? '' : '/'}${url}`;
}

function parseGalleryCsv(csv: string): Demo[] {
  const lines = csv.trim().split('\n');
  const header = parseCsvRow(lines[0] || '');
  const rows: Demo[] = [];
  for (let i = 1; i < lines.length; i++) {
    const row = parseCsvRow(lines[i] || '');
    const record: Record<string, string> = {};
    for (let j = 0; j < header.length; j++) record[header[j]] = row[j] ?? '';
    rows.push({
      id: Number(record.id),
      order: Number(record.order),
      name: record.name,
      category: record.category,
      imageUrl: record.imageUrl,
      url: record.url,
      style: record.style,
      mode: (record.mode || 'light') as 'light' | 'dark',
      primary_color: record.primary_color,
      secondary_color: record.secondary_color,
      cta_color: record.cta_color,
      background_color: record.background_color,
      implemented: record.implemented === 'true',
      prompt: record.prompt
    });
  }
  return rows.sort((a, b) => a.order - b.order || a.id - b.id);
}

function parseCsvRow(line: string) {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
      continue;
    }
    current += ch;
  }
  result.push(current);
  return result;
}

function ColorDot({ name, hex }: { name: string; hex: string }) {
  return (
    <span className="group relative">
      <span className="inline-block w-3 h-3 rounded-full border border-white/60 shadow-sm" style={{ backgroundColor: hex }}></span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {name}: {hex}
      </span>
    </span>
  );
}
