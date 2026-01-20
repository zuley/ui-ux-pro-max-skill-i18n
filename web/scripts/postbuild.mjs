#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../out');
const defaultLocaleDir = path.join(outDir, 'zh');

console.log('📦 Post-build: Copying default locale (zh) to root...');

if (!fs.existsSync(defaultLocaleDir)) {
  console.error('❌ Error: /zh directory not found in out/');
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

console.log(`✅ Copied ${copiedCount} items from /zh to root`);
console.log('✨ Build complete! Root path (/) now serves Chinese version.');

