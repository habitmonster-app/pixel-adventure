// ----- 퀘스트 숫자 (처치 · 퀘스트 중 얻은 재료) -----
const KQ3={k_slime:['s3slime',5,'Q16_02','독진흙 슬라임'],k_mosq:['s3mosq',5,'Q16_02','검은늪 모기'],k_shroom:['s3shroom',6,'Q17_04','포자버섯'],
 k_ghost:['s3ghost',5,'Q18_01','부패 사제 잔영'],k_snake:['s3snake',6,'Q18_03','독수로 뱀'],k_hound:['s3hound',6,'Q20_02','역병 사냥개']};
const cnt3=k=>{const f=g3();if(KQ3[k])return (f.kc&&f.kc[k])|0;if(GQ3[k])return (f.gq&&f.gq[k])|0;return 0;};
const need3=k=>KQ3[k]?KQ3[k][1]:GQ3[k]?GQ3[k][1]:1;

// ----- 처치 보상 · 숫자 세기 -----
const DROP3={56:[['s3leaf',.12]],57:[['s3iron',.1],['s3spore',.04],['s3leaf',.06]],58:[['s3cry',.1],['s3iron',.08]],59:[['s3blk',.06],['s3cry',.08]],60:[['s3cry',.08],['s3blk',.06],['s3iron',.06]]};
const _onKillS3=onKill27;onKill27=function(m){_onKillS3(m);const id=m.m&&m.m.id;if(!id||!MOB[id]||m.dec3)return;if(!(ID3.includes(id)||m.b3||id==='s3zark'))return;
 const dr=(k,n)=>{addMat(k,n);pop(m.x,m.y-70+Math.random()*10,'+'+MAT[k].n+(n>1?' '+n:''),MAT[k].c);},R=Math.random,f=g3();
 for(const k in KQ3){const [mid,n,qid,nm]=KQ3[k];if(mid!==id||!qOn3(qid))continue;f.kc=f.kc||{};if((f.kc[k]|0)>=n)continue;f.kc[k]=(f.kc[k]|0)+1;if(f.kc[k]>=n)toast(nm+' '+n+'마리를 모두 쓰러뜨렸어요!','g');}
 if(!m.w2&&!m.w3&&ID3.includes(id)){for(const [k,p] of (DROP3[m.m.lv]||[]))if(R()<p){dr(k,1);break;}}
 if(id==='s3zark'){dr('s3spore',1);if(R()<.3)dr('s3spore',1);G3.hidT=300;toast('독뿌리 포식자 자르칸을 쓰러뜨렸어요 (5분 뒤 다시 나타나요)','g');}
 if(m.b3){const b=BOSS3[m.b3];G3.bs=null;S2.tg.length=0;G3.mk=null;
  if(m.mem){G3.memCd=600;P.gold+=3500;dr('s3cry',2);if(R()<.35)dr('s3core',1);toast('봉인의 기억: 모르가를 다시 이겼어요! 3500골드 · 정화수정 2','g');clearDec3();}
  else if(!f[b.flag]){f[b.flag]=1;for(const k in b.drop)dr(k,b.drop[k]);toast(b.win,'g');buildLights3();if(b.after)setTimeout(()=>sayAs(b.after[0],b.after.slice(1),()=>{qCheck();save();}),400);}
  sync3();}
 qCheck();save();};

