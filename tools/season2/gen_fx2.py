"""지피티 효과 그림 2차(12장) → game/m/s2fx2_<이름>.png (8칸 한 줄) + fx2_art.json
원본: 프로젝트 파일 season2/그림원본_효과2/
- 흰 바탕(가짜 체크무늬 포함): 가장자리에서 이어진 흰 부분을 지우고, 빛 번짐은 흰색을 빼서 반투명으로
- 검은/남색 칸 바탕: 칸 바탕색을 빼고 밝기를 투명도로 (빛 효과라 자연스럽게 겹쳐짐)
- 칸마다 같은 기준점(가운데/아래 가운데/왼쪽 가운데)에 맞춰서 흔들림 없게
- 예고 표시(빨강)는 얼음 공격용 파란 판도 같이 만듦, 부채꼴은 각도별(1.7·2.2·2.6)로 극좌표로 다시 그림"""
import json,sys,math
import numpy as np
from PIL import Image
from scipy import ndimage as nd
SRC=sys.argv[1] if len(sys.argv)>1 else '/mnt/project-files/pixel-adventure/season2/그림원본_효과2/'
OUT=sys.argv[2] if len(sys.argv)>2 else '../../game/m/'
BIG=200
# 256색으로 줄여 저장 (용량 약 1/4, 눈으로 차이 거의 없음)
def q8(im):return im.quantize(256,method=Image.Quantize.FASTOCTREE,dither=Image.Dither.FLOYDSTEINBERG)
def L(n):return np.array(Image.open(SRC+n+'.png').convert('RGBA')).astype(np.float32)
def white_bg(a,seed_top=True):
    rgb=a[...,:3];mn=rgb.min(2);mx=rgb.max(2)
    near=(mn>200)&(mx-mn<22)
    seed=np.zeros(near.shape,bool);seed[-1,:]=1;seed[:,0]=1;seed[:,-1]=1
    if seed_top:seed[0,:]=1
    lab,_=nd.label(near);ids=np.unique(lab[seed&near]);ids=ids[ids>0]
    bg=np.isin(lab,ids)
    # 바탕과 가까운 가장자리(번짐)는 흰색을 빼서 반투명으로
    d=nd.distance_transform_edt(~bg)
    aw=np.clip((255-mn)/255,0,1)
    alpha=np.where(bg,0,np.where(d<10,np.minimum(1,aw*1.6),1.0))
    col=rgb.copy();m=(~bg)&(d<10)&(alpha>0)
    k=np.clip(aw*1.0,1e-3,1)[...,None]
    un=np.clip((rgb-(1-k)*255)/k,0,255)
    col[m]=un[m]
    a=a.copy();a[...,:3]=col;a[...,3]=alpha*255
    a[...,3]=np.where(a[...,3]<14,0,a[...,3]);return a
def dark_bg(a,bgc=None,boost=1.4,cut=0.07):
    rgb=a[...,:3]
    if bgc is not None:rgb=np.clip(rgb-np.array(bgc,np.float32),0,255)
    al=np.clip(rgb.max(2)/255*boost,0,1)
    col=np.clip(rgb/np.maximum(al,1e-3)[...,None]*1.0,0,255)
    col=np.where((rgb.max(2)>0)[...,None],np.clip(rgb/np.maximum(rgb.max(2,keepdims=True),1)*np.minimum(255,rgb.max(2,keepdims=True)*boost),0,255),0)
    col=np.clip(rgb/np.maximum(al[...,None],1e-3),0,255)
    al=np.where(al<cut,0,al);a=a.copy();a[...,:3]=col;a[...,3]=al*255;return a
def eq8(a):w=a.shape[1];return [[round(w*i/8),round(w*(i+1)/8)] for i in range(8)]
def gaps8(a,MIN=150):
    """투명한 세로 틈으로 8칸 나누기 (틈 7개: 가장 투명한 곳)"""
    pr=(a[...,3]>40).sum(0).astype(float);pr=np.convolve(pr,np.ones(15)/15,'same');w=len(pr)
    INF=1e18;K=7;cost=np.full((K+1,w),INF);back=np.zeros((K+1,w),int)
    for x in range(MIN,w):cost[1][x]=pr[x]
    for k in range(2,K+1):
        best=INF;bi=0
        for x in range(MIN*k,w-MIN*(K+1-k)+1):
            y=x-MIN
            if cost[k-1][y]<best:best=cost[k-1][y];bi=y
            cost[k][x]=best+pr[x];back[k][x]=bi
    x=int(np.argmin(cost[K][:w-MIN+1]));cuts=[x]
    for k in range(K,1,-1):x=back[k][x];cuts.append(x)
    cuts=sorted(cuts);b=[0]+cuts+[w];return [[b[i],b[i+1]] for i in range(8)]
def panel_clean(c,pad=10):
    c=c.copy();c[:pad,:,3]=0;c[-pad:,:,3]=0;c[:,:pad,3]=0;c[:,-pad:,3]=0;return c
