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

// Read source file
const sourceFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(sourceFile, 'utf8');

// Replace placeholders
content = content.replace('{{SUPABASE_URL}}', SUPABASE_URL);
content = content.replace('{{SUPABASE_KEY}}', SUPABASE_KEY);

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Write built file
const outFile = path.join(distDir, 'index.html');
fs.writeFileSync(outFile, content, 'utf8');

console.log('✓ Built index.html with environment variables');
console.log(`  SUPABASE_URL: ${SUPABASE_URL.substring(0, 30)}...`);
console.log(`  SUPABASE_KEY: ${SUPABASE_KEY.substring(0, 20)}...`);
