// ----- 지역 이동: 왕성 광장 북서쪽 뒷길(북문) ↔ 서리길 ↔ 서리항 ↔ 은백림 ↔ 빙정성채 ↔ 빙월협곡 -----
const GATE72=[1224,3];
{const A=R2('D111'),B=R2('D121'),C=R2('D131'),D=R2('D141'),E=R2('D151');
 const L=(a,at,to,land,n,cond,why,band)=>LINK5.push({a,at,to,land,n,cond:cond||(()=>1),why,band,m2:1});
 const fight=()=>!S2.bs&&!S2.wave;const fw=()=>'싸움 중에는 나갈 수 없어요';
 if(A.west){
  L('D72',GATE72,'D111',A.entry,'왕성 북문 · 서리길',()=>s2Open()&&!!(f2().ria11||P.ch11),()=>s2Open()?'먼저 왕성 광장 분수 곁의 리아를 만나요':'북문은 첫 번째 마계문을 봉인한 뒤에 열려요');
  L('D111',A.west,'D72',[1217,4],'왕성 중앙 광장 · 북서쪽 뒷길',fight,fw,[A.west[1]-1,A.west[1]+1]);
  L('D111',A.east,'D121',B.entry,'서리항',()=>!!(f2().boss11||P.ch11),()=>'서리항으로 가는 길은 서리뿔 우두머리가 막고 있어요',[A.east[1]-1,A.east[1]+1]);
  L('D121',B.west,'D111',A.eastin,'서리길',fight,fw,[B.west[1]-1,B.west[1]+1]);
  L('D121',B.east,'D131',C.entry,'은백림',()=>!!(f2().boss12||P.ch12),()=>'은백림으로 가는 길은 얼어붙어 있어요. 서리항의 일을 먼저 끝내요',[B.east[1]-1,B.east[1]+1]);
  L('D131',C.west,'D121',B.eastin,'서리항',fight,fw,[C.west[1]-1,C.west[1]+1]);
  L('D131',C.east,'D141',D.entry,'빙정성채',()=>!!(f2().boss13||P.ch13),()=>'빙정성채로 가는 길은 서리뿌리 고목이 막고 있어요',[C.east[1]-1,C.east[1]+1]);
  L('D141',D.west,'D131',C.eastin,'은백림',fight,fw,[D.west[1]-1,D.west[1]+1]);
  L('D141',D.east,'D151',E.entry,'빙월협곡',()=>!!(f2().boss14||P.ch14),()=>'성채 안쪽 문은 빙정 기사장이 지키고 있어요',[D.east[1]-1,D.east[1]+1]);
  L('D151',E.west,'D141',D.eastin,'빙정성채',fight,fw,[E.west[1]-1,E.west[1]+1]);}}
const G2={D72:['D111'],D111:['D72','D121'],D121:['D111','D131'],D131:['D121','D141'],D141:['D131','D151'],D151:['D141']};
function hop2(from,to){if(from===to)return null;const prev={[from]:null},Q=[from];while(Q.length){const c=Q.shift();if(c===to)break;for(const n of G2[c]||[])if(!(n in prev)){prev[n]=c;Q.push(n);}}
 if(!(to in prev))return null;let c=to;while(prev[c]!==from)c=prev[c];return LINK5.find(l=>l.m2&&l.a===from&&l.to===c);}
