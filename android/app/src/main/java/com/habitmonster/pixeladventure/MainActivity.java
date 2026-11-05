package com.habitmonster.pixeladventure;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        hideBars();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideBars();
    }

    // 앱이 뒤로 가면(홈 화면·다른 앱) 게임에 알려서 소리를 멈춰요
    @Override
    public void onPause() {
        super.onPause();
        if (getBridge() != null) getBridge().triggerWindowJSEvent("nativepause");
    }

    @Override
    public void onResume() {
        super.onResume();
        if (getBridge() != null) getBridge().triggerWindowJSEvent("nativeresume");
    }

    // 게임 화면을 꽉 채우려고 위 상태 표시줄과 아래 버튼 줄을 숨겨요 (화면 끝을 밀면 잠깐 나와요)
    private void hideBars() {
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        c.hide(WindowInsetsCompat.Type.systemBars());
        c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    }
}
