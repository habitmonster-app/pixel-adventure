# pixel-adventure
## 앱 빌드 (Capacitor)

- 앱 ID: `com.habitmonster.pixeladventure`, 앱 이름: 봉인 기사단 : 마계문 전쟁 (홈 화면 '봉인 기사단')
- `npm install` → `npm run sync` : `game/` 폴더(봉인 기사단 classic 최신판, 게임 v127)를 `www/`로 복사하고 android/ios 프로젝트에 반영
- 화면: 가로·세로 둘 다 (폰의 화면 회전 잠금을 따름), 상태 표시줄·아래 버튼 줄 숨김
- Codemagic `android-test` 워크플로가 설치용 테스트 APK를 만듭니다 (`codemagic.yaml`).
- 웹 버전(GitHub Pages)은 지금처럼 루트의 `index.html`을 그대로 씁니다.
