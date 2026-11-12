# 앱 아이콘 도트: 128×128 바탕(돌 아치 + 소용돌이 마계문) + 캐릭터 2배 → 8배 = 1024
import math,random
from PIL import Image
D='/tmp/claude-0/icon/'
W=128
def crop_char(sheet,box):
    im=Image.open(D+sheet).convert('RGBA').crop(box);return im.crop(im.getbbox())
def outline(im,col=(10,4,16,255)):
    w,h=im.size;o=Image.new('RGBA',(w+2,h+2));px=im.load();op=o.load()
    for y in range(h):
        for x in range(w):
            if px[x,y][3]>100:
                for dx,dy in ((-1,0),(1,0),(0,-1),(0,1)):op[x+1+dx,y+1+dy]=col
    o.alpha_composite(im,(1,1));return o
def lerp(a,b,t):t=max(0,min(1,t));return tuple(int(a[i]+(b[i]-a[i])*t) for i in range(3))
PALS={'red':((12,4,20),(80,12,44),(140,18,48),(235,60,70),(255,190,130),(78,70,90),(46,40,58)),
      'blue':((6,8,24),(18,34,90),(28,58,160),(80,160,255),(220,245,255),(78,80,98),(44,46,62))}
def scene(pal,cy=56,rx=34,ry=44):
    bg0,bg1,r0,r1,r2,st,st2=PALS[pal];im=Image.new('RGBA',(W,W));p=im.load()
    for y in range(W):
        for x in range(W):
            d=math.hypot(x-64,y-cy)/80;c=lerp(bg1,bg0,d)
            # 빛줄기 (2칸 단위)
            a=(math.degrees(math.atan2(y-cy,x-64))+360)%30
            if a<6 and d<.9:c=lerp(c,r0,.45*(1-d))
            p[x,y]=c+(255,)
    for y in range(0,W,2):
        for x in range(0,W,2):
            dx=(x-64)/rx;dy=(y-cy)/ry;d=math.hypot(dx,dy)
            if d<1:
                ang=math.atan2(dy,dx)+d*4.5;v=(math.sin(ang*3)+1)/2
                c=lerp(r1,r2,1-d) if v>.55 else lerp(r0,r1,1-d)
                if d<.22:c=lerp((255,245,225),r2,d/.22)
                for yy in (y,y+1):
                    for xx in (x,x+1):p[xx,yy]=c+(255,)
    # 돌 아치 (2칸 단위 벽돌)
    for y in range(0,W,2):
        for x in range(0,W,2):
            d=math.hypot((x-64)/(rx+6),(y-cy)/(ry+6))
            pil=(abs(x-64)>=rx-2 and abs(x-64)<rx+8 and y>cy)
            if (1<=d*(rx+6)/(rx+6)*1 and d>=.86 and d<1.0 and y<=cy) or pil:
                c=st if ((x//6)+(y//4))%3 else st2
                if y%8==0:c=st2
                for yy in (y,y+1):
                    for xx in (x,x+1):p[xx,yy]=c+(255,)
    # 룬 빛
    for i in range(9):
        a=math.radians(200+i*17);x=int(64+math.cos(a)*(rx+3))//2*2;y=int(cy+math.sin(a)*(ry+3))//2*2
        for yy in (y,y+1):
            for xx in (x,x+1):
                if 0<=yy<W:p[xx,yy]=r2+(255,)
    # 바닥
    for y in range(104,W):
        for x in range(W):p[x,y]=lerp(st2,bg0,(y-104)/24)+(255,)
    return im
def frame(im,g=((255,214,110),(170,110,30),(50,24,8)),t=2):
    p=im.load()
    for y in range(W):
        for x in range(W):
            e=min(x,y,W-1-x,W-1-y)//t
            if e==0:p[x,y]=g[2]+(255,)
            elif e==1:p[x,y]=g[0]+(255,)
            elif e==2:p[x,y]=g[1]+(255,)
    return im
def fgimg(sheet,box,scale=2,cx=64,bottom=118):
    ch=crop_char(sheet,box);ch=outline(ch);ch=ch.resize((ch.width*scale,ch.height*scale),Image.NEAREST)
    fg=Image.new('RGBA',(W,W));fg.alpha_composite(ch,(cx-ch.width//2,bottom-ch.height));return fg
def build(pal,sheet,box,**k):
    bg=scene(pal);fg=fgimg(sheet,box,**k);full=bg.copy();full.alpha_composite(fg);frame(full);return bg,fg,full