// ----- 보스 (모든 큰 공격은 바닥에 먼저 표시 → 0.9초 넘게 기다렸다가 맞아요 · '독' 표시가 붙은 공격은 맞으면 강한 독) -----
const BOSS3={
 s3krag:{rid:'D161',at:'boss',flag:'boss16',q:'Q16_06',pat:['tail','charge','spit','pool'],cd:[3.2,4.2],drop:{s3blk:1,s3leaf:2},win:'맹독 늪지기 크라그를 쓰러뜨렸어요! 흑수늪의 독안개가 걷혀요',
  ready:()=>{const f=g3();return f.bz0&&f.bz1&&f.bz2;},
  intro:['맹독 늪지기 크라그','(검은 늪악어가 등의 독주머니를 부풀려요. 늪물이 끓어올라요!)','(꼬리를 들면 휘두르기, 몸을 낮추면 돌진이에요. 초록 표시는 맞으면 강한 독!)'],
  after:['남부 정찰대장 마렌','…크라그 목에 쇠 꼬리표가 박혀 있다.','\'검은 수정 생체 반응 실험… 남부 제2시험구역.\'','왕실 문양이 왜 여기서 나오는 거지?']},
 s3mic:{rid:'D171',at:'boss',flag:'boss17',q:'Q17_06',pat:['spore','roots','spit','nova'],cd:[3.2,4.2],drop:{s3spore:2,s3leaf:2},win:'포자여왕 미셀라가 시들었어요! 숲의 포자 흐름이 멈췄어요',
  intro:['포자여왕 미셀라','(거대한 흰 버섯 여왕이 갓을 펼쳐요. 땅 밑 균사가 꿈틀거려요)','…숲은 나의 것… 뿌리도, 숨도…']},
 s3beld:{rid:'D181',at:'boss',flag:'boss18',q:'Q18_06',pat:['stomp','line','shield','roots'],cd:[3.0,4.0],drop:{s3cry:2,s3iron:2},win:'부패 수호상 벨드락이 잠들었어요! 정화수가 다시 흘러요',
  intro:['부패 수호상 벨드락','(검은 뿌리에 감긴 석상이 몸을 일으켜요)','…성소를… 지킨다… 누구도… 들이지 않는다…','(방패를 들면 공격을 멈추고 반격을 피해요)']},
 s3varg:{rid:'D191',at:'boss',flag:'boss19',q:'Q19_06',pat:['charge','pool','fan','nova'],cd:[3.0,4.0],drop:{s3blk:2,s3cry:2},win:'흑수정 융합체 바르곤을 쓰러뜨렸어요! 세 번째 문으로 가는 통로가 열렸어요',
  intro:['흑수정 융합체 바르곤','(검은 수정이 박힌 거대한 몸이 배양액을 뚝뚝 흘리며 다가와요)','(초록 표시는 독, 붉은 표시는 큰 공격이에요. 멀리 피해요!)']},
 morga:{rid:'D201',at:'boss',flag:'seal20',q:'Q20_06',pat:[],cd:[2.6,3.4],drop:{},win:''}};
function clearDec3(){for(let i=mobs.length-1;i>=0;i--)if(mobs[i].dec3)mobs.splice(i,1);}
const mk0=()=>({ph:1,st:[1,1,1],sh:0,open:0,sumT:6,orbT:3});
function bsSpawn3(){if(G3.bs&&G3.bs.e&&mobs.includes(G3.bs.e)&&G3.bs.e.st!=='dead')return;G3.bs=null;G3.mk=null;clearDec3();if(!in3()||!P)return;const f=g3(),r=R3x(RGN.cur);
 for(const id in BOSS3){const b=BOSS3[id];if(b.rid!==RGN.cur)continue;const mem=id==='morga'&&G3.memGo;
  if(id==='morga'){if(!mem&&(f.seal20||!f.talk20))continue;}else if(f[b.flag]||!qOn3(b.q)||(b.ready&&!b.ready()))continue;
  const p=r[b.at],x=tx5(p[0]),y=ty5(p[1]),m=MOB[id];const e=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:9,cd:0});e.b3=id;e.mem=mem?1:0;e.d=2;
  if(id==='morga'){if(f.sup20&&!mem){e.hp=Math.round(m.hp*.1);e.sup=1;}G3.mk=mk0();for(let i=mobs.length-1;i>=0;i--)if(!mobs[i].b3&&!mobs[i].npc&&mobs[i].m&&ID3.includes(mobs[i].m.id))mobs.splice(i,1);}
  mobs.push(e);G3.bs={id,e,on:0,cd:2.5,said:0};G3.memGo=0;}}
