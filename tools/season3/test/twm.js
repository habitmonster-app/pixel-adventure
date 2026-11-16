const fs=require('fs');const W=+process.env.W||900,H=+process.env.H||420;
require('./h.js')(async(pg,errs)=>{
 await pg.evaluate(()=>{try{closeAll();}catch(e){}});
 await pg.click('text=지도').catch(()=>{});await pg.waitForTimeout(600);
 await pg.evaluate(()=>{WM.tab='world';WM.sel=null;drawMap();});await pg.waitForTimeout(800);
 console.log(await pg.evaluate(()=>JSON.stringify({open:isOpen('pMap'),box:[$('wmBox').clientWidth,$('wmBox').clientHeight,$('wmBox').scrollHeight,$('wmBox').scrollTop]})));
 await pg.screenshot({path:'shots/wm_'+W+'_a.png'});
 await pg.evaluate(()=>{WM.sel=WORLD.length-3;drawWorld();});await pg.waitForTimeout(500);
 await pg.screenshot({path:'shots/wm_'+W+'_b.png'});
},{save:fs.readFileSync(process.env.SV||'save_s3done.json','utf8'),w:W,h:H});
