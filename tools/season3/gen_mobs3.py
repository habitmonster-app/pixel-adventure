# 시즌 3 '독뿌리의 세 번째 문' 몬스터·NPC 임시 그림: 기존 LPC 조합 그림을 독빛(초록·보라)으로 다시 칠해 새 파일로 저장 (원본은 그대로)
# 사용: python3 gen_mobs3.py [game/ 폴더] [SPR 그림 폴더]
import sys, colorsys, os
from PIL import Image
G = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/repo/game/'
SPR = sys.argv[2] if len(sys.argv) > 2 else '/tmp/claude-0/spr/'
OUT = G + 'm/'
def src(n):
    for p in (OUT + n + '.png', SPR + n + '.png'):
        if os.path.exists(p): return p
    raise SystemExit('no ' + n)
def tint(s, dst, hue=.3, sat=.6, val=1.0, keep_red=False, lift=0, grey=.15, hk=.06):
    im = Image.open(src(s)).convert('RGBA'); p = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = p[x, y]
            if not a: continue
            h, s_, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if keep_red and (h < .05 or h > .95) and s_ > .6 and v > .5: continue
            if s_ < .12: nr, ng, nb = colorsys.hsv_to_rgb(hue, grey, min(1, v * val + lift / 255))
            else: nr, ng, nb = colorsys.hsv_to_rgb((hue + (h - .5) * hk) % 1, min(1, s_ * sat), min(1, v * val + lift / 255))
            p[x, y] = (int(nr * 255), int(ng * 255), int(nb * 255), a)
    im.save(OUT + dst + '.png', optimize=True)
G_ = .3; V_ = .78   # 독 초록 · 보라
L = [
 ('mon_rslime', 's3m_slime', dict(hue=G_, sat=.9, val=.75)),               # 독진흙 슬라임
 ('cre_bee', 's3m_mosq', dict(hue=.22, sat=.5, val=.6, grey=.2)),           # 검은늪 모기 (임시: 벌 몸)
 ('lizard', 's3m_liz', dict(hue=.33, sat=.6, val=.6, keep_red=True)),       # 독이빨 도마뱀
 ('cre_vinem', 's3m_worm', dict(hue=.26, sat=.7, val=.75)),                 # 부패 덩굴벌레
 ('cre_mushm', 's3m_shroom', dict(hue=V_, sat=.7, val=1.05, lift=10)),      # 포자버섯
 ('cre_tboar', 's3m_turt', dict(hue=.34, sat=.6, val=.8)),                  # 독등껍질 거북 (임시: 큰 짐승 몸)
 ('cre_dmoth', 's3m_moth', dict(hue=.8, sat=.8, val=1.1, lift=10)),         # 포자나방
 ('mon_swolf', 's3m_wolf', dict(hue=.76, sat=.5, val=.8, grey=.25)),        # 균사 늑대
 ('cre_ghost', 's3m_lily', dict(hue=.4, sat=.8, val=.9)),                   # 독수련 정령
 ('cre_spider', 's3m_crab', dict(hue=.5, sat=.8, val=1.1, lift=10)),        # 침수 갑각충 (임시: 거미 몸)
 ('mon_wraith', 's3m_ghost', dict(hue=.36, sat=.6, val=1.0, lift=10)),      # 부패 사제 잔영
 ('cre_snake', 's3m_snake', dict(hue=.32, sat=.5, val=.45, grey=.2)),       # 독수로 뱀
 ('mon_troll', 's3m_exp', dict(hue=.3, sat=.7, val=.85, keep_red=True)),    # 독성 실험체
 ('mon_wknight', 's3m_sol', dict(hue=.75, sat=.45, val=.7, grey=.2)),       # 흑수정 감염병사
 ('cre_big_worm', 's3m_tent', dict(hue=.78, sat=.6, val=.55)),              # 배양 촉수
 ('cre_eyeball', 's3m_eye', dict(hue=.0, sat=1.0, val=1.0, hk=0)),          # 실험소 감시구
 ('mon_hound9', 's3m_hound', dict(hue=.3, sat=.6, val=.6, keep_red=True)),  # 역병 사냥개
 ('mon_royal10', 's3m_knight', dict(hue=.32, sat=.55, val=.55, grey=.2)),   # 독뿌리 기사
 ('mon_shaman9', 's3m_sham', dict(hue=.33, sat=.7, val=.9)),                # 부패 주술사
 ('cre_ghost', 's3m_spore', dict(hue=.8, sat=.7, val=1.0, lift=15)),        # 역병 포자체
 ('lizard', 's3m_krag', dict(hue=.32, sat=.55, val=.42, grey=.2)),          # 맹독 늪지기 크라그 (임시: 도마뱀 몸)
 ('cre_mushm', 's3m_mic', dict(hue=.8, sat=.5, val=1.3, lift=40)),          # 포자여왕 미셀라
 ('boss_rgolem', 's3m_beld', dict(hue=.4, sat=.5, val=.8)),                 # 부패 수호상 벨드락
 ('boss_vcolos', 's3m_varg', dict(hue=.77, sat=.7, val=.6)),                # 흑수정 융합체 바르곤
 ('mon_versh', 's3m_morga', dict(hue=.31, sat=.7, val=.9, keep_red=True)),  # 역병사도 모르가
 ('cre_spider', 's3m_zark', dict(hue=.78, sat=.7, val=.45, grey=.25)),      # 독뿌리 포식자 자르칸
 ('n7inf', 's3n_maren', dict(hue=.36, sat=.6, val=.85, hk=.3)),             # 마렌
 ('priest', 's3n_elia', dict(hue=.3, sat=.25, val=1.2, lift=25, hk=.3)),    # 엘리아
 ('herb', 's3n_harin', dict(hue=.25, sat=.7, val=1.0, hk=.4)),              # 하린
 ('n8tech', 's3n_urban', dict(hue=.6, sat=.15, val=1.0, lift=10, grey=.05)),  # 우르반
]
for s, d, o in L: tint(s, d, **o)
print(len(L), 'sprites')
