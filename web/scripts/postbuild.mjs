#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../out');
const enDir = path.join(outDir, 'en');

console.log('📦 Post-build: Copying default locale to root...');

if (!fs.existsSync(enDir)) {
  console.error('❌ Error: /en directory not found in out/');
  process.exit(1);
}

const files = fs.readdirSync(enDir);
let copiedCount = 0;

files.forEach((file) => {
  const srcPath = path.join(enDir, file);
  const destPath = path.join(outDir, file);

  if (fs.existsSync(destPath) && !file.startsWith('__next')) {
    return;
  }

  const stat = fs.statSync(srcPath);
  if (stat.isFile()) {
    fs.copyFileSync(srcPath, destPath);
    copiedCount++;
  }
});

console.log(`✅ Copied ${copiedCount} files from /en to root`);
console.log('✨ Build complete! Root path (/) now serves English version.');

