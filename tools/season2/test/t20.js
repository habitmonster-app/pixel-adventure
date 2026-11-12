// 보스 공격 예고·효과 그림 찍기 (전/후 비교용): OUT=폴더
const fs=require('fs');const OUT=process.env.OUT||'shots20';fs.mkdirSync(OUT,{recursive:true});
require('./h.js')(async(pg)=>{
 await pg.evaluate(()=>{P.lv=55;for(let i=1;i<=10;i++)P['ch'+i]=1;P.f10=P.f10||{};P.f10.seal=1;for(let i=11;i<=15;i++)P['ch'+i]=1;window._hd=heroDamage;heroDamage=()=>{};try{closeAll();}catch(e){}});
 const shot=async n=>{await pg.screenshot({path:OUT+'/'+n+'.png'});};
 const spawn=async id=>{await pg.evaluate(async id=>{const b=BOSS2[id];const r=R2(b.rid);hero.x=tx5(r[b.at][0])-90;hero.y=ty5(r[b.at][1])+30;await rgGo(b.rid,{now:1,start:1});},id);
  await pg.waitForTimeout(2500);
  await pg.evaluate(id=>{const b=BOSS2[id],r=R2(b.rid);for(let i=mobs.length-1;i>=0;i--)if(mobs[i].b2||(mobs[i].m&&!mobs[i].npc))mobs.splice(i,1);
   const p=r[b.at],x=tx5(p[0]),y=ty5(p[1]),m=MOB[id];const e=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:9,cd:0});e.b2=id;e.d=2;mobs.push(e);S2.bs={id,e,on:1,cd:99,said:1};
   hero.x=x-110;hero.y=y+50;if(id==='serka')S2.sk={ph:1,brz:[1,1,1],sh:0,open:0,swapT:99,mirT:99,dec:[]};},id);
  await pg.waitForTimeout(600);};
 const pat=async(id,k,i,n)=>{const T=await pg.evaluate(([id,i,n])=>{const B=S2.bs;B.e.x=B.e.hx;B.e.y=B.e.hy;hero.x=B.e.x-110;hero.y=B.e.y+50;const R=Math.random;Math.random=()=>(i+.5)/n;B.cd=0;try{bsTick2(0.016);}finally{Math.random=R;}B.cd=99;return Math.max(...S2.tg.map(t=>t.t),1);},[id,i,n]);
  await pg.waitForTimeout(T*450);await shot(id+'_'+k+'_1예고');await pg.waitForTimeout(T*550+60);await shot(id+'_'+k+'_2터짐');await pg.waitForTimeout(250);await shot(id+'_'+k+'_3터짐');await pg.waitForTimeout(2300);};
 for(const id of ['s2horn','s2brak','s2arbos','s2leorn']){await spawn(id);const P_=await pg.evaluate(id=>BOSS2[id].pat,id);for(let i=0;i<P_.length;i++)await pat(id,P_[i],i,P_.length);}
 await spawn('serka');
 for(const k of ['thrust','sweep','wave','big']){const T=await pg.evaluate(k=>{const e=S2.bs.e;e.x=e.hx;e.y=e.hy;hero.x=e.x-110;hero.y=e.y+50;sAtk2(k,e,e.m.atk);return Math.max(...S2.tg.map(t=>t.t),1);},k);
  await pg.waitForTimeout(T*450);await shot('serka_'+k+'_1예고');await pg.waitForTimeout(T*550+60);await shot('serka_'+k+'_2터짐');await pg.waitForTimeout(250);await shot('serka_'+k+'_3터짐');await pg.waitForTimeout(2500);await pg.evaluate(()=>{const k=S2.sk;if(k){k.open=0;}S2.bs.e.hold=0;});}
 // 2단계 거울 광선
 await pg.evaluate(()=>{const k=S2.sk;k.ph=2;k.mirT=0;S2.bs.on=1;S2.bs.cd=99;bsTick2(.016);k.mirT=99;});
 await pg.waitForTimeout(500);await shot('serka_mirror_1예고');await pg.waitForTimeout(700);await shot('serka_mirror_2터짐');await pg.waitForTimeout(250);await shot('serka_mirror_3터짐');await pg.waitForTimeout(1500);
 // 3단계 보호막 → 화로 켜서 깨기
 await pg.evaluate(()=>{const k=S2.sk,e=S2.bs.e;k.ph=3;k.sh=1;k.brz=[0,0,0];k.open=0;e.hp=Math.round(e.m.hp*.3);S2.bs.cd=99;try{gaSet2(e,'shield');}catch(x){};if(window.shOn2)shOn2(e);});
 await pg.waitForTimeout(1500);await shot('serka_shield_1켜짐');
 await pg.evaluate(()=>{S2.sk.brz=[1,1,1];bsTick2(.016);});await pg.waitForTimeout(250);await shot('serka_shield_2깨짐');await pg.waitForTimeout(300);await shot('serka_shield_3깨짐');await pg.waitForTimeout(2500);
 // 봉인구 꽂기
 await pg.evaluate(()=>{const f=f2();f.sup15=1;f.core15=1;const e=S2.bs.e;e.sup=1;e.hp=1;const r=R2('D151');hero.x=tx5(r.altar[0]);hero.y=ty5(r.altar[1])+60;seal2();});
 for(let i=0;i<4;i++){await pg.waitForTimeout(450);await shot('seal_'+i);await pg.evaluate(()=>{if(talk)nextLine();});}
},{w:900,h:420});
