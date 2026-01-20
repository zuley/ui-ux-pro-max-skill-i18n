'use client';

import { useTranslations } from 'next-intl';
import { CodeBlock } from '@/components/tutorial/code-block';
import { Callout } from '@/components/tutorial/callout';
import { Link } from '@/i18n/routing';

export function QuickStart() {
  const t = useTranslations('quickStart');

  return (
    <section id="quick-start" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="font-heading font-bold text-gray-900 dark:text-white">
            {t('step1.title')}
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('step1.body')}
          </p>
          <div className="mt-4">
            <CodeBlock
              title={t('step1.codeTitle')}
              language="text"
              code={[
                '/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill',
                '/plugin install ui-ux-pro-max@ui-ux-pro-max-skill'
              ].join('\n')}
            />
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="font-heading font-bold text-gray-900 dark:text-white">
            {t('step2.title')}
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('step2.body')}
          </p>
          <div className="mt-4">
            <CodeBlock
              title={t('step2.codeTitle')}
              tabs={[
                {
                  label: 'ASCII',
                  language: 'bash',
                  code:
                    'python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"beauty spa wellness\" --design-system -p \"Serenity Spa\"'
                },
                {
                  label: 'Markdown',
                  language: 'bash',
                  code:
                    'python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"fintech banking\" --design-system -f markdown'
                }
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Callout title={t('tip.title')}>
          {t('tip.body')}
        </Callout>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/docs/getting-started" className="btn-primary">
          {t('ctaDocs')}
        </Link>
        <Link href="/#styles" className="btn-secondary">
          {t('ctaExamples')}
        </Link>
      </div>
    </section>
  );
}

