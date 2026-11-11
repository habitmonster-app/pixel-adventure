// 봉인 뒤 저장으로: 회고전 세 단계 화면 + 결말 다시 보기 화면 + 다시 접속
const fs=require('fs');const save=fs.readFileSync('save_s2end.json','utf8');
require('./h.js')(async(pg,errs)=>{
 await pg.waitForTimeout(2500);
 const skip=async()=>{while(await pg.evaluate(()=>{if(talk){nextLine();return 1;}return 0;}))await pg.waitForTimeout(120);};
 console.log('다시 접속', await pg.evaluate(()=>JSON.stringify({cur:RGN.cur,seal15:P.f2.seal15,end15:P.f2.end15,q:P.q.i,s2:P.s2,core:matN('s2core')})));
 // 결말 다시 보기 (몇 줄 찍기)
 await pg.evaluate(()=>{const n=SP5.find(n=>n.si==='alt15');hero.x=n.x;hero.y=n.y+10;n.on();});await pg.waitForTimeout(500);
 await pg.evaluate(()=>{[...document.querySelectorAll('#fmB .fm-bt button')].find(b=>b.textContent.includes('결말'))?.click();});
 for(let i=0;i<40;i++){await pg.waitForTimeout(300);if(!await pg.evaluate(()=>!!talk))break;if([0,3,6,9,12,15].includes(i))await pg.screenshot({path:'shots5/e'+String(i).padStart(2,'0')+'_ending.png'});await pg.evaluate(()=>nextLine());}
 await skip();
 // 회고전
 await pg.evaluate(()=>{const n=SP5.find(n=>n.si==='alt15');hero.x=n.x;hero.y=n.y+10;n.on();});await pg.waitForTimeout(500);
 await pg.evaluate(()=>{[...document.querySelectorAll('#fmB .fm-bt button')].find(b=>b.textContent.includes('회고'))?.click();});await pg.waitForTimeout(400);
 await pg.evaluate(()=>{[...document.querySelectorAll('#fmB .fm-bt button')].find(b=>b.textContent.includes('다시 겨루기'))?.click();});
 await pg.waitForTimeout(1500);await skip();
 const bs=()=>pg.evaluate(()=>{const b=S2.bs&&S2.bs.e;return JSON.stringify(b?{hp:b.hp,max:b.m.hp,mem:b.mem,on:S2.bs.on,ph:S2.sk&&S2.sk.ph,sh:S2.sk&&S2.sk.sh,brz:S2.sk&&S2.sk.brz,dec:mobs.filter(m=>m.dec2&&m.st!=='dead').length,tg:S2.tg.length,php:P.hp}:null)});
 console.log('회고전 시작', await bs());
 // 1단계: 실제로 맞아 보기 (무적 아님) — 체력만 높게
 await pg.evaluate(()=>{window.HITS=[];const h=heroDamage;heroDamage=function(d){HITS.push(d|0);P.hp=stats().hp;};const b=S2.bs.e;hero.x=b.x;hero.y=b.y+110;});
 let s=0;for(let i=0;i<24;i++){await pg.waitForTimeout(500);if(await pg.evaluate(()=>S2.tg.length>0)&&s<3){await pg.screenshot({path:'shots5/f1_'+(s++)+'.png'});}}
 console.log('1단계 맞은 피해', await pg.evaluate(()=>JSON.stringify(HITS.splice(0))), await bs());
 // 2단계
 await pg.evaluate(()=>{const b=S2.bs.e;hurt(b,Math.ceil(b.hp-b.m.hp*.6));});await pg.waitForTimeout(800);await skip();
 s=0;for(let i=0;i<24;i++){await pg.waitForTimeout(500);if(await pg.evaluate(()=>S2.tg.length>0||mobs.some(m=>m.dec2))&&s<3&&i%4===0){await pg.screenshot({path:'shots5/f2_'+(s++)+'.png'});}}
 console.log('2단계', await pg.evaluate(()=>JSON.stringify(HITS.splice(0))), await bs());
 // 3단계
 await pg.evaluate(()=>{const b=S2.bs.e;hurt(b,Math.ceil(b.hp-b.m.hp*.3));});await pg.waitForTimeout(800);await skip();
 await pg.waitForTimeout(1500);await pg.screenshot({path:'shots5/f3_0_shield.png'});
 const h0=await pg.evaluate(()=>{const b=S2.bs.e,h=b.hp;hurt(b,5000);return [h,b.hp];});console.log('보호막 중 5000 피해 →',h0);
 for(let j=0;j<3;j++){await pg.evaluate(j=>{const L=NODES.filter(n=>n.k==='lp');if(L[0]){hero.x=L[0].x;hero.y=L[0].y+10;L[0].on();}},j);await pg.waitForTimeout(1800);console.log(' 화로',j,await bs());}
 await pg.screenshot({path:'shots5/f3_1_lit.png'});
 await pg.waitForTimeout(600);await pg.screenshot({path:'shots5/f3_2_open.png'});
 console.log('3단계', await pg.evaluate(()=>JSON.stringify(HITS.splice(0))), await bs());
 await pg.evaluate(()=>{const b=S2.bs.e;hurt(b,b.hp+5);});await pg.waitForTimeout(2500);await skip();
 console.log('회고전 끝', await bs(), await pg.evaluate(()=>JSON.stringify({gold:P.gold,aur:matN('s2aur'),core:matN('s2core'),seal:P.f2.seal15})));
 await pg.screenshot({path:'shots5/f4_after.png'});
},{save});
