const fs=require('fs');const save=fs.readFileSync('save_s2end.json','utf8');
require('./h.js')(async(pg,errs)=>{
 await pg.waitForTimeout(1500);
 await pg.evaluate(()=>{const r=R2('D121');hero.x=tx5(r.sena[0]+2);hero.y=ty5(r.sena[1]+3);rgGo('D121',{now:1,start:1});});
 await pg.waitForTimeout(3500);
 const pos=()=>pg.evaluate(()=>npcs.filter(n=>n.c2).map(n=>n.k+'@'+(n.x|0)+','+(n.y|0)+' d'+n.d+' st'+n.st+' r'+n._d2).join(' | '));
 console.log('a',await pos());
 // 네 방향으로 걸리기 (직접 옮겨서 그림 확인)
 await pg.evaluate(()=>{window.NPW=npcs.filter(n=>n.c2);NPW.forEach(n=>{n.ox=n.x;n.oy=n.y;});window.NST=0;window.TK=setInterval(()=>{NST++;const ph=Math.floor(NST/40)%4,v=[[0,-1.5],[-1.5,0],[0,1.5],[1.5,0]][ph];NPW.forEach(n=>{n.x+=v[0];n.y+=v[1];n.hx=n.x;n.hy=n.y;});},25);});
 const n=await pg.evaluate(()=>{const s=npcs.find(n=>n.k==='k2sena');hero.x=s.x+60;hero.y=s.y+90;return 1;});
 for(let i=0;i<8;i++){await pg.waitForTimeout(500);await pg.evaluate(()=>{const s=npcs.find(n=>n.k==='k2sena');hero.x=s.x+60;hero.y=s.y+90;});await pg.screenshot({path:'shots13/w'+i+'.png'});console.log(i,await pos());}
 await pg.evaluate(()=>clearInterval(TK));await pg.waitForTimeout(1500);console.log('stop',await pos());
 await pg.screenshot({path:'shots13/idle.png'});
 console.log('errs',errs.length,errs.slice(0,3));
},{save});
