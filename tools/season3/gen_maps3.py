# 시즌 3 '독뿌리의 세 번째 문' 지도 만들기 (D161~D201)
# - 새 타일은 m/tiles.png 아래에 덧붙임 (기존 타일 번호는 그대로)
# - 지역마다 m/r_<id>.json + m/r_<id>.js + m/o_<id>.png, MAP(regions·solid·tw·d5.reg)에 넣을 값은 s3_map.json 으로
# 쓰는 법: python3 gen_maps3.py <base tiles.png> <game 폴더/> <s3_map.json 저장 위치>
import json, random, math, sys
from PIL import Image, ImageDraw
from objlib import crop
BASE_TILES = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/s3base/tiles.png'
OUT = sys.argv[2] if len(sys.argv) > 2 else '/tmp/claude-0/repo/game/'
JOUT = sys.argv[3] if len(sys.argv) > 3 else '/tmp/claude-0/s3work/s3_map.json'
TS = 32; TH = 60; TC = 16
BASE_TW = 3250
T0 = Image.open(BASE_TILES).convert('RGBA')
N0 = (T0.height // TS) * TC
rng = random.Random(20261116)

# ---------- 새 타일 ----------
def tile(i): return T0.crop(((i % TC) * TS, (i // TC) * TS, (i % TC) * TS + TS, (i // TC) * TS + TS))
def remap(im, lo, hi, gamma=1.0):
    out = Image.new('RGBA', im.size); p = im.load(); q = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = p[x, y]; l = ((0.3 * r + 0.59 * g + 0.11 * b) / 255) ** gamma
            q[x, y] = tuple(int(lo[k] + (hi[k] - lo[k]) * l) for k in range(3)) + (a,)
    return out
def norm(im):
    p = im.load(); ls = [0.3 * p[x, y][0] + 0.59 * p[x, y][1] + 0.11 * p[x, y][2] for y in range(im.height) for x in range(im.width)]
    a, b = min(ls), max(ls); out = Image.new('RGBA', im.size); q = out.load()
    for y in range(im.height):
        for x in range(im.width):
            l = 0.3 * p[x, y][0] + 0.59 * p[x, y][1] + 0.11 * p[x, y][2]; v = int(255 * (l - a) / max(1, b - a)); q[x, y] = (v, v, v, p[x, y][3])
    return out
NEW = []
def add(im): NEW.append(im.convert('RGBA')); return N0 + len(NEW) - 1
def noise_tile(base, var, seed, specks=(), n=0):
    r = random.Random(seed); im = Image.new('RGBA', (TS, TS)); p = im.load()
    for y in range(TS):
        for x in range(TS):
            v = r.randint(-var, var); p[x, y] = tuple(max(0, min(255, c + v)) for c in base) + (255,)
    for _ in range(n):
        x, y = r.randint(0, TS - 2), r.randint(0, TS - 2); c = r.choice(specks)
        p[x, y] = c + (255,); p[x + 1, y] = c + (255,)
    return im
def water_tile(seed, base, lines, lc, bub=None):
    im = noise_tile(base, 4, seed); d = ImageDraw.Draw(im); r = random.Random(seed)
    for _ in range(lines):
        x, y = r.randint(0, 26), r.randint(2, 30); l = r.randint(4, 9); d.line((x, y, x + l, y), fill=lc + (255,))
    if bub:
        for _ in range(2):
            x, y = r.randint(3, 27), r.randint(3, 27); d.ellipse((x, y, x + 3, y + 3), outline=bub + (255,))
    return im
def wall_top(lo, hi): return remap(norm(tile(2091)), lo, hi)
def wall_face(lo, hi): return remap(norm(tile(2095)), lo, hi)
# 팔레트: 지역마다 S(땅) P(길) B(진창) W(물·막힘) T(숲 안쪽·막힘) F(바닥) X(벽) G(문양 바닥) K(나무 다리)
PAL = {}
def pal(name, S, P, B, W, T, F=None, X=None, G=None):
    PAL[name] = dict(S=S, P=P, B=B, W=W, T=T, F=F, X=X, G=G)
# 16장 흑수늪
pal('swamp',
    S=[add(noise_tile((66, 76, 50), 6, 100 + i, [(50, 60, 38), (88, 98, 62), (74, 66, 44)], 18)) for i in range(3)],
    P=[add(remap(norm(tile(i)), (84, 72, 52), (150, 128, 92))) for i in (2084, 2086, 2089)],
    B=[add(water_tile(110 + i, (58, 62, 40), 2, (88, 96, 58), (96, 120, 60))) for i in range(2)],
    W=[add(water_tile(120 + i, (34, 56, 44), 3, (60, 92, 66), (110, 170, 90))) for i in range(3)],
    T=[add(noise_tile((32, 42, 30), 5, 130 + i, [(24, 32, 22), (44, 56, 38)], 12)) for i in range(2)])
# 17장 독버섯 숲
pal('shroom',
    S=[add(noise_tile((70, 58, 78), 6, 200 + i, [(56, 44, 64), (96, 80, 104), (88, 110, 70)], 18)) for i in range(3)],
    P=[add(remap(norm(tile(i)), (104, 86, 104), (170, 150, 164))) for i in (2084, 2086, 2089)],
    B=[add(water_tile(210 + i, (82, 60, 92), 2, (130, 96, 150), (170, 220, 120))) for i in range(2)],
    W=[add(water_tile(220 + i, (44, 40, 62), 3, (80, 70, 110), (150, 210, 110))) for i in range(3)],
    T=[add(noise_tile((36, 26, 44), 5, 230 + i, [(26, 18, 32), (52, 40, 62)], 12)) for i in range(2)])
# 18장 침수 정화성소
pal('sanct',
    S=[add(remap(norm(tile(2352)), (58, 84, 84), (150, 182, 170)))],
    P=[add(remap(norm(tile(2352)), (70, 98, 96), (170, 200, 186)))],
    B=[add(water_tile(310 + i, (52, 92, 82), 2, (90, 140, 120), (150, 220, 160))) for i in range(2)],
    W=[add(remap(norm(tile(i)), (24, 62, 58), (90, 170, 140))) for i in (2374, 2375, 2376)],
    T=[add(noise_tile((14, 22, 24), 2, 330))],
    F=[add(remap(norm(tile(i)), (60, 86, 86), (156, 188, 176))) for i in (2352, 2353)],
    X=[wall_top((40, 56, 58), (110, 136, 134)), wall_face((32, 46, 50), (100, 130, 126))],
    G=[add(remap(norm(tile(85)), (40, 90, 80), (170, 240, 210)))])
PAL['sanct']['X'] = [add(PAL['sanct']['X'][0]), add(PAL['sanct']['X'][1])]
# 19장 폐쇄 왕실 연구소
pal('lab',
    S=[add(remap(norm(tile(i)), (52, 48, 64), (132, 126, 152))) for i in (85, 84)],
    P=[add(remap(norm(tile(85)), (60, 56, 74), (150, 144, 170)))],
    B=[add(water_tile(410 + i, (40, 36, 52), 2, (80, 60, 110), (120, 220, 120))) for i in range(2)],
    W=[add(water_tile(420 + i, (26, 22, 36), 3, (70, 50, 100), (130, 230, 120))) for i in range(2)],
    T=[add(noise_tile((12, 10, 18), 2, 430))],
    F=[add(remap(norm(tile(i)), (52, 48, 64), (132, 126, 152))) for i in (85, 84)],
    X=[wall_top((36, 32, 48), (96, 90, 116)), wall_face((30, 26, 40), (92, 86, 112))],
    G=[add(remap(norm(tile(85)), (40, 30, 60), (150, 110, 210)))])
PAL['lab']['X'] = [add(PAL['lab']['X'][0]), add(PAL['lab']['X'][1])]
# 20장 독뿌리 심장부
pal('abyss',
    S=[add(noise_tile((50, 34, 38), 6, 500 + i, [(36, 24, 28), (74, 50, 54), (70, 100, 60)], 20)) for i in range(3)],
    P=[add(remap(norm(tile(i)), (76, 50, 54), (140, 104, 100))) for i in (2084, 2086, 2089)],
    B=[add(water_tile(510 + i, (46, 52, 34), 2, (90, 120, 60), (140, 230, 100))) for i in range(2)],
    W=[add(water_tile(520 + i, (30, 44, 30), 3, (70, 120, 60), (150, 240, 110))) for i in range(2)],
    T=[add(noise_tile((20, 12, 16), 4, 530 + i, [(14, 8, 10), (36, 22, 26)], 10)) for i in range(2)],
    F=[add(remap(norm(tile(i)), (54, 44, 50), (140, 120, 126))) for i in (85, 84)],
    X=[wall_top((40, 26, 30), (110, 80, 86)), wall_face((30, 18, 22), (96, 66, 72))],
    G=[add(remap(norm(tile(85)), (40, 70, 40), (150, 240, 120)))])
PAL['abyss']['X'] = [add(PAL['abyss']['X'][0]), add(PAL['abyss']['X'][1])]
VOID = add(noise_tile((10, 12, 10), 2, 11))
def plank():
    im = noise_tile((112, 86, 60), 5, 12); d = ImageDraw.Draw(im)
    for y in (0, 8, 16, 24): d.line((0, y, 31, y), fill=(70, 50, 34, 255))
    for y, x in ((0, 10), (8, 24), (16, 6), (24, 18)): d.line((x, y, x, y + 7), fill=(70, 50, 34, 255))
    d.ellipse((4, 4, 9, 6), fill=(90, 120, 60, 255))
    return im
PLANK = add(plank())
TA = Image.new('RGBA', (T0.width, T0.height + ((len(NEW) + TC - 1) // TC) * TS)); TA.paste(T0, (0, 0))
for k, im in enumerate(NEW): TA.paste(im, ((k % TC) * TS, T0.height + (k // TC) * TS))
TA.save(OUT + 'm/tiles.png', optimize=True)

# ---------- 물건 그림 ----------
def hue(im, f):
    im = im.copy(); p = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = p[x, y]
            if a: p[x, y] = tuple(max(0, min(255, int(v))) for v in f(r, g, b)) + (a,)
    return im
def tint(c, k):   # c 색 쪽으로 k 만큼
    return lambda r, g, b: (r + (c[0] - r) * k, g + (c[1] - g) * k, b + (c[2] - b) * k)
def mul(a, b_, c): return lambda r, g, b: (r * a, g * b_, b * c)
swampy = lambda r, g, b: (r * .55 + 10, g * .62 + 18, b * .45 + 8)
def purp(r, g, b):
    l = (r + g + b) / 3
    if g > r + 10 and g > b: return (l * .6 + 50, l * .45 + 20, l * .7 + 60)   # 초록 잎 → 보라
    return (r * .8 + 10, g * .7, b * .85 + 14)
def greenfire(r, g, b):    # 파란/보라 불꽃 → 맑은 초록빛 정화 불꽃
    if b > r + 20 or (r > g + 20 and b > g + 20): l = (r + g + b) / 3; return (l * .5 + 60, min(255, l * .4 + 170), l * .4 + 90)
    return (r, g, b)
def toxic(r, g, b):        # 보라·파랑 → 독 초록
    l = (r + g + b) / 3
    if b > g + 20 or r > g + 25: return (l * .45 + 40, min(255, l * .6 + 110), l * .3 + 30)
    return (r * .8, g * .85, b * .7)
def frost_off(r, g, b): l = (r + g + b) / 3; return (l * .5 + 30, l * .52 + 34, l * .5 + 34)
teal = lambda r, g, b: (r * .55 + 20, g * .75 + 40, b * .7 + 40)
labt = lambda r, g, b: (r * .7 + 10, g * .65 + 8, b * .8 + 20)
dark = lambda r, g, b: (r * .55, g * .5, b * .6)
OB = {}
# 공통
OB['tent'] = hue(crop('D101', 'tent'), tint((70, 80, 50), .25)); OB['fire1'] = crop('D101', 'campfire')
for n in ('crates', 'barrels', 'sacks', 'woodpile'): OB[n] = hue(crop('D101', n), tint((60, 70, 44), .15))
OB['bench'] = crop('D101', 'k10_bench'); OB['flag'] = crop('D101', 'k9_flag'); OB['wagon'] = hue(crop('D71', 'k7_wagon'), tint((60, 66, 40), .2))
OB['palis'] = hue(crop('D91', 'palis'), tint((60, 66, 40), .2)); OB['ttower'] = hue(crop('D91', 'k9_ttower'), tint((60, 66, 40), .25))
OB['braz0'] = hue(crop('R01', 'k10_braz0'), frost_off); OB['braz1'] = hue(crop('D101', 'k10_braz1'), greenfire)
OB['lamp0'] = hue(crop('R01', 'k9_lamp0'), frost_off); OB['lamp1'] = hue(crop('D91', 'k9_lamp1'), greenfire)
# 늪
OB['sw_dead'] = hue(crop('R04', 'tree_dead0'), swampy); OB['sw_dead2'] = hue(crop('R04', 'tree_dead1'), swampy)
OB['sw_tree'] = hue(crop('R03', 'tree_d'), swampy); OB['sw_tree2'] = hue(crop('R03', 'tree_m'), swampy); OB['sw_bush'] = hue(crop('R03', 'bush_m'), swampy)
OB['sw_roots'] = hue(crop('R04', 'roots0'), toxic); OB['sw_roots2'] = hue(crop('R04', 'roots1'), toxic); OB['sw_log'] = hue(crop('R03', 'log'), swampy)
OB['sw_rock'] = hue(crop('R01', 'rock'), swampy); OB['sw_stump'] = hue(crop('R01', 'stump'), swampy); OB['sw_mush'] = crop('R03', 'mush_v'); OB['bones'] = crop('R04', 'bones')
OB['sw_huge'] = hue(crop('R04', 'tree_huge0'), lambda r, g, b: (r * .5 + 8, g * .6 + 14, b * .45 + 10))
# 버섯숲
OB['mu_p'] = crop('R04', 'mush_p'); OB['mu_r'] = hue(crop('R04', 'mush_r'), lambda r, g, b: (r * .7 + 30, g * .5 + 20, b * .9 + 50))
OB['mu_tree'] = crop('R03', 'tree_t'); OB['mu_bush'] = crop('R03', 'bush_t'); OB['mu_huge'] = hue(crop('R04', 'tree_huge1'), purp)
OB['mu_dr'] = hue(crop('R03', 'tree_dr'), purp); OB['mu_vine'] = crop('R04', 'vine'); OB['mu_web'] = crop('R04', 'webb'); OB['mu_small'] = crop('R03', 'mush_g')
OB['mu_rock'] = hue(crop('R01', 'rock'), lambda r, g, b: (r * .7 + 20, g * .6 + 10, b * .8 + 30))
# 성소
OB['sa_pil'] = hue(crop('D82', 'k8_cpil'), teal); OB['sa_stat'] = hue(crop('D101', 'k10_stat0'), teal); OB['sa_rub'] = hue(crop('D101', 'k10_rub0'), teal)
OB['sa_alt'] = hue(crop('D83', 'k8_altar'), teal); OB['sa_sl0'] = hue(crop('R01', 'k8_sluice0'), teal); OB['sa_sl1'] = hue(crop('R01', 'k8_sluice1'), teal)
OB['sa_pp0'] = hue(crop('R01', 'k10_sst0'), frost_off); OB['sa_pp1'] = hue(crop('R01', 'k10_sst1'), lambda r, g, b: (r * .6 + 20, min(255, g * .9 + 50), b * .7 + 30))
OB['sa_wheel'] = hue(crop('R01', 'k8_wheel0'), teal); OB['sa_cand'] = crop('D82', 'k7_candle'); OB['sa_bush'] = hue(crop('R03', 'bush_m'), teal)
# 연구소
OB['la_shelf'] = hue(crop('D83', 'k8_shelf'), labt); OB['la_fshelf'] = hue(crop('D83', 'k8_fshelf'), labt); OB['la_tbl'] = hue(crop('D83', 'tbl_long'), labt)
OB['la_mach'] = hue(crop('D83', 'mach0'), labt); OB['la_cmach'] = hue(crop('D63', 'cmach0'), labt); OB['la_cry'] = crop('D92', 'cry_k0'); OB['la_cry2'] = crop('D63', 'wcry_p')
OB['la_bed'] = crop('D81', 'bed0'); OB['la_lect'] = crop('D84', 'k8_lect'); OB['la_box'] = crop('R01', 'k8_box0'); OB['la_cand'] = crop('D82', 'k7_candle')
OB['la_door0'] = crop('R01', 'sgate0'); OB['la_door1'] = crop('R01', 'sgate1'); OB['lever0'] = crop('R01', 'lever0'); OB['lever1'] = crop('R01', 'lever1')
OB['la_flt0'] = hue(crop('R01', 'k9_ward0'), frost_off); OB['la_flt1'] = hue(crop('R01', 'k9_ward1'), lambda r, g, b: (r * .5 + 30, min(255, g * .8 + 70), b * .5 + 40))
OB['la_bar'] = hue(crop('R01', 'k10_bar0'), labt)
# 심장부
OB['ab_roots'] = hue(crop('R04', 'roots0'), lambda r, g, b: (r * .6 + 20, g * .9 + 30, b * .4)); OB['ab_roots2'] = hue(crop('R04', 'roots1'), lambda r, g, b: (r * .6 + 20, g * .9 + 30, b * .4))
OB['ab_thorn'] = hue(crop('R04', 'thornw0'), lambda r, g, b: (r * .6, g * .7 + 10, b * .5)); OB['ab_dead'] = hue(crop('R04', 'tree_dead1'), dark)
OB['ab_pil'] = hue(crop('D101', 'k10_pil'), lambda r, g, b: (r * .6 + 10, g * .65 + 18, b * .55 + 10)); OB['ab_stat'] = hue(crop('D101', 'k10_stat0'), toxic)
OB['ab_sst0'] = hue(crop('R01', 'k10_sst0'), frost_off); OB['ab_sst1'] = hue(crop('R01', 'k10_sst1'), lambda r, g, b: (r * .55 + 20, min(255, g * .9 + 60), b * .6 + 20))
OB['ab_alt0'] = hue(crop('R01', 'k10_alt0'), toxic); OB['ab_alt1'] = hue(crop('R01', 'k10_alt1'), lambda r, g, b: (r * .7 + 30, min(255, g * .9 + 50), b * .5 + 20))
OB['ab_door0'] = hue(crop('R01', 'k10_door0'), toxic); OB['ab_door1'] = hue(crop('R01', 'k10_door1'), lambda r, g, b: (r * .6 + 30, g * .7 + 40, b * .55 + 20))
OB['ab_bar'] = hue(crop('R01', 'k10_bar0'), toxic); OB['ab_rock'] = hue(crop('D91', 'k9_crock0'), dark); OB['ab_spk'] = crop('R04', 'spk1')

def _im(w, h): im = Image.new('RGBA', (w, h)); return im, ImageDraw.Draw(im)
def scout(saved):             # 독덩굴에 묶여 쓰러진 정찰병 / 빈 진창
    im, d = _im(44, 26); d.ellipse((2, 10, 42, 25), fill=(70, 66, 44, 255), outline=(50, 46, 30, 255))
    if not saved:
        d.rectangle((10, 12, 32, 18), fill=(70, 100, 60, 255)); d.ellipse((30, 9, 38, 17), fill=(200, 160, 130, 255)); d.rectangle((12, 11, 18, 13), fill=(160, 40, 40, 255))
        for x in range(6, 40, 6): d.arc((x - 4, 8, x + 4, 22), 200, 340, fill=(120, 200, 80, 255), width=2)
    else:
        for x in (12, 22, 30): d.ellipse((x, 14, x + 5, 18), fill=(54, 50, 34, 255))
    return im
def cocoon(saved):            # 균사에 싸인 약초꾼 / 끊어진 균사
    im, d = _im(36, 50)
    if not saved:
        d.ellipse((4, 4, 32, 48), fill=(200, 186, 210, 235), outline=(140, 110, 160, 255))
        d.ellipse((12, 10, 24, 22), fill=(190, 150, 120, 255)); d.rectangle((10, 6, 26, 12), fill=(60, 120, 60, 255))
        for y in range(16, 46, 5): d.line((5, y, 31, y + 3), fill=(160, 130, 180, 255))
    else:
        for x, y in ((6, 38), (16, 42), (26, 37)): d.line((x, y, x + 6, y + 8), fill=(170, 140, 190, 255), width=2)
    return im
def pod(burst):               # 포자주머니
    im, d = _im(34, 34)
    if not burst:
        d.ellipse((3, 6, 31, 32), fill=(130, 70, 150, 255), outline=(80, 40, 96, 255)); d.ellipse((9, 10, 19, 18), fill=(190, 140, 210, 255))
        for x, y in ((22, 20), (12, 24), (20, 12)): d.ellipse((x, y, x + 3, y + 3), fill=(170, 240, 110, 255))
    else:
        d.polygon([(4, 32), (10, 18), (17, 28), (24, 16), (30, 32)], fill=(96, 56, 110, 255))
    return im
def tablet(lit):              # 계약 석판
    im, d = _im(30, 44); d.polygon([(4, 43), (4, 8), (15, 2), (26, 8), (26, 43)], fill=(130, 150, 150, 255), outline=(70, 90, 90, 255))
    for y in range(12, 38, 6):
        d.line((7, y, 14, y), fill=(255, 220, 120, 255) if lit else (70, 86, 86, 255)); d.line((17, y, 23, y + 2), fill=(200, 120, 255, 255) if lit else (70, 86, 86, 255))
    if lit: d.ellipse((11, 2, 19, 10), fill=(220, 255, 220, 200))
    return im
def vat(broken):              # 흑수정 배양기 (유리관)
    im, d = _im(34, 64); d.rectangle((4, 54, 30, 63), fill=(70, 66, 86, 255), outline=(40, 36, 52, 255)); d.rectangle((4, 0, 30, 6), fill=(70, 66, 86, 255))
    if not broken:
        d.rectangle((7, 6, 27, 54), fill=(40, 30, 60, 200), outline=(170, 200, 220, 255)); d.polygon([(12, 44), (17, 22), (22, 44)], fill=(20, 16, 30, 255))
        d.line((17, 24, 17, 44), fill=(140, 90, 220, 255)); d.ellipse((10, 14, 14, 18), outline=(150, 240, 120, 255))
    else:
        d.polygon([(7, 54), (7, 34), (12, 40), (17, 30), (22, 38), (27, 32), (27, 54)], fill=(60, 56, 76, 255))
        for x, y in ((2, 58), (30, 60), (12, 61)): d.polygon([(x, y), (x + 3, y - 4), (x + 5, y)], fill=(170, 200, 220, 255))
    return im
def cell(open_):              # 피험자 우리
    im, d = _im(36, 50); d.rectangle((2, 4, 33, 49), fill=(30, 26, 40, 255))
    if not open_: d.ellipse((13, 16, 23, 26), fill=(190, 160, 140, 255)); d.rectangle((11, 26, 25, 46), fill=(110, 110, 120, 255))
    for x in range(4, 34, 6):
        if open_ and 10 < x < 28: continue
        d.rectangle((x, 4, x + 2, 49), fill=(120, 116, 140, 255))
    d.rectangle((2, 2, 33, 6), fill=(150, 146, 170, 255)); return im
def core(spent):              # 파손된 배양핵
    im, d = _im(30, 26); d.ellipse((2, 14, 28, 25), fill=(50, 46, 60, 255))
    if not spent: d.polygon([(8, 18), (12, 2), (16, 16), (20, 6), (23, 18)], fill=(26, 18, 40, 255), outline=(150, 100, 230, 255))
    return im
def heart(cut):               # 독뿌리 심장
    im, d = _im(44, 44)
    for a in range(0, 360, 45):
        x = 22 + math.cos(math.radians(a)) * 20; y = 30 + math.sin(math.radians(a)) * 12; d.line((22, 30, x, y), fill=(90, 50, 40, 255), width=3)
    if not cut:
        d.ellipse((10, 10, 34, 38), fill=(70, 120, 50, 255), outline=(30, 60, 20, 255)); d.ellipse((15, 15, 25, 25), fill=(150, 230, 90, 255))
        for x, y in ((28, 18), (14, 30)): d.line((x, y, x + 4, y + 4), fill=(40, 20, 20, 255), width=2)
    else:
        d.ellipse((12, 22, 32, 38), fill=(70, 60, 50, 255), outline=(40, 30, 26, 255))
    return im
OB['scout0'] = scout(0); OB['scout1'] = scout(1); OB['coc0'] = cocoon(0); OB['coc1'] = cocoon(1); OB['pod0'] = pod(0); OB['pod1'] = pod(1)
OB['tab0'] = tablet(0); OB['tab1'] = tablet(1); OB['vat0'] = vat(0); OB['vat1'] = vat(1); OB['cell0'] = cell(0); OB['cell1'] = cell(1)
OB['core0'] = core(0); OB['core1'] = core(1); OB['heart0'] = heart(0); OB['heart1'] = heart(1)

# ---------- 지역 ----------
WALK = 'SPBFKG'
class Reg:
    def __init__(s, id, n, x0, w, lv, pal, fillk='T'):
        s.id, s.n, s.x0, s.w, s.lv, s.pal = id, n, x0, w, lv, pal; s.k = [[fillk] * w for _ in range(TH)]; s.obj = []; s.meta = {'x0': x0, 'w': w}; s.sol = set(); s.keep = set()
    def ok(s, x, y): return s.x0 <= x < s.x0 + s.w and 0 <= y < TH
    def set(s, x, y, k):
        if s.ok(x, y): s.k[y][x - s.x0] = k
    def get(s, x, y): return s.k[y][x - s.x0] if s.ok(x, y) else 'V'
    def rect(s, x0, y0, x1, y1, k):
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1): s.set(x, y, k)
    def blob(s, x0, y0, x1, y1, k, j=2):
        for x in range(x0, x1 + 1):
            a = y0 + int(j * (.5 + .5 * math.sin(x * .7 + y0)) + rng.random()); b = y1 - int(j * (.5 + .5 * math.sin(x * .5 + y1)) + rng.random())
            l = min(x - x0, x1 - x); cut = max(0, 3 - l)
            for y in range(a + cut, b - cut + 1): s.set(x, y, k)
    def ell(s, cx, cy, rx, ry, k, only=None):
        for y in range(cy - ry, cy + ry + 1):
            for x in range(cx - rx, cx + rx + 1):
                if ((x - cx) / (rx + .3)) ** 2 + ((y - cy) / (ry + .3)) ** 2 <= 1 and (only is None or s.get(x, y) in only): s.set(x, y, k)
    def road(s, pts, k='P', w=1, only=None):
        for (xa, ya), (xb, yb) in zip(pts, pts[1:]):
            n = max(abs(xb - xa), abs(yb - ya), 1)
            for i in range(n + 1):
                x = round(xa + (xb - xa) * i / n); y = round(ya + (yb - ya) * i / n)
                for dy in range(-w, w + 1):
                    for dx in range(-w, w + 1):
                        if only is None or s.get(x + dx, y + dy) in only: s.set(x + dx, y + dy, k); s.keep.add((x + dx, y + dy))
    def put(s, name, tx, ty, solid=1, dx=0, dy=0):
        im = OB[name]; s.obj.append(['s3_' + name, tx * TS + 16 - im.width // 2 + dx, (ty + 1) * TS + dy])
        if solid:
            hw = solid if isinstance(solid, int) and solid > 1 else 1
            for x in range(tx - (hw - 1), tx + hw): s.sol.add((x, ty))
            if solid is True or solid == 1: s.sol.add((tx, ty))
    def free(s, x, y): return s.get(x, y) in WALK and (x, y) not in s.sol
    def scatter(s, names, n, x0, y0, x1, y1, on='S', gap=3):
        got = 0; tries = 0
        while got < n and tries < n * 60:
            tries += 1; x, y = rng.randint(x0, x1), rng.randint(y0, y1)
            if s.get(x, y) not in on or (x, y) in s.keep: continue
            if any(abs(x - a) < gap and abs(y - b) < gap for a, b in s.sol | s.keep): continue
            s.put(rng.choice(names), x, y); got += 1
    def protect(s, x, y, r=2):
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1): s.keep.add((x + dx, y + dy))
REGS = []
def protect_all(R, keys, lists):
    M = R.meta
    for k in keys: R.protect(M[k][0], M[k][1], 2)
    for k in lists:
        for p in M[k]: R.protect(p[0], p[1], 2)

# ===== 16장: 흑수늪 입구 (남부 검문소 · 수로길 · 흑수늪) =====
A = Reg('D161', '흑수늪 입구', 3250, 120, [56, 56], 'swamp'); REGS.append(A)
A.blob(3253, 12, 3366, 50, 'S', 3)
A.rect(3253, 21, 3272, 39, 'S')
A.road([(3251, 30), (3274, 30), (3290, 26), (3306, 30), (3322, 30), (3338, 36), (3352, 38), (3367, 30)], 'P', 1)
A.road([(3290, 26), (3292, 15)], 'P', 1); A.road([(3306, 30), (3320, 18), (3334, 16), (3346, 22)], 'P', 1); A.road([(3322, 30), (3328, 44), (3318, 48), (3300, 46)], 'P', 1)
A.rect(3250, 29, 3253, 31, 'P'); A.rect(3366, 29, 3369, 31, 'P')
for (cx, cy, rx, ry) in ((3284, 40, 5, 3), (3300, 20, 4, 3), (3312, 38, 4, 3), (3330, 24, 3, 2), (3340, 46, 4, 2), (3296, 48, 3, 2), (3278, 16, 3, 2)):
    A.ell(cx, cy, rx, ry, 'W', 'S')
for (cx, cy, rx, ry) in ((3286, 34, 4, 2), (3318, 24, 3, 2), (3334, 40, 3, 2), (3302, 42, 3, 2)): A.ell(cx, cy, rx, ry, 'B', 'S')
A.ell(3352, 40, 9, 7, 'S'); A.ell(3352, 40, 3, 2, 'B')
M = A.meta
M.update(west=[3251, 30], entry=[3255, 30], east=[3368, 30], eastin=[3364, 30], camp=[3262, 27], safe=[3253, 21, 3272, 39], maren=[3266, 33], elia=[3259, 33], ria=[3268, 26], bench=[3270, 25],
         scouts=[[3336, 15], [3346, 22], [3330, 46]], braz=[[3300, 45], [3318, 49], [3334, 36]], arena=[3352, 40, 8], boss=[3354, 40],
         fog=[[3276, 12, 3300, 24], [3304, 34, 3330, 50], [3326, 12, 3350, 28]])
protect_all(A, ('camp', 'maren', 'elia', 'ria', 'bench', 'boss'), ('scouts', 'braz'))
A.put('tent', 3257, 25); A.put('tent', 3267, 36); A.put('crates', 3254, 34); A.put('barrels', 3255, 26); A.put('woodpile', 3271, 35); A.put('flag', 3253, 28, 0); A.put('flag', 3253, 32, 0)
A.put('bench', 3270, 24); A.put('sacks', 3260, 37); A.put('wagon', 3272, 37); A.put('ttower', 3256, 22, 2); A.put('palis', 3264, 22)
A.scatter(['sw_dead', 'sw_dead2', 'sw_tree', 'sw_tree2', 'sw_bush', 'sw_roots', 'sw_log', 'sw_rock', 'sw_stump', 'sw_mush', 'bones'], 80, 3274, 13, 3344, 50)
A.scatter(['sw_dead', 'sw_tree', 'sw_bush', 'sw_rock'], 12, 3344, 13, 3364, 50, gap=4)
M['zones'] = [[3276, 13, 3302, 26, ['s3slime', 's3mosq']], [3276, 32, 3302, 50, ['s3slime', 's3liz', 's3mosq']], [3303, 13, 3328, 28, ['s3mosq', 's3liz', 's3worm']],
              [3304, 32, 3328, 50, ['s3worm', 's3slime']], [3329, 13, 3344, 30, ['s3liz', 's3worm']]]
M['areas'] = [['남부 검문소 · 원정대 야영지', 3253, 21, 3272, 39], ['오래된 수로길', 3273, 26, 3300, 34], ['정화잎 습지', 3274, 10, 3302, 25], ['흑수늪', 3303, 10, 3343, 51], ['늪지기의 웅덩이', 3344, 30, 3366, 50]]
M['nodes'] = [['s3leaf', 3282, 13], ['s3leaf', 3288, 20], ['s3leaf', 3294, 14], ['s3leaf', 3297, 23], ['s3leaf', 3283, 24], ['s3leaf', 3304, 16], ['s3leaf', 3280, 45], ['s3leaf', 3310, 47]]
M['lights'] = [[3262.5, 28.5, 4, '255,170,90', 't']]
M['dyn'] = [['camp', 'fire1', 'fire1', 3262, 28]] + [['bz%d' % i, 'braz0', 'braz1', b[0], b[1]] for i, b in enumerate(M['braz'])] + [['sc%d' % i, 'scout0', 'scout1', b[0], b[1]] for i, b in enumerate(M['scouts'])]

# ===== 17장: 독버섯 숲 =====
B = Reg('D171', '독버섯 숲', 3370, 120, [57, 57], 'shroom'); REGS.append(B)
B.blob(3373, 21, 3392, 39, 'S', 2)
for (cx, cy, rx, ry) in ((3404, 16, 12, 7), (3402, 44, 12, 8), (3428, 30, 12, 9), (3452, 14, 10, 7), (3454, 46, 11, 8), (3474, 44, 10, 8), (3396, 8, 6, 4), (3466, 26, 6, 5)):
    B.ell(cx, cy, rx, ry, 'S')
P17 = [[(3371, 30), (3392, 30), (3404, 22), (3404, 16)], [(3392, 30), (3402, 38), (3402, 44)], [(3392, 30), (3428, 30)], [(3428, 30), (3444, 18), (3452, 14)], [(3428, 30), (3444, 42), (3454, 46)],
       [(3428, 30), (3466, 28), (3489, 30)], [(3454, 46), (3474, 44)], [(3404, 16), (3396, 8)]]
for p in P17: B.road(p, 'S', 2)
for p in P17: B.road(p, 'P', 0)
B.rect(3370, 29, 3373, 31, 'P'); B.rect(3486, 29, 3489, 31, 'P')
B.ell(3410, 10, 4, 2, 'W', 'S'); B.ell(3398, 14, 3, 2, 'B', 'S'); B.ell(3416, 46, 3, 2, 'B', 'S'); B.ell(3436, 36, 3, 2, 'B', 'S')
M = B.meta
M.update(west=[3371, 30], entry=[3375, 30], east=[3488, 30], eastin=[3484, 30], camp=[3382, 26], safe=[3373, 21, 3391, 39], harin=[3386, 33], elia=[3379, 33], maren=[3377, 28], bench=[3388, 25],
         torches=[[3402, 24], [3420, 31], [3444, 22]], gather=[[3410, 20], [3396, 46], [3447, 44]], pods=[[3398, 40], [3408, 50], [3448, 42], [3460, 50], [3452, 40], [3414, 40]],
         arena=[3474, 44, 8], boss=[3476, 44], cave=[3396, 8],
         fog=[[3394, 36, 3416, 52], [3440, 36, 3466, 54], [3416, 24, 3440, 36]])
protect_all(B, ('camp', 'harin', 'elia', 'maren', 'bench', 'boss', 'cave'), ('torches', 'gather', 'pods'))
B.put('tent', 3377, 24); B.put('crates', 3375, 36); B.put('woodpile', 3389, 36); B.put('bench', 3388, 24); B.put('barrels', 3376, 26); B.put('sacks', 3390, 30)
B.put('mu_huge', 3428, 26, 2)
B.scatter(['mu_p', 'mu_r', 'mu_tree', 'mu_tree', 'mu_bush', 'mu_dr', 'mu_small', 'mu_rock', 'mu_vine', 'mu_web'], 70, 3394, 6, 3486, 54, gap=3)
M['zones'] = [[3394, 8, 3418, 24, ['s3shroom', 's3moth']], [3392, 36, 3416, 53, ['s3shroom', 's3turt']], [3418, 22, 3440, 38, ['s3wolf', 's3moth', 's3shroom']],
              [3442, 8, 3464, 22, ['s3turt', 's3wolf']], [3440, 38, 3466, 54, ['s3shroom', 's3wolf', 's3moth']]]
M['areas'] = [['약초꾼 쉼터', 3373, 21, 3391, 39], ['포자안개 오솔길', 3392, 6, 3418, 25], ['거대 버섯 군락', 3416, 20, 3442, 40], ['포자주머니 골짜기', 3392, 36, 3466, 55], ['늪철 광맥', 3442, 6, 3466, 22], ['포자여왕의 둥지', 3466, 36, 3486, 54]]
M['nodes'] = [['s3leaf', 3406, 10], ['s3leaf', 3412, 13], ['s3leaf', 3400, 12], ['s3leaf', 3416, 18], ['s3leaf', 3394, 18], ['s3leaf', 3424, 22],
              ['s3iron', 3446, 10], ['s3iron', 3452, 8], ['s3iron', 3458, 12], ['s3iron', 3460, 18], ['s3iron', 3448, 18], ['s3iron', 3456, 15]]
M['lights'] = [[3382.5, 27.5, 4, '255,170,90', 't']]
M['dyn'] = [['camp', 'fire1', 'fire1', 3382, 27]] + [['tc%d' % i, 'lamp0', 'lamp1', b[0], b[1]] for i, b in enumerate(M['torches'])] + [['gt%d' % i, 'coc0', 'coc1', b[0], b[1]] for i, b in enumerate(M['gather'])] + [['pd%d' % i, 'pod0', 'pod1', b[0], b[1]] for i, b in enumerate(M['pods'])]

# ===== 18장: 침수 정화성소 =====
C = Reg('D181', '침수 정화성소', 3490, 110, [58, 58], 'sanct', 'V'); REGS.append(C)
def room(R, x0, y0, x1, y1, k='F'): R.rect(x0 - 1, y0 - 2, x1 + 1, y1 + 1, 'X'); R.rect(x0, y0, x1, y1, k)
room(C, 3493, 22, 3509, 38)                       # 입구 계단 · 야영
room(C, 3516, 18, 3548, 42)                       # 중앙 대전 (정화 기둥 1)
room(C, 3516, 4, 3532, 12)                        # 북서 수정맥
room(C, 3536, 4, 3552, 12)                        # 북동 석판실
room(C, 3514, 48, 3554, 56)                       # 남쪽 수로 (수문 · 정화 기둥 2·3)
room(C, 3562, 18, 3592, 42)                       # 수호자 제단
for h in ((3490, 29, 3493, 31), (3509, 29, 3516, 31), (3523, 12, 3525, 18), (3543, 12, 3545, 18), (3529, 42, 3531, 48), (3548, 29, 3562, 31), (3592, 29, 3599, 31)): C.rect(*h, 'F')
C.rect(3516, 50, 3554, 51, 'W'); C.rect(3521, 50, 3523, 51, 'K'); C.rect(3533, 50, 3535, 51, 'K'); C.rect(3546, 50, 3548, 51, 'K')
for (x0, y0, x1, y1) in ((3518, 20, 3522, 24), (3542, 20, 3546, 24), (3518, 36, 3522, 40), (3542, 36, 3546, 40)): C.rect(x0, y0, x1, y1, 'W')
C.ell(3577, 30, 12, 9, 'G', 'F')
M = C.meta
M.update(west=[3491, 30], entry=[3495, 30], east=[3598, 30], eastin=[3594, 30], camp=[3500, 26], safe=[3493, 22, 3509, 38], elia=[3504, 34], maren=[3497, 34], lum=[3506, 27], bench=[3507, 24],
         door=[3512, 30], pils=[[3532, 30], [3518, 54], [3552, 54]], sluices=[[3526, 49], [3540, 49], [3530, 55]], tabs=[[3540, 6], [3545, 6], [3550, 6]],
         arena=[3577, 30, 9], boss=[3579, 30], gate=[3555, 29, 3555, 31], altar=[3577, 24],
         fog=[[3514, 46, 3556, 57], [3516, 18, 3548, 42]])
protect_all(C, ('camp', 'elia', 'maren', 'lum', 'bench', 'boss', 'door'), ('pils', 'sluices', 'tabs'))
C.put('tent', 3496, 25); C.put('crates', 3494, 36); C.put('bench', 3507, 23); C.put('barrels', 3508, 36)
for x, y in ((3516, 18), (3548, 18), (3516, 42), (3548, 42)): C.put('sa_pil', x, y)
for x, y in ((3526, 20), (3538, 20), (3526, 40), (3538, 40), (3564, 20), (3590, 20), (3564, 40), (3590, 40)): C.put('sa_stat', x, y)
for x, y in ((3518, 5), (3530, 5), (3518, 11), (3537, 11), (3552, 11), (3516, 55), (3554, 47), (3570, 22), (3586, 38)): C.put('sa_rub', x, y)
C.put('sa_alt', 3577, 23, 2); C.put('sa_wheel', 3511, 26); C.put('sa_cand', 3536, 24); C.put('sa_cand', 3528, 36)
M['zones'] = [[3524, 26, 3540, 34, ['s3ghost', 's3lily']], [3517, 5, 3531, 11, ['s3crab', 's3lily']], [3537, 5, 3551, 11, ['s3ghost', 's3crab']], [3515, 52, 3553, 56, ['s3snake', 's3crab']],
              [3517, 36, 3547, 41, ['s3ghost', 's3snake']]]
M['areas'] = [['무너진 신전 계단 · 야영지', 3493, 20, 3509, 39], ['중앙 대전', 3514, 16, 3550, 43], ['북서 수정맥', 3514, 2, 3534, 13], ['북동 석판실', 3534, 2, 3554, 13], ['남쪽 수로', 3512, 44, 3556, 57], ['수호자 제단', 3556, 16, 3594, 43]]
M['nodes'] = [['s3cry', 3520, 7], ['s3cry', 3524, 9], ['s3cry', 3528, 7], ['s3cry', 3522, 11], ['s3cry', 3531, 10], ['s3iron', 3517, 55], ['s3iron', 3553, 49], ['s3iron', 3524, 55]]
M['lights'] = [[3500.5, 27.5, 4, '255,170,90', 't'], [3577.5, 26.5, 6, '120,230,200', 'c'], [3524.5, 8.5, 4, '170,240,255', 'c']]
M['dyn'] = [['camp', 'fire1', 'fire1', 3500, 27], ['gate', 'la_bar', None, 3555, 31]] + [['pp%d' % i, 'sa_pp0', 'sa_pp1', b[0], b[1]] for i, b in enumerate(M['pils'])] + [['sl%d' % i, 'sa_sl0', 'sa_sl1', b[0], b[1]] for i, b in enumerate(M['sluices'])] + [['tb%d' % i, 'tab0', 'tab1', b[0], b[1]] for i, b in enumerate(M['tabs'])]

# ===== 19장: 폐쇄 왕실 연구소 =====
D = Reg('D191', '폐쇄 왕실 연구소', 3600, 110, [59, 59], 'lab', 'V'); REGS.append(D)
room(D, 3603, 22, 3618, 38)                       # 입구 · 야영
room(D, 3626, 4, 3648, 14)                        # 1구역 기록실
room(D, 3626, 20, 3650, 40)                       # 2구역 배양실
room(D, 3626, 46, 3650, 56)                       # 3구역 피험자 감옥
room(D, 3656, 6, 3676, 54)                        # 4구역 흑수정 정제실
room(D, 3682, 18, 3706, 42)                       # 융합실
for h in ((3600, 29, 3603, 31), (3618, 29, 3626, 31), (3636, 14, 3638, 20), (3636, 40, 3638, 46), (3650, 29, 3656, 31), (3676, 29, 3682, 31), (3706, 29, 3709, 31)): D.rect(*h, 'F')
D.ell(3694, 30, 9, 8, 'G', 'F')
M = D.meta
M.update(west=[3601, 30], entry=[3605, 30], east=[3708, 30], eastin=[3704, 30], camp=[3610, 26], safe=[3603, 22, 3618, 38], urban=[3614, 34], elia=[3607, 34], maren=[3605, 28], bench=[3616, 25],
         door=[3622, 30], dgate=[3622, 29, 3622, 31], flts=[[3630, 22], [3646, 22], [3638, 38]], logs=[[3630, 6], [3638, 6], [3646, 6], [3642, 12]],
         sw=[[3630, 47], [3638, 47], [3646, 47]], cells=[[3630, 53], [3638, 53], [3646, 53]], vats=[[3660, 12], [3672, 12], [3660, 46], [3672, 46]], cores=[[3666, 28], [3666, 34]],
         arena=[3694, 30, 9], boss=[3696, 30], gate=[3679, 29, 3679, 31],
         fog=[[3656, 6, 3676, 54], [3626, 46, 3650, 56]])
protect_all(D, ('camp', 'urban', 'elia', 'maren', 'bench', 'boss', 'door'), ('flts', 'logs', 'sw', 'cells', 'vats', 'cores'))
D.put('tent', 3606, 25); D.put('crates', 3604, 36); D.put('bench', 3616, 24); D.put('la_box', 3617, 36)
for x, y in ((3628, 4), (3634, 4), (3642, 4), (3648, 4)): D.put('la_shelf', x, y)
D.put('la_tbl', 3638, 10, 3); D.put('la_lect', 3646, 10)
for x, y in ((3630, 26), (3646, 26), (3630, 34), (3646, 34)): D.put('la_mach', x, y)
D.put('la_tbl', 3638, 30, 3)
for x, y in ((3626, 46), (3650, 46)): D.put('la_cand', x, y)
for x, y in ((3658, 22), (3674, 22), (3658, 38), (3674, 38), (3666, 8), (3666, 52)): D.put('la_cry', x, y)
for x, y in ((3659, 28), (3673, 32)): D.put('la_cmach', x, y)
for x, y in ((3684, 20), (3704, 20), (3684, 40), (3704, 40)): D.put('la_cry2', x, y)
M['zones'] = [[3627, 22, 3649, 39, ['s3exp', 's3sol', 's3eye']], [3627, 5, 3647, 13, ['s3sol', 's3eye']], [3627, 48, 3649, 55, ['s3exp', 's3tent']], [3657, 7, 3675, 26, ['s3tent', 's3eye', 's3sol']],
              [3657, 34, 3675, 53, ['s3tent', 's3exp']]]
M['areas'] = [['왕실 인장문 앞 · 야영지', 3603, 20, 3620, 39], ['1구역 · 기록실', 3624, 2, 3650, 15], ['2구역 · 배양실', 3624, 18, 3652, 41], ['3구역 · 피험자 감옥', 3624, 44, 3652, 57], ['4구역 · 흑수정 정제실', 3654, 4, 3678, 55], ['융합실', 3680, 16, 3708, 43]]
M['nodes'] = [['s3cry', 3664, 18], ['s3cry', 3668, 42]]
M['lights'] = [[3610.5, 27.5, 4, '255,170,90', 't'], [3694.5, 30.5, 6, '170,120,255', 'c'], [3666.5, 30.5, 5, '150,110,240', 'c']]
M['dyn'] = [['camp', 'fire1', 'fire1', 3610, 27], ['door', 'la_door0', 'la_door1', 3622, 31], ['gate', 'la_bar', None, 3679, 31]] + [['ft%d' % i, 'la_flt0', 'la_flt1', b[0], b[1]] for i, b in enumerate(M['flts'])] + \
    [['lg%d' % i, 'la_lect', None, b[0], b[1]] for i, b in enumerate(M['logs'])] + [['sw%d' % i, 'lever0', 'lever1', b[0], b[1]] for i, b in enumerate(M['sw'])] + [['ce%d' % i, 'cell0', 'cell1', b[0], b[1]] for i, b in enumerate(M['cells'])] + \
    [['vt%d' % i, 'vat0', 'vat1', b[0], b[1]] for i, b in enumerate(M['vats'])] + [['co%d' % i, 'core0', 'core1', b[0], b[1]] for i, b in enumerate(M['cores'])]

# ===== 20장: 독뿌리 심장부 · 세 번째 마계문 =====
E = Reg('D201', '독뿌리 심장부 · 세 번째 마계문', 3710, 80, [60, 60], 'abyss', 'V'); REGS.append(E)
E.rect(3712, 21, 3730, 39, 'X'); E.rect(3713, 23, 3729, 38, 'S')
E.rect(3730, 29, 3740, 31, 'P')
E.ell(3760, 31, 21, 17, 'X'); E.ell(3760, 32, 20, 15, 'S'); E.ell(3760, 32, 13, 10, 'G')
E.rect(3729, 29, 3743, 31, 'P')
E.rect(3710, 29, 3713, 31, 'P')
M = E.meta
M.update(west=[3711, 30], entry=[3715, 30], camp=[3720, 26], safe=[3713, 23, 3729, 38], kai=[3724, 34], ria=[3726, 26], lum=[3718, 34], ner=[3716, 30], bench=[3727, 35],
         stones=[[3744, 33], [3776, 33], [3760, 45]], arena=[3760, 32, 14], altar=[3760, 24], boss=[3760, 31], door=[3760, 18], gate=[3736, 29, 3736, 31], hearts=[[3748, 22], [3772, 22], [3760, 40]],
         fog=[[3741, 15, 3780, 48]])
protect_all(E, ('camp', 'kai', 'ria', 'lum', 'ner', 'bench', 'altar', 'boss', 'door'), ('stones', 'hearts'))
E.put('tent', 3716, 25); E.put('crates', 3714, 37); E.put('bench', 3727, 34); E.put('barrels', 3728, 37)
for x, y in ((3746, 21), (3774, 21), (3744, 43), (3776, 43)): E.put('ab_pil', x, y)
for x, y in ((3752, 19), (3768, 19)): E.put('ab_stat', x, y)
for x, y in ((3742, 28), (3778, 28), (3750, 46), (3770, 46), (3742, 38), (3778, 38)): E.put('ab_roots', x, y, 0)
M['zones'] = [[3742, 18, 3778, 46, ['s3hound', 's3knight', 's3sham', 's3spore']]]
M['areas'] = [['마지막 남부 야영지', 3713, 21, 3729, 39], ['역병 제단 · 세 번째 마계문', 3739, 14, 3781, 49]]
M['nodes'] = [['s3cry', 3715, 37], ['s3iron', 3728, 24]]
M['lights'] = [[3720.5, 27.5, 4, '255,170,90', 't'], [3760.5, 22.5, 7, '140,240,110', 'c']]
M['dyn'] = [['camp', 'fire1', 'fire1', 3720, 27], ['door', 'ab_door0', 'ab_door1', 3760, 18], ['altar', 'ab_alt0', 'ab_alt1', 3760, 25], ['gate', 'ab_bar', None, 3736, 31]] + \
    [['st%d' % i, 'ab_sst0', 'ab_sst1', b[0], b[1] - 1] for i, b in enumerate(M['stones'])] + [['ht%d' % i, 'heart0', 'heart1', b[0], b[1]] for i, b in enumerate(M['hearts'])]

# ---------- 숲 가장자리 · 타일 고르기 · 저장 ----------
def near_walk(R, x, y, d):
    for dy in range(-d, d + 1):
        for dx in range(-d, d + 1):
            if R.get(x + dx, y + dy) in WALK: return True
    return False
EDGE = {'swamp': ('sw_dead', 'sw_tree', 'sw_tree2', 'sw_bush'), 'shroom': ('mu_tree', 'mu_dr', 'mu_p', 'mu_bush')}
out = {'tw': REGS[-1].x0 + REGS[-1].w, 'n0': N0, 'regions': [], 'solid': [''] * TH, 'reg': {}}
for R in REGS:
    T = PAL[R.pal]; g = []
    for y in range(TH):
        row = []
        for x in range(R.x0, R.x0 + R.w):
            k = R.get(x, y); h = (x * 7 + y * 13 + (x * y) % 5)
            pick = lambda L: [L[h % len(L)]]
            if k == 'T':
                nw = near_walk(R, x, y, 3)
                row.append(pick(T['S']) if nw else pick(T['T']))
                if nw and R.pal in EDGE and (x + y * 2) % 3 == 0 and y % 2 == 0:
                    nm = EDGE[R.pal][h % len(EDGE[R.pal])]; R.obj.append(['s3_' + nm, x * TS + 16 - OB[nm].width // 2 + (h % 9) - 4, (y + 1) * TS])
            elif k == 'S': row.append(pick(T['S']))
            elif k == 'P': row.append(pick(T['P']))
            elif k == 'B': row.append(pick(T['B']))
            elif k == 'W': row.append(pick(T['W']))
            elif k == 'K': row.append([PLANK])
            elif k == 'F': row.append(pick(T['F'] or T['S']))
            elif k == 'G': row.append([T['G'][0] if (x + y) % 2 else (T['F'] or T['S'])[0]])
            elif k == 'X': row.append([T['X'][1]] if R.get(x, y + 1) in WALK else [T['X'][0]])
            else: row.append([VOID])
        g.append(row)
    for y in range(TH): out['solid'][y] += ''.join('0' if R.free(x, y) else '1' for x in range(R.x0, R.x0 + R.w))
    names = sorted({o[0] for o in R.obj} | {'s3_' + n for d in R.meta.get('dyn', []) for n in d[1:3] if n}, key=lambda n: -OB[n[3:]].height)
    Wm = 1024; x = y = sh = 0; pos = {}
    for n in names:
        im = OB[n[3:]]
        if x + im.width > Wm: x = 0; y += sh; sh = 0
        pos[n] = [x, y, im.width, im.height]; x += im.width; sh = max(sh, im.height)
    sheet = Image.new('RGBA', (Wm, y + sh))
    for n, (px, py, w, h) in pos.items(): sheet.paste(OB[n[3:]], (px, py))
    sheet.save(OUT + 'm/o_%s.png' % R.id, optimize=True)
    R.obj.sort(key=lambda o: o[2])
    dyn = []
    for key, n0, n1, tx, ty in R.meta.get('dyn', []):
        im = OB[n0 or n1]; dyn.append([key, n0 and 's3_' + n0, n1 and 's3_' + n1, tx * TS + 16 - im.width // 2, (ty + 1) * TS])
    R.meta['dyn2'] = dyn; del R.meta['dyn']
    data = {'id': R.id, 'x0': R.x0, 'g': g, 'obj': R.obj, 'rect': pos}
    js = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    open(OUT + 'm/r_%s.json' % R.id, 'w').write(js)
    open(OUT + 'm/r_%s.js' % R.id, 'w').write('RGN.cache[%s]=%s;' % (json.dumps(R.id), js))
    out['regions'].append({'id': R.id, 'n': R.n, 'x0': R.x0, 'x1': R.x0 + R.w, 'mobs': 10 if R.id == 'D201' else 14, 'lv': R.lv, 'lock': 's3', 'dun': REGS.index(R), 'f': 'm/r_%s.json' % R.id, 'img': 'm/o_%s.png' % R.id})
    out['reg'][R.id] = R.meta
    def reach(a, b):
        seen = {tuple(a)}; Q = [tuple(a)]
        while Q:
            c = Q.pop()
            if c == tuple(b): return True
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                n = (c[0] + dx, c[1] + dy)
                if n not in seen and R.free(*n): seen.add(n); Q.append(n)
        return False
    pts = [(k, v) for k, v in R.meta.items() if isinstance(v, list) and len(v) in (2, 3) and all(isinstance(q, (int, float)) for q in v) and k not in ('gate', 'dgate')]
    for k, v in R.meta.items():
        if isinstance(v, list) and v and isinstance(v[0], list) and len(v[0]) == 2: pts += [(k + str(i), p) for i, p in enumerate(v)]
    for k, v in pts:
        t = [int(v[0]), int(v[1])]
        if not R.free(*t): t = next(([t[0] + dx, t[1] + dy] for dx, dy in ((0, 1), (1, 0), (-1, 0), (0, -1), (0, 2), (1, 1), (-1, 1)) if R.free(t[0] + dx, t[1] + dy)), None)
        if not t or not reach(R.meta['entry'], t): print('!! 못 감', R.id, k, v)
    for n in R.meta['nodes']:
        if not R.free(n[1], n[2]) and not any(R.free(n[1] + dx, n[2] + dy) for dx, dy in ((0, 1), (1, 0), (-1, 0), (0, -1))): print('!! 채집 자리 막힘', R.id, n)
    print(R.id, len(R.obj), 'objs', sheet.size)
json.dump(out, open(JOUT, 'w'), ensure_ascii=False, separators=(',', ':'))
print('tiles', N0, '+', len(NEW))
