const fs=require('fs');const save=fs.readFileSync('save_s2end.json','utf8');
require('./h.js')(async(pg)=>{
 await pg.waitForTimeout(1500);
 await pg.evaluate(()=>{const r=R2('D141');hero.x=tx5(r.gdev[0]);hero.y=ty5(r.gdev[1]+3);rgGo('D141',{now:1,start:1});});
 await pg.waitForTimeout(3500);
 await pg.evaluate(()=>{window.T9=[];const ids=['s2horn','s2brak','s2arbos','s2leorn','serka','s2shadow'];ids.forEach((id,i)=>{const m=MOB[id],x=hero.x-250+i*100,y=hero.y-40;const e=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:99,cd:99});e.hold=99;e.d=2;mobs.push(e);T9.push(e);});hero.y+=60;});
 await pg.waitForTimeout(800);await pg.screenshot({path:'shots9/a_front.png'});
 for(const [d,n] of [[1,'left'],[0,'up'],[3,'right']]){await pg.evaluate(d=>{for(const e of T9){e.d=d;e.st='walk';e.f=3;}},d);await pg.waitForTimeout(150);await pg.screenshot({path:'shots9/b_'+n+'.png'});}
 await pg.evaluate(()=>{const K=['charge','fan','roots','shield','sweep','x'];T9.forEach((e,i)=>{e.d=2;e.st='idle';gaSet2(e,K[i]);});});
 await pg.waitForTimeout(450);await pg.screenshot({path:'shots9/c_attack.png'});
 await pg.evaluate(()=>{const e=T9[4];gaSet2(e,'shield');});await pg.waitForTimeout(600);await pg.screenshot({path:'shots9/d_serka_shield.png'});
 console.log(await pg.evaluate(()=>T9.map(e=>e.k+':'+IMG[e.k].naturalWidth).join(' ')));
},{save});
