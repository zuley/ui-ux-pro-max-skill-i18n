#!/usr/bin/env node

/**
 * Post-build script to copy default locale (en) to root for static export
 * This ensures that accessing / shows the English version
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const enDir = path.join(outDir, 'en');

console.log('📦 Post-build: Copying default locale to root...');

if (!fs.existsSync(enDir)) {
  console.error('❌ Error: /en directory not found in out/');
  process.exit(1);
}

// Copy all files from /en to root
const files = fs.readdirSync(enDir);
let copiedCount = 0;

files.forEach(file => {
  const srcPath = path.join(enDir, file);
  const destPath = path.join(outDir, file);
  
  // Skip if already exists (don't overwrite static assets)
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
