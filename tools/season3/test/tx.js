const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 await pg.evaluate(()=>{try{closeAll();}catch(e){}});
 console.log(await pg.evaluate(()=>{const d=dexL104();const hi=Object.entries(MOB).filter(([k,m])=>m.lv>=51&&!d.find(x=>x.k===k)).map(([k,m])=>k+':'+m.lv+':'+m.spr);
  const by={};d.forEach(x=>by[x.ch]=(by[x.ch]||0)+1);const g=gdList112();
  return JSON.stringify({n:d.length,by,hi,blank:d.filter(x=>DEXIMG104[x.k].length<120).map(x=>x.k),gear:g.length,ghi:g.filter(x=>x.lv>50).length,tp:!!document.querySelector('#qtrack .tp3'),qt:$('qtrack').textContent.slice(0,80)});}));
 await pg.evaluate(()=>{openDex104();DEXCH104C=16;drawDex104();});await pg.waitForTimeout(500);await pg.screenshot({path:'shots/dex16.png'});
 await pg.evaluate(()=>{DEXCH104C=15;drawDex104();});await pg.waitForTimeout(300);await pg.screenshot({path:'shots/dex15.png'});
},{save:fs.readFileSync(process.env.SV||'save_s2done.json','utf8')});
