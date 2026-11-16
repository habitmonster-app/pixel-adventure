// ----- 지역 이동: 왕성 광장 남동쪽 수로문(남문) ↔ 흑수늪 입구 ↔ 독버섯 숲 ↔ 침수 정화성소 ↔ 폐쇄 왕실 연구소 ↔ 독뿌리 심장부 -----
const GATE72S=[1309,56];
{const A=R3x('D161'),B=R3x('D171'),C=R3x('D181'),D=R3x('D191'),E=R3x('D201');
 const L=(a,at,to,land,n,cond,why,band)=>LINK5.push({a,at,to,land,n,cond:cond||(()=>1),why,band,m3:1});
 const fight=()=>!(G3.bs&&G3.bs.on)&&!S2.wave;const fw=()=>'싸움 중에는 나갈 수 없어요';
 if(A.west){
  L('D72',GATE72S,'D161',A.entry,'왕성 남문 · 흑수늪',()=>s3Open()&&!!(g3().ria16||P.ch16),()=>s3Open()?'먼저 남문 앞 리아를 만나요':'남문 수로길은 두 번째 마계문을 봉인한 뒤에 열려요');
  L('D161',A.west,'D72',[1306,55],'왕성 중앙 광장 · 남동쪽 수로문',fight,fw,[A.west[1]-1,A.west[1]+1]);
  L('D161',A.east,'D171',B.entry,'독버섯 숲',()=>!!(g3().boss16||P.ch16),()=>'독버섯 숲으로 가는 길은 맹독 늪지기 크라그가 막고 있어요',[A.east[1]-1,A.east[1]+1]);
  L('D171',B.west,'D161',A.eastin,'흑수늪 입구',fight,fw,[B.west[1]-1,B.west[1]+1]);
  L('D171',B.east,'D181',C.entry,'침수 정화성소',()=>!!(g3().boss17||P.ch17),()=>'성소로 가는 길은 포자 덩굴에 막혀 있어요. 포자여왕 미셀라를 먼저 쓰러뜨려요',[B.east[1]-1,B.east[1]+1]);
  L('D181',C.west,'D171',B.eastin,'독버섯 숲',fight,fw,[C.west[1]-1,C.west[1]+1]);
  L('D181',C.east,'D191',D.entry,'폐쇄 왕실 연구소',()=>!!(g3().boss18||P.ch18),()=>'왕실 인장이 새겨진 문이 닫혀 있어요. 벨드락을 먼저 잠재워요',[C.east[1]-1,C.east[1]+1]);
  L('D191',D.west,'D181',C.eastin,'침수 정화성소',fight,fw,[D.west[1]-1,D.west[1]+1]);
  L('D191',D.east,'D201',E.entry,'독뿌리 심장부',()=>!!(g3().boss19||P.ch19),()=>'융합실 너머 통로는 바르곤이 막고 있어요',[D.east[1]-1,D.east[1]+1]);
  L('D201',E.west,'D191',D.eastin,'폐쇄 왕실 연구소',fight,fw,[E.west[1]-1,E.west[1]+1]);}}
const G3G={D72:['D161'],D161:['D72','D171'],D171:['D161','D181'],D181:['D171','D191'],D191:['D181','D201'],D201:['D191']};
function hop3(from,to){if(from===to)return null;const prev={[from]:null},Q=[from];while(Q.length){const c=Q.shift();if(c===to)break;for(const n of G3G[c]||[])if(!(n in prev)){prev[n]=c;Q.push(n);}}
 if(!(to in prev))return null;let c=to;while(prev[c]!==from)c=prev[c];return LINK5.find(l=>l.m3&&l.a===from&&l.to===c);}
const _go5S3=go5;go5=function(t){if(!P)return;const t3=!!(t.rid&&S3ID.includes(t.rid));
 if(!t3&&!in3())return _go5S3(t);
 S5.pend=null;
 if(!in3()){if(!s3Open())return hint3('남문 수로길은 두 번째 마계문을 봉인한 뒤에 열려요');if(!G3.qt)G3.pend=t;
  if(RGN.cur==='D72')return goTo({n:'왕성 남동쪽 수로문 ('+t.n+' 쪽)',x:GATE72S[0]-MAP.cx,y:GATE72S[1]-MAP.cy,q5:1});
  return _go5S3({rid:'D72',x:GATE72S[0],y:GATE72S[1],n:'왕성 남동쪽 수로문 ('+t.n+' 쪽)'});}
 if(!t3){if(!G3.qt)G3.fin=t;const h=hop3(RGN.cur,'D72');if(!h)return;return goTo({n:h.n+' ('+(t.n||'목적지')+' 쪽)',x:Math.floor(h.at[0])-MAP.cx,y:Math.floor(h.at[1])-MAP.cy,q5:1});}
 let tx=t.x,ty=t.y,nm=t.n,h=null;
 if(RGN.cur!==t.rid){h=hop3(RGN.cur,t.rid);if(!h)return;if(!h.cond()){hint3(h.why?h.why():'아직 갈 수 없어요');return;}tx=h.at[0];ty=h.at[1];nm=h.n+' ('+t.n+' 쪽)';if(!G3.qt)S5.pend=t;}
 goTo({n:nm,x:Math.floor(tx)-MAP.cx,y:Math.floor(ty)-MAP.cy,q5:1});};
