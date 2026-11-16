# 시즌 3 (16~20장) 「독뿌리의 세 번째 문」 그림 출처

시즌 3에서 새로 생긴 그림은 모두 **앞 장에서 이미 게임에 들어가 있는 그림을 다시 칠하거나 잘라 붙인 것**이에요. 새로 받아 온 외부 그림은 없어요.
원본 그림의 작가·라이선스는 원본 쪽 출처표를 그대로 따라요: 게임 안 '그림 출처', `CREDITS/ULPC_CREDITS.csv`, `CREDITS_v130`~`v132`, `CREDITS_season2.md` 등.

## 지도 (game/m/tiles.png 뒤쪽에 덧붙인 타일, o_D161~o_D201.png, r_D161~r_D201)

| 무엇 | 만든 방법 | 원본 출처 | 라이선스 |
|---|---|---|---|
| 늪·숲·성소·연구소·심장부 바닥, 물, 어두운 땅 | 이 게임에서 점을 찍어 새로 만든 무늬 타일 (`gen_maps3.py` noise_tile·water_tile) | 직접 만듦 | 게임과 같은 조건 |
| 길·벽·바닥돌·장식 바닥 | 기존 타일(2084·2086·2089·2091·2095·2352·2353·2374~2376·84·85번)을 흑백으로 바꾼 뒤 독빛으로 다시 칠함 | LPC 기본 타일 Lanea Zimmerman(Sharm) 외 | CC-BY-SA 3.0 |
| 나무·버섯·바위·소품 (o_*.png) | 앞 장 지역 그림(o_*.png)에서 잘라 다시 칠해 배치 (`objlib.py`) | LPC 나무·소품 (앞 장 출처표) | CC-BY-SA 3.0 |

## 몬스터·보스·인물 (game/m/s3m_*.png, s3n_*.png)

모두 `tools/season3/gen_mobs3.py`가 오른쪽 원본 그림의 색만 바꿔 만들어요(모양은 그대로).

| 새 그림 | 이름 | 원본 그림 (game/m/) | 원본 종류 |
|---|---|---|---|
| `s3m_slime.png` | 독진흙 슬라임 | `mon_rslime.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_mosq.png` | 검은늪 모기 (임시: 벌 몸) | `cre_bee.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_liz.png` | 독이빨 도마뱀 | `lizard.png` | Universal LPC 부위 조합 (ULPC_CREDITS.csv) |
| `s3m_worm.png` | 부패 덩굴벌레 | `cre_vinem.png` | 직접 그림 (v44 mon44.py) |
| `s3m_shroom.png` | 포자버섯 | `cre_mushm.png` | 직접 그림 (CREDITS_v40.md) |
| `s3m_turt.png` | 독등껍질 거북 (임시: 큰 짐승 몸) | `cre_tboar.png` | 직접 그림 (v44 mon44.py) |
| `s3m_moth.png` | 포자나방 | `cre_dmoth.png` | 직접 그림 (CREDITS_v40.md) |
| `s3m_wolf.png` | 균사 늑대 | `mon_swolf.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_lily.png` | 독수련 정령 | `cre_ghost.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_crab.png` | 침수 갑각충 (임시: 거미 몸) | `cre_spider.png` | 직접 그림 (CREDITS_v40.md) |
| `s3m_ghost.png` | 부패 사제 잔영 | `mon_wraith.png` | Universal LPC 부위 조합 (CREDITS_v52.md) |
| `s3m_snake.png` | 독수로 뱀 | `cre_snake.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_exp.png` | 독성 실험체 | `mon_troll.png` | Universal LPC 부위 조합 (CREDITS_monsters.md) |
| `s3m_sol.png` | 흑수정 감염병사 | `mon_wknight.png` | Universal LPC 부위 조합 (CREDITS_v52.md) |
| `s3m_tent.png` | 배양 촉수 | `cre_big_worm.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_eye.png` | 실험소 감시구 | `cre_eyeball.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_hound.png` | 역병 사냥개 | `mon_hound9.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_knight.png` | 독뿌리 기사 | `mon_royal10.png` | Universal LPC 부위 조합 (게임 안 '그림 출처' 10장 줄) |
| `s3m_sham.png` | 부패 주술사 | `mon_shaman9.png` | Universal LPC 부위 조합 (CREDITS_v54.md) |
| `s3m_spore.png` | 역병 포자체 | `cre_ghost.png` | 직접 그림 (CREDITS_v132.md) |
| `s3m_krag.png` | 맹독 늪지기 크라그 (임시: 도마뱀 몸) | `lizard.png` | Universal LPC 부위 조합 (ULPC_CREDITS.csv) |
| `s3m_mic.png` | 포자여왕 미셀라 | `cre_mushm.png` | 직접 그림 (CREDITS_v40.md) |
| `s3m_beld.png` | 부패 수호상 벨드락 | `boss_rgolem.png` | 직접 그림 (CREDITS_v50.md) |
| `s3m_varg.png` | 흑수정 융합체 바르곤 | `boss_vcolos.png` | 직접 그림 (CREDITS_v50.md) |
| `s3m_morga.png` | 역병사도 모르가 | `mon_versh.png` | Universal LPC 부위 조합 (게임 안 '그림 출처' 10장 줄) |
| `s3m_zark.png` | 독뿌리 포식자 자르칸 | `cre_spider.png` | 직접 그림 (CREDITS_v40.md) |
| `s3n_maren.png` | 마렌 | `n7inf.png` | Universal LPC 부위 조합 |
| `s3n_elia.png` | 엘리아 | `priest.png` | Universal LPC 부위 조합 |
| `s3n_harin.png` | 하린 | `herb.png` | Universal LPC 부위 조합 |
| `s3n_urban.png` | 우르반 | `n8tech.png` | Universal LPC 부위 조합 (CREDITS_v52.md) |

원본 그림이 LPC/Universal LPC 부위를 쓴 경우(예: 트롤·망령 기사·친위대·주술사·마계 사도·마을 인물) 작가와 라이선스는 원본 그림의 출처표를 따르고, CC-BY-SA 3.0 부위가 들어간 그림은 다시 칠한 그림도 CC-BY-SA 3.0으로 GitHub에 공개해요.
점검(2026-11-16): 30장 가운데 18장은 이 게임에서 직접 그린 그림을 다시 칠한 것(출처 표시 의무 없음), 12장은 Universal LPC 부위 조합 그림을 다시 칠한 것(OGA-BY 3.0 / CC-BY 3.0 / CC-BY-SA 3.0 가운데 고름, GPL만 허용인 부위 없음 — ULPC_CREDITS.csv 13,915줄 확인). 지피티로 만든 그림은 시즌 3에 없어요.
원본이 이 게임에서 직접 그린 그림(v130에서 바꾼 몬스터 등)이면 다시 칠한 그림도 직접 그린 그림이에요.

## 보스 공격 표시·독안개·안전지대 빛

게임 코드가 화면에 직접 그리는 도형이에요(그림 파일 없음).
