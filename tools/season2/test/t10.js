const fs=require('fs');const save=fs.readFileSync('save_s2end.json','utf8');
require('./h.js')(async(pg)=>{
 await pg.waitForTimeout(1500);
 // NPC: 서리항
 await pg.evaluate(()=>{const r=R2('D121');hero.x=tx5(r.sena[0]+2);hero.y=ty5(r.sena[1]+3);rgGo('D121',{now:1,start:1});});
 await pg.waitForTimeout(3500);await pg.evaluate(()=>{const n=npcs.find(n=>n.k==='k2sena');if(n){hero.x=n.x+40;hero.y=n.y+60;}});await pg.waitForTimeout(800);
 await pg.screenshot({path:'shots10/a_npc_port.png'});
 console.log(await pg.evaluate(()=>npcs.filter(n=>n.k&&n.k.startsWith('k2')).map(n=>n.k+':'+(IMG[n.k]&&IMG[n.k].src.split('/').pop())).join(' ')));
 // 효과: 브라크 싸움터에서 예고 하나씩 터뜨리기
 for(const [k,o] of [['fan',{k:'f',r:135,arc:1.7}],['line',{k:'l',len:440,w:30}],['nova',{k:'c',r:150}],['spike',{k:'c',r:42,c:'190,230,190'}],['ring',{k:'c',r:50}]]){
  await pg.evaluate(o=>{const x=hero.x,y=hero.y-30;window.HD=heroDamage;heroDamage=()=>{};tg2(Object.assign({x:x-60,y,a:-0.3,T:.05,dmg:1,c:o.c||'150,220,255'},o));},o);
  await pg.waitForTimeout(260);await pg.screenshot({path:'shots10/fx_'+k+'.png'});await pg.waitForTimeout(500);}
},{save});
