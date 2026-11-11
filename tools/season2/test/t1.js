require('./h.js')(async(pg,errs)=>{
 const r=await pg.evaluate(async()=>{
  const o={};o.lv=P.lv;o.nq=QUESTS.length;o.i11=QUESTS.findIndex(q=>q.id==='Q11_01');
  P.lv=50;P.exp=0;for(let i=1;i<=10;i++)P['ch'+i]=1;P.q={i:o.i11,st:'none',c:0};
  P.f10=P.f10||{};P.f10.seal=1;
  o.tw=MAP.tw;o.regs=MAP.regions.length;o.need=needExp(50);o.cap=LVCAP;
  o.mob=Object.keys(MOB).filter(k=>/1[1-4]$|serka|fshadow/.test(k)).map(k=>k+':'+MOB[k].lv+'/'+MOB[k].hp+'/'+MOB[k].atk+'/'+MOB[k].exp);
  return o;});
 console.log(JSON.stringify(r));
 await pg.evaluate(async()=>{hero.x=(2740)*TS;hero.y=30*TS;await rgGo('D111',{now:1,start:1});});
 await pg.waitForTimeout(2500);
 console.log(await pg.evaluate(()=>JSON.stringify({cur:RGN.cur,in2:in2(),x:hero.x/TS,y:hero.y/TS,mobs:mobs.length,sp:SP5.filter(s=>s.r&&s.r.startsWith&&s.r.startsWith('D11')).length})));
 await pg.screenshot({path:'t1.png'});
});
