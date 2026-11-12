const {chromium}=require('playwright');
const VP={play:[{width:960,height:540},2],ios:[{width:932,height:430},3],ipad:[{width:1366,height:1024},2]};
const kind=process.argv[2]||'play';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:VP[kind][0],deviceScaleFactor:VP[kind][1]});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.Capacitor={isNativePlatform:()=>true,Plugins:{}};});
await p.goto('http://localhost:8791/index.html');await p.waitForTimeout(1500);const W=ms=>p.waitForTimeout(ms);
await p.evaluate(()=>{const c=newChar('warrior',{hs:3,hc:2,sk:1,bd:1},'대열');c.lv=12;c.gold=3200;c.tut101={off:1,d:{}};c.att125={n:3,last:(()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})()};c.eq=Object.assign({},c.eq,{armor:'torso_armour_plate',cape:'capeR',shield:'shield_crusader',weapon:'w_glowsword',head:'hat_helmet_maximus',arm:'arms_armour',shoulder:'shoulders_pauldrons',legs:'legs_armour',feet:'feet_armour'});for(const k in c.eq)c.bag[c.eq[k]]=1;DB.slots=[c,null,null];DB.cur=0;saveDB();openSelect();});await W(800);
await p.click('#go');await W(3000);
for(let i=0;i<40;i++){if(!await p.evaluate(()=>!!talk))break;await p.evaluate(()=>nextLine());await W(80);}
await p.evaluate(()=>{hero.y-=40;});await W(1200);
await p.screenshot({path:`raw/${kind}_0town.png`});
await p.evaluate(()=>{hero.x+=200;hero.y-=60});await W(1200);await p.screenshot({path:`raw/${kind}_0town2.png`});
console.log(errs.slice(0,3));await b.close();})();
