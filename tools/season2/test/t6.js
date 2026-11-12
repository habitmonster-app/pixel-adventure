require('./h.js')(async(pg)=>{
 const r=await pg.evaluate(()=>{const out={};
 const mk=(cls,setRe,r,e)=>{P.cls=cls;P.lv=50;P.eq={};const best={};
  for(const b of Object.keys(GEAR)){if(b.includes('~'))continue;const g=GEAR[b];if(!g||!g.s)continue;try{if(!canWear(P,b))continue;}catch(x){continue;}const L=lvOf81(b);if(L>50)continue;const sc=L*1000+(g.atk||0)+(g.def||0)+(g.hp||0)/5;if(!best[g.s]||sc>best[g.s][1])best[g.s]=[b,sc];}
  for(const s in best){const b=best[s][0],id=newId81(b);reg81(id,{b,r,l:50,o:[],lk:0,v:1,src:'test'});P.bag[id]=1;P.enh[id]=e;P.eq[s]=id;}
  const s=stats();return {eq:Object.values(best).map(x=>x[0]).join(','),hp:s.hp,def:s.def,atk:s.atk,dr:s.dr,dodge:s.dodge,mdr:s.mdr};};
 const red=d=>{const s=stats();return Math.round(d*100/(100+s.def*2.5)*(1-(s.dr||0)/100)*(1-((s.mdr||0))/100));};
 const mobsK=['royal10','versh','s2rat','s2wolf','s2gob','s2sol','s2mk','s2horn','s2brak','s2arbos','s2leorn','serka'];
 for(const [cls,r,e] of [['warrior',4,6],['warrior',5,7],['rogue',5,7],['mage',5,7]]){const o=mk(cls,null,r,e);o.hitPct={};for(const k of mobsK)o.hitPct[k]=Math.round(red(MOB[k].atk)/o.hp*100)+'%';out[cls+'_r'+r+'+'+e]=o;}
 // 시즌2 장비로 바꾸면
 P.cls='warrior';P.lv=55;for(const [k,,,s] of S2G){if(!GEAR[k])continue;try{if(!canWear(P,k))continue;}catch(x){continue;}const id=newId81(k);reg81(id,{b:k,r:4,l:55,o:[],lk:0,v:1,src:'test'});P.bag[id]=1;P.enh[id]=3;P.eq[s]=id;}
 const s=stats();out.warrior_s2gear_r4p3={hp:s.hp,def:s.def,atk:s.atk,serka:Math.round(red(MOB.serka.atk)/s.hp*100)+'%',rat:Math.round(red(MOB.s2rat.atk)/s.hp*100)+'%'};
 const m={};for(const k of mobsK)m[k]=[MOB[k].lv,MOB[k].hp,MOB[k].atk,MOB[k].ex];out.mob=m;return out;});
 console.log(JSON.stringify(r,null,1));
});
