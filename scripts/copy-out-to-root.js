const fs = require('fs');
const path = require('path');

function copyRecursive(src, dst) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(d, { recursive: true });
      copyRecursive(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

const outDir = path.join(__dirname, '..', 'undangan');
const rootDir = path.join(__dirname, '..');

copyRecursive(outDir, rootDir);
console.log('Copied out/ → project root');
