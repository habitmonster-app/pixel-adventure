const {chromium}=require('playwright');const L=require('/home/user/work/tests55/lib.js');
const VP={play:[{width:960,height:540},2],ios:[{width:932,height:430},3],ipad:[{width:1366,height:1024},2]};
const kind=process.argv[2]||'play';const MODE=process.argv[3]||'mage';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:VP[kind][0],deviceScaleFactor:VP[kind][1]});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.Capacitor={isNativePlatform:()=>true,Plugins:{}};try{localStorage.setItem('pxclassic2_opt',JSON.stringify({chatFold:1}))}catch(e){}});
await p.goto('http://localhost:8791/index.html');await p.waitForTimeout(1500);
const W=ms=>p.waitForTimeout(ms);const out=n=>`raw/${kind}_${n}.png`;
const clr=async()=>{for(let i=0;i<60;i++){if(!await p.evaluate(()=>!!talk))break;await p.evaluate(()=>nextLine());await W(80);}};
const gear=`c.eq=Object.assign({},c.eq,{weapon:'k9_staff'});for(const k in c.eq)c.bag[c.eq[k]]=1;c.gold=48210;c.tut101={off:1,d:{}};c.att125={n:3,last:(()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})()};
for(const k of ['k9_sword','k9_armor','k9_neck','k10_ring','g_torso','g_helm','g_legs','k9_dagger','k9_bow','k9_staff'])c.bag[k]=1;`;
await p.evaluate(([s,g])=>{const cc=eval(s+';'+g+';c');DB.slots=[cc,newChar('rogue',{hs:5,hc:4,sk:2,bd:1},'바람'),newChar('mage',{hs:7,hc:6,sk:1,bd:1},'별빛')];DB.slots[1].lv=38;DB.slots[2].lv=41;DB.cur=0;saveDB();openSelect();},[L.save9.replace("newChar('warrior'","newChar('mage'"),gear]);await W(1500);

await p.click('#go');await W(3000);await clr();
await p.evaluate(()=>{for(const b of SKT[P.cls])for(const x of b.s)P.sk[x.id]=x.max;for(let i=0;i<P.qs.length;i++)P.qs[i]=null;for(const b of SKT[P.cls])for(const x of b.s)if(x.t!=='pas'&&!P.qs.includes(x.id)){const e=P.qs.indexOf(null);if(e>=0)P.qs[e]=x.id;}P.hp=stats().hp;buildHero();refreshSide();try{drawQ()}catch(e){}});
await p.evaluate(()=>{setInterval(()=>{try{if(P){P.hp=stats().hp;P.mp=stats().mp;}}catch(e){}},150);});
const pop=async()=>{await p.evaluate(()=>{for(const el of document.querySelectorAll('div,button')){if(el.offsetParent&&/눌러서 다음/.test(el.textContent)&&el.textContent.length<300){el.click();}}});await W(200);};
const tp=async id=>{await p.evaluate(id=>{const A=R5(id);const e=A.entry||A.west;const ex=Array.isArray(e)?e[0]:e.x,ey=Array.isArray(e)?e[1]:e.y;hero.x=(ex+6)*32;hero.y=ey*32;},id);await W(3000);await clr();};
if(MODE==='mage'){await tp('D102');await p.evaluate(()=>setHunt(true));
for(let k=0;k<10;k++){await W(1100);await clr();await pop();await p.screenshot({path:out('9mage'+k)});}}

console.log('errs',errs.slice(0,4));await b.close();})();
