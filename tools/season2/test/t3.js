// 10장 끝난 캐릭터로 11~15장 끝까지 (+ 화면 찍기)
const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 await pg.evaluate(async()=>{
  P.lv=50;P.exp=0;for(let i=1;i<=10;i++)P['ch'+i]=1;P.q={i:QUESTS.findIndex(q=>q.id==='Q11_01'),st:'none',c:0};P.f10=P.f10||{};P.f10.seal=1;
  try{closeAll();}catch(e){}hero.x=1262*TS;hero.y=44*TS;await rgGo('D72',{now:1,start:1});});
 await pg.waitForTimeout(2000);
 await pg.evaluate(()=>{window.DRVSHOT=1;});
 await pg.addScriptTag({content:fs.readFileSync('drv.js','utf8')});
 let shot=0;const t0=Date.now();
 while(Date.now()-t0<(+process.env.MAXS||600)*1000){await pg.waitForTimeout(2500);
  const L=await pg.evaluate(()=>DRVLOG.splice(0));for(const l of L){console.log(l);if(/SHOT/.test(l)&&shot<60){await pg.waitForTimeout(500);await pg.screenshot({path:'shots/s'+String(shot++).padStart(2,'0')+'_'+l.split(' ')[0].replace(/[:]/g,'-')+'.png'});}}
  if(await pg.evaluate(()=>DRV.done))break;}
 await pg.waitForTimeout(3000);
 console.log(await pg.evaluate(()=>{save();return JSON.stringify({q:P.q,lv:P.lv,exp:P.exp,ch:[P.ch11,P.ch12,P.ch13,P.ch14,P.ch15],s2:P.s2,gold:P.gold,mats:F2MAT.map(k=>k+':'+matN(k))})}));
 fs.writeFileSync('save_s2done.json',await pg.evaluate(()=>localStorage.getItem('pxclassic2')));
 await pg.screenshot({path:'shots/end.png'});
});
