const {chromium}=require('playwright');const L=require('/home/user/work/tests55/lib.js');
const VP={play:[{width:960,height:540},2],ios:[{width:932,height:430},3],ipad:[{width:1366,height:1024},2]};
const kind=process.argv[2]||'play';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:VP[kind][0],deviceScaleFactor:VP[kind][1]});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.Capacitor={isNativePlatform:()=>true,Plugins:{}};try{localStorage.setItem('pxclassic2_opt',JSON.stringify({chatFold:1}))}catch(e){}});
await p.goto('http://localhost:8791/index.html');await p.waitForTimeout(1500);
const W=ms=>p.waitForTimeout(ms);const out=n=>`raw/${kind}_${n}.png`;
const clr=async()=>{for(let i=0;i<60;i++){if(!await p.evaluate(()=>!!talk))break;await p.evaluate(()=>nextLine());await W(80);}};
const gear=`c.eq=Object.assign({},c.eq,{armor:'torso_armour_plate',cape:'capeR',shield:'shield_crusader',weapon:'w_glowsword',head:'hat_helmet_maximus',arm:'arms_armour',shoulder:'shoulders_pauldrons',legs:'legs_armour',feet:'feet_armour'});for(const k in c.eq)c.bag[c.eq[k]]=1;c.gold=48210;c.tut101={off:1,d:{}};c.att125={n:3,last:(()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})()};
for(const k of ['k9_sword','k9_armor','k9_neck','k10_ring','g_torso','g_helm','g_legs','k9_dagger','k9_bow','k9_staff'])c.bag[k]=1;`;
await p.evaluate(([s,g])=>{const cc=eval(s+';'+g+';c');DB.slots=[cc,newChar('rogue',{hs:5,hc:4,sk:2,bd:1},'바람'),newChar('mage',{hs:7,hc:6,sk:1,bd:1},'별빛')];DB.slots[1].lv=38;DB.slots[2].lv=41;DB.cur=0;saveDB();openSelect();},[L.save9.replace("process.env.CLS||'warrior'","'warrior'"),gear]);await W(1500);
await p.screenshot({path:out('1sel')});
await p.click('#go');await W(3000);await clr();
await p.evaluate(()=>{for(const b of SKT[P.cls])for(const x of b.s)P.sk[x.id]=x.max;for(let i=0;i<P.qs.length;i++)P.qs[i]=null;for(const b of SKT[P.cls])for(const x of b.s)if(x.t!=='pas'&&!P.qs.includes(x.id)){const e=P.qs.indexOf(null);if(e>=0)P.qs[e]=x.id;}P.hp=stats().hp;buildHero();refreshSide();try{drawQ()}catch(e){}});
await p.evaluate(()=>{setInterval(()=>{try{if(P){P.hp=stats().hp;P.mp=stats().mp;}}catch(e){}},150);});
const pop=async()=>{await p.evaluate(()=>{for(const el of document.querySelectorAll('div,button')){if(el.offsetParent&&/눌러서 다음/.test(el.textContent)&&el.textContent.length<300){el.click();}}});await W(200);};
const tp=async id=>{await p.evaluate(id=>{const A=R5(id);const e=A.entry||A.west;const ex=Array.isArray(e)?e[0]:e.x,ey=Array.isArray(e)?e[1]:e.y;hero.x=(ex+6)*32;hero.y=ey*32;},id);await W(3000);await clr();};
// 2) 전투: D92
await tp('D92');await p.evaluate(()=>setHunt(true));
for(let i=0;i<8;i++){await W(1300);await clr();await p.evaluate(()=>{P.hp=stats().hp*.9;});await p.screenshot({path:out('2hunt'+i)});}
await p.evaluate(()=>setHunt(false));
// 5) 장비·가방
await p.evaluate(()=>{P.scroll=24;P.enh=P.enh||{};P.enh[P.eq.weapon]=7;openEnh();});await W(1000);await p.screenshot({path:out('5inv')});
await p.evaluate(()=>{document.querySelectorAll('.x,.close').forEach(b=>{});try{closeAll()}catch(e){}});
await p.keyboard.press('Escape');await W(500);
await p.evaluate(()=>openStat());await W(1000);await p.screenshot({path:out('6stat')});await p.keyboard.press('Escape');await W(400);
await p.evaluate(()=>openSkill());await W(1000);await p.screenshot({path:out('7skill')});await p.keyboard.press('Escape');await W(400);
await p.evaluate(()=>{try{$('mMap').click()}catch(e){}});await W(1000);await p.screenshot({path:out('8map')});await p.keyboard.press('Escape');await W(400);
// 4) 보스
await p.evaluate(()=>{const f=f10();Object.assign(f,{s1:1,s2:1,s3:1,seal:1,boss:1,post:1,ack:1,rw1:1});P.ch10=1;P.s1={lv:P.lv,cls:P.cls};save();});
await tp('D103');
const st=await p.evaluate(()=>{try{fix10N()}catch(e){}const n=SP5.find(n=>n.si==='mem10');if(!n)return 'non';hero.x=n.x+40;hero.y=n.y+10;return 'ok';});console.log('mem',st);await W(1500);
await p.evaluate(()=>memory10());await W(1200);await clr();await W(2500);await clr();
await p.evaluate(()=>setHunt(true));
for(let i=0;i<5;i++){await W(700);await clr();await pop();await pop();await p.evaluate(()=>{if(BS10.e&&BS10.e.hp<BS10.e.m.hp*.6)BS10.e.hp=BS10.e.m.hp*.75;});await p.screenshot({path:out('4boss'+(i<10?'0':'')+i)});}
await p.evaluate(()=>setHunt(false));
console.log('errs',errs.slice(0,4));await b.close();})();
