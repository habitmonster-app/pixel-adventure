// 앱(Capacitor)에 넣을 게임 파일을 www/ 로 복사해요.
// 지금 앱에 들어가는 게임: game/ 폴더 (index.html + m/ g/ 그림).
// app/app-bridge.js (광고·결제 연결부 window.APP)를 www/ 에 넣고 index.html 머리에 붙여요.
// 웹 버전(GitHub Pages, main 브랜치)은 이 파일과 상관없어요.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = path.join(root, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(path.join(root, 'game'), out, { recursive: true });
fs.copyFileSync(path.join(root, 'app', 'app-bridge.js'), path.join(out, 'app-bridge.js'));
const idx = path.join(out, 'index.html');
let h = fs.readFileSync(idx, 'utf8');
const tag = '<script src="app-bridge.js"></script>\n';
h = h.replace(/(<meta name="viewport"[^>]*>\n?)/, '$1' + tag);
if (!h.includes(tag)) throw new Error('app-bridge 넣을 자리를 못 찾았어요');
fs.writeFileSync(idx, h);
console.log('www/ ready (game/ → www/, app-bridge.js 붙임)');
