import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceFiles = [
  'components/stats.tsx',
  'components/footer.tsx',
  'components/tech-stacks.tsx',
  'components/navbar.tsx',
  'components/quick-start.tsx',
  'components/docs/docs-sidebar.tsx',
  'components/search/search-modal.tsx',
  'content/docs/page-definitions.tsx',
  'app/[locale]/docs/page.tsx'
];
const linkSourceFiles = [
  ...sourceFiles,
  'components/hero.tsx',
  'components/gallery.tsx'
];

const expectedSnippets = [
  '67',
  '161',
  '57',
  '99',
  '25',
  '16',
  'Design System Generator',
  '--persist'
];
const expectedStackFiles = [
  'angular.csv',
  'astro.csv',
  'flutter.csv',
  'html-tailwind.csv',
  'jetpack-compose.csv',
  'laravel.csv',
  'nextjs.csv',
  'nuxt-ui.csv',
  'nuxtjs.csv',
  'react-native.csv',
  'react.csv',
  'shadcn.csv',
  'svelte.csv',
  'swiftui.csv',
  'threejs.csv',
  'vue.csv'
];
const stackDataDirs = [
  '../.shared/ui-ux-pro-max/data/stacks',
  '../cli/assets/.shared/ui-ux-pro-max/data/stacks',
  '../.codex/skills/ui-ux-pro-max/data/stacks',
  '../cli/assets/.codex/skills/ui-ux-pro-max/data/stacks'
];

const stalePatterns = [
  /\b95\b/,
  /\b56\b/,
  /\b98\b/,
  /\b24 Chart Types\b/,
  /\b24 种图表类型\b/,
  /\b24 chart types\b/i,
  /\b11 Tech Stacks\b/,
  /\b11 种技术栈/,
  /\b8 Tech Stacks\b/,
  /\b8 tech stacks\b/i
];

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8');
}

function getConfiguredLocales() {
  const routing = read('i18n/routing.ts');
  const match = routing.match(/locales:\s*\[([^\]]+)\]/);
  if (!match) {
    failures.push('routing.ts should define a locales array');
    return [];
  }

  return [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((entry) => entry[1]);
}

for (const locale of getConfiguredLocales()) {
  const raw = read(path.join('messages', `${locale}.json`));
  const messages = JSON.parse(raw);
  for (const snippet of expectedSnippets) {
    check(raw.includes(snippet), `${locale}.json should include "${snippet}"`);
  }
  for (const pattern of stalePatterns) {
    check(!pattern.test(raw), `${locale}.json still contains stale pattern ${pattern}`);
  }
  check(
    messages.docs.cli.cliInstall.step3.commands.some((cmd) => cmd.includes('codebuddy')),
    `${locale}.json CLI commands should include codebuddy`
  );
  check(
    messages.docs.cli.cliInstall.step3.commands.some((cmd) => cmd.includes('augment')),
    `${locale}.json CLI commands should include augment`
  );
  check(
    JSON.stringify(messages.techStacks.stacks).includes('Three.js'),
    `${locale}.json tech stacks should include Three.js`
  );
}

const allSource = sourceFiles.map((file) => `${file}\n${read(file)}`).join('\n\n');
const allLinkSource = linkSourceFiles.map((file) => `${file}\n${read(file)}`).join('\n\n');
for (const pattern of stalePatterns) {
  check(!pattern.test(allSource), `source still contains stale pattern ${pattern}`);
}
check(allSource.includes("{ value: '67'"), 'stats should show 67 styles');
check(allSource.includes("{ value: '161'"), 'stats should show 161 palettes or reasoning rules');
check(allSource.includes("{ value: '16'"), 'stats should show 16 tech stacks');
check(allSource.includes('reasoning'), 'stats should include reasoning rules');
check(!allLinkSource.includes("href=\"/docs/"), 'source should not hard-code unlocalized /docs links');
check(!allLinkSource.includes("href: '/docs"), 'source should not hard-code unlocalized /docs hrefs');
check(!allLinkSource.includes("href: `/docs"), 'source should not hard-code template /docs hrefs');

for (const dir of stackDataDirs) {
  const fullDir = path.resolve(root, dir);
  const files = fs.readdirSync(fullDir).filter((file) => file.endsWith('.csv')).sort();
  check(files.length === expectedStackFiles.length, `${dir} should contain ${expectedStackFiles.length} stack CSV files`);
  for (const file of expectedStackFiles) {
    check(files.includes(file), `${dir} should include ${file}`);
  }
}

if (failures.length) {
  console.error('Content sync verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Content sync verification passed.');