const _go5S2=go5;go5=function(t){if(!P)return;const t2=!!(t.rid&&S2ID.includes(t.rid));
 if(!t2&&!in2())return _go5S2(t);
 S5.pend=null;
 if(!in2()){if(!s2Open())return hint2('북문은 첫 번째 마계문을 봉인한 뒤에 열려요');if(!S2.qt)S2.pend=t;
  if(RGN.cur==='D72')return goTo({n:'왕성 북서쪽 뒷길 ('+t.n+' 쪽)',x:GATE72[0]-MAP.cx,y:GATE72[1]-MAP.cy,q5:1});
  return _go5S2({rid:'D72',x:GATE72[0],y:GATE72[1],n:'왕성 북서쪽 뒷길 ('+t.n+' 쪽)'});}
 if(!t2){if(!S2.qt)S2.fin=t;const h=hop2(RGN.cur,'D72');if(!h)return;return goTo({n:h.n+' ('+(t.n||'목적지')+' 쪽)',x:Math.floor(h.at[0])-MAP.cx,y:Math.floor(h.at[1])-MAP.cy,q5:1});}
 let tx=t.x,ty=t.y,nm=t.n,h=null;
 if(RGN.cur!==t.rid){h=hop2(RGN.cur,t.rid);if(!h)return;if(!h.cond()){hint2(h.why?h.why():'아직 갈 수 없어요');return;}tx=h.at[0];ty=h.at[1];nm=h.n+' ('+t.n+' 쪽)';if(!S2.qt)S5.pend=t;}
 goTo({n:nm,x:Math.floor(tx)-MAP.cx,y:Math.floor(ty)-MAP.cy,q5:1});};
const _qtS2=questTarget;questTarget=function(){S2.qt=1;try{return _qtS2();}finally{S2.qt=0;}};
const _goToS2=goTo;goTo=function(p){if(!p)return _goToS2(p);
 if(!p.q5&&p.r5&&S2ID.includes(String(p.r5)))return go5({rid:p.r5,x:p.x+MAP.cx,y:p.y+MAP.cy,n:p.s||p.n});
 if(in2()&&!p.q5){if(!S2.qt)S2.fin=p;const h=hop2(RGN.cur,'D72');if(!h)return;return _goToS2({n:h.n+' ('+(p.s||p.n||'목적지')+' 쪽)',x:Math.floor(h.at[0])-MAP.cx,y:Math.floor(h.at[1])-MAP.cy,q5:1});}
 _goToS2(p);};
function tele2(x,y,n){linkGo5({land:[x,y],n});}

// ----- 움직이는 그림 · 막힘 -----
function dyn2(key){const f=f2(),r=RGN.cur,n=key.replace(/\D/g,'');
 if(key==='camp')return 1;
 if(r==='D111'){if(key.startsWith('bc'))return f['abc'+n]?1:0;if(key.startsWith('wd'))return f['wd'+n]?1:0;if(key.startsWith('sc'))return f['sc'+n]?1:0;}
 if(r==='D121'){if(key.startsWith('fr'))return f['bfr'+n]?1:0;if(key.startsWith('pr'))return f['pr'+n]?1:0;if(key.startsWith('oil'))return f['oil'+n]?1:0;if(key.startsWith('box'))return f['box'+n]?1:0;}
 if(r==='D131'){if(key.startsWith('bc'))return f['cbc'+n]?1:0;if(key.startsWith('ms'))return f['ms'+n]?1:0;if(key.startsWith('dr'))return f['dr'+n]?1:0;if(key.startsWith('sl'))return f['sl'+n]?1:0;}
 if(r==='D141'){if(key.startsWith('cn'))return f['cn'+n]?1:0;if(key.startsWith('pl'))return f['pl'+n]?1:0;if(key.startsWith('cl'))return f['cl'+n]?1:0;if(key==='gdev')return f.gdev14?1:0;
  if(key==='gate1')return f.gdev14?1:0;if(key==='gate')return f.pl0&&f.pl1&&f.pl2&&!bossLock2()?1:0;}
 if(r==='D151'){const k=S2.sk;if(key==='door'||key==='altar')return f.seal15?1:0;if(key.startsWith('st'))return f['st'+n]?1:0;if(key==='gate')return f.kai15&&f.ria15&&f.lum15&&!(S2.bs&&S2.bs.on)?1:0;
  if(key.startsWith('lp'))return k&&k.brz?(k.brz[+n]?1:0):1;if(key.startsWith('mr'))return k&&k.ph===2?1:0;}
 return 0;}
