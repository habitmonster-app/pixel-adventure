# 시즌 3 「독뿌리의 세 번째 문」 (16~20장) 만들기 도구

game/index.html 은 이 폴더에서 만들어져요. 게임 코드를 직접 고치지 말고 여기 `js/`를 고친 뒤 다시 만들어요.

## 다시 만들기

```
cd tools/season3
python3 gen_maps3.py base/tiles.png ../../game/ s3_map.json   # 지도 (바꿨을 때만)
python3 gen_mobs3.py                                           # 몬스터·인물 그림 (바꿨을 때만)
python3 build3.py                                              # base/index.html + 지도 + js/*.js + 영어 → ../../game/index.html
```

- `base/index.html`: 시즌 2까지 끝난 게임(1.1.2) 원본. build3가 여기에 시즌 3를 붙여요.
- `js/a_base.js`~`g_draw.js`: 시즌 3 코드. 하나의 `(function(){...})()` 안에 들어가서 예전 이름과 부딪히지 않아요.
  저장은 `P.g3`(장치·구조 기록), `P.s3`(완료), `P.ch16`~`P.ch20` — 저장 키 pxclassic2는 그대로.
- `i18n/s3_en.json`, `i18n/s3_en_patterns.json`: 영어. build3가 `apply_en.py`로 넣어요(`/*S3EN*/` 줄).

## 시험

```
cd tools/season3/test
node t1.js                      # 켜지는지·오류
MAXS=1500 node t3.js            # 16장~20장 자동 플레이 (시즌 2 끝난 저장 save_s2done.json에서 시작)
SHOT=1 MAXS=1500 node t3.js     # 화면 사진도 shots/ 에
```
t3가 끝나면 `save_s3done.json`(시즌 3까지 끝난 저장)이 생겨요.
