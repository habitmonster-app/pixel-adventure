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
js='\n/* ===== 시즌 3: 독뿌리의 세 번째 문 (16~20장) ===== */\n(function(){\n'+''.join(open(f,encoding='utf8').read()+'\n' for f in sorted(glob.glob(os.path.join(H,'js','*.js'))))+'})();\n/* ===== 시즌 3 끝 ===== */\n'
i1=s.index('</script>\n<style id="portrait114">')
s=s[:i1]+js+s[i1:]
open(OUT,'w',encoding='utf8').write(s)
print('ok',len(s))
import subprocess;subprocess.run([sys.executable,os.path.join(H,'i18n','apply_en.py'),OUT],check=True)