const _qtS3=questTarget;questTarget=function(){G3.qt=1;try{return _qtS3();}finally{G3.qt=0;}};
const _goToS3=goTo;goTo=function(p){if(!p)return _goToS3(p);
 if(!p.q5&&p.r5&&S3ID.includes(String(p.r5)))return go5({rid:p.r5,x:p.x+MAP.cx,y:p.y+MAP.cy,n:p.s||p.n});
 if(in3()&&!p.q5){if(!G3.qt)G3.fin=p;const h=hop3(RGN.cur,'D72');if(!h)return;return _goToS3({n:h.n+' ('+(p.s||p.n||'목적지')+' 쪽)',x:Math.floor(h.at[0])-MAP.cx,y:Math.floor(h.at[1])-MAP.cy,q5:1});}
 _goToS3(p);};
function tele3(x,y,n){linkGo5({land:[x,y],n});}
const home3=()=>{if(G3.bs&&G3.bs.on||S2.wave)return hint3('싸움 중에는 돌아갈 수 없어요');tele3(1264,39,'왕성 중앙 광장');};

// ----- 움직이는 그림 · 막힘 -----
const bzOn=i=>!!g3()['bz'+i],tcOn=i=>!!g3()['tc'+i],ppOn=i=>!!g3()['pil'+i],ftOn=()=>!!g3().door19,stOn=i=>{const k=G3.mk;if(k&&k.sh)return !!k.st[i];return !!g3()['st'+i];};
function dyn3(key){const f=g3(),r=RGN.cur,n=key.replace(/\D/g,'');
 if(key==='camp')return 1;
 if(r==='D161'){if(key.startsWith('bz'))return bzOn(+n)?1:0;if(key.startsWith('sc'))return f['sc'+n]?1:0;}
 if(r==='D171'){if(key.startsWith('tc'))return tcOn(+n)?1:0;if(key.startsWith('gt'))return f['gt'+n]?1:0;if(key.startsWith('pd'))return f['pd'+n]?1:0;}
 if(r==='D181'){if(key.startsWith('pp'))return ppOn(+n)?1:0;if(key.startsWith('sl'))return f['sl'+n]?1:0;if(key.startsWith('tb'))return f['tb'+n]?1:0;if(key==='gate')return gateOpen3('D181')?1:0;}
 if(r==='D191'){if(key==='door')return f.door19?1:0;if(key.startsWith('ft'))return ftOn()?1:0;if(key.startsWith('lg'))return f['lg'+n]?1:0;if(key.startsWith('sw'))return f['sw'+n]?1:0;
  if(key.startsWith('ce'))return f['ce'+n]?1:0;if(key.startsWith('vt'))return f['vt'+n]?1:0;if(key.startsWith('co'))return f['co'+n]?1:0;if(key==='gate')return gateOpen3('D191')?1:0;}
 if(r==='D201'){if(key==='door'||key==='altar')return f.seal20?1:0;if(key.startsWith('st'))return stOn(+n)?1:0;if(key.startsWith('ht'))return f.seal20?1:0;if(key==='gate')return gateOpen3('D201')?1:0;}
 return 0;}
const bossLock3=()=>!!(G3.bs&&G3.bs.e&&G3.bs.e.st!=='dead'&&G3.bs.on);
function gateOpen3(id){const f=g3();if(id==='D181')return !!(f.pil0&&f.pil1&&f.pil2)||!!P.ch18;if(id==='D191')return (!!(f.co0&&f.co1)||!!P.ch19)&&!bossLock3();
 if(id==='D201')return !!(f.kai20&&f.ria20&&f.lum20&&f.ner20)&&!bossLock3();return true;}
function dynSync3(){for(const o of G3.dyn){const i=MAP.obj.indexOf(o);if(i>=0)MAP.obj.splice(i,1);}G3.dyn.length=0;if(!in3()||!P)return;
 for(const d of (R3x(RGN.cur).dyn2||[])){const on=dyn3(d[0]),nm=on?d[2]:d[1];if(!nm||!MAP.rect[nm])continue;const r0=MAP.rect[d[1]||d[2]],r1=MAP.rect[nm];
  const o=[nm,d[3]+Math.round((r0[2]-r1[2])/2),d[4]];o.d3=d[0];G3.dyn.push(o);}
 for(const o of G3.dyn){let i=MAP.obj.findIndex(x=>x[2]>o[2]);if(i<0)i=MAP.obj.length;MAP.obj.splice(i,0,o);}}
