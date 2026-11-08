# v131 새 몬스터 그림 (아이폰 출시용, v130 그림 다듬음)

LPC 기본 자료(Charles Sanchez/CharlesGabriel, CC-BY-SA 3.0·GPL만 허용)와 ULPC 늑대 머리(CC-BY-SA 3.0·GPL만 허용)를 쓰던 몬스터 그림 15장을
이 게임에서 직접 그린 그림으로 바꿨어요. 남의 그림을 쓰지 않아서 출처 표시 의무가 없어요(habitmonster-app 저작물).

| 파일 (game/m/) | 몬스터 | 전에 쓰던 그림 |
|---|---|---|
| cre_bat.png | 박쥐 | LPC 박쥐 |
| cre_mbat.png | 광산 박쥐 | LPC 박쥐 색 바꿈 |
| cre_bee.png | 들벌 | LPC 벌 |
| cre_small_worm.png | 꼬마 지렁이 | LPC 작은 지렁이 |
| cre_snake.png | 풀뱀 | LPC 뱀 |
| cre_big_worm.png | 큰 굴지렁이 | LPC 큰 지렁이 |
| cre_cworm.png | 수정 벌레 | LPC 큰 지렁이 + 수정 |
| cre_eyeball.png | 떠도는 눈 | LPC 눈알 |
| cre_ghost.png | 안개 유령 | LPC 유령 |
| cre_man_eater_flower.png | 식인꽃 | LPC 식인꽃 |
| cre_pumpking.png | 호박 도깨비 | LPC 호박왕 |
| slime.png | 작은 슬라임 / 오염된 슬라임 | LPC 슬라임 |
| mon_rslime.png | 공명 슬라임 | LPC 슬라임 색 바꿈 |
| mon_swolf.png | 그림자 늑대 / 가시 숲늑대 | ULPC 늑대 머리 + 몸 |
| mon_hound9.png | 혼돈 사냥개 | 그림자 늑대 색 바꿈 |

- 크기·칸 배치는 전과 똑같아서 게임 코드는 안 바뀜(출처 글만 바뀜).
- 늑대는 사람 몸에 늑대 머리 → 네 발 늑대로 바뀜.
- 그린 코드: v131/art/ (px.py 도구, cre130.py 3칸×4줄 몬스터, big130.py 64칸 시트 슬라임·늑대).
- 아직 CC-BY-SA로 남은 것: 땅·집·나무 타일(Sharm), 성 타일(HughSpectrum) 등. 아이폰 위험을 완전히 없애려면 이것도 바꿔야 함.
- v131: 음영·외곽선 다듬음, 지렁이 흙 둑, 늑대 등털·가슴털·주둥이. 3칸×4줄 몬스터 11종은 4번째 칸(공격 그림)이 생겨 시트 가로가 4칸으로 넓어짐 → 게임 코드 creDraw가 공격 2~3번째 순간에 4번째 칸을 씀(SMETA.ac).
