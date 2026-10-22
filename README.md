# pixel-adventure
## 앱 빌드 (Capacitor)

- 앱 ID: `com.habitmonster.pixeladventure`, 앱 이름: 픽셀 모험단
- `npm install` → `npm run sync` : 루트의 `index.html`을 `www/`로 복사하고 android/ios 프로젝트에 반영
- Codemagic `android-test` 워크플로가 설치용 테스트 APK를 만듭니다 (`codemagic.yaml`).
- 웹 버전(GitHub Pages)은 지금처럼 루트의 `index.html`을 그대로 씁니다.
