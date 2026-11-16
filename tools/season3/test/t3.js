// 시즌 2 끝난 캐릭터로 16~20장 끝까지 (+ 화면 찍기)
const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 await pg.evaluate(async()=>{try{closeAll();}catch(e){}hero.x=1300*TS;hero.y=52*TS;await rgGo('D72',{now:1,start:1});});
 await pg.waitForTimeout(2000);
 if(process.env.SHOT)await pg.evaluate(()=>{window.DRVSHOT=1;});
 await pg.addScriptTag({content:fs.readFileSync('drv3.js','utf8')});
 let shot=0;const t0=Date.now();
 while(Date.now()-t0<(+process.env.MAXS||900)*1000){await pg.waitForTimeout(2500);
  const L=await pg.evaluate(()=>DRVLOG.splice(0));for(const l of L){console.log(l);if(/SHOT/.test(l)&&shot<70){await pg.waitForTimeout(500);await pg.screenshot({path:'shots/s'+String(shot++).padStart(2,'0')+'_'+l.split(' ')[0].replace(/[:]/g,'-')+'.png'});}}
  if(await pg.evaluate(()=>DRV.done))break;}
 await pg.waitForTimeout(3000);
 console.log(await pg.evaluate(()=>{save();return JSON.stringify({q:P.q,lv:P.lv,exp:P.exp,cap:LVCAP,ch:[P.ch16,P.ch17,P.ch18,P.ch19,P.ch20],s3:P.s3,gold:P.gold,mats:S3MAT.map(k=>k+':'+matN(k)),cure:(P.pot||{}).pot_cure})}));
 fs.writeFileSync('save_s3done.json',await pg.evaluate(()=>localStorage.getItem('pxclassic2')));
 await pg.screenshot({path:'shots/end.png'});
 if(process.env.LANGX==='en')fs.writeFileSync('/tmp/claude-0/miss_en.json',await pg.evaluate(()=>JSON.stringify([...(window.I18N_MISS||new Map())].filter(x=>x[1]>0))));
},{save:fs.readFileSync('save_s2done.json','utf8')});
