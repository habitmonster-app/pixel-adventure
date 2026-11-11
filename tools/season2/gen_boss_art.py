"""지피티 보스·정예 그림(한 줄 8칸) → 게임 시트 s2b_<id>.png
줄: 0 위 · 1 왼쪽 · 2 아래 · 3 오른쪽(없으면 왼쪽 뒤집기) · 4~ 공격(정면)
칸 W×H, 발끝 기준선 H-BL. 걷기 키를 HW 픽셀로 맞춤."""
import json,sys
import numpy as np
from PIL import Image
SRC='/home/user/s2/art_src/'
OUT=sys.argv[1] if len(sys.argv)>1 else '/home/user/pixel-adventure/game/m/'
W,H,BL,HW=256,200,8,150
SETS={'s2horn':['horn',['a']],'s2brak':['brak',['a']],'s2arbos':['arbos',['a']],'s2leorn':['leorn',['a']],
      'serka':['serka',['a1','a2','a3']],'s2shadow':['shadow',[]]}
def load(p):
    a=np.array(Image.open(p).convert('RGBA'))
    a[...,3]=np.where(a[...,3]>=200,255,0).astype(np.uint8)
    return a
def segs(a):
    """8칸 찾기: 세로 줄의 빈 틈으로 나누고, 안 되면 똑같이 8등분"""
    w=a.shape[1];col=(a[...,3]>0).sum(0)
    on=col>2;S=[];i=0
    while i<w:
        if on[i]:
            j=i
            while j<w and on[j]:j+=1
            S.append([i,j]);i=j
        else:i+=1
    # 작은 조각 합치기
    S=[s for s in S if s[1]-s[0]>6]
    while len(S)>8:
        g=[S[k+1][0]-S[k][1] for k in range(len(S)-1)];k=int(np.argmin(g));S[k]=[S[k][0],S[k+1][1]];del S[k+1]
    if len(S)!=8:
        S=[[round(w*k/8),round(w*(k+1)/8)] for k in range(8)]
    return S
def frames(a):
    out=[]
    for x0,x1 in segs(a):
        c=a[:,x0:x1];ys=np.where((c[...,3]>0).any(1))[0];xs=np.where((c[...,3]>0).any(0))[0]
        if len(ys)==0:out.append(None);continue
        out.append(dict(img=c,cx=(x1-x0)/2,y0=ys[0],y1=ys[-1]+1,x0=xs[0],x1=xs[-1]+1))
    return out
meta={}
for mid,(nm,atks) in SETS.items():
    rows={}
    for d in ['u','l','d']:rows[d]=frames(load(SRC+nm+'_'+d+'.png'))
    try:rows['r']=frames(load(SRC+nm+'_r.png'))
    except FileNotFoundError:rows['r']=None
    A=[frames(load(SRC+nm+'_'+k+'.png')) for k in atks]
    hmax=max(f['y1']-f['y0'] for d in 'uld' for f in rows[d] if f)
    s=HW/hmax
    nrow=4+len(A);sheet=Image.new('RGBA',(W*8,H*nrow),(0,0,0,0))
    def put(fr,row,flip=False):
        feet=float(np.median([f['y1'] for f in fr if f]))
        for i,f in enumerate(fr):
            if not f:continue
            im=Image.fromarray(f['img'])
            if flip:im=im.transpose(Image.FLIP_LEFT_RIGHT)
            nw,nh=max(1,round(im.width*s)),max(1,round(im.height*s))
            im=im.resize((nw,nh),Image.LANCZOS)
            a=np.array(im);a[...,3]=np.where(a[...,3]>=128,255,0).astype(np.uint8);im=Image.fromarray(a)
            px=round(W/2-f['cx']*s)+i*W;py=round(H-BL-feet*s)+row*H
            cell=Image.new('RGBA',(W*8,H*nrow),(0,0,0,0));cell.paste(im,(px,py))
            # 다른 칸으로 넘치지 않게 자르기
            box=(i*W,row*H,(i+1)*W,(row+1)*H);sheet.alpha_composite(cell.crop(box),(i*W,row*H))
    put(rows['u'],0);put(rows['l'],1);put(rows['d'],2)
    if rows['r']:put(rows['r'],3)
    else:put(rows['l'][::1],3,flip=True)
    for k,fr in enumerate(A):put(fr,4+k)
    key='s2b_'+mid.replace('s2','')
    sheet.quantize(256,method=Image.Quantize.FASTOCTREE).save(OUT+key+'.png',optimize=True)
    meta[mid]=dict(k=key,W=W,H=H,bl=BL,hw=HW,na=len(A))
    print(mid,key,'scale %.3f'%s,sheet.size)
json.dump(meta,open('/home/user/s2/boss_art.json','w'))
