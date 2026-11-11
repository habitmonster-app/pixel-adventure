# 시즌 2 '얼어붙은 맹세' 몬스터·NPC 그림: 기존 LPC 조합 그림을 다시 칠해 새 파일로 저장 (원본은 그대로)
import sys, colorsys, os, glob
from PIL import Image
OUT = (sys.argv[1] if len(sys.argv) > 1 else '/home/user/pixel-adventure/game/') + 'm/'
def src(n):
    for p in ('/home/user/s2/base_m/' + n + '.png', '/home/user/s2/spr/' + n + '.png'):
        if os.path.exists(p): return p
    raise SystemExit('no ' + n)
def tint(s, dst, hue=.58, sat=.55, val=1.15, keep_red=False, lift=20, grey=.12, hk=.06):
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
L = [  # (원본, 새 파일, 칠하기)
 ('mon_mouse', 's2m_rat', dict(sat=.45, val=1.25, lift=25)),                 # 서리쥐
 ('cre_bat', 's2m_crow', dict(sat=.35, val=.55, lift=0, hue=.6)),            # 얼음까마귀 (임시: 박쥐 몸)
 ('mon_swolf', 's2m_wolf', dict(sat=.3, val=1.5, lift=40)),                   # 설원 늑대
 ('cre_tboar', 's2m_horn', dict(sat=.25, val=1.6, lift=45, keep_red=True)),   # 서리뿔 우두머리 (임시: 큰 짐승 몸)
 ('mon_gminer', 's2m_gob', dict(sat=.6, val=1.2, hue=.55)),                  # 얼음 고블린
 ('cre_spider', 's2m_crab', dict(sat=.9, val=1.5, hue=.03, lift=30, grey=.4, hk=.0)),  # 서리 집게게 (임시: 거미 몸)
 ('cre_ghost', 's2m_jelly', dict(sat=.9, val=1.0, hue=.52, lift=0)),         # 빙결 해파리
 ('mon_warden8', 's2m_brak', dict(sat=.75, val=1.1, hue=.6)),                # 빙결 항만장 브라크
 ('cre_spider', 's2m_spider', dict(sat=.7, val=1.9, hue=.55, lift=60)),      # 빙정거미
 ('cre_mushm', 's2m_shroom', dict(sat=.55, val=1.25, hue=.57, lift=25)),     # 서리버섯
 ('mon_hound9', 's2m_swolf', dict(sat=.15, val=1.25, lift=30, hue=.6)),      # 눈그림자 늑대
 ('cre_dmoth', 's2m_moth', dict(sat=.25, val=1.6, hue=.6, lift=40)),         # 얼음나방
 ('boss_tree', 's2m_arbos', dict(sat=.5, val=1.5, hue=.55, lift=35)),        # 서리뿌리 고목 아르보스
 ('mon_wknight', 's2m_sol', dict(sat=.6, val=1.35)),                          # 빙정 병사
 ('mon_smugA', 's2m_arch', dict(sat=.25, val=1.5, lift=40)),                  # 서리 궁수
 ('cre_rgolem', 's2m_golem', dict(sat=.8, val=1.25, hue=.55)),               # 얼음 골렘
 ('cre_eyeball', 's2m_orb', dict(sat=.9, val=1.1, hue=.55, lift=10)),        # 룬 감시구
 ('n9cmd', 's2m_leorn', dict(sat=.55, val=1.3, hue=.58, lift=20)),           # 빙정 기사장 레오른
 ('mon_swolf', 's2m_leo', dict(sat=.9, val=.45, hue=.62, lift=0, grey=.25)), # 마계 설표 (임시: 늑대 몸)
 ('mon_royal10', 's2m_mk', dict(sat=.45, val=1.45, hue=.6, lift=25)),        # 빙월 기사
 ('mon_shaman9', 's2m_sham', dict(sat=.6, val=1.3, keep_red=True)),          # 서리 주술사
 ('cre_cworm', 's2m_shard', dict(sat=.9, val=1.2, hue=.55, lift=20)),        # 얼음 파편체
 ('mon_versh', 's2m_serka', dict(sat=.55, val=1.45, hue=.57, lift=25, keep_red=True)),  # 빙월사도 세르카
 ('mon_royal10', 's2m_shadow', dict(sat=.9, val=.9, hue=.62, lift=0)),       # 빙월의 그림자 (숨겨진 정예)
 ('n7inf', 's2n_eil', dict(sat=.8, val=1.1, hue=.56, lift=10)),             # 에일린
 ('kid', 's2n_noah', dict(sat=.7, val=1.1, hue=.58, lift=10)),               # 노아
 ('smith', 's2n_broom', dict(sat=.5, val=1.0, hue=.08, lift=5, hk=.3)),      # 브룸
 ('priest', 's2n_sena', dict(sat=.5, val=1.05, hue=.42, lift=10, hk=.3)),    # 세나
 ('n10ner', 's2n_lum', dict(sat=.55, val=1.35, hue=.52, lift=20)),           # 루미아
]
for s, d, o in L: tint(s, d, **o)
# 앞 판(v1)에서 만든 그림은 지워요
for f in ('mon_fwolf11 mon_fsold11 cre_fbat11 mon_fcapt11 mon_fsail12 mon_fslime12 cre_fghost12 mon_fanchor12 mon_ftroll13 mon_fhound13 mon_fsham13 mon_fkeeper13 '
          'mon_fknight14 mon_fmage14 cre_fgolem14 mon_fgate14 mon_serka mon_fshadow n2mes').split():
    p = OUT + f + '.png'
    if os.path.exists(p): os.remove(p)
print(len(L), 'sprites')
