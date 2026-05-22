import type { DocSlug } from '@/content/docs/nav';
import type { TocItem } from '@/components/docs/docs-toc';
import { CodeBlock } from '@/components/tutorial/code-block';
import { Callout } from '@/components/tutorial/callout';

export type Translator = ((key: string, values?: Record<string, unknown>) => string) & {
  raw: (key: string) => unknown;
};

function ArchitectureDiagram({ labels, captions }: {
  labels: { you: string; assistant: string; skill: string; kb: string; reasoning: string; output: string; code: string };
  captions: { step1: string; step2: string; step3: string; step4: string; step5: string; step6: string };
}) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5 overflow-x-auto">
      <svg viewBox="0 0 760 280" role="img" aria-label="UI UX Pro Max Skill architecture" className="w-full h-auto min-w-[640px]">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-gray-500 dark:fill-gray-300" />
          </marker>
        </defs>
        {[
          { x: 20, label: labels.you },
          { x: 150, label: labels.assistant },
          { x: 290, label: labels.skill },
          { x: 430, label: labels.kb },
          { x: 570, label: labels.reasoning },
          { x: 670, label: labels.output, w: 80 }
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={100} width={b.w ?? 110} height={60} rx={10}
              className="fill-white dark:fill-white/5 stroke-gray-300 dark:stroke-white/15" strokeWidth="1.5" />
            <text x={b.x + (b.w ?? 110) / 2} y={134} textAnchor="middle"
              className="fill-gray-900 dark:fill-white text-[12px] font-medium">{b.label}</text>
          </g>
        ))}
        {[
          { x1: 130, x2: 150, cap: captions.step1, cx: 140 },
          { x1: 260, x2: 290, cap: captions.step2, cx: 275 },
          { x1: 400, x2: 430, cap: captions.step3, cx: 415 },
          { x1: 540, x2: 570, cap: captions.step4, cx: 555 },
          { x1: 680, x2: 670, cap: captions.step5, cx: 675 }
        ].map((a, i) => (
          <g key={i}>
            <line x1={a.x1} y1={130} x2={a.x2} y2={130} markerEnd="url(#arr)"
              className="stroke-gray-500 dark:stroke-gray-300" strokeWidth="1.5" />
            <text x={a.cx} y={92} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[10px]">{a.cap}</text>
          </g>
        ))}
        <g>
          <line x1={710} y1={160} x2={710} y2={210} markerEnd="url(#arr)" className="stroke-gray-500 dark:stroke-gray-300" strokeWidth="1.5" />
          <rect x={655} y={210} width={110} height={50} rx={10} className="fill-white dark:fill-white/5 stroke-gray-300 dark:stroke-white/15" strokeWidth="1.5" />
          <text x={710} y={240} textAnchor="middle" className="fill-gray-900 dark:fill-white text-[12px] font-medium">{labels.code}</text>
          <text x={720} y={185} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[10px]">{captions.step6}</text>
        </g>
      </svg>
    </div>
  );
}

