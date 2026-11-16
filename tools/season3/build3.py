#!/usr/bin/env python3
"""시즌 3 빌드: 시즌 2까지 들어간 game/index.html(base) + s3_map.json + js/*.js -> game/index.html
사용: python3 build3.py <base index.html> <s3_map.json> <out index.html>"""
import json,sys,glob,os
H=os.path.dirname(os.path.abspath(__file__))
BASE=sys.argv[1] if len(sys.argv)>1 else os.path.join(H,'base','index.html')
MAPJ=sys.argv[2] if len(sys.argv)>2 else os.path.join(H,'s3_map.json')
OUT=sys.argv[3] if len(sys.argv)>3 else os.path.join(H,'..','..','game','index.html')
s=open(BASE,encoding='utf8').read()
assert '시즌 3: 독뿌리' not in s,'base에 이미 시즌 3가 들어 있어요'
d=json.load(open(MAPJ))
L=s.split('\n')
i=next(k for k,l in enumerate(L) if l.startswith('const MAP={'))
assert L[i].endswith('};')
M=json.loads(L[i][len('const MAP='):-1])
assert M['tw']==3250 and len(M['solid'])==60,M['tw']
M['tw']=d['tw']
M['solid']=[a+b for a,b in zip(M['solid'],d['solid'])]
M['regions']+=d['regions']
M['d5']['reg'].update(d['reg'])
L[i]='const MAP='+json.dumps(M,ensure_ascii=False,separators=(',',':'))+';'
s='\n'.join(L)
def rep(a,b,n=1):
    global s
    assert s.count(a)==n,(a,s.count(a))
    s=s.replace(a,b)
rep('const LVCAP=55;','let LVCAP=55;')
rep("craftTab==='frost'?frostRec():gearRec();","craftTab==='frost'?frostRec():craftTab==='plague'?plagueRec():gearRec();")
rep("Object.keys(MAT).filter(k=>craftTab==='frost'?F2MAT.includes(k):","Object.keys(MAT).filter(k=>craftTab==='plague'?S3MAT.includes(k)||k==='herb':S3MAT.includes(k)?false:craftTab==='frost'?F2MAT.includes(k):")
rep('<div class="note">${craftTab===\'frost\'?FROSTNOTE:','<div class="note">${craftTab===\'plague\'?PLAGUENOTE:craftTab===\'frost\'?FROSTNOTE:')
rep("(r.ch>=11&&!s2RegOpen(r.ch))","(r.ch>=11&&!(r.ch>=16?s3RegOpen(r.ch):s2RegOpen(r.ch)))")
rep("const chs=WORLD.filter(r=>r.ch>=11).map(","const chs=WORLD.filter(r=>r.ch>=11&&r.ch<=15).map(")
rep("q.ch+'장 · '+CHN2[q.ch]","q.ch+'장 · '+(CHN2[q.ch]||CHN3[q.ch])")
CR3="<br>16~20장 시즌 3 「독뿌리의 세 번째 문」: 늪·독버섯 숲·물에 잠긴 성소·연구소·검은 뿌리 바닥과 지도 장식은 앞 장의 LPC 지형 타일·나무·소품(Lanea Zimmerman(Sharm) 외, CC-BY-SA 3.0)과 직접 그린 타일을 독빛으로 다시 칠해 조합(CC-BY-SA 3.0). 시즌 3 몬스터·보스·인물(마렌·엘리아·하린·우르반)은 모두 앞 장에서 이미 쓰는 그림(이 게임에서 직접 그린 그림, LPC·Universal LPC 부위 조합)을 다시 칠한 것으로, 원래 그림의 출처와 작가는 위 줄과 아래 '전체 목록' 주소를 따라요. 그림마다 어느 원본에서 왔는지는 CREDITS/CREDITS_season3.md 표에 있어요."
rep('<br>11~15장 시즌 2 「얼어붙은 맹세」',CR3+'<br>11~15장 시즌 2 「얼어붙은 맹세」',1)
# 세계 지도를 남쪽으로 넓힘 (200x120 -> 200x180): 가로 화면은 예전 크기 그대로 두고 위아래로 밀어 봄, 세로 화면은 전체가 보임
rep("function makeWorldBg(){const W=200,H=120,","function makeWorldBg(){const W=200,H=180,")
rep('<canvas id="wmc" width="200" height="120">','<canvas id="wmc" width="200" height="180">')
rep("#wmBox{flex:none;width:100%;aspect-ratio:200/120}","#wmBox{flex:none;width:100%;aspect-ratio:200/180}")
rep("#wmBox{position:relative;flex:1;min-width:0;min-height:0}","#wmBox{position:relative;flex:1;min-width:0;min-height:0;overflow:auto}")
rep("const sc=Math.min(box.width/200,box.height/120),w=200*sc,h=120*sc;c.style.width=w+'px';c.style.height=h+'px';","const sc=Math.max(2.6,Math.min(box.width/200,Math.max(box.height/180,box.height/120))),w=200*sc,h=180*sc,ov=h>box.height+1,oh=w>box.width+1;c.style.width=w+'px';c.style.height=h+'px';c.style.top=ov?'0':'50%';c.style.left=oh?'0':'50%';c.style.transform='translate('+(oh?'0':'-50%')+','+(ov?'0':'-50%')+')';")
rep("lb.style.top=(box.height-h)/2+'px';","lb.style.top=Math.max(0,(box.height-h)/2)+'px';")
rep("lb.style.left=(box.width-w)/2+'px';","lb.style.left=Math.max(0,(box.width-w)/2)+'px';")
rep("style=\"left:${r.wm[0]/2}%;top:${r.wm[1]/1.2}%\">","style=\"left:${r.wm[0]/2}%;top:${r.wm[1]/1.8}%\">")
rep(" lb.querySelectorAll('.wm-r').forEach(b=>b.onclick=()=>{WM.sel=+b.dataset.i;drawWorld();});\n drawWorldDet(here,next,qt);}"," lb.querySelectorAll('.wm-r').forEach(b=>b.onclick=()=>{WM.sel=+b.dataset.i;drawWorld();});\n {const bx=$('wmBox'),x=WORLD[WM.sel].wm[0]/200*w,y=WORLD[WM.sel].wm[1]/180*h;if(ov&&(y<bx.scrollTop+30||y>bx.scrollTop+box.height-30))bx.scrollTop=y-box.height/2;if(oh&&(x<bx.scrollLeft+50||x>bx.scrollLeft+box.width-50))bx.scrollLeft=x-box.width/2;}\n drawWorldDet(here,next,qt);}")
js='\n/* ===== 시즌 3: 독뿌리의 세 번째 문 (16~20장) ===== */\n(function(){\n'+''.join(open(f,encoding='utf8').read()+'\n' for f in sorted(glob.glob(os.path.join(H,'js','*.js'))))+'})();\n/* ===== 시즌 3 끝 ===== */\n'
i1=s.index('</script>\n<style id="portrait114">')
s=s[:i1]+js+s[i1:]
open(OUT,'w',encoding='utf8').write(s)
print('ok',len(s))
import subprocess;subprocess.run([sys.executable,os.path.join(H,'i18n','apply_en.py'),OUT],check=True)
