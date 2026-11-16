const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 await pg.evaluate(()=>{try{closeAll();}catch(e){}});
 await pg.click('text=지도').catch(()=>{});await pg.waitForTimeout(600);
 await pg.evaluate(()=>{WM.tab='world';WM.sel=null;drawMap();});await pg.waitForTimeout(800);
 await pg.evaluate(()=>{const b=$('wmBox');b.style.overflow='visible';document.querySelector('#pMap').style.overflow='visible';});
 const el=await pg.$('#wmc');await el.screenshot({path:'shots/wm_full.png'});
},{save:fs.readFileSync('save_s3done.json','utf8'),w:1100,h:900});
