# 2차 아이콘(사용자 선택 B3: 마계문 앞 뒷모습 + 볏 달린 투구) 앱에 넣기
# 그림 재료: /tmp/claude-0/icon/sheet_C.png(장면 함수용), sh_hat_helmet_maximus.png(게임 buildSheet로 만든 캐릭터)
import sys,os,glob;sys.path.insert(0,os.path.dirname(__file__))
exec(open(os.path.join(os.path.dirname(__file__),'make2.py')).read().split('def A')[0])
from PIL import Image,ImageDraw
SH=os.path.join(os.path.dirname(__file__),'sh_hat_helmet_maximus.png')
def cellOf(path,b,c):
    im=Image.open(path).convert('RGBA');y0,y1=B[b];x=im.crop((c*128,y0-4,c*128+128,y1+4));return x.crop(x.getbbox())
def scene():
    bg=burst((10,2,14),(70,10,30),(120,20,40),cx=64,cy=50,n=18)
    portal(bg,64,52,46,50,(60,0,20),(200,30,50),(255,170,90),ring=(250,200,120));return vign(bg,.6)
ch=cellOf(SH,0,0);bg=scene();full=place(bg.copy(),ch,2,64,128)
RES='/home/user/appcap/android/app/src/main/res/';OUT='/home/user/appcap/'
DEN={'mdpi':1,'hdpi':1.5,'xhdpi':2,'xxhdpi':3,'xxxhdpi':4}
for d,s in DEN.items():
    n=int(48*s);full.resize((n,n),Image.LANCZOS).save(RES+f'mipmap-{d}/ic_launcher.png')
    m=Image.new('L',(n*4,n*4));ImageDraw.Draw(m).ellipse((0,0,n*4-1,n*4-1),255);m=m.resize((n,n),Image.LANCZOS)
    r=full.resize((n,n),Image.LANCZOS);r.putalpha(m);r.save(RES+f'mipmap-{d}/ic_launcher_round.png')
oc=outline(ch)
# 적응형 바탕: 보이는 가운데 2/3에 마계문 전체가 들어오게 192칸 크기로 다시 그림(가운데 = 96)
W=192
def vign2(im,amt=.6):
    p=im.load()
    for y in range(W):
        for x in range(W):
            d=max(0,math.hypot(x-96,y-96)/90-.45);r,g,b,a=p[x,y];k=1-amt*d;p[x,y]=(int(r*k),int(g*k),int(b*k),a)
    return im
bgA=burst((10,2,14),(70,10,30),(120,20,40),cx=96,cy=84,n=18)
portal(bgA,96,86,46,50,(60,0,20),(200,30,50),(255,170,90),ring=(250,200,120));vign2(bgA)
for d,s in DEN.items():
    n=int(108*s);bgA.resize((n,n),Image.NEAREST).save(RES+f'mipmap-{d}/ic_launcher_background.png')
    k=max(1,round(n*0.50/oc.height));c=oc.resize((oc.width*k,oc.height*k),Image.NEAREST)
    f=Image.new('RGBA',(n,n));f.alpha_composite(c,((n-c.width)//2,int(n*0.80)-c.height));f.save(RES+f'mipmap-{d}/ic_launcher_foreground.png')
for f in glob.glob(RES+'drawable*/splash.png'):
    w,h=Image.open(f).size;sp=Image.new('RGBA',(w,h),(10,2,14,255));n=int(min(w,h)*0.42)//128*128 or 128
    sp.alpha_composite(full.resize((n,n),Image.NEAREST),((w-n)//2,(h-n)//2));sp.convert('RGB').save(f)
full.resize((512,512),Image.NEAREST).save(OUT+'icon-512.png');full.resize((192,192),Image.LANCZOS).save(OUT+'icon-192.png')
# 미리보기
a=Image.open(RES+'mipmap-xxxhdpi/ic_launcher_background.png').convert('RGBA');a.alpha_composite(Image.open(RES+'mipmap-xxxhdpi/ic_launcher_foreground.png'))
a=a.crop((72,72,360,360)).resize((200,200),Image.LANCZOS);pv=Image.new('RGBA',(3*230,220),(40,40,40,255))
for i,shape in enumerate(['circle','squircle','legacy']):
    if shape=='legacy':t=full.resize((200,200),Image.LANCZOS)
    else:
        m=Image.new('L',(200,200));dr=ImageDraw.Draw(m)
        (dr.ellipse((0,0,199,199),fill=255) if shape=='circle' else dr.rounded_rectangle((0,0,199,199),radius=60,fill=255));t=a.copy();t.putalpha(m)
    pv.alpha_composite(t,(i*230+10,10))
pv.save('/home/user/work/icon2/adaptive_preview.png');print('ok')
