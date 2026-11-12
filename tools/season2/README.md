# 시즌 2 「얼어붙은 맹세」 만드는 도구

- `js/*.js` → 합쳐서 `s2.js` (`cat js/*.js > s2.js`)
- `python3 build.py` : 출시판 v135 `base/index.html` + `s2_map.json` + `s2.js` → `game/index.html`
  (`base/index.html`은 app-capacitor 브랜치 b78d7d1의 game/index.html 사본)
- `gen_maps.py` : 11~15장 지역 지도(r_D111~D151, o_D*.png) 만들기
- `gen_mobs2.py` : 임시 몬스터·NPC 그림(기존 그림을 얼음빛으로 다시 칠함) 만들기
- `gen_fx2.py` : 지피티 효과 그림 2차 12장(프로젝트 파일 season2/그림원본_효과2/) → `game/m/s2fx2_*.png` + `fx2_art.json` (그 값을 `js/i_art.js`의 FXA2에 붙임)
- `test/` : Playwright 시험 (localhost:8765에서 game/ 열기). t3=11~15장 자동 플레이, t4=봉인·결말, t5=세르카 회고전 세 단계, t6=난이도 비교, t7=창 화면, t20=보스 예고·효과 화면 찍기(OUT=폴더), t21=보스 실제 싸움 밸런스, t22=세르카만 길게
- 기획서 원본: 프로젝트 파일 pixel-adventure/season2/기획/
