# 시험판 artifact용 묶음: 지역 파일 80개를 m/rall.js 하나로 (파일 511개 한도)
# 쓰는 법: python3 stage_artifact.py <출력 폴더>  (앱에는 안 들어가는 시험판 전용 묶음)
# + 왼쪽 아래 '🧪 15장 끝낸 캐릭터로 시작' 버튼(test/save_s2done.json)
import os,shutil,json,glob,re,sys
H=os.path.dirname(os.path.abspath(__file__))
SRC=os.path.join(H,'..','..','game');DST=sys.argv[1]
shutil.rmtree(DST,ignore_errors=True);shutil.copytree(SRC,DST)
R={}
for f in glob.glob(DST+'/m/r_*.json'):
    R[os.path.basename(f)[2:-5]]=open(f,encoding='utf8').read();os.remove(f)
for f in glob.glob(DST+'/m/r_*.js'):os.remove(f)
open(DST+'/m/rall.js','w',encoding='utf8').write('window.RALL='+json.dumps(R,ensure_ascii=False,separators=(',',':'))+';')
p=DST+'/index.html';s=open(p,encoding='utf8').read()
a="function rgFetch(id){if(RGN.cache[id])return Promise.resolve(RGN.cache[id]);"
assert s.count(a)==1
s=s.replace(a,a+"if(window.RALL&&RALL[id])return Promise.resolve(RGN.cache[id]=JSON.parse(RALL[id]));")
i=s.index('<script');s=s[:i]+'<script src="m/rall.js"></script>\n'+s[i:]
SV=open(os.path.join(H,'test','save_s2done.json'),encoding='utf8').read()
s=s.replace('<script src="m/rall.js"></script>\n','<script src="m/rall.js"></script>\n<script>var SAVE15='+json.dumps(SV)+';try{if(sessionStorage.getItem("ld15")){sessionStorage.removeItem("ld15");localStorage.setItem("pxclassic2",SAVE15);}}catch(e){}</script>\n',1)
s=s.rstrip('\n')+'''
<script>window.addEventListener('load',function(){var b=document.createElement('button');b.textContent=(window.LANG==='en'?'🧪 Test: start with a Ch.15-cleared hero':'🧪 시험: 15장 끝낸 캐릭터로 시작');
b.style.cssText='position:fixed;left:6px;bottom:6px;z-index:99999;font-size:11px;padding:4px 8px;opacity:.85;border-radius:6px;background:#2a3a2a;color:#cfe;border:1px solid #6a8';
b.onclick=function(){try{sessionStorage.setItem('ld15','1');}catch(e){}location.reload();};
var t=setInterval(function(){try{if(window.P&&P.q&&P.q.i>=88){b.remove();clearInterval(t);}}catch(e){}},2000);
document.body.appendChild(b);});</script>
'''
open(p,'w',encoding='utf8').write(s)
n=sum(len(fs) for _,_,fs in os.walk(DST));print('files',n,len(R))
