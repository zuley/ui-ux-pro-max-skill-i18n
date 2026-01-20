'use client';

import { useTranslations } from 'next-intl';

export function HowItWorks() {
  const t = useTranslations('howItWorks');

  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0F172A]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('titlePrefix')}
            <span className="gradient-text">{t('titleAccent')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">1</div>
              <h3 className="font-heading text-base font-bold text-gray-900 dark:text-white">{t('steps.1.title')}</h3>
            </div>
            <div className="bg-gray-900 rounded-lg px-4 py-3 font-mono text-sm">
              <span className="text-gray-500">$</span>{' '}
              <span className="text-emerald-400">{t('steps.1.prompt')}</span>
            </div>
          </div>

          <ArrowDivider />

          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">2</div>
              <h3 className="font-heading text-base font-bold text-gray-900 dark:text-white">{t('steps.2.title')}</h3>
            </div>
            <div className="bg-white/70 dark:bg-black/20 rounded-lg p-4 text-sm border border-gray-200/70 dark:border-white/10">
              <div className="flex flex-wrap gap-2">
                {(['product', 'style', 'page', 'cta'] as const).map((key) => (
                  <span
                    key={key}
                    className="px-2 py-1 bg-violet-500/10 text-violet-700 dark:text-violet-400 rounded text-xs"
                  >
                    {t(`steps.2.tags.${key}.label`)}:{' '}
                    <span className="font-medium">{t(`steps.2.tags.${key}.value`)}</span>
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
                {t('steps.2.searching')}
              </p>
            </div>
          </div>

          <ArrowDivider />

          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">3</div>
              <h3 className="font-heading text-base font-bold text-gray-900 dark:text-white">{t('steps.3.title')}</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <DataBox label={t('steps.3.product.label')} value={t('steps.3.product.value')} />
              <DataBox label={t('steps.3.style.label')} value={t('steps.3.style.value')} />
              <DataBox label={t('steps.3.typography.label')} value={t('steps.3.typography.value')} />
              <DataBox label={t('steps.3.landing.label')} value={t('steps.3.landing.value')} />
              <DataBox label={t('steps.3.ux.label')} value={t('steps.3.ux.value')} />
              <ColorBox colors={t.raw('steps.3.colors') as { name: string; hex: string }[]} label={t('steps.3.colorsLabel')} />
            </div>
          </div>

          <ArrowDivider />

          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">4</div>
              <h3 className="font-heading text-base font-bold text-gray-900 dark:text-white">{t('steps.4.title')}</h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 font-mono text-[11px] overflow-x-auto">
              <div className="text-gray-500">{t('steps.4.comment')}</div>
              <div>
                <span className="text-pink-400">&lt;section</span>{' '}
                <span className="text-yellow-300">class</span>=
                <span className="text-emerald-400">&quot;{t('steps.4.sectionClass')}&quot;</span>
                <span className="text-pink-400">&gt;</span>
              </div>
              <div className="pl-3">
                <span className="text-pink-400">&lt;h1</span>{' '}
                <span className="text-yellow-300">class</span>=
                <span className="text-emerald-400">&quot;{t('steps.4.h1Class')}&quot;</span>
                <span className="text-pink-400">&gt;</span>
              </div>
              <div className="pl-6 text-white">{t('steps.4.h1Text')}</div>
              <div className="pl-3">
                <span className="text-pink-400">&lt;/h1&gt;</span>
              </div>
              <div className="pl-3">
                <span className="text-pink-400">&lt;button</span>{' '}
                <span className="text-yellow-300">class</span>=
                <span className="text-emerald-400">&quot;{t('steps.4.buttonClass')}&quot;</span>
                <span className="text-pink-400">&gt;</span>
              </div>
              <div className="pl-6 text-white">{t('steps.4.buttonText')}</div>
              <div className="pl-3">
                <span className="text-pink-400">&lt;/button&gt;</span>
              </div>
              <div>
                <span className="text-pink-400">&lt;/section&gt;</span>
              </div>
            </div>
          </div>

          <ArrowDivider />

          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">5</div>
              <h3 className="font-heading text-base font-bold text-gray-900 dark:text-white">{t('steps.5.title')}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(t.raw('steps.5.items') as string[]).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/70 dark:bg-black/20 rounded-lg px-3 py-2 border border-gray-200/70 dark:border-white/10">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-gray-800 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <ArrowDivider />

          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center text-white text-xs font-bold">6</div>
              <h3 className="font-heading text-base font-bold text-gray-900 dark:text-white">{t('steps.6.title')}</h3>
            </div>
            <a
              href={t('steps.6.href')}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={t('steps.6.image')}
                alt={t('steps.6.imageAlt')}
                className="w-full aspect-video object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {t('steps.6.cta')}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowDivider() {
  return (
    <div className="flex justify-center py-1">
      <svg className="w-5 h-5 text-blue-600/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}

function DataBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/70 dark:bg-black/20 rounded-lg p-3 border border-gray-200/70 dark:border-white/10">
      <div className="text-[10px] text-blue-600 font-medium mb-1">{label}</div>
      <div className="text-xs font-medium text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}

function ColorBox({ label, colors }: { label: string; colors: { name: string; hex: string }[] }) {
  return (
    <div className="bg-white/70 dark:bg-black/20 rounded-lg p-3 border border-gray-200/70 dark:border-white/10">
      <div className="text-[10px] text-blue-600 font-medium mb-1">{label}</div>
      <div className="flex gap-1">
        {colors.map((c) => (
          <div key={c.name} className="group relative">
            <div
              className="w-5 h-5 rounded-full border border-white/50 shadow-sm cursor-pointer"
              style={{ backgroundColor: c.hex }}
            ></div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1.5 py-0.5 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {c.name}: {c.hex}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
