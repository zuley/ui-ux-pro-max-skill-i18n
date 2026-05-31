#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../out');
const defaultLocaleDir = path.join(outDir, 'en');

console.log('📦 Post-build: Copying default locale (en) to root...');

if (!fs.existsSync(defaultLocaleDir)) {
  console.error('❌ Error: /en directory not found in out/');
  process.exit(1);
}

const files = fs.readdirSync(defaultLocaleDir);
let copiedCount = 0;

files.forEach((file) => {
  const srcPath = path.join(defaultLocaleDir, file);
  const destPath = path.join(outDir, file);

  // If file already exists in root (e.g. 404.html from next build), skip unless it's a Next.js internal file
  // But actually, we usually WANT to overwrite index.html with the localized version.
  // Next.js static export might generate a root index.html that redirects, or nothing.
  // We want to serve the content of /zh at / directly.
  
  const stat = fs.statSync(srcPath);
  
  // Recursively copy directories (like 'docs', '_next' if needed, though _next is usually at root already)
  // For simplicity here, we assume the structure is flat or handled by cp -r logic if we used shell.
  // But node:fs copyFileSync is only for files.
  // Let's use cpSync for recursive copy which is available in newer Node versions, or handle directory logic.
  
  if (stat.isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
      copiedCount++;
  } else {
      fs.copyFileSync(srcPath, destPath);
      copiedCount++;
  }
});

console.log(`✅ Copied ${copiedCount} items from /en to root`);

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

console.log('✨ Build complete! Root path (/) now serves English version.');
