import type { DocSlug } from '@/content/docs/nav';
import type { TocItem } from '@/components/docs/docs-toc';
import { CodeBlock } from '@/components/tutorial/code-block';
import { Callout } from '@/components/tutorial/callout';
import { Checklist } from '@/components/tutorial/checklist';
import { ClientOnly } from '@/components/client-only';

export type Translator = ((key: string, values?: Record<string, unknown>) => string) & {
  raw: (key: string) => unknown;
};

export function getDocDefinition(slug: DocSlug, t: Translator): { toc: TocItem[]; content: React.ReactNode } {
  switch (slug) {
    case 'getting-started': {
      const toc: TocItem[] = [
        { id: 'overview', title: t('docs.sections.overview') },
        { id: 'whats-new', title: t('docs.gettingStarted.whatsNew.title') },
        { id: 'features', title: t('docs.gettingStarted.features.title') },
        { id: 'prerequisites', title: t('docs.gettingStarted.prerequisites.title') },
        { id: 'install', title: t('docs.gettingStarted.install.title') },
        { id: 'quickstart', title: t('docs.gettingStarted.quickstart.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.gettingStarted.overview')}
            </p>

            <div className="mt-5 grid md:grid-cols-3 gap-3">
              {(t.raw('docs.gettingStarted.highlights') as { title: string; desc: string }[]).map(
                (h) => (
                  <div
                    key={h.title}
                    className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4"
                  >
                    <div className="font-heading font-semibold text-gray-900 dark:text-white">
                      {h.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {h.desc}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-6">
              <Callout title={t('docs.gettingStarted.defaultStack.title')}>
                {t('docs.gettingStarted.defaultStack.body')}
              </Callout>
            </div>
          </section>

          <section id="whats-new" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.whatsNew.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.gettingStarted.whatsNew.body')}
            </p>
            <div className="mt-4 grid md:grid-cols-3 gap-3">
              {(t.raw('docs.gettingStarted.whatsNew.items') as { title: string; desc: string }[]).map(
                (item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4"
                  >
                    <div className="font-heading font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          <section id="features" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.features.title')}
            </h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {(t.raw('docs.gettingStarted.features.items') as string[]).map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4 text-sm text-gray-700 dark:text-gray-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="prerequisites" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.prerequisites.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.gettingStarted.prerequisites.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.gettingStarted.prerequisites.checkPython')}
                language="bash"
                code={'python3 --version || python --version'}
              />
            </div>
          </section>

          <section id="install" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.install.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.gettingStarted.install.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.gettingStarted.install.title')}
                tabs={[
                  {
                    label: t('docs.gettingStarted.install.claudeCode'),
                    language: 'text',
                    code: [
                      '/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill',
                      '/plugin install ui-ux-pro-max@ui-ux-pro-max-skill'
                    ].join('\n')
                  },
                  {
                    label: t('docs.gettingStarted.install.cli'),
                    language: 'bash',
                    code: [
                      '# Install CLI globally',
                      'npm install -g uipro-cli',
                      '',
                      '# Install for your AI assistant',
                      'uipro init --ai claude      # Claude Code',
                      'uipro init --ai cursor      # Cursor',
                      'uipro init --ai windsurf    # Windsurf',
                      'uipro init --ai antigravity # Antigravity',
                      'uipro init --ai copilot     # GitHub Copilot',
                      'uipro init --ai kiro        # Kiro',
                      'uipro init --ai codex       # Codex CLI',
                      'uipro init --ai qoder       # Qoder',
                      'uipro init --ai roocode     # Roo Code',
                      'uipro init --ai gemini      # Gemini CLI',
                      'uipro init --ai trae        # Trae',
                      'uipro init --ai opencode    # OpenCode',
                      'uipro init --ai continue    # Continue (Skills)',
                      'uipro init --ai all         # All assistants'
                    ].join('\n')
                  },
                  {
                    label: t('docs.gettingStarted.install.manual'),
                    language: 'bash',
                    code: [
                      '# Copy folders to your project',
                      '.claude/skills/ui-ux-pro-max/',
                      '.cursor/commands/ui-ux-pro-max.md',
                      '.windsurf/workflows/ui-ux-pro-max.md',
                      '.agent/workflows/ui-ux-pro-max.md',
                      '.shared/ui-ux-pro-max/',
                      '.github/prompts/ui-ux-pro-max.prompt.md',
                      '.kiro/steering/ui-ux-pro-max.md',
                      '.codex/skills/ui-ux-pro-max/',
                      '.qoder/skills/ui-ux-pro-max.md',
                      '.roo/rules/ui-ux-pro-max.md',
                      '.gemini/skills/ui-ux-pro-max/',
                      '.trae/skills/ui-ux-pro-max/',
                      '.continue/skills/ui-ux-pro-max/'
                    ].join('\n')
                  }
                ]}
              />
            </div>
          </section>

          <section id="quickstart" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.quickstart.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.gettingStarted.quickstart.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.gettingStarted.quickstart.designSystem')}
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
          </section>

          <section id="next" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.gettingStarted.next')}
            </p>
          </section>
        </>
      );

      return { toc, content };
    }

    case 'design-system-generator': {
      const toc: TocItem[] = [
        { id: 'overview', title: t('docs.sections.overview') },
        { id: 'workflow', title: t('docs.dsg.workflow.title') },
        { id: 'output', title: t('docs.dsg.output.title') },
        { id: 'rules', title: t('docs.dsg.rules.title') },
        { id: 'checklist', title: t('docs.dsg.checklist.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.dsg.overview')}
            </p>
          </section>

          <section id="workflow" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.workflow.title')}
            </h2>
            <div className="mt-3 space-y-3">
              {(t.raw('docs.dsg.workflow.steps') as string[]).map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4 text-sm text-gray-800 dark:text-gray-200"
                >
                  {s}
                </div>
              ))}
            </div>
          </section>

          <section id="output" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.output.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.dsg.output.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.dsg.output.exampleTitle')}
                language="text"
                code={t('docs.dsg.output.example')}
              />
            </div>
          </section>

          <section id="rules" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.rules.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.dsg.rules.body')}
            </p>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {(t.raw('docs.dsg.rules.items') as string[]).map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4 text-sm text-gray-700 dark:text-gray-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="checklist" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.checklist.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.dsg.checklist.body')}
            </p>
            <div className="mt-4">
              <ClientOnly>
                <Checklist
                  storageKey="pre-delivery"
                  title={t('docs.dsg.checklist.boxTitle')}
                  items={(t.raw('docs.dsg.checklist.items') as { id: string; label: string }[]).map(
                    (i) => ({ id: i.id, label: i.label })
                  )}
                />
              </ClientOnly>
            </div>
          </section>

          <section id="next" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.dsg.next')}
            </p>
          </section>
        </>
      );

      return { toc, content };
    }

    case 'cli-reference': {
      const toc: TocItem[] = [
        { id: 'overview', title: t('docs.sections.overview') },
        { id: 'install-cli', title: t('docs.cli.install.title') },
        { id: 'init', title: t('docs.cli.init.title') },
        { id: 'design-system', title: t('docs.cli.designSystem.title') },
        { id: 'persist', title: t('docs.cli.persist.title') },
        { id: 'domain', title: t('docs.cli.domain.title') },
        { id: 'stack', title: t('docs.cli.stack.title') },
        { id: 'other', title: t('docs.cli.other.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.cli.overview')}
            </p>
          </section>

          <section id="install-cli" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.install.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.cli.install.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.cli.install.exampleTitle')}
                language="bash"
                code={'npm install -g uipro-cli'}
              />
            </div>
          </section>

          <section id="init" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.init.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.cli.init.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.cli.init.exampleTitle')}
                language="bash"
                code={[
                  'uipro init --ai claude      # Claude Code',
                  'uipro init --ai cursor      # Cursor',
                  'uipro init --ai windsurf    # Windsurf',
                  'uipro init --ai antigravity # Antigravity',
                  'uipro init --ai copilot     # GitHub Copilot',
                  'uipro init --ai kiro        # Kiro',
                  'uipro init --ai codex       # Codex CLI',
                  'uipro init --ai qoder       # Qoder',
                  'uipro init --ai roocode     # Roo Code',
                  'uipro init --ai gemini      # Gemini CLI',
                  'uipro init --ai trae        # Trae',
                  'uipro init --ai opencode    # OpenCode',
                  'uipro init --ai continue    # Continue (Skills)',
                  'uipro init --ai all         # All assistants'
                ].join('\n')}
              />
            </div>
          </section>

          <section id="design-system" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.designSystem.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.cli.designSystem.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.cli.designSystem.exampleTitle')}
                language="bash"
                code={[
                  '# Generate design system (ASCII)',
                  'python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"',
                  '',
                  '# Generate design system (Markdown)',
                  'python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech banking" --design-system -f markdown'
                ].join('\n')}
              />
            </div>
          </section>

          <section id="persist" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.persist.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.cli.persist.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.cli.persist.exampleTitle')}
                language="bash"
                code={[
                  '# Generate and persist to design-system/MASTER.md',
                  'python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp"',
                  '',
                  '# Create page-specific override',
                  'python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp" --page "dashboard"'
                ].join('\n')}
              />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">
                {t('docs.cli.persist.structureTitle')}
              </h3>
              <CodeBlock
                language="text"
                code={[
                  'design-system/',
                  '├── MASTER.md            # Global Source of Truth',
                  '└── pages/',
                  '    └── dashboard.md     # Page-specific overrides'
                ].join('\n')}
              />
            </div>
          </section>

          <section id="domain" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.domain.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.cli.domain.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.cli.domain.examplesTitle')}
                tabs={[
                  {
                    label: 'style',
                    language: 'bash',
                    code:
                      'python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"glassmorphism\" --domain style'
                  },
                  {
                    label: 'typography',
                    language: 'bash',
                    code:
                      'python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"elegant serif\" --domain typography'
                  },
                  {
                    label: 'chart',
                    language: 'bash',
                    code:
                      'python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"dashboard\" --domain chart'
                  }
                ]}
              />
            </div>
          </section>

          <section id="stack" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.stack.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.cli.stack.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.cli.stack.examplesTitle')}
                tabs={[
                  {
                    label: 'react',
                    language: 'bash',
                    code:
                      'python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"form validation\" --stack react'
                  },
                  {
                    label: 'nextjs',
                    language: 'bash',
                    code:
                      'python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"routing seo\" --stack nextjs'
                  },
                  {
                    label: 'html-tailwind',
                    language: 'bash',
                    code:
                      'python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"responsive layout\" --stack html-tailwind'
                  }
                ]}
              />
            </div>
          </section>

          <section id="other" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.other.title')}
            </h2>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.cli.other.exampleTitle')}
                language="bash"
                code={[
                  'uipro versions              # List available versions',
                  'uipro update                # Update to latest version',
                  'uipro init --offline        # Skip GitHub download, use bundled assets',
                  'uipro init --force          # Overwrite existing files'
                ].join('\n')}
              />
            </div>
          </section>

          <section id="next" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.cli.next')}
            </p>
          </section>
        </>
      );

      return { toc, content };
    }

    case 'examples': {
      const toc: TocItem[] = [
        { id: 'overview', title: t('docs.sections.overview') },
        { id: 'usage', title: t('docs.examples.usage.title') },
        { id: 'prompts', title: t('docs.examples.prompts.title') },
        { id: 'stacks', title: t('docs.examples.stacks.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.examples.overview')}
            </p>
          </section>

          <section id="usage" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.usage.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.examples.usage.body')}
            </p>
            <div className="mt-4">
              <CodeBlock
                title={t('docs.examples.usage.codeTitle')}
                language="text"
                code={t('docs.examples.usage.code')}
              />
            </div>
          </section>

          <section id="prompts" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.prompts.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.examples.prompts.body')}
            </p>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {(t.raw('docs.examples.prompts.items') as string[]).map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4 text-sm text-gray-700 dark:text-gray-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="stacks" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.stacks.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.examples.stacks.body')}
            </p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(t.raw('docs.examples.stacks.items') as string[]).map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="next" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.examples.next')}
            </p>
          </section>
        </>
      );

      return { toc, content };
    }

    case 'faq': {
      const toc: TocItem[] = [
        { id: 'overview', title: t('docs.sections.overview') },
        { id: 'questions', title: t('docs.faq.questions.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.faq.overview')}
            </p>
          </section>

          <section id="questions" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.faq.questions.title')}
            </h2>
            <div className="mt-4 space-y-3">
              {(t.raw('docs.faq.questions.items') as { q: string; a: string }[]).map((qa) => (
                <details
                  key={qa.q}
                  className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4"
                >
                  <summary className="cursor-pointer font-heading font-semibold text-gray-900 dark:text-white">
                    {qa.q}
                  </summary>
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {qa.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="next" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.faq.next')}
            </p>
          </section>
        </>
      );

      return { toc, content };
    }
  }
}