function WorkflowDiagram({ steps }: { steps: { num: string; title: string }[] }) {
  const palette = [
    { fill: 'fill-indigo-100 dark:fill-indigo-500/15', stroke: 'stroke-indigo-300 dark:stroke-indigo-400/40', text: 'fill-indigo-900 dark:fill-indigo-200' },
    { fill: 'fill-violet-100 dark:fill-violet-500/15', stroke: 'stroke-violet-300 dark:stroke-violet-400/40', text: 'fill-violet-900 dark:fill-violet-200' },
    { fill: 'fill-fuchsia-100 dark:fill-fuchsia-500/15', stroke: 'stroke-fuchsia-300 dark:stroke-fuchsia-400/40', text: 'fill-fuchsia-900 dark:fill-fuchsia-200' },
    { fill: 'fill-pink-100 dark:fill-pink-500/15', stroke: 'stroke-pink-300 dark:stroke-pink-400/40', text: 'fill-pink-900 dark:fill-pink-200' }
  ];
  return (
    <div className="mt-6 rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5 overflow-x-auto">
      <svg viewBox="0 0 720 180" role="img" aria-label="Design system generation workflow" className="w-full h-auto min-w-[600px]">
        <defs>
          <marker id="warr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-gray-500 dark:fill-gray-300" />
          </marker>
        </defs>
        {steps.map((s, i) => {
          const x = 20 + i * 175;
          const p = palette[i % palette.length]!;
          return (
            <g key={i}>
              <rect x={x} y={50} width={150} height={80} rx={14} className={`${p.fill} ${p.stroke}`} strokeWidth="1.5" />
              <circle cx={x + 22} cy={72} r={14} className={`${p.fill} ${p.stroke}`} strokeWidth="1.5" />
              <text x={x + 22} y={76} textAnchor="middle" className={`${p.text} text-[12px] font-bold`}>{s.num}</text>
              <text x={x + 75} y={104} textAnchor="middle" className="fill-gray-900 dark:fill-white text-[12px] font-semibold">{s.title}</text>
              {i < steps.length - 1 ? (
                <line x1={x + 150} y1={90} x2={x + 175} y2={90} markerEnd="url(#warr)" className="stroke-gray-500 dark:stroke-gray-300" strokeWidth="1.5" />
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function getDocDefinition(slug: DocSlug, t: Translator): { toc: TocItem[]; content: React.ReactNode } {
  switch (slug) {
    case 'getting-started': {
      const toc: TocItem[] = [
        { id: 'overview', title: t('docs.sections.overview') },
        { id: 'problem', title: t('docs.gettingStarted.problem.title') },
        { id: 'audience', title: t('docs.gettingStarted.audience.title') },
        { id: 'architecture', title: t('docs.gettingStarted.architecture.title') },
        { id: 'features', title: t('docs.gettingStarted.features.title') },
        { id: 'comparison', title: t('docs.gettingStarted.comparison.title') },
        { id: 'should-you-use', title: t('docs.gettingStarted.shouldYouUse.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const problemPoints = t.raw('docs.gettingStarted.problem.points') as { title: string; body: string }[];
      const audienceItems = t.raw('docs.gettingStarted.audience.items') as { role: string; body: string }[];
      const featureItems = t.raw('docs.gettingStarted.features.items') as { title: string; desc: string }[];
      const comparisonHeaders = t.raw('docs.gettingStarted.comparison.headers') as { approach: string; strengths: string; limits: string };
      const comparisonRows = t.raw('docs.gettingStarted.comparison.rows') as { approach: string; strengths: string; limits: string }[];
      const shouldItems = t.raw('docs.gettingStarted.shouldYouUse.items') as { id: string; label: string }[];
      const archLabels = t.raw('docs.gettingStarted.architecture.labels') as { you: string; assistant: string; skill: string; kb: string; reasoning: string; output: string; code: string };
      const archCaptions = t.raw('docs.gettingStarted.architecture.captions') as { step1: string; step2: string; step3: string; step4: string; step5: string; step6: string };

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.gettingStarted.overview')}
            </p>
          </section>

          <section id="problem" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.problem.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.gettingStarted.problem.lead')}
            </p>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              {problemPoints.map((p) => (
                <div key={p.title} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-2">{p.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="audience" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.audience.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.gettingStarted.audience.subtitle')}
            </p>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              {audienceItems.map((a) => (
                <div key={a.role} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-2">{a.role}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="architecture" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.architecture.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.gettingStarted.architecture.body')}
            </p>
            <ArchitectureDiagram labels={archLabels} captions={archCaptions} />
          </section>

          <section id="features" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.features.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.gettingStarted.features.intro')}
            </p>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              {featureItems.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="comparison" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.comparison.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.gettingStarted.comparison.subtitle')}
            </p>
            <div className="mt-5 rounded-xl border border-gray-200/70 dark:border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100/50 dark:bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{comparisonHeaders.approach}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{comparisonHeaders.strengths}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{comparisonHeaders.limits}</th>
                  </tr>
                </thead>
                <tbody className="bg-white/70 dark:bg-black/20">
                  {comparisonRows.map((r, i) => (
                    <tr key={i} className="border-t border-gray-200/70 dark:border-white/10 align-top">
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">{r.approach}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{r.strengths}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{r.limits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="should-you-use" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.gettingStarted.shouldYouUse.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.gettingStarted.shouldYouUse.subtitle')}
            </p>
            <ul className="mt-5 space-y-2">
              {shouldItems.map((it) => (
                <li key={it.id} className="flex items-start gap-3 rounded-lg border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-3">
                  <span className="mt-0.5 w-4 h-4 rounded border border-gray-300 dark:border-white/20 shrink-0" aria-hidden />
                  <span className="text-sm text-gray-800 dark:text-gray-200">{it.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="next" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
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
        { id: 'primer', title: t('docs.dsg.primer.title') },
        { id: 'workflow', title: t('docs.dsg.workflow.title') },
        { id: 'deep-dive', title: t('docs.dsg.deepDive.title') },
        { id: 'anatomy', title: t('docs.dsg.anatomy.title') },
        { id: 'persist', title: t('docs.dsg.persist.title') },
        { id: 'tuning', title: t('docs.dsg.tuning.title') },
        { id: 'troubleshooting', title: t('docs.dsg.troubleshooting.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const primerItems = t.raw('docs.dsg.primer.items') as { title: string; body: string }[];
      const workflowSteps = t.raw('docs.dsg.workflow.steps') as { num: string; title: string; desc: string }[];
      const deepDiveStages = t.raw('docs.dsg.deepDive.stages') as { label: string; body: string }[];
      const scopes = t.raw('docs.dsg.persist.scopes') as { title: string; body: string; commandTitle: string; commands: string };
      const tuningItems = t.raw('docs.dsg.tuning.items') as { title: string; body: string }[];
      const troubleshootingItems = t.raw('docs.dsg.troubleshooting.items') as { q: string; a: string }[];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.dsg.overview')}
            </p>
          </section>

          <section id="primer" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.primer.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.dsg.primer.lead')}
            </p>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              {primerItems.map((p) => (
                <div key={p.title} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-2">{p.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="workflow" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.workflow.title')}
            </h2>
            <p className="mt-2 mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.dsg.workflow.subtitle')}
            </p>
            <WorkflowDiagram steps={workflowSteps.map((s) => ({ num: s.num, title: s.title }))} />
            <div className="mt-6 flex flex-col gap-4">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="relative rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5 flex items-start">
                  <div className="shrink-0 mr-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="deep-dive" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.deepDive.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.dsg.deepDive.subtitle')}
            </p>
            <div className="mt-5 space-y-4">
              {deepDiveStages.map((s) => (
                <div key={s.label} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2 tracking-wide uppercase">
                    {s.label}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{s.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="anatomy" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.anatomy.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.dsg.anatomy.body')}
            </p>
            <div className="mt-4">
              <CodeBlock title={t('docs.dsg.anatomy.exampleTitle')} language="markdown" code={t('docs.dsg.anatomy.exampleCode')} />
            </div>
          </section>

          <section id="persist" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.persist.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.dsg.persist.body')}
            </p>
            <h3 className="mt-6 font-heading font-semibold text-gray-900 dark:text-white">{scopes.title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">{scopes.body}</p>
            <div className="mt-4">
              <CodeBlock title={scopes.commandTitle} language="bash" code={scopes.commands} />
            </div>
          </section>

          <section id="tuning" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.tuning.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.dsg.tuning.subtitle')}
            </p>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              {tuningItems.map((it) => (
                <div key={it.title} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-2">{it.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{it.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="troubleshooting" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.dsg.troubleshooting.title')}
            </h2>
            <div className="mt-4 space-y-3">
              {troubleshootingItems.map((qa) => (
                <details key={qa.q} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4">
                  <summary className="cursor-pointer font-heading font-semibold text-gray-900 dark:text-white">{qa.q}</summary>
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{qa.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section id="next" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
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
        { id: 'decision', title: t('docs.cli.decision.title') },
        { id: 'cli-install', title: t('docs.cli.tabs.cliInstall') },
        { id: 'manual-install', title: t('docs.cli.tabs.manualInstall') },
        { id: 'prerequisites', title: t('docs.cli.tabs.prerequisites') },
        { id: 'platforms', title: t('docs.cli.platforms.title') },
        { id: 'updates', title: t('docs.cli.updates.title') },
        { id: 'uninstall', title: t('docs.cli.uninstall.title') },
        { id: 'errors', title: t('docs.cli.errors.title') },
        { id: 'offline', title: t('docs.cli.offline.title') },
        { id: 'other-commands', title: t('docs.cli.otherCommands.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const cliInstallCommands = t.raw('docs.cli.cliInstall.step3.commands') as string[];
      const manualInstallTable = t.raw('docs.cli.manualInstall.table') as {
        header: { assistant: string; folders: string };
        rows: { assistant: string; folders: string }[];
      };
      const otherCommands = t.raw('docs.cli.otherCommands.commands') as string[];
      const decisionOptions = t.raw('docs.cli.decision.options') as { title: string; when: string; why: string }[];
      const platformItems = t.raw('docs.cli.platforms.items') as { os: string; body: string }[];
      const errorHeaders = t.raw('docs.cli.errors.headers') as { error: string; cause: string; fix: string };
      const errorRows = t.raw('docs.cli.errors.rows') as { error: string; cause: string; fix: string }[];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.cli.overview')}
            </p>
          </section>

          <section id="decision" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.decision.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.cli.decision.subtitle')}
            </p>
            <div className="mt-5 grid md:grid-cols-3 gap-4">
              {decisionOptions.map((o) => (
                <div key={o.title} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5 flex flex-col gap-2">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white">{o.title}</div>
                  <div className="text-xs uppercase tracking-wide text-purple-700 dark:text-purple-300 font-semibold">When</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{o.when}</div>
                  <div className="text-xs uppercase tracking-wide text-purple-700 dark:text-purple-300 font-semibold mt-1">Why</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{o.why}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="cli-install" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('docs.cli.tabs.cliInstall')}
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200/70 dark:border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="p-6 space-y-6 font-mono text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2"># {t('docs.cli.cliInstall.step1.title')}</div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">npm</span>{' '}
                      <span className="text-blue-600 dark:text-blue-400">install</span>{' '}
                      <span className="text-pink-600 dark:text-pink-400">-g</span>{' '}
                      <span className="text-cyan-600 dark:text-cyan-400">uipro-cli</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2"># {t('docs.cli.cliInstall.step2.title')}</div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">cd</span>{' '}
                      <span className="text-pink-600 dark:text-pink-400">/path/to/your/project</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2"># {t('docs.cli.cliInstall.step3.title')}</div>
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
                              <span className="text-gray-500 dark:text-gray-400"> # {comment.trim()}</span>
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

          <section id="manual-install" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('docs.cli.tabs.manualInstall')}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('docs.cli.manualInstall.description')}</p>
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
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{row.assistant}</td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">{row.folders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="prerequisites" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('docs.cli.tabs.prerequisites')}
            </h2>
            <div className="space-y-4">
              <Callout tone="warning" title={t('docs.cli.prerequisites.warning')}>
                {t('docs.cli.prerequisites.description')}
              </Callout>
              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200/70 dark:border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="p-6 space-y-6 font-mono text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2"># {t('docs.cli.prerequisites.checkPython')}</div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">{t('docs.cli.prerequisites.checkCommand')}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-2"># {t('docs.cli.prerequisites.installMac')}</div>
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

          <section id="platforms" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.platforms.title')}
            </h2>
            <div className="mt-5 space-y-4">
              {platformItems.map((p) => (
                <div key={p.os} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-2">{p.os}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{p.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="updates" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.updates.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.cli.updates.body')}
            </p>
            <div className="mt-4">
              <CodeBlock title={t('docs.cli.updates.commandsTitle')} language="bash" code={t('docs.cli.updates.commands')} />
            </div>
          </section>

          <section id="uninstall" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.uninstall.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.cli.uninstall.body')}
            </p>
            <div className="mt-4">
              <CodeBlock title={t('docs.cli.uninstall.commandsTitle')} language="bash" code={t('docs.cli.uninstall.commands')} />
            </div>
          </section>

          <section id="errors" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.errors.title')}
            </h2>
            <div className="mt-5 rounded-xl border border-gray-200/70 dark:border-white/10 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100/50 dark:bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{errorHeaders.error}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{errorHeaders.cause}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{errorHeaders.fix}</th>
                  </tr>
                </thead>
                <tbody className="bg-white/70 dark:bg-black/20">
                  {errorRows.map((row, i) => (
                    <tr key={i} className="border-t border-gray-200/70 dark:border-white/10 align-top">
                      <td className="px-4 py-3 font-mono text-xs text-gray-900 dark:text-gray-100">{row.error}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.cause}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="offline" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.offline.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.cli.offline.body')}
            </p>
          </section>

          <section id="other-commands" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.cli.otherCommands.title')}
            </h2>
            <div className="mt-4 rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200/70 dark:border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="p-6 font-mono text-sm space-y-1">
                {otherCommands.map((cmd, idx) => {
                  const [command, comment] = cmd.split('#');
                  return (
                    <div key={idx} className="text-gray-900 dark:text-gray-100">
                      <span className="text-purple-600 dark:text-purple-400">{command.trim()}</span>
                      {comment && (
                        <span className="text-gray-500 dark:text-gray-400"> # {comment.trim()}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="next" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
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
        { id: 'anatomy', title: t('docs.examples.anatomy.title') },
        { id: 'usage', title: t('docs.examples.usage.title') },
        { id: 'worked', title: t('docs.examples.worked.title') },
        { id: 'iterating', title: t('docs.examples.iterating.title') },
        { id: 'library', title: t('docs.examples.library.title') },
        { id: 'anti-prompts', title: t('docs.examples.antiPrompts.title') },
        { id: 'prompts', title: t('docs.examples.prompts.title') },
        { id: 'next', title: t('docs.sections.next') }
      ];

      const assistants = t.raw('docs.examples.usage.assistants') as Array<{ name: string; description: string; example: string }>;
      const anatomyParts = t.raw('docs.examples.anatomy.parts') as { label: string; body: string }[];
      const workedItems = t.raw('docs.examples.worked.items') as { title: string; prompt: string; outputTitle: string; output: string }[];
      const iteratingPatterns = t.raw('docs.examples.iterating.patterns') as { title: string; body: string }[];
      const libraryDomains = t.raw('docs.examples.library.domains') as { name: string; prompts: string[] }[];
      const antiItems = t.raw('docs.examples.antiPrompts.items') as { bad: string; why: string }[];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.overview')}
            </p>
          </section>

          <section id="anatomy" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.anatomy.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.anatomy.lead')}
            </p>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              {anatomyParts.map((p) => (
                <div key={p.label} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-2">{p.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="usage" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.usage.title')}
            </h2>
            <p className="mt-2 mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.usage.subtitle')}
            </p>
            <div className="space-y-4">
              {assistants.map((assistant, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{assistant.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{assistant.description}</p>
                  <div className="rounded-lg bg-gray-100/50 dark:bg-black/30 p-3 font-mono text-sm">
                    <code className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{assistant.example}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="worked" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.worked.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.worked.subtitle')}
            </p>
            <div className="mt-5 space-y-6">
              {workedItems.map((w) => (
                <div key={w.title} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-3">{w.title}</div>
                  <div className="text-xs uppercase tracking-wide text-purple-700 dark:text-purple-300 font-semibold mb-1">Prompt</div>
                  <div className="rounded-lg bg-gray-100/50 dark:bg-black/30 p-3 text-sm text-gray-800 dark:text-gray-200 mb-3">{w.prompt}</div>
                  <CodeBlock title={w.outputTitle} language="text" code={w.output} />
                </div>
              ))}
            </div>
          </section>

          <section id="iterating" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.iterating.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.iterating.lead')}
            </p>
            <div className="mt-5 grid md:grid-cols-3 gap-4">
              {iteratingPatterns.map((p) => (
                <div key={p.title} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-2">{p.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="library" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.library.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.library.subtitle')}
            </p>
            <div className="mt-5 space-y-5">
              {libraryDomains.map((d) => (
                <div key={d.name} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-5">
                  <div className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-3">{d.name}</div>
                  <ul className="space-y-2">
                    {d.prompts.map((pr, i) => (
                      <li key={i} className="rounded-lg bg-gray-100/50 dark:bg-black/30 p-3 text-sm text-gray-800 dark:text-gray-200 font-mono">
                        {pr}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="anti-prompts" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.antiPrompts.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.antiPrompts.lead')}
            </p>
            <div className="mt-5 space-y-3">
              {antiItems.map((it) => (
                <div key={it.bad} className="rounded-xl border border-orange-200/70 dark:border-orange-400/20 bg-orange-50/60 dark:bg-orange-900/10 p-5">
                  <div className="font-mono text-sm text-orange-900 dark:text-orange-200 mb-2">"{it.bad}"</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{it.why}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="prompts" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.examples.prompts.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.prompts.body')}
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {(t.raw('docs.examples.prompts.items') as string[]).map((item) => (
                <li key={item} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4 text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="next" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.next')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.examples.next')}
            </p>
          </section>
        </>
      );

      return { toc, content };
    }

    case 'faq': {
      const groups = t.raw('docs.faq.groups') as { title: string; items: { q: string; a: string }[] }[];
      const toc: TocItem[] = [
        { id: 'overview', title: t('docs.sections.overview') },
        ...groups.map((g, i) => ({ id: `group-${i}`, title: g.title }))
      ];

      const content = (
        <>
          <section id="overview" className="mt-10">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {t('docs.sections.overview')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('docs.faq.overview')}
            </p>
          </section>

          {groups.map((g, gi) => (
            <section key={gi} id={`group-${gi}`} className="mt-12">
              <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">{g.title}</h2>
              <div className="mt-4 space-y-3">
                {g.items.map((qa) => (
                  <details key={qa.q} className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-4">
                    <summary className="cursor-pointer font-heading font-semibold text-gray-900 dark:text-white">{qa.q}</summary>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{qa.a}</div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-12">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('docs.faq.next')}</p>
          </section>
        </>
      );

      return { toc, content };
    }
  }
}
