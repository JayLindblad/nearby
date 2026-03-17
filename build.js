#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read environment variables (or use defaults for local dev)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing environment variables!');
  console.error('Set SUPABASE_URL and SUPABASE_KEY before running build.js');
  process.exit(1);
}

// Create dist directories
const distDir = path.join(__dirname, 'dist');
const appDir = path.join(distDir, 'app');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
if (!fs.existsSync(appDir)) fs.mkdirSync(appDir);

// Build landing page → dist/index.html (no env vars needed)
const landingSource = path.join(__dirname, 'landing.html');
fs.copyFileSync(landingSource, path.join(distDir, 'index.html'));
console.log('✓ Copied landing.html → dist/index.html');

// Build app → dist/app/index.html (inject Supabase credentials)
let appContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
appContent = appContent.replace('{{SUPABASE_URL}}', SUPABASE_URL);
appContent = appContent.replace('{{SUPABASE_KEY}}', SUPABASE_KEY);
fs.writeFileSync(path.join(appDir, 'index.html'), appContent, 'utf8');
console.log('✓ Built index.html with env vars → dist/app/index.html');
console.log(`  SUPABASE_URL: ${SUPABASE_URL.substring(0, 30)}...`);
console.log(`  SUPABASE_KEY: ${SUPABASE_KEY.substring(0, 20)}...`);