function dynSync2(){for(const o of S2.dyn){const i=MAP.obj.indexOf(o);if(i>=0)MAP.obj.splice(i,1);}S2.dyn.length=0;if(!in2()||!P)return;
 for(const d of (R2(RGN.cur).dyn2||[])){const on=dyn2(d[0]),nm=on?d[2]:d[1];if(!nm||!MAP.rect[nm])continue;const r0=MAP.rect[d[1]||d[2]],r1=MAP.rect[nm];
  const o=[nm,d[3]+Math.round((r0[2]-r1[2])/2),d[4]];o.d2=d[0];S2.dyn.push(o);}
 for(const o of S2.dyn){let i=MAP.obj.findIndex(x=>x[2]>o[2]);if(i<0)i=MAP.obj.length;MAP.obj.splice(i,0,o);}}
function solidSync2(){if(!P)return;const g=(r,open)=>{if(!r)return;for(let y=r[1];y<=r[3];y++)for(let x=r[0];x<=r[2];x++)setSol5(x,y,open?'0':'1');};
 const f=f2(),D=R2('D141'),E=R2('D151');if(!D.gate)return;g(D.gate1,!!f.gdev14);g(D.gate,!!(f.pl0&&f.pl1&&f.pl2)&&!bossLock2());g(E.gate,!!(f.kai15&&f.ria15&&f.lum15)&&!(S2.bs&&S2.bs.on));}
function unstick2(){if(!blocked(hero,hero.x,hero.y))return;const tx=Math.floor(hero.x/TS),ty=Math.floor(hero.y/TS);
 for(let r=1;r<10;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;const x=tx5(tx+dx),y=ty5(ty+dy);if(!isS(tx+dx,ty+dy)&&!blocked(hero,x,y)){hero.x=P.x=x;hero.y=P.y=y;return;}}}
function sync2(){solidSync2();dynSync2();spSync5();unstick2();}
const _solidSyncS2=solidSync5;solidSync5=function(){_solidSyncS2();solidSync2();};
const bossLock2=()=>!!(S2.bs&&S2.bs.e&&S2.bs.e.st!=='dead'&&S2.bs.on);
function inSafe2(x,y,m=0){if(!in2())return false;const r=R2(RGN.cur).safe;if(!r)return false;const tx=x/TS,ty=y/TS;return tx>=r[0]-m&&tx<=r[2]+1+m&&ty>=r[1]-m&&ty<=r[3]+1+m;}
const _mobListAtS2=mobListAt;mobListAt=function(x,y){if(!in2())return _mobListAtS2(x,y);if(!P||x<RG.x0+24||x>=RG.x1-24)return null;if(inSafe2(x,y,3))return null;const tx=x/TS,ty=y/TS,r=R2(RGN.cur);
 for(const l of LINK5)if(l.a===RGN.cur&&Math.hypot(tx-l.at[0],ty-l.at[1])<6)return null;
 if(RGN.cur==='D151'){if(f2().talk15)return null;}else if(r.arena&&Math.hypot(tx-r.arena[0],ty-r.arena[1])<r.arena[2]+3)return null;
 for(const z of (r.zones||[]))if(tx>=z[0]&&tx<=z[2]+1&&ty>=z[1]&&ty<=z[3]+1)return {L:z[4],zx:[z[0]*TS,(z[2]+1)*TS]};return null;};

// ----- 따뜻한 자리 (모닥불·켜진 봉화 둘레) · 빙결 지대 · 빙판 -----
function fires2(){const r=R2(RGN.cur),f=f2(),L=[];if(r.camp)L.push([r.camp[0],r.camp[1]+1]);
 if(RGN.cur==='D111')r.beacons.forEach((b,i)=>f['abc'+i]&&L.push(b));if(RGN.cur==='D121')r.fires.forEach((b,i)=>f['bfr'+i]&&L.push(b));
 if(RGN.cur==='D131')r.beacons.forEach((b,i)=>f['cbc'+i]&&L.push(b));return L;}
