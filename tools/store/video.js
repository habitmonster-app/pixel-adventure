// 홍보 영상 녹화: node video.js play|ios|ipad  → vid/<kind>.webm + vid/<kind>_cuts.json
const {chromium}=require('playwright');const L=require('/home/user/work/tests55/lib.js');const fs=require('fs');
const VP={play:{width:1920,height:1080},ios:{width:1920,height:886},ipad:{width:1600,height:1200}};
const kind=process.argv[2]||'play';const vp=VP[kind];
(async()=>{const b=await chromium.launch();fs.mkdirSync('vid/'+kind,{recursive:true});
const ctx=await b.newContext({viewport:vp,recordVideo:{dir:'vid/'+kind,size:vp}});const p=await ctx.newPage();const T0=Date.now();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const cuts=[];const mark=(n)=>{cuts.push([n,(Date.now()-T0)/1000]);};
await p.addInitScript(()=>{window.Capacitor={isNativePlatform:()=>true,Plugins:{}};try{localStorage.setItem('pxclassic2_opt',JSON.stringify({chatFold:1}))}catch(e){}});
await p.goto('http://localhost:8791/index.html');await p.waitForTimeout(1200);
const W=ms=>p.waitForTimeout(ms);
const clr=async()=>{for(let i=0;i<60;i++){if(!await p.evaluate(()=>!!talk))break;await p.evaluate(()=>nextLine());await W(60);}};
// 자막 얹기 (게임 위 글자, Black Han Sans)
await p.evaluate(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@700&display=swap';document.head.appendChild(l);
 const d=document.createElement('div');d.id='cap9';d.style.cssText='position:fixed;left:0;right:0;top:0;padding:5vh 0 7vh;z-index:99999;text-align:center;pointer-events:none;transition:opacity .25s;opacity:0;background:linear-gradient(rgba(8,3,10,.82),rgba(8,3,10,.6) 65%,rgba(8,3,10,0))';
 d.innerHTML='<div id="cap9a" style="display:inline-block;font:400 6.2vh \'Black Han Sans\';color:#fff1c8;text-shadow:0 .4vh 0 #4a1408,0 0 2vh rgba(0,0,0,.9),0 0 4vh rgba(255,90,40,.55);letter-spacing:.2vh"></div><div id="cap9b" style="font:700 2.8vh \'Noto Sans KR\';color:#ffd9c4;text-shadow:0 0 1vh #000,0 .2vh .3vh #000;margin-top:.6vh"></div>';
 document.body.appendChild(d);
 const c=document.createElement('div');c.id='card9';c.style.cssText='position:fixed;inset:0;z-index:99998;display:none;flex-direction:column;align-items:center;justify-content:center;gap:2vh;background:radial-gradient(ellipse at 50% 60%,rgba(122,20,38,.82),rgba(13,3,16,.94));pointer-events:none';
 document.body.appendChild(c);
 window.CAP=(a,b2)=>{const e=document.getElementById('cap9');if(!a){e.style.opacity=0;return;}document.getElementById('cap9a').textContent=a;document.getElementById('cap9b').textContent=b2||'';e.style.opacity=1;};
 window.CARD=(html)=>{const e=document.getElementById('card9');if(!html){e.style.display='none';return;}e.innerHTML=html;e.style.display='flex';};});
const gear=`c.eq=Object.assign({},c.eq,{armor:'torso_armour_plate',cape:'capeR',shield:'shield_crusader',weapon:'w_glowsword',head:'hat_helmet_maximus',arm:'arms_armour',shoulder:'shoulders_pauldrons',legs:'legs_armour',feet:'feet_armour'});for(const k in c.eq)c.bag[c.eq[k]]=1;c.gold=48210;c.tut101={off:1,d:{}};c.att125={n:3,last:(()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})()};`;
await p.evaluate(([s,g])=>{const cc=eval(s+';'+g+';c');DB.slots=[cc,newChar('rogue',{hs:5,hc:4,sk:2,bd:1},'바람'),newChar('mage',{hs:7,hc:6,sk:1,bd:1},'별빛')];DB.slots[1].lv=38;DB.slots[2].lv=41;DB.cur=0;saveDB();openSelect();},[L.save9.replace("process.env.CLS||'warrior'","'warrior'"),gear]);
await W(1500);
const logo=`<div style="font:400 11vh 'Black Han Sans';color:#fff1c8;text-shadow:0 .8vh 0 #4a1408,0 0 5vh rgba(255,90,40,.6)">봉인 기사단</div><div style="font:400 5vh 'Black Han Sans';color:#f0b9a0;letter-spacing:1vh">마계문 전쟁</div>`;
// 1) 제목
await p.evaluate(h=>CARD(h),logo);mark('title');await W(2600);mark('title_end');await p.evaluate(()=>CARD(null));
// 2) 캐릭터 만들기
await p.evaluate(()=>CAP('나만의 기사를 만들어요','전사 · 도적 · 마법사, 외모도 마음대로'));mark('sel');await W(2800);mark('sel_end');
await p.evaluate(()=>CAP(null));
await p.click('#go');await W(3000);await clr();
await p.evaluate(()=>{for(const b of SKT[P.cls])for(const x of b.s)P.sk[x.id]=x.max;for(let i=0;i<P.qs.length;i++)P.qs[i]=null;for(const b of SKT[P.cls])for(const x of b.s)if(x.t!=='pas'&&!P.qs.includes(x.id)){const e=P.qs.indexOf(null);if(e>=0)P.qs[e]=x.id;}P.hp=stats().hp;buildHero();refreshSide();try{drawQ()}catch(e){}});
await p.evaluate(()=>{setInterval(()=>{try{if(P){P.hp=stats().hp;P.mp=stats().mp;}}catch(e){}},150);});
const tp=async id=>{await p.evaluate(id=>{const A=R5(id);const e=A.entry||A.west;const ex=Array.isArray(e)?e[0]:e.x,ey=Array.isArray(e)?e[1]:e.y;hero.x=(ex+6)*32;hero.y=ey*32;},id);await W(3000);await clr();};
// 3) 사냥
await tp('D92');await p.evaluate(()=>{try{const L=mobs.filter(m=>m.hp>0);let best=null,bn=-1;for(const a of L){const n=L.filter(b=>Math.hypot(a.x-b.x,a.y-b.y)<260).length;if(n>bn){bn=n;best=a;}}if(best){hero.x=best.x+70;hero.y=best.y+10;}}catch(e){}try{ZOOM0=zi();setZoom(zi()-1);}catch(e){}setHunt(true);});await W(2500);await clr();
await p.evaluate(()=>CAP('자동사냥으로 편하게 성장','바쁠 땐 AUTO 한 번이면 충분해요'));mark('hunt');
for(let i=0;i<10;i++){await W(500);await clr();}
mark('hunt_end');await p.evaluate(()=>CAP('화려한 스킬 액션','직업마다 36개의 스킬'));mark('skill');
for(let i=0;i<9;i++){await p.evaluate(i=>{try{if(P.cd)for(const k in P.cd)P.cd[k]=0;}catch(e){}try{useQ(i%6)}catch(e){}},i);await W(500);await clr();}
mark('skill_end');await p.evaluate(()=>{CAP(null);setHunt(false);try{setZoom(ZOOM0)}catch(e){}});
// 4) 강화
await p.evaluate(()=>{P.scroll=24;P.enh=P.enh||{};P.enh[P.eq.weapon]=7;openEnh();CAP('장비 강화 +10','희귀 · 영웅 · 전설 장비를 직접 만들어요');});await W(600);mark('enh');
await W(1200);await p.evaluate(()=>{try{doEnhance(P.eq.weapon)}catch(e){}});await W(1600);mark('enh_end');
await p.keyboard.press('Escape');await p.evaluate(()=>{try{closeAll()}catch(e){};CAP(null);});await W(300);
// 5) 지도
await p.evaluate(()=>{try{$('mMap').click()}catch(e){};CAP('10장 이야기, 넓은 세계','마을에서 마계문까지 이어진 오픈월드');});await W(500);mark('map');await W(2600);mark('map_end');
await p.keyboard.press('Escape');await p.evaluate(()=>{try{closeAll()}catch(e){};CAP(null);});
// 6) 보스
await p.evaluate(()=>{const f=f10();Object.assign(f,{s1:1,s2:1,s3:1,seal:1,boss:1,post:1,ack:1,rw1:1});P.ch10=1;P.s1={lv:P.lv,cls:P.cls};save();});
await tp('D103');
await p.evaluate(()=>{try{fix10N()}catch(e){}const n=SP5.find(n=>n.si==='mem10');if(n){hero.x=n.x+40;hero.y=n.y+10;}});await W(1500);
await p.evaluate(()=>memory10());await W(1200);await clr();await W(2500);await clr();
await p.evaluate(k=>{if(k==='ipad'){try{setZoom(zi()+1)}catch(e){}}setHunt(true);},kind);await W(600);
await p.evaluate(()=>CAP('마계 사도와의 결전','열린 마계문을 봉인하라'));mark('boss');
for(let i=0;i<9;i++){await W(500);await clr();await p.evaluate(()=>{for(const el of document.querySelectorAll('div,button')){if(el.offsetParent&&/눌러서 다음/.test(el.textContent)&&el.textContent.length<300)el.click();}if(BS10.e&&BS10.e.hp<BS10.e.m.hp*.6)BS10.e.hp=BS10.e.m.hp*.75;});}
mark('boss_end');
// 7) 끝
await p.evaluate(()=>CAP(null));await W(300);await p.evaluate(h=>{CARD(h+`<div style="margin-top:3vh;font:700 3.4vh 'Noto Sans KR';color:#ffe6c8">지금 마계문을 봉인하러 떠나세요</div>`);},logo);mark('end');await W(3000);mark('end_end');
const vpath=await p.video().path();await ctx.close();await b.close();
fs.writeFileSync(`vid/${kind}_cuts.json`,JSON.stringify({video:vpath,cuts,errs}));console.log(vpath,JSON.stringify(cuts),errs.slice(0,3));})();
