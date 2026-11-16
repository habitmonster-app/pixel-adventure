// 시즌 2 끝난 저장으로 불러오기 → 시즌 3 시작 확인
const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 console.log(await pg.evaluate(()=>JSON.stringify({q:P.q,qc:qCur()&&qCur().id,lv:P.lv,cap:LVCAP,cur:RGN.cur,s3:SS3&&1})));
 await pg.evaluate(async()=>{try{closeAll();}catch(e){}hero.x=1300*TS;hero.y=52*TS;await rgGo('D72',{now:1,start:1});});
 await pg.waitForTimeout(2500);
 console.log(await pg.evaluate(()=>JSON.stringify({q:P.q,qc:qCur()&&qCur().id,talk:!!talk,cur:RGN.cur})));
 await pg.screenshot({path:'shots/t1a.png'});
},{save:fs.readFileSync('save_s2done.json','utf8')});
