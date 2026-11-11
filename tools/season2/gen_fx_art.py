"""지피티 효과 그림(한 줄 8칸) → s2fx_<이름>.png 띠 (8칸) + fx_art.json
기준점: bc=아래 가운데(부채꼴 꼭짓점·솟는 가시), c=가운데(폭발·고리), lc=왼쪽 가운데(창 찌르기)"""
import json,sys
import numpy as np
from PIL import Image
sys.path.insert(0,'/home/user/s2')
from gen_boss_art import segs
SRC='/home/user/s2/art_src/fx/'
OUT=sys.argv[1] if len(sys.argv)>1 else '/home/user/pixel-adventure/game/m/'
FX={'fan':'bc','line':'lc','nova':'c','spike':'bc','ring':'c'}
BIG=200
def load(nm):
    a=np.array(Image.open(SRC+nm+'.png').convert('RGBA')).astype(np.int16)
    r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
    if nm=='ring':  # 흰·회색 바탕 지우기: 파란빛이 뚜렷한 곳만 남김
        keep=(b-r>35)&(al>90)
        al=np.where(keep,255,0)
    al=np.where(al<(200 if nm=='spike' else 60),0,al)
    a[...,3]=al
    return a.astype(np.uint8)
def dpcut(a,MIN=110):
    # 진한 부분이 가장 적은 세로줄 7개를 골라 8칸으로 나눔 (칸 폭은 MIN 이상)
    pr=(a[...,3]>=200).sum(0).astype(float);w=len(pr)
    pr=np.convolve(pr,np.ones(9)/9,'same')
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
    cuts=sorted(cuts);b=[0]+cuts+[w]
    return [[b[i],b[i+1]] for i in range(8)]
# 고리 그림은 칸끼리 붙어 있어서 손으로 잰 경계 (원본 2172px 기준)
_b=[0]+[round(x*1.086) for x in (250,485,710,945,1185,1440,1710)]+[2172]
RINGCUT=[[_b[i],_b[i+1]] for i in range(8)]
meta={}
for nm,anc in FX.items():
    a=load(nm);F=[]
    w=a.shape[1];S=segs(a) if nm in('fan','line') else RINGCUT if nm=='ring' else dpcut(a)
    for x0,x1 in S:
        c=a[:,x0:x1];m=c[...,3]>0
        ys=np.where(m.any(1))[0];xs=np.where(m.any(0))[0]
        F.append(None if len(ys)==0 else c[ys[0]:ys[-1]+1,xs[0]:xs[-1]+1])
    mw=max(f.shape[1] for f in F if f is not None);mh=max(f.shape[0] for f in F if f is not None)
    s=BIG/max(mw,mh);CW,CH=round(mw*s)+4,round(mh*s)+4
    strip=Image.new('RGBA',(CW*8,CH),(0,0,0,0))
    for i,f in enumerate(F):
        if f is None:continue
        im=Image.fromarray(f);im=im.resize((max(1,round(im.width*s)),max(1,round(im.height*s))),Image.LANCZOS)
        if anc=='bc':px,py=(CW-im.width)//2,CH-2-im.height
        elif anc=='lc':px,py=2,(CH-im.height)//2
        else:px,py=(CW-im.width)//2,(CH-im.height)//2
        strip.alpha_composite(im,(i*CW+px,py))
    ax={'bc':CW/2,'lc':2,'c':CW/2}[anc];ay={'bc':CH-2,'lc':CH/2,'c':CH/2}[anc]
    key='s2fx_'+nm;strip.save(OUT+key+'.png',optimize=True)
    meta[nm]=dict(k=key,CW=CW,CH=CH,ax=ax,ay=ay,mw=round(mw*s),mh=round(mh*s))
    print(nm,strip.size)
json.dump(meta,open('/home/user/s2/fx_art.json','w'))
