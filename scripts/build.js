const fs = require('fs');
const path = require('path');

const root = process.cwd();
const out = path.join(root, 'public');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

console.log('Building public/ directory...');
ensureDir(out);

// Copy top-level static files (html, css, js)
const files = fs.readdirSync(root).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.html', '.css', '.js'].includes(ext) && f !== 'package-lock.json';
});

files.forEach(f => {
  const src = path.join(root, f);
  const dest = path.join(out, f);
  copyFile(src, dest);
});

// Copy scripts folder (if any) but skip node_modules
const scriptsSrc = path.join(root, 'scripts');
if (fs.existsSync(scriptsSrc)) {
  const destDir = path.join(out, 'scripts');
  ensureDir(destDir);
  const items = fs.readdirSync(scriptsSrc);
  items.forEach(it => {
    const s = path.join(scriptsSrc, it);
    const d = path.join(destDir, it);
    copyFile(s, d);
  });
}

console.log('public/ built with files:', fs.readdirSync(out));
