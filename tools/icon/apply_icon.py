# 고른 시안을 앱 아이콘·시작 화면으로 넣기: python3 apply_icon.py 1
import sys,os;sys.path.insert(0,os.path.dirname(__file__))
from make_icon import *
V={1:('red','sheet_C.png'),2:('blue','sheet_B.png'),3:('red','sheet_A.png')}
pal,sheet=V[int(sys.argv[1])];R3=(0,384,128,512)
RES='/home/user/appcap/android/app/src/main/res/';OUT='/home/user/appcap/'
bg,fg,full=build(pal,sheet,R3)
# 1) 예전 방식 아이콘(네모·둥근)
DEN={'mdpi':1,'hdpi':1.5,'xhdpi':2,'xxhdpi':3,'xxxhdpi':4}
for d,s in DEN.items():
    n=int(48*s);full.resize((n,n),Image.LANCZOS).save(RES+f'mipmap-{d}/ic_launcher.png')
    m=Image.new('L',(n*4,n*4));from PIL import ImageDraw;ImageDraw.Draw(m).ellipse((0,0,n*4-1,n*4-1),255);m=m.resize((n,n),Image.LANCZOS)
    r=bg.copy();r.alpha_composite(fg);r=r.resize((n,n),Image.LANCZOS);r.putalpha(m);r.save(RES+f'mipmap-{d}/ic_launcher_round.png')
# 2) 적응형 아이콘: 바탕 = 마계문 장면, 앞 = 캐릭터(가운데 안전 구역 안)
ch=outline(crop_char(sheet,R3))
for d,s in DEN.items():
    n=int(108*s);bgn=bg.resize((n,n),Image.NEAREST);bgn.save(RES+f'mipmap-{d}/ic_launcher_background.png')
    k=max(1,round(n*0.60/ch.height));c=ch.resize((ch.width*k,ch.height*k),Image.NEAREST)
    f=Image.new('RGBA',(n,n));f.alpha_composite(c,((n-c.width)//2,(n-c.height)//2+int(n*0.03)));f.save(RES+f'mipmap-{d}/ic_launcher_foreground.png')
open(RES+'mipmap-anydpi-v26/ic_launcher.xml','w').write('<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n    <background android:drawable="@mipmap/ic_launcher_background"/>\n    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n</adaptive-icon>\n')
open(RES+'mipmap-anydpi-v26/ic_launcher_round.xml','w').write(open(RES+'mipmap-anydpi-v26/ic_launcher.xml').read())
# 3) 시작 화면: 어두운 바탕 가운데 아이콘
import glob
dark=PALS[pal][0]
for f in glob.glob(RES+'drawable*/splash.png'):
    w,h=Image.open(f).size;sp=Image.new('RGBA',(w,h),dark+(255,));n=int(min(w,h)*0.42)//128*128 or 128
    sp.alpha_composite(full.resize((n,n),Image.NEAREST),((w-n)//2,(h-n)//2));sp.convert('RGB').save(f)
# 4) 웹·스토어용 아이콘
full.resize((512,512),Image.NEAREST).save(OUT+'icon-512.png');full.resize((192,192),Image.LANCZOS).save(OUT+'icon-192.png')
full.resize((1024,1024),Image.NEAREST).save(OUT+'game/icon-1024.png') if False else None
# 미리보기: 동그라미·둥근 네모로 잘린 모습
pv=Image.new('RGBA',(3*230,220),(40,40,40,255));from PIL import ImageDraw
a=Image.open(RES+'mipmap-xxxhdpi/ic_launcher_background.png').convert('RGBA');a.alpha_composite(Image.open(RES+'mipmap-xxxhdpi/ic_launcher_foreground.png'))
a=a.crop((54,54,378,378)).resize((200,200),Image.LANCZOS)
for i,shape in enumerate(['circle','squircle','legacy']):
    if shape=='legacy':t=full.resize((200,200),Image.LANCZOS)
    else:
        m=Image.new('L',(200,200));dr=ImageDraw.Draw(m)
        (dr.ellipse if shape=='circle' else (lambda b,fill:dr.rounded_rectangle(b,radius=56,fill=fill)))((0,0,199,199),fill=255);t=a.copy();t.putalpha(m)
    pv.alpha_composite(t,(i*230+10,10))
pv.save(D+'adaptive_preview.png');print('ok',pal,sheet)