function bsReset3(B,e){B.on=0;e.angry=0;S2.tg.length=0;e.x=e.hx;e.y=e.hy;const f=g3();
 if(B.id==='morga'){clearDec3();G3.mk=mk0();e.hp=f.sup20&&!e.mem?Math.round(e.m.hp*.1):e.m.hp;}else e.hp=e.m.hp;e.guard=0;e.sum=0;sync3();}
const PSNB3=()=>Math.max(1,stats().hp*.015);
function tg3(o){if(S2.tg.length<28)S2.tg.push(Object.assign({t:o.T},o));}
function bsTick3(dt){const B=G3.bs;if(!B||!B.e)return;const e=B.e,b=BOSS3[B.id],r=R3x(RGN.cur),A=e.m.atk;
 if(e.st==='dead'||!mobs.includes(e)){G3.bs=null;G3.mk=null;clearDec3();sync3();return;}
 const ax=tx5(r.arena[0]),ay=ty5(r.arena[1]),R=(r.arena[2]+2)*TS,inA=Math.hypot(hero.x-ax,hero.y-ay)<R;
 if(hero.st==='dead'){if(B.on)bsReset3(B,e);return;}
 if(e.sup){e.angry=0;e.hold=9;return;}
 if(!B.on){e.angry=0;e.hold=Math.max(e.hold||0,.2);e.cd=9;
  const ready=B.id==='morga'?(e.mem||qOn3('Q20_06')):true;
  if(inA&&!talk&&ready){B.on=1;B.cd=2.2;sync3();if(b.intro&&!B.said&&!e.mem){B.said=1;sayAs(b.intro[0],b.intro.slice(1));}
   else if(B.id==='morga'&&!B.said&&!e.mem){B.said=1;sayAs('역병사도 모르가',['이 문은 이미 뿌리를 내렸다!'],()=>sayAs('마족 문양 해독자 루미아',['봉인석이 버티고 있어요! 지금 싸워야 해요!']));}}return;}
 if(!inA&&Math.hypot(hero.x-ax,hero.y-ay)>R+8*TS){bsReset3(B,e);hint3('싸움터를 벗어나 보스가 제자리로 돌아갔어요');return;}
 if(talk){e.hold=Math.max(e.hold||0,.2);return;}
 if(Math.hypot(e.x-ax,e.y-ay)>R){e.x+=(ax-e.x)*.05;e.y+=(ay-e.y)*.05;}
 e.angry=1;if(B.id==='morga')return morgaTick3(dt,B,e,r,A);
 if(B.id==='s3mic'&&!e.sum&&e.hp/e.m.hp<.5){e.sum=1;pop(e.x,e.y-80,'포자버섯을 불러내요!','#e0b0ff');spawnNear3('s3shroom',e.x/TS-.5,e.y/TS-.5,2,1);}
 B.cd-=dt;if(B.cd>0)return;const ph=e.hp/e.m.hp<.5?.8:1;B.cd=rnd(b.cd[0],b.cd[1])*ph;
 const k=b.pat[Math.random()*b.pat.length|0];bAtk3(k,e,A,B);}