def keep_main(c,minpx=12):
    m=c[...,3]>0;lab,n=nd.label(m)
    if n==0:return c
    sz=nd.sum(m,lab,range(1,n+1));drop=list(np.where(sz<minpx)[0])
    for i,sl in enumerate(nd.find_objects(lab)):  # 칸 테두리 같은 가는 가로줄 지우기
        if sl and sl[0].stop-sl[0].start<=5 and sl[1].stop-sl[1].start>60:drop.append(i)
    small=np.isin(lab,1+np.array(drop,int));c=c.copy();c[small,3]=0;return c
def round_mask(c,pad=16,soft=.18):
    H,W=c.shape[:2];R=min(H,W)/2-pad;yy,xx=np.mgrid[:H,:W];r=np.hypot(xx-W/2+.5,yy-H/2+.5)
    c=c.copy();c[...,3]*=np.clip((R-r)/(R*soft),0,1);return c
def bbox(c,t=10):
    m=c[...,3]>t;ys=np.where(m.any(1))[0];xs=np.where(m.any(0))[0]
    return None if len(ys)==0 else (xs[0],ys[0],xs[-1]+1,ys[-1]+1)
def edge(strip,col=(18,52,110),k=5,a=.62):
    """눈밭(흰 바닥)에서도 보이게 얼음 그림 둘레에 짙은 남색 테두리를 깔기"""
    al=np.array(strip)[...,3].astype(np.float32)/255
    d=nd.maximum_filter(nd.gaussian_filter(al,.8),size=k)
    u=np.zeros(al.shape+(4,),np.uint8);u[...,0],u[...,1],u[...,2]=col;u[...,3]=np.clip(d*a*255*1.6,0,a*255)
    base=Image.fromarray(u);base.alpha_composite(strip);return base
def build(name,cells,anc,mode='own',big=BIG,out=None,outline=False):
    """cells: 8개 RGBA 배열. mode own=칸마다 기준점 맞춤, same=칸 안 위치 그대로(합친 상자로 자름)"""
    if mode=='same':
        bs=[bbox(c) for c in cells];bs=[b for b in bs if b]
        x0=min(b[0] for b in bs);y0=min(b[1] for b in bs);x1=max(b[2] for b in bs);y1=max(b[3] for b in bs)
        if anc=='c':  # 가운데 기준이면 칸 가운데를 중심으로 대칭
            H,W=cells[0].shape[:2];cx,cy=W/2,H/2;hw=max(cx-x0,x1-cx);hh=max(cy-y0,y1-cy)
            x0,x1=int(cx-hw),int(math.ceil(cx+hw));y0,y1=int(cy-hh),int(math.ceil(cy+hh))
            x0=max(0,x0);y0=max(0,y0)
        F=[c[y0:y1,x0:x1] for c in cells]
    else:
        F=[]
        for c in cells:
            b=bbox(c);F.append(None if b is None else c[b[1]:b[3],b[0]:b[2]])
    G=[f for f in F if f is not None];mw=max(f.shape[1] for f in G);mh=max(f.shape[0] for f in G)
    s=big/max(mw,mh);CW,CH=round(mw*s)+4,round(mh*s)+4
    strip=Image.new('RGBA',(CW*8,CH),(0,0,0,0))
    for i,f in enumerate(F):
        if f is None:continue
        im=Image.fromarray(np.clip(f,0,255).astype(np.uint8));im=im.resize((max(1,round(im.width*s)),max(1,round(im.height*s))),Image.LANCZOS)
        if mode=='same':px,py=2,2
        elif anc=='bc':px,py=(CW-im.width)//2,CH-2-im.height
        elif anc=='lc':px,py=2,(CH-im.height)//2
        else:px,py=(CW-im.width)//2,(CH-im.height)//2
        strip.alpha_composite(im,(i*CW+px,py))
    ax={'bc':CW/2,'lc':2,'c':CW/2}[anc];ay={'bc':CH-2,'lc':CH/2,'c':CH/2}[anc]
    if outline:strip=edge(strip)
    key='s2fx2_'+name;q8(strip).save((out or OUT)+key+'.png',optimize=True)
    print(name,strip.size)
    return dict(k=key,CW=CW,CH=CH,ax=ax,ay=ay,mw=round(mw*s),mh=round(mh*s))
meta={}
def cut(a,S):return [a[:,x0:x1] for x0,x1 in S]
# --- 얼음 효과 (이미 투명) ---
for nm,anc in [('fan2','bc'),('burst','c'),('ring3','c'),('spear','bc'),('spike2','bc')]:
    a=L(nm);a[...,3]=np.where(a[...,3]<30,0,a[...,3])
    # 충격파는 칸 간격이 고르지 않아 빈 틈 가운데로 손으로 자름 (원본 2172px 기준)
    S=[[0,211],[211,422],[422,641],[641,911],[911,1222],[1222,1568],[1568,1866],[1866,2172]] if nm=='burst' else eq8(a) if nm in('fan2','ring3') else gaps8(a)
    cells=[keep_main(c) for c in cut(a,S)]
    if nm=='ring3':cells=[round_mask(c,pad=2,soft=.08) for c in cells]  # 칸끼리 붙어 잘린 옆면을 둥글게
    meta[nm]=build(nm,cells,anc,outline=True)
