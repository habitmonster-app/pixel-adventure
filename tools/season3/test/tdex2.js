const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 console.log(await pg.evaluate(()=>JSON.stringify({g2:GEAR.s2_sword,g3:GEAR.s3_legs,set:setOf81('s3_sword'),SETLV81,lv:[lvOf81('s2_sword'),lvOf81('s3_sword')],grd:grdOld81('s3_sword'),meta:[SMETA.s3slime,SMETA.s3krag,SMETA.s2brak,SMETA.s3morga,SMETA.s3mic],mob:MOB.s3slime,mobk:Object.keys(MOB.s3krag)})));
},{save:fs.readFileSync('save_s3done.json','utf8')});