function bAtk3(k,e,A,B){const x=e.x,y=e.y,a=Math.atan2(hero.y-y,hero.x-x);e.d=dirTo(e,hero);try{gaSet2(e,k);}catch(_){}e.hold=Math.max(e.hold||0,.9);const live=()=>G3.bs===B&&B.on&&hero.st!=='dead';
 if(k==='fan'){pop(x,y-70,'크게 휘둘러요!','#ffd0a0');tg3({k:'f',x,y,a,r:140,arc:1.7,T:1.0,dmg:Math.round(A*1.25),c:'255,160,120'});}
 if(k==='tail'){pop(x,y-70,'꼬리를 휘둘러요!','#ffd0a0');tg3({k:'f',x,y,a,r:150,arc:2.6,T:1.05,dmg:Math.round(A*1.2),c:'255,160,120'});}
 if(k==='line'){pop(x,y-70,'돌진!','#ffd0a0');tg3({k:'l',x,y,a,len:440,w:30,T:1.1,dmg:Math.round(A*1.45),c:'255,150,110',on:()=>{const nx=x+Math.cos(a)*200,ny=y+Math.sin(a)*200;if(e.st!=='dead'&&!blocked(e,nx,ny)){e.x=nx;e.y=ny;}}});}
 if(k==='charge'){pop(x,y-70,'몸을 낮춰요! 옆으로 피해요','#ffd0a0');e.hold=1.6;tg3({k:'l',x,y,a,len:480,w:34,T:1.3,dmg:Math.round(A*1.5),c:'255,150,110',label:'돌진',on:()=>{for(let s=260;s>0;s-=20){const nx=x+Math.cos(a)*s,ny=y+Math.sin(a)*s;if(e.st!=='dead'&&!blocked(e,nx,ny)){e.x=nx;e.y=ny;break;}}}});}
 if(k==='stomp'){pop(x,y-70,'땅을 내리쳐요! 멀리!','#ffd0a0');e.hold=1.6;tg3({k:'c',x,y,r:150,T:1.4,dmg:Math.round(A*1.3),label:'멀리!',c:'255,150,110'});}
 if(k==='spit'){pop(x,y-70,'독액을 뿜어요!','#b0f080');tg3({k:'f',x,y,a,r:175,arc:1.2,T:1.05,dmg:Math.round(A*.9),psn:1,label:'독',c:'150,230,110'});}
 if(k==='pool'){pop(x,y-70,'독웅덩이가 솟아요!','#b0f080');for(let i=0;i<3;i++)setTimeout(()=>{if(live())tg3({k:'c',x:hero.x,y:hero.y,r:54,T:1.0,dmg:Math.round(A*.8),psn:1,c:'150,230,110'});},i*520);}
 if(k==='spore'){pop(x,y-70,'포자가 터져요!','#e0b0ff');for(let i=0;i<5;i++){const q=Math.random()*6.283,d=rnd(20,160);tg3({k:'c',x:hero.x+Math.cos(q)*d,y:hero.y+Math.sin(q)*d*.7,r:48,T:1.1+i*.13,dmg:Math.round(A*.85),psn:1,c:'150,230,110'});}}
 if(k==='roots'){pop(x,y-70,'뿌리가 솟아요!','#d0f0d0');for(let i=0;i<6;i++){const q=Math.random()*6.283,d=rnd(30,170);tg3({k:'c',x:hero.x+Math.cos(q)*d,y:hero.y+Math.sin(q)*d*.7,r:42,T:1.1+i*.12,dmg:Math.round(A*.9),c:'190,230,190'});}}
 if(k==='nova'){pop(x,y-70,'독 폭발! 멀리 피해요','#b0f080');e.hold=1.8;tg3({k:'c',x,y,r:200,T:1.7,dmg:Math.round(A*1.4),psn:1,label:'멀리!',c:'150,230,110'});}
 if(k==='shield'){pop(x,y-70,'방패를 들어요! 잠깐 공격을 멈춰요','#ffe08a');e.guard=2.2;e.hold=2.2;setTimeout(()=>{if(G3.bs===B&&B.on&&e.st!=='dead'){e.guard=0;pop(e.x,e.y-70,'반격!','#ffd0a0');tg3({k:'f',x:e.x,y:e.y,a:Math.atan2(hero.y-e.y,hero.x-e.x),r:150,arc:2.2,T:.95,dmg:Math.round(A*(e.gHit?1.6:1.1)),c:'255,200,120'});e.gHit=0;}},2200);}
 if(k==='big'){pop(x,y-74,'봉인 파괴! 크게 비켜요','#ff9a9a');e.hold=1.6;tg3({k:'l',x,y,a,len:560,w:44,T:1.5,dmg:Math.round(A*1.9),c:'255,120,140',label:'강한 일격',on:()=>{const k=G3.mk;if(!k||e.st==='dead')return;k.open=3.5;e.hold=3.5;pop(e.x,e.y-80,'빈틈! 지금 공격해요','#ffe08a');}});}
 if(k==='orb'){pop(x,y-74,'독구슬!','#b0f080');e.hold=Math.max(e.hold||0,1.2);for(let i=0;i<6;i++){const d=60+i*58;tg3({k:'c',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,r:44,T:.9+i*.14,dmg:Math.round(A*.95),psn:1,c:'150,230,110'});}}
 if(k==='gate'){pop(x,y-74,'문을 깨우는 주문! 가장자리로!','#ff9a9a');e.hold=2.2;tg3({k:'c',x,y,r:240,T:2.0,dmg:Math.round(A*1.7),psn:1,label:'멀리!',c:'255,120,140'});}}

