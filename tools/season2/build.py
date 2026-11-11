#!/usr/bin/env python3
"""시즌 2 빌드: base/index.html(v135 출시판) + s2_map.json + s2.js -> game/index.html"""
import json,re,sys
OUT=sys.argv[1] if len(sys.argv)>1 else '/home/user/pixel-adventure/game/index.html'
s=open('base/index.html',encoding='utf8').read()
d=json.load(open('s2_map.json'))
L=s.split('\n')
assert L[689].startswith('const MAP={') and L[689].endswith('};')
M=json.loads(L[689][len('const MAP='):-1])
assert M['tw']==2730 and len(M['solid'])==60
M['tw']=d['tw']
M['solid']=[a+b for a,b in zip(M['solid'],d['solid'])]
M['regions']+=d['regions']
M['d5']['reg'].update(d['reg'])
L[689]='const MAP='+json.dumps(M,ensure_ascii=False,separators=(',',':'))+';'
s='\n'.join(L)
def rep(a,b,n=1):
    global s
    assert s.count(a)==n,(a,s.count(a))
    s=s.replace(a,b)
rep('const LVCAP=50;','const LVCAP=55;')
rep("if(!P.capMsg){P.capMsg=1;toast('최고 레벨 50에 닿았어요!","if(P.capMsg!==LVCAP){P.capMsg=LVCAP;toast('최고 레벨 '+LVCAP+'에 닿았어요!")
rep('const needExp=lv=>Math.round(20*Math.pow(lv,1.6));','const needExp=lv=>Math.round(20*Math.pow(lv,1.6)*(lv>=50?4:1));')
rep("craftTab==='vault'?vaultRec():gearRec();","craftTab==='vault'?vaultRec():craftTab==='frost'?frostRec():gearRec();")
rep("Object.keys(MAT).filter(k=>craftTab==='gate'?","Object.keys(MAT).filter(k=>craftTab==='frost'?F2MAT.includes(k):F2ONLY.includes(k)?false:craftTab==='gate'?")
rep('<div class="note">${craftTab===\'d1\'?','<div class="note">${craftTab===\'frost\'?FROSTNOTE:craftTab===\'d1\'?')
rep("const chs=WORLD.map(r=>{const st=chSt135(r);","const chs=WORLD.filter(r=>r.ch<=10).map(r=>{const st=chSt135(r);")
rep("<small>${q.ch===10?","<small>${q.ch>=11?q.ch+'장 · '+CHN2[q.ch]:q.ch===10?")
rep("const regionIx=(x,y)=>{const z=zoneAt(x,y);return x>=2380*TS?9:","const regionIx=(x,y)=>{const z=zoneAt(x,y);return x>=2730*TS?s2Ix(x):x>=2380*TS?9:")
rep("(r.ch===10&&!gateOpen10())?'lock':'open';","(r.ch===10&&!gateOpen10())||(r.ch>=11&&!s2RegOpen(r.ch))?'lock':'open';")
rep("for(let i=0;i<WORLD.length-1;i++){const [a,b]=[WORLD[i].wm,WORLD[i+1].wm],L=","for(const [a,b] of WROAD2()){const L=")
js='\n/* ===== 시즌 2: 얼어붙은 맹세 (11~15장) ===== */\nconst S2ICE='+json.dumps(d['ice'])+';\n'+open('s2.js',encoding='utf8').read()+'\n'
# 메인 스크립트 끝(</script>) 찾기: 690줄 이후 첫 </script>가 아니라 메인 블록의 끝
i1=s.index('</script>\n<style id="portrait114">')
s=s[:i1]+js+s[i1:]
open(OUT,'w',encoding='utf8').write(s)
print('ok',len(s))
