// 심사용 게임플레이 영상 (광고 전용 v133): node review_video.js  → vid/review/*.webm + vid/review_cuts.json
const {chromium}=require('playwright');const L=require('/home/user/work/tests55/lib.js');const fs=require('fs');
const vp={width:1280,height:720};const PORT=process.env.PORT||8792;
(async()=>{const b=await chromium.launch();fs.mkdirSync('vid/review',{recursive:true});
const ctx=await b.newContext({viewport:vp,recordVideo:{dir:'vid/review',size:vp},locale:'ko-KR'});const p=await ctx.newPage();const T0=Date.now();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const cuts=[];const mark=n=>cuts.push([n,(Date.now()-T0)/1000]);
await p.addInitScript(()=>{const Lis={};
 // 광고는 실제 앱에서 구글 AdMob 보상형 광고가 나와요. 영상에선 자리만 보여줘요.
 const showAd=()=>{const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:999999;background:#111;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font:700 4vh sans-serif;gap:2vh';
  d.innerHTML='<div>📺 Rewarded ad (Google AdMob)</div><div style="font-size:2.6vh;color:#bbb">보상형 광고 재생 중 · 사용자가 원할 때만</div>';document.body.appendChild(d);
  setTimeout(()=>{d.remove();(Lis.onRewardedVideoAdReward||[]).forEach(f=>f({}));(Lis.onRewardedVideoAdDismissed||[]).forEach(f=>f());},2500);};
 window.Capacitor={isNativePlatform:()=>true,getPlatform:()=>'ios',Plugins:{AdMob:{initialize:async()=>{},prepareRewardVideoAd:async()=>({}),
  addListener:async(nm,f)=>{(Lis[nm]=Lis[nm]||[]).push(f);return {remove(){Lis[nm]=Lis[nm].filter(x=>x!==f);}};},showRewardVideoAd:async()=>{showAd();return {};}}}};
 try{localStorage.setItem('pxclassic2_opt',JSON.stringify({chatFold:1}))}catch(e){}});
await p.goto(`http://localhost:${PORT}/index.html?lang=ko`);await p.waitForTimeout(1500);
const W=ms=>p.waitForTimeout(ms);
const clr=async()=>{for(let i=0;i<60;i++){if(!await p.evaluate(()=>typeof talk!=='undefined'&&!!talk))break;await p.evaluate(()=>nextLine());await W(60);}};
await p.evaluate(()=>{const d=document.createElement('div');d.id='cap9';d.style.cssText='position:fixed;left:2vh;bottom:2vh;z-index:99999;pointer-events:none;padding:1vh 2vh;border-radius:1vh;background:rgba(0,0,0,.62);color:#fff;font:700 2.6vh sans-serif;opacity:0;transition:opacity .2s';document.body.appendChild(d);
 window.CAP=(a,b)=>{const e=document.getElementById('cap9');if(!a){e.style.opacity=0;return;}e.innerHTML=a+(b?'<div style="font-size:2vh;color:#ccc;font-weight:400">'+b+'</div>':'');e.style.opacity=1;};});
const gear=`c.eq=Object.assign({},c.eq,{armor:'torso_armour_plate',cape:'capeR',shield:'shield_crusader',weapon:'w_glowsword',head:'hat_helmet_maximus',arm:'arms_armour',shoulder:'shoulders_pauldrons',legs:'legs_armour',feet:'feet_armour'});for(const k in c.eq)c.bag[c.eq[k]]=1;c.gold=48210;c.tut101={off:1,d:{}};c.att125={n:3,d:(typeof today86!=='undefined'?today86():'')};`;
await p.evaluate(([s,g])=>{const cc=eval(s+';'+g+';c');DB.slots=[cc,newChar('rogue',{hs:5,hc:4,sk:2,bd:1},'바람'),newChar('mage',{hs:7,hc:6,sk:1,bd:1},'별빛')];DB.slots[1].lv=38;DB.slots[2].lv=41;DB.cur=0;DB.dia107=0;saveDB();openSelect();},[L.save9.replace("process.env.CLS||'warrior'","'warrior'"),gear]);
await W(800);
// 1 캐릭터 선택
await p.evaluate(()=>CAP('1. 캐릭터 선택 / Character select','로그인 없음 · No login'));mark('sel');await W(3500);
await p.click('#go');await W(3000);await clr();await p.evaluate(()=>{document.querySelectorAll('[id^=att]').forEach(e=>e.remove());try{closeAll()}catch(e){}});await p.keyboard.press('Escape');
// 2 이동
await p.evaluate(()=>CAP('2. 직접 조작 / Move','가상 패드 · 키보드'));mark('move');
for(const k of ['ArrowRight','ArrowDown','ArrowLeft','ArrowUp']){await p.keyboard.down(k);await W(900);await p.keyboard.up(k);}
await clr();
// 3 사냥
await p.evaluate(()=>{for(const b of SKT[P.cls])for(const x of b.s)P.sk[x.id]=x.max;for(let i=0;i<P.qs.length;i++)P.qs[i]=null;for(const b of SKT[P.cls])for(const x of b.s)if(x.t!=='pas'&&!P.qs.includes(x.id)){const e=P.qs.indexOf(null);if(e>=0)P.qs[e]=x.id;}P.hp=stats().hp;buildHero();refreshSide();try{drawQ()}catch(e){}});
await p.evaluate(()=>{setInterval(()=>{try{if(P){P.hp=stats().hp;P.mp=stats().mp;}}catch(e){}},150);});
await p.evaluate(id=>{const A=R5(id);const e=A.entry||A.west;const ex=Array.isArray(e)?e[0]:e.x,ey=Array.isArray(e)?e[1]:e.y;hero.x=(ex+6)*32;hero.y=ey*32;},'D92');await W(2500);await clr();
await p.evaluate(()=>{try{const L=mobs.filter(m=>m.hp>0);let best=null,bn=-1;for(const a of L){const n=L.filter(b=>Math.hypot(a.x-b.x,a.y-b.y)<260).length;if(n>bn){bn=n;best=a;}}if(best){hero.x=best.x+70;hero.y=best.y+10;}}catch(e){}setHunt(true);CAP('3. 자동사냥 · 스킬 / Auto hunt & skills');});mark('hunt');
for(let i=0;i<14;i++){await p.evaluate(i=>{try{if(P.cd)for(const k in P.cd)P.cd[k]=0;}catch(e){}if(i%2)try{useQ((i>>1)%6)}catch(e){}},i);await W(550);await clr();}
await p.evaluate(()=>{setHunt(false);CAP(null);});
// 4 가방·캐릭터
await p.evaluate(()=>{try{$('mBag').click()}catch(e){}CAP('4. 가방 · 장비 / Inventory');});mark('bag');await W(2500);
await p.keyboard.press('Escape');await p.evaluate(()=>{try{closeAll()}catch(e){}});
// 5 강화
await p.evaluate(()=>{P.scroll=24;P.enh=P.enh||{};P.enh[P.eq.weapon]=7;openEnh();CAP('5. 강화 / Enhance');});mark('enh');await W(1200);
await p.evaluate(()=>{try{doEnhance(P.eq.weapon)}catch(e){}});await W(1800);
await p.keyboard.press('Escape');await p.evaluate(()=>{try{closeAll()}catch(e){}});
// 6 지도
await p.evaluate(()=>{try{$('mMap').click()}catch(e){}CAP('6. 지도 / World map');});mark('map');await W(2500);
await p.keyboard.press('Escape');await p.evaluate(()=>{try{closeAll()}catch(e){}});
// 7 다이아 받기 (광고)
await p.evaluate(()=>{openDia107('buy');CAP('7. 다이아 받기 = 광고 보기 (선택) / Free Diamonds','현금 결제 없음 · No in-app purchases');});mark('dia');await W(2500);
await p.click('#dia107 [data-ad133]');await W(3200);await W(1500);
await p.evaluate(()=>{DTAB107='box';drawDia107();CAP('8. 상자 · 아이템은 다이아로 / Boxes with Diamonds','확률 표시 · Odds shown');});mark('box');await W(3000);
await p.evaluate(()=>{const t=document.querySelector('#dia107 .tb [data-t=ad]')||[...document.querySelectorAll('#dia107 .tb [data-t]')].pop();if(t)t.click();CAP('9. 광고 탭 (선택) / Optional rewarded ads');});mark('adtab');await W(3000);
await p.evaluate(()=>{$('dia107')&&$('dia107').remove();});
// 10 보스
await p.evaluate(()=>{const f=f10();Object.assign(f,{s1:1,s2:1,s3:1,seal:1,boss:1,post:1,ack:1,rw1:1});P.ch10=1;P.s1={lv:P.lv,cls:P.cls};save();});
await p.evaluate(id=>{const A=R5(id);const e=A.entry||A.west;const ex=Array.isArray(e)?e[0]:e.x,ey=Array.isArray(e)?e[1]:e.y;hero.x=(ex+6)*32;hero.y=ey*32;},'D103');await W(2500);await clr();
await p.evaluate(()=>{try{fix10N()}catch(e){}const n=SP5.find(n=>n.si==='mem10');if(n){hero.x=n.x+40;hero.y=n.y+10;}});await W(1200);
await p.evaluate(()=>memory10());await W(1200);await clr();await W(2000);await clr();
await p.evaluate(()=>{setHunt(true);CAP('10. 보스전 / Boss battle');});mark('boss');
for(let i=0;i<12;i++){await W(500);await clr();await p.evaluate(()=>{for(const el of document.querySelectorAll('div,button')){if(el.offsetParent&&/눌러서 다음/.test(el.textContent)&&el.textContent.length<300)el.click();}if(BS10.e&&BS10.e.hp<BS10.e.m.hp*.6)BS10.e.hp=BS10.e.m.hp*.75;});}
await p.evaluate(()=>{setHunt(false);CAP(null);});
// 11 설정 · 언어
await p.evaluate(()=>{openPan('pMenu');optOn78=true;drawOpt78();CAP('11. 설정 · 한/영 전환 / Settings, KO/EN');});mark('opt');await W(3000);
mark('end');
const vpath=await p.video().path();await ctx.close();await b.close();
fs.writeFileSync('vid/review_cuts.json',JSON.stringify({video:vpath,cuts,errs}));console.log(vpath,JSON.stringify(cuts),errs.slice(0,5));})();
