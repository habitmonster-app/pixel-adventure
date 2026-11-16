const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 console.log(await pg.evaluate(()=>{const g=gdList112(),m=mdList112(),d=dexL104();
  const s2=Object.keys(GEAR).filter(k=>/^(s2|f2|fr|s3)/.test(k)).slice(0,40);
  return JSON.stringify({gear:g.length,gmax:Math.max(...g.map(x=>x.lv)),ghi:g.filter(x=>x.lv>50).map(x=>x.k+':'+x.lv),md:m.map(x=>x.k+':'+x.ch),dex:d.length,dexch:[...new Set(d.map(x=>x.ch))],
   s2,slots:s2.map(k=>GEAR[k].s+'/'+GEAR_SLOT(GEAR[k].s)+'/'+lvOf81(k)),mobs:Object.keys(MOB).filter(k=>/^s[23]/.test(k)).length,img:Object.keys(DEXIMG104).length,imgs:typeof DEXIMG104.bat,mk:Object.keys(MOB).filter(k=>/^s[23]/.test(k)).join(',')});}));
},{save:fs.readFileSync('save_s3done.json','utf8')});