function solidSync3(){if(!P)return;const g=(r,open)=>{if(!r)return;for(let y=r[1];y<=r[3];y++)for(let x=r[0];x<=r[2];x++)setSol5(x,y,open?'0':'1');};
 const C=R3x('D181'),D=R3x('D191'),E=R3x('D201');if(!C.gate)return;g(C.gate,gateOpen3('D181'));g(D.dgate,!!g3().door19);g(D.gate,gateOpen3('D191'));g(E.gate,gateOpen3('D201'));}
function unstick3(){if(!blocked(hero,hero.x,hero.y))return;const tx=Math.floor(hero.x/TS),ty=Math.floor(hero.y/TS);
 for(let r=1;r<10;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;const x=tx5(tx+dx),y=ty5(ty+dy);if(!isS(tx+dx,ty+dy)&&!blocked(hero,x,y)){hero.x=P.x=x;hero.y=P.y=y;return;}}}
function sync3(){solidSync3();dynSync3();spSync5();unstick3();}
const _solidSyncS3=solidSync5;solidSync5=function(){_solidSyncS3();solidSync3();};
function inCamp3(x,y,m=0){if(!in3())return false;const r=R3x(RGN.cur).safe;if(!r)return false;const tx=x/TS,ty=y/TS;return tx>=r[0]-m&&tx<=r[2]+1+m&&ty>=r[1]-m&&ty<=r[3]+1+m;}
const _mobListAtS3=mobListAt;mobListAt=function(x,y){if(!in3())return _mobListAtS3(x,y);if(!P||x<RG.x0+24||x>=RG.x1-24)return null;if(inCamp3(x,y,3))return null;const tx=x/TS,ty=y/TS,r=R3x(RGN.cur);
 for(const l of LINK5)if(l.a===RGN.cur&&Math.hypot(tx-l.at[0],ty-l.at[1])<6)return null;
 if(RGN.cur==='D201'){if(g3().talk20&&!g3().seal20)return null;}else if(r.arena&&Math.hypot(tx-r.arena[0],ty-r.arena[1])<r.arena[2]+3)return null;
 for(const z of (r.zones||[]))if(tx>=z[0]&&tx<=z[2]+1&&ty>=z[1]&&ty<=z[3]+1)return {L:z[4],zx:[z[0]*TS,(z[2]+1)*TS]};return null;};

// ----- 정화 안전지대 (모닥불·정화 화로·횃불·기둥·필터·봉인석) · 독안개 -----
// 안전지대 안: 환경 독안개에 안 걸리고, 이미 걸린 일반 독(1단계)은 바로 풀려요. 보스가 직접 맞혀 거는 독은 그대로 (공격을 피해야 해요)
const SAFE3=6;
function safes3(){const r=R3x(RGN.cur),L=[];if(r.camp)L.push([r.camp[0],r.camp[1]+1]);
 if(RGN.cur==='D161')r.braz.forEach((b,i)=>bzOn(i)&&L.push(b));
 if(RGN.cur==='D171')r.torches.forEach((b,i)=>tcOn(i)&&L.push(b));
 if(RGN.cur==='D181')r.pils.forEach((b,i)=>ppOn(i)&&L.push(b));
 if(RGN.cur==='D191'&&ftOn())r.flts.forEach(b=>L.push(b));
 if(RGN.cur==='D201')r.stones.forEach((b,i)=>stOn(i)&&L.push(b));return L;}
const inSafe3=(x,y)=>in3()&&(inCamp3(x,y)||safes3().some(b=>Math.hypot(x/TS-b[0]-.5,(y/TS-b[1]-.5)*1.15)<SAFE3));
const FOGCLR3={D161:'boss16',D171:'boss17',D181:'boss18',D191:'boss19',D201:'seal20'};
function fogRects3(){const r=R3x(RGN.cur),f=g3();if(!r.fog||f[FOGCLR3[RGN.cur]])return [];return r.fog;}
const inFog3=(x,y)=>{const tx=x/TS,ty=y/TS;return fogRects3().some(c=>tx>=c[0]&&tx<=c[2]+1&&ty>=c[1]&&ty<=c[3]+1);};
function fogTick3(dt){if(!in3()||G3.end||hero.st==='dead')return;const t=now();
 if(PSN&&(PSN.tier|0)<=1&&inSafe3(hero.x,hero.y)){PSN=null;pop(hero.x,hero.y-60,'정화!','#9ef07a');}
 G3.fogT-=dt;const mg=G3.mk&&G3.mk.ph===2;
 if(G3.fogT>0)return;G3.fogT=mg?rnd(3.5,4.5):rnd(6,8);
 const inF=inFog3(hero.x,hero.y)||(mg&&RGN.cur==='D201');
 if(!inF||inSafe3(hero.x,hero.y)||G3.safeT>0||t<PSN_IMM)return;
 pop(hero.x,hero.y-80,'독안개!','#9ef07a');psnApply84(Math.max(1,stats().hp*.0125),1,8);}
