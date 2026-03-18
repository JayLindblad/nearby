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

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// Build merged app → dist/index.html (inject Supabase credentials)
let appContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
appContent = appContent.replace('{{SUPABASE_URL}}', SUPABASE_URL);
appContent = appContent.replace('{{SUPABASE_KEY}}', SUPABASE_KEY);
fs.writeFileSync(path.join(distDir, 'index.html'), appContent, 'utf8');
console.log('✓ Built index.html with env vars → dist/index.html');
console.log(`  SUPABASE_URL: ${SUPABASE_URL.substring(0, 30)}...`);
console.log(`  SUPABASE_KEY: ${SUPABASE_KEY.substring(0, 20)}...`);