# --- 검은 칸 바탕 ---
for nm,bgc in [('beam',None),('shield',None),('blast',None)]:
    a=L(nm);S=eq8(a);cells=[]
    V0=a[:,S[0][0]:S[0][1],:3].max(2);W0=V0.shape[1]
    T=np.percentile(np.concatenate([V0[:,14:40].ravel(),V0[:,W0-40:W0-14].ravel()]),98)+6
    for x0,x1 in S:
        c=a[:,x0:x1].copy();rgb=c[...,:3];V=rgb.max(2);H,W=V.shape
        # 칸 바탕 밝기: 칸 가장자리 띠의 98% 값보다 밝은 것만 남김 (색은 원본 그대로)
        al=np.clip((V-T)/60,0,1);c[...,3]=al*255;c=panel_clean(c,14)
        if nm!='beam':c=round_mask(c)
        cells.append(keep_main(c,30))
    meta[nm]=build(nm,cells,'lc' if nm=='beam' else 'c',mode='same')
# --- 예고 바닥 표시 + 빛기둥 (8칸 같은 크기 정사각) ---
def blue(c):
    c=c.copy();r,g,b=c[...,0].copy(),c[...,1].copy(),c[...,2].copy()
    c[...,0]=g;c[...,1]=np.clip(r*.82+g*.2,0,255);c[...,2]=np.clip(r+g*.1,0,255);return c
wc=dark_bg(L('warn_circle'),boost=1.25,cut=.05)
cells=[keep_main(c,30) for c in cut(wc,eq8(wc))]
meta['wcirc']=build('wcirc',cells,'c',mode='same')
meta['wcircb']=build('wcircb',[blue(c) for c in cells],'c',mode='same')
wl=white_bg(L('warn_line'))
cells=[keep_main(c,30) for c in cut(wl,eq8(wl))]
meta['wline']=build('wline',cells,'c',mode='same',big=300)
meta['wlineb']=build('wlineb',[blue(c) for c in cells],'c',mode='same',big=300)
pl=white_bg(L('pillar'),seed_top=False)
cells=[keep_main(c,30) for c in cut(pl,eq8(pl))]
meta['pillar']=build('pillar',cells,'bc',mode='same',big=260)
# 부채꼴: 꼭짓점·각도 재고 극좌표로 펴서 원하는 각도로 다시 그림
wf=white_bg(L('warn_fan'))
fcells=[keep_main(c,30) for c in cut(wf,eq8(wf))]
FV=(222,394);FA0=1.49;FR=305;RMAX=335;PADB=14
def fan_remap(c,A):
    h=A/2;W=int(2*RMAX*(math.sin(h) if h<math.pi/2 else 1))+2*PADB;H=RMAX+PADB*2
    vx,vy=W/2,H-PADB;yy,xx=np.mgrid[:H,:W].astype(np.float32);dx=xx-vx+.5;dy=vy-(yy+.5)
    th=np.arctan2(dx,dy);rho=np.hypot(dx,dy);ths=th*(FA0/A)
    sx=FV[0]+rho*np.sin(ths);sy=FV[1]-rho*np.cos(ths)
    out=np.zeros((H,W,4),np.float32)
    for k in range(4):out[...,k]=nd.map_coordinates(c[...,k],[sy,sx],order=1,mode='constant',cval=0)
    out[...,3]*=(np.abs(th)<=h+.25);return out,vx,vy
for A,tag in [(1.7,'17'),(2.2,'22'),(2.6,'26')]:
    for b in (0,1):
        F=[];
        for c in fcells:
            o,vx,vy=fan_remap(blue(c) if b else c,A);F.append(o)
        s_=160/RMAX;H,W=F[0].shape[:2];CW,CH=round(W*s_),round(H*s_)
        strip=Image.new('RGBA',(CW*8,CH),(0,0,0,0))
        for i,f in enumerate(F):strip.alpha_composite(Image.fromarray(np.clip(f,0,255).astype(np.uint8)).resize((CW,CH),Image.LANCZOS),(i*CW,0))
        nm='wfan'+tag+('b' if b else '');key='s2fx2_'+nm;q8(strip).save(OUT+key+'.png',optimize=True);print(nm,strip.size)
        meta[nm]=dict(k=key,CW=CW,CH=CH,ax=vx*s_,ay=vy*s_,R=FR*s_,A=A)
json.dump(meta,open('fx2_art.json','w'))

