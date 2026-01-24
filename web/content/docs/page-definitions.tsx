import type { DocSlug } from '@/content/docs/nav';
import type { TocItem } from '@/components/docs/docs-toc';
import { CodeBlock } from '@/components/tutorial/code-block';
import { Callout } from '@/components/tutorial/callout';
import { Checklist } from '@/components/tutorial/checklist';
import { ClientOnly } from '@/components/client-only';
import { Tabs } from '@/components/tabs';

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
              <div className="space-y-3">
                <CodeBlock
                  title={t('docs.gettingStarted.install.claudeCode')}
                  language="text"
                  code={[
                    '/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill',
                    '/plugin install ui-ux-pro-max@ui-ux-pro-max-skill'
                  ].join('\n')}
                />
                <CodeBlock
                  title={t('docs.gettingStarted.install.cli')}
                  language="bash"
                  code={[
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
                  ].join('\n')}
                />
                <CodeBlock
                  title={t('docs.gettingStarted.install.manual')}
                  language="bash"
                  code={[
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
                  ].join('\n')}
                />
              </div>
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
              <div className="space-y-3">
                <CodeBlock
                  title={`${t('docs.gettingStarted.quickstart.designSystem')} (ASCII)`}
                  language="bash"
                  code={
                    'python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"'
                  }
                />
                <CodeBlock
                  title={`${t('docs.gettingStarted.quickstart.designSystem')} (Markdown)`}
                  language="bash"
                  code={
                    'python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech banking" --design-system -f markdown'
                  }
                />
              </div>
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
            <p className="mt-2 mb-6 text-gray-600 dark:text-gray-400">
              {t('docs.dsg.workflow.subtitle')}
            </p>
            <div className="flex flex-col gap-4">
              {(t.raw('docs.dsg.workflow.steps') as { num: string; title: string; desc: string }[]).map((step, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5 flex items-start"
                >
                  <div className="shrink-0 mr-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
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
        { id: 'cli-install', title: t('docs.cli.tabs.cliInstall') },
        { id: 'manual-install', title: t('docs.cli.tabs.manualInstall') },
        { id: 'prerequisites', title: t('docs.cli.tabs.prerequisites') },
        { id: 'other-commands', title: t('docs.cli.otherCommands.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const cliInstallCommands = t.raw('docs.cli.cliInstall.step3.commands') as string[];
      const manualInstallTable = t.raw('docs.cli.manualInstall.table') as {
        header: { assistant: string; folders: string };
        rows: { assistant: string; folders: string }[];
      };
      const otherCommands = t.raw('docs.cli.otherCommands.commands') as string[];

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

          {/* CLI 安装 (推荐) */}
          <section id="cli-install" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('docs.cli.tabs.cliInstall')}
            </h2>

            <div className="space-y-6">
              {/* Terminal-style container */}
              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200/70 dark:border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Terminal content */}
                <div className="p-6 space-y-6 font-mono text-sm">
                  {/* Step 1 */}
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2">
                      # {t('docs.cli.cliInstall.step1.title')}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">npm</span>{' '}
                      <span className="text-blue-600 dark:text-blue-400">install</span>{' '}
                      <span className="text-pink-600 dark:text-pink-400">-g</span>{' '}
                      <span className="text-cyan-600 dark:text-cyan-400">uipro-cli</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2">
                      # {t('docs.cli.cliInstall.step2.title')}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">cd</span>{' '}
                      <span className="text-pink-600 dark:text-pink-400">/path/to/your/project</span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2">
                      # {t('docs.cli.cliInstall.step3.title')}
                    </div>
                    <div className="space-y-1">
                      {cliInstallCommands.map((cmd, idx) => {
                        const [command, comment] = cmd.split('#');
                        return (
                          <div key={idx} className="text-gray-900 dark:text-gray-100">
                            <span className="text-purple-600 dark:text-purple-400">uipro</span>{' '}
                            <span className="text-blue-600 dark:text-blue-400">init</span>{' '}
                            <span className="text-pink-600 dark:text-pink-400">--ai</span>{' '}
                            <span className="text-cyan-600 dark:text-cyan-400">
                              {command.trim().split(' ').pop()}
                            </span>
                            {comment && (
                              <span className="text-gray-500 dark:text-gray-400">
                                {' '}# {comment.trim()}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 手动安装 */}
          <section id="manual-install" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('docs.cli.tabs.manualInstall')}
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {t('docs.cli.manualInstall.description')}
              </p>

              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100/50 dark:bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200/70 dark:border-white/10">
                        {manualInstallTable.header.assistant}
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200/70 dark:border-white/10">
                        {manualInstallTable.header.folders}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/70 dark:bg-black/20">
                    {manualInstallTable.rows.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-200/70 dark:border-white/10 last:border-0">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {row.assistant}
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                          {row.folders}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 前置条件 */}
          <section id="prerequisites" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('docs.cli.tabs.prerequisites')}
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-yellow-200/70 dark:border-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-900/10 p-4">
                <div className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                  {t('docs.cli.prerequisites.warning')}
                </div>
                <div className="text-sm text-yellow-800 dark:text-yellow-300">
                  {t('docs.cli.prerequisites.description')}
                </div>
              </div>

              {/* Terminal-style container */}
              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200/70 dark:border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Terminal content */}
                <div className="p-6 space-y-6 font-mono text-sm">
                  {/* Check Python */}
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2">
                      # {t('docs.cli.prerequisites.checkPython')}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">
                        {t('docs.cli.prerequisites.checkCommand')}
                      </span>
                    </div>
                  </div>

                  {/* Install on macOS */}
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2">
                      # {t('docs.cli.prerequisites.installMac')}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">brew</span>{' '}
                      <span className="text-blue-600 dark:text-blue-400">install</span>{' '}
                      <span className="text-cyan-600 dark:text-cyan-400">python3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 其他 CLI 命令 */}
          <section id="other-commands" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.otherCommands.title')}
            </h2>

            <div className="mt-4 rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200/70 dark:border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm space-y-1">
                {otherCommands.map((cmd, idx) => {
                  const [command, comment] = cmd.split('#');
                  return (
                    <div key={idx} className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">
                        {command.trim()}
                      </span>
                      {comment && (
                        <span className="text-gray-500 dark:text-gray-400">
                          {' '}# {comment.trim()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
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
        { id: 'next', title: t('docs.sections.next') }
      ];

      const assistants = t.raw('docs.examples.usage.assistants') as Array<{
        name: string;
        description: string;
        example: string;
      }>;

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
            <p className="mt-2 mb-6 text-gray-600 dark:text-gray-400">
              {t('docs.examples.usage.subtitle')}
            </p>

            <div className="space-y-4">
              {assistants.map((assistant, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {assistant.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {assistant.description}
                  </p>
                  <div className="rounded-lg bg-gray-100/50 dark:bg-black/30 p-3 font-mono text-sm">
                    <code className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                      {assistant.example}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="prompts" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.prompts.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('docs.examples.prompts.body')}
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
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
        { id: 'questions', title: t('docs.faq.questions.title') }
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
        </>
      );

      return { toc, content };
    }
  }
}
