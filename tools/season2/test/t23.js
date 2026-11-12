require('./h.js')(async(pg)=>{
 await pg.evaluate(()=>{P.cls='warrior';for(let i=1;i<=15;i++)P['ch'+i]=1;P.lv=55;});
 await pg.evaluate(async()=>{const b=BOSS2.serka;const r=R2(b.rid);hero.x=tx5(r[b.at][0])-90;hero.y=ty5(r[b.at][1])+30;await rgGo(b.rid,{now:1,start:1});});
 await pg.waitForTimeout(2500);
 await pg.evaluate(()=>{const b=BOSS2.serka,r=R2(b.rid);for(let i=mobs.length-1;i>=0;i--)if(mobs[i].b2||(mobs[i].m&&!mobs[i].npc))mobs.splice(i,1);
  const p=r[b.at],x=tx5(p[0]),y=ty5(p[1]),m=MOB.serka;const e=ent({k:m.spr,m,x,y,hp:Math.round(m.hp*.65),hx:x,hy:y,wt:9,cd:0});e.b2='serka';e.d=2;e.mem=1;mobs.push(e);S2.bs={id:'serka',e,on:1,cd:2,said:1};
  S2.sk={ph:1,brz:[1,1,1],sh:0,open:0,swapT:6,mirT:3,dec:[]};heroDamage=()=>{};window.HL=[];const _h=hurt;hurt=function(m,d){HL.push((m.dec2?'D':m.b2?'R':'o')+(d|0));return _h(m,d);};setHunt(true);});
 for(let i=0;i<20;i++){await pg.waitForTimeout(2000);await pg.evaluate(()=>{while(talk)nextLine();});
  console.log(await pg.evaluate(()=>{const e=S2.bs.e;const r={talk:!!talk,hunt,ph:S2.sk.ph,hp:e.hp,hT:hT?(hT===e?'REAL':hT.dec2?'DEC':hT.m&&hT.m.id):null,dist:hT?Math.round(Math.hypot(hT.x-hero.x,hT.y-hero.y)):-1,hst:hero.st,ehold:e.hold&&e.hold.toFixed(1),hurts:HL.splice(0).slice(0,12).join(',')};return JSON.stringify(r);}));}
},{});
