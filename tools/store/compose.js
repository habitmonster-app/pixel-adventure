const {chromium}=require('playwright');const fs=require('fs');const {execSync}=require('child_process');
const SZ={play:[1920,1080],ios:[2796,1290],ipad:[2732,2048]};
function pick(kind,pref){// 가장 화려한(채도 높은) 장면 고르기
 const fsx=fs.readdirSync('raw').filter(f=>f.startsWith(kind+'_'+pref));if(fsx.length<2)return fsx[0];
 const out=execSync(`python3 -c "
from PIL import Image
import sys
mode=sys.argv[1]
for f in sys.argv[2:]:
  im=Image.open('raw/'+f).convert('RGB').resize((320,180));px=im.load();n=0
  for y in range(18,150):
    for x in range(40,250):
      r,g,b=px[x,y]
      if mode=='boss':n+= r>140 and g<70 and b<90
      else:n+= (r>220 and g>150 and b<120) or (r>200 and b>200 and g<150)
  print(f,n)
" ${pref.startsWith('4')?'boss':'fx'} ${fsx.join(' ')}`).toString().trim().split('\n').map(l=>l.split(' ')).sort((a,b)=>b[1]-a[1]);return out[0][0];}
const S=[['0town','살아 숨 쉬는 도트 마을','마을 사람들과 이야기하고 퀘스트를 받아요'],['1sel','나만의 기사를 만들어요','전사 · 도적 · 마법사, 외모도 마음대로'],['2hunt','자동사냥으로 편하게 성장','바쁠 땐 AUTO 한 번이면 충분해요'],['9mage','화려한 스킬 액션','직업마다 36개의 스킬'],['4boss','마계 사도와의 결전','열린 마계문을 봉인하라'],['5inv','장비 강화 +10','희귀 · 영웅 · 전설 장비를 직접 만들어요'],['7skill','나만의 스킬 트리','검술 · 수호 · 투지, 원하는 길로'],['8map','10장 이야기, 넓은 세계','마을에서 마계문까지 이어진 오픈월드']];
(async()=>{const b=await chromium.launch();fs.mkdirSync('out',{recursive:true});
for(const kind of ['play','ios','ipad']){const [w,h]=SZ[kind];const p=await b.newPage({viewport:{width:w,height:h}});
 for(let i=0;i<S.length;i++){const [pref,t1,t2]=S[i];let f=pick(kind,pref);if(kind==='ipad'&&pref==='4boss')f='ipadboss_fit.png';if(!f){console.log('miss',kind,pref);continue;}
  const img='data:image/png;base64,'+fs.readFileSync('raw/'+f).toString('base64');
  const cap=Math.round(h*(kind==='ipad'?.17:.2));const iw=Math.round((h-cap-h*.05)*w/h);
  await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@700&display=swap" rel="stylesheet"><style>
  body{margin:0;width:${w}px;height:${h}px;overflow:hidden;background:radial-gradient(ellipse at 50% 120%,#7a1426 0%,#2a0712 45%,#0d0310 100%);font-family:'Black Han Sans'}
  .t{position:absolute;top:0;left:0;right:0;height:${cap}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${h*.006}px}
  h1{margin:0;font-weight:400;font-size:${cap*.42}px;color:#fff1c8;text-shadow:0 ${cap*.03}px 0 #4a1408,0 0 ${cap*.15}px rgba(255,120,60,.45);letter-spacing:2px}
  p{margin:0;font:700 ${cap*.17}px 'Noto Sans KR';color:#f0b9a0}
  img{position:absolute;left:${(w-iw)/2}px;top:${cap}px;width:${iw}px;border-radius:${h*.025}px;border:${Math.max(3,h*.004)}px solid #e9b765;box-shadow:0 0 ${h*.04}px rgba(255,90,60,.5)}
  </style></head><body><div class="t"><h1>${t1}</h1><p>${t2}</p></div><img src="${img}"></body></html>`);
  await p.waitForTimeout(kind==='play'&&i==0?2500:700);
  await p.screenshot({path:`out/${kind}_${i+1}.png`});console.log(kind,i+1,f);}
 await p.close();}
await b.close();})();
