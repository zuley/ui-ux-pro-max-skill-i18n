#!/usr/bin/env node

// Static-export guardrails. Keep this script validation-only: Next 16.2 emits
// the flattened segment-prefetch files expected by static hosts, so the old
// alias-copy workaround is no longer required.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, '../out');

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

if (fs.existsSync(path.join(outDir, 'en'))) {
  fail('out/en exists. Use prefixedLocales in app/[locale] generateStaticParams.');
}

for (const requiredFile of ['_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'ads.txt']) {
  if (!fs.existsSync(path.join(outDir, requiredFile))) {
    fail(`Missing required export artifact: out/${requiredFile}`);
  }
}

const sitemap = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
if (/ui-ux-pro-max-skill\.com\/en(?:\/|<)/.test(sitemap)) {
  fail('sitemap.xml contains duplicate /en URLs.');
}
if (!sitemap.includes('<loc>https://ui-ux-pro-max-skill.com/examples/</loc>')) {
  fail('sitemap.xml is missing the examples index.');
}
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!match[1].endsWith('/')) {
    fail(`sitemap.xml contains a redirecting non-trailing-slash URL: ${match[1]}`);
  }
}

function walk(dir, predicate, output = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filePath, predicate, output);
    else if (predicate(filePath)) output.push(filePath);
  }
  return output;
}

const htmlFiles = walk(outDir, (filePath) => filePath.endsWith('.html'));
const brokenLinks = [];
let internalLinkCount = 0;

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const rawHref = match[1].split('#')[0].split('?')[0];
    if (!rawHref || rawHref.startsWith('/_next/')) continue;
    internalLinkCount++;

    let href = rawHref;
    try {
      href = decodeURI(rawHref);
    } catch {
      // Keep the raw path so the missing target fails clearly below.
    }

    const direct = path.join(outDir, href);
    const candidates = [direct, `${direct}.html`, path.join(direct, 'index.html')];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) {
      brokenLinks.push(`${path.relative(outDir, htmlFile)} -> ${rawHref}`);
    }
  }
}

if (brokenLinks.length > 0) {
  fail(`Broken internal links:\n${brokenLinks.slice(0, 20).join('\n')}`);
}

const rootHtml = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
if (!rootHtml.includes('property="og:image"') || !rootHtml.includes('name="twitter:image"')) {
  fail('Root metadata is missing generated Open Graph/Twitter images.');
}

const notFoundHtml = fs.readFileSync(path.join(outDir, '404.html'), 'utf8');
if (
  !notFoundHtml.includes('This route wandered off the design system.') ||
  !notFoundHtml.includes('href="/docs/getting-started/"') ||
  !notFoundHtml.includes('href="/examples/"')
) {
  fail('Custom 404 page or its recovery links are missing from the static export.');
}

const headers = fs.readFileSync(path.join(outDir, '_headers'), 'utf8');
for (const imagePath of ['/opengraph-image', '/twitter-image']) {
  if (!headers.includes(`${imagePath}\n  Content-Type: image/png`)) {
    fail(`Missing image/png response header for ${imagePath}.`);
  }
}
if (!headers.includes('/thumbnails/*\n  Content-Type: image/avif')) {
  fail('Missing AVIF response headers for optimized thumbnails.');
}

const thumbnailDir = path.join(outDir, 'thumbnails');
const optimizedThumbnails = fs.existsSync(thumbnailDir)
  ? walk(thumbnailDir, (filePath) => filePath.endsWith('.avif'))
  : [];
if (optimizedThumbnails.length !== 39) {
  fail(`Expected 39 optimized AVIF thumbnails, found ${optimizedThumbnails.length}.`);
}

const examplesHtml = fs.readFileSync(path.join(outDir, 'examples/index.html'), 'utf8');
if (!/<img[^>]+src="\/thumbnails\/[^"]+\.avif"/.test(examplesHtml)) {
  fail('Examples page is not rendering optimized AVIF thumbnails.');
}

let monetizedPageCount = 0;
for (const htmlFile of htmlFiles) {
  const relativePath = path.relative(outDir, htmlFile);
  const html = fs.readFileSync(htmlFile, 'utf8');
  if (!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle')) continue;

  const isContentRoute = /^(?:(?:zh|vi|ja)\/)?(?:blog|tutorials)\//.test(relativePath);
  if (!isContentRoute) {
    fail(`AdSense script leaked into non-monetized route: ${relativePath}`);
  }
  monetizedPageCount++;
}

if (monetizedPageCount === 0) {
  fail('AdSense script is missing from all eligible content routes.');
}

console.log(`✅ Static export validated: ${htmlFiles.length} HTML files, ${internalLinkCount} internal links, no /en duplicate`);
