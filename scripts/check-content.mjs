import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const locales = ['en', 'zh', 'vi', 'ja', 'hi'];
const snapshot = JSON.parse(await readFile('lib/upstream-content.json', 'utf8'));
const siteCopy = JSON.parse(await readFile('lib/site-copy.json', 'utf8'));
const messages = Object.fromEntries(await Promise.all(locales.map(async locale => [
  locale, JSON.parse(await readFile(`messages/${locale}.json`, 'utf8'))
])));
const failures = [];
function check(condition, message) { if (!condition) failures.push(message); }
function leaves(value, prefix = '') {
  if (typeof value === 'string') return [[prefix, value]];
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, item]) => leaves(item, prefix ? `${prefix}.${key}` : key));
}
const en = new Map(leaves(messages.en));
for (const locale of locales) {
  const entries = new Map(leaves(messages[locale]));
  for (const key of en.keys()) check(entries.has(key), `${locale}: missing ${key}`);
  for (const [key, value] of entries) {
    check(en.has(key), `${locale}: unexpected ${key}`);
    check(!/\buipro-cli\b|\+palette|\+style|\+font|design-system\/MASTER\.md|design-system\/pages\//.test(value), `${locale}.${key}: stale command/path`);
    for (const [, token] of value.matchAll(/\[\[([a-zA-Z]+)\]\]/g)) {
      check(token in snapshot.counts, `${locale}.${key}: unknown catalog token ${token}`);
    }
    const variables = text => [...text.matchAll(/\{(\w+)(?:[,}])/g)].map(match => match[1]).sort().join(',');
    if (en.has(key)) check(variables(value) === variables(en.get(key)), `${locale}.${key}: ICU placeholders differ`);
  }
  check(Object.keys(messages[locale].techStacks.stacks).length === snapshot.counts.stacks, `${locale}: stack count mismatch`);
  check(messages[locale].provenance.identity === siteCopy[locale].identity, `${locale}: site identity differs between legal and content pages`);
  check(messages[locale].provenance.maintainer === siteCopy[locale].maintainer, `${locale}: maintainer identity differs`);
}
assert.equal(snapshot.counts.styles, snapshot.counts.activeStyles + snapshot.counts.supplementalStyles);

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
  return nested.flat();
}
const articles = (await filesIn(path.join(root, 'content'))).filter(file => file.endsWith('.mdx'));
let unverified = 0;
for (const file of articles) {
  const text = await readFile(file, 'utf8');
  const { data } = matter(text);
  check(['translation', 'editorial', 'unverified'].includes(data.contentKind), `${file}: missing contentKind`);
  check(Boolean(data.reviewedAt), `${file}: missing reviewedAt`);
  if (data.contentKind === 'translation') check(Boolean(data.sourceUrl && data.sourceAuthor && data.sourceRef), `${file}: translation requires original source attribution`);
  if (data.contentKind === 'unverified') unverified++;
  check(!/\+palette|\+style|\+font|\buipro-cli\b|我们编进|we encoded into|our Skill/.test(text), `${file}: unsupported command or authorship claim`);
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Content checks passed: ${locales.length} locales, ${articles.length} articles, ${snapshot.counts.stacks} stacks. ${unverified} articles explicitly retain unverified original-source status.`);
}
