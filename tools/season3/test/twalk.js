const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 await pg.evaluate(()=>{try{closeAll();}catch(e){}});
 console.log(await pg.evaluate(()=>JSON.stringify({cur:RGN.cur,q:qCur()&&qCur().id,st:P.q.st,tp:tpInfo45()&&tpInfo45().cost,hero:[hero.x/TS|0,hero.y/TS|0]})));
 await pg.evaluate(()=>{window.GOD=setInterval(()=>{P.hp=stats().hp;},300);qGo();});
 let last='',t0=Date.now();
 for(let i=0;i<150;i++){await pg.waitForTimeout(4000);
  const s=await pg.evaluate(()=>{if(talk)nextLine();return JSON.stringify({cur:RGN.cur,x:hero.x/TS|0,y:hero.y/TS|0,auto:!!auto,pend:!!S5.pend,talk:!!talk,fac:$('fac')&&$('fac').style.display});});
  const o=JSON.parse(s);if(o.cur!==last){console.log(((Date.now()-t0)/1000|0)+'s',s);last=o.cur;}
  if(!o.auto&&!o.pend){console.log(((Date.now()-t0)/1000|0)+'s stop',s);if(o.cur==='D72'&&Math.abs(o.x-1305)<4)break;await pg.evaluate(()=>qGo());}}
},{save:fs.readFileSync('save_s2done.json','utf8')});
