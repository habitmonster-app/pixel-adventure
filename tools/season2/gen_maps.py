# 시즌 2 '얼어붙은 맹세' 지도 만들기 (D111~D151)
# - 새 타일은 m/tiles.png 아래에 덧붙임 (기존 타일 번호는 그대로)
# - 지역마다 m/r_<id>.json + m/o_<id>.png, MAP(regions·solid·tw·d5.reg)에 넣을 값은 s2_map.json 으로
import json, random, math, sys
from PIL import Image, ImageDraw
from objlib import crop
SRC = sys.argv[1] if len(sys.argv) > 1 else '/home/user/pixel-adventure/game/'
OUT = sys.argv[2] if len(sys.argv) > 2 else SRC
TS = 32; TH = 60; TC = 16
BASE_TW = 2730
T0 = Image.open('/home/user/s2/base/tiles.png').convert('RGBA')   # 원본 타일 (보관본)
N0 = (T0.height // TS) * TC
rng = random.Random(20261111)

# ---------- 새 타일 ----------
def tile(i): return T0.crop(((i % TC) * TS, (i // TC) * TS, (i % TC) * TS + TS, (i // TC) * TS + TS))
def remap(im, lo, hi, gamma=1.0):
    out = Image.new('RGBA', im.size); p = im.load(); q = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = p[x, y]; l = ((0.3 * r + 0.59 * g + 0.11 * b) / 255) ** gamma
            q[x, y] = tuple(int(lo[k] + (hi[k] - lo[k]) * l) for k in range(3)) + (a,)
    return out
def norm(im):  # 밝기 폭을 0~1로 펴기
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
SNOW = [add(noise_tile((238, 243, 251), 3, 30 + i, [(214, 226, 242), (252, 254, 255), (224, 234, 247)], 16)) for i in range(3)]
PATH = [add(remap(norm(tile(i)), (120, 132, 156), (206, 216, 232))) for i in (2084, 2086, 2089)]
def ice_tile(seed, base, lines, lc):
    im = noise_tile(base, 4, seed); d = ImageDraw.Draw(im); r = random.Random(seed)
    for _ in range(lines):
        x, y = r.randint(0, 31), r.randint(0, 31); l = r.randint(5, 12); d.line((x, y, x + l, y - l // 2), fill=lc + (255,))
    return im
ICE = [add(ice_tile(s, (168, 214, 236), 3, (226, 244, 252))) for s in (1, 2, 3)]
SEA = [add(ice_tile(s, (70, 110, 150), 2, (110, 150, 190))) for s in (4, 5)]
DEEP = [add(noise_tile((150, 170, 196), 5, s, [(120, 142, 172), (176, 194, 216)], 14)) for s in (6, 7)]   # 숲 안쪽(막힘) 눈 그늘
def rock_top(seed):
    im = noise_tile((92, 104, 128), 6, seed, [(70, 80, 104), (120, 134, 160)], 20); d = ImageDraw.Draw(im); r = random.Random(seed)
    for _ in range(2):
        x, y = r.randint(0, 22), r.randint(0, 26); d.ellipse((x, y, x + r.randint(6, 9), y + r.randint(2, 4)), fill=(200, 212, 230, 255))
    return im
ROCK = [add(rock_top(s)) for s in (8, 9)]
def rock_face(seed):
    im = noise_tile((62, 72, 96), 5, seed, [(44, 52, 74), (84, 96, 122)], 26); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, 31, 4), fill=(236, 242, 250, 255)); d.rectangle((0, 5, 31, 6), fill=(170, 186, 210, 255)); d.rectangle((0, 28, 31, 31), fill=(36, 42, 60, 255))
    for x in (7, 19, 27): d.line((x, 8, x - 2, 27), fill=(44, 52, 74, 255))
    return im
RFACE = add(rock_face(10))
FLOOR = [add(remap(norm(tile(i)), (58, 84, 120), (150, 196, 226))) for i in (85, 84)]
WTOP = add(remap(norm(tile(2091)), (40, 56, 86), (110, 150, 190)))
WFACE = add(remap(norm(tile(2095)), (30, 44, 70), (96, 136, 178)))
VOID = add(noise_tile((14, 18, 30), 2, 11))
def plank():
    im = noise_tile((132, 100, 70), 5, 12); d = ImageDraw.Draw(im)
    for y in (0, 8, 16, 24): d.line((0, y, 31, y), fill=(84, 60, 40, 255))
    for y, x in ((0, 10), (8, 24), (16, 6), (24, 18)): d.line((x, y, x, y + 7), fill=(84, 60, 40, 255))
    d.ellipse((2, 2, 9, 5), fill=(236, 242, 250, 255)); d.ellipse((20, 19, 29, 22), fill=(236, 242, 250, 255))
    return im
PLANK = add(plank())
GLYPH = add(remap(norm(tile(85)), (40, 70, 120), (170, 226, 250)))   # 제단 바닥
TA = Image.new('RGBA', (T0.width, T0.height + ((len(NEW) + TC - 1) // TC) * TS)); TA.paste(T0, (0, 0))
for k, im in enumerate(NEW): TA.paste(im, ((k % TC) * TS, T0.height + (k // TC) * TS))
TA.save(OUT + 'm/tiles.png', optimize=True)

# ---------- 물건 그림 ----------
def snowy(im, k=.45, cap=4, tint=(214, 228, 244)):
    im = im.copy(); p = im.load(); W, H = im.size
    for y in range(H):
        for x in range(W):
            r, g, b, a = p[x, y]
            if a: p[x, y] = (int(r + (tint[0] - r) * k), int(g + (tint[1] - g) * k), int(b + (tint[2] - b) * k), a)
    for x in range(W):   # 위쪽 가장자리에 눈
        d = 0
        for y in range(H):
            if p[x, y][3] > 128:
                if d < cap + (x * 7 % 3): p[x, y] = (244, 248, 255, p[x, y][3]); d += 1
                else: break
            elif d: break
    return im
def hue(im, f):
    im = im.copy(); p = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = p[x, y]
            if a: p[x, y] = f(r, g, b) + (a,)
    return im
icy = lambda r, g, b: (int(r * .45 + 40), int(g * .6 + 70), min(255, int(b * .6 + 110)))
def to_ice(r, g, b):   # 보라 → 얼음빛
    l = (r + g + b) / 3
    if r > g + 25 and b > g + 25: return (int(l * .5 + 60), int(l * .7 + 110), min(255, int(l * .6 + 150)))
    return (r, g, b)
def warm(r, g, b):     # 파란 불꽃 → 주황 불꽃
    if b > r + 30 and b > 140: return (min(255, b + 20), int(g * .75), int(r * .5))
    return (r, g, b)
def dark(r, g, b): return (int(r * .55), int(g * .55), int(b * .6))
def frost(r, g, b):    # 얼어붙은(꺼진) 장치
    l = (r + g + b) / 3; return (int(l * .55 + 50), int(l * .6 + 70), int(l * .6 + 100))
OB = {}
OB['tree_a'] = snowy(crop('R01', 'tree_p')); OB['tree_b'] = snowy(crop('R03', 'tree_d')); OB['tree_c'] = snowy(crop('R03', 'tree_k'), .55)
OB['tree_old'] = snowy(crop('R01', 'tree_old'), .6, 7); OB['dead'] = snowy(hue(crop('D91', 'k9_ctree0'), lambda r, g, b: ((r + g + b) // 3 + 30,) * 3), .2, 2)
OB['rock'] = snowy(crop('R01', 'rock'), .15, 3); OB['icerock'] = hue(crop('D91', 'k9_crock0'), to_ice); OB['log'] = snowy(crop('R03', 'log'), .2, 3)
OB['tent'] = snowy(crop('D101', 'tent'), .1, 3); OB['fire1'] = crop('D101', 'campfire'); OB['fire0'] = hue(crop('D101', 'campfire'), frost)
OB['braz1'] = hue(crop('D101', 'k10_braz1'), warm); OB['braz0'] = snowy(crop('R01', 'k10_braz0'), .3, 2)
for n in ('crates', 'barrels', 'sacks', 'woodpile'): OB[n] = snowy(crop('D101', n), .1, 2)
OB['bench'] = crop('D101', 'k10_bench'); OB['flag'] = crop('D101', 'k9_flag'); OB['wagon'] = snowy(crop('D71', 'k7_wagon'), .15, 3)
OB['ttower'] = snowy(crop('D91', 'k9_ttower'), .15, 3); OB['palis'] = snowy(crop('D91', 'palis'), .15, 3)
for i, n in enumerate(('k7_h0', 'k7_h2', 'k7_h3')): OB['house%d' % i] = snowy(crop('D71', n), .25, 16)
OB['tower'] = snowy(crop('R01', 'tower'), .3, 5); OB['pier'] = snowy(crop('R01', 'bridge5'), .15, 2)
OB['pil'] = hue(crop('D101', 'k10_pil'), to_ice); OB['pil'] = hue(OB['pil'], icy); OB['stat'] = snowy(crop('D101', 'k10_stat0'), .35, 3)
OB['dev0'] = hue(crop('R01', 'k9_ward0'), frost); OB['dev1'] = crop('R01', 'k9_ward1')
OB['relay0'] = hue(crop('R01', 'k8_relay0'), frost); OB['relay1'] = crop('R01', 'k8_relay1')
OB['sst0'] = hue(crop('R01', 'k10_sst0'), to_ice); OB['sst1'] = crop('R01', 'k10_sst1')
OB['alt0'] = hue(crop('R01', 'k10_alt0'), to_ice); OB['alt1'] = crop('R01', 'k10_alt1')
OB['door0'] = hue(crop('R01', 'k10_door0'), to_ice); OB['door1'] = hue(crop('R01', 'k10_door1'), icy)
OB['bar0'] = hue(crop('R01', 'k10_bar0'), to_ice); OB['wallp'] = hue(crop('R01', 'k10_wall1'), icy); OB['chest'] = crop('R01', 'chest')
OB['cons0'] = hue(crop('R01', 'k9_cons0'), frost); OB['cons1'] = crop('R01', 'k9_cons1'); OB['lamp'] = crop('D91', 'k9_lamp1')
def boat():
    im = Image.new('RGBA', (150, 96)); d = ImageDraw.Draw(im)
    d.polygon([(4, 52), (146, 52), (128, 90), (22, 90)], fill=(96, 66, 44, 255)); d.polygon([(4, 52), (146, 52), (140, 62), (10, 62)], fill=(134, 96, 62, 255))
    d.line((22, 90, 128, 90), fill=(40, 28, 20, 255), width=2); d.rectangle((72, 6, 76, 54), fill=(84, 60, 40, 255)); d.polygon([(78, 10), (118, 44), (78, 44)], fill=(214, 224, 236, 255))
    d.polygon([(70, 14), (40, 44), (70, 44)], fill=(190, 204, 222, 255))
    for x in range(8, 142, 9): d.ellipse((x, 48, x + 10, 55), fill=(240, 246, 255, 255))
    d.polygon([(0, 96), (20, 82), (130, 82), (150, 96)], fill=(190, 226, 244, 255))
    return im
OB['boat'] = boat()

# ---------- 시즌 2 '얼어붙은 맹세' 장치 그림 (직접 그린 도트 · 임시 그림 포함) ----------
def _im(w, h): im = Image.new('RGBA', (w, h)); return im, ImageDraw.Draw(im)
def prison(broken):           # 얼음 감옥 (안에 사람 그림자) / 깨진 얼음 조각
    im, d = _im(40, 52)
    if not broken:
        d.rectangle((4, 6, 35, 49), fill=(150, 210, 245, 200), outline=(220, 245, 255, 255))
        d.ellipse((15, 12, 25, 22), fill=(70, 90, 120, 210)); d.rectangle((13, 22, 27, 44), fill=(60, 80, 110, 210))
        for x, y in ((8, 10), (30, 18), (9, 34), (28, 40)): d.line((x, y, x + 4, y + 6), fill=(255, 255, 255, 230))
        d.polygon([(4, 6), (12, 0), (20, 5), (28, 1), (35, 6)], fill=(200, 235, 255, 230))
    else:
        for x, y, s in ((6, 40, 9), (18, 44, 7), (28, 39, 8), (12, 46, 6)): d.polygon([(x, y + s), (x + s // 2, y), (x + s, y + s)], fill=(170, 220, 250, 230), outline=(230, 248, 255, 255))
    return im
def mound(found):             # 눈에 묻힌 정찰병 (빨간 목도리) / 빈 눈더미
    im, d = _im(40, 24); d.ellipse((2, 6, 38, 23), fill=(232, 240, 250, 255), outline=(190, 206, 228, 255))
    if not found: d.rectangle((14, 4, 26, 9), fill=(200, 40, 40, 255)); d.ellipse((22, 2, 30, 10), fill=(120, 90, 70, 255)); d.line((8, 14, 14, 12), fill=(150, 120, 90, 255), width=2)
    else:
        for x in (10, 18, 26): d.ellipse((x, 2, x + 4, 6), fill=(170, 190, 214, 255))
    return im
def stake():
    im, d = _im(14, 30); d.rectangle((6, 6, 8, 29), fill=(120, 86, 52, 255)); d.polygon([(4, 8), (10, 8), (7, 2)], fill=(150, 110, 70, 255)); return im
def shroom():                 # 서리버섯 무리
    im, d = _im(30, 22)
    for x, y, r in ((4, 10, 7), (14, 6, 9), (22, 11, 6)):
        d.rectangle((x + r // 2 - 1, y + r // 2, x + r // 2 + 1, 21), fill=(220, 230, 240, 255)); d.pieslice((x - 2, y, x + r + 2, y + r + 2), 180, 360, fill=(150, 200, 245, 255), outline=(240, 250, 255, 255))
        d.point((x + 2, y + 3), fill=(255, 255, 255, 255))
    return im
def deer(webbed):             # 거미줄에 묶인 흰사슴 (임시 도트)
    im, d = _im(46, 40); c = (240, 244, 250, 255); o = (150, 160, 180, 255)
    d.rectangle((10, 18, 34, 28), fill=c, outline=o)
    for x in (12, 17, 27, 32): d.rectangle((x, 28, x + 2, 38), fill=c, outline=o)
    d.rectangle((32, 10, 38, 20), fill=c, outline=o); d.rectangle((36, 12, 42, 17), fill=c, outline=o); d.point((38, 13), fill=(30, 30, 40, 255))
    for x in (33, 37): d.line((x, 10, x - 2, 3), fill=(200, 180, 140, 255), width=1); d.line((x - 2, 5, x + 1, 2), fill=(200, 180, 140, 255))
    if webbed:
        for a in range(0, 46, 7): d.line((a, 0, 45 - a, 39), fill=(220, 240, 255, 170))
        d.line((0, 20, 45, 20), fill=(220, 240, 255, 200)); d.line((22, 0, 22, 39), fill=(220, 240, 255, 200))
    return im
def stele(lit):               # 두 세계의 비석 (사람 글자 · 마족 글자)
    im, d = _im(30, 46); d.polygon([(4, 45), (4, 8), (15, 2), (26, 8), (26, 45)], fill=(150, 156, 170, 255), outline=(90, 96, 110, 255))
    for y in range(12, 40, 6): d.line((7, y, 14, y), fill=(255, 220, 120, 255) if lit else (80, 86, 100, 255)); d.line((17, y, 23, y + 2), fill=(200, 120, 255, 255) if lit else (80, 86, 100, 255))
    if lit: d.ellipse((11, 2, 19, 10), fill=(255, 240, 180, 200))
    d.rectangle((0, 42, 29, 45), fill=(232, 240, 250, 255)); return im
def cannon(broken):           # 빙결 대포
    im, d = _im(52, 40); d.rectangle((6, 24, 46, 38), fill=(70, 86, 110, 255), outline=(40, 50, 66, 255))
    for x in (12, 40): d.ellipse((x - 6, 28, x + 6, 40), fill=(50, 60, 80, 255), outline=(30, 36, 50, 255))
    if not broken:
        d.polygon([(14, 26), (40, 8), (46, 16), (22, 30)], fill=(110, 170, 220, 255), outline=(220, 245, 255, 255)); d.ellipse((40, 6, 50, 16), fill=(180, 235, 255, 255))
    else:
        d.polygon([(10, 30), (30, 22), (32, 28), (14, 34)], fill=(80, 110, 140, 255)); d.line((18, 26, 24, 34), fill=(20, 24, 30, 255), width=2)
        for x, y in ((36, 26), (42, 30), (30, 32)): d.polygon([(x, y), (x + 4, y - 4), (x + 6, y + 2)], fill=(170, 220, 250, 255))
    return im
def cell(open_):              # 얼음 감옥 창살 (안에 포로)
    im, d = _im(36, 50); d.rectangle((2, 4, 33, 49), fill=(40, 52, 70, 255))
    if not open_: d.ellipse((13, 14, 23, 24), fill=(200, 170, 140, 255)); d.rectangle((11, 24, 25, 46), fill=(110, 90, 80, 255))
    for x in range(4, 34, 6):
        if open_ and 10 < x < 28: continue
        d.rectangle((x, 4, x + 2, 49), fill=(160, 210, 240, 255))
    d.rectangle((2, 2, 33, 6), fill=(190, 230, 255, 255)); return im
def mirror():                 # 빙월 거울 (세르카 2단계)
    im, d = _im(34, 64); d.polygon([(17, 0), (32, 14), (30, 60), (4, 60), (2, 14)], fill=(170, 220, 255, 170), outline=(240, 250, 255, 255))
    d.line((10, 14, 22, 40), fill=(255, 255, 255, 230), width=2); d.rectangle((0, 58, 33, 63), fill=(120, 150, 200, 255)); return im
OB['prison0'] = prison(0); OB['prison1'] = prison(1); OB['mound0'] = mound(0); OB['mound1'] = mound(1); OB['stake'] = stake(); OB['shroom'] = shroom()
OB['deer0'] = deer(1); OB['stele0'] = stele(0); OB['stele1'] = stele(1); OB['can0'] = cannon(0); OB['can1'] = cannon(1); OB['cell0'] = cell(0); OB['cell1'] = cell(1); OB['mirror'] = mirror()
OB['barrel'] = snowy(crop('D101', 'barrels'), .1, 2); OB['crate1'] = snowy(crop('D101', 'crates'), .1, 2)

# ---------- 지역 ----------
class Reg:
    def __init__(s, id, n, x0, w, lv, fillk='T'):
        s.id, s.n, s.x0, s.w, s.lv = id, n, x0, w, lv; s.k = [[fillk] * w for _ in range(TH)]; s.obj = []; s.meta = {'x0': x0, 'w': w}; s.sol = set(); s.keep = set()
    def ok(s, x, y): return s.x0 <= x < s.x0 + s.w and 0 <= y < TH
    def set(s, x, y, k):
        if s.ok(x, y): s.k[y][x - s.x0] = k
    def get(s, x, y): return s.k[y][x - s.x0] if s.ok(x, y) else 'V'
    def rect(s, x0, y0, x1, y1, k):
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1): s.set(x, y, k)
    def blob(s, x0, y0, x1, y1, k, j=2):   # 가장자리가 울퉁불퉁한 네모
        for x in range(x0, x1 + 1):
            a = y0 + int(j * (.5 + .5 * math.sin(x * .7 + y0)) + rng.random()); b = y1 - int(j * (.5 + .5 * math.sin(x * .5 + y1)) + rng.random())
            l = min(x - x0, x1 - x); cut = max(0, 3 - l)
            for y in range(a + cut, b - cut + 1): s.set(x, y, k)
    def ell(s, cx, cy, rx, ry, k):
        for y in range(cy - ry, cy + ry + 1):
            for x in range(cx - rx, cx + rx + 1):
                if ((x - cx) / (rx + .3)) ** 2 + ((y - cy) / (ry + .3)) ** 2 <= 1: s.set(x, y, k)
    def road(s, pts, k='P', w=1, only=None):
        for (xa, ya), (xb, yb) in zip(pts, pts[1:]):
            n = max(abs(xb - xa), abs(yb - ya), 1)
            for i in range(n + 1):
                x = round(xa + (xb - xa) * i / n); y = round(ya + (yb - ya) * i / n)
                for dy in range(-w, w + 1):
                    for dx in range(-w, w + 1):
                        if only is None or s.get(x + dx, y + dy) in only: s.set(x + dx, y + dy, k); s.keep.add((x + dx, y + dy))
    def put(s, name, tx, ty, solid=1, dx=0, dy=0):   # 그림 아래 가운데가 칸 (tx,ty) 아래 가운데
        im = OB[name]; s.obj.append(['s2_' + name, tx * TS + 16 - im.width // 2 + dx, (ty + 1) * TS + dy])
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
WALK = 'SPIFKG'
REGS = []

# ===== 11장: 왕성 북문 · 서리길 =====
A = Reg('D111', '왕성 북문 · 서리길', 2730, 100, [51, 51]); REGS.append(A)
A.blob(2733, 14, 2826, 47, 'S', 3)
A.rect(2733, 23, 2752, 37, 'S')
RD = [(2731, 30), (2754, 30), (2768, 24), (2786, 24), (2798, 33), (2812, 33), (2829, 30)]
A.road(RD, 'P', 1)
A.rect(2730, 29, 2733, 31, 'P'); A.rect(2826, 29, 2829, 31, 'P')
A.ell(2812, 33, 9, 7, 'S'); A.road([(2800, 33), (2829, 30)], 'P', 1)
M = A.meta
M.update(west=[2731, 30], entry=[2735, 30], east=[2828, 30], eastin=[2824, 30], camp=[2742, 27], safe=[2733, 23, 2752, 37], kai=[2745, 33], eil=[2740, 33], bench=[2748, 26],
         beacons=[[2760, 26], [2780, 21], [2800, 29]], arena=[2812, 33, 8], boss=[2814, 33],
         wood=[[2756, 34], [2765, 19], [2771, 31], [2759, 41]], scouts=[[2790, 15], [2784, 44], [2806, 43]])
for p in (M['camp'], M['kai'], M['eil'], M['bench'], M['boss']) + tuple(M['beacons']) + tuple(M['wood']) + tuple(M['scouts']): A.protect(p[0], p[1], 2)
A.put('tent', 2737, 25); A.put('tent', 2747, 35); A.put('crates', 2734, 34); A.put('barrels', 2735, 26); A.put('woodpile', 2750, 35); A.put('flag', 2733, 28, 0); A.put('flag', 2733, 32, 0)
A.put('bench', 2748, 25); A.put('sacks', 2740, 36); A.put('wagon', 2752, 35)
A.scatter(['tree_a', 'tree_b', 'tree_c', 'rock', 'dead', 'log'], 70, 2754, 15, 2800, 46)
A.scatter(['tree_a', 'tree_b', 'rock'], 14, 2800, 15, 2826, 46, gap=4)
M['zones'] = [[2755, 16, 2776, 44, ['s2rat', 's2crow']], [2777, 16, 2800, 44, ['s2rat', 's2crow', 's2wolf']], [2801, 16, 2825, 24, ['s2wolf', 's2crow']], [2801, 40, 2825, 46, ['s2wolf', 's2rat']]]
M['areas'] = [['북문 야영지', 2733, 23, 2752, 37], ['서리길', 2753, 12, 2800, 48], ['서리뿔의 길목', 2801, 24, 2826, 40]]
M['nodes'] = [['s2herb', 2758, 20], ['s2herb', 2771, 38], ['s2herb', 2790, 18], ['s2herb', 2783, 40], ['s2wood', 2764, 42], ['s2wood', 2794, 40], ['s2wood', 2776, 17]]
M['lights'] = [[2742.5, 28.5, 4, '255,170,90', 't']]
M['dyn'] = [['camp', 'fire1', 'fire1', 2742, 28]] + [['bc%d' % i, 'braz0', 'braz1', b[0], b[1]] for i, b in enumerate(M['beacons'])] + [['wd%d' % i, 'woodpile', None, b[0], b[1]] for i, b in enumerate(M['wood'])] + [['sc%d' % i, 'mound0', 'mound1', b[0], b[1]] for i, b in enumerate(M['scouts'])]

# ===== 12장: 얼어붙은 항구 =====
B = Reg('D121', '서리항', 2830, 120, [52, 52], 'R'); REGS.append(B)
B.rect(2830, 34, 2949, 59, 'W')
B.blob(2833, 10, 2946, 33, 'S', 2)
B.rect(2833, 20, 2850, 33, 'S')
B.road([(2831, 26), (2850, 26), (2870, 24), (2905, 24), (2930, 26), (2944, 26)], 'P', 1); B.rect(2830, 25, 2833, 27, 'P'); B.rect(2946, 25, 2949, 27, 'P')
B.blob(2852, 34, 2940, 52, 'I', 2)                       # 얼어붙은 바다 (빙판)
for px in (2866, 2890, 2914): B.rect(px - 1, 30, px + 1, 44, 'K')    # 부두
B.rect(2858, 33, 2922, 34, 'K')
B.ell(2928, 46, 9, 6, 'I'); B.ell(2890, 49, 5, 3, 'S'); B.ell(2870, 47, 3, 2, 'S')   # 닻 내린 얼음터 · 얼음섬
M = B.meta
M.update(west=[2831, 26], entry=[2835, 26], east=[2948, 26], eastin=[2944, 26], camp=[2842, 23], safe=[2833, 19, 2851, 33], sena=[2846, 29], noah=[2839, 29], eil=[2843, 32], broom=[2836, 27], bench=[2848, 22],
         fires=[[2868, 20], [2890, 18], [2912, 20]], store=[2880, 28], light=[2936, 18], arena=[2928, 46, 8], boss=[2930, 46], isle=[2890, 49], wreck=[[2876, 41], [2902, 43], [2884, 47]],
         prisons=[[2860, 23], [2884, 21], [2902, 27], [2921, 24]], oil=[[2876, 30], [2885, 30], [2869, 27], [2895, 29], [2858, 28]])
for p in (M['camp'], M['sena'], M['noah'], M['eil'], M['broom'], M['bench'], M['store'], M['light'], M['boss'], M['isle']) + tuple(M['fires']) + tuple(M['wreck']) + tuple(M['prisons']) + tuple(M['oil']): B.protect(p[0], p[1], 2)
B.put('tent', 2837, 22); B.put('crates', 2850, 31); B.put('barrels', 2834, 31); B.put('woodpile', 2836, 32); B.put('bench', 2848, 21); B.put('flag', 2833, 24, 0)
for i, hx in enumerate((2862, 2876, 2898, 2908, 2922)): B.put('house%d' % (i % 3), hx, 17 + (i % 2) * 2, 3)
B.put('house1', 2880, 26, 3)                             # 창고
B.put('tower', 2936, 15, 2); B.put('boat', 2874, 39, 2); B.put('boat', 2904, 41, 2); B.put('boat', 2884, 45, 2); B.put('boat', 2936, 39, 2)
B.put('crates', 2866, 36); B.put('barrels', 2914, 37); B.put('sacks', 2892, 32)
B.scatter(['tree_a', 'tree_b', 'rock', 'log', 'crates'], 26, 2852, 10, 2946, 31, gap=4)
B.scatter(['icerock'], 16, 2854, 36, 2938, 51, on='I', gap=5)
M['zones'] = [[2853, 11, 2896, 30, ['s2gob', 's2crab']], [2897, 11, 2945, 30, ['s2gob', 's2jelly']], [2854, 36, 2916, 51, ['s2crab', 's2jelly', 's2gob']]]
M['areas'] = [['서리항 입구 야영지', 2833, 19, 2851, 33], ['서리항 마을', 2852, 8, 2946, 33], ['얼어붙은 부두 · 빙판', 2852, 34, 2918, 53], ['닻 내린 얼음터', 2919, 38, 2940, 53]]
M['nodes'] = [['s2ore', 2856, 13], ['s2ore', 2900, 12], ['s2ore', 2942, 22], ['s2ore', 2926, 13], ['s2herb', 2872, 13], ['s2herb', 2916, 29], ['s2wood', 2886, 13], ['s2wood', 2854, 30], ['s2ore', 2889, 50]]
M['lights'] = [[2842.5, 24.5, 4, '255,170,90', 't']]
M['dyn'] = [['camp', 'fire1', 'fire1', 2842, 24]] + [['fr%d' % i, 'braz0', 'braz1', b[0], b[1]] for i, b in enumerate(M['fires'])] + [['pr%d' % i, 'prison0', 'prison1', b[0], b[1]] for i, b in enumerate(M['prisons'])] + [['oil%d' % i, 'barrel', None, b[0], b[1]] for i, b in enumerate(M['oil'])] + [['box%d' % i, 'crate1', None, b[0], b[1]] for i, b in enumerate(M['wreck'])]

# ===== 13장: 백설 고목숲 =====
C = Reg('D131', '은백림', 2950, 120, [53, 53]); REGS.append(C)
C.blob(2953, 20, 2972, 40, 'S', 2)
C.ell(2990, 18, 12, 8, 'S'); C.ell(2992, 44, 13, 8, 'S'); C.ell(3020, 30, 12, 9, 'S'); C.ell(3040, 14, 9, 6, 'S'); C.ell(3042, 46, 9, 6, 'S'); C.ell(3058, 30, 9, 9, 'S')
P13 = [[(2951, 30), (2972, 30), (2982, 22), (2990, 18), (3004, 22), (3020, 30)], [(2972, 30), (2982, 40), (2992, 44), (3006, 40), (3020, 30)], [(3020, 30), (3032, 18), (3040, 14)], [(3020, 30), (3032, 42), (3042, 46)], [(3020, 30), (3069, 30)]]
for p in P13: C.road(p, 'S', 2)
C.rect(2950, 29, 2953, 31, 'P'); C.rect(3066, 29, 3069, 31, 'P')
M = C.meta
M.update(west=[2951, 30], entry=[2955, 30], east=[3068, 30], eastin=[3064, 30], camp=[2962, 26], safe=[2953, 21, 2971, 39], lum=[2966, 33], eil=[2960, 34], sena=[2958, 29], noah=[2964, 37], bench=[2968, 25],
         shrooms=[[2984, 22], [2998, 14], [2982, 44], [2998, 48], [3012, 24], [3028, 41]], deer=[[3036, 17], [3047, 45], [3004, 37]], steles=[[3013, 29], [3027, 29], [3020, 35]],
         beacons=[[2990, 16], [2992, 46], [3040, 12], [3042, 48]], heart=[3020, 30], arena=[3058, 30, 8], boss=[3060, 30],
         cold=[[2976, 20, 3008, 26], [2976, 36, 3008, 46], [3024, 14, 3036, 24], [3024, 38, 3036, 46], [3030, 27, 3048, 33]])
for p in (M['camp'], M['lum'], M['eil'], M['sena'], M['noah'], M['bench'], M['heart'], M['boss']) + tuple(M['beacons']) + tuple(M['shrooms']) + tuple(M['deer']) + tuple(M['steles']): C.protect(p[0], p[1], 2)
C.put('tent', 2957, 24); C.put('crates', 2955, 36); C.put('woodpile', 2969, 36); C.put('bench', 2968, 24); C.put('barrels', 2956, 26)
C.put('tree_old', 3020, 27, 2)
C.scatter(['tree_a', 'tree_b', 'tree_c', 'dead', 'rock', 'log'], 60, 2974, 8, 3066, 54, gap=3)
M['zones'] = [[2976, 9, 3006, 27, ['s2spider', 's2moth']], [2976, 35, 3008, 53, ['s2shroom', 's2swolf']], [3008, 20, 3034, 40, ['s2swolf', 's2moth', 's2shroom']], [3030, 7, 3050, 21, ['s2spider', 's2moth']], [3032, 39, 3052, 53, ['s2spider', 's2shroom']]]
M['areas'] = [['은백림 어귀 야영지', 2953, 21, 2971, 39], ['북쪽 은빛 숲길', 2974, 6, 3008, 28], ['남쪽 은빛 숲길', 2974, 33, 3010, 55], ['두 세계의 비석 터', 3009, 20, 3034, 40], ['서리뿌리 빈터', 3048, 20, 3068, 40]]
M['nodes'] = [['s2wood', 2984, 15], ['s2wood', 2996, 21], ['s2wood', 2986, 47], ['s2wood', 3000, 41], ['s2wood', 3014, 26], ['s2wood', 3026, 35], ['s2wood', 3038, 16], ['s2wood', 3044, 43], ['s2herb', 2994, 13], ['s2herb', 2988, 50], ['s2herb', 3024, 24], ['s2ore', 3046, 12], ['s2ore', 3036, 49]]
M['lights'] = [[2962.5, 27.5, 4, '255,170,90', 't']]
M['dyn'] = [['camp', 'fire1', 'fire1', 2962, 27]] + [['bc%d' % i, 'stake', 'flag', b[0], b[1]] for i, b in enumerate(M['beacons'])] + [['ms%d' % i, 'shroom', None, b[0], b[1]] for i, b in enumerate(M['shrooms'])] + [['dr%d' % i, 'deer0', None, b[0], b[1]] for i, b in enumerate(M['deer'])] + [['sl%d' % i, 'stele0', 'stele1', b[0], b[1]] for i, b in enumerate(M['steles'])]

# ===== 14장: 빙정 요새 =====
D = Reg('D141', '빙정성채', 3070, 110, [54, 54], 'V'); REGS.append(D)
def room(x0, y0, x1, y1): D.rect(x0 - 1, y0 - 2, x1 + 1, y1 + 1, 'X'); D.rect(x0, y0, x1, y1, 'F')
room(3073, 23, 3090, 37)                                  # 앞마당
room(3096, 20, 3124, 40)                                  # 중앙 홀
room(3100, 5, 3120, 14); room(3100, 46, 3120, 55)         # 북·남 장치실
room(3130, 6, 3146, 16)                                   # 기록실
room(3132, 24, 3150, 36)                                  # 동쪽 장치실
room(3156, 22, 3176, 38)                                  # 수문장의 문
def hall(x0, y0, x1, y1): D.rect(x0, y0, x1, y1, 'F')
for h in ((3070, 29, 3073, 31), (3090, 29, 3096, 31), (3109, 14, 3111, 20), (3109, 40, 3111, 46), (3120, 9, 3130, 11), (3124, 29, 3132, 31), (3150, 29, 3156, 31), (3176, 29, 3179, 31)):
    D.rect(h[0] - (0 if h[3] - h[1] > 3 else 0), h[1] - 2 if h[2] - h[0] > 3 else h[1], h[2], h[3] + 1 if h[2] - h[0] > 3 else h[3], 'X') if False else None
    hall(*h)
M = D.meta
M.update(west=[3071, 30], entry=[3075, 30], east=[3178, 30], eastin=[3174, 30], camp=[3080, 26], safe=[3073, 23, 3090, 37], kai=[3084, 34], eil=[3078, 34], sena=[3076, 30], broom=[3086, 29], bench=[3087, 25],
         devs=[[3110, 8], [3110, 51], [3142, 30]], pillars=[[3110, 25], [3110, 36], [3141, 26]], gdev=[3121, 26], gate1=[3127, 29, 3127, 31], cells=[[3133, 8], [3137, 8], [3141, 8], [3145, 8]],
         arena=[3166, 30, 8], boss=[3168, 30], gate=[3153, 29, 3153, 31])
for p in (M['camp'], M['kai'], M['eil'], M['sena'], M['broom'], M['bench'], M['gdev'], M['boss']) + tuple(M['devs']) + tuple(M['pillars']) + tuple(M['cells']): D.protect(p[0], p[1], 2)
D.put('tent', 3076, 25); D.put('crates', 3074, 36); D.put('bench', 3087, 24); D.put('barrels', 3089, 36)
for x in (3098, 3122):
    for y in (22, 38): D.put('pil', x, y)
for x, y in ((3102, 6), (3118, 6), (3102, 48), (3118, 48), (3134, 25), (3148, 25), (3158, 23), (3174, 23), (3158, 37), (3174, 37)): D.put('stat', x, y)
for x, y in ((3104, 24), (3116, 24), (3104, 36), (3116, 36), (3132, 14), (3144, 14), (3136, 34), (3146, 34)): D.put('icerock', x, y)
M['zones'] = [[3097, 21, 3123, 39, ['s2sol', 's2arch']], [3101, 6, 3119, 13, ['s2golem', 's2orb']], [3101, 47, 3119, 54, ['s2golem', 's2sol']], [3133, 25, 3149, 35, ['s2sol', 's2golem', 's2orb']], [3131, 10, 3145, 15, ['s2arch', 's2sol']]]
M['areas'] = [['성채 앞마당', 3073, 21, 3090, 38], ['중앙 홀', 3096, 18, 3124, 41], ['북쪽 포대', 3100, 3, 3120, 15], ['남쪽 포대', 3100, 44, 3120, 56], ['얼음 감옥', 3130, 4, 3146, 17], ['동쪽 동력실', 3132, 22, 3150, 37], ['기사장의 문', 3156, 20, 3176, 39]]
M['nodes'] = [['s2ore', 3101, 12], ['s2ore', 3119, 53], ['s2ore', 3133, 35], ['s2ore', 3098, 39], ['s2aur', 3145, 8], ['s2aur', 3101, 54], ['s2aur', 3119, 6]]
M['lights'] = [[3080.5, 27.5, 4, '255,170,90', 't'], [3110.5, 30.5, 5, '120,200,255', 'c'], [3166.5, 30.5, 6, '120,200,255', 'c']]
M['dyn'] = [['camp', 'fire1', 'fire1', 3080, 27]] + [['cn%d' % i, 'can0', 'can1', b[0], b[1]] for i, b in enumerate(M['devs'])] + [['pl%d' % i, 'dev0', 'dev1', b[0], b[1] - 1] for i, b in enumerate(M['pillars'])] + [['cl%d' % i, 'cell0', 'cell1', b[0], b[1]] for i, b in enumerate(M['cells'])] + [['gdev', 'relay0', 'relay1', 3121, 25], ['gate1', 'bar0', None, 3127, 31], ['gate', 'bar0', None, 3153, 31]]

# ===== 15장: 두 번째 마계문 =====
E = Reg('D151', '빙월협곡 · 두 번째 마계문', 3180, 70, [55, 55], 'V'); REGS.append(E)
E.rect(3182, 21, 3200, 39, 'X'); E.rect(3183, 23, 3199, 38, 'F')
E.rect(3200, 29, 3208, 31, 'F')
E.ell(3228, 30, 19, 15, 'X'); E.ell(3228, 31, 18, 13, 'G')
E.rect(3180, 29, 3183, 31, 'F'); E.rect(3204, 29, 3212, 31, 'F')
M = E.meta
M.update(west=[3181, 30], entry=[3185, 30], camp=[3190, 26], safe=[3183, 23, 3199, 38], kai=[3194, 34], lum=[3188, 34], ria=[3196, 26], eil=[3186, 30], bench=[3197, 35],
         stones=[[3213, 31], [3243, 31], [3228, 43]], arena=[3228, 31, 13], altar=[3228, 24], boss=[3228, 30], door=[3228, 19], gate=[3206, 29, 3206, 31], lp=[[3219, 24], [3237, 24], [3228, 38]], mirrors=[[3216, 28], [3240, 28]])
for p in (M['camp'], M['kai'], M['lum'], M['ria'], M['eil'], M['bench'], M['altar'], M['boss']) + tuple(M['lp']) + tuple(M['stones']) + tuple(M['mirrors']): E.protect(p[0], p[1], 2)
E.put('tent', 3186, 25); E.put('crates', 3184, 37); E.put('bench', 3197, 34)
for x, y in ((3214, 22), (3242, 22), (3212, 40), (3244, 40)): E.put('pil', x, y)
for x, y in ((3220, 21), (3236, 21)): E.put('stat', x, y)
M['zones'] = [[3211, 19, 3245, 43, ['s2leo', 's2mk', 's2sham', 's2shard']]]; M['areas'] = [['마지막 설원 야영지', 3183, 21, 3199, 39], ['빙월 제단 · 두 번째 마계문', 3209, 15, 3248, 46]]
M['nodes'] = [['s2aur', 3185, 37], ['s2aur', 3198, 24]]
M['lights'] = [[3190.5, 27.5, 4, '255,170,90', 't'], [3228.5, 22.5, 7, '120,200,255', 'c']]
M['dyn'] = [['camp', 'fire1', 'fire1', 3190, 27], ['door', 'door0', 'door1', 3228, 19], ['altar', 'alt0', 'alt1', 3228, 25], ['gate', 'bar0', None, 3206, 31]] + [['st%d' % i, 'sst0', 'sst1', b[0], b[1] - 1] for i, b in enumerate(M['stones'])] + [['lp%d' % i, 'braz0', 'braz1', b[0], b[1]] for i, b in enumerate(M['lp'])] + [['mr%d' % i, None, 'mirror', b[0], b[1]] for i, b in enumerate(M['mirrors'])]

# ---------- 숲 가장자리 나무 · 타일 고르기 · 저장 ----------
def near_walk(R, x, y, d):
    for dy in range(-d, d + 1):
        for dx in range(-d, d + 1):
            if R.get(x + dx, y + dy) in WALK: return True
    return False
out = {'tw': REGS[-1].x0 + REGS[-1].w, 'n0': N0, 'ice': ICE, 'regions': [], 'solid': [''] * TH, 'reg': {}}
for R in REGS:
    g = [];
    for y in range(TH):
        row = []
        for x in range(R.x0, R.x0 + R.w):
            k = R.get(x, y); h = (x * 7 + y * 13 + (x * y) % 5)
            if k == 'T':
                nw = near_walk(R, x, y, 3)
                row.append([SNOW[h % 3]] if nw else [DEEP[h % 2]])
                if nw and (x + y * 2) % 3 == 0 and (y % 2 == 0): R.obj.append(['s2_' + ('tree_a', 'tree_b', 'tree_c')[h % 3], x * TS + 16 - OB['tree_a'].width // 2 + (h % 9) - 4, (y + 1) * TS])
            elif k == 'S': row.append([SNOW[h % 3]])
            elif k == 'P': row.append([SNOW[h % 3], PATH[h % 3]] if False else [PATH[h % 3]])
            elif k == 'I': row.append([ICE[h % 3]])
            elif k == 'W': row.append([SEA[h % 2]])
            elif k == 'K': row.append([PLANK])
            elif k == 'F': row.append([FLOOR[h % 2]])
            elif k == 'G': row.append([GLYPH if (x + y) % 2 else FLOOR[0]])
            elif k == 'R': row.append([RFACE] if R.get(x, y + 1) not in 'RV' else [ROCK[h % 2]])
            elif k == 'X': row.append([WFACE] if R.get(x, y + 1) in WALK else [WTOP])
            else: row.append([VOID])
        g.append(row)
    for y in range(TH): out['solid'][y] += ''.join('0' if R.free(x, y) else '1' for x in range(R.x0, R.x0 + R.w))
    names = sorted({o[0] for o in R.obj} | {'s2_' + n for d in R.meta.get('dyn', []) for n in d[1:3] if n}, key=lambda n: -OB[n[3:]].height)
    Wm = 1024; x = y = sh = 0; pos = {}
    for n in names:
        im = OB[n[3:]]
        if x + im.width > Wm: x = 0; y += sh; sh = 0
        pos[n] = [x, y, im.width, im.height]; x += im.width; sh = max(sh, im.height)
    sheet = Image.new('RGBA', (Wm, y + sh))
    for n, (px, py, w, h) in pos.items(): sheet.paste(OB[n[3:]], (px, py))
    sheet.save(OUT + 'm/o_%s.png' % R.id, optimize=True)
    R.obj.sort(key=lambda o: o[2])
    # 움직이는 그림: [key, 꺼짐, 켜짐, 왼쪽 x, 아래 y]
    dyn = []
    for key, n0, n1, tx, ty in R.meta.get('dyn', []):
        im = OB[n0 or n1]; dyn.append([key, n0 and 's2_' + n0, n1 and 's2_' + n1, tx * TS + 16 - im.width // 2, (ty + 1) * TS])
    R.meta['dyn2'] = dyn; del R.meta['dyn']
    data = {'id': R.id, 'x0': R.x0, 'g': g, 'obj': R.obj, 'rect': pos}
    js = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    open(OUT + 'm/r_%s.json' % R.id, 'w').write(js)
    open(OUT + 'm/r_%s.js' % R.id, 'w').write('RGN.cache[%s]=%s;' % (json.dumps(R.id), js))
    out['regions'].append({'id': R.id, 'n': R.n, 'x0': R.x0, 'x1': R.x0 + R.w, 'mobs': 10 if R.id == 'D151' else 14, 'lv': R.lv, 'lock': 's2', 'dun': REGS.index(R), 'f': 'm/r_%s.json' % R.id, 'img': 'm/o_%s.png' % R.id})
    out['reg'][R.id] = R.meta
    # 길 이어짐 확인
    def reach(a, b):
        seen = {tuple(a)}; Q = [tuple(a)]
        while Q:
            c = Q.pop()
            if c == tuple(b): return True
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                n = (c[0] + dx, c[1] + dy)
                if n not in seen and R.free(*n): seen.add(n); Q.append(n)
        return False
    pts = [(k, v) for k, v in R.meta.items() if isinstance(v, list) and len(v) in (2, 3) and all(isinstance(q, (int, float)) for q in v) and k not in ('gate',)]
    for k, v in R.meta.items():
        if isinstance(v, list) and v and isinstance(v[0], list) and len(v[0]) == 2 and k in ('beacons', 'fires', 'devs', 'lp', 'wreck', 'wood', 'scouts', 'prisons', 'oil', 'shrooms', 'deer', 'steles', 'pillars', 'cells', 'stones', 'mirrors'): pts += [(k + str(i), p) for i, p in enumerate(v)]
    for k, v in pts:
        t = [int(v[0]), int(v[1])]
        if not R.free(*t): t = next(([t[0] + dx, t[1] + dy] for dx, dy in ((0, 1), (1, 0), (-1, 0), (0, -1), (0, 2), (1, 1), (-1, 1)) if R.free(t[0] + dx, t[1] + dy)), None)
        if not t or not reach(R.meta['entry'], t): print('!! 못 감', R.id, k, v)
    for n in R.meta['nodes']:
        if not R.free(n[1], n[2]) and not any(R.free(n[1] + dx, n[2] + dy) for dx, dy in ((0, 1), (1, 0), (-1, 0), (0, -1))): print('!! 채집 자리 막힘', R.id, n)
    print(R.id, len(R.obj), 'objs', sheet.size)
json.dump(out, open('/home/user/s2/s2_map.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print('tiles', N0, '+', len(NEW))
