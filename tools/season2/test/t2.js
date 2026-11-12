require('./h.js')(async(pg,errs)=>{
 console.log(await pg.evaluate(()=>{
  const o={};o.m10=Object.keys(MOB).filter(k=>MOB[k].lv>=45&&MOB[k].lv<=50).map(k=>[k,MOB[k].n,MOB[k].lv,MOB[k].hp,MOB[k].atk,MOB[k].ex,MOB[k].boss?'B':MOB[k].elite?'E':''].join('/'));
  o.gear=Object.keys(GEAR).filter(k=>(GEAR[k].lv||0)>=44).map(k=>[k,GEAR[k].n,GEAR[k].lv,GEAR[k].slot,GEAR[k].atk||'',GEAR[k].def||'',GEAR[k].hp||'',GEAR[k].gr||GEAR[k].rar||'',GEAR[k].cls||''].join('/'));
  o.pk=Object.keys(P);o.eq=P.eq;o.fn=['statOf','stats','calcStat','heroAtk','maxHp','ST'].filter(f=>{try{return typeof eval(f)!=='undefined'}catch(e){return false}});
  return JSON.stringify(o,null,0);}));
});
