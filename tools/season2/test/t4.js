// 저장 불러오기(세르카 제압 직후) → 다시 접속 확인 → 봉인 → 결말 → 종료 후 콘텐츠
const fs=require('fs');const save=fs.readFileSync('save_s2done.json','utf8');
require('./h.js')(async(pg,errs)=>{
 await pg.waitForTimeout(2500);
 const st=async n=>console.log(n,await pg.evaluate(()=>{const f=P.f2||{};const b=S2.bs&&S2.bs.e;return JSON.stringify({cur:RGN.cur,hx:+(hero.x/TS).toFixed(1),hy:+(hero.y/TS).toFixed(1),lv:P.lv,q:P.q,core15:f.core15,talk15:f.talk15,sup15:f.sup15,seal15:f.seal15,end15:f.end15,boss:b?{hp:b.hp,sup:b.sup}:null,eqN:Object.keys(P.eq||{}).length});}));
 await st('다시 접속 직후');
 await pg.screenshot({path:'shots4/a0_reconnect.png'});
 await pg.evaluate(()=>{const r=R2('D151');if(RGN.cur!=='D151'){hero.x=tx5(r.arena[0]);hero.y=ty5(r.arena[1]+4);rgGo('D151',{now:1,start:1});}});
 await pg.waitForTimeout(3000);await st('제단 앞');
 await pg.evaluate(()=>{const r=R2('D151');hero.x=tx5(r.arena[0]);hero.y=ty5(r.arena[1]+3);});await pg.waitForTimeout(800);
 await pg.screenshot({path:'shots4/a1_before_seal.png'});
 await pg.addScriptTag({content:fs.readFileSync('drv.js','utf8')});
 let n=0;const t0=Date.now();
 while(Date.now()-t0<240000){await pg.waitForTimeout(1500);
  const L=await pg.evaluate(()=>DRVLOG.splice(0));for(const l of L)console.log(l);
  if(await pg.evaluate(()=>!!talk)&&n<8){await pg.screenshot({path:'shots4/b'+(n++)+'_ending.png'});}
  if(await pg.evaluate(()=>DRV.done))break;}
 await pg.waitForTimeout(1500);await st('결말 뒤');
 await pg.screenshot({path:'shots4/c0_after_end_menu.png'});
 await pg.evaluate(()=>{try{closeFac();}catch(e){}const r=R2('D151');hero.x=tx5(r.arena[0]);hero.y=ty5(r.arena[1]+3);});await pg.waitForTimeout(1200);
 await pg.screenshot({path:'shots4/c1_after_seal.png'});
 await pg.evaluate(()=>{const n=SP5.find(n=>n.si==='alt15');DRVLOG.push('alt15 '+(n?'있음':'없음'));if(n){hero.x=n.x;hero.y=n.y+10;n.on();}});
 await pg.waitForTimeout(800);console.log('제단 메뉴', await pg.evaluate(()=>$('fmT').textContent+' | '+[...document.querySelectorAll('#fmB .fm-bt button')].map(b=>b.textContent).join(' / ')));
 await pg.screenshot({path:'shots4/c2_altar_menu.png'});
 await pg.evaluate(()=>{const b=[...document.querySelectorAll('#fmB .fm-bt button')].find(b=>b.textContent.includes('회고'));if(b)b.click();});
 await pg.waitForTimeout(2500);
 while(await pg.evaluate(()=>{if(talk){nextLine();return 1;}return 0;}))await pg.waitForTimeout(150);
 await pg.waitForTimeout(1500);
 console.log('회고전', await pg.evaluate(()=>{const b=S2.bs&&S2.bs.e;return JSON.stringify(b?{id:S2.bs.id,hp:b.hp,mem:b.mem,max:b.m.hp,on:S2.bs.on}:null)}));
 await pg.screenshot({path:'shots4/c3_rematch.png'});
 await pg.evaluate(()=>{const b=S2.bs&&S2.bs.e;if(b)hurt(b,b.hp+10);});await pg.waitForTimeout(3000);
 while(await pg.evaluate(()=>{if(talk){nextLine();return 1;}return 0;}))await pg.waitForTimeout(150);
 console.log('회고전 뒤', await pg.evaluate(()=>JSON.stringify({bs:!!S2.bs,seal15:P.f2.seal15,hp:P.hp})));
 await pg.evaluate(()=>{try{closeFac();}catch(e){}const r=R2('D131');hero.x=tx5(r.heart[0]-6);hero.y=ty5(r.heart[1]);rgGo('D131',{now:1,start:1});});
 await pg.waitForTimeout(6000);console.log('숨은 정예', await pg.evaluate(()=>mobs.filter(m=>m.m&&m.m.id==='s2shadow'&&m.st!=='dead').length));
 await pg.screenshot({path:'shots4/d0_hidden_elite.png'});
 console.log('frostRec', await pg.evaluate(()=>frostRec().map(r=>r[0]).join(',')));
 fs.writeFileSync('save_s2end.json',await pg.evaluate(()=>{save();return localStorage.getItem('pxclassic2');}));
},{save});