// ----- 모르가 4단계 -----
// 1단계(100~70%): 독구슬 · 부채꼴 독안개 · 독뿌리
// 2단계(70~45%): 포자체 3마리 소환 · 원형 포자폭발 · 안전지대 밖 독안개가 짙어져요
// 3단계(45%): 흑수정 보호막 + 봉인석 3개 꺼짐 → 봉인석을 다시 켜면 보호막이 깨지고 기절
// 4단계: 봉인 파괴 일격 · 문 깨우기(큰 원) · 체력 10%에서 쓰러지지 않고 '제압' → 가운데 제단에서 봉인구 사용
function morgaTick3(dt,B,e,r,A){const k=G3.mk||(G3.mk=mk0()),hp=e.hp/e.m.hp;
 if(k.open>0){k.open-=dt;e.hold=Math.max(e.hold||0,.2);if(k.open>0)return;}
 if(k.ph===1&&hp<=.7){k.ph=2;S2.tg.length=0;burst(e.x,e.y-40,'#9ef07a',30,170,2,50);
  sayAs('역병사도 모르가',['포자여, 정원을 덮어라.','(검은 뿌리 심장에서 역병 포자체가 솟아요. 봉인석 곁을 벗어나면 독안개가 짙어요!)']);
  for(const h of r.hearts){const m=Object.assign({},MOB.s3spore,{ex:Math.round(MOB.s3spore.ex*.3)}),x=tx5(h[0]),y=ty5(h[1]+1);const d=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:0,cd:1});d.dec3=1;d.w3=1;d.angry=1;mobs.push(d);burst(x,y-20,'#9ef07a',10,80,2,20);}sync3();return;}
 if(k.ph===2&&hp<=.45){k.ph=3;clearDec3();S2.tg.length=0;k.sh=1;k.st=[0,0,0];try{gaSet2(e,'shield');}catch(_){}burst(e.x,e.y-40,'#a080d0',36,190,2,60);
  sayAs('역병사도 모르가',['보아라. 너희 왕실이 심은 검은 수정의 힘을.','(모르가가 흑수정 보호막을 둘렀어요. 정화 봉인석 세 개가 꺼졌어요. 봉인석을 다시 켜면 보호막이 깨져요!)']);sync3();buildLights3();return;}
 if(k.ph===3&&k.sh&&k.st.every(Boolean)){k.sh=0;k.ph=4;k.open=4;e.hold=4;S2.tg.length=0;burst(e.x,e.y-40,'#9ef07a',40,200,2,70);shake=Math.max(shake,4);pop(e.x,e.y-90,'보호막이 깨졌어요! 기절!','#ffe08a');
  sayAs('역병사도 모르가',['…문을 깨운다. 너희가 닫기 전에!']);sync3();buildLights3();return;}
 if(k.ph===2){k.sumT-=dt;if(k.sumT<=0){k.sumT=12;const live=mobs.filter(m=>m.dec3&&m.st!=='dead').length;if(live<3){const h=r.hearts[Math.random()*3|0],m=Object.assign({},MOB.s3spore,{ex:Math.round(MOB.s3spore.ex*.3)}),x=tx5(h[0]),y=ty5(h[1]+1);const d=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:0,cd:1});d.dec3=1;d.w3=1;d.angry=1;mobs.push(d);}}}
 B.cd-=dt;if(B.cd>0)return;B.cd=rnd(2.3,3.0)*(k.ph===4?.9:1)+(k.sh?1.0:0);
 const L=k.ph===1?['orb','spit','roots']:k.ph===2?['spore','nova','orb']:k.sh?['spit','spore']:['big','gate','spit','big','roots'];bAtk3(L[Math.random()*L.length|0],e,A,B);}
