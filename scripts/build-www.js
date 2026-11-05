// 앱(Capacitor)에 넣을 게임 파일을 www/ 로 복사해요.
// 지금 앱에 들어가는 게임: game/ 폴더 (픽셀 원정대 classic 최신판 · index.html + m/ g/ 그림).
// 웹 버전(GitHub Pages, main 브랜치)은 이 파일과 상관없어요.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = path.join(root, 'game');
const out = path.join(root, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src, out, { recursive: true });
console.log('www/ ready (game/ → www/)');
