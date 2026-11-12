# 아이콘 시안 2차: 캐릭터 크게(3~5배), 강한 배경. 128 바탕 → 8배 = 1024
import math
from PIL import Image,ImageDraw
S=Image.open('/tmp/claude-0/icon/sheet_C.png').convert('RGBA')
B=[(41,95),(168,223),(298,352),(424,479),(524,576),(604,671),(744,800),(874,945),(1000,1056),(1130,1184),(1255,1312),(1385,1441),(1511,1568)]
W=128
def cell(b,c):
    y0,y1=B[b];x=S.crop((c*128,y0-4,c*128+128,y1+4));return x.crop(x.getbbox())
def outline(im,col=(14,6,20,255)):
    w,h=im.size;o=Image.new('RGBA',(w+2,h+2));px=im.load();op=o.load()
    for y in range(h):
        for x in range(w):
            if px[x,y][3]>100:
                for dx in(-1,0,1):
                    for dy in(-1,0,1):op[x+1+dx,y+1+dy]=col
    o.alpha_composite(im,(1,1));return o
def L(a,b,t):t=max(0,min(1,t));return tuple(int(a[i]+(b[i]-a[i])*t) for i in range(3))+(255,)
def q(v,n=2):return v//n*n
def burst(c0,c1,c2,cx=64,cy=64,n=14,step=2):
    im=Image.new('RGBA',(W,W));p=im.load()
    for y in range(0,W,step):
        for x in range(0,W,step):
            d=math.hypot(x-cx,y-cy)/90;a=(math.degrees(math.atan2(y-cy,x-cx))+360)%(360/n)
            c=L(c1,c0,d)
            if a<(360/n)*.45:c=L(c2,c1,d*1.2)
            for yy in range(step):
                for xx in range(step):p[x+xx,y+yy]=c
    return im
def portal(im,cx,cy,rx,ry,c0,c1,c2,turns=5,ring=(255,230,160)):
    p=im.load()
    for y in range(0,W,2):
        for x in range(0,W,2):
            dx=(x-cx)/rx;dy=(y-cy)/ry;d=math.hypot(dx,dy)
            if d<1:
                v=(math.sin((math.atan2(dy,dx)+d*turns)*3)+1)/2
                c=L(c1,c2,1-d) if v>.5 else L(c0,c1,1-d)
                if d<.2:c=L((255,250,235),c2,d/.2)
                if d>.9:c=ring+(255,)
                for yy in(0,1):
                    for xx in(0,1):p[x+xx,y+yy]=c
    return im
def sparks(im,pts,col=(255,240,180)):
    p=im.load()
    for x,y,s in pts:
        for i in range(-s,s+1):
            for (a,b) in ((x+i,y),(x,y+i)):
                if 0<=a<W and 0<=b<W:p[a,b]=col+(255,)
    return im
def place(bg,spr,scale,cx,bottom):
    s=outline(spr).resize(((spr.width+2)*scale,(spr.height+2)*scale),Image.NEAREST)
    bg.alpha_composite(s,(cx-s.width//2,bottom-s.height));return bg
def vign(im,amt=.55):
    p=im.load()
    for y in range(W):
        for x in range(W):
            d=max(0,math.hypot(x-64,y-64)/90-.45);r,g,b,a=p[x,y];k=1-amt*d
            p[x,y]=(int(r*k),int(g*k),int(b*k),a)
    return im
def A():# 불꽃 돌격: 칼 든 옆모습, 주황 빛줄기
    bg=burst((90,10,10),(230,70,20),(255,190,60),cx=70,cy=50)
    bg=vign(bg,.4);sparks(bg,[(18,20,2),(108,96,2),(22,92,1),(104,24,1)])
    return place(bg,cell(3,0),2,62,126)
def Bk():# 마계문 앞 뒷모습
    bg=burst((10,2,14),(70,10,30),(120,20,40),cx=64,cy=50,n=18)
    portal(bg,64,52,46,50,(60,0,20),(200,30,50),(255,170,90),ring=(250,200,120))
    vign(bg,.6);return place(bg,cell(0,0),2,64,128)
def C():# 얼굴 크게
    bg=burst((20,6,40),(110,20,70),(200,50,80),cx=64,cy=40,n=16)
    vign(bg,.5)
    spr=cell(2,0);head=spr.crop((3,0,35,27))
    return place(bg,head,4,64,130)
def D():# 봉인 문장: 금 고리 + 기사
    bg=burst((6,8,30),(20,40,110),(60,110,210),cx=64,cy=60,n=12)
    d=ImageDraw.Draw(bg)
    for r,c in((54,(120,80,20)),(52,(255,210,100)),(48,(120,80,20))):d.ellipse((64-r,60-r,64+r,60+r),outline=c+(255,),width=2)
    for i in range(12):
        a=math.radians(i*30);x=q(int(64+math.cos(a)*50));y=q(int(60+math.sin(a)*50))
        d.rectangle((x-1,y-1,x+2,y+2),fill=(150,230,255,255))
    vign(bg,.5);return place(bg,cell(10,3),2,64,124)
for k,f in(('A',A),('B',Bk),('C',C),('D',D)):
    im=f();im.save(f'i{k}_128.png');im.resize((1024,1024),Image.NEAREST).save(f'i{k}_1024.png')
# 미리보기: 둥근 아이콘 + 작은 크기
def rounded(im,sz):
    m=Image.new('L',(sz,sz));ImageDraw.Draw(m).rounded_rectangle((0,0,sz-1,sz-1),radius=int(sz*.3),fill=255)
    o=im.resize((sz,sz),Image.NEAREST if sz%128==0 else Image.LANCZOS);o.putalpha(m);return o
pv=Image.new('RGBA',(4*300+40,460),(40,44,70,255))
for i,k in enumerate('ABCD'):
    im=Image.open(f'i{k}_128.png');pv.alpha_composite(rounded(im,256),(20+i*300,20));pv.alpha_composite(rounded(im,96),(100+i*300,320))
pv.save('preview.png')