const _hurtS3=hurt;hurt=function(m,dmg){
 if(m&&m.b3==='morga'&&m.st!=='dead'){const k=G3.mk,f=g3();if(m.sup)return;
  if(k&&k.sh){pop(m.x,m.y-70,'보호막! 봉인석 3개를 다시 켜요','#c0a0ff');return;}
  if(k&&k.open>0)dmg=Math.round(dmg*1.5);
  const lim=Math.round(m.m.hp*.1);if(!m.mem&&m.hp-dmg<lim){dmg=Math.max(0,m.hp-lim);_hurtS3(m,dmg);m.hp=lim;if(!f.sup20)sup3(m);return;}}
 if(m&&m.b3==='s3beld'&&m.guard>0){m.gHit=1;pop(m.x,m.y-70,'방패로 막았어요!','#ffe08a');dmg=Math.round(dmg*.2);}
 return _hurtS3(m,dmg);};
function sup3(e){const f=g3();f.sup20=1;e.sup=1;e.angry=0;e.hold=99;S2.tg.length=0;clearDec3();if(G3.mk)G3.mk.sh=0;if(G3.bs)G3.bs.on=0;burst(e.x,e.y-40,'#9ef07a',30,160,2,50);sync3();
 sayAs('역병사도 모르가',['(모르가가 지팡이를 떨어뜨리고 무릎을 꿇었어요)'],()=>sayAs('마족 문양 해독자 루미아',['모르가가 쓰러졌어요! 지금이에요.','봉인구를 역병 제단에 꽂아 문을 닫아요!'],()=>{toast('가운데 제단에서 \'세 번째 봉인구 꽂기\'를 해요','g');qCheck();save();}));}

// ----- 둘레 마물 불러내기 (구조·장치 지키는 마물) -----
function spawnNear3(id,cx,cy,n,ang,mark){const L=[];for(let j=0;j<n;j++)for(let t=0;t<30;t++){const q=(j/n)*6.283+rnd(-.4,.4),d=rnd(3,5)*TS,x=tx5(cx)+Math.cos(q)*d,y=ty5(cy)+Math.sin(q)*d;if(blocked({m:1},x,y))continue;
  const m=MOB[id],e=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:1,cd:1});if(ang)e.angry=1;if(mark)e.gd3=mark;mobs.push(e);L.push(e);burst(x,y-20,'#9ef07a',10,80,2,20);break;}return L;}
// 구조: 처음 다가가면 지키는 마물이 나타나요 → 모두 쓰러뜨리면 덩굴·잠금을 풀고 구조 (지킴이를 다 잡은 것도 저장)
function guard3(si,ids,p,what){const f=g3();if(f['gc_'+si])return 1;const L=(G3.gd[si]||[]).filter(m=>mobs.includes(m)&&m.st!=='dead');
 if(G3.gd[si]&&!L.length){f['gc_'+si]=1;save();return 1;}
 if(G3.gd[si]&&L.length){hint3(what+' 둘레 마물 '+L.length+'마리를 먼저 쓰러뜨려요');return 0;}
 G3.gd[si]=[];ids.forEach(id=>G3.gd[si].push(...spawnNear3(id,p[0],p[1],1,1,si)));toast(what+' 둘레에 마물이 있어요! 먼저 쓰러뜨려요','w');return 0;}
const _questMobS3=questMob;questMob=function(){const q=qCur();if(q&&q.ch>=16&&q.goal&&q.goal.g3&&P.q.st==='go'){for(const k of q.goal.g3){if(KQ3[k]&&cnt3(k)<need3(k))return KQ3[k][0];}return null;}return _questMobS3();};
const _pickT3=pickTarget;pickTarget=function(){const B=G3.bs,s=B&&B.e&&B.e.sup?B.e:null,st=s&&s.st;if(s)s.st='dead';try{return _pickT3();}finally{if(s)s.st=st;}};
