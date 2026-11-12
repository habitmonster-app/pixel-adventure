// 밸런스: 무적 없이 자동 사냥으로 보스·일반몹과 실제로 싸워 보기 (바닥 표시를 피하지 않는 '최악' 기준)
const CLS=process.env.CLS||'warrior';
require('./h.js')(async(pg)=>{
 await pg.evaluate(cls=>{P.cls=cls;for(let i=1;i<=15;i++)P['ch'+i]=1;P.f10=P.f10||{};P.f10.seal=1;
  window.gear21=(lv,s2,r,e)=>{P.lv=lv;P.eq={};const best={};
   for(const b of Object.keys(GEAR)){if(b.includes('~'))continue;const g=GEAR[b];if(!g||!g.s)continue;try{if(!canWear(P,b))continue;}catch(x){continue;}const L=lvOf81(b);if(L>50)continue;const sc=L*1000+(g.atk||0)+(g.def||0)+(g.hp||0)/5;if(!best[g.s]||sc>best[g.s][1])best[g.s]=[b,sc];}
   for(const s in best){const b=best[s][0],id=newId81(b);reg81(id,{b,r,l:50,o:[],lk:0,v:1,src:'test'});P.bag[id]=1;P.enh[id]=e;P.eq[s]=id;}
   if(s2)for(const [k,,,s] of S2G){if(!GEAR[k])continue;if(s==='neck'||s==='ring')continue;try{if(!canWear(P,k))continue;}catch(x){continue;}const id=newId81(k);reg81(id,{b:k,r,l:55,o:[],lk:0,v:1,src:'test'});P.bag[id]=1;P.enh[id]=3;P.eq[s]=id;}
   P.hp=stats().hp;P.mp=mpMax();return stats();};},CLS);
 const out=[];
 for(const [id,lv,s2] of [['s2horn',51,0],['s2brak',52,1],['s2arbos',53,1],['s2leorn',54,1],['serka',55,1]]){
  const st=await pg.evaluate(([id,lv,s2])=>{const s=gear21(lv,s2,4,6);return {hp:s.hp,atk:s.atk,def:s.def};},[id,lv,s2]);
  await pg.evaluate(async id=>{const b=BOSS2[id];const r=R2(b.rid);hero.x=tx5(r[b.at][0])-90;hero.y=ty5(r[b.at][1])+30;await rgGo(b.rid,{now:1,start:1});},id);
  await pg.waitForTimeout(2500);
  await pg.evaluate(id=>{const b=BOSS2[id],r=R2(b.rid);for(let i=mobs.length-1;i>=0;i--)if(mobs[i].b2||(mobs[i].m&&!mobs[i].npc))mobs.splice(i,1);
   const p=r[b.at],x=tx5(p[0]),y=ty5(p[1]),m=MOB[id];const e=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:9,cd:0});e.b2=id;e.d=2;e.mem=1;mobs.push(e);S2.bs={id,e,on:1,cd:2,said:1};
   if(id==='serka')S2.sk={ph:1,brz:[1,1,1],sh:0,open:0,swapT:6,mirT:3,dec:[]};
   hero.x=x-80;hero.y=y+30;P.hp=stats().hp;window.R21={t0:performance.now(),deaths:0,hits:0,dmg:0,pot:0,maxHit:0};
   const hd=window._hd21||(window._hd21=heroDamage);heroDamage=function(d){const h=P.hp;hd(d);const k=h-P.hp;if(k>0){R21.hits++;R21.dmg+=k;R21.maxHit=Math.max(R21.maxHit,k);}if(P.hp<=0||hero.st==='dead'){R21.deaths++;P.hp=stats().hp;hero.st='idle';}};
   setHunt(true);},id);
  let res;for(let i=0;i<240;i++){await pg.waitForTimeout(1000);
   res=await pg.evaluate(()=>{const B=S2.bs,e=B&&B.e;while(talk)nextLine();if(!hunt)setHunt(true);
    // 세르카 3단계 보호막은 화로 켜기(사람이 하는 일)로 바로 처리
    if(S2.sk&&S2.sk.sh)S2.sk.brz=[1,1,1];
    if(e&&e.sup){return {done:1,win:1};}
    if(!e||e.st==='dead'||!mobs.includes(e))return {done:1,win:1};return {done:0,hp:e.hp,max:e.m.hp};});
   if(res.done)break;}
  const r=await pg.evaluate(()=>({sec:Math.round((performance.now()-R21.t0)/1000),deaths:R21.deaths,hits:R21.hits,avgHit:Math.round(R21.dmg/Math.max(1,R21.hits)),maxHit:R21.maxHit,heroHp:stats().hp}));
  out.push(Object.assign({boss:id,lv},st,r,res));console.log(JSON.stringify(out[out.length-1]));
  await pg.evaluate(()=>{setHunt(false);S2.bs=null;S2.sk=null;S2.tg.length=0;});}
},{});
