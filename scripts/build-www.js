// Copies the single-file game into www/ for Capacitor. The web version (GitHub Pages) keeps serving the repo root.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = path.join(root, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const file of ['index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png', 'LICENSE-galmuri.txt']) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}
console.log('www/ ready');
