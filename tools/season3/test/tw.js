const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 await pg.evaluate(()=>{try{closeAll();}catch(e){}const n=SP5.find(n=>n.g3&&n.k==='ret3');linkGo5({land:[Math.floor(n.x/TS)-1,Math.floor(n.y/TS)+1],n:'야영지'});});
 await pg.waitForTimeout(4500);
 console.log(await pg.evaluate(()=>JSON.stringify({r:RGN.cur,lb:SP5.filter(n=>n.g3&&n.k==='ret3').map(n=>n.lb)[0]})));
 await pg.screenshot({path:'shots/v_stone.png'});
},{save:fs.readFileSync('save_s3done.json','utf8')});
