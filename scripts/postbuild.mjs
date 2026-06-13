#!/usr/bin/env node

// Post-build fixes for the static export.
//
// English root pages (`/`, `/blog`, …) are emitted directly by the
// `app/(en)` route group; the `app/[locale]` tree only emits the
// prefixed locales (see `prefixedLocales` in i18n/routing.ts). This
// script no longer copies `/en` to the root — it only patches the
// Next 16 segment-prefetch layout quirk described below.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../out');

// --- Guard: the export must not contain a duplicate /en site copy ----
// If out/en reappears, someone re-added `en` to a generateStaticParams
// in the app/[locale] tree. Fail loudly instead of shipping duplicate
// content at /en/*.
if (fs.existsSync(path.join(outDir, 'en'))) {
  console.error(
    '❌ out/en exists — the app/[locale] tree generated pages for the default locale.\n' +
      '   Use `prefixedLocales` (i18n/routing.ts) in generateStaticParams instead of routing.locales.'
  );
  process.exit(1);
}

// --- Fix Next.js 16 segment-prefetch path mismatch on static hosts ---
// Next 16's client segment-cache prefetch requests RSC payloads with
// dot-joined paths, e.g. /blog/__next.$d$locale.blog.__PAGE__.txt, but the
// static export emits them as directories: /blog/__next.$d$locale/blog/__PAGE__.txt
// On a static host every <Link> prefetch 404s, polluting the console (and
// failing Lighthouse "errors in console" / best-practices). We mirror each
// file inside a `__next.*` directory to the flattened, dot-joined name the
// client expects, placed alongside that directory.
console.log('🔗 Post-build: Aliasing RSC segment-prefetch files...');

function walkFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(p));
    else out.push(p);
  }
  return out;
}

// Collect prefetch segment roots (`__next.*` dirs) without descending into them.
function findSegmentDirs(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const p = path.join(dir, entry.name);
    if (entry.name.startsWith('__next.')) out.push(p);
    else out.push(...findSegmentDirs(p));
  }
  return out;
}

let aliasCount = 0;
for (const segDir of findSegmentDirs(outDir)) {
  const parent = path.dirname(segDir);
  const base = path.basename(segDir); // e.g. __next.$d$locale
  for (const file of walkFiles(segDir)) {
    const rel = path.relative(segDir, file).split(path.sep).join('.');
    fs.copyFileSync(file, path.join(parent, `${base}.${rel}`));
    aliasCount++;
  }
}
console.log(`✅ Created ${aliasCount} segment-prefetch aliases`);

console.log('✨ Build complete!');
