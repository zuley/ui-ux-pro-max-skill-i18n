import type { TutorialSeriesMeta } from '@/lib/content/types';

/**
 * "Build a SaaS landing page" — the inaugural tutorial series.
 *
 * Each step is keyed by its file basename (without .mdx); the locale
 * subdirectory is resolved by lib/content/tutorials.ts at read time.
 * Add new steps by creating <step>.mdx under each locale and appending
 * the basename here.
 */
const meta: TutorialSeriesMeta = {
  slug: 'build-a-saas-landing',
  titleKey: 'tutorials.series.saasLanding.title',
  descriptionKey: 'tutorials.series.saasLanding.description',
  steps: [
    '01-style-and-palette',
    '02-first-prompt',
    // Reserved for follow-up PRs:
    // '03-iterating',
    // '04-charts-and-data',
    // '05-ship-checklist',
  ],
};

export default meta;
