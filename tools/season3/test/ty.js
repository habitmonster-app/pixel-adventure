const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 console.log(await pg.evaluate(()=>JSON.stringify(['s2horn','s2arbos','s2leorn','s2shadow','serka','morga','s2brak'].map(k=>{const m=MOB[k],im=IMG[m.spr];return [k,m.spr,m.flt,im&&im.complete,im&&im.naturalWidth,im&&im.naturalHeight,SMETA[m.spr]];}))));
},{save:fs.readFileSync('save_s2done.json','utf8')});