const WARM2=6.5;
const warm2=(x,y)=>fires2().some(b=>Math.hypot(x/TS-b[0]-.5,y/TS-b[1]-.5)<WARM2);
function coldRects2(){const r=R2(RGN.cur),f=f2();if(RGN.cur==='D131')return f.boss13?[]:(r.cold||[]);
 return [];}
const inCold2=(x,y)=>{const tx=x/TS,ty=y/TS;return coldRects2().some(c=>tx>=c[0]&&tx<=c[2]+1&&ty>=c[1]&&ty<=c[3]+1);};
function tg2(o){if(S2.tg.length<28)S2.tg.push(Object.assign({t:o.T},o));}
function tgHit2(e){const dx=hero.x-e.x,dy=hero.y-e.y;let hit=0;
 if(e.k==='c')hit=Math.hypot(dx,dy/.7)<e.r;
 else if(e.k==='f'){let g=Math.atan2(dy,dx)-e.a;g=Math.atan2(Math.sin(g),Math.cos(g));hit=Math.hypot(dx,dy)<e.r&&Math.abs(g)<e.arc/2+.1;}
 else if(e.k==='l'){const c=Math.cos(e.a),s=Math.sin(e.a),u=dx*c+dy*s,v=Math.abs(-dx*s+dy*c);hit=u>-10&&u<e.len&&v<e.w;}
 if(!hit)return 0;if(e.cold&&warm2(hero.x,hero.y)){pop(hero.x,hero.y-70,'불 곁이라 괜찮아요','#ffb070');return 0;}
 const h0=P.hp;f3Hit(hero.x,hero.y,5,e.dmg);if(e.cold&&P.hp<h0){S2.slowT=2.2;pop(hero.x,hero.y-76,'❄ 얼어붙음','#bfefff');}return 1;}
function coldTick2(dt){if(!in2()||S2.end||hero.st==='dead')return;S2.coldT-=dt;if(S2.coldT>0)return;S2.coldT=rnd(5.5,7.5);
 if(!inCold2(hero.x,hero.y)||warm2(hero.x,hero.y)||inSafe2(hero.x,hero.y))return;const A=1000;
 pop(hero.x,hero.y-80,'빙결 지대가 얼어붙어요!','#bfefff');
 tg2({k:'c',x:hero.x,y:hero.y,r:120,T:2.0,dmg:Math.round(A*.9),cold:1,label:'빙결',c:'150,220,255'});}
function iceTick2(dt){const lx=S2.lx,ly=S2.ly;S2.lx=hero.x;S2.ly=hero.y;if(!in2()||hero.st==='dead'||dt<=0||Math.hypot(hero.x-lx,hero.y-ly)>60){S2.vx=S2.vy=0;return;}
 if(S2.slowT>0){S2.slowT-=dt;const nx=lx+(hero.x-lx)*.5,ny=ly+(hero.y-ly)*.5;if(!blocked(hero,nx,ny)){hero.x=nx;hero.y=ny;}}
 if(RGN.cur!=='D121'||auto||!onIce2(hero.x,hero.y)){S2.vx=S2.vy=0;S2.lx=hero.x;S2.ly=hero.y;return;}
 const vx=(hero.x-lx)/dt,vy=(hero.y-ly)/dt,k=Math.min(1,dt*2.4);S2.vx+=(vx-S2.vx)*k;S2.vy+=(vy-S2.vy)*k;
 const nx=lx+S2.vx*dt,ny=ly+S2.vy*dt;
 if(!blocked(hero,nx,ly))hero.x=nx;else{hero.x=lx;S2.vx=0;}
 if(!blocked(hero,hero.x,ny))hero.y=ny;else{hero.y=ly;S2.vy=0;}
 S2.lx=hero.x;S2.ly=hero.y;}

